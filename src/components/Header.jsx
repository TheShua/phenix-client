import React from 'react';
import { Link } from 'react-router-dom';
import { getTitle } from '../utils/global';
import '../css/header.css';

const Header = () => {
	return (
		<header className="main-head">
			<div className="toggleMenu">
				<div class="picture">
					<Link to="/signup">
						<h3>Sign in</h3>
					</Link>
				</div>
			</div>
			<h1>{getTitle()}</h1>
		</header>
	);
};
export default Header;
