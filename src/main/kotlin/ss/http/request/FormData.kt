package ss.http.request

import ss.core.file.FileResource

sealed class FormData(
    val name: String
) {
    class StringFormData(name: String, val body: String): FormData(name) {
        override fun toString(): String {
            return super.toString() + ": " + body
        }
    }

    class FileFormData(name: String, val body: FileResource): FormData(name) {
        override fun toString(): String {
            return super.toString() + ": " + body
        }
    }

    override fun toString(): String {
        return name
    }
}