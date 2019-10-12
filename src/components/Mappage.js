import React, { Component } from 'react';
import dao from '../data/punch-list-dao';
import { Map, TileLayer, Marker, Popup, FeatureGroup, GeoJSON } from 'react-leaflet';
import blueprint from '../data/blueprint.js';

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
			isLoading: true,
			zoom: 22
		}
	}

	markerRef = React.createRef();
	mapRef = React.createRef();

	showPopup = (index) => {
		let lyr = this.markerRef.current.leafletElement.getLayers()[index];
		lyr.openPopup();
		this.setState({
			position: lyr.getLatLng()
		})
	}

	componentDidMount() {
		let punchList = dao.getPunchList(this.props.discipline, this.props.query);
		console.log(punchList);
		this.setState({
			punchList,
			position: punchList[0].latLng,
			isLoading: false
		});
		console.log(this.mapRef);
		console.log(this.markerRef);
		setTimeout(() => {
			this.showPopup(0);
		}, 600)
	}

	render() {
		const { isLoading, position, zoom } = this.state;

		if (isLoading) return <p>Loading...</p>;

		let markers = [];
		this.state.punchList.forEach((item, i) => {
			markers.push(
				<Marker position={item.latLng}>
					<Popup autoPan={true} className="popupFormat">
						<h4>{item.description}</h4>
					</Popup>
				</Marker>
			)
		});

		if (typeof window !== 'undefined') {
			return (
				<Map
					ref={this.mapRef}
					center={position}
					zoom={zoom}
					className="map">
					<TileLayer
						attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
						url={"https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=" + mapConfig.accessToken}
					/>
					{markers ?
						<FeatureGroup ref={this.markerRef}>
							{markers}
						</FeatureGroup> : null
					}
					<GeoJSON data={blueprint} />
				</Map>
			)
		}
		return null
	}
}
