import React, { useState, useCallback, useEffect } from 'react';

interface DashboardProps {
	className?: string | Array<string>;
}

const Dashboard: React.FC<{} & DashboardProps> = (props) => {
	return (
		<div className={['Dashboard', props.className].join(' ')}>
			Dashboard Component
		</div>
	);
};

export default Dashboard;
