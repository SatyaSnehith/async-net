package ss.log

import kotlinx.coroutines.runBlocking
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

val JotEnabled = true

fun Jot.debug(): Jot = apply { level = "DEBUG" }

fun Jot.info(): Jot = apply { level = "INFO" }

fun Jot.error(): Jot = apply { level = "ERROR" }

fun Jot.tag(tag: String): Jot = apply { this.tag = tag }


fun Jot.metadata(key: String, value: String): Jot = apply {
    metadata = (metadata ?: emptyMap()) + (key to value)
}

fun Jot.metadata(data: Map<String, String>): Jot = apply {
    metadata = (metadata ?: emptyMap()) + data
}

fun Jot.stackTrace(e: Throwable): Jot = apply {
    if (JotEnabled) {
        this.stackTrace = e.stackTraceToString()
    }
}

fun Jot.stackTrace(): Jot = apply {
    if (JotEnabled) {
        this.stackTrace = Thread.currentThread().stackTrace.joinToString("\n")
    }
}

fun Jot.string(string: String): Jot = apply {
    this.string = string
    this.type = "String"
}

fun Jot.http(http: HttpLog): Jot = apply {
    this.http = http
    this.type = "HttpLog"
}

fun Jot.boolean(boolean: Boolean): Jot = apply {
    this.boolean = boolean
    this.type = "Boolean"
}

fun Jot.int(int: Int): Jot = apply {
    this.int = int
    this.type = "Int"
}

fun Jot.long(long: Long): Jot = apply {
    this.long = long
    this.type = "Long"
}

fun Jot.float(float: Float): Jot = apply {
    this.float = float
    this.type = "Float"
}

fun Jot.double(double: Double): Jot = apply {
    this.double = double
    this.type = "Double"
}

val JotJson = Json {
    encodeDefaults = true
    ignoreUnknownKeys = true
    explicitNulls = false
}

fun Jot.toJson(): String = JotJson.encodeToString(this)

fun Collection<Jot>.toJson(): String = JotJson.encodeToString(this)

fun String.toJot(): Jot = JotJson.decodeFromString(this)

fun Jot.send() {
    if (JotEnabled) {
        time = System.currentTimeMillis()
        threadName = Thread.currentThread().name
        runBlocking {
            println("client jot send")
            JotClient("localhost").send(this@send)
        }
    }
}

//fun Jot.exception(e: Throwable): Jot = apply {
//    stackTrace = e.stackTraceToString()
//}

//fun Collection<Jot>.sendAll(logAction: (Jot) -> Unit) {
//    forEach(logAction)
//}

//fun Jot(block: Jot.() -> Unit): Jot {
//    return Jot().apply(block)
//}
