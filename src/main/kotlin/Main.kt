import kotlinx.coroutines.*
import ss.TestServer

fun main(args: Array<String>) = runBlocking {
    println("Main")
    val scope = CoroutineScope(Dispatchers.IO)

    val server = TestServer()
    scope.launch {
        println("stopped 1")
        delay(3000)
        println("stopped 2")
        server.stop()
    }

    server.start()

}