import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle as emptyCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircle as filledCircle } from '@fortawesome/free-solid-svg-icons';

const ShowDeathSaves = ({ data }) => {
	const howMany = (save, name) => {
		let r = [];
		for (let i = 0; i < save; i++) {
			r.push(<FontAwesomeIcon key={`${name}-${i}/${save}`} icon={filledCircle} />);
		}
		if (save < 3) {
			let less = 3 - save;
			for (let i = 0; i < less; i++) {
				r.push(<FontAwesomeIcon key={`${name}-${i + 5}`} icon={emptyCircle} />);
			}
		}
		return r;
	};

	return (
		<React.Fragment>
			<div className="row two">
				<span className="title">Successes</span>
				<div>{howMany(data.successes, 'success')}</div>
			</div>
			<div className="row two">
				<span className="title">Failures</span>
				<div>{howMany(data.failures, 'fails')}</div>
			</div>
		</React.Fragment>
	);
};

export default ShowDeathSaves;
