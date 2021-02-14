import React from 'react';

import Navbar from './Navbar';

interface HeaderProps {
	className?: string | Array<string>;
}

const Header: React.FC<{} & HeaderProps> = (props) => {
	const { className } = props;

	return (
		<header className={['Header', className].join(' ')}>
			<Navbar />
		</header>
	);
};

export default Header;
