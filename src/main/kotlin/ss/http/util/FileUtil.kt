package ss.http.util

import ss.core.file.FileResource
import java.io.File

object FileUtil {

    fun mapFromFolder(
        folderPath: String
    ): HashMap<String, FileResource> {
        val folder = File(folderPath)
        val map = HashMap<String, File>()
        getFileMap(
            folder = folder,
            map = map
        )
        val fileMap = HashMap<String, FileResource>()

        for ((path, file) in map) {
            println(path)
            fileMap[path] = FileResource.fromFile(file)
        }

        return fileMap
    }

    fun getFileMap(
        folder: File,
        map: HashMap<String, File>,
        relativePath: String = "",
    ) {
        for (file in folder.listFiles() ?: emptyArray()) {
            val path = relativePath + "/" + file.name
            if (file.isFile) {
                map[path] = file
            } else if (file.isDirectory) {
                getFileMap(
                    folder = file,
                    relativePath = path,
                    map = map
                )
            }
        }
    }

}