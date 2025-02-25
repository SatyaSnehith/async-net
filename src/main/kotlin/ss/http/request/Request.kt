package ss.http.request

import ss.http.Headers

class Request(
    val method: String,
    val uri: String,
    val version: String,
    val headers: Headers = Headers(),
    val text: String? = null,
    val multiPart: List<FormData>? = null
) {

    val path: String
        get() = uri.substringBefore('?')

    val queries: QueryList
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
        return listOf(
            listOf(method, uri, version).joinToString(" "),
            headers
        ).joinToString("\n")
    }

}
