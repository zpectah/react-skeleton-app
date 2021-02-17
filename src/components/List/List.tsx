import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { array } from 'javascript-es6-helpers';

import ListDetail from './List.Detail';

interface ListProps {
	className?: string | Array<string>;
	items: Array<any>;
	detailId: number;
	detailPath: string;
	listPath: string;
}

const List: React.FC<{} & ListProps> = (props) => {
	const { className, items, detailId, detailPath, listPath } = props;
	const [optionsState, setOptionsState] = useState({
		search: '',
		orderBy: 'id',
		order: 'desc',
	});
	const [itemsFiltered, setItemsFiltered] = useState<Array<any>>([]);
	const [itemsSelected, setItemsSelected] = useState<Array<any>>([]);

	useEffect(() => {
		if (optionsState.search.length >= 4) {
			let tmp = array.search(items, ['title'], optionsState.search);
			tmp = _.orderBy(tmp, [optionsState.orderBy], [optionsState.order]);
			setItemsFiltered(tmp);
		} else {
			let tmp = _.orderBy(items, [optionsState.orderBy], [optionsState.order]);
			setItemsFiltered(tmp);
		}
	}, [items, optionsState]);

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<div style={{ width: '50%' }}>
				<div className={['List', className].join(' ')}>
					<div>
						options:
						<br />
						<input
							type="search"
							value={optionsState.search}
							onChange={(e) =>
								setOptionsState({ ...optionsState, search: e.target.value })
							}
							placeholder="Search in list"
						/>
					</div>
					<div>
						<table className="List-table" style={{ width: '100%' }}>
							<thead>
								<tr>
									<th>select</th>
									<th>id</th>
									<th>title</th>
									<th>action</th>
								</tr>
							</thead>
							<tbody>
								{itemsFiltered.map((item, index) => (
									<tr
										key={index}
										className={[detailId == item.id ? 'is-active' : ''].join(
											' ',
										)}
									>
										<td>check</td>
										<th>{item.id}</th>
										<td>{item.title}</td>
										<td>
											<Link to={`${detailPath}/${item.id}`}>Detail</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div style={{ width: '50%', position: 'relative' }}>
				<div style={{ position: 'sticky', top: 0 }}>
					<ListDetail items={items} detailId={detailId} listPath={listPath} />
				</div>
			</div>
		</div>
	);
};

export default List;
