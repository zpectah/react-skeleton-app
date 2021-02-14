import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import * as routes from '../../App/routes.json';

interface NavbarProps {
	className?: string | Array<string>;
}

const Navbar: React.FC<{} & NavbarProps> = (props) => {
	const { t } = useTranslation();
	const { className } = props;
	const navItems = [
		{
			path: routes.dashboard.path,
			label: t('page:dashboard.nav'),
		},
		{
			path: routes.list.path,
			label: t('page:list.nav'),
		},
		{
			path: routes.form.path,
			label: t('page:form.nav'),
		},
		{
			path: routes.chat.path,
			label: t('page:chat.nav'),
		},
	];

	return (
		<nav className={['Navbar', className].join(' ')}>
			<ul>
				{navItems.map((item, index) => (
					<li key={index}>
						<NavLink to={item.path} activeClassName="is-active" exact>
							{item.label}
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navbar;
