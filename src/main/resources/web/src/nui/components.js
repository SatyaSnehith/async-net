import {createTagName, Element, fromHTML, RefElementCollection} from "./element";
import {Color, Icon, Style} from "./style";
import {Ref, ref, refArray} from "./ref";


const body = document.body

export const SizeObserver = {
	observers: [],
	mobileMaxWidth: 760,
	isMobile: body.clientWidth < 760,
	isMobileListening: false,

	listen: function() {
		this.isMobileListening = true
		window
			.matchMedia("(max-width: " + SizeObserver.mobileMaxWidth + "px)")
			.addEventListener("change", (x) => {
				this.isMobile = x.matches
				for (const observer of this.observers) {
					observer(this.isMobile)
				}
			});
	},

	addObserver: function(observer) {
		if (!this.isMobileListening) {
			this.listen()
		}
		observer(this.isMobile)
		this.observers.push(observer)
	}
}
SizeObserver.addObserver((isMobile) => console.log("isMobile: " + isMobile))

export class VerticalSpace extends Element {
	constructor(margin) {
		super(
			{
				tag: 'div',
				styles: {
					marginTop: margin
				}
			}
		)
	}
}

export class HorizontalSpace extends Element {
	constructor(margin) {
		super(
			{
				tag: 'div',
				styles: {marginLeft: margin}
			}
		)
	}
}

export class HorizontalDivider extends Element {

	/**
	 *
	 * @param { { styles } } props
	 */
	constructor(
		props
	) {
		super(
			{
				tag: 'div',
				styles: {
					height: '1px',
					backgroundColor: Color.BorderColor,
					...props.styles,
				}
			}
		)
	}
}

export class Row extends Element {

	/**
	 *
	 * @param { { id, items, styles, attrs } } props
	 */
	constructor(props = {}) {
		super(
			{
				tag: 'div',
				...props
			}
		)
		this.style(Style.Row)
		for(const e of props?.items ?? []) {
			this.add(e)
		}
	}

}


export class Column extends Element {

	/**
	 *
	 * @param { { id, items, styles, attrs } } props
	 */
	constructor(props = {}) {
		super(
			{
				tag: 'div',
				...props
			}
		)
		this.style(Style.Column)
		for(const e of props?.items ?? []) {
			this.add(e)
		}
	}
}

export class Text extends Element {

	/**
	 *
	 * @param { { text, styles, attrs } } props
	 */
	constructor(props = {}) {
		super(
			{
				tag: 'div',
				attrs: props.attrs,
				styles: {
					...{
						margin: '0px',
						color: Color.TextColor,
						fontWeight: '300'
					},
					...props.styles,
				}
			}
		)
		this.checkRef(
			props.text,
			(value) => {
				this.content(value)
			}
		)
	}

}

export class SvgIcon extends Element {

	/**
	 *
	 * @param { { svgName, size, styles, attrs } } props
	 */
	constructor(props = {}) {
		super()
		this.size = props.size || '18px'
		this.node = fromHTML(Icon.icons[props.svgName])
		this.style(
			{
				...Style.Size(this.size),
				...props.styles,
				stoke: Color.TextColor,
				...Style.Size(this.size),
			}
		)
		this.attr(props.attrs)
	}

	/**
	 *
	 * @param { { svg, size, styles } } props
	 */
	content(props) {
		if (props.svg) {
			super.content(props.svg)
		}
		this.style(
			{
				...props.styles,
				verticalAlign: 'top', // svg bug
				pointerEvents: 'none',
				...Style.Size(this.size),
				stoke: Color.TextColor,
			},
		)
	}

}

export class IconButton extends Element {

	/**
	 *
	 * @param { { svgName, styles, attrs } } props
	 */
	constructor(props = {}) {
		super(
			{
				tag: 'div',
				attrs: props.attrs,
				styles: {
					display: 'flex',
					padding: '8px',
					borderRadius: '6px',
					alignItems: 'center',
					...Style.Pointer,
					...props.styles,
				}
			}
		)

		this.svg = new SvgIcon(
			{
				svgName: Ref.getValue(props.svgName),
				size: '16px',
			}
		)
		this.checkRef(
			props.svgName,
			(value) => {
		    console.log("svg change " + value)
        this.svg.replaceNode(fromHTML(Icon.icons[value]))
			}
		)
		this.add(this.svg)
		this.hoverStyle(Style.EmptyBg, Style.CardBg)
	}
}

