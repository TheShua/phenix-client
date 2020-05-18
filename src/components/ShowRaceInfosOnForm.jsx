import React from 'react';

const ShowRaceInfosOnForm = (props) => {
	console.log(props);
	return (
		<React.Fragment>
			<h3>Traits</h3>
			<ul>
				{props.race &&
					props.race.traits.map((trait, index) => {
						return <li key={index}>{trait.name}</li>;
					})}
			</ul>
		</React.Fragment>
	);
};

export default ShowRaceInfosOnForm;
