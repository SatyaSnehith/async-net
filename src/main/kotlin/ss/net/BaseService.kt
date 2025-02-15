package ss.net

import kotlinx.coroutines.*

open class BaseService {
    private val job = SupervisorJob()
    private val scope = CoroutineScope(Dispatchers.IO + job)
    @Volatile
    var isRunning = false
        private set

    open fun start() {
        if (!isRunning) {
            isRunning = true
            onStart()
        }
    }

    open fun stop() {
        if (isRunning) {
            isRunning = false
            scope.coroutineContext.cancelChildren()
            onStop()
        }
    }

    protected open fun onStart() {
        // Override to implement startup logic
    }

    protected open fun onStop() {
        // Override to implement shutdown logic
    }

    protected fun launchTask(block: suspend CoroutineScope.() -> Unit): Job {
        return scope.launch {
            supervisorScope {
                block()
            }
        }
    }
}