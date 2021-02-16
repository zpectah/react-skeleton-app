import React, { useState, useCallback, useEffect } from 'react';

import ChatClient from './Chat.Client';

interface ChatRoomProps {
	className?: string | Array<string>;
	rooms: Array<any>;
	chatUsers: Array<any>;
	messages: Array<any>;
	roomId: number;
	onRegister: Function;
	onMessageSubmit: Function;
	onConnect: Function;
	onLeave: Function;
}

const ChatRoom: React.FC<{} & ChatRoomProps> = (props) => {
	const [roomUsers, setRoomUsers] = useState([]);
	const {
		className,
		roomId,
		onMessageSubmit,
		onRegister,
		chatUsers,
		messages,
		onConnect,
		onLeave,
	} = props;

	useEffect(() => {
		onConnect(roomId);
		return () => onLeave(roomId);
	}, []);

	useEffect(() => {
		if (chatUsers) {
			let tmp = [];

			chatUsers.map((user) => {
				if (user.room == roomId) tmp.push(user);
			});

			setRoomUsers(tmp);
		}
	}, [chatUsers]);

	return (
		<div className={['ChatRoom', className].join(' ')}>
			ChatRoom #{roomId} : {roomUsers.length}
			<br />
			<ChatClient
				onRegister={(attr) => onRegister(attr)}
				onMessageSubmit={(attr) => onMessageSubmit(attr)}
				onLeave={(attr) => onLeave(attr)}
			/>
			<hr />
			<div>
				{messages.map((msg, index) => {
					if (msg.room == roomId)
						return (
							<div key={index}>
								{msg.nickname}: {msg.message}
							</div>
						);
				})}
			</div>
		</div>
	);
};

export default ChatRoom;
