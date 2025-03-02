package ss.http.processor

import ss.http.request.*

class HttpRequestBodyProcessor(
    private val request: Request
) {

    val isChunked = request.headers.isChunked

    val headers = request.headers

    val contentLength = headers.contentLength

    val boundary = headers.boundary

    var readLength = 0L


    private fun chunkedProcess(bytes: ByteArray): ByteArray? {
        return bytes
    }

    fun process(bytes: ByteArray): Boolean {
        return actualProcess(
            if (isChunked) chunkedProcess(bytes) ?: return true
            else bytes
        )
    }

    private fun actualProcess(bytes: ByteArray): Boolean {
        readLength += bytes.size
        if (readLength == contentLength) return true
        when(request.method) {
            "GET" -> {}
            "POST" -> {
                when(headers.contentType) {
                    ContentType.JSON,
                    ContentType.TEXT,
                    ContentType.XML,
                    ContentType.FORM -> {
                        println("body: ${String(bytes)}")
                    }
                    ContentType.MULTI_PART -> {

                    }
                    else -> {

                    }
                }
            }
            "PATCH" -> {}
            "DELETE" -> {}
            "HEAD" -> {}
            else -> {

            }
        }
        return false
    }
}