import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ResumeCharacterBloc extends Component {
	handleShowSheet = () => {
		this.props.history.push('/characters/' + this.props.character._id);
	};

	showClasse() {
		let classes = this.props.data.classe;
		if (classes.length > 1) {
		} else {
			return <React.Fragment>{classes[0].name}</React.Fragment>;
		}
	}

	render() {
		if (!this.props.data.race) return null;
		return (
			<article className="character-resume-bloc">
				<div className="head">
					<h3>{this.props.character.sheet.name}</h3>
					<strong>{this.props.data.race.name}</strong>
					<strong>{this.props.data.classe[0].name}</strong>
				</div>
				<table>
					<tbody>
						<tr>
							<td className="attr">STR</td>
							<td className="attrVal">{this.props.character.sheet.strength}</td>
							<td className="attr">INT</td>
							<td className="attrVal">{this.props.character.sheet.intelligence}</td>
						</tr>
						<tr>
							<td className="attr">DEX</td>
							<td className="attrVal">{this.props.character.sheet.dexterity}</td>
							<td className="attr">WIS</td>
							<td className="attrVal">{this.props.character.sheet.wisdom}</td>
						</tr>
						<tr>
							<td className="attr">CON</td>
							<td className="attrVal">{this.props.character.sheet.strength}</td>
							<td className="attr">CHA</td>
							<td className="attrVal">{this.props.character.sheet.charisma}</td>
						</tr>
					</tbody>
				</table>
				<button className="big-button" onClick={this.handleShowSheet}>
					Show Character Sheet
				</button>
			</article>
		);
	}
}

export default withRouter(ResumeCharacterBloc);
