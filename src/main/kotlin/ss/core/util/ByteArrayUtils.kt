package ss.core.util

/**
 * Optimized implementation of Knuth-Morris-Pratt (KMP) algorithm for byte array substring search.
 * Supports searching within a specific range of the source array and has optimizations for short patterns.
 */
object ByteArrayUtils {
    // Threshold for using simple algorithm vs KMP
    private const val SIMPLE_SEARCH_THRESHOLD = 3

    /**
     * Finds the first occurrence of a pattern within a byte array.
     *
     * @param haystack The array to search within
     * @param needle The pattern to search for
     * @return The index of the first match, or -1 if not found
     */
    fun findSubarrayIndex(haystack: ByteArray, needle: ByteArray): Int {
        return findSubarrayIndex(haystack, 0, haystack.size, needle)
    }

    /**
     * Finds the first occurrence of a pattern within a specified range of a byte array.
     *
     * @param haystack The array to search within
     * @param startIndex The starting index to search from (inclusive)
     * @param endIndex The ending index to search to (exclusive)
     * @param needle The pattern to search for
     * @return The index of the first match, or -1 if not found
     */
    fun findSubarrayIndex(haystack: ByteArray, startIndex: Int, endIndex: Int, needle: ByteArray): Int {
        // Handle edge cases
        if (needle.isEmpty()) return startIndex
        if (startIndex < 0 || endIndex > haystack.size || startIndex > endIndex) {
            throw IndexOutOfBoundsException("Invalid search range: $startIndex to $endIndex")
        }
        if (endIndex - startIndex < needle.size) return -1

        // Use simpler algorithm for very short patterns
        if (needle.size <= SIMPLE_SEARCH_THRESHOLD) {
            return findSubarraySimple(haystack, startIndex, endIndex, needle)
        }

        // Use KMP for longer patterns
        return findSubarrayKMP(haystack, startIndex, endIndex, needle)
    }

    /**
     * Simple algorithm for finding pattern in array - more efficient for very short patterns.
     */
    private fun findSubarraySimple(haystack: ByteArray, startIndex: Int, endIndex: Int, needle: ByteArray): Int {
        val lastPossibleMatchPos = endIndex - needle.size

        outer@ for (i in startIndex..lastPossibleMatchPos) {
            for (j in needle.indices) {
                if (haystack[i + j] != needle[j]) continue@outer
            }
            return i // All bytes matched
        }

        return -1 // No match found
    }

    /**
     * KMP algorithm implementation for finding pattern in array - more efficient for longer patterns.
     */
    private fun findSubarrayKMP(haystack: ByteArray, startIndex: Int, endIndex: Int, needle: ByteArray): Int {
        val lps = computeLPSArray(needle)
        var i = startIndex // Index for haystack
        var j = 0 // Index for needle

        while (i < endIndex) {
            if (haystack[i] == needle[j]) {
                i++
                j++
                if (j == needle.size) return i - j // Found match
            } else {
                if (j != 0) {
                    j = lps[j - 1] // Use LPS to avoid rechecking
                } else {
                    i++
                }
            }
        }
        return -1
    }

    /**
     * Compute the Longest Prefix Suffix (LPS) array for KMP algorithm.
     * LPS[i] = longest proper prefix of pattern[0...i] which is also a suffix of pattern[0...i]
     */
    private fun computeLPSArray(pattern: ByteArray): IntArray {
        val lps = IntArray(pattern.size)
        var length = 0 // Length of previous longest prefix suffix
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

    /**
     * Finds all occurrences of a pattern within a byte array.
     *
     * @param haystack The array to search within
     * @param needle The pattern to search for
     * @return A list of all starting indices where the pattern is found
     */
    fun findAllMatches(haystack: ByteArray, needle: ByteArray): List<Int> {
        val matches = mutableListOf<Int>()
        var startIndex = 0

        while (true) {
            val index = findSubarrayIndex(haystack, startIndex, haystack.size, needle)
            if (index == -1) break
            matches.add(index)
            startIndex = index + 1
        }

        return matches
    }
}