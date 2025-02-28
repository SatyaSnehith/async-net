package ss.test

import kotlinx.coroutines.runBlocking
import ss.core.ChannelHandler
import ss.core.Server
import ss.http.util.AsynchronousSocketReader

class TestReaderServer(port: Int): Server(port) {
    init {
        channelHandlers.add { channel ->
            AsynchronousSocketReader(channel).start()
            return@add ChannelHandler.Result.CONTINUE
        }
    }

    companion object {
        fun start() = runBlocking {
            TestReaderServer(1110).start()
        }
    }
}