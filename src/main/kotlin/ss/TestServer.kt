package ss

import ss.base.Server
import java.nio.ByteBuffer

class TestServer : Server(port = 8080) {
    init {
        // Add an async socket action to handle ping
        asyncSocketActions.add { channel ->
            // Create buffer for receiving data
            val buffer = ByteBuffer.allocate(4)
            
            // Read from client
            channel.read(buffer).get()
            buffer.flip()
            
            // Convert received bytes to string
            val message = String(buffer.array()).trim()
            println(message)
            // If message is "ping", respond with "pong"
            if (message == "ping") {
                val response = ByteBuffer.wrap("pong".toByteArray())
                channel.write(response).get()
            }
            
            channel.close()
        }
    }
}