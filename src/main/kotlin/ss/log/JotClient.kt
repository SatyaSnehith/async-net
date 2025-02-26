package ss.log

import ss.http.Headers
import ss.http.HttpClient
import ss.http.HttpServer
import ss.http.request.ContentType
import ss.http.request.Request
import ss.http.request.contentType

class JotClient(
    host: String
): HttpClient(
    host = host,
    port = 1112
) {
    suspend fun send(jot: Jot) {
        val headers = Headers()
        headers.contentType = ContentType.JSON
        send(
            Request(
                method = "POST",
                uri = "/add",
                version = HttpServer.VERSION,
                headers = headers,
                text = jot.toJson()
            )
        )
    }
}