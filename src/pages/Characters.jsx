import React, { Component } from 'react';
import '../css/Characters.css';
import apiHandler from '../api/apiHandler';
import apiDnD from '../api/apiDND';
import UserContext from '../components/Auth/UserContext';
import NewCharacterForm from '../components/Forms/NewCharacterForm';
import ResumeCharacterBloc from '../components/ResumeCharacterBloc';
import Loader from '../components/Loader';

export class Characters extends Component {
	static contextType = UserContext;
	state = { characters: [], allDatas: {}, create: false };

	componentDidMount() {
		apiHandler
			.getAllMyCharacters(this.context.user._id)
			.then((APIResult) => {
				this.setState({ characters: APIResult });
			})
			.catch((APIError) => console.log(APIError));

		apiDnD
			.getAllDatas()
			.then((APIResult) => this.setState({ allDatas: APIResult }))
			.catch((APIError) => console.log(APIError));
	}

	handleAddCharacter = () => {
		this.setState({ create: !this.state.create });
	};

	render() {
		if (!this.state.allDatas.races) return <Loader />;
		return (
			<main>
				<button onClick={this.handleAddCharacter}>Create a Character</button>
				{this.state.create && <NewCharacterForm close={this.handleAddCharacter} />}
				<section className="list-characters">
					{this.state.characters.map((character, index) => {
						const race = this.state.allDatas.races.results.find((x) => x.index === character.sheet.race);
						const classe = this.state.allDatas.classes.results.filter((x) => {
							let r = false;
							character.sheet.classe.forEach((y) => {
								if (y.name === x.index) r = true;
							});
							return r;
						});
						return (
							<ResumeCharacterBloc
								character={character}
								data={{ race: race, classe: classe }}
								key={index}
							></ResumeCharacterBloc>
						);
					})}
				</section>
			</main>
		);
	}
}

export default Characters;
