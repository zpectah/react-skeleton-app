import React, { Component } from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { Typography, PageHeader, Tag } from 'antd';

import * as routes from '../../App/routes.json';

import * as AppContext from '../../App/App.context';

import AppLayout from '../../App/App.layout';
import Section from '../../ui/Section';
import Chat from '../../components/Chat';

interface PageChatProps {
	chatMessages: Array<any>;
	chatUsers: Array<any>;
	chatRooms: Array<any>;
	match;
}

interface PageChatStateProps {
	online: true | false;
}

class PageChat extends Component<PageChatProps, PageChatStateProps> {
	static defaultProps = {
		chatMessages: [],
		chatUsers: [],
		chatRooms: [],
	};

	state: PageChatStateProps = {
		online: false,
	};

	render() {
		return (
			<AppContext.Consumer>
				{(context) => (
					<Translation>
						{(t) => (
							<AppLayout
								metaTitle={t('page:chat.meta.title')}
								route={routes.chat}
							>
								<Section>
									<PageHeader
										title={
											<Typography.Title className="title title--page" level={1}>
												{t('page:chat.title')}{' '}
											</Typography.Title>
										}
										tags={
											<>
												<Tag
													color={this.state.online ? 'success' : 'error'}
													key={1}
												>
													Server {this.state.online ? 'online' : 'offline'}
												</Tag>
												<Tag
													color={
														this.props.chatUsers.length > 0
															? 'success'
															: 'error'
													}
													key={2}
												>
													{this.props.chatUsers.length} users
												</Tag>
											</>
										}
									/>
								</Section>
								<Section>
									<Chat
										messages={this.props.chatMessages}
										chatUsers={this.props.chatUsers}
										rooms={this.props.chatRooms}
										roomId={this.props.match.params.room}
										onOnline={(online) => {
											this.setState({ ...this.state, online: online });
										}}
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

function mapStateToProps(state: {
	chatMessages: Array<any>;
	chatUsers: Array<any>;
	chatRooms: Array<any>;
}) {
	return {
		chatMessages: state.chatMessages,
		chatUsers: state.chatUsers,
		chatRooms: state.chatRooms,
	};
}

export default connect(mapStateToProps)(PageChat);
