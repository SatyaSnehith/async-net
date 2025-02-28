package ss.http.util

import java.nio.ByteBuffer
import java.nio.channels.AsynchronousSocketChannel
import java.nio.channels.CompletionHandler

class AsyncLineReader(
    private val channel: AsynchronousSocketChannel
) {
    private val buffer = ByteBuffer.allocateDirect(1024)
    private val lineBuffer = StringBuilder()

    fun startReading() {
        readFromChannel()
    }

    private fun readFromChannel() {
        channel.read<Void?>(buffer, null, object : CompletionHandler<Int, Void?> {
            override fun completed(bytesRead: Int, attachment: Void?) {
                if (bytesRead == -1) {
                    return
                }
                buffer.flip()
                while (buffer.hasRemaining()) {
                    val ch = Char(buffer.get().toUShort())
                    if (ch == '\n') {
                        processLine(lineBuffer.toString())
                        lineBuffer.setLength(0)
                    } else {
                        lineBuffer.append(ch)
                    }
                }
                buffer.clear()
                readFromChannel()
            }

            override fun failed(exc: Throwable, attachment: Void?) {
                // Handle read failure
                exc.printStackTrace()
            }
        })
    }

    private fun processLine(line: String) {
        println("Received line: $line")
    }
}

