import {Column, HorizontalSpace, IconButton, Row, Screen, StateSet, Tabs, Text, TitleTabs} from "../nui/components";
import {ref} from "../nui/ref";
import {ApiCall} from "../nui/api";
import FilesTab from "./files";
import {Color} from "../nui/style";


// https://www.youtube.com/watch?v=0fONene3OIA&ab_channel=BeyondFireship
// web vitals chrome extesion

const homeUi = (props) => {
	const screen = new Column()

	const topBar = new Row(
		{
			styles: {
				padding: '8px',
				alignItems: 'center',
				position: 'sticky',
				top: '0',
				backgroundColor: Color.BgColor,
				zIndex: '100',
			}
		}
	)
	const selectedTitle = ref('Files')
	const titles = Tabs.createTabItems('Files', 'Text')
	const titleTabs = new TitleTabs(
		{
			tabItems: titles,
			selectedItem: selectedTitle
		}
	)
	topBar.add(titleTabs)
	topBar.add(new HorizontalSpace('auto'))
	topBar.add(
		new IconButton(
			{
				svgName: 'refresh',
				attrs: {
					tabIndex: '0',
					onclick: () => props?.onRefreshClicked?.()
				}
			}
		)
	)
	topBar.add(new HorizontalSpace('4px'))
	const themeIcon = ref('sun')
	topBar.add(
		new IconButton(
			{
				svgName: themeIcon,
				attrs: {
					tabIndex: '0',
					onclick: () => {
						const body = document.body
						body.classList.toggle('darkTheme')
						body.classList.toggle('lightTheme')
						if (themeIcon.value === 'moon')
							themeIcon.value = 'sun'
						else
							themeIcon.value = 'moon'
					}
				}
			}
		)
	)
	topBar.add(new HorizontalSpace('4px'))
	topBar.add(
		new IconButton(
			{
				svgName: 'settings',
				attrs: {
					tabIndex: '0',
					onclick: () => props?.onSettingsClicked?.()
				}
			}
		)
	)
	screen.add(topBar)


	const textCol = new Column()

	const s = new StateSet(
		{
			selectedItem: selectedTitle,
			states: {
				'Files': new FilesTab(),
				'Text': textCol
			}
		}
	)


	screen.add(s)
	return {
		selectedTitle: selectedTitle,
		el: screen
	}
}

export default class HomeScreen extends Screen {
	constructor() {
		super()
		const count = ref('-1')
		const ui = homeUi(
			{
				count: count,
				onSettingsClicked: () => this.onSettingsClicked()
			}
		)
		const viewModel = new HomeViewModel()
		viewModel.itemsApi.subscribe(
			(data) => {
				count.value = data.totalItems.toString()
			}
		)
		viewModel.itemsApi.isLoading.addObserver(
			(data) => {
				console.log("isLoading: " + data)
			}
		)
		viewModel.getItems()

		this.add(ui.el)
		this.ui = ui
	}

	onSettingsClicked() {
		console.log("settings")
		this.ui.selectedTitle.value = 'Text'
	}
}

class HomeViewModel {

	constructor() {
		this.itemsApi = new ApiCall(
			{
				url: 'https://raw.githubusercontent.com/SatyaSnehith/posts/main/projects.json',
			}
		)
	}


	async getItems() {
		await this.itemsApi.call()
	}

}

