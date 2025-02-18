package ss.core.util

import java.util.concurrent.atomic.AtomicLong

// Thread-safe position tracker for managing write positions
class PositionTracker(initialPosition: Long = 0L) {
    private val position = AtomicLong(initialPosition)

    // Get current position and increment by written bytes
    fun next(bytesWritten: Int): Long {
        return position.getAndAdd(bytesWritten.toLong())
    }

    // Get the current position without modifying it
    fun current(): Long = position.get()

    // Manually update the position if needed
    fun update(newPosition: Long) {
        position.set(newPosition)
    }
}
