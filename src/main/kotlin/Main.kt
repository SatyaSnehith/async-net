import kotlinx.coroutines.runBlocking
import ss.http.HttpServer
import ss.http.response.StringResponse
import ss.http.util.FileUtil
import ss.log.*
import ss.test.TestConfig

fun main(args: Array<String>) {
//    testMain(args)
//    startServer()

    if (args.firstOrNull() == "s") {
        jotServer()
    }
    if (args.firstOrNull() == "c") {
        println("jot client start")
        Jot().debug().tag("client").string("Test").send()
    }
}

fun jotServer() = runBlocking {
    JotServer().start()
}

fun startServer() = runBlocking {
    println("HttpServer")
    val server = HttpServer(TestConfig.DEFAULT_PORT)

    server.addRoutes {
//        val r = this.javaClass.classLoader.getResource("sd")
//        println("RESOURCE: $r")
//        if (r != null) {
//            URLClassLoader(arrayOf(r), this.javaClass.classLoader).urLs.forEach {
//                println("URL: ${it.path}")
//            }
//            println("RESOURCE: ${File(r.path).length()}")
//        }
//
//        File("new.txt").createNewFile()

        static(
            fileMap = FileUtil.mapFromFolder("").apply {
                println(this)
            }
        )
        get("/dsa") {
            StringResponse(
                body = it.queries.joinToString()
            )
        }
    }
    server.start()
}