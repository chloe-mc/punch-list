import punchList from './punch-list';
import Punch from './Punch';

const dao = {
	getPunchList: (discipline: string, query: string) => {
		let filteredList: Punch[] = punchList;
		if (discipline) {
			filteredList = filteredList.filter((item) => {
				return item.discipline.toLowerCase() === discipline.toLowerCase();
			});
		}
		if (query) {
			let searchParams: URLSearchParams = new URLSearchParams(query);
			filteredList = filteredList.filter((punch: Punch) => {
				let result: boolean = true;
				searchParams.forEach((val, key) => {
					if (!punch.hasOwnProperty(key)) result = false;
					let prop = punch[key];
					if (typeof prop !== 'string'|| prop.toLowerCase() !== val.toLowerCase()) result = false;					
				});
				return result;
			});
		}
		return filteredList;
	}
}

export default dao;