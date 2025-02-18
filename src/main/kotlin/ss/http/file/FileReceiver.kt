package ss.http.file

import ss.core.file.FileResource
import ss.http.util.IOUtil
import java.nio.channels.AsynchronousSocketChannel

class FileReceiver {

    val fileProgressMap = HashMap<FileResource, Progress>()

    suspend fun receiveFormData(
        socketChannel: AsynchronousSocketChannel,
        file: FileResource,
        length: Long?,
        boundary: String
    ): FormDataInfo {
        val progress = Progress(
            sent = 0,
            total = length ?: -1
        )
        fileProgressMap[file] = progress
        val formData = IOUtil.receiveFormData(
            socketChannel = socketChannel,
            fileChannel = file.openWriteChannel(),
            boundary = boundary,
            progress = progress
        )
        fileProgressMap.remove(file)
        return formData
    }

}

class FormDataInfo(
    val length: Long,
    val isLastFormDate: Boolean
)
