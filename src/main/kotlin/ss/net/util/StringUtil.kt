package ss.net.util

fun String.splitAndTrim(char: Char): List<String> = split(char).map { it.trim() }