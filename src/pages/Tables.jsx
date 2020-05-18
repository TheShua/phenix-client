import React, { Component } from 'react';
import NewTableForm from '../components/Forms/NewTableForm';
import AddSessionForm from '../components/Forms/AddSessionForm';
import UserContext from '../components/Auth/UserContext';
import TableResumeBloc from '../components/TableResumeBloc';
import apiHandler from '../api/apiHandler';
import Loader from '../components/Loader';

class Tables extends Component {
	static contextType = UserContext;
	state = { create: false, listTablesDM: null, listTablesPlayer: null, addSession: false };

	componentDidMount = () => {
		apiHandler
			.getAllMyTables(this.context.user._id)
			.then((APIResult) => {
				this.setState({ listTablesDM: APIResult.dm, listTablesPlayer: APIResult.player });
			})
			.catch((APIError) => console.log(APIError));
	};

	handleClickForm = () => {
		this.setState({ create: !this.state.create });
	};

	handleCloseSessionForm = () => {
		this.setState({ addSession: false });
	};

	handleCreateSession = (id) => {
		this.setState({ create: false, addSession: id });
	};

	render() {
		if (!this.state.listTablesDM) return <Loader />;
		return (
			<main>
				{!this.state.create && <button onClick={this.handleClickForm}>Create a table</button>}
				{this.state.create && <NewTableForm close={this.handleClickForm} />}
				{this.state.addSession && <AddSessionForm data={this.state.addSession} close={this.handleCloseSessionForm} />}
				{this.state.listTablesDM.map((table, index) => {
					return <TableResumeBloc key={index} data={table} createSession={this.handleCreateSession} />;
				})}
				{this.state.listTablesPlayer.map((table, index) => {
					return <TableResumeBloc key={index} data={table} />;
				})}
			</main>
		);
	}
}

export default Tables;
