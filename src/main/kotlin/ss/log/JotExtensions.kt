package ss.log

import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

const val JotEnabled = true

fun jot(
    block: Jot.() -> Unit
): Jot = Jot().apply(block)

fun Jot.debug(any: Any) {
    this.level = "DEBUG"
    log(any)
}

fun Jot.info(any: Any) {
    this.level = "INFO"
    log(any)
}

fun Jot.error(any: Any) {
    this.level = "ERROR"
    log(any)
}
fun Jot.log(any: Any) {
    if (any is Throwable) {
        stackTrace(any)
    }
    when(any) {
        is String -> {
            this.string = any
            this.type = "String"
        }
        is HttpLog -> {
            this.http = any
            this.type = "HttpLog"
        }
        is Boolean -> {
            this.boolean = any
            this.type = "Boolean"
        }
        is Int -> {
            this.int = any
            this.type = "Int"
        }
        is Long -> {
            this.long = any
            this.type = "Long"
        }
        is Float -> {
            this.float = any
            this.type = "Float"
        }
        is Double -> {
            this.double = any
            this.type = "Double"
        }
        else -> {
            this.string = any.toString()
            this.type = "String"
        }
    }
    send()
}

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

inline fun Jot.track(
    block: () -> Unit
) {
    if (JotEnabled) {
        val start = System.currentTimeMillis()
        block()
        duration = System.currentTimeMillis() - start
    } else {
        block()
    }
}

fun Jot.stackTrace(): Jot = apply {
    if (JotEnabled) {
        this.stackTrace = Thread.currentThread().stackTrace.joinToString("\n")
    }
}

val JotJson = Json {
    encodeDefaults = true
    ignoreUnknownKeys = true
    explicitNulls = false
}

fun Jot.toJson(): String = JotJson.encodeToString(this)

fun Collection<Jot>.toJson(): String = JotJson.encodeToString(this)

fun String.toJot(): Jot = JotJson.decodeFromString(this)

val jotClientService = JotClientService("localhost")

fun Jot.send() {
    if (JotEnabled) {
        time = System.currentTimeMillis()
        threadName = Thread.currentThread().name
//        jotClientService.send(this@send)
    }
}

fun Jot.print() {
    val message: Any? = when(this.type) {
        "HttpLog" -> {
            this.http
        }
        "Boolean" -> {
            this.boolean
        }
        "Int" -> {
            this.int
        }
        "Long" -> {
            this.long
        }
        "Float" -> {
            this.float
        }
        "Double" -> {
            this.double
        }
        else -> {
            this.string
        }
    }
    val logTemplate = "[ID: $id] [Tag: $tag] [Type: $type] [Level: $level] [Time: $time] [Duration: ${duration}ms]"
    println(logTemplate)
    if (message is HttpLog) {
        message.apply {
            request.apply {
                println("<-- $method $url")
                headers.forEach {
                    println("${it.key}: ${it.value}")
                }
                body?.let {
                    println(it)
                }
            }
            response.apply {
                println("--> $code $url")
                headers.forEach {
                    println("${it.key}: ${it.value}")
                }
                body?.let {
                    println(it)
                }
            }
        }
    } else {
        print(" Message: $message")
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
