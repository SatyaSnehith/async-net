package ss.core.util

object Logger {

    fun print(text: String) {
        println(text)
    }
}


fun Any.logError(throwable: Throwable, text: String) {
    val className = this::class.simpleName
    Logger.print("Error: [$className] $text -> ${throwable.message}")
//    throwable.printStackTrace()
}
fun Any.log(text: String) {
    val className = this::class.simpleName
    Logger.print("[$className] $text")
}