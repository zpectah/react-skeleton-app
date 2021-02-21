import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Button } from 'antd';

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
	const { TextArea } = Input;

	useEffect(() => {
		return () => onLeave(tmp);
	}, []);

	useUnload((e) => {
		e.preventDefault();
		onLeave(tmp);
	});

	return (
		<div className={['ChatClient', className].join(' ')}>
			<Row>
				<Col>
					<Input
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
				</Col>
				<Col>
					<Button
						type="primary"
						onClick={(e) => {
							e.preventDefault();
							setRegistered(true);
							onRegister(clientState);
						}}
						disabled={registered || !online}
					>
						Register user
					</Button>
				</Col>
			</Row>
			<br />
			{registered && (
				<div>
					<div>
						<TextArea
							value={message}
							onChange={(e) => {
								setMessage(e.target.value);
							}}
							placeholder="Your message"
							rows={4}
						></TextArea>
					</div>
					<div>
						<Button
							type="primary"
							onClick={(e) => {
								e.preventDefault();
								onMessageSubmit({
									nickname: clientState.nickname,
									message: message,
								});
								setMessage('');
							}}
							disabled={!online || message.length < 3}
						>
							Submit message
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatClient;
