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
		title: 'Images',
		subtitle: 'Tools for image tratement',
		translate: 'IMAGES_TITLE',
		type: 'group',
		children: [
			{
				id: 'images.dashboard',
				title: 'Home',
				translate: 'HOME',
				type: 'item',
				icon: 'material-solid:dashboard',
				url: 'example'
			},
			{
				id: 'images.studies',
				title: 'Studies',
				translate: 'STUDIES',
				type: 'item',
				icon: 'cast',
				url: 'studies'
			},
			{
				id: 'images.reports',
				title: 'Reports',
				translate: 'REPORTS',
				type: 'item',
				icon: 'power_input',
				url: 'reports'
			}
		]
	},
	{
		id: 'admin',
		title: 'Admin',
		subtitle: 'Data management',
		type: 'group',
		icon: '',
		translate: 'ADMIN_TITLE',
		children: [
			{
                id: 'admin.company',
                title: 'Company',
				translate: 'COMPANY',
                type: 'item',
                icon: 'business',
                url: '/settings/company'
            },
            {
                id: 'admin.providers',
                title: 'Providers',
				translate: 'PROVIDERS',
                type: 'item',
                icon: 'group_work',
                url: '/settings/providers'
            },
            {
                id: 'admin.users',
                title: 'Users',
				translate: 'USERS',
                type: 'item',
                icon: 'supervised_user_circle',
                url: '/settings/users'
            }
		]
	},
];

export default navigationConfig;
