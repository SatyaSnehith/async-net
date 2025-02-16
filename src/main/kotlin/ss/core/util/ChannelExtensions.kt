package ss.core.util

import java.net.InetSocketAddress
import java.nio.ByteBuffer
import java.nio.channels.AsynchronousSocketChannel

const val CRLF = "\r\n"
val LF = '\n'.code

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

//suspend fun createRequest(channel: AsynchronousSocketChannel): Request {
//    val buffer = ByteBuffer.allocate(1024)
//    val requestBuilder = StringBuilder()
//    var bytesRead: Int
//
//    withContext(Dispatchers.IO) {
//        do {
//            bytesRead = channel.read(buffer).get()
//            if (bytesRead > 0) {
//                buffer.flip()
//                requestBuilder.append(Charset.forName("UTF-8").decode(buffer).toString())
//                buffer.clear()
//            }
//        } while (bytesRead > 0 && !requestBuilder.contains("\r\n\r\n"))
//    }
//
//    val requestString = requestBuilder.toString()
//    val requestLines = requestString.split("\r\n")
//    val requestLine = requestLines[0]
//    val tokens = requestLine.split(' ')
//
//    if (tokens.size != 3) {
//        throw Exception("Invalid HTTP request line: $requestLine")
//    }
//
//    val method = tokens[0]
//    val path = tokens[1]
//    val version = tokens[2]
//
//    val headers = channel.readHeaders()
//
//    return Request(
//        method = method,
//        uri = path,
//        version = version,
//        headers = headers
//    )
//}
//
//suspend fun AsynchronousSocketChannel.readHeaders(): Headers {
//    val headers = Headers()
//
//    while (true) {
//        val line = kotlin.io.readLine()
//        if (line.isEmpty()) break
//        headers.add(line)
//    }
//    return headers
//}