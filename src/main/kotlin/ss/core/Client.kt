package ss.core

import ss.core.util.awaitOperation
import ss.core.util.log
import java.net.InetSocketAddress
import java.nio.channels.AsynchronousSocketChannel

abstract class Client(
    private val host: String,
    private val port: Int
) : NetworkEndpoint() {

    private var channel: AsynchronousSocketChannel? = null
    
    override suspend fun onStart() {
        channel = AsynchronousSocketChannel.open()
        
        // Connect to server
        awaitOperation<Void> {
            channel?.connect(InetSocketAddress(host, port), Unit, it)
        }
        
        log("Connected to $host:$port")
        
        // Process channel handlers
        channel?.let { channel ->
            try {
                onChannel(channel)
            } catch (e: Exception) {
                log("Error processing channel: ${e.message}")
            }
        }
    }

    override suspend fun onStop() {
        try {
            channel?.close()
        } catch (e: Exception) {
            log("Error during client shutdown: ${e.message}")
        } finally {
            channel = null
        }
    }

}