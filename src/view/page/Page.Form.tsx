import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';

import * as routes from '../../App/routes.json';

import * as AppContext from '../../App/App.context';

import AppLayout from '../../App/App.layout';
import Section from '../../ui/Section';
import FormDefault from '../../components/FormDefault';

class PageForm extends Component<{}> {

	render() {
		return (
			<AppContext.Consumer>
				{(context) => (
					<Translation>
						{(t) => (
							<AppLayout metaTitle={t('page:form.meta.title')} route={routes.form}>
								<Section>
									<h1 className="title title--page">
										{t('page:form.title')}
									</h1>
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
