import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { Typography, PageHeader } from 'antd';

import * as routes from '../../App/routes.json';

import * as AppContext from '../../App/App.context';

import AppLayout from '../../App/App.layout';
import Section from '../../ui/Section';
import FormDefault from '../../components/FormDefault';

interface PageFormProps {}

interface PageFormStateProps {}

class PageForm extends Component<PageFormProps, PageFormStateProps> {
	render() {
		return (
			<AppContext.Consumer>
				{(context) => (
					<Translation>
						{(t) => (
							<AppLayout
								metaTitle={t('page:form.meta.title')}
								route={routes.form}
							>
								<Section>
									<PageHeader
										title={
											<Typography.Title className="title title--page" level={1}>
												{t('page:form.title')}
											</Typography.Title>
										}
									/>
								</Section>
								<Section>
									<FormDefault />
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

export default connect(mapStateToProps)(PageForm);
