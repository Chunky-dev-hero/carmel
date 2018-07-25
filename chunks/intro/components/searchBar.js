import React, { PureComponent } from 'react';

export default class SearchBar extends PureComponent {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div style={{display: 'flex', alignContent: 'center', alignItems: 'center', height: '50px', marginTop: 50}}>
				<input
					style={{margin: '0 auto', padding: 5, width: '50%'}}
					placeholder='search for something'>
				</input>
			</div>
		)
	}
}