import React, { useState, useCallback, useEffect } from 'react';

interface DemoComponentProps {
	className?: string | Array<string>;
}

const DemoComponent: React.FC<{} & DemoComponentProps> = (props) => {
	return (
		<div className={['DemoComponent', props.className].join(' ')}>
			DemoComponent
		</div>
	);
};

export default DemoComponent;
