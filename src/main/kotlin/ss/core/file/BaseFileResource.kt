package ss.core.file

import java.io.File

abstract class BaseFileResource(
    val name: String
) {
    abstract fun length(): Long

    companion object {
        fun fromFile(file: File): BaseFileResource {
            return if (file.isFile) FileResource.fromFile(file)
            else DirectoryResource.fromFile(file)
        }
    }
}

fun List<BaseFileResource>.foldersFirst(): List<BaseFileResource> {
    return filterIsInstance<DirectoryResource>() + filterIsInstance<FileResource>()
}

fun List<BaseFileResource>.sortByAsc(): List<BaseFileResource> {
    return sortedBy { it.name }
}
