import React, { useState, useEffect } from 'react';

interface ChatClientProps {
	className?: string | Array<string>;
	onMessageSubmit: Function;
	onRegister: Function;
	onLeave: Function;
}

const tmp = {
	nickname: '',
};

const ChatClient: React.FC<{} & ChatClientProps> = (props) => {
	const [clientState, setClientState] = useState<any>({
		id: '',
		nickname: '',
	});
	const [registered, setRegistered] = useState<true | false>(false);
	const [message, setMessage] = useState<string>('');
	const { className, onMessageSubmit, onRegister, onLeave } = props;

	useEffect(() => {
		window.addEventListener('unload', onLeave(tmp)); // TODO: Need to test
		return () => onLeave(tmp);
	}, []);

	return (
		<div className={['ChatClient', className].join(' ')}>
			ChatClient
			<br />
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
					disabled={registered}
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
					>
						Submit message
					</button>
				</div>
			)}
		</div>
	);
};

export default ChatClient;
