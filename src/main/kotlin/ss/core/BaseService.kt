package ss.core

import kotlinx.coroutines.*
import ss.core.util.logError

open class BaseService {
    private val job = SupervisorJob()
    val scope = CoroutineScope(Dispatchers.IO + job)
    @Volatile
    var isRunning = false
        private set

    open suspend fun start() {
        if (!isRunning) {
            isRunning = true
            try {
                onStart()
            } catch (e: Exception) {
                logError(e, "start()")
            }
        }
    }

    open suspend fun stop() {
        if (isRunning) {
            println("stopped")
            isRunning = false
            scope.coroutineContext.cancelChildren()
            onStop()
        }
    }

    protected open suspend fun onStart() {
        // Override to implement startup logic
    }

    protected open suspend fun onStop() {
        // Override to implement shutdown logic
    }

    fun launchTask(block: suspend CoroutineScope.() -> Unit): Job {
        return scope.launch {
            supervisorScope {
                block()
            }
        }
    }
}