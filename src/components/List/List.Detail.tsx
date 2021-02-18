import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { Card, Button } from 'antd';

interface ListDetailProps {
	className?: string | Array<string>;
	items: Array<any>;
	detailId: number;
	listPath: string;
}

const ListDetail: React.FC<{} & ListDetailProps> = (props) => {
	const his = useHistory();
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
				<Card className={['ListDetail', props.className].join(' ')}>
					<Button
						onClick={(e) => {
							e.preventDefault();
							his.push(listPath);
						}}
					>
						Close detail
					</Button>
					<br />
					<div>
						<h2>{detail.title}</h2>
						<p>{detail.body}</p>
					</div>
				</Card>
			)}
		</>
	);
};

export default ListDetail;
