import { DEFAULT } from '../constants/actions.types';

export const languageToggle = (payload) => {
	return { type: DEFAULT.LANGUAGE_TOGGLE, payload };
};

export const addToast = (payload) => {
	return { type: DEFAULT.ADD_TOAST, payload };
};

export const removeToast = (payload) => {
	return { type: DEFAULT.REMOVE_TOAST, payload };
};

export function navbarToggle(payload) {
	return { type: DEFAULT.NAVBAR_TOGGLE, payload };
}

export const addChatMessage = (payload) => {
	return { type: DEFAULT.ADD_CHAT_MESSAGE, payload };
};

export const addChatUser = (payload) => {
	return { type: DEFAULT.ADD_CHAT_USER, payload };
};

export const removeChatUser = (payload) => {
	return { type: DEFAULT.REMOVE_CHAT_USER, payload };
};
