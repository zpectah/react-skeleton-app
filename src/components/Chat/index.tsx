import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import store from '../../store';
import { addChatMessage, addChatUser, removeChatUser } from '../../actions';

interface ChatProps {
	className?: string | Array<string>;
	messages: Array<any>;
	chatUsers: Array<any>;
}

const Chat: React.FC<{} & ChatProps> = (props) => {
	const socket = io('http://localhost:5000', { transports: ['websocket'] });
	const { className, messages, chatUsers } = props;
	const [nickname, setNickname] = useState('');
	const [message, setMessage] = useState('');
	const [logged, setLogged] = useState<true | false>(false);

	useEffect(() => {
		socket.on('chat message', (msg) => store.dispatch(addChatMessage(msg)));
		socket.on('user register', (attr) => store.dispatch(addChatUser(attr)));

		return () => {
			socket.off('chat message');
			socket.off('user register');
		};
	}, []);

	return (
		<div className={['Chat', className].join(' ')}>
			Chat Component
			<br />
			<div>
				<input
					type="text"
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					disabled={logged}
				/>
				<br />
				<button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						setLogged(true);
						socket.emit('user register', { nickname });
					}}
					disabled={nickname.length < 3 || logged}
				>
					Open chat
				</button>
			</div>
			{logged && (
				<div>
					<textarea
						onChange={(e) => setMessage(e.target.value)}
						value={message}
					></textarea>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							socket.emit('chat message', { nickname, message });
							setMessage('');
						}}
					>
						Submit message
					</button>
					<br />
				</div>
			)}
			<div>Users: {chatUsers.length}</div>
			<hr />
			<div>
				{messages.map((msg, index) => (
					<div key={index}>
						{msg.nickname}: {msg.message}
					</div>
				))}
			</div>
		</div>
	);
};

export default Chat;
