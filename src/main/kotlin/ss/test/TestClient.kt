package ss.test

import ss.core.Client

class TestClient(
    host: String,
    port: Int,
): Client(host, port) {
    init {
        channelHandlers.add(TestChannelHandler(this))
    }
} 