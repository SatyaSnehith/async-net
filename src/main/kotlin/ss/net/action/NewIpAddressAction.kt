package ss.net.action

import ss.net.AsyncSocketAction
import ss.net.util.ipAddress
import java.nio.channels.AsynchronousSocketChannel

abstract class NewIpAddressAction: AsyncSocketAction {

    private val ipAddressSet: HashSet<String> = hashSetOf()

    @Throws(Exception::class)
    override suspend fun action(channel: AsynchronousSocketChannel) {
        val ipAddress = channel.ipAddress
        if (!ipAddressSet.contains(ipAddress)) {
            ipAddressSet.add(ipAddress)
            onNewIpAddress(channel)
        }
    }

    abstract fun onNewIpAddress(channel: AsynchronousSocketChannel)

    companion object {
        fun create(
            action: (AsynchronousSocketChannel) -> Unit
        ) = object: NewIpAddressAction() {
            override fun onNewIpAddress(channel: AsynchronousSocketChannel) {
                action(channel)
            }
        }
    }
}