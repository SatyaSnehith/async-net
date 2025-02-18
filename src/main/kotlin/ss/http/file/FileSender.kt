package ss.http.file

import ss.core.file.FileResource
import ss.core.util.transferToSocket
import java.nio.channels.AsynchronousSocketChannel

class FileSender {
    val fileProgressMap = HashMap<FileResource, Progress>()

    suspend fun send(
        file: FileResource,
        socketChannel: AsynchronousSocketChannel,
    ) {
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
            }
        )

        fileProgressMap.remove(file)
    }

}