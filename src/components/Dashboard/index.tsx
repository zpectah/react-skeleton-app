import React, { useState, useCallback, useEffect } from 'react';

// see: https://chaewonkong.github.io/posts/socket-io.html
import { io } from 'socket.io-client';

interface DashboardProps {
	className?: string | Array<string>;
}

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Dashboard: React.FC<{} & DashboardProps> = (props) => {
	const { className } = props;

	const [newMsg, setMsg] = useState('');
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		console.log(messages);

		socket.on('chat message', (msg) => {
			let na = [...messages];
			na.push(msg);

			setMessages(na);
		});

		return () => {};
	}, [socket]);

	return (
		<div className={['Dashboard', className].join(' ')}>
			Dashboard Component
			<br />
			<textarea onChange={(e) => setMsg(e.target.value)}></textarea>
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault();
					socket.emit('chat message', newMsg);
					setMsg('');
				}}
			>
				Submit message
			</button>
			<br />
			<div>
				{messages.map((msg, index) => (
					<div key={index}>
						{msg.id}: {msg.msg}
					</div>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
