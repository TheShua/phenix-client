import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Aside from './Aside';
import ProtectedRoute from './ProtectedRoute';
import DashBoard from '../pages/DashBoard';
import Mailbox from '../pages/Mailbox';
import NewMessageForm from './Forms/NewMessageForm';
import Profile from '../pages/Profile';
import PublicProfile from '../pages/PublicProfile';
import Characters from '../pages/Characters';
import CharacterSheet from '../pages/CharacterSheet';
import Tables from '../pages/Tables';
import { withUser } from '../components/Auth/withUser';

function App(props) {
	return (
		<div className="App">
			<Header />
			<div className="bodyApp">
				{props.context.isLoggedIn && <Aside />}
				<Switch>
					<Route exact path="/" component={Home} />
					<ProtectedRoute exact path="/dashboard" component={DashBoard} />
					<ProtectedRoute exact path="/profile" component={Profile} />
					<Route path="/profile/:name" component={PublicProfile} />
					<ProtectedRoute exact path="/mailbox" component={Mailbox} />
					<ProtectedRoute exact path="/mailbox/new" component={NewMessageForm} />
					<ProtectedRoute exact path="/characters" component={Characters} />
					<Route path="/characters/:id" component={CharacterSheet} />
					<ProtectedRoute exact path="/tables" component={Tables} />
					<Route exact path="/signup" component={SignUp} />
				</Switch>
			</div>
		</div>
	);
}

export default withUser(App);
