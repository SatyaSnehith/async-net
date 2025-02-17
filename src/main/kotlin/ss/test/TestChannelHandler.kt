package ss.test

import ss.core.ChannelHandler
import ss.core.util.readLine
import ss.core.util.writeLine
import java.nio.channels.AsynchronousSocketChannel

class TestChannelHandler: ChannelHandler {
    private val commands = """
        Available Commands:
        rl  - Read line from client
        wl  - Write line to client
        st  - Stop server
        h   - Show this help
        """.trimIndent()
    override suspend fun action(channel: AsynchronousSocketChannel): ChannelHandler.Result {
        showHelp()

        while(true) {
            print("Enter command:")
            when (readln()) {
                "rl" -> {
                    println("Waiting...")
                    val line = channel.readLine()
                    println("Line: $line")
                }

                "wl" -> {
                    print("Enter Line:")
                    val line = readln()
                    channel.writeLine(line)
                    println("Sent")
                }

                "st" -> {
                    println("Closed")
                    return ChannelHandler.Result.STOP
                }

                "h"  -> showHelp()

            }

        }
    }

    private fun showHelp() {
        println(commands)
    }
}