import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { Typography, PageHeader } from 'antd';

import * as routes from '../../App/routes.json';

import * as AppContext from '../../App/App.context';

import { fetchItems } from '../../actions';

import AppLayout from '../../App/App.layout';
import Section from '../../ui/Section';
import List from '../../components/List';

interface PageListProps {
	items: Array<any>;
	dispatch;
	match;
}

interface PageListStateProps {}

class PageList extends Component<PageListProps, PageListStateProps> {
	static defaultProps = {
		items: [],
	};

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
									<PageHeader
										title={
											<Typography.Title className="title title--page" level={1}>
												{t('page:list.title')}
											</Typography.Title>
										}
									/>
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
