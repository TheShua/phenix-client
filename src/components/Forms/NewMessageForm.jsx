import React, { Component } from 'react';
import FormElement from '../Helpers/FormElement';
import UserSearch from '../Helpers/UserSearch';
import '../../css/mailbox.css';
import { withRouter } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';
import UserContext from '../Auth/UserContext';

class NewMessageForm extends Component {
	static contextType = UserContext;
	state = { to: [] };

	handleChange = (event) => {
		if (event.target.name === 'to') return;
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
		if (!this.state.to.length) {
			return;
		}

		const data = {
			from_type: 'user',
			from_user: this.context.user._id,
			to: JSON.stringify(this.state.to),
			subject: this.state.subject,
			message: this.state.message,
		};
		apiHandler
			.sendMessage(data)
			.then(() => this.props.history.push('/mailbox'))
			.catch((APIError) => console.log(APIError));
	};

	handleManageList = (to) => {
		this.setState({ to: to });
	};

	render() {
		return (
			<form method="post" onChange={this.handleChange} onSubmit={this.handleSubmit} className="mailbox">
				<UserSearch
					label="To"
					type="text"
					name="to"
					params={['users', 'tables']}
					handleUpdate={this.handleManageList}
				/>
				<FormElement label="Subject" type="text" name="subject" />
				<FormElement label="Message" type="textarea" name="message" />
				<button>Send</button>
			</form>
		);
	}
}

export default withRouter(NewMessageForm);
