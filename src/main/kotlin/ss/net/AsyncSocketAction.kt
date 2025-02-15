package ss.net

import java.nio.channels.AsynchronousSocketChannel
import kotlin.jvm.Throws

fun interface AsyncSocketAction {
    @Throws(Exception::class)
    suspend fun action(channel: AsynchronousSocketChannel)
}