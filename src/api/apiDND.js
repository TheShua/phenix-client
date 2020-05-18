import axios from 'axios';

const service = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	withCredentials: true,
});

function errorHandler(error) {
	console.error(error);
	if (error.response && error.response.data) {
		console.error('Response =>', error.response.data);
		throw error.response.data.message;
	}
	throw error;
}

export default {
	service,

	getAllDatas() {
		return service('/api/dnd/all')
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getAllRaces() {
		return service
			.get('/api/dnd/races')
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getRace(index) {
		return service
			.get('/api/dnd/races/' + index)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getAllClasses() {
		return service
			.get('/api/dnd/classes')
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getClasse(index) {
		return service
			.get('/api/dnd/classes/' + index)
			.then((res) => res.data)
			.catch(errorHandler);
	},
};
