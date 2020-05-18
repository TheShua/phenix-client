import React, { Component } from 'react';
import Loader from '../components/Loader';
import { withRouter } from 'react-router-dom';
import apiHandler from '../api/apiHandler';
import UserContext from '../components/Auth/UserContext';

class Mailbox extends Component {
	static contextType = UserContext;
	state = { messages: null };

	componentDidMount = () => {
		apiHandler
			.getMyMessages(this.context.user._id)
			.then((APIResult) => this.setState({ messages: APIResult }))
			.catch((APIError) => console.log(APIError));
	};

	handleNewPM = () => {
		this.props.history.push('/mailbox/new');
	};

	render() {
		if (!this.state.messages) return <Loader />;
		return (
			<main>
				<button onClick={this.handleNewPM}>New PM</button>
			</main>
		);
	}
}

export default withRouter(Mailbox);
