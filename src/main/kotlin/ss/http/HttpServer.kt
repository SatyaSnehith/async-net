package ss.http

import ss.core.Server

open class HttpServer(
    port: Int
): Server(port = port) {

    private val httpConnectionHandler = HttpConnectionHandler()
    init {
        channelHandlers.add(httpConnectionHandler)
    }

    fun addRoutes(
        routes: HttpConnectionHandler.() -> Unit
    ) {
        httpConnectionHandler.routes()
    }

    companion object {
        const val VERSION = "HTTP/1.1"
        const val SERVER_NAME = "WebShare"
    }
}

