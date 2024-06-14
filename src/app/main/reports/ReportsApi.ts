import { WithSlice } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';

import { BASE_URL, PACK_INFO_API_URL } from 'src/app/constants/api';

export const addTagTypes = ['project_reports_pacs'] as const;

const ReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getReportPacs: build.query<
				GetReportPacsApiResponse,
				GetReportPacsApiArg
			>({
				query: () => ({ url: `${BASE_URL}${PACK_INFO_API_URL}` }),
				providesTags: ['project_reports_pacs']
			})
		}),
		overrideExisting: false
	});
export default ReportApi;

export type GetHomeWidgetsApiArg = void;

export type GetReportPacsApiResponse = SelPacsResponse;
export type GetReportPacsApiArg = void;

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

export const { useGetReportPacsQuery } = ReportApi;

export type ReportApiType = {
	[ReportApi.reducerPath]: ReturnType<typeof ReportApi.reducer>;
};

/**
 * Lazy load
 * */
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof ReportApi> { }
}
