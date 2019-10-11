import React, { Component } from 'react'

export default class Mappage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			discipline: props.discipline || null,
			search: props.query || null,
			position: null,
			zoom: 14
		}
	}

	render() {
		return (
			<div>
				{this.state.discipline}
				{this.state.search}
			</div>
		)
	}
}
