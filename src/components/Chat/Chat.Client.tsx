import React, { useState, useCallback, useEffect } from 'react';

interface ChatClientProps {
	className?: string | Array<string>;
	onMessageSubmit: Function;
	onRegister: Function;
	onTyping: Function;
}

const ChatClient: React.FC<{} & ChatClientProps> = (props) => {
	const [clientState, setClientState] = useState<any>({
		id: '',
		nickname: '',
	});
	const [registered, setRegistered] = useState<true | false>(false);
	const [message, setMessage] = useState<string>('');
	const { className, onMessageSubmit, onRegister, onTyping } = props;

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
					}}
					placeholder="Your nickname"
				/>
				<button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						setRegistered(true);
						onRegister(clientState);
					}}
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
							onTyping(e.target.value);
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
