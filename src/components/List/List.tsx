import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { array } from 'javascript-es6-helpers';
import { Input, Table, Space, Button, Row, Col } from 'antd';

import addListKeys from '../../utils/addListKeys';
import ListDetail from './List.Detail';

interface ListProps {
	className?: string | Array<string>;
	items: Array<any>;
	detailId: number;
	detailPath: string;
	listPath: string;
}

const { Search } = Input;

const List: React.FC<{} & ListProps> = (props) => {
	const his = useHistory();
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
			setItemsFiltered(addListKeys(tmp));
		} else {
			let tmp = _.orderBy(items, [optionsState.orderBy], [optionsState.order]);
			setItemsFiltered(addListKeys(tmp));
		}
	}, [items, optionsState]);

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			console.log(
				`selectedRowKeys: ${selectedRowKeys}`,
				'selectedRows: ',
				selectedRows,
			);
		},
		getCheckboxProps: (record) => ({
			disabled: record.name === 'Disabled User',
			// Column configuration not to be checked
			title: record.title,
		}),
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<div style={{ width: detailId ? '50%' : '100%' }}>
				<div className={['List', className].join(' ')}>
					<div>
						<Search
							value={optionsState.search}
							onChange={(e) =>
								setOptionsState({ ...optionsState, search: e.target.value })
							}
							placeholder="Search in list"
							allowClear
						/>
					</div>
					<div>
						<Table
							columns={[
								{
									key: 'id',
									title: 'ID',
									dataIndex: 'id',
								},
								{
									key: 'title',
									title: 'Title',
									dataIndex: 'title',
								},
								{
									key: 'userId',
									title: 'User ID',
									dataIndex: 'userId',
								},
								{
									title: 'Action',
									key: 'action',
									render: (text, record) => (
										<Space size="middle">
											<Button
												onClick={(e) => {
													e.preventDefault();
													his.push(`${detailPath}/${record.id}`);
												}}
											>
												Detail
											</Button>
										</Space>
									),
								},
							]}
							dataSource={itemsFiltered}
							onRow={(record, rowIndex) => {
								return {
									onDoubleClick: (event) =>
										his.push(`${detailPath}/${record.id}`),
									onMouseEnter: (event) => {
										event.preventDefault();
										event.currentTarget.classList.add('is-hover');
									},
									onMouseLeave: (event) => {
										event.preventDefault();
										event.currentTarget.classList.remove('is-hover');
									},
								};
							}}
							rowSelection={{
								type: 'checkbox',
								...rowSelection,
							}}
							rowClassName={(record, index) =>
								[detailId == record.id ? 'is-selected' : ''].join(' ')
							}
							sticky={true}
							pagination={{ pageSize: 20 }}
						></Table>
					</div>
				</div>
			</div>
			{detailId && (
				<div style={{ width: '50%', position: 'relative' }}>
					<div style={{ position: 'sticky', top: 0 }}>
						<ListDetail items={items} detailId={detailId} listPath={listPath} />
					</div>
				</div>
			)}
		</div>
	);
};

export default List;
