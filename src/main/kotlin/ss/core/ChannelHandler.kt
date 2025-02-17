package ss.core

import java.nio.channels.AsynchronousSocketChannel
import kotlin.jvm.Throws

fun interface ChannelHandler {
    @Throws(Exception::class)
    suspend fun action(channel: AsynchronousSocketChannel): Result

    enum class Result {
        CONTINUE,    // Continue processing handlers
        STOP,        // Stop the service
        SKIP_OTHERS, // Skip remaining handlers
        RETRY        // Retry this handler
    }
}