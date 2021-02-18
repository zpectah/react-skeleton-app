import React, { useState, useCallback, useEffect } from 'react';

interface __Props {
	className?: string | Array<string>;
}

const __: React.FC<{} & __Props> = (props) => {
	return <div className={['__', props.className].join(' ')}>DemoComponent</div>;
};

export default __;
