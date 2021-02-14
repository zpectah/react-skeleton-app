import React from 'react';

import cfg from '../../config';

interface FooterProps {
	className?: string | Array<string>;
}

const Footer: React.FC<{} & FooterProps> = (props) => {
	return (
		<footer className={['Footer', props.className].join(' ')}>
			<p>
				<small>&copy; 2021 | {cfg.meta.title}</small>
			</p>
		</footer>
	);
};

export default Footer;
