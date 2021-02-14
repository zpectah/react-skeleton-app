import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';

import * as routes from '../../App/routes.json';

import * as AppContext from '../../App/App.context';

import AppLayout from '../../App/App.layout';
import Section from '../../ui/Section';
import List from '../../components/List';

class PageList extends Component<{}> {

	render() {
		return (
			<AppContext.Consumer>
				{(context) => (
					<Translation>
						{(t) => (
							<AppLayout metaTitle={t('page:list.meta.title')} route={routes.list}>
								<Section>
									<h1 className="title title--page">
										{t('page:list.title')}
									</h1>
								</Section>
								<Section>
									<List />
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

export default connect(mapStateToProps)(PageList);
