package ss.log

import java.util.concurrent.atomic.AtomicLong

object IdGenerator {
    private val counter = AtomicLong(1)

    fun nextId(): Long = counter.getAndIncrement()
}