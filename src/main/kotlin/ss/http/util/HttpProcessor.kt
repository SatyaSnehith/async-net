package ss.http.util

import ss.http.request.ContentType
import ss.http.request.Request
import java.nio.ByteBuffer
import java.nio.channels.AsynchronousSocketChannel
import java.nio.channels.CompletionHandler

enum class ProcessState {
    RequestHeader,
    RequestBody,
    CreateResponse,
    SendResponse
}

val state = arrayOf(
    ProcessState.RequestHeader,
    ProcessState.RequestBody,
    ProcessState.CreateResponse,
    ProcessState.SendResponse
)

class HttpProcessor(
    private val channel: AsynchronousSocketChannel
) : CompletionHandler<Int, Unit> {

    private var buffer = ByteBuffer.allocateDirect(130)

    var state: ProcessState = ProcessState.RequestHeader

    var request: Request? = null

    var contentType: ContentType? = null

    fun start() {
        read()
    }

    private fun read() {
        channel.read(buffer, Unit, this)
    }

    private fun write() {
        channel.write(buffer, Unit, this)
    }

    override fun completed(r: Int?, a: Unit?) {
        if (r == -1) return
        println("Read $r")
        buffer.flip()
        val bytes = ByteArray(r ?: buffer.remaining())
        buffer.get(bytes)
        if (headerDividerIndex > -1) {
            processBody(bytes)
        } else {
            processHeader(bytes)
        }
        buffer.clear()
        read()
    }

    override fun failed(e: Throwable?, a: Unit?) {

    }

    var requestHeaderBytes: ByteArray = ByteArray(0)

    val HeaderDivider = "\r\n\r".toByteArray()

    var headerDividerIndex = -1

    fun processHeader(bytes: ByteArray) {
        requestHeaderBytes += bytes

        headerDividerIndex = findSubarrayIndex(requestHeaderBytes, HeaderDivider)
        if (headerDividerIndex > -1) {
            val headerBytes = requestHeaderBytes.sliceArray(0..< headerDividerIndex)
            request = Request.format(String(headerBytes))
            processBody(requestHeaderBytes.sliceArray(headerDividerIndex + 4 ..< requestHeaderBytes.size))
        }
    }

    private fun processBody(bytes: ByteArray) {
        println(String(bytes))
    }

}

fun findSubarrayIndex(haystack: ByteArray, needle: ByteArray): Int {
    if (needle.isEmpty() || haystack.size < needle.size) return -1

    val lps = computeLPSArray(needle)  // Compute the LPS array
    var i = 0  // Index for haystack
    var j = 0  // Index for needle

    while (i < haystack.size) {
        if (haystack[i] == needle[j]) {
            i++
            j++
            if (j == needle.size) return i - j  // Found match
        } else {
            if (j != 0) {
                j = lps[j - 1]  // Use LPS to avoid rechecking
            } else {
                i++
            }
        }
    }
    return -1
}

fun computeLPSArray(pattern: ByteArray): IntArray {
    val lps = IntArray(pattern.size)
    var length = 0  // Length of previous longest prefix suffix
    var i = 1

    while (i < pattern.size) {
        if (pattern[i] == pattern[length]) {
            length++
            lps[i] = length
            i++
        } else {
            if (length != 0) {
                length = lps[length - 1]
            } else {
                lps[i] = 0
                i++
            }
        }
    }
    return lps
}