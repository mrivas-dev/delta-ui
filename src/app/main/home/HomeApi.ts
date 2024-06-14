import { createSelector, WithSlice } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import HomeDataType from './widgets/types/HomeDataType';
import { BASE_URL, PACK_INFO_API_URL } from 'src/app/constants/api';

export const addTagTypes = ['project_dashboard_widgets', 'project_dashboard_pacs'] as const;

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
			getHomePacs: build.query<
				GetHomePacsApiResponse,
				GetHomePacsApiArg
			>({
				query: () => ({ url: `${BASE_URL}${PACK_INFO_API_URL}` }),
				providesTags: ['project_dashboard_pacs']
			})
		}),
		overrideExisting: false
	});
export default HomeApi;

export type GetHomeWidgetsApiResponse = {
	[key: string]: HomeDataType;
};
export type GetHomeWidgetsApiArg = void;

export type GetHomePacsApiResponse = SelPacsResponse;
export type GetHomePacsApiArg = void;

export type ProjectType = {
	id: number;
	name: string;
};

export type PacType = {
	id: number;
	addinforme: boolean;
	agregaStu: string;
	assignWL: string;
	codigo: string;
	downCD: boolean;
	fecha_fija: string;
	marcaStudy: boolean;
	modalidad_fija: any[];
	nombre: string;
	noupload: boolean;
	observaciones: number;
	origenWlscu: string;
	otroVisor: boolean;
	pedidomedico: boolean;
	shareWhat: boolean;
	teclaInfo: boolean;
	tipo: string;
	uriAlt: string;
	uriVisor: string;
	usertf: boolean;
}

export type SelPacsResponse = {
	pacs: PacType[];
	success: boolean;
	usuariosGoogle: any[];
};

export const { useGetHomeWidgetsQuery, useGetHomePacsQuery } = HomeApi;

export type HomeApiType = {
	[HomeApi.reducerPath]: ReturnType<typeof HomeApi.reducer>;
};

/**
 * Lazy load
 * */
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof HomeApi> { }
}

export const selectHomeWidgets = createSelector(
	HomeApi.endpoints.getHomeWidgets.select(),
	(results) => results.data
);

export const selectWidget = <T>(id: string) =>
	createSelector(selectHomeWidgets, (widgets) => {
		return widgets?.[id] as T;
	});
