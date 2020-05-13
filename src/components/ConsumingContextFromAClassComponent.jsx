import React, { Component } from 'react';
import UserContext from './Auth/UserContext';

export class ConsumingContextFromAClassComponent extends Component {
	static contextType = UserContext;
	render() {
		console.log(this.context);
		return <div>{this.context}</div>;
	}
}

export default ConsumingContextFromAClassComponent;
