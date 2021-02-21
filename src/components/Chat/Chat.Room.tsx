import React, { useState, useEffect } from 'react';
import { Card, Typography, Tag, Divider, Input } from 'antd';

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
	const { TextArea } = Input;

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

	const renderMessages = () => {
		let string = '';

		messages.map((msg) => {
			let firstMsg = string.length > 0 ? string + '\n' : '';
			if (msg.room === roomId)
				return (string = firstMsg + `${msg.nickname}: ${msg.message}`);
		});

		return string;
	};

	return (
		<>
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
				<TextArea value={renderMessages()} rows={10} readOnly />
				<ChatClient
					onRegister={(attr) => onRegister(attr)}
					onMessageSubmit={(attr) => onMessageSubmit(attr)}
					onLeave={(attr) => onLeave(attr)}
					online={online}
				/>
			</Card>
		</>
	);
};

export default ChatRoom;
