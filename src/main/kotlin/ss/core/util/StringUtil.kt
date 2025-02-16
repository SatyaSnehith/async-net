package ss.core.util

fun String.splitAndTrim(char: Char): List<String> = split(char).map { it.trim() }

fun Any.logError(throwable: Throwable, text: String) {
    val className = this::class.simpleName
    Logger.log("Error: [$className] $text -> ${throwable.message}")
//    throwable.printStackTrace()
}
fun Any.log(text: String) {
    val className = this::class.simpleName
    Logger.log("[$className] $text")
}