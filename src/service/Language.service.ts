import { storage } from 'javascript-es6-helpers';

import cfg from '../config';

class LanguageService {
	get() {
		return storage.get(cfg.language.storage_key) || cfg.language.default;
	}

	set(lang: string) {
		storage.set(cfg.language.storage_key, lang);
	}
}

export default new LanguageService();
