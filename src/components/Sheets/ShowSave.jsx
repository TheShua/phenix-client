import React from 'react';
import { showModifier } from '../../utils/funcs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as emptyCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircle as filledCircle } from '@fortawesome/free-solid-svg-icons';

const ShowSave = ({ stat, value, classe }) => {
	const showProficiency = (text = false) => {
		const level = classe.level;
		const r = Math.ceil(level / 4 + 1);
		return text ? `+${r}` : r;
	};

	const isProficientWith = (stat) => {
		let r = false;
		classe.classe.saving_throws.forEach((saving) => {
			if (saving.name === stat.toUpperCase()) r = true;
		});
		return r;
	};

	const showSavingThrow = (stat, value) => {
		let r = isProficientWith(stat) ? showModifier(value) + showProficiency() : showModifier(value);
		if (r > 0) r = `+${r}`;
		return r;
	};

	let stats = { short: stat };
	switch (stat) {
		case 'str':
		case 'STR':
			stats.long = 'Strength';
			break;

		case 'dex':
		case 'DEX':
			stats.long = 'Dexterity';
			break;

		case 'con':
		case 'CON':
			stats.long = 'Constitution';
			break;

		case 'int':
		case 'INT':
			stats.long = 'Intelligence';
			break;

		case 'wis':
		case 'WIS':
			stats.long = 'Wisdom';
			break;

		case 'cha':
		case 'CHA':
			stats.long = 'Charisma';
			break;

		default:
	}

	return (
		<span>
			<FontAwesomeIcon icon={isProficientWith(stat) ? filledCircle : emptyCircle} /> {showSavingThrow(stat, value)}{' '}
			{stats.long}
		</span>
	);
};

export default ShowSave;
