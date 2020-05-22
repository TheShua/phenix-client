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
			.catch();
	},

	logout() {
		return service
			.get('/api/auth/logout')
			.then((res) => res.data)
			.catch(errorHandler);
	},

	updateProfile(id, data) {
		return service
			.patch(`/api/users/${id}`, data)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	searchUser(data) {
		return service
			.get(`/api/users?search=${data}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	searchUsersAndTables(data) {
		return service
			.get(`/api/users?search=${data}&param=all`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getMyMessages(id, param = null) {
		let params = '';
		if (param === 'unread') {
			params = '?filter=unread';
		}
		return service
			.get(`/api/mailbox/${id}${params}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	sendMessage(data) {
		return service
			.post('/api/mailbox', data)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	updateMessage(id, data) {
		return service
			.patch(`/api/mailbox/${id}`, data)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	deleteMessage(id) {
		return service
			.delete(`/api/mailbox/${id}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	createCharacter(character) {
		return service
			.post('/api/characters', character)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getCharacterSheet(id, full) {
		return service
			.get(`/api/characters/${id}${full ? '/full' : ''}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getAllMyCharacters(id) {
		return service
			.get(`/api/characters/${id}/all`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	createTable(table) {
		return service
			.post('/api/tables', table)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getTable(id, populated = false) {
		return service
			.get(`/api/tables/${id}?pop=${populated}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	addPlayerToTable(table, player) {
		return service
			.patch(`/api/tables/${table}/${player}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getAllMyTables(id, populate) {
		return service
			.get(`/api/tables/${id}/all?populated=true`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	createSession(data) {
		return service
			.post('/api/sessions', data)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	checkSessionToTable(id, data) {
		return service
			.post(`/api/mailbox/${id}/table?type=schedule`, data)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getNextSessionTable(id) {
		return service
			.get(`/api/sessions/${id}/last`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getAllTableSessions(id) {
		return service
			.get(`/api/sessions?table=${id}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getSession(id) {
		return service
			.get(`/api/sessions/${id}`)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	updateSession(id, data) {
		return service
			.patch(`/api/sessions/${id}`, data)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	updateSessionSchedule(id, data) {
		return service
			.patch(`/api/sessions/${id}/edit`, data)
			.then((res) => res.data)
			.catch(errorHandler);
	},

	getAllMyNextSessions(id) {
		return service
			.get(`/api/sessions/${id}/next`)
			.then((res) => res.data)
			.catch(errorHandler);
	},
};
