import React, { Component } from 'react';
import './Mappage.css';
import dao from '../data/punch-list-dao';
import { Map, TileLayer, CircleMarker, Popup, FeatureGroup, GeoJSON, ZoomControl } from 'react-leaflet';
import blueprint from '../data/blueprint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Message from '../components/Message';
import { LatLngExpression, Layer, Marker, LatLng } from 'leaflet';
import { number } from 'prop-types';

const mapConfig = {
	accessToken: "pk.eyJ1IjoiY2hsb2UtbWMiLCJhIjoiY2praGJibDFuMHNvZzN2bzNtcWZnbXhhcCJ9.xXYfoIoIpRaO4CXYrqywZw",
	id: "mapbox.streets", 
	defaultLocation: new LatLng(32.741209, -97.368824)
}

interface Punch {
    "description": string;
    "room": string;
    "latLng": LatLng;
    "discipline": string;
    "duedate": string;
    "state": string;
    "floor": string;
}

interface Props {
	discipline: string, 
	query: string
}

interface State {
	punchList: Punch[] | null, 
	position: LatLng, 
	isLoading: boolean, 
	zoom: number, 
	currentIndex: number
}

export default class Mappage extends Component<Props, State> {
	// constructor(props) {
	// 	super(props)
	// }
	state: State = {
		punchList: null,
		position: new LatLng(32.741209, -97.368824),
		isLoading: true,
		zoom: 18,
		currentIndex: 0
	}

	markerRef: React.RefObject<FeatureGroup> = React.createRef();

	showPopup(index: number, markers: FeatureGroup | null) {
		if (markers) {
			let lyr = markers.leafletElement.getLayers()[index] as Marker;
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

	nextIndex(i: number, list: Punch[]): number {
		return i + 1 === list.length ? 0 : i + 1;
	}

	prevIndex(i: number, list: Punch[]): number {
		return i - 1 < 0 ? list.length - 1 : i - 1;
	}

	updateCurrentIndex(i: number): void {
		this.setState({
			currentIndex: i
		})
	}

	getDaysUntilDue(duedate: string): string {
		let due: moment.Moment = moment(duedate);
		let today: moment.Moment = moment();
		let days = moment.duration(due.diff(today )).days();
		if (days > 0) {
			return "Due in " + days + " days";
		} else if (days < 0) {
			return "Overdue by " + Math.abs(days) + " days";
		} else {
			return "Due today";
		}

	}

	getColor(state: string) {
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
		let s = {
			punchList: dao.getPunchList(this.props.discipline, this.props.query), 
			isLoading: false, 
			zoom: this.state.zoom, 
			position: this.state.position
		};
		if (s.punchList.length > 0) {
			s.zoom = 21;
			s.position = s.punchList[0].latLng;
			setTimeout(() => {
				this.showPopup(this.state.currentIndex, this.markerRef.current);
			}, 500);
		}
		this.setState({ ...s });
	}

	render() {
		const { isLoading, position, zoom, punchList, currentIndex } = this.state;

		if (isLoading) return <p>Loading...</p>;

		let markers: any[] = [];
		if (punchList) {
			punchList.forEach((item, i) => {
				let stateColor = this.getColor(item.state);
				markers.push(
					<CircleMarker center={item.latLng} color={stateColor} key={i} radius={8}
						onclick={() => this.updateCurrentIndex(i)}>
						<Popup autoPan={true} className="Mappage-popup">
							<h5 style={{ color: stateColor, fontWeight: 'bold' }}>{item.state}</h5>
							<h5>{item.description}</h5>
							<table>
								<tbody>
									<tr><th>Due Date</th><td>{item.duedate}</td></tr>
									<tr><th>Room</th><td>{item.room}</td></tr>
									<tr><th>Discipline</th><td>{item.discipline}</td></tr>
									<tr><th>Floor</th><td>{item.floor}</td></tr>
								</tbody>
							</table>
							{item.state.toLowerCase() !== "completed" ?
								<p style={{ fontWeight: 'bold' }}>{this.getDaysUntilDue(item.duedate)}</p> : null
							}
						</Popup>
					</CircleMarker>
				)
			});
		}

		if (typeof window !== 'undefined') {
			return (
				<Map
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
							if (punchList) {
								let i = this.prevIndex(currentIndex, punchList);
								this.showPopup(i, this.markerRef.current);
							}							
						}}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</div>
					<div className="Mappage-arrow right"
						onClick={() => {
							if (punchList) {
								let i = this.nextIndex(currentIndex, punchList);
								this.showPopup(i, this.markerRef.current);
							}							
						}}>
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
					<div className="Mappage-logo"></div>
				</Map>
			)
		}
		return null
	}
}
