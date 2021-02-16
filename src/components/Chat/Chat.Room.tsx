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
	onTyping: Function;
}

const ChatRoom: React.FC<{} & ChatRoomProps> = (props) => {
	const {
		className,
		roomId,
		onMessageSubmit,
		onRegister,
		chatUsers,
		messages,
		onConnect,
		onLeave,
		onTyping,
	} = props;

	useEffect(() => {
		onConnect(roomId);
		return () => onLeave(roomId);
	}, []);

	return (
		<div className={['ChatRoom', className].join(' ')}>
			ChatRoom #{roomId} : {chatUsers.length}
			<br />
			<ChatClient
				onRegister={(attr) => onRegister(attr)}
				onMessageSubmit={(attr) => onMessageSubmit(attr)}
				onTyping={(attr) => onTyping(attr)}
			/>
			<hr />
			<div>
				{messages.map((msg, index) => {
					if (msg.roomId == roomId)
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
