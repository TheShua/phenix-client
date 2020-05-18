import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

const Roll = (props) => {
	return (
		<button onClick={props.for}>
			<FontAwesomeIcon icon={faDiceD20} />
		</button>
	);
};

export default Roll;
