import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';

function App() {
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/signup" component={SignUp} />
			</Switch>
		</div>
	);
}

export default App;
