import React, { Component } from 'react';
import dao from '../data/punch-list-dao';
import { Map, TileLayer, Marker, Popup, FeatureGroup, Polyline } from 'react-leaflet';

const mapConfig = {
	accessToken: "pk.eyJ1IjoiY2hsb2UtbWMiLCJhIjoiY2praGJibDFuMHNvZzN2bzNtcWZnbXhhcCJ9.xXYfoIoIpRaO4CXYrqywZw",
	id: "mapbox.streets"
}

export default class Mappage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			discipline: props.discipline || null,
			query: props.query || null,
			punchList: null,
			position: null,
			zoom: 14
		}
	}

	componentDidMount() {
		console.log(this.props.query);
		let punchList = dao.getPunchList(this.props.discipline, this.props.query);
		this.setState({
			punchList,
			position: punchList[0].latLng
		});
	}

	render() {
		return (
			<div>
				{this.state.discipline}
				{this.state.query}
				{this.state.punchList ? this.state.punchList.length : null}
			</div>
		)
	}
}
