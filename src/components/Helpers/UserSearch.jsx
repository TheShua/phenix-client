import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import '../../css/InputPlayerSearch.css';

class UserSearch extends Component {
	state = { users: false, tables: false, toShow: null };

	componentDidMount = () => {
		let params = {};
		for (const elem of this.props.params) {
			params[elem] = true;
		}
		this.setState(params);
	};

	handleChange = (event) => {
		console.log(event.target.value);
	};

	handleAddElem = (elem) => {
		this.props.handleAdd(elem);
	};

	render() {
		let list = [];
		if (this.state.toShow) {
			list = this.state.toShow.filter((elem) => {
				return true;
			});
		}

		if (this.props.solo) {
			return (
				<ul>
					<li>
						<input type={this.props.type} name={this.props.name} onChange={this.handleChange} />
						<ul className="list">
							{this.state.toShow &&
								list.map((elem, index) => {
									return (
										<li key={index} onClick={() => this.handleAddElem(elem)}>
											{elem.name}{' '}
											<span className="add-me">
												<FontAwesomeIcon icon={faPlusCircle} />
											</span>
										</li>
									);
								})}
						</ul>
					</li>
				</ul>
			);
		} else {
			return (
				<div className="element">
					<label htmlFor={this.props.name}>{this.props.label}</label>
					<ul>
						<li>
							<input type={this.props.type} name={this.props.name} onChange={this.handleChange} />
						</li>
					</ul>
				</div>
			);
		}
	}
}

export default UserSearch;
