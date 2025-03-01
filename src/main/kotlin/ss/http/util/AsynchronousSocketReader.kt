package ss.http.util

import ss.core.util.CRLF
import ss.core.util.toByteBuffer
import ss.http.Headers
import ss.http.request.Request
import ss.http.request.contentLength
import java.nio.ByteBuffer
import java.nio.channels.AsynchronousSocketChannel
import java.nio.channels.CompletionHandler

val LFByte = '\n'.code.toByte()

sealed class TransferState {

    sealed class ReadState : TransferState() {
        class HeaderRead(var isStartRead: Boolean = false) : ReadState()
        class BodyRead(var length: Long = 0) : ReadState()
    }

    sealed class WriteState : TransferState() {
        class HeaderWrite() : WriteState()
        class BodyWrite() : WriteState()
    }
}

class AsynchronousSocketReader(
    private val channel: AsynchronousSocketChannel
) : CompletionHandler<Int, TransferState> {

    private var buffer = ByteBuffer.allocateDirect(1024)

    var request: Request? = null

    private var state: TransferState = TransferState.ReadState.HeaderRead()

    fun start() {
        read()
    }

    private fun read() {
        channel.read(buffer, state, this)
    }

    private fun write() {
        channel.write(buffer, state, this)
    }


    fun stop() {

    }

    override fun completed(bytesRead: Int?, state: TransferState?) {
        println("bytesRead $bytesRead")
        if (bytesRead == -1) {
            return
        }
        when(state) {
            is TransferState.ReadState -> {
                buffer.flip()
                when (state) {
                    is TransferState.ReadState.HeaderRead -> {
                        val byteArray = ByteArray(bytesRead ?: buffer.remaining())
                        var index = 0
                        var lineStartIndex = 0
                        while (buffer.hasRemaining()) {
                            val byte = buffer.get()
                            if (byte == LFByte) {
                                val lineLength = index - lineStartIndex - 1
                                println("Line $lineLength")
                                if (lineLength > 1) {
                                    processHeader(String(byteArray, lineStartIndex, lineLength), state.isStartRead)
                                    println("Line $lineStartIndex $index")
                                    lineStartIndex = index + 1
                                    state.isStartRead = true
                                } else {
                                    val bytes = ByteArray(buffer.remaining())
                                    buffer.get(bytes)
                                    println("remaining ${bytes.size}")
                                    this@AsynchronousSocketReader.state = TransferState.ReadState.BodyRead(bytes.size.toLong())
                                    processBody(bytes)
                                    break
                                }
                            }
                            byteArray[index++] = byte
//                            println("byte ${index - 1} $byte")
                        }
                        buffer.clear()
                        read()
                    }

                    is TransferState.ReadState.BodyRead -> {
                        val total = request?.headers?.contentLength ?: 0

                        val bytes = ByteArray(buffer.remaining())
                        buffer.get(bytes)
                        state.length += bytes.size
                        processBody(bytes)

                        println("total $total read ${state.length}")
                        if (state.length >= total) {
                            this@AsynchronousSocketReader.state = TransferState.WriteState.HeaderWrite()
                            buffer = ("HTTP/1.1 200 Ok" + CRLF + "Content-Length: 7" + CRLF + CRLF).toByteBuffer()
                            write()
                        } else {
                            buffer.clear()
                            read()
                        }

                    }

                    else -> {}
                }
            }

            is TransferState.WriteState -> {
                when (state) {
                    is TransferState.WriteState.HeaderWrite -> {
                        buffer = ("SUCCESS").toByteBuffer()
                        write()
                    }

                    is TransferState.WriteState.BodyWrite -> {
                        buffer.clear()
                        channel.close()
                    }

                    else -> {}
                }
            }

            else -> {}
        }

    }


    override fun failed(e: Throwable?,  state: TransferState?) {

    }

    fun processHeader(line: String, isStartRead: Boolean) {
        if (!isStartRead) {
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
        println("AsynchronousSocketReader processHeader: ${line.length} $line")
    }

    fun processBody(bytes: ByteArray) {
        val line = String(bytes)
        println("AsynchronousSocketReader processBody: ${line.length} $line")

    }
}

