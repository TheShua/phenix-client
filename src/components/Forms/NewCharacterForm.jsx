import React, { Component } from 'react';
import FormElement from '../Helpers/FormElement';
import apiHandler from '../../api/apiHandler';
import apiDnD from '../../api/apiDND';
import Roll from './Roll';
import ShowRaceInfosOnForm from '../ShowRaceInfosOnForm';
// import { withUser } from '../Auth/withUser';
import UserContext from '../Auth/UserContext';
import { withRouter } from 'react-router-dom';
import '../../css/form.css';

class NewCharacterForm extends Component {
	state = {
		step: 1,
		name: '',
		allRaces: [],
		allClasses: [],
		system: '5e',
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		cha: 10,
		race: null,
		classe: null,
	};

	static contextType = UserContext;

	componentDidMount = () => {
		this.setRacesList();
		this.setClassesList();
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.name === '') {
			this.setState({ step: 1 });
		} else if (!this.state.race || !this.state.classe) {
			this.setState({ step: 2 });
		} else if (
			this.state.str === '' ||
			this.state.dex === '' ||
			this.state.con === '' ||
			this.state.int === '' ||
			this.state.wis === '' ||
			this.state.cha === ''
		) {
			this.setState({ step: 2 });
		} else {
			const character = {
				user_id: this.context.user._id,
				system: this.state.system,
				sheet: {
					name: this.state.name,
					classe: { name: this.state.classe.index, level: 1 },
					race: this.state.race.index,
					strength: this.state.str,
					dexterity: this.state.dex,
					constitution: this.state.con,
					intelligence: this.state.int,
					wisdom: this.state.wis,
					charisma: this.state.cha,
					hitPointsTotal: this.state.classe.hit_die,
					hitPoints: this.state.classe.hit_die,
					hitPointsAlt: 0,
				},
			};
			apiHandler
				.createCharacter(character)
				.then((APIResult) => {
					this.props.history.push('/');
				})
				.catch((APIError) => console.log(APIError));
		}
	};

	handleChange = (event) => {
		const value =
			event.target.type === 'file'
				? event.target.files[0]
				: event.target.type === 'checkbox'
				? event.target.checked
				: event.target.value;

		if (event.target.name === 'race') {
			apiDnD
				.getRace(event.target.value)
				.then((result) => {
					console.log(result);
					this.setState({ race: result });
				})
				.catch((error) => console.log(error));
		} else if (event.target.name === 'classe') {
			apiDnD
				.getClasse(event.target.value)
				.then((result) => {
					console.log(result);
					this.setState({ classe: result });
				})
				.catch((error) => console.log(error));
		} else {
			const key = event.target.name;
			this.setState({ [key]: value });
		}
	};

	handlePrev = (event) => {
		event.preventDefault();
		if (this.state.step > 1) {
			this.setState({ step: this.state.step - 1 });
		}
	};

	handleNext = (event) => {
		event.preventDefault();
		this.setState({ step: this.state.step + 1 });
	};

	setRacesList() {
		apiDnD
			.getAllRaces()
			.then((APIResult) => {
				this.setState({ allRaces: APIResult.results });
			})
			.catch((APIError) => console.log(APIError));
	}

	setClassesList() {
		apiDnD
			.getAllClasses()
			.then((APIResult) => {
				this.setState({ allClasses: APIResult.results });
			})
			.catch((APIError) => console.log(APIError));
	}

	handleRoll = (e, attr) => {
		e.preventDefault();
		let rolls = [];
		for (let i = 0; i < 4; i++) {
			let rand = Math.floor(Math.random() * (6 - 1 + 1) + 1);
			rolls.push(rand);
		}
		console.log(rolls);
		let total = [...rolls];
		total.sort().shift();
		total = total.reduce((acc, val) => acc + val, 0);
		this.setState({ [attr]: total });
	};

	render() {
		// console.log(this.state);
		// console.log(this.props);
		return (
			<div className="overlay">
				<form className="main" method="POST">
					<div className="close-me" onClick={this.props.close}>
						X
					</div>
					<h2>Create a new character</h2>
					{this.state.step === 1 && (
						<React.Fragment>
							<FormElement
								type="text"
								name="name"
								label="Character name"
								value={this.state.name}
								change={this.handleChange}
							/>
							{/* <FormElement type="select" name="system" label="System" opt={['5e']} change={this.handleChange} /> */}
							<button onClick={this.handleNext}>Next ></button>
						</React.Fragment>
					)}

					{this.state.step === 2 && (
						<React.Fragment>
							<section className="flex">
								<div className="left">
									<FormElement
										type="select"
										name="race"
										label="Race"
										opt={this.state.allRaces}
										change={this.handleChange}
										placeholder="Select a race"
									></FormElement>
									<FormElement
										type="select"
										name="classe"
										label="Classe"
										opt={this.state.allClasses}
										change={this.handleChange}
										placeholder="Select a classe"
									></FormElement>
									{this.state.race && <ShowRaceInfosOnForm race={this.state.race} />}
								</div>
								<div className="right">
									<div className="w">
										<div>
											<FormElement
												type="number"
												name="str"
												value={this.state.str}
												label="STR"
												class="short"
												change={this.handleChange}
												solo={true}
											/>{' '}
											<Roll for={(e) => this.handleRoll(e, 'str')} />
										</div>
										<div>
											<FormElement
												type="number"
												name="dex"
												value={this.state.dex}
												label="DEX"
												class="short"
												change={this.handleChange}
												solo={true}
											/>{' '}
											<Roll for={(e) => this.handleRoll(e, 'dex')} />
										</div>
										<div>
											<FormElement
												type="number"
												name="con"
												value={this.state.con}
												label="CON"
												class="short"
												change={this.handleChange}
												solo={true}
											/>{' '}
											<Roll for={(e) => this.handleRoll(e, 'con')} />
										</div>
									</div>
									<div className="w">
										<div>
											<FormElement
												type="number"
												name="int"
												value={this.state.int}
												label="INT"
												class="short"
												change={this.handleChange}
												solo={true}
											/>{' '}
											<Roll for={(e) => this.handleRoll(e, 'int')} />
										</div>
										<div>
											<FormElement
												type="number"
												name="wis"
												value={this.state.wis}
												label="WIS"
												class="short"
												change={this.handleChange}
												solo={true}
											/>{' '}
											<Roll for={(e) => this.handleRoll(e, 'wis')} />
										</div>
										<div>
											<FormElement
												type="number"
												name="cha"
												value={this.state.cha}
												label="CHA"
												class="short"
												change={this.handleChange}
												solo={true}
											/>{' '}
											<Roll for={(e) => this.handleRoll(e, 'cha')} />
										</div>
									</div>
								</div>
							</section>
							<button onClick={this.handlePrev}>Prev ></button>
							{/* <button onClick={this.handleNext}>Next ></button> */}
							<button onClick={this.handleSubmit}>Submit for now</button>
						</React.Fragment>
					)}

					{this.state.step === 3 && (
						<React.Fragment>
							<FormElement type="text" name=""></FormElement>
							<FormElement type="text" name=""></FormElement>
							<FormElement type="text" name=""></FormElement>
							<button onClick={this.handlePrev}>Prev ></button>
							{/* <button onClick={this.handleNext}>Next ></button> */}
						</React.Fragment>
					)}
				</form>
			</div>
		);
	}
}

export default withRouter(NewCharacterForm);
