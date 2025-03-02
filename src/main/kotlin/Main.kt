import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext
import ss.core.file.FileResource
import ss.http.HttpServer
import ss.http.request.queries
import ss.http.response.StringResponse
import ss.log.*
import ss.test.TestConfig
import ss.test.TestReaderServer
import java.nio.file.Paths
import kotlin.io.path.name

val webFiles = listOf(
    "web/4a508eb5667fb9042644.woff2",
    "web/4b432532fa948388046f.woff",
    "web/5c5ff10473ac9b95f049.woff",
    "web/26c9746e633c989a9b47.woff",
    "web/bundle.js",
    "web/bundle.js.map",
    "web/d2316b3ad57dae5d46c2.woff2",
    "web/de52a3d93f85dcb8da44.woff2",
    "web/index.html",
    "web/styles.css",
)

fun main(args: Array<String>) {
//    testMain(args)
//    startServer()
    TestReaderServer.start()
//    runBlocking {
//        println(readResourceFile("web/index.html"))
//    }
//    if (args.firstOrNull() == "s") {
//        jotServer()
//    }
//    if (args.firstOrNull() == "c") {
//        println("jot client start")
//        Jot().tag("client").debug("Test")
//    }
}

suspend fun readResourceFile(fileName: String): String = withContext(Dispatchers.IO) {
    println(Paths.get(ClassLoader.getSystemResource(fileName).file).fileName)
    val inputStream = ClassLoader.getSystemResourceAsStream(fileName)
        ?: throw IllegalArgumentException("File not found: $fileName")
    return@withContext inputStream.bufferedReader().use { it.readText() }
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
            fileMap = webFiles.associate {
                val path = Paths.get(ClassLoader.getSystemResource(it).file)
                "/" + path.name to FileResource.fromPath(path)
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