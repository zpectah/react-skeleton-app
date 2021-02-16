import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../App/routes.json';

interface ChatRoomListProps {
	className?: string | Array<string>;
	rooms: Array<any>;
}

const ChatRoomList: React.FC<{} & ChatRoomListProps> = (props) => {
	const { className, rooms } = props;

	return (
		<div className={['ChatRoomList', className].join(' ')}>
			{rooms.map((room, index) => (
				<Link to={`${routes.chat.pathRoom}/${room.id}`} key={index}>
					{room.name}
				</Link>
			))}
		</div>
	);
};

export default ChatRoomList;
