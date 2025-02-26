package ss.http

import ss.core.BaseService
import ss.core.util.awaitOperation
import ss.http.request.Request
import ss.http.response.Response
import ss.http.util.readResponse
import ss.http.util.sendRequest
import java.net.InetSocketAddress
import java.nio.channels.AsynchronousSocketChannel

open class HttpClient(
    val host: String,
    val port: Int,
): BaseService() {
    private var channel: AsynchronousSocketChannel? = null

    override suspend fun onStart() {
        channel = AsynchronousSocketChannel.open()

        // Connect to server
        awaitOperation<Void> {
            channel?.connect(InetSocketAddress(host, port), Unit, it)
        }
    }

    suspend fun send(request: Request): Response? {
        start()
        println("HttpClient send channel: ${channel?.isOpen}")
        if (channel?.isOpen == true) {
            channel?.sendRequest(request)
            return channel?.readResponse().apply {
                println("HttpClient response $this")
            }
        }
        channel?.close()
        return null
    }
}