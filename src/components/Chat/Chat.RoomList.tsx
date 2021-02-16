import React from 'react';
import { NavLink } from 'react-router-dom';

import * as routes from '../../App/routes.json';

interface ChatRoomListProps {
	className?: string | Array<string>;
	rooms: Array<any>;
	chatUsers: Array<any>;
	roomId: number;
}

const ChatRoomList: React.FC<{} & ChatRoomListProps> = (props) => {
	const { className, rooms, chatUsers, roomId } = props;

	return (
		<div className={['ChatRoomList', className].join(' ')}>
			{rooms.map((room, index) => {
				let users = [];
				chatUsers.map((user) => {
					if (user.room == room.id) users.push(user);
				});

				return (
					<NavLink
						to={`${routes.chat.pathRoom}/${room.id}`}
						key={index}
						activeClassName="is-active"
						exact
					>
						{room.name} <small>({users.length})</small>
					</NavLink>
				);
			})}
		</div>
	);
};

export default ChatRoomList;
