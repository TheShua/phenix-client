import React, { Component } from 'react';
import Loader from '../components/Loader';
import { Link, withRouter } from 'react-router-dom';
import { getDate, formatNameURL } from '../utils/funcs';
import apiHandler from '../api/apiHandler';
import UserContext from '../components/Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faTrash,
	faAngleDown,
	faAngleUp,
	faEnvelope,
	faEnvelopeOpenText,
	faVoteYea,
} from '@fortawesome/free-solid-svg-icons';
// import AvailableTimes from 'react-available-times';
import ConfirmDateForm from '../components/Forms/ConfirmDateForm';
import '../css/mailbox.css';

class Mailbox extends Component {
	static contextType = UserContext;
	state = { messages: null, checkDate: null, openMessage: null };

	componentDidMount = () => {
		apiHandler
			.getMyMessages(this.context.user._id)
			.then((APIResult) => this.setState({ messages: APIResult }))
			.catch((APIError) => console.log(APIError));
	};

	handleNewPM = () => {
		this.props.history.push('/mailbox/new');
	};

	showFrom(message) {
		let r = '';
		if (message.from_type === 'user') {
			r = <Link to={`/profile/${formatNameURL(message.from_user.name)}`}>{message.from_user.name}</Link>;
		} else {
			r = 'System';
		}
		return <React.Fragment>{r}</React.Fragment>;
	}

	toggleMessage = (e, message) => {
		// e.target.closest('tr').querySelector('pre').classList.toggle('on');
		// // console.log(message);
		if (!message.to.find((to) => to.target === this.context.user._id).read) {
			// "read the message"
			let updatedMessage = { ...message };
			updatedMessage.to.find((to) => to.target === this.context.user._id).read = true;
			apiHandler.updateMessage(message._id, updatedMessage);
		}
		let v = message._id === this.state.openMessage ? null : message._id;
		this.setState({ openMessage: v });
	};

	deleteMP = (message) => {
		let updatedMessage = { ...message };
		const index = updatedMessage.to.indexOf(updatedMessage.to.find((x) => x.target === this.context.user._id));
		updatedMessage.to.splice(index, 1);
		if (!updatedMessage.to.length) {
			apiHandler
				.deleteMessage(message._id)
				.then(() => {
					apiHandler
						.getMyMessages(this.context.user._id)
						.then((APIResult) => this.setState({ messages: APIResult }))
						.catch((APIError) => console.log(APIError));
				})
				.catch((APIError) => console.log(APIError));
		} else {
			apiHandler
				.updateMessage(message._id, updatedMessage)
				.then((APIResult) => {
					apiHandler
						.getMyMessages(this.context.user._id)
						.then((APIResult) => this.setState({ messages: APIResult }))
						.catch((APIError) => console.log(APIError));
				})
				.catch((APIError) => console.log(APIError));
		}
	};

	showCalendar = (message) => {
		this.setState({ checkDate: message });
		// ShowCalendar via sessionCheck;
	};

	closeCalendar = () => {
		this.setState({ checkDate: null });
	};

	render() {
		if (!this.state.messages) return <Loader />;
		return (
			<main>
				{this.state.checkDate && <ConfirmDateForm data={this.state.checkDate} close={this.closeCalendar} />}
				<button onClick={this.handleNewPM}>New PM</button>
				<section className="list-messages">
					<table className="mess">
						<thead>
							<tr>
								<th>Date</th>
								<th>Author</th>
								<th>Message</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{this.state.messages.map((message, index) => {
								return (
									<tr key={index} className="message">
										<td className="date">
											{message.to.find((x) => x.target === this.context.user._id).read ? (
												<FontAwesomeIcon icon={faEnvelopeOpenText} />
											) : (
												<FontAwesomeIcon icon={faEnvelope} />
											)}
											{getDate(message.created, 'mailbox')}
										</td>
										<td className="author">{this.showFrom(message)}</td>
										<td className={this.state.openMessage === message._id ? 'title active' : 'title'}>
											<strong>
												<FontAwesomeIcon
													icon={this.state.openMessage === message._id ? faAngleDown : faAngleUp}
													className="icon"
													onClick={(e) => this.toggleMessage(e, message)}
												/>
												{message.subject}
											</strong>
											<pre className={this.state.openMessage === message._id ? 'messageBody on' : 'messageBody'}>
												{message.message}
											</pre>
										</td>
										<td className="actions">
											{message.from_type === 'user' && (
												<button onClick={() => this.deleteMP(message)} className="red">
													<FontAwesomeIcon icon={faTrash} />
												</button>
											)}
											{message.type === 'planner' && (
												<button onClick={() => this.showCalendar(message)} className="green">
													<FontAwesomeIcon icon={faVoteYea} />
												</button>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</section>
			</main>
		);
	}
}

export default withRouter(Mailbox);
