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
// import io from 'socket.io-client';
import apiHandler from '../api/apiHandler';
import '../css/header.css';

class Header extends React.Component {
	static contextType = UserContext;
	state = {
		toggle: false,
		newPM: false,
	};

	componentDidMount = () => {
		if (this.context.isLoggedIn) this.checkNewPM();
		// const socket = io(process.env.REACT_APP_BACKEND_URL);
		// socket.on('message', (col) => {
		// 	console.log('message : ' + col);
		// });
	};

	handleLogout = () => {
		apiHandler
			.logout()
			.then(() => this.context.removeUser())
			.catch((error) => console.log(error));
	};

	toggleSubMenu = () => {
		this.setState({ toggle: !this.state.toggle });
		this.checkNewPM();
	};

	checkNewPM = () => {
		if (!this.context.user) return;
		apiHandler
			.getMyMessages(this.context.user._id, 'unread')
			.then((APIResult) => {
				console.log(APIResult);
				this.setState({ newPM: APIResult.length });
			})
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
										Dashboard
									</li>
								</NavLink>
								<NavLink to="/profile">
									<li>
										<div>
											<FontAwesomeIcon icon={faUserCircle} />
										</div>
										Profile
									</li>
								</NavLink>
								<NavLink to="/mailbox">
									<li>
										{this.state.newPM ? (
											<React.Fragment>
												<div>
													<span>
														<FontAwesomeIcon icon={faEnvelope} />
													</span>
												</div>
												Mailbox (<span>{this.state.newPM}</span>)
											</React.Fragment>
										) : (
											<React.Fragment>
												<div>
													<FontAwesomeIcon icon={faEnvelopeOpenText} />
												</div>
												Mailbox
											</React.Fragment>
										)}
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
