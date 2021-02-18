import React, { useState, useEffect } from 'react';
import { Card, Typography, Tag } from 'antd';

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
	online: true | false;
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
		online,
	} = props;
	const [roomUsers, setRoomUsers] = useState([]);

	useEffect(() => onConnect(roomId), []);

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
		<Card
			className={['ChatRoom', className].join(' ')}
			title={
				<Typography.Title level={3}>
					ChatRoom #{roomId}{' '}
					<Tag color={roomUsers.length > 0 ? 'success' : 'error'}>
						{roomUsers.length}
					</Tag>
				</Typography.Title>
			}
		>
			<ChatClient
				onRegister={(attr) => onRegister(attr)}
				onMessageSubmit={(attr) => onMessageSubmit(attr)}
				onLeave={(attr) => onLeave(attr)}
				online={online}
			/>
			<hr />
			<div>
				{messages.map((msg, index) => {
					if (msg.room === roomId)
						return (
							<div key={index}>
								{msg.nickname}: {msg.message}
							</div>
						);
				})}
			</div>
		</Card>
	);
};

export default ChatRoom;
