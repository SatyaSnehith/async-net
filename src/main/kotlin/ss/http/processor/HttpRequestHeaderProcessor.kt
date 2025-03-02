package ss.http.processor

import ss.core.util.ByteArrayUtils
import ss.core.util.CRLF
import ss.http.request.*
import java.nio.ByteBuffer

class HttpRequestHeaderProcessor {

    /** Standard HTTP header-body separator */
    private val HEADER_DIVIDER = "$CRLF$CRLF".toByteArray()

    /** Buffer to accumulate header bytes */
    private val headerBuffer = ByteBuffer.allocate(MAX_HEADER_SIZE)

    /** Index where the header divider was found, -1 if not found */
    private var headerDividerIndex = -1

    var remainingBodyBytes = ByteArray(0)

    /**
     * Process incoming bytes that may contain HTTP header data.
     *
     * @param byteArray The incoming bytes to process
     * @throws IllegalStateException If headers exceed maximum allowed size
     */
    fun process(byteArray: ByteArray): Request? {
        if (headerBuffer.position() + byteArray.size > MAX_HEADER_SIZE) {
            throw IllegalStateException("HTTP header too large, possible DOS attack")
        }

        // Add new bytes to buffer
        headerBuffer.put(byteArray)

        // Check for header divider
        val bufferArray = headerBuffer.array()
        headerDividerIndex = ByteArrayUtils.findSubarrayIndex(bufferArray, 0, headerBuffer.position(), HEADER_DIVIDER)

        if (headerDividerIndex > -1) {
            // Extract and process header
            val headerBytes = ByteArray(headerDividerIndex)
            System.arraycopy(bufferArray, 0, headerBytes, 0, headerDividerIndex)
            val request = Request.format(String(headerBytes))
            println("Header ${String(headerBytes)}")

            // Process body (bytes after the divider)
            val bodyStartIndex = headerDividerIndex + HEADER_DIVIDER.size
            val bodyLength = headerBuffer.position() - bodyStartIndex

            if (bodyLength > 0) {
                val bodyBytes = ByteArray(bodyLength)
                System.arraycopy(bufferArray, bodyStartIndex, bodyBytes, 0, bodyLength)
                remainingBodyBytes = bodyBytes
            }

            // Reset for next request
            headerBuffer.clear()

            return request
        }
        return null
    }



    companion object {
        /** Maximum allowed header size to prevent DOS attacks */
        private const val MAX_HEADER_SIZE = 8192
    }

}

