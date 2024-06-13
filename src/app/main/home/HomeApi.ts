import { createSelector, WithSlice } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import HomeDataType from './widgets/types/HomeDataType';

export const addTagTypes = ['project_dashboard_widgets', 'project_dashboard_projects'] as const;

const HomeApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getHomeWidgets: build.query<
				GetHomeWidgetsApiResponse,
				GetHomeWidgetsApiArg
			>({
				query: () => ({ url: `/mock-api/dashboards/project/widgets` }),
				providesTags: ['project_dashboard_widgets']
			}),
			getHomeProjects: build.query<
				GetHomeProjectsApiResponse,
				GetHomeProjectsApiArg
			>({
				query: () => ({ url: `/mock-api/dashboards/project/projects` }),
				providesTags: ['project_dashboard_projects']
			})
		}),
		overrideExisting: false
	});
export default HomeApi;

export type GetHomeWidgetsApiResponse = {
	[key: string]: HomeDataType;
};
export type GetHomeWidgetsApiArg = void;

export type GetHomeProjectsApiResponse = /** status 200 OK */ ProjectType[];
export type GetHomeProjectsApiArg = void;

export type ProjectType = {
	id: number;
	name: string;
};

export const { useGetHomeWidgetsQuery, useGetHomeProjectsQuery } = HomeApi;

export type HomeApiType = {
	[HomeApi.reducerPath]: ReturnType<typeof HomeApi.reducer>;
};

/**
 * Lazy load
 * */
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof HomeApi> {}
}

export const selectHomeWidgets = createSelector(
	HomeApi.endpoints.getHomeWidgets.select(),
	(results) => results.data
);

export const selectWidget = <T>(id: string) =>
	createSelector(selectHomeWidgets, (widgets) => {
		return widgets?.[id] as T;
	});
