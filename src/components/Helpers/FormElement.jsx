import React from 'react';

const FormElement = (props) => {
	let r = '';
	// console.log(props);
	if (props.type === 'select') {
		r = (
			<React.Fragment>
				<label htmlFor={props.name}>{props.label}</label>
				<select id={props.name} name={props.name} value={props.value} onChange={props.change} defaultValue="-1">
					{props.placeholder && (
						<option key={`${props.name}-pouet`} value="-1" disabled="disabled">
							{props.placeholder}
						</option>
					)}
					{typeof props.opt[0] === 'string' &&
						props.opt.map((opt, index) => {
							return (
								<option key={index} value={opt}>
									{opt}
								</option>
							);
						})}
					{typeof props.opt[0] === 'object' &&
						props.opt.map((opt) => {
							return (
								<option key={opt.index} value={opt.index}>
									{opt.name}
								</option>
							);
						})}
				</select>
			</React.Fragment>
		);
	} else if (props.type === 'textarea') {
		r = (
			<React.Fragment>
				<label htmlFor={props.name}>{props.label}</label>
				<textarea
					name={props.name}
					id={props.name}
					placeholder={props.placeholder}
					onChange={props.change}
					className={props.class}
				>
					{props.value}
				</textarea>
			</React.Fragment>
		);
	} else {
		r = (
			<React.Fragment>
				<label htmlFor={props.name}>{props.label}</label>
				<input
					type={props.type}
					id={props.name}
					name={props.name}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.change}
					className={props.class}
				/>
			</React.Fragment>
		);
	}

	if (props.solo) {
		return <React.Fragment>{r}</React.Fragment>;
	} else {
		return <div className="element">{r}</div>;
	}
};

export default FormElement;
