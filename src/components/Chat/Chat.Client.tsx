import React, { useState, useEffect } from 'react';

import useUnload from '../../utils/useUnload';

interface ChatClientProps {
	className?: string | Array<string>;
	onMessageSubmit: Function;
	onRegister: Function;
	onLeave: Function;
	online: true | false;
}

const tmp = {
	nickname: '',
};

const ChatClient: React.FC<{} & ChatClientProps> = (props) => {
	const { className, onMessageSubmit, onRegister, onLeave, online } = props;
	const [clientState, setClientState] = useState<any>({
		id: '',
		nickname: '',
	});
	const [registered, setRegistered] = useState<true | false>(false);
	const [message, setMessage] = useState<string>('');

	useEffect(() => {
		return () => onLeave(tmp);
	}, []);

	useUnload((e) => {
		e.preventDefault();
		onLeave(tmp);
	});

	return (
		<div className={['ChatClient', className].join(' ')}>
			<div>
				<input
					type="text"
					value={clientState.nickname}
					onChange={(e) => {
						setClientState({ ...clientState, nickname: e.target.value });
						tmp.nickname = e.target.value;
					}}
					placeholder="Your nickname"
					disabled={registered}
					readOnly={registered}
				/>
				<button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						setRegistered(true);
						onRegister(clientState);
					}}
					disabled={registered || !online}
				>
					Register user
				</button>
			</div>
			<br />
			{registered && (
				<div>
					<textarea
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
						placeholder="Your message"
					></textarea>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							onMessageSubmit({
								nickname: clientState.nickname,
								message: message,
							});
							setMessage('');
						}}
						disabled={!online}
					>
						Submit message
					</button>
				</div>
			)}
		</div>
	);
};

export default ChatClient;
