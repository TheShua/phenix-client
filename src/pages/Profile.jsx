import React, { useState } from 'react';
import { withUser } from '../components/Auth/withUser';
import FormElement from '../components/Helpers/FormElement';
import Joi from '@hapi/joi';
import '../css/Profile.css';
import apiHandler from '../api/apiHandler';

const Profile = (props) => {
	let user = { ...props.context.user };
	const [editedUser, setEditedUser] = useState({
		name: user.name,
		email: user.email,
		avatar: null,
		tempAvatar: null,
	});
	const [feedBack, setFeedBack] = useState(null);

	const handleChange = (event) => {
		const value =
			event.target.type === 'file'
				? event.target.files[0]
				: event.target.type === 'checkbox'
				? event.target.checked
				: event.target.value;
		const key = event.target.name;
		if (event.target.type === 'file') {
			if (!value) return;
			let objURL = URL.createObjectURL(value);
			setEditedUser({ ...editedUser, tempAvatar: objURL, [key]: value });
		} else {
			setEditedUser({ ...editedUser, [key]: value });
		}
	};

	const schema = Joi.object({
		name: Joi.string().alphanum().min(3).max(30).required().messages({
			'string.base': `Your name must be a text`,
			'string.empty': `Your name cannot be an empty field`,
			'string.min': `Your name should have a minimum of {#limit} characters`,
			'string.max': `Your name should have a maximum of {#limit} characters`,
			'any.required': `Name is a required field`,
		}),
		email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required().messages({
			'string.email': 'Your email is not a valid one',
			'string.empty': `Your email cannot be an empty field`,
		}),
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		let submittedUser = {
			name: editedUser.name,
			password: editedUser.password,
			email: editedUser.email,
		};
		if (!submittedUser.password) delete submittedUser.password;
		const { error } = schema.validate(submittedUser);
		if (editedUser.avatar) submittedUser.avatar = editedUser.avatar;
		if (!error) {
			let form = new FormData();
			for (const elem in submittedUser) {
				form.append(elem, submittedUser[elem]);
			}

			apiHandler
				.updateProfile(user._id, form)
				.then((APIResult) => {
					props.context.setUser(APIResult);
					setFeedBack('Your profile has been successfully edited !');
				})
				.catch((APIError) => console.log(APIError));
		} else {
			setFeedBack(error.details);
		}
	};

	const showFeedBack = () => {
		if (Array.isArray(feedBack)) {
			return (
				<ul className="feedbacks">
					{feedBack.map((feed, index) => {
						return <li key={index}>{feed.message}</li>;
					})}
				</ul>
			);
		} else {
			return <p className="feedbacks">{feedBack}</p>;
		}
	};

	const deleteAccount = (event) => {
		event.preventDefault();
		console.log('Delete account');
	};

	return (
		<main>
			<section className="edit-profile">
				<h2>Profile</h2>
				{feedBack && showFeedBack()}
				<form autoComplete="off" className="main" method="post" onSubmit={handleSubmit}>
					<label htmlFor="avatar" className="avatar">
						<img src={editedUser.tempAvatar ? editedUser.tempAvatar : user.avatar} alt="Avatar" className="avatar" />
					</label>
					<input type="file" onChange={handleChange} style={{ display: 'none' }} id="avatar" name="avatar" />
					<div className="right">
						<FormElement label="Name" name="name" change={handleChange} value={editedUser.name} />
						<FormElement
							label="Password"
							type="password"
							name="password"
							change={handleChange}
							value={editedUser.password}
						/>
						<FormElement label="Email" name="email" type="email" change={handleChange} value={editedUser.email} />
						<div className="buttons">
							<button>Edit my profile</button>
							<button className="red" onClick={deleteAccount}>
								Delete my account
							</button>
						</div>
					</div>
				</form>
			</section>
		</main>
	);
};

export default withUser(Profile);
