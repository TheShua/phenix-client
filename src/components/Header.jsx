import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withUser } from '../components/Auth/withUser';
import Global from '../utils/global.json';
import SignInForm from './SignInForm';
import '../css/header.css';
import apiHandler from '../api/apiHandler';

const Header = (props) => {
	const { context } = props;

	const handleLogout = () => {
		apiHandler
			.logout()
			.then(() => context.removeUser())
			.catch((error) => console.log(error));
	};

	return (
		<header className="main-head">
			<div className="toggleMenu">
				{!context.isLoggedIn && (
					<React.Fragment>
						<Link to="/signup">
							<div className="picture">
								<h3>Sign in</h3>
							</div>
						</Link>
						<div className="subMenu">
							<SignInForm />
							No account yet ? <NavLink to="/signup">Sign Up</NavLink>
							<ul>
								<li>
									<NavLink to="/">Home</NavLink>
								</li>
							</ul>
						</div>
					</React.Fragment>
				)}

				{context.isLoggedIn && (
					<React.Fragment>
						<Link to="/">
							<div className="picture"></div>
						</Link>
						<div className="subMenu">
							<ul>
								<li>
									<NavLink to="/">Home</NavLink>
								</li>
								<li>
									<NavLink to="/tables">Tables</NavLink>
								</li>
								<li>
									<p onClick={handleLogout}>Logout</p>
								</li>
							</ul>
						</div>
					</React.Fragment>
				)}
			</div>
			<Link to="/">
				<h1>{Global.siteTitle}</h1>
			</Link>
		</header>
	);
};
export default withUser(Header);
