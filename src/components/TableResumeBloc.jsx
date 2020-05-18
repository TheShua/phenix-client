import React, { Component } from 'react';
import InputPlayerSearch from './InputPlayerSearch';

class TableResumeBloc extends Component {
	render() {
		return (
			<article>
				{this.props.data.name}{' '}
				{this.props.createSession && (
					<button onClick={() => this.props.createSession(this.props.data._id)}>Add session</button>
				)}
				{this.props.createSession && <InputPlayerSearch table={this.props.data} />}
			</article>
		);
	}
}

export default TableResumeBloc;
