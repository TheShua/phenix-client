import React, { Component } from 'react';
import NewTableForm from '../components/Forms/NewTableForm';
import AddSessionForm from '../components/Forms/AddSessionForm';
import UserContext from '../components/Auth/UserContext';
import TableResumeBloc from '../components/TableResumeBloc';
import apiHandler from '../api/apiHandler';
import Loader from '../components/Loader';
import '../css/TableResumeBloc.css';

class Tables extends Component {
	static contextType = UserContext;
	state = { create: false, listTablesDM: null, listTablesPlayer: null, addSession: false };

	componentDidMount = () => {
		apiHandler
			.getAllMyTables(this.context.user._id, true)
			.then((APIResult) => {
				this.setState({ listTablesDM: APIResult.dm, listTablesPlayer: APIResult.player });
			})
			.catch((APIError) => console.log(APIError));
	};

	handleSubmitForm = () => {
		this.handleClickForm();
		apiHandler
			.getAllMyTables(this.context.user._id, true)
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

	updateList = () => {
		apiHandler
			.getAllMyTables(this.context.user._id, true)
			.then((APIResult) => {
				this.setState({ listTablesDM: APIResult.dm });
			})
			.catch((APIError) => console.log(APIError));
	};

	render() {
		if (!this.state.listTablesDM) return <Loader />;
		return (
			<main>
				<div className="ignore">
					{!this.state.create && <button onClick={this.handleClickForm}>Create a table</button>}
				</div>
				{this.state.create && <NewTableForm close={this.handleClickForm} subForm={this.handleSubmitForm} />}
				{this.state.addSession && <AddSessionForm data={this.state.addSession} close={this.handleCloseSessionForm} />}

				<section className="list-tables">
					{this.state.listTablesDM.map((table, index) => {
						return (
							<TableResumeBloc
								key={index}
								data={table}
								update={this.updateList}
								createSession={this.handleCreateSession}
							/>
						);
					})}
					{this.state.listTablesPlayer.map((table, index) => {
						return <TableResumeBloc key={index} data={table} />;
					})}
				</section>
			</main>
		);
	}
}

export default Tables;
