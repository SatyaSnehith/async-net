package ss.test

import ss.core.Server

class TestServer(port: Int): Server(port) {
    init {
        channelHandlers.add(TestChannelHandler())
    }
}