export class Button extends Element {

	/**
	 *
	 * @param { { text, href, svgName, styles, attrs } } props
	 */
	constructor(props = {}) {
		super(
			{
				tag: 'div',
				...props
			}
		)
		this.hoverStyle(Style.EmptyBg, Style.CardBg)
		this.style(
			{
				margin: '0px',
				color: Color.TextColor,
			},
			Style.BorderRadius('4px'),
			Style.Padding('4px 8px'),
			Style.Pointer
		)
		if (props.svgName) {
			this.style(
				{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
				}
			)
			this.svg = new SvgIcon(
				{
					svgName: props.svgName,
					size: '16px'
				}
			)
			this.add(this.svg)
			this.add(
				new HorizontalSpace('8px')
			)
		}
		this.add(
			new Text(
				{
					text: props.text,
				}
			)
		)
		if (props.href) {
			this.href(props.href)
		}
	}

	href(ref) {
		this.node.href = ref
	}
}

export class Tabs extends RefElementCollection {

	/**
	 * @param { {
	 * id: String,
	 * selectedItem: Ref,
	 * tabItems: RefArray,
	 * toElement: Function,
	 * styles: Object,
	 * attrs: Object
	 * } } props
	 */
	constructor(props = {}) {
		super(
			{
				tag: 'div',
				items: props.tabItems,
				toElement: props.toElement,
				styles: {
					display: 'flex',
					...props.styles,
				},
				attrs: props.attrs
			}
		)
		this.tabItems = props.tabItems
		this.checkRef(
			props.selectedItem,
			(value, oldValue) => {
				if (oldValue === value) return
				this.swapSelection(value)
				this.swapSelection(oldValue)
			}
		)
	}

	swapSelection(text) {
		if (!text) return
		const item = this.tabItems.find(
			(i) => {
				return i.text === text
			}
		)
		if (!item) return
		item.selected.value = !item.selected.value
	}

	static createTabItem(text, selected = false) {
		return {
			text: text,
			selected : ref(selected)
		}
	}

	/**
	 *
	 * @param { String } textList
	 * @returns
	 */
	static createTabItems(...textList) {
		return refArray(
			...textList.map(
				t => Tabs.createTabItem(t)
			)
		)
	}
}


export class TitleTabs extends Tabs {
	/**
	 * @param { {
	 * id: String,
	 * selectedItem: Ref,
	 * tabItems: RefArray,
	 * styles: Object,
	 * attrs: Object
	 * } } props
	 */
	constructor(props = {}) {
		super(
			{
				...props,
				toElement: (item) => {
					const text = new Text(
						{
							text: item.text,
							styles: {
								padding: '6px',
								...Style.Pointer
							},
							attrs: {
								onclick: () => {
									props.selectedItem.value = item.text
								}
							}
						}
					)
					text.checkRef(
						item.selected,
						(selected) => {
							text.style(
								{
									color: selected ? Color.TextColor : Color.DescriptionColor,
									fontWeight: selected ? '400' : '300',
								}
							)
						}
					)
					return text
				}
			}
		)
	}
}

export class UnderlineTabs extends Tabs {
	/**
	 * @param { {
	 * id: String,
	 * selectedItem: Ref,
	 * tabItems: RefArray,
	 * styles: Object,
	 * attrs: Object
	 * } } props
	 */
	constructor(props = {}) {
		super(
			{
				...props,
				toElement: (item) => {
					const column = new Column(
						{
							attrs: {
								onclick: () => {
									props.selectedItem.value = item.text
								}
							}
						}
					)
					const text = new Text(
						{
							text: item.text,
							styles: {
								padding: '6px',
								...Style.Pointer
							},
						}
					)
					const underline = new HorizontalDivider(
						{
							styles: {
								height: '2px',
								backgroundColor: Color.BgColor,
								margin: '0px 6px',
							}
						}
					)
					column.add(text)
					column.add(underline)
					column.checkRef(
						item.selected,
						(selected) => {
							text.style(
								{
									color: selected ? Color.TextColor : Color.DescriptionColor,
									fontWeight: selected ? '300' : '200',
								}
							)
							underline.style(
								{
									backgroundColor: selected ? Color.TextColor : Color.BgColor,
								}
							)
						}
					)
					return column
				}
			}
		)
	}
}

export class State extends Element {

