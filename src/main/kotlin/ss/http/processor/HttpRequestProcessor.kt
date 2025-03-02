package ss.http.processor

import ss.http.request.Request
import ss.http.request.hasBody
import java.nio.ByteBuffer
import java.nio.channels.AsynchronousSocketChannel
import java.nio.channels.CompletionHandler

sealed class RequestProcessState {
    class HeaderProcess(val headerProcessor: HttpRequestHeaderProcessor): RequestProcessState()
    class BodyProcess(val bodyProcessor: HttpRequestBodyProcessor): RequestProcessState()
}

class HttpRequestProcessor(
    private val channel: AsynchronousSocketChannel,
    val handler: CompletionHandler<Request, Unit>
) : CompletionHandler<Int, Unit> {

    private var buffer = ByteBuffer.allocateDirect(DEFAULT_BUFFER_SIZE)

    private var processState: RequestProcessState = RequestProcessState.HeaderProcess(HttpRequestHeaderProcessor())

    fun start() {
        read()
    }

    var request: Request? = null

    private fun read() {
        channel.read(buffer, Unit, this)
    }

    override fun completed(bytesRead: Int?, a: Unit?) {
        try {
            actualCompleted(bytesRead)
        } catch (e: Exception) {
            handler.failed(e, a)
        }
    }

    private fun actualCompleted(bytesRead: Int?) {
        if (bytesRead == null || bytesRead == -1) return
        buffer.flip()
        val bytes = ByteArray(bytesRead)
        buffer.get(bytes)
        buffer.clear()
        val isRequestProcessed = when(val state = processState) {
            is RequestProcessState.HeaderProcess -> {
                request = state.headerProcessor.process(bytes)
                request?.let { r ->
                    if (r.hasBody) {
                        val newState = RequestProcessState.BodyProcess(HttpRequestBodyProcessor(r))
                        val isBodyProcessed = newState.bodyProcessor.process(state.headerProcessor.remainingBodyBytes)
                        processState = newState
                        isBodyProcessed
                    } else true
                } ?: false
            }
            is RequestProcessState.BodyProcess -> {
                state.bodyProcessor.process(bytes)
            }
        }
        if (isRequestProcessed) {
            handler.completed(request, Unit)
        } else {
            read()
        }
    }

    override fun failed(e: Throwable?, a: Unit?) {

    }

}

interface HttpProcessor {
    fun process(byteArray: ByteArray): Boolean
}