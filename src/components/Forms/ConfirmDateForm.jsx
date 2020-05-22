import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import { getDate } from '../../utils/funcs';
import apiHandler from '../../api/apiHandler';
import { withUser } from '../Auth/withUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import '../../css/form.css';

const ConfirmDateForm = ({ data, context, close }) => {
	const [session, setSession] = useState({});
	const [players, setPlayers] = useState([]);
	const [availabilities, setAvailabilities] = useState([]);
	const [playersDisponibilities, setPlayersDisponibilities] = useState([]);

	useEffect(() => {
		const initDatas = async () => {
			try {
				let toto = [];
				data.to.forEach((to) => {
					toto.push({ target: to.target, vote: to.vote });
				});
				setPlayersDisponibilities(toto);
				await apiHandler
					.getSession(data.sessionCheck)
					.then(async (sessionResult) => {
						setSession(sessionResult);
						let mySchedule = data.to.find((x) => x.target === context.user._id).vote;
						if (!mySchedule) {
							let schedule = [];
							for (let i = 0; i < sessionResult.suggestions.length; i++) {
								schedule.push(false);
							}
							setAvailabilities(schedule);
						} else {
							setAvailabilities(mySchedule);
						}
						let newL = [];
						await data.to.forEach((e) => {
							if (!e.vote.length) {
								let schedule = [];
								for (let i = 0; i < sessionResult.suggestions.length; i++) {
									schedule.push(false);
								}
								newL.push(schedule);
							} else {
								newL.push(e.vote);
							}
						});
						await setPlayersDisponibilities(newL);
						await apiHandler
							.getTable(sessionResult.table_id, true)
							.then((playersResults) => {
								setPlayers(playersResults.player_id);
							})
							.catch((playersError) => console.log(playersError));
					})
					.catch((sessionError) => console.log(sessionError));
			} catch (error) {
				console.log(error);
			}
		};
		initDatas();
	}, [data, context]);

	const createTable = () => {
		if (!players.length) return;
		let table = [];
		let maxCells = 1 + session.suggestions.length;
		let maxRows = 1 + players.length;

		for (let row = 0; row < maxRows; row++) {
			let children = [];
			if (row === 0) {
				for (let cell = 0; cell < maxCells; cell++) {
					if (cell === 0) {
						children.push(<td key={`${row} - ${cell}`}></td>);
					} else {
						let date = session.suggestions[cell - 1];
						children.push(
							<td key={`${row} - ${cell}`} className="date">
								{getDate(date.start, 'start').map((x, i) => (
									<p key={i}>{x}</p>
								))}
								(~ {calculateTime(new Date(date.start), new Date(date.end))}
								h)
							</td>
						);
					}
				}
			} else {
				for (let cell = 0; cell < maxCells; cell++) {
					if (cell === 0) {
						children.push(
							<td key={`${row} - ${cell}`} className="player">
								{players[row - 1].name}
							</td>
						);
					} else {
						if (context.user._id === players[row - 1]._id) {
							children.push(
								<td
									key={`${row} - ${cell}`}
									onClick={() => handleClick(cell - 1)}
									className={availabilities[cell - 1] ? 'self-selected' : ''}
								>
									{!!availabilities[cell - 1] ? (
										<FontAwesomeIcon icon={faCheck} />
									) : (
										<FontAwesomeIcon icon={faSquare} />
									)}
								</td>
							);
						} else {
							children.push(
								<td
									key={`${row} - ${cell}`}
									onClick={() => handleClick(cell - 1)}
									className={playersDisponibilities[row - 1][cell - 1] ? 'selected' : ''}
								>
									{playersDisponibilities[row - 1][cell - 1] ? <FontAwesomeIcon icon={faCheck} /> : ''}
								</td>
							);
							// console.log(data.to.find((x) => x.target === players[row - 1]._id).vote);
							// children.push(<td key={`${row} - ${cell}`}></td>);
						}
					}
				}
			}
			table.push(<tr key={row}>{children}</tr>);
		}
		return table;
	};

	const handleClick = (cell) => {
		let newAvailabilities = [...availabilities];
		newAvailabilities[cell] = !newAvailabilities[cell];
		setAvailabilities(newAvailabilities);
	};

	const calculateTime = (start, end) => {
		let diff = (end.getTime() - start.getTime()) / 1000;
		diff /= 60 * 60;
		return Math.abs(Math.round(diff));
	};

	const handleSubmit = () => {
		let updatedSession = { ...data };
		let newAvailabilities = [...availabilities];
		newAvailabilities.map((x) => (x === undefined ? false : true));
		updatedSession.to.find((x) => x.target === context.user._id).vote = newAvailabilities;
		delete updatedSession._id;
		apiHandler
			.updateSession(data._id, updatedSession)
			.then((APIresult) => {
				close();
			})
			.catch((APIError) => console.log(APIError));
	};

	if (!players.length) {
		return <Loader />;
	} else {
		return (
			<div className="overlay">
				<div className="main">
					<div className="close-me" onClick={close}>
						X
					</div>
					<h2>Session : {session.name}</h2>
					<table className="dates-checking">
						<tbody>{createTable()}</tbody>
					</table>
					<div className="buttons">
						<button onClick={handleSubmit}>Send your availabilities</button>
					</div>
				</div>
			</div>
		);
	}
};

export default withUser(ConfirmDateForm);
