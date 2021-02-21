import React, { useEffect, useLayoutEffect, useState } from 'react';
import { io } from 'socket.io-client';

import store from '../../store';
import { addChatMessage, addChatUser, removeChatUser } from '../../actions';
import ChatRoomList from './Chat.RoomList';
import ChatRoom from './Chat.Room';
import { Card, Divider } from 'antd';

interface ChatProps {
	className?: string | Array<string>;
	messages: Array<any>;
	chatUsers: Array<any>;
	rooms: Array<any>;
	roomId: number;
	onOnline: Function;
}

const Chat: React.FC<{} & ChatProps> = (props) => {
	const socket = io('http://localhost:5000', { transports: ['websocket'] });
	const { className, messages, chatUsers, rooms, roomId, onOnline } = props;
	const [online, setOnline] = useState<true | false>(false);

	useLayoutEffect(() => {
		socket.on('connect', () => {
			setOnline(socket.connected);
		});
		socket.on('disconnect', () => {
			setOnline(false);
		});

		return () => setOnline(false);
	}, [rooms]);

	useEffect(() => {
		if (online) {
			socket.on('user register', (attr) => store.dispatch(addChatUser(attr)));
			socket.on('chat message', (msg) => store.dispatch(addChatMessage(msg)));
			socket.on('user left', (nickname) =>
				store.dispatch(removeChatUser(nickname)),
			);

			return () => {
				socket.off('user register');
				socket.off('chat message');
				socket.off('user left');
			};
		}
	}, [online]);

	useEffect(() => {
		if (online) {
			onOnline(true);
		} else {
			onOnline(false);
		}
	}, [online]);

	return (
		<div className={['Chat', className].join(' ')}>
			<Card>
				<ChatRoomList rooms={rooms} chatUsers={chatUsers} roomId={roomId} />
			</Card>
			<Divider />
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
								if (online)
									socket.emit('register user', { ...attr, room: roomId });
							}}
							onMessageSubmit={(attr) => {
								if (online)
									socket.emit('chat message', { ...attr, room: roomId });
							}}
							onConnect={(id) => {
								if (online) socket.emit('enter room', { room: id });
							}}
							onLeave={(attr) => {
								if (online)
									socket.emit('leave room', { ...attr, room: roomId });
							}}
							online={online}
						/>
					);
			})}
		</div>
	);
};

export default Chat;
