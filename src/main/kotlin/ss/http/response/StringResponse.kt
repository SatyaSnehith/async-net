package ss.http.response

import ss.http.Headers

class StringResponse(
    val body: String,
    statusCode: Int = 200,
    headers: Headers = Headers(),
): Response(
    statusCode,
    headers
) {

    init {
        headers[Headers.ContentLength] = body.length.toString()
    }

    override fun toString(): String {
        return super.toString() + "\n" + body
    }

}