package ss.test

import kotlinx.coroutines.runBlocking
import ss.core.ChannelHandler
import ss.core.Server
import ss.http.processor.HttpRequestProcessor
import ss.http.request.Request
import java.nio.ByteBuffer
import java.nio.channels.CompletionHandler

class TestReaderServer(port: Int): Server(port) {
    init {
        channelHandlers.add { channel ->
            HttpRequestProcessor(
                channel = channel,
                handler = object: CompletionHandler<Request, Unit> {
                    override fun completed(request: Request?, a: Unit?) {
                        val responseBytes = "HTTP/1.1 200 Ok\r\nContent-Length: 7\r\n\r\nSUCCESS".toByteArray()
                        val buffer = ByteBuffer.wrap(responseBytes) // Wrap avoids unnecessary allocations

                        // Asynchronous write to avoid blocking
                        channel.write(buffer, Unit, object : CompletionHandler<Int, Unit> {
                            override fun completed(result: Int?, attachment: Unit?) {
                                channel.close()
                            }

                            override fun failed(exc: Throwable?, attachment: Unit?) {
                                exc?.printStackTrace()
                                channel.close()
                            }
                        })
                    }

                    override fun failed(e: Throwable?, a: Unit?) {
                    }

                }
            ).start()
            return@add ChannelHandler.Result.CONTINUE
        }
    }

    companion object {
        fun start() = runBlocking {
            TestReaderServer(1110).start()
        }
    }
}