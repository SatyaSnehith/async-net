package ss.http.util

import ss.core.util.readLine
import ss.core.util.writeAsync
import ss.core.util.writeLine
import ss.http.Headers
import ss.http.HttpServer
import ss.http.request.Request
import ss.http.request.StringRequest
import ss.http.request.contentLength
import ss.http.response.Response
import ss.http.response.StringResponse
import java.nio.channels.AsynchronousSocketChannel

suspend fun AsynchronousSocketChannel.readHeaders(): Headers {
    val headers = Headers()

    while (true) {
        val line = readLine() ?: break
        if (line.isBlank()) break
        headers.add(line)
    }
    return headers
}

suspend fun AsynchronousSocketChannel.sendRequest(request: Request) {
    writeLine("${request.method} ${request.uri} ${HttpServer.VERSION}")
    request.headers.lines().forEach { line ->
        writeLine(line)
    }
    writeLine()
}

suspend fun AsynchronousSocketChannel.sendRequest(request: StringRequest) {
    request.headers.contentLength = request.body.length.toLong()
    sendRequest(request as Request)
    writeAsync(request.body)
}

suspend fun AsynchronousSocketChannel.readResponse(): Response {
    val startLine = readLine()
    val tokens = startLine?.split(' ').orEmpty()
    if (tokens.size != 3) throw IllegalArgumentException("server error $startLine")
//    val response = Response(
//        statusCode = tokens[1].toIntOrNull() ?: 0,
//        headers = readHeaders()
//    )
    println("startLine $startLine")
    val headers = readHeaders()
    println("headers $headers")
    val body = readLine().orEmpty()
    println("body $body")

    return StringResponse(body, tokens[1].toIntOrNull() ?: 0, headers)
}