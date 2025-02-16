package ss.http.request

import ss.http.Headers

open class Request(
    val method: String,
    val uri: String,
    val version: String,
    val headers: Headers,
) {

    val path: String
    val queries = QueryList()

    init {
        val parts = uri.split('?')
        path = parts[0]
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
    }

    override fun toString(): String {
        return listOf(
            listOf(method, path, version).joinToString(" "),
            headers
        ).joinToString("\n")
    }

}
