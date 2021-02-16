import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import store from '../../store';
import { addChatMessage, addChatUser, removeChatUser } from '../../actions';
import ChatRoomList from './Chat.RoomList';
import ChatRoom from './Chat.Room';

interface ChatProps {
	className?: string | Array<string>;
	messages: Array<any>;
	chatUsers: Array<any>;
	rooms: Array<any>;
	roomId: number;
}

const Chat: React.FC<{} & ChatProps> = (props) => {
	const socket = io('http://localhost:5000', { transports: ['websocket'] });
	const { className, messages, chatUsers, rooms, roomId } = props;

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
			<ChatRoomList rooms={rooms} />
			{roomId && (
				<ChatRoom
					rooms={rooms}
					chatUsers={chatUsers}
					messages={messages}
					roomId={roomId}
					onRegister={(attr) => {
						console.log('onRegister', attr);
					}}
					onMessageSubmit={(attr) => {
						console.log('onMessageSubmit', attr);
					}}
					onLeave={(attr) => {
						console.log('onLeave', attr);
					}}
				/>
			)}
		</div>
	);
};

export default Chat;
