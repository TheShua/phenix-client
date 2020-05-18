import React, { Component } from 'react';
import FormElement from '../Helpers/FormElement';
import UserSearch from '../Helpers/UserSearch';

class NewMessageForm extends Component {
	state = {};

	handleChange = (event) => {
		const value =
			event.target.type === 'file'
				? event.target.files[0]
				: event.target.type === 'checkbox'
				? event.target.checked
				: event.target.value;
		const key = event.target.name;
		this.setState({ [key]: value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
	};

	handleAddTo = (elem) => {
		console.log(elem);
	};

	render() {
		return (
			<form method="post" onChange={this.handleChange} onSubmit={this.handleSubmit}>
				<UserSearch label="To" type="text" name="to" params={['users', 'tables']} handleAdd={this.handleAddTo} />
				<FormElement label="Subject" type="text" name="subject" />
				<FormElement label="Message" type="textarea" name="message" />
				<button>Send</button>
			</form>
		);
	}
}

export default NewMessageForm;
