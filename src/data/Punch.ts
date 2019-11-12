import { LatLng } from "leaflet";

interface Punch {
    "description": string;
    "room": string;
    "latLng": LatLng;
    "discipline": string;
    "duedate": string;
    "state": string;
	"floor": string;
	[key: string]: string | LatLng;
}

export default Punch;