package ss.http.request

import ss.http.Headers
import kotlin.jvm.Throws

class Request(
    val method: String,
    val uri: String,
    val version: String,
    val headers: Headers = Headers(),
    val text: String? = null,
    val multiPart: List<FormData>? = null
) {

    fun copy(
        method: String = this.method,
        uri: String = this.uri,
        version: String = this.version,
        headers: Headers = this.headers,
        text: String? = this.text,
        multiPart: List<FormData>? = this.multiPart,
    ) = Request(
        method = method,
        uri = uri,
        version = version,
        headers = headers,
        text = text,
        multiPart = multiPart,
    )

    override fun toString(): String {
        return (
            listOf(method, uri, version).joinToString(" ") + "\n" +
            headers.lines().asSequence().joinToString("\n")
        )
    }

    companion object {

        @Throws(Exception::class)
        fun format(string: String): Request {
            val lines = string.lines()
            val startLine = lines.first().split(' ')
            if (startLine.size != 3) throw Exception("Invalid request start line format")

            val (method, path, version) = startLine
            val request = Request(method, path, version)

            for (index in 1 ..< lines.size) {
                request.headers.add(lines[index])
            }
            return request
        }

    }

}

val Request.isPost: Boolean
    get() {
        return method == Method.POST.name
    }

val Request.isHead: Boolean
    get() {
        return method == Method.HEAD.name
    }


val Request.path: String
    get() = uri.substringBefore('?')

val Request.queries: QueryList
    get() {
        val queries = QueryList()
        val parts = uri.split('?')
        if (parts.size > 1) {
            val queryString = parts[1]
            for (query in queryString.split('&')) {
                val equalPos = query.indexOf('=')
                if (equalPos == -1) {
                    queries.add(query to "")
                } else {
                    queries.add(
                        query.substring(0, equalPos) to
                                query.substring(equalPos + 1)
                    )
                }
            }
        }
        return queries
    }

val Request.hasBody: Boolean
    get() {
        val length = headers.contentLength
        return (length != null && length > 0) || headers.isChunked
    }
