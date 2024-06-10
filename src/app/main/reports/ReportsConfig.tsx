import i18next from 'i18next';
import { lazy } from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'reportsPage', en);
i18next.addResourceBundle('es', 'reportsPage', es);

const Reports = lazy(() => import('./Reports'));

/**
 * The Reports page config.
 */
const ReportsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'reports',
			element: <Reports />
		}
	]
};

export default ReportsConfig;
