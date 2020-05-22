import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../Auth/UserContext';
import apiHandler from '../../api/apiHandler';
import '../../css/InputPlayerSearch.css';

class UserSearch extends Component {
	static contextType = UserContext;
	state = { users: false, tables: false, toShow: null, list: [], value: '' };

	componentDidMount = () => {
		let params = {};
		for (const elem of this.props.params) {
			params[elem] = true;
		}
		this.setState(params);
	};

	handleChange = (event) => {
		this.setState({ value: event.target.value });
		if (event.target.value === '') {
			this.setState({ toShow: null });
			return;
		}

		apiHandler
			.searchUsersAndTables(event.target.value)
			.then((APIResult) => {
				let total = APIResult.users.concat(APIResult.tables);
				if (total.length > 0) {
					this.setState({ toShow: total });
				} else {
					this.setState({ toShow: null });
				}
			})
			.catch((APIError) => console.log(APIError));
	};

	handleAddElem = (elem) => {
		let newList = [...this.state.list];
		newList.push(elem);
		this.setState({ list: newList, value: '', toShow: null });
		this.props.handleUpdate(newList);
	};

	handleDelElem = (index) => {
		let newList = [...this.state.list];
		newList.splice(index, 1);
		this.setState({ list: newList });
		this.props.handleUpdate(newList);
	};

	render() {
		let list = [];
		if (this.state.toShow) {
			list = this.state.toShow.filter((elem) => {
				if (elem.scope && elem.scope === 'private') {
					if (elem.dm_id !== this.context.user._id && !elem.player_id.includes(this.context.user._id)) {
						return false;
					}
				}
				if (elem.email && elem._id === this.context.user._id) {
					return false;
				}
				if (this.state.list.find((x) => x.name === elem.name)) {
					return false;
				}
				return true;
			});
		}

		const r = (
			<React.Fragment>
				<label htmlFor={this.props.name}>{this.props.label}</label>
				<ul>
					{this.state.list.map((list, index) => {
						return (
							<li key={index}>
								<span className="bloc" onClick={() => this.handleDelElem(index)}>
									{list.name}{' '}
									<span>
										<FontAwesomeIcon icon={faTimes} />
									</span>
								</span>
							</li>
						);
					})}
					<li>
						<input
							type={this.props.type}
							name={this.props.name}
							onChange={this.handleChange}
							value={this.state.value}
							autoComplete="off"
						/>
						<ul className="list-players">
							{this.state.toShow &&
								list.map((elem, index) => {
									return (
										<li key={index} onClick={() => this.handleAddElem(elem)}>
											{elem.scope && '[Table] '} {elem.name}{' '}
											<span className="add-me">
												<FontAwesomeIcon icon={faPlusCircle} />
											</span>
										</li>
									);
								})}
						</ul>
					</li>
				</ul>
			</React.Fragment>
		);

		if (this.props.solo) {
			return r;
		} else {
			return <div className="element">{r}</div>;
		}
	}
}

export default UserSearch;
