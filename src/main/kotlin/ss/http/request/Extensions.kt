package ss.http.request

import ss.core.util.splitAndTrim
import ss.http.Headers
//import ss.net.util.splitAndTrim

private const val ContentDispositionName = "name="
private const val ContentDispositionFileName = "filename="



var Headers.contentType: ContentType?
    get() {
        val contentTypeValue = get(Headers.ContentType) ?: return null

        // Efficient parsing without redundant operations
        val firstSemicolon = contentTypeValue.indexOf(';')
        val mimeType = if (firstSemicolon != -1) {
            contentTypeValue.substring(0, firstSemicolon).trim()
        } else {
            contentTypeValue.trim()
        }

        // Use a map-based lookup if possible
        return contentTypeMap[mimeType]
    }
    set(value) {
        value?.mime?.let { set(Headers.ContentType, it) }
    }

val Headers.boundary: String?
    get() {
        val contentTypeValue = get(Headers.ContentType) ?: return null

        // Avoid redundant splitting, search for "boundary="
        val boundaryIndex = contentTypeValue.indexOf("boundary=")
        if (boundaryIndex == -1) return null

        // Extract boundary value efficiently
        return "--" + contentTypeValue.substring(boundaryIndex + 9).trim()
    }

var Headers.contentLength: Long?
    get() {
        return get(Headers.ContentLength)?.toLongOrNull()
    }
    set(value) {
        value?.toString()?.let { set(Headers.ContentLength, it) }
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

val Headers.transferEncoding: List<String>?
    get() {
        val value = get(Headers.TransferEncoding) ?: return null
        return value.splitAndTrim(',')
    }

val Headers.isChunked: Boolean
    get() = transferEncoding?.contains(Headers.ChunkedTransferEncoding) == true
