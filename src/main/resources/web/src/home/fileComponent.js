import {Column, IconButton, Row, SizeObserver, Text} from "../nui/components";
import {Color, Style} from "../nui/style";

export default class FileComponent extends Column {
	constructor() {
		super(
			{
				styles: {
					width: '130px',
					height: '160px',
					backgroundColor: Color.FileColor,
					borderRadius: '8px',
					...Style.Pointer
				},
				attrs: {
					tabIndex: '0',
					onclick: (e) => {
						console.log(e)
					}
				}
			}
		);
		SizeObserver.addObserver(
			(isMobile) => {
				if (isMobile) {
					this.style(
						{
							width: '130px',
							height: '130px',
						}
					)
				} else {
					this.style(
						{
							width: 130 * 1.2 + 'px',
							height: 130 * 1.2 + 'px',
						}
					)
				}
			}
		)

		const preview = new Column(
			{
				styles: {
					height: '100%',
					padding: '6px 6px 0px 6px',
				}
			}
		)

		const icon = new Column(
			{
				styles: {
					backgroundColor: Color.FileInnerColor,
					borderRadius: '4px',
					height: '100%',
					width: '100%',
				}
			}
		)
		preview.add(icon)

		this.add(preview)

		const info = new Row(
			{
				styles: {
					padding: '4px 8px',
				}
			}
		)
		info.add(
			new Text(
				{
					text: "File name",
					styles: {
						width: '100%',
						alignContent: 'center',
						textAlign: 'center',
					}
				}
			)
		)
		info.add(
			new IconButton(
				{
					svgName: 'moreVertical',
					styles: {
						padding: '6px',
					}
				}
			)
		)
		this.hoverStyle(
			{
				backgroundColor: Color.FileColor,
			},
			{
				backgroundColor: Color.HoveredFileColor
			}
		)
		this.add(info)
	}
}