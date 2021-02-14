import React from 'react';

interface DashboardProps {
	className?: string | Array<string>;
}

const Dashboard: React.FC<{} & DashboardProps> = (props) => {
	const { className } = props;

	return (
		<div className={['Dashboard', className].join(' ')}>
			Dashboard Component
			<br />
		</div>
	);
};

export default Dashboard;
