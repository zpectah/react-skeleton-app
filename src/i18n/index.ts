import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import cfg from '../config';

import en_common from './en/common.json';
import en_page from './en/page.json';
import en_messages from './en/messages.json';

const resources = {
	en: {
		common: en_common,
		page: en_page,
		messages: en_messages,
	}
};

i18n.use(initReactI18next).init({
	resources,
	lng: cfg.language.default,
	fallbackLng: cfg.language.default,
	defaultNS: 'common',
	keySeparator: false,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
