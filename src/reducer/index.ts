import { string } from 'javascript-es6-helpers';

import { DEFAULT } from '../constants/actions.types';

import LanguageService from '../service/Language.service';

export interface DefaultStoreProps {
	items: Array<any>;
	toasts: Array<any>;
	language: string;
	navbarOpen: true | false;
	//
	chatMessages: Array<any>;
	chatUsers: Array<any>;
	chatRooms: Array<any>;
	fetching: true | false;
	fetchError: any;
}
export const defaultStoreState: DefaultStoreProps = {
	items: [],
	toasts: [],
	language: LanguageService.get(),
	navbarOpen: false,
	//
	chatMessages: [],
	chatUsers: [],
	chatRooms: [
		{
			id: 1,
			name: 'chatRoom1',
		},
		{
			id: 2,
			name: 'chatRoom2',
		},
	],
	fetching: false,
	fetchError: null,
};

function defaultReducer(state = defaultStoreState, action) {
	// console.log(action.type, action.payload);

	switch (action.type) {
		case DEFAULT.LANGUAGE_TOGGLE:
			LanguageService.set(action.payload);
			return Object.assign({}, state, {
				language: action.payload,
			});

		case DEFAULT.ADD_TOAST:
			action.payload.id = string.getToken(3, '');
			return Object.assign({}, state, {
				toasts: state.toasts.concat(action.payload),
			});

		case DEFAULT.REMOVE_TOAST:
			return Object.assign({}, state, {
				toasts: [
					...state.toasts.slice(0, action.payload),
					...state.toasts.slice(action.payload + 1),
				],
			});

		case DEFAULT.NAVBAR_TOGGLE:
			return Object.assign({}, state, {
				navbarOpen: action.payload,
			});

		case DEFAULT.ADD_CHAT_MESSAGE:
			return Object.assign({}, state, {
				chatMessages: state.chatMessages.concat(action.payload),
			});

		case DEFAULT.ADD_CHAT_USER:
			return Object.assign({}, state, {
				chatUsers: state.chatUsers.concat(action.payload),
			});

		case DEFAULT.REMOVE_CHAT_USER:
			let tmp = [];

			state.chatUsers.map((item) => {
				if (item.nickname !== action.payload) tmp.push(item);
			});

			return Object.assign({}, state, {
				chatUsers: tmp,
			});

		case DEFAULT.FETCH_START:
			return { ...state, fetching: true };

		case DEFAULT.FETCH_DONE:
			return {
				fetching: false,
				items: action.payload,
				fetchError: null,
			};

		case DEFAULT.FETCH_ERROR:
			return {
				...state,
				fetching: false,
				fetchError: action.payload,
			};
	}

	return state;
}

export default defaultReducer;
