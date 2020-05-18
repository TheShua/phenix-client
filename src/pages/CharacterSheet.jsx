import React, { Component } from 'react';
import apiHandler from '../api/apiHandler.js';
import Loader from '../components/Loader';
import ShowAttribute from '../components/Sheets/ShowAttribute';
import ShowSave from '../components/Sheets/ShowSave';
import ShowDeathSaves from '../components/Sheets/ShowDeathSaves';
import { showModifier } from '../utils/funcs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as emptyCircle } from '@fortawesome/free-regular-svg-icons';
import '../css/character-sheet.css';

class CharacterSheet extends Component {
	state = { sheet: null, isLoading: false };

	componentDidMount = () => {
		this.setState({ isLoading: true });
		apiHandler
			.getCharacterSheet(this.props.match.params.id, true)
			.then((APIResult) => {
				this.setState({ sheet: APIResult.sheet, user: APIResult.user_id, isLoading: false });
			})
			.catch((APIError) => console.log(APIError));
	};

	showProficiency = (text = false) => {
		const level = this.state.sheet.classe.sort((a, b) => a.level - b.level)[0].level;
		const r = Math.ceil(level / 4 + 1);
		return text ? `+${r}` : r;
	};

	isProficientWith(stat) {
		let r = false;
		this.state.sheet.classe[0].classe.saving_throws.forEach((saving) => {
			if (saving.name === stat) r = true;
		});
		return r;
	}

	showSavingThrow(stat, value) {
		let r = this.isProficientWith(stat) ? showModifier(value) + this.showProficiency() : showModifier(value);
		if (r > 0) r = `+${r}`;
		return r;
	}

	render() {
		if (!this.state.sheet || this.state.isLoading) return <Loader />;
		return (
			<article className="character-sheet">
				<div className="heading">
					<h2>{this.state.sheet.name}</h2>
					<div className="data">
						<div className="element">
							{this.state.sheet.classe.map((classe, index) => {
								if (index > 0) return `, ${classe.classe.name} lv.${classe.level}`;
								else return `${classe.classe.name} lv.${classe.level}`;
							})}
							<span>Class &amp; level</span>
						</div>
						<div className="element">
							BACKGROUND
							<span>Background</span>
						</div>
						<div className="element">
							{this.state.user.name}
							<span>Player name</span>
						</div>
						<div className="element">
							{this.state.sheet.race.name}
							<span>Race</span>
						</div>
						<div className="element">
							{this.state.sheet.alignment ? this.state.sheet.alignment : 'N'}
							<span>Alignment</span>
						</div>
						<div className="element">
							0<span>Experience points</span>
						</div>
					</div>
				</div>
				<div className="attr-skills">
					<div className="column">
						<ShowAttribute stat={{ name: 'Strength', value: this.state.sheet.strength }} />
						<ShowAttribute stat={{ name: 'Dexterity', value: this.state.sheet.dexterity }} />
						<ShowAttribute stat={{ name: 'Constitution', value: this.state.sheet.constitution }} />
						<ShowAttribute stat={{ name: 'Intelligence', value: this.state.sheet.intelligence }} />
						<ShowAttribute stat={{ name: 'Wisdom', value: this.state.sheet.wisdom }} />
						<ShowAttribute stat={{ name: 'Charisma', value: this.state.sheet.charisma }} />
					</div>
					<div className="column">
						<div className="little-bloc inspiration">
							Inspiration <span>{this.state.sheet.inspiration ? 'Y' : 'N'}</span>
						</div>
						<div className="little-bloc inspiration">
							Proficiency bonus <span>{this.showProficiency(true)}</span>
						</div>
						<div className="big-bloc saves">
							<ShowSave stat="str" value={this.state.sheet.strength} classe={this.state.sheet.classe[0]} />
							<ShowSave stat="dex" value={this.state.sheet.dexterity} classe={this.state.sheet.classe[0]} />
							<ShowSave stat="con" value={this.state.sheet.constitution} classe={this.state.sheet.classe[0]} />
							<ShowSave stat="int" value={this.state.sheet.intelligence} classe={this.state.sheet.classe[0]} />
							<ShowSave stat="wis" value={this.state.sheet.wisdom} classe={this.state.sheet.classe[0]} />
							<ShowSave stat="cha" value={this.state.sheet.charisma} classe={this.state.sheet.classe[0]} />
							<h4>Saving throws</h4>
						</div>
						<div className="big-bloc skills">
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<span>
								<FontAwesomeIcon icon={emptyCircle} /> ... Skill
							</span>
							<h4>Skills</h4>
						</div>
					</div>
				</div>
				<div className="hitpoints">
					<div className="row three">
						<div className="big-element ac">
							<strong>10</strong>
							<h4>Armor class</h4>
						</div>
						<div className="big-element">
							<strong>10</strong>
							<h4>Initiative</h4>
						</div>
						<div className="big-element">
							<strong>{this.state.sheet.speed}</strong>
							<h4>Speed</h4>
						</div>
					</div>
					<div className="big-bloc top">
						<span className="sub">{this.state.sheet.hitPointsTotal}</span>
						<strong>{this.state.sheet.hitPoints}</strong>
						<h4>Current hit points</h4>
					</div>
					<div className="big-bloc bot">
						<strong>{this.state.sheet.HitPointsAlt}</strong>
						<h4>Temporary hit points</h4>
					</div>
					<div className="row two">
						<div className="mid-bloc">
							<span className="sub">
								{this.state.sheet.classe.map((classe, index) => {
									const level = this.state.sheet.classe[index].level;
									return (
										<span key={index}>
											{level}d{classe.classe.hit_die}
										</span>
									);
								})}
							</span>
							<strong>
								{this.state.sheet.classe.map((classe, index) => {
									const level = this.state.sheet.classe[index].level;
									return (
										<span key={index}>
											{level}d{classe.classe.hit_die}
										</span>
									);
								})}
							</strong>
							<h4>Hit dice</h4>
						</div>
						<div className="mid-bloc death-save">
							<ShowDeathSaves data={this.state.sheet.deathSaves} />
							<h4>Death save</h4>
						</div>
					</div>
				</div>
				<div className="roleplay">
					<div className="big-bloc top">
						<h4>Personality traits</h4>
					</div>
					<div className="big-bloc mid">
						<h4>Ideals</h4>
					</div>
					<div className="big-bloc mid">
						<h4>Bonds</h4>
					</div>
					<div className="big-bloc bot">
						<h4>Flaws</h4>
					</div>
				</div>
				<div className="attacks">
					<div className="big-bloc">
						<h4>Attacks &amp; spellcasting</h4>
					</div>
				</div>
				<div className="features">
					<div className="big-bloc">
						<h4>Features &amp; traits</h4>
					</div>
				</div>
				<div className="proficiencies">
					<div className="little-bloc">
						Passive wisdom (perception) <span>{showModifier(this.state.sheet.wisdom)}</span>
					</div>
					<div className="big-bloc">
						<h4>Other proficiencies &amp; languages</h4>
					</div>
				</div>
				<div className="equipment">
					<div className="big-bloc">
						<h4>Equipment</h4>
					</div>
				</div>
			</article>
		);
	}
}

export default CharacterSheet;
