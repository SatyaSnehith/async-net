package ss.core

import ss.core.util.ipAddress
import ss.core.util.log
import java.net.InetSocketAddress
import java.nio.channels.AsynchronousServerSocketChannel
import java.nio.channels.AsynchronousSocketChannel

abstract class Server(
    private val port: Int = 1111
) : BaseService() {

    private var serverChannel: AsynchronousServerSocketChannel? = null

    protected val channelHandlers: MutableList<ChannelHandler> = mutableListOf()

    override suspend fun onStart() {
        serverChannel = AsynchronousServerSocketChannel.open().bind(InetSocketAddress(port))
        log("Server start on port: $port")
        while (isRunning) {
            val clientChannel = serverChannel
                ?.accept()
                ?.get()
                ?: throw IllegalStateException("Server not initialized")
            log("Socket accepted ${clientChannel.ipAddress}")
            launchTask {
                onAccept(clientChannel)
            }
        }
    }

    override suspend fun onStop() {
        try {
            serverChannel?.close()
            channelHandlers.clear()
        } catch (e: Exception) {
            println("Error during server shutdown: ${e.message}")
        } finally {
            serverChannel = null
        }
    }

    suspend fun onAccept(channel: AsynchronousSocketChannel) {
        channelHandlers.forEach { action ->
            try {
                if(channel.isOpen) {
                    action.action(channel)
                }
            } catch (e: Exception) {
                println("ERROR: AsyncSocketAction encountered an exception: ${e.message}")
                // Optionally, close the channel if an action fails
                channel.close()
                return
            }
        }
        // Proceed with handling the channel if all actions succeed
    }
}