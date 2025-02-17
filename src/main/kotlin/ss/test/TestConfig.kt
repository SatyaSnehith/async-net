package ss.test

object TestConfig {
    const val DEFAULT_PORT = 8080
    const val DEFAULT_HOST = "localhost"
    
    data class TestOptions(
        val port: Int = DEFAULT_PORT,
        val host: String = DEFAULT_HOST,
        val verbose: Boolean = false
    )
} 