import React, { Component } from 'react';
import FormElement from '../components/Helpers/FormElement';
import apiHandler from '../api/apiHandler';
import UserContext from '../components/Auth/UserContext';

class SignUp extends Component {
	static contextType = UserContext;
	state = {};

	onChange = (event) => {
		const value =
			event.target.type === 'file'
				? event.target.files[0]
				: event.target.type === 'checkbox'
				? event.target.checked
				: event.target.value;

		const key = event.target.name;

		this.setState({ [key]: value });
	};

	onSubmit = (event) => {
		event.preventDefault();
		apiHandler
			.signup(this.state)
			.then((data) => {
				this.context.setUser(data);
				this.props.history.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		return (
			<div style={{ marginTop: '150px' }}>
				<h2>ALLO ZBLA ?</h2>
				<p>HELJE</p>
				<form onChange={this.onChange} onSubmit={this.onSubmit}>
					<FormElement type="text" label="Name" name="name" placeholder="Your name..." />
					<FormElement type="email" label="Email" name="email" placeholder="Your email will be use to login..." />
					<FormElement type="password" label="Password" name="password" placeholder="**********" />
					<button>Sign up</button>
				</form>
			</div>
		);
	}
}

export default SignUp;
