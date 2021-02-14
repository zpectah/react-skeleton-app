import React from 'react';

interface ToastsProps {
	className?: string | Array<string>;
}

const Toasts: React.FC<{} & ToastsProps> = (props) => {
	return <div className={['Toasts', props.className].join(' ')}>Toasts</div>;
};

export default Toasts;
