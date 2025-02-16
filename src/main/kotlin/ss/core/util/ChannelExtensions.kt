package ss.core.util

import java.io.IOException
import java.net.InetSocketAddress
import java.nio.ByteBuffer
import java.nio.channels.AsynchronousChannel
import java.nio.channels.AsynchronousSocketChannel
import java.nio.channels.CompletionHandler
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException
import kotlin.coroutines.suspendCoroutine

const val CRLF = "\r\n"
val LF = '\n'.code

suspend fun <T> AsynchronousChannel.awaitOperation(
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

//suspend fun AsynchronousSocketChannel.readAsync(buffer: ByteBuffer): Int {
//    return awaitOperation({ buf, handler -> this.read(buf, buf, handler) }, buffer)
//}

val AsynchronousSocketChannel.ipAddress: String
    get() {
        val remoteAddress = remoteAddress as InetSocketAddress
        return  remoteAddress.address.hostAddress
    }

fun AsynchronousSocketChannel.readLine(): String {
    val buffer = ByteBuffer.allocate(1) // Read one byte at a time
    val lineBuffer = mutableListOf<Byte>()
    var bytesRead: Int

    while (true) {
        bytesRead = this@readLine.read(buffer).get()
        if (bytesRead == -1) {
            // End of stream
            break
        }
        buffer.flip()
        val byte = buffer.get()
        buffer.clear()
        if (byte == LF.toByte()) {
            // End of line
            break
        }
        lineBuffer.add(byte)
    }

    return String(lineBuffer.toByteArray(), Charsets.UTF_8)
}

@Throws(IOException::class)
fun AsynchronousSocketChannel.write(string: String) {
    write(string.toByteBuffer())
}

@Throws(IOException::class)
fun AsynchronousSocketChannel.readString(length: Int): String {
    val buffer = ByteBuffer.allocate(length)
    var totalBytesRead = 0
    
    while (totalBytesRead < length) {
        val bytesRead = read(buffer).get()
        if (bytesRead == -1) {
            break // End of stream
        }
        totalBytesRead += bytesRead
    }
    
    buffer.flip()
    return String(buffer.array(), 0, totalBytesRead, Charsets.UTF_8)
}

@Throws(IOException::class)
fun AsynchronousSocketChannel.readAll(): String {
    val buffer = ByteBuffer.allocate(8192) // 8KB buffer
    val result = StringBuilder()
    
    while (true) {
        val bytesRead = read(buffer).get()
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
fun AsynchronousSocketChannel.writeCrlf(string: String = "") {
    write((string + CRLF).toByteBuffer()).get()
}

fun String.toByteBuffer(): ByteBuffer = ByteBuffer.wrap(toByteArray())


@Throws(IOException::class)
suspend fun AsynchronousSocketChannel.readAsync(byteBuffer: ByteBuffer): Int {
    return awaitOperation {
        read(byteBuffer, Unit, it)
    }
}
