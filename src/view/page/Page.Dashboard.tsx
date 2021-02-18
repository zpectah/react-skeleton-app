import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { Typography, PageHeader } from 'antd';

import * as routes from '../../App/routes.json';

import * as AppContext from '../../App/App.context';

import AppLayout from '../../App/App.layout';
import Section from '../../ui/Section';
import Dashboard from '../../components/Dashboard';

interface PageDashboardProps {}

interface PageDashboardStateProps {}

class PageDashboard extends Component<
	PageDashboardProps,
	PageDashboardStateProps
> {
	render() {
		return (
			<AppContext.Consumer>
				{(context) => (
					<Translation>
						{(t) => (
							<AppLayout route={routes.dashboard}>
								<Section>
									<PageHeader
										title={
											<Typography.Title className="title title--page" level={1}>
												{t('page:dashboard.title')}{' '}
											</Typography.Title>
										}
									/>
								</Section>
								<Section>
									<Dashboard />
								</Section>
							</AppLayout>
						)}
					</Translation>
				)}
			</AppContext.Consumer>
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.items,
	};
}

export default connect(mapStateToProps)(PageDashboard);
