package ss.http.response

object StatusMessages: ArrayList<String?>() {

    init {
        repeat(600) {
            add(null)
        }
        this[200] = "OK"
        this[201] = "Created"
        this[206] = "Partial Content"
        this[400] = "Bad Request"
        this[401] = "Unauthorized"
        this[403] = "Forbidden"
        this[404] = "Not Found"
    }
}