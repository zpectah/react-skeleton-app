import React, { useState, useCallback, useEffect } from 'react';

interface DemoUiProps {
	className?: string | Array<string>;
}

const DemoUi: React.FC<{} & DemoUiProps> = (props) => {
	return <div className={['DemoUi', props.className].join(' ')}>DemoUi</div>;
};

export default DemoUi;
