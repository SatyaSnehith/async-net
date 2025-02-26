package ss.log

import ss.core.BaseService

class JotClientService(
    host: String
): BaseService() {
    private val jotClient = JotClient(host)

    fun send(jot: Jot) {
        launchTask {
            jotClient.send(jot)
        }
    }
}