	/**
	 *
	 * @param { { id, styles, attrs } } props
	 */
	constructor(props = {}) {
		super(
			{
				tag: 'div',
				...props
			}
		)
	}

	set el(el) {
		this.replaceNode(el.node)
	}

}

export class StateSet extends State {
	/**
	 *
	 * @param { { id, states, selectedItem, styles, attrs } } props
	 */
	constructor(props = {}) {
		super(props)
		this.states = props.states
		this.checkRef(
			props.selectedItem,
			(key) => {
				this.el = this.states[key]
			}
		)
	}

	addState(key, element) {
		this.states[key] = element
	}
}

export class Route extends Element {

	/**
	 *
	 * @param { { id, el, styles, attrs } } props
	 */
	constructor(props = {}) {
		super(
			{
				tag: 'div',
				styles: {
					width: '100%',
					height: '100%',
				},
				attrs: props?.attrs,
			}
		)
		this._id = props?.id ?? 'route'
		this.style(props?.styles)
		this.add(props?.el)
		this.id = createTagName(this._id || 'route')
	}

	onmount() {
		console.log('onmount ' + this.id);
	}

	onunmount() {
		console.log('onunmount ' + this.id);
	}
}

export class Screen extends Route {

	/**
	 *
	 * @param { { id, el, styles, attrs } } props
	 */
	constructor(props = {}) {
		super(
			{
				id: props?.id ?? 'screen',
				el: props?.el,
				styles: props?.styles,
				attrs: props?.attrs
			}

		)
		this.style(
			{
				backgroundColor: Color.BgColor,
			}
		)

	}
}

export class Popup extends Route {

	/**
	 *
	 * @param { { id, el, cancelOnClickOutside } } props
	 */
	constructor(props = {}) {
		super(
			{
				id: 'popup',
				attrs: {
					onclick: (e) => {
						if(e.target == this.node && props.cancelOnClickOutside) {
							this.dismiss()
						}
					}
				}
			}
		)
		this.popupContent = new Element(
			{
				tag: 'div',
				styles: {
					backgroundColor: Color.BgColor,
				},
			}
		)
		this.add(this.popupContent)
		this.popupContent.add(props?.el)
	}

	show() {
		body.appendChild(this.node)
		this.onmount()
	}

	dismiss() {
		this.onunmount()
		body.removeChild(this.node)
	}
}

export class MenuPopup extends Popup {

	/**
	 *
	 * @param { { id, items } } props
	 */
	constructor(props = {}) {
		super(
			{
				cancelOnClickOutside: true
			}
		)
		this.popupContent.style(
			{
				width: 'auto',
				padding: '4px',
				position: 'absolute',
				borderRadius: '6px',
				display: 'flex',
				flexDirection: 'column',
				...Style.Border
			},

		)

		for(const e of props.items) {
			this.popupContent.add(e)
		}

	}

	position(event) {
		const targetRect = event.target.getBoundingClientRect()
		const nodeRect = this.node.getBoundingClientRect();
		const popupNodeRect = this.popupContent.node.getBoundingClientRect();

		let x, y
		if (targetRect.left <= nodeRect.width - popupNodeRect.width) x = targetRect.left
		else x = targetRect.right - popupNodeRect.width

		if (targetRect.bottom <= nodeRect.height - popupNodeRect.height) y = targetRect.bottom
		else y = targetRect.top - popupNodeRect.height

		this.popupContent.style({
			left: x + "px",
			top: y + "px"
		})
	}

	show(event) {
		super.show()
		this.position(event)
	}

}

export class Dialog extends Popup {

	/**
	 *
	 * @param { { id, items } } props
	 */
	constructor(props = {}) {
		super(
			{
				styles:  {
					backgroundColor: '#55555555'
				}
			}
		)
		this.popupContent.style(
			{
				width: '300px',
				padding: '16px',
				margin: 'auto'
			}
		)
		for(const e of props.items) {
			this.popupContent.add(e)
		}
	}
}


export class Nav {

	constructor(el) {
		this.currentScreen = null
		this.body = el
	}

	/**
	 *
	 * @param {Screen} newScreen
	 */
	set screen(newScreen) {
		if (!(newScreen instanceof Screen)) return
		if (this.currentScreen) {
			this.currentScreen.onunmount()
			this.currentScreen.node.replaceWith(newScreen.node)
		} else {
			this.body.appendChild(newScreen.node)
		}
		this.currentScreen = newScreen
		this.currentScreen.onmount()
	}

}

