export const showModifier = (base, text = false) => {
	let r = Math.floor((base - 10) / 2);
	if (text) r = r > 0 ? `+${r}` : r;
	return r;
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getDate = (date, type) => {
	let dt = new Date(date);
	let day = ('0' + dt.getDate()).slice(-2);
	let month = ('0' + (dt.getMonth() + 1)).slice(-2);
	let hour = ('0' + dt.getHours()).slice(-2);
	let min = ('0' + dt.getMinutes()).slice(-2);
	if (type === 'start') {
		month = months[dt.getMonth()];
		return [`${day} ${month}`, `${hour}:${min}`];
	} else {
		return `${day}-${month} ${hour}:${min}`;
	}
};

export const formatNameURL = (name) => {
	return name.toLowerCase();
};

function buildFormData(formData, data, parentKey) {
	if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
		Object.keys(data).forEach((key) => {
			buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
		});
	} else {
		const value = data == null ? '' : data;
		formData.append(parentKey, value);
	}
}

export function jsonToFormData(data) {
	const formData = new FormData();
	buildFormData(formData, data);
	return formData;
}
