import ss.TestServer
import ss.base.Server

fun main(args: Array<String>) {
    print("Main")
    val server = TestServer()
    server.start()
    readlnOrNull()  // Wait for user input

    server.stop()
}