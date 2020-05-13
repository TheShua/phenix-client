import React from 'react';

const FormElement = (props) => {
	return (
		<div className="element">
			<label htmlFor={props.name}>{props.label}</label>
			<input type={props.type} id={props.name} name={props.name} placeholder={props.placeholder} />
		</div>
	);
};

export default FormElement;
