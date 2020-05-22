import React, { Component } from 'react';
import AvailableTimes from 'react-available-times';
import apiHandler from '../../api/apiHandler';
import FormElement from '../Helpers/FormElement';
import Loader from '../Loader';
import { jsonToFormData } from '../../utils/funcs';
import '../../css/form.css';

class AddSessionForm extends Component {
	state = {
		schedules: null,
		error: null,
	};

	componentDidMount = () => {
		apiHandler
			.getTable(this.props.data)
			.then((APIResult) => this.setState({ table: APIResult }))
			.catch((APIError) => console.log(APIError));
		apiHandler
			.getAllTableSessions(this.props.data)
			.then((APIResult) => this.setState({ allSessions: APIResult }))
			.catch((APIError) => console.log(APIError));
		apiHandler
			.getNextSessionTable(this.props.data)
			.then((APIResult) => this.setState({ nextSession: APIResult }))
			.catch((APIError) => console.log(APIError));
	};

	handleSubmit = (e) => {
		e.preventDefault();
		let totalSuggestions = [];
		if (this.state.nextSession && this.state.nextSession.suggestions.length) {
			this.state.nextSession.suggestions.forEach((x) => {
				totalSuggestions.push({ start: x.start, end: x.end });
			});
		}
		if (this.state.schedules && this.state.schedules.length) {
			this.state.schedules.forEach((x) => {
				totalSuggestions.push({ start: x.start, end: x.end });
			});
		}

		if (!totalSuggestions) {
			this.setState({ error: 'Please put a least one date' });
			return;
		}

		if (this.state.nextSession) {
			// update
			const data = {
				table_id: this.props.data,
				name:
					this.state.name === '' || !this.state.name
						? this.state.table.name + ' : ' + (this.countPassedSession() + 1)
						: this.state.name,
				suggestions: this.state.schedules,
			};
			apiHandler
				.updateSessionSchedule(this.state.nextSession._id, jsonToFormData(data))
				.then((APIResult) => {
					console.log(APIResult);
					apiHandler
						.checkSessionToTable(data.table_id, { session_id: APIResult._id })
						.then((APIResult) => {
							this.props.close();
						})
						.catch((APIError) => console.log(APIError));
				})
				.catch((APIError) => console.log(APIError));
		} else {
			// new
			const data = {
				table_id: this.props.data,
				name:
					this.state.name === '' || !this.state.name
						? this.state.table.name + ' : ' + (this.countPassedSession() + 1)
						: this.state.name,
				suggestions: JSON.stringify(this.state.schedules),
			};
			apiHandler
				.createSession(data)
				.then((APIResult) => {
					apiHandler
						.checkSessionToTable(data.table_id, { session_id: APIResult._id })
						.then((APIResult) => {
							this.props.close();
						})
						.catch((APIError) => console.log(APIError));
				})
				.catch((APIError) => console.log(APIError));
		}
	};

	checkChange = (selections) => {
		this.setState({ schedules: selections });
	};

	handleInput = (e) => {
		this.setState({ name: e.target.value });
	};

	countPassedSession = () => {
		const sessions = this.state.allSessions.filter((session) => new Date(session.date_end) < new Date());
		return sessions.length;
	};

	render() {
		if (!this.state.table || !this.state.allSessions) {
			return (
				<div className="overlay">
					<Loader />
				</div>
			);
		}
		let suggestions = [];
		if (this.state.nextSession) {
			this.state.nextSession.suggestions.forEach((suggestion) => {
				suggestions.push({ start: new Date(suggestion.start), end: new Date(suggestion.end) });
			});
		}
		return (
			<div className="overlay">
				<div className="main">
					<div className="close-me" onClick={this.props.close}>
						X
					</div>
					<h2>Plane your next session</h2>
					{this.state.error && <p>{this.state.error}</p>}
					<FormElement
						label="Session name"
						name="name"
						change={this.handleInput}
						placeholder={`${this.state.table.name} : ${this.countPassedSession() + 1}`}
					/>
					{this.state.nextSession && (
						<AvailableTimes
							weekStartsOn="monday"
							initialSelections={suggestions}
							onChange={this.checkChange}
							height={'50vh'}
							recurring={false}
						/>
					)}
					{!this.state.nextSession && (
						<AvailableTimes weekStartsOn="monday" onChange={this.checkChange} height={'50vh'} recurring={false} />
					)}

					<button onClick={this.handleSubmit}>Suggest those dates to the group !</button>
				</div>
			</div>
		);
	}
}

export default AddSessionForm;
