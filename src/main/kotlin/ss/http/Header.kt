package ss.http

class Headers {

    val values: MutableMap<String, String> = mutableMapOf()

    @Throws(IllegalArgumentException::class)
    fun add(header: String) {
        val split = header.indexOf(':')
        if (split != -1) {
            values += Pair(header.substring(0, split).trim(), header.substring(split + 1).trim())
        } else throw IllegalArgumentException()
    }

    override fun toString(): String {
        return values.toList().joinToString("\n") {
            "${it.first}: ${it.second}"
        }
    }

    operator fun set(key: String, value: String) {
        values[key] = value
    }

    operator fun get(key: String): String? {
        return values.getOrDefault(key, null)
    }

    operator fun iterator() = values.iterator()

    fun lines() = object: Iterator<String> {
        val i = this@Headers.iterator()

        override fun hasNext() = i.hasNext()

        override fun next(): String {
            val entry = i.next()
            return "${entry.key}: ${entry.value}"
        }

    }

    companion object {
        const val MaxAgeCache = "public, max-age=31536000"
        const val HourAgeCache = "max-age=3600"

        //common
        const val Connection = "Connection"
        const val ContentType = "Content-Type"

        //request headers
        const val Range = "Range"
        const val UserAgent = "User-Agent"
        const val Accept = "Accept"
        const val AcceptLanguage = "Accept-Language"
        const val Host = "Host"
        const val AcceptEncoding = "Accept-Encoding"
        const val CacheControl = "Cache-Control"
        const val Cookie = "Cookie"
        const val ContentDisposition = "Content-Disposition"
        const val Authorization = "Authorization"

        //response headers
        const val Server = "Server"
        const val ContentLength = "Content-Length"
        const val ContentRange = "Content-Range"
        const val ContentEncoding = "Content-Encoding"
        const val Expires = "Expires"
        const val Date = "Date"
        const val SetCookie = "Set-Cookie"
        const val Age = "Age"
        const val TransferEncoding = "Transfer-Encoding"
        const val Vary = "Vary"

        const val ContentDispositionTypeInline = "inline"
        const val ContentDispositionTypeAttachment = "attachment"

    }
}