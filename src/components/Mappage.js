import React, { Component } from 'react';
import './Mappage.css';
import dao from '../data/punch-list-dao';
import { Map, TileLayer, CircleMarker, Popup, FeatureGroup, GeoJSON } from 'react-leaflet';
import blueprint from '../data/blueprint.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Message from '../components/Message';

const mapConfig = {
	accessToken: "pk.eyJ1IjoiY2hsb2UtbWMiLCJhIjoiY2praGJibDFuMHNvZzN2bzNtcWZnbXhhcCJ9.xXYfoIoIpRaO4CXYrqywZw",
	id: "mapbox.streets"
}

export default class Mappage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			punchList: null,
			position: null,
			isLoading: true,
			zoom: 21,
			currentIndex: 0
		}
	}

	markerRef = React.createRef();
	mapRef = React.createRef();

	showPopup = (index) => {
		let lyr = this.markerRef.current.leafletElement.getLayers()[index];
		lyr.openPopup();
		this.setState({
			currentIndex: index,
			position: lyr.getLatLng()
		});
		return lyr.getLatLng();
	}

	nextIndex = (i, list) => {
		return i + 1 === list.length ? 0 : i + 1;
	}

	prevIndex = (i, list) => {
		return i - 1 < 0 ? list.length - 1 : i - 1;
	}

	getColor(state) {
		switch (state.toLowerCase()) {
			case "open":
				return "green";
			case "in progress":
				return "orange";
			case "completed":
				return "red";
			default:
				return "gray";
		}
	}

	componentDidMount() {
		let punchList = dao.getPunchList(this.props.discipline, this.props.query);
		console.log(punchList);
		this.setState({
			punchList,
			position: punchList.length > 0 ? punchList[0].latLng : null,
			isLoading: false
		});
		console.log('did mount');
		setTimeout(() => {
			this.showPopup(this.state.currentIndex);
		}, 500)
	}

	render() {
		const { isLoading, position, zoom, punchList, currentIndex } = this.state;

		if (isLoading) return <p>Loading...</p>;

		let markers = [];
		if (punchList) {
			punchList.forEach((item, i) => {
				let stateColor = this.getColor(item.state);
				markers.push(
					<CircleMarker center={item.latLng} color={stateColor}>
						<Popup autoPan={true} className="popupFormat">
							<div>
								<h4>{item.description}</h4>
								<p>Due: {item.duedate} </p>
								<p style={{ color: stateColor }}>{item.state}</p>
							</div>
						</Popup>
					</CircleMarker>
				)
			});
		}

		if (typeof window !== 'undefined') {
			return (
				<Map
					ref={this.mapRef}
					center={position}
					zoom={zoom}
					className="Mappage-map">
					<TileLayer
						attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
						url={"https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=" + mapConfig.accessToken}
					/>
					{markers ?
						<FeatureGroup ref={this.markerRef}>
							{markers}
						</FeatureGroup> : <Message message="¯\_(ツ)_/¯" />
					}
					<GeoJSON data={blueprint} />
					<div className="Mappage-arrow left" onClick={() => this.showPopup(this.prevIndex(currentIndex, punchList))}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</div>
					<div className="Mappage-arrow right" onClick={() => this.showPopup(this.nextIndex(currentIndex, punchList))}>
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
				</Map>
			)
		}
		return null
	}
}
