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

	// useEffect(() => {
	// 	socket.on('chat message', (msg) => store.dispatch(addChatMessage(msg)));
	// 	socket.on('user register', (attr) => store.dispatch(addChatUser(attr)));
	//
	// 	return () => {
	// 		socket.off('chat message');
	// 		socket.off('user register');
	// 	};
	// }, []);

	useEffect(() => {
		socket.on('user register', (attr) => store.dispatch(addChatUser(attr)));
		socket.on('chat message', (msg) => store.dispatch(addChatMessage(msg)));

		return () => {
			socket.off('user register');
			socket.off('chat message');
		};
	}, []);

	useEffect(() => {
		socket.on('receive code', (payload) => {
			console.log('receive code', payload);
		});
	}, []);

	return (
		<div className={['Chat', className].join(' ')}>
			<ChatRoomList rooms={rooms} />

			{rooms.map((room, index) => {
				if (roomId == room.id)
					return (
						<ChatRoom
							key={index}
							rooms={rooms}
							chatUsers={chatUsers}
							messages={messages}
							roomId={roomId}
							onRegister={(attr) => {
								console.log('onRegister', attr);
								socket.emit('register user', { ...attr, roomId: roomId });
							}}
							onMessageSubmit={(attr) => {
								console.log('onMessageSubmit', attr);
								socket.emit('chat message', { ...attr, roomId: roomId });
							}}
							onConnect={(id) => {
								socket.emit('enter room', { room: id });
							}}
							onLeave={(id) => {
								console.log('onLeave', id);
								socket.emit('leave room', {
									room: id,
								});
							}}
							onTyping={(attr) => {
								console.log('onTyping', attr);
								socket.emit('coding event', {
									room: roomId,
									newCode: attr,
								});
							}}
						/>
					);
			})}
		</div>
	);
};

export default Chat;
