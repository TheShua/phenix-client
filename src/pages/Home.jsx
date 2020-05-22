import React from 'react';
import { withUser } from '../components/Auth/withUser';
import '../css/home.css';

const Home = (props) => {
	// const { context } = props;
	return (
		<main>
			<section className="homepage">
				<h2>HOMEPAGE</h2>
				<img src="/temp/warriors.jpg" alt="" />
			</section>
		</main>
	);
};

export default withUser(Home);
