import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import { FuseRouteConfigsType, FuseRoutesType } from '@fuse/utils/FuseUtils';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import HomeConfig from '../main/home/HomeConfig';
import Studies from '../main/studies/Studies';
import Patient from '../main/studies/patient/Patient';

const routeConfigs: FuseRouteConfigsType = [HomeConfig, SignOutConfig, SignInConfig, SignUpConfig];

/**
 * The routes of the application.
 */
const routes: FuseRoutesType = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/home" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: '/studies',
		element: <Studies />,
		auth: settingsConfig.defaultAuth,
		children: [
			{
				path: ':id',
				element: <Patient />
			},
		]
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];

export default routes;
