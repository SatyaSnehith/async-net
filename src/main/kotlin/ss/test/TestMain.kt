package ss.test

import kotlinx.coroutines.runBlocking
import java.lang.IllegalArgumentException

fun testMain(args: Array<String>) = runBlocking {
    val participantType = checkParticipantType(args.getOrNull(0))
    println("Starting as: $participantType")

    val options = TestConfig.TestOptions(
        port = args.getOrNull(1)?.toIntOrNull() ?: TestConfig.DEFAULT_PORT
    )

    when (participantType.lowercase()) {
        "server" -> {
            val server = TestServer(options.port)
            server.start()
        }

        "client" -> {
            val client = TestClient(options.host, options.port)
            client.start()
        }
        else -> {
            throw IllegalArgumentException("Unknown Participant type")
        }
    }
}

private fun checkParticipantType(participantType: String?): String {
    return when (participantType?.lowercase()) {
        "s", "server" -> "server"
        "c", "client" -> "client"
        else -> {
            print("Enter participant type [server/client]: ")
            val input = readlnOrNull()?.lowercase()
            checkParticipantType(input)
        }
    }
}