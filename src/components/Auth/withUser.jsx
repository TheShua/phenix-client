import React from 'react';
import UserContext from './UserContext';

export const withUser = (ComponentToPassUserContextTo) => {
	return function (props) {
		return (
			<UserContext.Consumer>
				{(context) => <ComponentToPassUserContextTo {...props} context={context} />}
			</UserContext.Consumer>
		);
	};
};
