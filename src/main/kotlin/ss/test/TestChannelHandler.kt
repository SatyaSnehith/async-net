package ss.test

import ss.core.ChannelHandler
import ss.core.NetworkEndpoint
import ss.core.util.readLine
import ss.core.util.writeLine
import java.nio.channels.AsynchronousSocketChannel

class TestChannelHandler(
    private val networkEndpoint: NetworkEndpoint
): ChannelHandler {
    private val commands = """
        Available Commands:
        s:  - Stop server
        h:  - Show this help
        """.trimIndent()

    override suspend fun action(
        channel: AsynchronousSocketChannel
    ): ChannelHandler.Result {
        showHelp()

        networkEndpoint.launchTask {
            while(channel.isOpen) {
                val line = try {
                    channel.readLine() ?: break
                } catch (e: Exception) {
                    println("ERROR while reading channel ${e.message}")
                    break
                }
                println("Message ${channel.isOpen}: $line")
            }
        }

        while(true) {
            print("Enter message/command:")
            when (val line = readln()) {

                "s:" -> {
                    println("Closed")
                    return ChannelHandler.Result.STOP
                }

                "h:"  -> showHelp()

                else -> {
                    channel.writeLine(line)
                }
            }

        }
    }

    private fun showHelp() {
        println(commands)
    }
}