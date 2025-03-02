package ss.http.request

enum class ContentType(val mime: String) {
    FORM("application/x-www-form-urlencoded"),
    MULTI_PART("multipart/form-data"),
    JSON("application/json"),
    TEXT("text/plain"),
    XML("application/xml")
}

val contentTypeMap: Map<String, ContentType> = ContentType.entries.associateBy { it.mime }
