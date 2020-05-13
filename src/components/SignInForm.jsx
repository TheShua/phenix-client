import React, { Component } from 'react';
import apiHandler from '../api/apiHandler';
import UserContext from './Auth/UserContext';

export class SignInForm extends Component {
	static contextType = UserContext;

	state = { email: '', password: '' };

	handleChange = (event) => {
		const key = event.target.name;
		const value = event.target.value;

		this.setState({ [key]: value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);
		apiHandler
			.signin(this.state)
			.then((data) => {
				// Here in data, we have our user !
				// We can now give the user to our setUser function and this will
				// set the state in our context and our user will be updated !
				this.context.setUser(data);
				this.props.history.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};
	render() {
		return (
			<form onChange={this.handleChange} onSubmit={this.handleSubmit}>
				<div className="element">
					<label htmlFor="email">Email</label>
					<input type="text" name="email" id="email" defaultValue={this.state.email} />
				</div>
				<div className="element">
					<label htmlFor="password">Password</label>
					<input type="password" name="password" id="password" defaultValue={this.state.password} />
				</div>
				<button>Login</button>
			</form>
		);
	}
}

export default SignInForm;
