import {Ref, RefArray} from "./ref";

export function fromHTML(html, trim = true) {
	html = trim ? html.trim() : html;
	const template = document.createElement('template');
	template.innerHTML = html;
	return template.content.children[0];
}

export const tagMap = {}

export function createTagName(tag) {
	let count = 1
	if (tagMap[tag]) {
		count = tagMap[tag]
		count++
	}
	tagMap[tag] = count
	return count == 1 ? tag : tag + (count - 1)
}

let tabIndex = 0

export function getTabIndex() {
	return (++tabIndex).toString()
}

export class Element {

	/**
	 *
	 * @param { { tag, id, styles, attrs } } props
	 */
	constructor(props = {}) {
		this.createElement(props?.tag)
		this.style(props?.styles)
		this.attr(props?.attrs)
		if (props?.id) {
			this.id = createTagName(props.id)
		}
	}

	createElement(tag) {
		if(tag) {
			this.node = document.createElement(tag)
		}
	}

	/**
	 * Resets styles and attributes
	 *
	 * @param { string } c
	 */
	content(c) {
		this.node.innerHTML = c
	}


	style(...styles) {
		if (styles) {
			for (let i = 0; i < styles.length; ++i) {
				const style = styles[i]
				if (style) {
					for (const [key, value] of Object.entries(style)) {
						if (typeof value == 'string') {
							this.node.style[key] = value
						} else if (value instanceof Ref) {
							this.node.style[key] = value.value
							value.addObserver(
								(v) => {
									this.node.style[key] = value.value
								}
							)
						}
					}
				}
			}
		}
	}

	attr(...attrs) {
		if (!this.node) return
		if (attrs) {
			for (let i = 0; i < attrs.length; ++i) {
				const attr = attrs[i]
				if (attr) {
					for (const [key, value] of Object.entries(attr)) {
						this.node[key] = value
					}
				}
			}
		}
	}

	add(element) {
		if(element instanceof Element) {
			if (element.id) {
				this[element.id] = element
			}
			this.node.appendChild(element.node)
		}
	}

	onClick(onclick) {
		this.node.onclick = onclick
	}

	onMouse(over, out) {
		this.node.onmouseover = over
		this.node.onmouseout = out
	}

	hoverStyle(defaultStyle, overStyle) {
		this.onMouse(
			() => this.style(overStyle),
			() => this.style(defaultStyle)
		)
	}

	checkRef(data, onUpdate) {
		if (data instanceof Ref) {
			data.addObserver(
				(value, oldValue) => {
					onUpdate(value, oldValue)
				}
			)
			onUpdate(data.value)
		} else {
			onUpdate(data)
		}
	}

	replaceNode(node) {
		this.node.replaceWith(node)
		this.node = node
	}

	static fromNode(node) {
		const element = new Element()
		element.node = node
		return element
	}

	static tabIndex = 0
}

export class ElementCollection extends Element {

	/**
	 *
	 * @param { { tag, id, items, styles, attrs } } props
	 */
	constructor(props) {
		super(props)
		if (props) {
			this.items = props.items
		}
	}

	add(element) {
		if(element instanceof ElementCollection) {
			this.addChildInstances(element)
		}
		super.add(element)
	}

	addAll(elements) {
		for (const el of elements) {
			this.add(el)
		}
	}

	addChildInstances(collection) {
		for (const el of collection.items) {
			if(el instanceof ElementCollection) {
				this.addChildInstances(el)
			}
			if(el instanceof Element) {
				if (el.id) {
					this[el.id] = el
				}
			}
		}
	}
}

export class RefElementCollection extends Element {

	/**
	 *
	 * @param { { tag, id, items, toElement, styles, attrs } } props
	 */
	constructor(props) {
		super(props)
		this.toElement = props.toElement
		if (props.items instanceof RefArray) {
			for (const item of props.items.values) {
				this.onAdd(item)
			}
			props.items.addObserver(
				{
					onAdd: (value) => this.onAdd(value),
					onRemove: (value, index) => this.onRemove(value, index),
					onInsert: (value, index) => this.onInsert(value, index),
					onReplace: (index, value) => this.onReplace(index, value),
					onAddAll: (values) => this.onAddAll(values),
					onRemoveAll: (values) => this.onRemoveAll(values),
				}
			)
		}
	}

	onUpdate(values) {}

	onReplace(index, value) {
		const child = this.node.children[index]
		if (child) {
			child.replaceWith(this.toElement(value).node);
		}
	}

	onAdd(value) {
		this.node.appendChild(this.toElement(value).node)
	}

	onRemove(value, index) {
		const child = this.node.children[index]
		if (child) {
			this.node.removeChild(child)
		}
	}

	onInsert(value, index) {
		const child = this.node.children[index]
		if (child) {
			this.node.insertBefore(this.toElement(value).node, child)
		}
	}

	onAddAll(values) {
		for(const value in values) {
			this.onAdd(value)
		}
	}

	onRemoveAll(values) {

	}

}
