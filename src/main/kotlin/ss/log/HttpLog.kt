package ss.log

import kotlinx.serialization.Serializable

@Serializable
class HttpLog(
    var url: String,
    var method: String,
    var request: HttpRequestLog,
    var response: HttpResponseLog,
    var timestamp: Long,
    var duration: Long? = null,
    var status: String? = null,
    var error: String? = null
)

@Serializable
class HttpRequestLog(
    var method: String? = null,
    var queryParams: Map<String, String>? = null, // Query parameters (for logging GET requests)
    var headers: Map<String, String>,
    var body: String? = null         // Request body (optional for GET, required for POST, etc.)
)

@Serializable
class HttpResponseLog(
    var code: Int,
    var headers: Map<String, String>,
    var body: String? = null,
    var size: Long? = null
)


