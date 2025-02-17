package ss.core.util

import java.io.IOException
import java.net.InetSocketAddress
import java.nio.ByteBuffer
import java.nio.channels.AsynchronousFileChannel
import java.nio.channels.AsynchronousSocketChannel
import java.nio.channels.CompletionHandler
import java.nio.charset.Charset
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

const val CRLF = "\r\n"
val LF = '\n'.code

suspend fun <T> awaitOperation(
    action: (CompletionHandler<T, Unit>) -> Unit,
): T {
    return suspendCoroutine { cont ->
        action(object : CompletionHandler<T, Unit> {
            override fun completed(result: T, attachment: Unit) {
                cont.resume(result)
            }
            override fun failed(exc: Throwable, attachment: Unit) {
                cont.resumeWithException(exc)
            }
        })
    }
}

@Throws(IOException::class)
suspend fun AsynchronousSocketChannel.writeAsync(byteBuffer: ByteBuffer): Int {
    return awaitOperation {
        write(byteBuffer, Unit, it)
    }
}
@Throws(IOException::class)
suspend fun AsynchronousSocketChannel.readAsync(byteBuffer: ByteBuffer): Int {
    return awaitOperation {
        read(byteBuffer, Unit, it)
    }
}

@Throws(IOException::class)
suspend fun AsynchronousFileChannel.writeAsync(byteBuffer: ByteBuffer, position: Long): Int {
    return awaitOperation {
        write(byteBuffer, position, Unit, it)
    }
}
@Throws(IOException::class)
suspend fun AsynchronousFileChannel.readAsync(byteBuffer: ByteBuffer, position: Long): Int {
    return awaitOperation {
        read(byteBuffer, position, Unit, it)
    }
}


val AsynchronousSocketChannel.ipAddress: String
    get() {
        val remoteAddress = remoteAddress as InetSocketAddress
        return  remoteAddress.address.hostAddress
    }

suspend fun AsynchronousSocketChannel.readLine(): String {
    val buffer = ByteBuffer.allocate(1) // Read one byte at a time
    val lineBuffer = mutableListOf<Byte>()

    while (readAsync(buffer) != -1) {
        buffer.flip()
        val byte = buffer.get()
        buffer.clear()

        if (byte == LF.toByte()) break
        lineBuffer.add(byte)
    }

    return String(lineBuffer.toByteArray(), Charsets.UTF_8)
}

@Throws(IOException::class)
suspend fun AsynchronousSocketChannel.readAsync(length: Int): String {
    val buffer = ByteBuffer.allocate(length)

    while (buffer.hasRemaining()) {
        val bytesRead = awaitOperation { read(buffer, Unit, it) }
        if (bytesRead == -1) break
    }

    buffer.flip()
    return String(buffer.array(), 0, buffer.limit(), Charsets.UTF_8)

}

@Throws(IOException::class)
suspend fun AsynchronousSocketChannel.readAsync(): String {
    val buffer = ByteBuffer.allocate(DEFAULT_BUFFER_SIZE)
    val result = StringBuilder()
    
    while (true) {
        val bytesRead = awaitOperation { read(buffer, Unit, it) }
        if (bytesRead == -1) {
            break // End of stream
        }
        
        buffer.flip()
        result.append(String(buffer.array(), 0, bytesRead, Charsets.UTF_8))
        buffer.clear()
    }
    
    return result.toString()
}

@Throws(IOException::class)
suspend fun AsynchronousSocketChannel.writeAsync(string: String): Int {
    val buffer = string.toByteBuffer()
    var totalBytesWritten = 0

    while (buffer.hasRemaining()) {
        totalBytesWritten += awaitOperation {
            write(buffer, Unit, it)
        } ?: 0
    }

    return totalBytesWritten
}

@Throws(IOException::class)
suspend fun AsynchronousSocketChannel.writeLine(
    line: String = "",
    lineSeparator: String = CRLF
): Int {
    return writeAsync(line + lineSeparator)
}

fun String.toByteBuffer(charset: Charset = Charsets.UTF_8): ByteBuffer {
    return ByteBuffer.wrap(this.toByteArray(charset))
}

@Throws(IOException::class)
suspend fun AsynchronousSocketChannel.transferToFile(
    fileChannel: AsynchronousFileChannel,
    bufferSize: Int = 8192,
    onProgress: (Long) -> Unit = {}
): Long {
    val buffer = ByteBuffer.allocate(bufferSize)
    var position = 0L
    var totalBytesTransferred = 0L

    while (true) {
        buffer.clear()

        // Read from the socket
        val bytesRead = readAsync(buffer)
        if (bytesRead == -1) break // End of stream

        buffer.flip()

        // Write to the file
        while (buffer.hasRemaining()) {
            val bytesWritten = fileChannel.writeAsync(buffer, position)
            position += bytesWritten
            totalBytesTransferred += bytesWritten
            onProgress(totalBytesTransferred)
        }
    }

    return totalBytesTransferred
}

// Transfer data from AsynchronousFileChannel to AsynchronousSocketChannel
@Throws(IOException::class)
suspend fun AsynchronousFileChannel.transferToSocket(
    socketChannel: AsynchronousSocketChannel,
    bufferSize: Int = 8192,
    onProgress: (Long) -> Unit = {}
): Long {
    val buffer = ByteBuffer.allocate(bufferSize)
    var position = 0L
    var totalBytesTransferred = 0L

    while (true) {
        buffer.clear()

        // Read from the file
        val bytesRead = readAsync(buffer, position)
        if (bytesRead == -1) break // End of file

        buffer.flip()

        // Write to the socket
        while (buffer.hasRemaining()) {
            totalBytesTransferred += socketChannel.writeAsync(buffer)
            onProgress(totalBytesTransferred)
        }

        position += bytesRead
    }

    return totalBytesTransferred
}

