package ss.core.file

import java.io.File
import java.nio.file.Files
import java.nio.file.Path
import kotlin.io.path.name
import kotlin.streams.toList

abstract class DirectoryResource(
    name: String,
): BaseFileResource(name) {
    abstract fun listFiles(): List<BaseFileResource>

    override fun length(): Long {
        return listFiles().sumOf { it.length() }
    }

    override fun toString(): String {
        return "Folder(fileName: $name)"
    }

    companion object {
        fun fromFile(file: File): DirectoryResource {
            return object: DirectoryResource(file.name) {
                override fun listFiles(): List<BaseFileResource> {
                    return file.listFiles()?.map { BaseFileResource.fromFile(it) } ?: listOf()
                }
            }
        }

        fun fromPath(path: Path): DirectoryResource {
            return object : DirectoryResource(path.name) {
                override fun listFiles(): List<BaseFileResource> {
                    return Files.list(path).map {
                        fromPath(it)
                    }.toList()
                }
            }
        }
    }
}