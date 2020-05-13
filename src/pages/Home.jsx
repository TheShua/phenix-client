import React from 'react';
import { withUser } from '../components/Auth/withUser';

const Home = (props) => {
	const { context } = props;
	return (
		<div style={{ marginTop: '300px', textAlign: 'center' }}>
			<h1>HOMEPAGE DE LA MORT</h1>
			{context.isLoggedIn && <h1>OUIIIIIIII</h1>}
		</div>
	);
};

export default withUser(Home);
