package ss.http.util

import ss.core.util.PositionTracker
import ss.core.util.readByteAsync
import ss.core.util.writeAsync
import ss.http.file.FormDataInfo
import ss.http.file.Progress
import java.nio.ByteBuffer
import java.nio.channels.AsynchronousFileChannel
import java.nio.channels.AsynchronousSocketChannel

object IOUtil {

    val DoubleDash = "--".toByteArray().toTypedArray()

    suspend fun receiveFormData(
        socketChannel: AsynchronousSocketChannel,
        fileChannel: AsynchronousFileChannel,
        boundary: String,
        progress: Progress? = null,
    ): FormDataInfo {
        val boundaryBytes = boundary.toByteArray()
        var foundBoundaryIndex = 0
        val suspectedBoundary = ArrayList<Byte>()
        val byteBuffer = ByteBuffer.allocate(1)
        var readCount: Long = 1
        val positionTracker = PositionTracker()
        var read: Byte = socketChannel.readByteAsync(byteBuffer) ?: return FormDataInfo(
            length = readCount,
            isLastFormDate = false
        )
        while(read >= 0) {
            val byte = read.toByte()
            if (byte == boundaryBytes[foundBoundaryIndex]) {
                suspectedBoundary.add(byte)
                foundBoundaryIndex++
                if (foundBoundaryIndex == boundaryBytes.size) {
                    val r1 = socketChannel.readByteAsync(byteBuffer)
                    val r2 = socketChannel.readByteAsync(byteBuffer)
                    return FormDataInfo(
                        length = readCount - boundaryBytes.size,
                        isLastFormDate = arrayOf(r1, r2).contentEquals(DoubleDash) // the last boundary will have extra "--"
                    )
                }
            } else {
                foundBoundaryIndex = 0
                fileChannel.writeAsync(suspectedBoundary.toArray().toString(), positionTracker)
                suspectedBoundary.clear()
                fileChannel.writeAsync(byteBuffer, positionTracker)
            }
            read = socketChannel.readByteAsync(byteBuffer) ?: return FormDataInfo(
                length = readCount,
                isLastFormDate = false
            )
            readCount++
            progress?.sent = readCount
        }
        return FormDataInfo(
            length = readCount,
            isLastFormDate = false
        )
    }

}