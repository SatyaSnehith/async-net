package ss.http

import ss.core.ChannelHandler
import ss.core.file.FileResource
import ss.core.util.*
import ss.http.file.FileReceiver
import ss.http.file.FileSender
import ss.http.request.*
import ss.http.response.*
import ss.http.util.FakeAsynchronousFileChannel
import ss.http.util.IOUtil
import java.io.File
import java.nio.channels.AsynchronousSocketChannel
import kotlin.jvm.Throws

class HttpConnectionHandler: ChannelHandler {

    private val requestHandlers: ArrayList<RequestHandler> = ArrayList()

    val fileCreatorInterface = FileCreatorInterface { name ->
        val dir = File("/home/satya/Documents/LocalServerUploads")
        if (!dir.exists()) dir.mkdirs()
        val file = File(dir, name)
        file.createNewFile()
//        println("FILE ${file.absolutePath}")
        FileResource.fromFile(file)
    }

    val fileReceiver = FileReceiver()

    val fileSender = FileSender()

    override suspend fun action(channel: AsynchronousSocketChannel): ChannelHandler.Result {

        val request = try {
            channel.readRequest()
        } catch (e: Exception) {
            println("ERROR readRequest ${e.message} $e")
            channel.sendResponse(
                response = StringResponse(
                    statusCode = 400,
                    body = "Bad Request\n${e.message}"
                ),
            )
            return ChannelHandler.Result.CONTINUE
        }

        val requestHandler = requestHandlers.find {
            it.path == request.path &&
            (it.method.name == request.method || request.isHead)
        }
        println("requestHandler $requestHandler")

        var response = requestHandler?.onRequest(request) ?: StringResponse(
            statusCode = 400,
            body = "Bad Request\n${request.path} does not exist with ${request.method} method"
        )

        if (request.isHead) { // send only headers
            response = Response(response)
        }

        channel.sendResponse(
            response = response,
        )
        return ChannelHandler.Result.CONTINUE
    }


    @Throws(Exception::class)
    suspend fun AsynchronousSocketChannel.readRequest(): Request {
        var request = createRequest()
        println("START")
        println(request)

        val headers = request.headers

        if (request.isPost) {
            request = when(headers.contentType) {
                ContentType.JSON, ContentType.TEXT -> {
                    val len = request.headers.contentLength?.toInt()
                    val body = if (len != null) {
                        readAsync(len)
                    } else {
                        readAsync()
                    }
//                    Logger.line(body)
                    StringRequest(request, body)
                }
                ContentType.MULTI_PART -> {
                    val boundary = headers.boundary
                    val line = readLine()
//                    Logger.line(line)
                    if (line == boundary) {
                        val formDataList = ArrayList<FormData>()
                        var continueReading = true
                        var index = 0
                        while(continueReading) {
                            val formHeaders = readHeaders()
//                            Logger.headers(formHeaders)
                            val contentDisposition = formHeaders.contentDisposition
                                ?: throw Exception(
                                    "Incorrect ${Headers.ContentDisposition} -> ${formHeaders[Headers.ContentDisposition]}"
                                )
                            val fileName = contentDisposition.fileName
                            val name = contentDisposition.name.ifEmpty { index.toString() }
                            val formData: FormData = if (!fileName.isNullOrBlank()) {
                                val file = fileCreatorInterface.onCreateFile(fileName)
                                val fileFormDataInfo = fileReceiver.receiveFormData(
                                    socketChannel = this,
                                    file = file,
                                    length = formHeaders.contentLength,
                                    boundary = CRLF + boundary
                                )
                                continueReading = !(fileFormDataInfo.isLastFormDate)
//                                Logger.line("[file=${fileFormDataInfo.length}]")
                                FormData.FileFormData(name, file)
                            } else {
                                val byteArrayOutputStream = FakeAsynchronousFileChannel()
                                val formDataInfo = IOUtil.receiveFormData(
                                    socketChannel = this,
                                    fileChannel = byteArrayOutputStream,
                                    boundary = CRLF + boundary,
                                )
                                val data = byteArrayOutputStream.readAsync()
                                continueReading = !(formDataInfo.isLastFormDate)
//                                Logger.line(data)
                                FormData.StringFormData(name, data)
                            }
                            if (continueReading) {
//                                Logger.line(boundary)
                            }
                            formDataList.add(formData)
                            index++
                        }
//                        Logger.line("$boundary--")
//                        Logger.divider("END")
                        MultipartRequest(request, formDataList)
                    } else throw Exception("Not a boundary $line")
                }
                else -> {
                    request
                }
            }
        }
        return request
    }

    suspend fun AsynchronousSocketChannel.sendResponse(response: Response) {
        writeLine(response.startLine)
        for (header in response.headers.lines()) {
            writeLine(header)
        }
        writeLine()
        when(response) {
            is StringResponse -> {
                writeAsync(response.body)
            }
            is FileResponse -> {
                fileSender.send(
                    file = response.body,
                    socketChannel = this
                )
            }
        }
        close()
    }

    suspend fun AsynchronousSocketChannel.createRequest(): Request {
        val rLine = readLine()
        val method: String
        val path: String
        val version: String
        val tokens = rLine?.split(' ')?.toTypedArray().orEmpty()
        if (tokens.size == 3) {
            method = tokens[0]
            path = tokens[1]
            version = tokens[2]
        } else {
            throw Exception(rLine)
        }

        val headers = readHeaders()

        return Request(
            method = method,
            uri = path,
            version = version,
            headers = headers
        )
    }

    private suspend fun AsynchronousSocketChannel.readHeaders(): Headers {
        val headers = Headers()

        while (true) {
            val line = readLine() ?: break
            if (line.isBlank()) break
            println("readHeaders $line")
            headers.add(line)
        }
        return headers
    }

    fun static(
        fileMap: HashMap<String, FileResource>,
    ) {
        for ((path, file) in fileMap) {
            if (path == "/index.html") {
                get("/") {
                    FileResponse(
                        body = file
                    )

                }
            } else {
                get(path) {
                    FileResponse(
                        body = file
                    )
                }
            }
        }
    }


    fun get(
        path: String,
        respond: (Request) -> Response
    ) {
        addRequestHandler(
            method = Method.GET,
            path = path,
            respond = respond
        )
    }

    fun post(
        path: String,
        respond: (Request) -> Response
    ) {
        addRequestHandler(
            method = Method.POST,
            path = path,
            respond = respond
        )
    }

    private fun addRequestHandler(
        method: Method,
        path: String,
        respond: (Request) -> Response
    ) {
        requestHandlers.add(object: RequestHandler(method, path) {
            override fun onRequest(request: Request): Response {
                return respond(request)
            }
        })
    }

}

abstract class RequestHandler(
    val method: Method,
    val path: String
) {
    abstract fun onRequest(request: Request): Response

}
