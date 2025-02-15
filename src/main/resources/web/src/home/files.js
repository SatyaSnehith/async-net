import FileComponent from "./fileComponent";
import {Element} from "../nui/element";

const filesUi = (props) => {

}

export default class FilesTab extends Element {
	constructor(props) {
		super(
			{
				tag: 'div',
				styles: {
					display: 'inline-flex',
					flexFlow: 'wrap',
					padding: '16px',
					gap: '16px',
					justifyContent: 'center',
				}
			}
		);
		// this.node.classList += "grid"
		for(let i = 0; i <= 20; ++i) {
			this.add(new FileComponent())
		}
	}
}

class ViewModel {
	constructor() {

	}
}