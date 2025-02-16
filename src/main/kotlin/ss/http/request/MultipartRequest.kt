package ss.http.request

import ss.http.Headers

class MultipartRequest (
    method: String,
    path: String,
    version: String,
    headers: Headers,
    val body: List<FormData>
): Request(
    method,
    path,
    version,
    headers,
) {

    constructor(request: Request, body: List<FormData>):
            this(
                method = request.method,
                path = request.path,
                version = request.version,
                headers = request.headers,
                body = body
            )

    override fun toString(): String {
        return super.toString() + "\n--${ContentType.MULTI_PART}\n" + body.joinToString("\n")
    }

}