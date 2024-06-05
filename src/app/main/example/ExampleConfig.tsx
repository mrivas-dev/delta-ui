import i18next from 'i18next';
import { lazy } from 'react';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('es', 'examplePage', es);

const Example = lazy(() => import('./Example'));

/**
 * The Example page config.
 */
const ExampleConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'example',
			element: <Example />
		}
	]
};

export default ExampleConfig;
