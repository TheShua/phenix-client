import React, { useState, useEffect } from 'react';
import { withUser } from './Auth/withUser';
import ConfirmDateForm from './Forms/ConfirmDateForm';
import Loader from './Loader';
import apiHandler from '../api/apiHandler';

const Aside = ({ context }) => {
	const [isLoading, setLoading] = useState(true);
	const [nextSessions, setNextSessions] = useState([]);
	const [messages, setMessages] = useState([]);
	const [showConfirm, setShowConfirm] = useState(null);

	useEffect(() => {
		apiHandler
			.getAllMyNextSessions(context.user._id)
			.then(async (sessionRes) => {
				await setNextSessions(sessionRes.next);
				await setMessages(sessionRes.messages);
				setLoading(false);
			})
			.catch((sessionErr) => console.log(sessionErr));
	}, [context]);

	const handleChangeDates = (message) => {
		setShowConfirm(message);
	};

	const closeConfirmDate = () => {
		setShowConfirm(null);
	};

	if (isLoading) return <Loader />;
	else {
		return (
			<aside className="sidebar">
				{showConfirm && <ConfirmDateForm data={showConfirm} close={closeConfirmDate} />}
				<article className="bloc">
					<div className="head">
						<h3>Next sessions</h3>
					</div>
					{nextSessions.map((session, index) => {
						let m = messages.find((x) => x.sessionCheck === session._id);
						if (!session.suggestions.length) {
							return <React.Fragment key={index}>{session.table_id.name}</React.Fragment>;
						} else {
							return (
								<React.Fragment key={index}>
									<h4>{session.table_id.name}</h4>
									<button onClick={() => handleChangeDates(m)}>Check</button>
								</React.Fragment>
							);
						}
					})}
				</article>
			</aside>
		);
	}
};

export default withUser(Aside);
