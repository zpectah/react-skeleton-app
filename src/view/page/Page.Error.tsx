import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

import * as routes from '../../App/routes.json';

import * as AppContext from '../../App/App.context';

import AppLayout from '../../App/App.layout';
import Section from '../../ui/Section';

interface PageErrorProps {}

interface PageErrorStateProps {}

class PageError extends Component<PageErrorProps, PageErrorStateProps> {
	render() {
		return (
			<AppContext.Consumer>
				{(context) => (
					<Translation>
						{(t) => (
							<AppLayout
								metaTitle={t('page:error.meta.title')}
								withoutHeader
								withoutFooter
								withoutToasts
								route={routes.error}
								className="is-centered"
							>
								<Section>
									<Typography.Title className="title title--page" level={1}>
										{t('page:error.title')}
									</Typography.Title>
								</Section>
								<Section>
									<p>{t('page:error.content')}</p>
									<Link to={routes.dashboard.path}>Return to dashboard</Link>
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
	return {};
}

export default connect(mapStateToProps)(PageError);
