import Punch from "./Punch";
import { LatLng } from "leaflet";

const punchList: Punch[] = [
	{
		"description": "Leaky faucet",
		"room": "Restroom",
		"latLng": new LatLng(
			32.74039033543139,
			-97.36894011497498
		),
		"discipline": "Plumbing",
		"duedate": "10/10/2019",
		"state": "Completed",
		"floor": "1"
	},
	{
		"description": "Toilet will not flush",
		"room": "Restroom",
		"latLng": new LatLng(
			32.74037833543139,
			-97.36894011497498
		),
		"discipline": "Plumbing",
		"duedate": "10/10/2019",
		"state": "Completed",
		"floor": "1"
	}, {
		"description": "Toilet will not stop flushing",
		"room": "Restroom",
		"latLng": new LatLng(
			32.74037833543139,
			-97.36896011497498
		),
		"discipline": "Plumbing",
		"duedate": "10/11/2019",
		"state": "In Progress",
		"floor": "2"
	}, {
		"description": "Touch up paint on front door",
		"room": "Foyer",
		"latLng": new LatLng(
			32.74100101300775,
			-97.36794769763947
		),
		"discipline": "Interiors",
		"duedate": "10/25/2019",
		"state": "Open",
		"floor": "1"
	},
	{
		"description": "Light doesn't work",
		"room": "Office",
		"latLng": new LatLng(
			32.74178160990982,
			-97.36838757991791
		),
		"discipline": "Electrical",
		"duedate": "10/26/2019",
		"state": "Open",
		"floor": "2"
	},
	{
		"description": "Faucet broken in men's restroom",
		"room": "Restroom",
		"latLng": new LatLng(
			32.74142064109407,
			-97.36888647079466
		),
		"discipline": "Plumbing",
		"duedate": "10/27/2019",
		"state": "Open",
		"floor": "1"
	},
	{
		"description": "Faulty camera behind box office register",
		"room": "Reception",
		"latLng": new LatLng(
			32.74046406666033,
			-97.3682963848114
		),
		"discipline": "Security",
		"duedate": "10/27/2019",
		"state": "Open",
		"floor": "1"
	},
	{
		"description": "Someone's trampled the azaleas!",
		"room": "Exterior",
		"latLng": new LatLng(
			32.74157856513089,
			-97.36794769763947
		),
		"discipline": "Landscape",
		"duedate": "10/28/2019",
		"state": "Open",
		"floor": "1"
	}
];

export default punchList;