package ss.http.request

typealias QueryList = ArrayList<Pair<String, String>>

operator fun QueryList.get(key: String): String? {
    return find { it.first == key }?.second
}

fun QueryList.getAll(key: String): List<String> {
    return filter {
        it.first == key
    }.map { it.second }
}


