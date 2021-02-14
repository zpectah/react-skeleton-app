import { string } from 'javascript-es6-helpers';

import { DEFAULT } from '../constants/actions.types';

import LanguageService from '../service/Language.service';

export interface DefaultStoreProps {
	items: Array<any>;
	toasts: Array<any>;
	language: string;
	navbarOpen: true | false;
}
export const defaultStoreState: DefaultStoreProps = {
	items: [],
	toasts: [],
	language: LanguageService.get(),
	navbarOpen: false,
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

	}

	return state;
}

export default defaultReducer;
