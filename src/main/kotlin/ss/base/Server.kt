package ss.base

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.net.InetSocketAddress
import java.nio.channels.AsynchronousServerSocketChannel
import java.nio.channels.AsynchronousSocketChannel

abstract class Server(
    private val port: Int = 1111
) : BaseService() {
    private var serverChannel: AsynchronousServerSocketChannel? = null

    protected val asyncSocketActions: MutableList<AsyncSocketAction> = mutableListOf()

    override fun start() {
        super.start()
        serverChannel = AsynchronousServerSocketChannel.open().bind(InetSocketAddress(port))
        launchTask {
            println("Server running $isRunning")
            while (isRunning) {
                println("Server running")
                val clientChannel = serverChannel
                        ?.accept()
                        ?.get()
                        ?: throw IllegalStateException("Server not initialized")
                println("Server accepted")
                launchTask {
                    onAccept(clientChannel)
                }
            }
        }
    }

    suspend fun onAccept(channel: AsynchronousSocketChannel) {
        asyncSocketActions.forEach { action ->
            try {
                action.action(channel)
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