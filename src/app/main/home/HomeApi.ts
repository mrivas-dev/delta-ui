import { createSelector, WithSlice } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import { BASE_URL, INIT_API_URL, PACK_INFO_API_URL } from 'src/app/constants/api';

export const addTagTypes = ['home_init_user', 'home_user_pacs'] as const;
const HomeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getInitUser: build.query<
				GetUserInitApiResponse,
				GetUserInitApiArg
			>({
				query: () => ({ url: `${BASE_URL}${INIT_API_URL}` }),
				providesTags: ['home_init_user']
			}),
			getUserPacs: build.query<
				GetUserPacsApiResponse,
				GetUserInitApiArg
			>({
				query: () => ({ url: `${BASE_URL}${PACK_INFO_API_URL}` }),
				providesTags: ['home_user_pacs']
			}),
		}),
		overrideExisting: false
	});
export default HomeApi;

export type GetUserPacsApiResponse = {
	pacs: any[];
	success: boolean;
	usuariosGoogle: any[];
};
export type GetUserPacArgs = void;


export type GetUserInitApiResponse = {
	[key: string]: any;
};
export type GetUserInitApiArg = void;

export type GetProjectDashboardProjectsApiResponse = /** status 200 OK */ ProjectType[];
export type GetProjectDashboardProjectsApiArg = void;

export type ProjectType = {
	id: number;
	name: string;
};

export const { useGetInitUserQuery, useGetUserPacsQuery } = HomeApi;

export type HomeApiType = {
	[HomeApi.reducerPath]: ReturnType<typeof HomeApi.reducer>;
};

/**
 * Lazy load
 * */
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof HomeApi> { }
}

export const selectProjectDashboardWidgets = createSelector(
	HomeApi.endpoints.getInitUser.select(),
	(results) => results.data
);

export const selectWidget = <T>(id: string) =>
	createSelector(selectProjectDashboardWidgets, (widgets) => {
		return widgets?.[id] as T;
	});
