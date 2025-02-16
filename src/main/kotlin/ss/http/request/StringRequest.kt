package ss.http.request

import ss.http.Headers

class StringRequest(
    method: String,
    path: String,
    version: String,
    headers: Headers,
    val body: String
): Request(
    method,
    path,
    version,
    headers,
) {

    constructor(request: Request, body: String):
            this(
                method = request.method,
                path = request.path,
                version = request.version,
                headers = request.headers,
                body = body
            )

    override fun toString(): String {
        return super.toString() + "\n" + body
    }

}