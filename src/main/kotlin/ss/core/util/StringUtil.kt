package ss.core.util

fun String.splitAndTrim(char: Char): List<String> {
    val result = mutableListOf<String>()
    var start = 0
    val length = length

    for (i in 0..length) {
        if (i == length || this[i] == char) {
            if (start < i) {
                result.add(substring(start, i).trim())
            }
            start = i + 1
        }
    }
    return result
}