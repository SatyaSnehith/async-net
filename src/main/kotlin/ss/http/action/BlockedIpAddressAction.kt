package ss.http.action

import ss.core.ChannelHandler
import ss.core.util.ipAddress
import java.net.Socket
import java.nio.channels.AsynchronousSocketChannel

abstract class BlockedIpAddressAction: ChannelHandler {

    val ipAddressSet: HashSet<String> = hashSetOf()

    @Throws(Exception::class)
    override suspend fun action(channel: AsynchronousSocketChannel): ChannelHandler.Result {
        val ipAddress = channel.ipAddress
        if(ipAddressSet.contains(ipAddress)) throw Exception("Blocked IP address: $ipAddress")
        return ChannelHandler.Result.CONTINUE
    }

    abstract fun onBlockedIpAddressAccess(socket: Socket)

    companion object {
        fun create(
            action: (Socket) -> Unit
        ) = object: BlockedIpAddressAction() {
            override fun onBlockedIpAddressAccess(socket: Socket) {
                action(socket)
            }
        }
    }

}