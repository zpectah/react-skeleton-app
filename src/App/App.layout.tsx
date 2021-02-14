import React from 'react';
import Helmet from 'react-helmet';

import cfg from '../config';

import Header from '../view/shared/Header';
import Footer from '../view/shared/Footer';
import Toasts from '../view/shared/Toasts';

interface AppLayoutProps {
	className?: string | Array<string>;
	withoutHeader?: true | false;
	withoutFooter?: true | false;
	withoutToasts?: true | false;
	metaTitle?: string;
	metaDescription?: string;
	route: object;
}

const AppLayout: React.FC<{} & AppLayoutProps> = (props) => {
	const {
		children,
		className,
		withoutHeader,
		withoutFooter,
		withoutToasts,
		metaTitle,
		metaDescription,
		route,
	} = props;

	return (
		<>
			<Helmet>
				<title>
					{metaTitle ? `${metaTitle} | ${cfg.meta.title}` : cfg.meta.title}
				</title>
				{metaDescription && (
					<meta name="description" content={metaDescription} />
				)}
			</Helmet>
			<div className={['View', className].join(' ')}>
				{!withoutHeader && <Header />}
				<main className="Main">{children}</main>
				{!withoutFooter && <Footer />}
				{!withoutToasts && <Toasts />}
			</div>
		</>
	);
};

export default AppLayout;
