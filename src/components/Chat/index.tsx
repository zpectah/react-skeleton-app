import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import store from '../../store';
import { addChatMessage } from '../../actions';

interface ChatProps {
	className?: string | Array<string>;
	messages: Array<any>;
}

// create Hook as useSocket !!!
const socket = io('http://localhost:5000', { transports: ['websocket'] });

const Chat: React.FC<{} & ChatProps> = (props) => {
	const { className, messages } = props;
	const [nickname, setNickname] = useState('');
	const [message, setMessage] = useState('');

	socket.on('chat message', (msg) => store.dispatch(addChatMessage(msg)));

	return (
		<div className={['Chat', className].join(' ')}>
			Chat Component
			<br />
			<input
				type="text"
				value={nickname}
				onChange={(e) => setNickname(e.target.value)}
			/>
			<br />
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
