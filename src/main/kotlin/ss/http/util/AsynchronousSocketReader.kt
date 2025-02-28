package ss.http.util

import ss.core.util.CRLF
import ss.core.util.toByteBuffer
import ss.http.request.Request
import ss.http.request.contentLength
import java.nio.ByteBuffer
import java.nio.channels.AsynchronousSocketChannel
import java.nio.channels.CompletionHandler

val LFByte = '\n'.code.toByte()

sealed class ReadType {
    data object Line: ReadType()
    class Length(var length: Long): ReadType()

}

class AsynchronousSocketReader(
    private val channel: AsynchronousSocketChannel
) : CompletionHandler<Int, Any> {

    private val buffer = ByteBuffer.allocateDirect(DEFAULT_BUFFER_SIZE)

    var request: Request? = null

    private var readType: ReadType = ReadType.Line

    private var lineCount = 0

    var bodyLength = 0L

    private val byteArray = mutableListOf<Byte>()

    fun start() {
        read()
    }

    private fun read() {
        channel.read(buffer, Unit, this)
    }

    fun stop() {

    }

    override fun completed(bytesRead: Int?, a: Any?) {
        if (bytesRead == -1) {
            return
        }
        buffer.flip()
        when(readType) {
            ReadType.Line -> {
                while (buffer.hasRemaining()) {
                    val byte = buffer.get()
                    if (byte == LFByte) {
                        val isLast = !onLineRead(String(byteArray.toByteArray()))
                        if (isLast) {
                            val bytes = ByteArray(buffer.remaining())
                            buffer.get(bytes)
                            onReadBody(bytes)
                            break
                        }
                        byteArray.clear()
                    } else {
                        byteArray.add(byte)
                    }
                }
            }
            is ReadType.Length -> {
                val bytes = ByteArray(buffer.remaining())
                buffer.get(bytes)
                onReadBody(bytes)
            }
        }
        buffer.clear()
        if (channel.isOpen) {
            read()
        }
    }


    override fun failed(e: Throwable?, a: Any?) {

    }

    fun onLineRead(line: String): Boolean {
        if (line.length == 1) {
            val len = request?.headers?.contentLength
            readType = ReadType.Length(len ?: -1)
            return false
        }
        if (lineCount == 0) {
            val method: String
            val path: String
            val version: String
            val tokens = line.split(' ')
            if (tokens.size == 3) {
                method = tokens[0]
                path = tokens[1]
                version = tokens[2]
            } else {
                throw Exception("create request start line $line")
            }
            request = Request(method, path, version)
        } else if(request != null) {
            request?.headers?.add(line)
        }
        lineCount++
        println("AsynchronousSocketReader onLineRead: ${line.length} $line")
        return true
    }

    fun onReadBody(bytes: ByteArray) {
        bodyLength += bytes.size.toLong()
        if (bodyLength >= (readType as ReadType.Length).length) {
            channel.write(("HTTP/1.1 200 Ok" + CRLF + "Content-Length: 7" + CRLF + CRLF + "SUCCESS").toByteBuffer(), Unit, object : CompletionHandler<Int, Unit> {
                override fun completed(p0: Int?, p1: Unit?) {
                    buffer.clear()
                    channel.close()
                }

                override fun failed(p0: Throwable?, p1: Unit?) {
                }

            })

        }
        println("AsynchronousSocketReader onReadBody: ${bodyLength} ${(readType as ReadType.Length).length} ${String(bytes)}")
    }
}
