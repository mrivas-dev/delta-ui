import i18next from 'i18next';
import { lazy } from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'studiesPage', en);
i18next.addResourceBundle('es', 'studiesPage', es);

const Studies = lazy(() => import('./Studies'));

/**
 * The Studies page config.
 */
const StudiesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'studies',
			element: <Studies />
		}
	]
};

export default StudiesConfig;
