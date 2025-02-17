package ss.core

import ss.core.util.log
import java.nio.channels.AsynchronousSocketChannel

open class NetworkEndpoint: BaseService() {
    protected val channelHandlers: MutableList<ChannelHandler> = mutableListOf()

    suspend fun onChannel(channel: AsynchronousSocketChannel) {
        var currentHandlerIndex = 0

        while (currentHandlerIndex < channelHandlers.size) {
            val handler = channelHandlers[currentHandlerIndex]

            try {
                if (!channel.isOpen) break

                when (handler.action(channel)) {
                    ChannelHandler.Result.CONTINUE -> {
                        // Move to next handler
                        currentHandlerIndex++
                    }

                    ChannelHandler.Result.STOP -> {
                        log("Handler requested stop")
                        stop()
                        return
                    }

                    ChannelHandler.Result.SKIP_OTHERS -> {
                        log("Handler requested to skip remaining handlers")
                        break
                    }

                    ChannelHandler.Result.RETRY -> {
                        log("Handler requested retry")
                        // Stay on same handler by not incrementing index
                        continue
                    }
                }
            } catch (e: Exception) {
                log("ERROR: ChannelHandler encountered an exception: ${e.message}")
                channel.close()
                return
            }
        }

        // All handlers completed or were skipped
        if (channel.isOpen) {
            channel.close()
        }
    }
}