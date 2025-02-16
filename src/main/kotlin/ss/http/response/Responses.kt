package ss.http.response

fun badRequest(body: String): StringResponse {
    return StringResponse(
        body = body
    )
}

fun notFound(body: String = "Not found"): StringResponse {
    return StringResponse(
        body = body
    )
}
