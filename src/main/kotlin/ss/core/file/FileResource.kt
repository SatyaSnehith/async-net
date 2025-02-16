package ss.core.file

import java.io.File
import java.nio.channels.FileChannel
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardOpenOption
import kotlin.io.path.Path
import kotlin.io.path.name

abstract class FileResource(
    name: String,
): BaseFileResource(name) {

    val mime: String = MimeType.fromName(name)

    abstract fun openWriteChannel(): FileChannel

    abstract fun openReadChannel(): FileChannel

    override fun toString(): String {
        return "File(fileName: $name, length: ${length()})"
    }

    companion object {
        fun fromFile(file: File): FileResource {
            val path = Path(file.absolutePath)
            return fromPath(path)
        }

        fun fromPath(path: Path) : FileResource {
            return object: FileResource(path.name) {

                override fun openWriteChannel(): FileChannel {
                    return FileChannel.open(path, StandardOpenOption.READ)
                }

                override fun openReadChannel(): FileChannel {
                    return FileChannel.open(path, StandardOpenOption.WRITE, StandardOpenOption.CREATE)
                }

                override fun length(): Long {
                    return Files.size(path)
                }
            }
        }
    }

}