import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

interface ListDetailProps {
	className?: string | Array<string>;
	items: Array<any>;
	detailId: number;
	listPath: string;
}

const ListDetail: React.FC<{} & ListDetailProps> = (props) => {
	const { items, detailId, listPath } = props;
	const [active, setActive] = useState<true | false>(false);
	const [detail, setDetail] = useState(null);

	useEffect(() => {
		setActive(!!(detailId && items));
	}, [detailId, items]);

	useEffect(() => {
		if (active) {
			let _detail = _.find(items, (item) => {
				if (item.id == detailId) return item;
			});
			setDetail(_detail);
		}
	}, [detailId, items, active]);

	return (
		<>
			{active && detail && (
				<div className={['ListDetail', props.className].join(' ')}>
					<Link to={listPath}>Close detail</Link>
					<br />
					<div>
						<h2>{detail.title}</h2>
						<p>{detail.body}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default ListDetail;
