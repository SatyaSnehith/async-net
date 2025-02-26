package ss.http.file

import ss.core.file.FileResource
import ss.core.util.transferToSocket
import java.nio.channels.AsynchronousSocketChannel
import kotlin.jvm.Throws

class FileSender {
    val fileProgressMap = HashMap<FileResource, Progress>()

    @Throws(Exception::class)
    suspend fun send(
        file: FileResource,
        socketChannel: AsynchronousSocketChannel,
    ) {
        println("FileSender start")

        try {
            val length = file.length()
            val progress = Progress(
                sent = 0,
                total = length
            )
            fileProgressMap[file] = progress

            file.openReadChannel().transferToSocket(
                socketChannel,
                onProgress = {
                    progress.sent = it
                    println("FileSender Progress $it")
                }
            )
        } catch (e: Exception) {
            e.printStackTrace()
            println("FileSender Exception ${e.message}")
        }

        fileProgressMap.remove(file)
    }

}