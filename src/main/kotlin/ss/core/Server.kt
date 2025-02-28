package ss.core

import ss.core.util.awaitOperation
import ss.core.util.ipAddress
import ss.core.util.log
import java.net.InetSocketAddress
import java.nio.channels.AsynchronousServerSocketChannel
import java.nio.channels.AsynchronousSocketChannel

abstract class Server(
    private val port: Int
) : NetworkEndpoint() {

    private var serverChannel: AsynchronousServerSocketChannel? = null

    override suspend fun onStart() {
        serverChannel = AsynchronousServerSocketChannel.open().bind(InetSocketAddress(port), 200)
        log("Server start on port: $port")
        while (isRunning) {
            val clientChannel = awaitOperation<AsynchronousSocketChannel> {
                serverChannel?.accept(Unit, it)
            }
            log("Socket accepted ${clientChannel.ipAddress}")
            launchTask {
                onChannel(clientChannel)
            }
        }
    }

    override suspend fun onStop() {
        try {
            serverChannel?.close()
        } catch (e: Exception) {
            println("Error during server shutdown: ${e.message}")
        } finally {
            serverChannel = null
        }
    }

}