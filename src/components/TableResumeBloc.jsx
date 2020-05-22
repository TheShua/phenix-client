import React, { Component } from 'react';
import InputPlayerSearch from './InputPlayerSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookReader } from '@fortawesome/free-solid-svg-icons';
import '../css/TableResumeBloc.css';

class TableResumeBloc extends Component {
	state = { addPlayer: false, nextSession: null };

	handleToggleAddPlayer = () => {
		this.setState({ addPlayer: !this.state.addPlayer });
		this.props.update();
	};

	render() {
		// console.log(this.props.data);
		return (
			<article className="bloc-table">
				<div className="head">
					<h3>{this.props.data.name}</h3>{' '}
					<strong>
						{this.props.data.date_start
							? `Next session : ${new Date(this.props.data.date_start)}`
							: 'Next session not planned'}
					</strong>
				</div>
				{this.props.createSession && (
					<button className="btn session" onClick={() => this.props.createSession(this.props.data._id)}>
						Plan next session
					</button>
				)}
				<ul className="player-list">
					<li className="dm">
						<FontAwesomeIcon icon={faBookReader} />
						{this.props.data.dm_id.name}
					</li>
					{this.props.data.player_id.map((user, index) => {
						return (
							<li key={index}>
								<FontAwesomeIcon icon={faUser} />
								{user.name}
							</li>
						);
					})}
					{!this.props.data.player_id.length && <li className="center">No player at this table yet</li>}
				</ul>
				{this.props.createSession && !this.state.addPlayer && (
					<button className="btn player" onClick={this.handleToggleAddPlayer}>
						Add player...
					</button>
				)}
				{this.props.createSession && this.state.addPlayer && (
					<InputPlayerSearch clbk={this.handleToggleAddPlayer} table={this.props.data} />
				)}
			</article>
		);
	}
}

export default TableResumeBloc;
