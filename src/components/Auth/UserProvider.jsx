import React, { Component } from 'react';
import apiHandler from '../../api/apiHandler';
import UserContext from './UserContext';

class UserProvider extends Component {
	state = {
		user: null,
		isLoggedIn: false,
		isLoading: true,
	};

	componentDidMount() {
		apiHandler
			.isLoggedIn()
			.then((data) => {
				this.setState({ user: data, isLoggedIn: true, isLoading: false });
			})
			.catch((error) => {
				this.setState({ user: null, isLoggedIn: false, isLoading: false });
			});
	}

	setUser = (user) => {
		this.setState({ user, isLoggedIn: true });
	};

	removeUser = () => {
		this.setState({ user: null, isLoggedIn: false });
	};

	render() {
		// Expose the user state and the methods to the consumers.
		// You will be able to access the conteext though context.user
		// or this.context.user, same for the functions. context.setUser,
		// context.removeUser
		const authValues = {
			user: this.state.user,
			setUser: this.setUser,
			removeUser: this.removeUser,
			isLoggedIn: this.state.isLoggedIn,
			isLoading: this.state.isLoading,
		};
		return <UserContext.Provider value={authValues}>{this.props.children}</UserContext.Provider>;
	}
}

export default UserProvider;
