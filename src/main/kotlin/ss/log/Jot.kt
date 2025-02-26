package ss.log

import kotlinx.serialization.Serializable

@Serializable
class Jot(
    var id: Long = IdGenerator.nextId(),
    var tag: String = "Default",
    var type: String = "String",                           // String, HttpLog, Boolean, Int, Long, Float, Double
    var level: String = "INFO",                          // "INFO", "ERROR", "DEBUG"
    var metadata: Map<String, String>? = null,
    var threadName: String? = null,
    var stackTrace: String? = null,
    var time: Long = -1,
    var duration: Long = -1,

    var string: String? = null,
    var http: HttpLog? = null,
    var boolean: Boolean? = null,
    var int: Int? = null,
    var long: Long? = null,
    var float: Float? = null,
    var double: Double? = null,
)