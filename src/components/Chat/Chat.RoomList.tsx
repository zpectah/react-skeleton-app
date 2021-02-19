import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Radio, Badge } from 'antd';

import * as routes from '../../App/routes.json';

interface ChatRoomListProps {
	className?: string | Array<string>;
	rooms: Array<any>;
	chatUsers: Array<any>;
	roomId: number;
}

const ChatRoomList: React.FC<{} & ChatRoomListProps> = (props) => {
	const his = useHistory();
	const { className, rooms, chatUsers, roomId } = props;
	const [tmpRoom, setTmpRoom] = useState(roomId);

	return (
		<div className={['ChatRoomList', className].join(' ')}>
			<Radio.Group
				onChange={(e) => {
					setTmpRoom(e.target.value);
					his.push(`${routes.chat.pathRoom}/${e.target.value}`);
				}}
				value={roomId?.toString()}
				defaultValue={roomId?.toString()}
				style={{ marginBottom: 8 }}
			>
				{rooms.map((room, index) => {
					let users = [];
					chatUsers.map((user) => {
						if (user.room == room.id) users.push(user);
					});
					return (
						<Badge count={users.length}>
							<Radio.Button
								value={room.id.toString()}
								key={index}
								checked={room.id == tmpRoom}
							>
								{room.name}
							</Radio.Button>
						</Badge>
					);
				})}
			</Radio.Group>
		</div>
	);
};

export default ChatRoomList;
