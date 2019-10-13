import React, { Component } from 'react';
import './Mappage.css';
import dao from '../data/punch-list-dao';
import { Map, TileLayer, CircleMarker, Popup, FeatureGroup, GeoJSON } from 'react-leaflet';
import blueprint from '../data/blueprint.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Message from '../components/Message';

const mapConfig = {
	accessToken: "pk.eyJ1IjoiY2hsb2UtbWMiLCJhIjoiY2praGJibDFuMHNvZzN2bzNtcWZnbXhhcCJ9.xXYfoIoIpRaO4CXYrqywZw",
	id: "mapbox.streets",
	defaultLocation: [32.741209, -97.368824]
}

export default class Mappage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			punchList: null,
			position: null,
			isLoading: true,
			zoom: 18,
			currentIndex: 0
		}
	}

	markerRef = React.createRef();
	mapRef = React.createRef();

	showPopup = (index, markers) => {
		if (markers) {
			let lyr = markers.leafletElement.getLayers()[index];
			if (lyr) {
				lyr.openPopup();
				this.setState({
					currentIndex: index,
					position: lyr.getLatLng()
				});
				return lyr.getLatLng();
			}
		}
	}

	nextIndex = (i, list) => {
		return i + 1 === list.length ? 0 : i + 1;
	}

	prevIndex = (i, list) => {
		return i - 1 < 0 ? list.length - 1 : i - 1;
	}

	getDaysUntilDue = (duedate) => {
		let days = moment.duration(moment(duedate) - moment()).days();
		if (days > 0) {
			return "Due in " + days + " days";
		} else if (days < 0) {
			return "Overdue by " + Math.abs(days) + " days";
		} else {
			return "Due today";
		}

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
		let s = {};
		s.punchList = dao.getPunchList(this.props.discipline, this.props.query);
		if (s.punchList.length > 0) {
			s.zoom = 21;
			s.position = s.punchList[0].latLng;
			setTimeout(() => {
				this.showPopup(this.state.currentIndex, this.markerRef.current);
			}, 500);
		}
		this.setState({ ...s, isLoading: false });
	}

	render() {
		const { isLoading, position, zoom, punchList, currentIndex } = this.state;

		if (isLoading) return <p>Loading...</p>;

		let markers = [];
		if (punchList) {
			punchList.forEach((item, i) => {
				let stateColor = this.getColor(item.state);
				markers.push(
					<CircleMarker center={item.latLng} color={stateColor} key={i}>
						<Popup autoPan={true} className="popupFormat">
							<h5 style={{ color: stateColor, fontWeight: 'bold' }}>
								{item.state}
							</h5>
							{item.state.toLowerCase() !== "completed" ?
								<span>{this.getDaysUntilDue(item.duedate)}</span>
								: null
							}
							<h5>{item.description}</h5>
							<table>
								<tbody>
									<tr><th>Due Date</th><td>{item.duedate}</td></tr>
									<tr><th>Room</th><td>{item.room}</td></tr>
									<tr><th>Discipline</th><td>{item.discipline}</td></tr>
									<tr><th>Floor</th><td>{item.floor}</td></tr>
								</tbody>
							</table>
						</Popup>
					</CircleMarker>
				)
			});
		}

		if (typeof window !== 'undefined') {
			return (
				<Map
					ref={this.mapRef}
					useFlyTo={false}
					animate={true}
					center={position || mapConfig.defaultLocation}
					zoom={zoom}
					className="Mappage-map">
					<TileLayer
						attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
						url={"https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=" + mapConfig.accessToken}
					/>
					<GeoJSON data={blueprint} style={{ color: 'gray' }} />
					{markers.length > 0 ?
						<FeatureGroup ref={this.markerRef}>
							{markers}
						</FeatureGroup> : <Message message="No tasks ¯\_(ツ)_/¯" />
					}
					<div className="Mappage-arrow left"
						onClick={() => {
							let i = this.prevIndex(currentIndex, punchList);
							this.showPopup(i, this.markerRef.current);
						}}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</div>
					<div className="Mappage-arrow right"
						onClick={() => {
							let i = this.nextIndex(currentIndex, punchList);
							this.showPopup(i, this.markerRef.current);
						}}>
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
				</Map>
			)
		}
		return null
	}
}
