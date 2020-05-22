import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import apiHandler from '../api/apiHandler';
import UserContext from './Auth/UserContext';
import '../css/InputPlayerSearch.css';

class InputPlayerSearch extends Component {
	state = { players: null, value: '', table: null };
	static contextType = UserContext;

	componentDidMount = () => {
		apiHandler
			.getTable(this.props.table._id)
			.then((APIResult2) => this.setState({ table: APIResult2 }))
			.catch((APIERrror2) => console.log(APIERrror2));
	};

	handleChange = (event) => {
		this.setState({ value: event.target.value });
		if (event.target.value === '') {
			this.setState({ players: null });
			return;
		}
		apiHandler
			.searchUser(event.target.value)
			.then((APIResult) => {
				if (APIResult.length > 0) {
					this.setState({ players: APIResult });
				} else {
					this.setState({ players: null });
				}
			})
			.catch((APIError) => console.log(APIError));
	};

	handleAddPlayer = (player) => {
		apiHandler
			.addPlayerToTable(this.props.table._id, player._id)
			.then((APIResult) => {
				this.setState({ players: null, value: '' });
				this.props.clbk();
			})
			.catch((APIError) => console.log(APIError));
	};

	render() {
		if (!this.state.table) return null;
		let list = [];
		if (this.state.players) {
			console.log(this.state.players);
			list = this.state.players.filter((player) => {
				if (this.state.table.player_id.includes(player._id)) {
					return false;
				}
				if (player._id === this.context.user._id) {
					return false;
				}
				return true;
			});
		}

		return (
			<React.Fragment>
				<input type="text" onChange={this.handleChange} value={this.state.value} />
				<ul className="list-players">
					{this.state.players &&
						list.map((player, index) => {
							return (
								<li key={index} onClick={() => this.handleAddPlayer(player)}>
									{player.name}{' '}
									<span className="add-me">
										<FontAwesomeIcon icon={faPlusCircle} />
									</span>
								</li>
							);
						})}
				</ul>
			</React.Fragment>
		);
	}
}

export default InputPlayerSearch;
