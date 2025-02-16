package ss.core.util

fun String.splitAndTrim(char: Char): List<String> = split(char).map { it.trim() }
