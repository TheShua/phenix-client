import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FormElement from '../Helpers/FormElement';
import UserContext from '../Auth/UserContext';
import apiHandler from '../../api/apiHandler';
import '../../css/form.css';

class NewTableForm extends Component {
	static contextType = UserContext;
	state = { name: '', scope: 'Public' };

	handleChange = (e) => {
		const value =
			e.target.type === 'file' ? e.target.files[0] : e.target.type === 'checkbox' ? e.target.checked : e.target.value;
		const key = e.target.name;
		this.setState({ [key]: value });
	};

	handleSubmit = (e) => {
		e.preventDefault();

		if (this.state.name === '') {
			return;
		}

		const data = { name: this.state.name, scope: this.state.scope.toLowerCase(), dm_id: this.context.user._id };
		apiHandler
			.createTable(data)
			.then((APIResult) => {
				this.props.subForm();
			})
			.catch((APIError) => console.log(APIError));
	};

	render() {
		return (
			<div className="overlay">
				<form className="main" method="POST" onSubmit={this.handleSubmit} onChange={this.handleChange}>
					<div className="close-me" onClick={this.props.close}>
						X
					</div>
					<h2>Create a Table</h2>
					<FormElement label="Name" type="text" name="name" placeholder="Party's name" />
					<FormElement label="Scope" type="select" opt={['Public', 'Private']} name="scope" />
					<button>Create</button>
				</form>
			</div>
		);
	}
}

export default withRouter(NewTableForm);
