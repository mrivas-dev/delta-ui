import i18next from 'i18next';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import es from './navigation-i18n/es';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('es', 'navigation', es);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'images',
		title: 'IMAGES_TITLE',
		subtitle: 'IMAGES_SUBTITLE',
		type: 'group',
		children: [
			{
				id: 'images.dashboard',
				title: 'HOME_TITLE',
				type: 'item',
				icon: 'heroicons-outline:chart-pie',
				url: 'home'
			},
			{
				id: 'images.reports',
				title: 'REPORTS_TITLE',
				type: 'item',
				icon: 'heroicons-outline:clipboard-check',
				url: 'reports'
			},
			{
				id: 'images.studies',
				title: 'STUDIES_TITLE',
				type: 'item',
				icon: 'power_input',
				url: 'studies'
			},
		]
	},
	{
		id: 'admin',
		title: 'ADMIN_TITLE',
		subtitle: 'ADMIN_SUBTITLE',
		type: 'group',
		icon: '',
		children: [
			{
                id: 'admin.company',
                title: 'COMPANY_TITLE',
				translate: 'COMPANY',
                type: 'item',
                icon: 'business',
                url: '/settings/company'
            },
            {
                id: 'admin.providers',
                title: 'PROVIDERS_TITLE',
                type: 'item',
                icon: 'group_work',
                url: '/settings/providers'
            },
            {
                id: 'admin.users',
                title: 'USERS_TITLE',
                type: 'item',
                icon: 'supervised_user_circle',
                url: '/settings/users'
            }
		]
	},
];

export default navigationConfig;
