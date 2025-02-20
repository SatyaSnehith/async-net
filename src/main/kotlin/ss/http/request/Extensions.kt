package ss.http.request

import ss.core.util.splitAndTrim
import ss.http.Headers
//import ss.net.util.splitAndTrim

private const val ContentDispositionName = "name="
private const val ContentDispositionFileName = "filename="


var Headers.contentType: ContentType?
    get() {
        val contentTypeValue = get(Headers.ContentType) ?: return null
        val parts = contentTypeValue.splitAndTrim(';')
        if (parts.isEmpty()) return null
        val mimeType = parts[0]
        return ContentType.entries.find { it.mime == mimeType }
    }
    set(value) {
        value?.mime?.let { set(Headers.ContentType, it) }
    }

val Headers.boundary: String?
    get() {
        val contentTypeValue = get(Headers.ContentType) ?: return null
        val parts = contentTypeValue.splitAndTrim(';')
        if (parts.size < 2) return null
        val boundaryPos = contentTypeValue.indexOf("boundary")
        if (boundaryPos == -1) return null
        return "--" + contentTypeValue.substring(boundaryPos + 9)
    }

var Headers.contentLength: Long?
    get() {
        return get(Headers.ContentLength)?.toLongOrNull()
    }
    set(value) {
        value?.toString()?.let { set(Headers.ContentLength, it) }
    }

val Request.isPost: Boolean
    get() {
        return method == Method.POST.name
    }

val Request.isHead: Boolean
    get() {
        return method == Method.HEAD.name
    }

val Headers.contentDisposition: ContentDisposition?
    get() {
        val contentDispositionValue = get(Headers.ContentDisposition) ?: return null
        val parts = contentDispositionValue.splitAndTrim(';')
        if (parts.size < 2) return null
        val type = parts[0]
        var name: String? = null
        var fileName: String? = null
        for (i in 1..< parts.size) {
            val part = parts[i].trim()
            if (part.startsWith(ContentDispositionName)) {
                name = part.removePrefix(ContentDispositionName).trim('"')
            }
            if (part.startsWith(ContentDispositionFileName)) {
                fileName = part.removePrefix(ContentDispositionFileName).trim('"')
            }
        }
        return ContentDisposition(
            type = type,
            name = name ?: return null,
            fileName = fileName
        )
    }