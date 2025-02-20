package ss.log

import ss.http.HttpServer
import ss.http.request.StringRequest
import ss.http.response.StringResponse

class JotServer: HttpServer(1112) {

    val logs = ArrayList<Jot>()
    init {
        addRoutes {
            post("/add") { request ->
                (request as? StringRequest)
                    ?.body
                    ?.toJot() ?: return@post StringResponse("Error")
                val log = Jot().debug().stackTrace().tag("API").string("Add")
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