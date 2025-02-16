package ss.http

import ss.core.file.FileResource

fun interface FileCreatorInterface {
    fun onCreateFile(fileName: String): FileResource
}