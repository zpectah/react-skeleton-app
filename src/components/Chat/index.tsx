import React, { useState, useCallback, useEffect } from 'react';

// see: https://chaewonkong.github.io/posts/socket-io.html
import { io } from 'socket.io-client';

interface ChatProps {
	className?: string | Array<string>;
}

const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Chat: React.FC<{} & ChatProps> = (props) => {
	const { className } = props;

	const [newMsg, setMsg] = useState('');
	const [messages, setMessages] = useState([]);
	const [nickname, setNickname] = useState('');

	useEffect(() => {
		console.log(messages);
		console.log(socket);

		socket.on('chat message', (msg) => {
			let na = [...messages];
			na.push(msg);

			console.log(socket);

			setMessages(na);
		});

		return () => {};
	}, [socket]);

	return (
		<div className={['Dashboard', className].join(' ')}>
			Chat Component
			<br />
			<input
				type="text"
				value={nickname}
				onChange={(e) => setNickname(e.target.value)}
			/>
			<br />
			<textarea
				onChange={(e) => setMsg(e.target.value)}
				value={newMsg}
			></textarea>
			<button
				type="button"
				onClick={(e) => {
					e.preventDefault();
					socket.emit('chat message', { nickname, newMsg });
					setMsg('');
				}}
			>
				Submit message
			</button>
			<br />
			<div>
				{messages.map((msg, index) => (
					<div key={index}>
						{msg.nickname}: {msg.msg}
					</div>
				))}
			</div>
		</div>
	);
};

export default Chat;
