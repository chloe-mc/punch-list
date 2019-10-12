import punchList from './punch-list.js';

const dao = {
	getPunchList: (discipline, query) => {
		let filteredList = punchList;
		if (discipline) {
			filteredList = filteredList.filter((item) => {
				return item.discipline.toLowerCase() === discipline.toLowerCase();
			});
		}
		if (query) {
			let searchParams = new URLSearchParams(query);
			filteredList = filteredList.filter((item) => {
				var result = true;
				searchParams.forEach((val, key) => {
					if (!item.hasOwnProperty(key)) result = false;
					if (typeof (item[key]) !== "string" || item[key].toLowerCase() !== val.toLowerCase()) result = false;
				});
				return result;
			});
		}
		return filteredList;
	}
}

export default dao;