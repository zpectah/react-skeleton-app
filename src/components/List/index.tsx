import React, { useState, useCallback, useEffect } from 'react';

interface ListProps {
	className?: string | Array<string>;
}

const List: React.FC<{} & ListProps> = (props) => {
	return (
		<div className={['List', props.className].join(' ')}>
			List
		</div>
	);
};

export default List;
