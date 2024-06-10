import { createSelector, WithSlice } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';


export const addTagTypes = ['project_dashboard_widgets', 'project_dashboard_projects'] as const;
const ProjectDashboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getProjectDashboardWidgets: build.query<
				GetProjectDashboardWidgetsApiResponse,
				GetProjectDashboardWidgetsApiArg
			>({
				query: () => ({ url: `https://cloud.deltasis.com.ar/api/img/selpacs?usuariosGoogle=1` }),
				providesTags: ['project_dashboard_widgets']
			}),
			getProjectDashboardProjects: build.query<
				GetProjectDashboardProjectsApiResponse,
				GetProjectDashboardProjectsApiArg
			>({
				query: () => ({ url: `/mock-api/dashboards/project/projects` }),
				providesTags: ['project_dashboard_projects']
			})
		}),
		overrideExisting: false
	});
export default ProjectDashboardApi;

export type GetProjectDashboardWidgetsApiResponse = {
	[key: string]: any;
};
export type GetProjectDashboardWidgetsApiArg = void;

export type GetProjectDashboardProjectsApiResponse = /** status 200 OK */ ProjectType[];
export type GetProjectDashboardProjectsApiArg = void;

export type ProjectType = {
	id: number;
	name: string;
};

export const { useGetProjectDashboardWidgetsQuery, useGetProjectDashboardProjectsQuery } = ProjectDashboardApi;

export type ProjectDashboardApiType = {
	[ProjectDashboardApi.reducerPath]: ReturnType<typeof ProjectDashboardApi.reducer>;
};

/**
 * Lazy load
 * */
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof ProjectDashboardApi> {}
}

export const selectProjectDashboardWidgets = createSelector(
	ProjectDashboardApi.endpoints.getProjectDashboardWidgets.select(),
	(results) => results.data
);

export const selectWidget = <T>(id: string) =>
	createSelector(selectProjectDashboardWidgets, (widgets) => {
		return widgets?.[id] as T;
	});
