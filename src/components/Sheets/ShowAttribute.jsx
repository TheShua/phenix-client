import React from 'react';
import { showModifier } from '../../utils/funcs';

const ShowAttribute = ({ stat }) => {
	return (
		<div className="attribute">
			<h4>{stat.name}</h4>
			<strong>{stat.value}</strong>
			<span>{showModifier(stat.value, true)}</span>
		</div>
	);
};

export default ShowAttribute;
