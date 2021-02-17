import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';

import * as routes from '../../App/routes.json';

import * as AppContext from '../../App/App.context';

import { fetchItems } from '../../actions';

import AppLayout from '../../App/App.layout';
import Section from '../../ui/Section';
import List from '../../components/List';

class PageList extends Component<{ items; dispatch; match }, {}> {
	componentDidMount() {
		this.props.dispatch(fetchItems());
	}

	render() {
		return (
			<AppContext.Consumer>
				{(context) => (
					<Translation>
						{(t) => (
							<AppLayout
								metaTitle={t('page:list.meta.title')}
								route={routes.list}
							>
								<Section>
									<h1 className="title title--page">{t('page:list.title')}</h1>
								</Section>
								<Section>
									<List
										items={this.props.items}
										detailId={this.props.match.params.id}
										detailPath={routes.list.pathDetail}
										listPath={routes.list.path}
									/>
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
