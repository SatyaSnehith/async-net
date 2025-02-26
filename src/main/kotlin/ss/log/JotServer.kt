package ss.log

import ss.http.HttpServer
import ss.http.response.StringResponse

class JotServer: HttpServer(1112) {

    val logs = ArrayList<Jot>()
    init {
        addRoutes {
            post("/add") { request ->
                val log = request
                    .text
                    ?.toJot() ?: return@post StringResponse("Error")
                log.id = IdGenerator.nextId()
                logs.add(log)
                println("Log: ${log.id} ${log.type}")
                StringResponse("Success")
            }
            get("/all") {
                StringResponse(logs.toJson())
            }
        }
    }
}