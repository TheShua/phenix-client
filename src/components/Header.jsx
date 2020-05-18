import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withUser } from '../components/Auth/withUser';
import Global from '../utils/global.json';
import SignInForm from './Forms/SignInForm';
import UserContext from './Auth/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHouseUser,
	faScroll,
	faUsers,
	faPowerOff,
	faHome,
	faEnvelope,
	faEnvelopeOpenText,
	faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import apiHandler from '../api/apiHandler';
import '../css/header.css';

class Header extends React.Component {
	static contextType = UserContext;
	state = {
		toggle: false,
		newPM: false,
	};

	componentDidMount = () => {
		if (this.context.user) this.checkNewPM();
	};

	handleLogout = () => {
		apiHandler
			.logout()
			.then(() => this.context.removeUser())
			.catch((error) => console.log(error));
	};

	toggleSubMenu = () => {
		this.setState({ toggle: !this.state.toggle });
	};

	checkNewPM = () => {
		apiHandler
			.getMyMessages(this.context.user_id, 'unread')
			.then((APIResult) => {})
			.catch((APIError) => console.log(APIError));
	};

	render() {
		return (
			<React.Fragment>
				<header className="main-head">
					<div className="toggleMenu">
						{!this.context.isLoggedIn && (
							<React.Fragment>
								<div className="picture" onClick={this.toggleSubMenu}>
									<h3>Sign in</h3>
								</div>
							</React.Fragment>
						)}

						{this.context.isLoggedIn && (
							<React.Fragment>
								<div className="picture" onClick={this.toggleSubMenu}>
									<img src={this.context.user.avatar} alt="ee" />
								</div>
							</React.Fragment>
						)}
					</div>
					<Link to="/">
						<h1>{Global.siteTitle}</h1>
					</Link>
				</header>
				<div className={this.state.toggle ? 'subMenu toggle' : 'subMenu'}>
					{!this.context.isLoggedIn && (
						<React.Fragment>
							<SignInForm />
							No account yet ? <NavLink to="/signup">Sign Up</NavLink>
							<ul>
								<NavLink to="/" className="separator">
									<li>
										<FontAwesomeIcon icon={faHome} />
										Home
									</li>
								</NavLink>
							</ul>
						</React.Fragment>
					)}

					{this.context.isLoggedIn && (
						<React.Fragment>
							<ul>
								<NavLink to="/dashboard">
									<li>
										<div>
											<FontAwesomeIcon icon={faHouseUser} />
										</div>
										<span>Dashboard</span>
									</li>
								</NavLink>
								<NavLink to="/profile">
									<li>
										<div>
											<FontAwesomeIcon icon={faUserCircle} />
										</div>
										<span>Profile</span>
									</li>
								</NavLink>
								<NavLink to="/mailbox">
									<li>
										<div>
											{this.state.newPM ? (
												<FontAwesomeIcon icon={faEnvelopeOpenText} />
											) : (
												<FontAwesomeIcon icon={faEnvelope} />
											)}
										</div>
										Mailbox
									</li>
								</NavLink>
								<NavLink to="/characters" className="separator">
									<li>
										<div>
											<FontAwesomeIcon icon={faScroll} />
										</div>
										Characters
									</li>
								</NavLink>
								<NavLink to="/tables">
									<li>
										<div>
											<FontAwesomeIcon icon={faUsers} />
										</div>
										Tables
									</li>
								</NavLink>
								<li onClick={this.handleLogout} className="link separator">
									<div>
										<FontAwesomeIcon icon={faPowerOff} />
									</div>
									Logout
								</li>
							</ul>
						</React.Fragment>
					)}
				</div>
			</React.Fragment>
		);
	}
}
export default withUser(Header);
