import React from 'react';

interface FormDefaultProps {
	className?: string | Array<string>;
}

const FormDefault: React.FC<{} & FormDefaultProps> = (props) => {
	return (
		<div className={['FormDefault', props.className].join(' ')}>
			FormDefault
		</div>
	);
};

export default FormDefault;
