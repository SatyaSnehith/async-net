package ss.http.util

import java.nio.ByteBuffer
import java.nio.channels.AsynchronousFileChannel
import java.nio.channels.CompletionHandler
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import java.util.concurrent.Future
import java.util.concurrent.atomic.AtomicBoolean
import kotlin.math.min

class FakeAsynchronousFileChannel() : AsynchronousFileChannel() {
    private val executor: ExecutorService = Executors.newSingleThreadExecutor()

    private val data = mutableListOf<Byte>()

    private val isOpen = AtomicBoolean(true)

    override fun isOpen(): Boolean = isOpen.get()

    override fun close() {
        isOpen.set(false)
        executor.shutdown()
    }

    override fun size(): Long = synchronized(this) { data.size.toLong() }

    override fun truncate(size: Long): AsynchronousFileChannel {
        throw UnsupportedOperationException("Truncate not supported in FakeAsynchronousFileChannel")
    }

    override fun force(metaData: Boolean) {
        // No-op: No real disk to flush in memory
    }

    override fun <A> read(
        dst: ByteBuffer,
        position: Long,
        attachment: A,
        handler: CompletionHandler<Int, in A>
    ) {
        try {
            val bytesRead = synchronized(this) {
                if (position >= data.size) -1
                else {
                    val length = min(dst.remaining(), (data.size - position).toInt())
                    dst.put(data.toByteArray(), position.toInt(), length)
                    length
                }
            }
            handler.completed(bytesRead, attachment)
        } catch (e: Exception) {
            handler.failed(e, attachment)
        }
    }

    override fun read(dst: ByteBuffer, position: Long): Future<Int> {
        return executor.submit<Int> {
            synchronized(this) {
                if (position >= data.size) return@submit -1
                val length = min(dst.remaining(), (data.size - position).toInt())
                dst.put(data.toByteArray(), position.toInt(), length)
                length
            }
        }
    }

    override fun <A> write(
        src: ByteBuffer,
        position: Long,
        attachment: A,
        handler: CompletionHandler<Int, in A>
    ) {
        try {
            val bytesWritten = synchronized(this) {
                val length = min(src.remaining(), data.size - position.toInt())
                src.get(data.toByteArray(), position.toInt(), length)
                length
            }
            handler.completed(bytesWritten, attachment)
        } catch (e: Exception) {
            handler.failed(e, attachment)
        }
    }

    override fun write(src: ByteBuffer, position: Long): Future<Int> {
        return executor.submit<Int> {
            synchronized(this) {
                val length = min(src.remaining(), data.size - position.toInt())
                src.get(data.toByteArray(), position.toInt(), length)
                length
            }
        }
    }

    override fun lock(position: Long, size: Long, shared: Boolean): Future<java.nio.channels.FileLock> {
        throw UnsupportedOperationException("Locks are not supported in FakeAsynchronousFileChannel")
    }

    override fun <A> lock(
        position: Long,
        size: Long,
        shared: Boolean,
        attachment: A,
        handler: CompletionHandler<java.nio.channels.FileLock, in A>
    ) {
        throw UnsupportedOperationException("Locks are not supported in FakeAsynchronousFileChannel")
    }

    override fun tryLock(position: Long, size: Long, shared: Boolean): java.nio.channels.FileLock {
        throw UnsupportedOperationException("Locks are not supported in FakeAsynchronousFileChannel")
    }
}
