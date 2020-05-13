import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import SignUp from '../pages/SignUp';

function App() {
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route path="/signup" component={SignUp}></Route>
			</Switch>
		</div>
	);
}

export default App;
