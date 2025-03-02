package ss.http.processor

import ss.http.request.*

class HttpRequestBodyProcessor(
    private val request: Request
) {

    var bodyBytes = ByteArray(0)

    fun process(bytes: ByteArray) {
        val headers = request.headers
        val contentLength = headers.contentLength
        bodyBytes += bytes
        when(request.method) {
            "GET" -> {}
            "POST" -> {
                when(headers.contentType) {
                    ContentType.JSON,
                    ContentType.TEXT,
                    ContentType.XML,
                    ContentType.FORM -> {

                    }
                    ContentType.MULTI_PART -> {
                        val boundary = headers.boundary

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
    }

}