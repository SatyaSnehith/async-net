package ss.core

import java.nio.channels.AsynchronousSocketChannel
import kotlin.jvm.Throws

fun interface ChannelHandler {
    @Throws(Exception::class)
    suspend fun action(channel: AsynchronousSocketChannel)
}