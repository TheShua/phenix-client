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

	signin(userInfo) {
		return service
			.post('/api/auth/signin', userInfo)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	signup(userInfo) {
		return service
			.post('/api/auth/signup', userInfo)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	isLoggedIn() {
		return service
			.get('/api/auth/isLoggedIn')
			.then((res) => res.data)
			.catch(errorHandler);
	},

	logout() {
		return service
			.get('/api/auth/logout')
			.then((res) => res.data)
			.catch(errorHandler);
	},
};
