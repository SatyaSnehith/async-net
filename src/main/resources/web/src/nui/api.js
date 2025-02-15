import {ref} from "./ref";

export class ApiCall {

	/**
	 *
	 * @param { {
	 * url: String,
	 * } } props
	 */
	constructor(
		props = {}
	) {
		this.url = props?.url
		this.isLoading = ref(true)
		this.data = null;
		this.subscribers = []
	}

	async api() {
		try {
			const response = await fetch(this.url)
			if (!response.ok) throw new Error('Network response was not ok');
			return (await response.json())
		} catch (error) {
			console.error('Failed to fetch users:', error);
			return null;
		}
	}

	async call() {
		this.isLoading.value = true
		this.data = await this.api()
		this.isLoading.value = false
		this.notify()
	}

	subscribe(callback) {
		this.subscribers.push(callback);
	}

	notify() {
		if (this.data) {
			this.subscribers.forEach(callback => callback(this.data));
		}
	}
}