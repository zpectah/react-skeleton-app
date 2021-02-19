import React from 'react';
import { List, Card, Statistic, Row, Col, Button, Divider } from 'antd';

interface DashboardProps {
	className?: string | Array<string>;
}

const Dashboard: React.FC<{} & DashboardProps> = (props) => {
	const { className } = props;

	const data = [
		{
			title: 'Title 1',
			content: `<p>Some HTML content</p>`,
		},
		{
			title: 'Title 2',
			content: `<p>Some HTML content</p>`,
		},
		{
			title: 'Title 3',
			content: `<p>Some HTML content</p>`,
		},
		{
			title: 'Title 4',
			content: `<p>Some HTML content</p>`,
		},
	];

	return (
		<div className={['Dashboard', className].join(' ')}>
			<div style={{ width: '100%' }}>
				<Card>
					<Row gutter={16}>
						<Col span={12}>
							<Statistic title="Active Users" value={112893} />
						</Col>
						<Col span={12}>
							<Statistic
								title="Account Balance (CNY)"
								value={112893}
								precision={2}
							/>
							<Button style={{ marginTop: 16 }} type="primary">
								Recharge
							</Button>
						</Col>
						<Col span={12}>
							<Statistic title="Active Users" value={112893} loading />
						</Col>
					</Row>
				</Card>
			</div>
			<Divider />
			<div style={{ width: '100%' }}>
				<List
					grid={{ gutter: 16, column: 3 }}
					dataSource={data}
					renderItem={(item) => (
						<List.Item>
							<Card title={item.title}>
								<div dangerouslySetInnerHTML={{ __html: item.content }}></div>
							</Card>
						</List.Item>
					)}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
