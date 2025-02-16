package ss.http.response

import ss.core.file.FileResource
import ss.http.Headers

class FileResponse(
    statusCode: Int = 200,
    headers: Headers = Headers(),
    val body: FileResource
): Response(
    statusCode,
    headers
) {

    init {
        headers[Headers.ContentLength] = body.length().toString()
        headers[Headers.ContentType] = body.mime
    }

    override fun toString(): String {
        return super.toString() + "\n" + body
    }

}