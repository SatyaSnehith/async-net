package ss.http.processor

import java.nio.ByteBuffer
import java.nio.channels.AsynchronousSocketChannel
import java.nio.channels.CompletionHandler

enum class RequestProcessState {
    Header, Body
}

class HttpRequestProcessor(
    private val channel: AsynchronousSocketChannel
) : CompletionHandler<Int, Unit> {

    private var buffer = ByteBuffer.allocateDirect(DEFAULT_BUFFER_SIZE)

    private var state: RequestProcessState = RequestProcessState.Header

    private val headerProcessor = HttpRequestHeaderProcessor()

    private var bodyProcessor: HttpRequestBodyProcessor? = null

    fun start() {
        read()
    }

    private fun read() {
        channel.read(buffer, Unit, this)
    }

    override fun completed(bytesRead: Int?, a: Unit?) {
        if (bytesRead == null || bytesRead == -1) return
        buffer.flip()
        val bytes = ByteArray(bytesRead)
        buffer.get(bytes)
        when(state) {
            RequestProcessState.Header -> {
                val request = headerProcessor.process(bytes)
                if (request != null) {
                    bodyProcessor = HttpRequestBodyProcessor(request)
                    state = RequestProcessState.Body
                }
            }
            RequestProcessState.Body -> {
                bodyProcessor?.process(bytes)
            }
        }
        buffer.clear()
        read()
    }

    override fun failed(e: Throwable?, a: Unit?) {

    }

}

interface HttpProcessor {
    fun process(byteArray: ByteArray): Boolean
}