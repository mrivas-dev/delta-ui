import { WithSlice } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';

import { BASE_URL, IMG_STUDIES_API, PACK_INFO_API_URL } from 'src/app/constants/api';

export const addTagTypes = ['project_reports_pacs', 'project_reports_studies'] as const;

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
			}),
			getStudies: build.mutation<
				GetStudiesApiResponse,
				GetStudiesApiArg
			>({
				query: (filters) => ({ url: `${BASE_URL}${IMG_STUDIES_API}`, method: 'POST', data: filters })
			}),
		}),
		overrideExisting: false
	});
export default ReportApi;

export type GetHomeWidgetsApiArg = void;

export type GetReportPacsApiResponse = SelPacsResponse;
export type GetReportPacsApiArg = void;

export type GetStudiesApiResponse = StudiesResponse;
export type GetStudiesApiArg = any;

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

export type StudiesResponse = {
	data: StudiesType[];
	current_page: number;
	from: number;
	last_page: number;
	per_page: number;
	success: boolean;
	to: number;
	total: number;
};

export type StudiesType = {
	AccessionNumber: string;
	Allergies: string;
	InstanceAvailability: string;
	IssuerOfPatientID: string;
	MedicalAlerts: string;
	Modality: string;
	NumberOfStudyRelatedInstances: string;
	OtherPatientIDs: string;
	PatientBirthDate: string;
	PatientID: string;
	PatientName: string;
	PatientSex: string;
	QueryRetrieveLevel: string;
	RequestedProcedureDescription: string;
	RetrieveAETitle: string;
	SeriesDate: string;
	SeriesNro: 1;
	SpecificCharacterSet: string;
	StudyDate: string;
	StudyDescription: string;
	StudyInstanceUID: string;
	StudyTime: string;
	sortStudyDate: string;
}

export const { useGetReportPacsQuery, useGetStudiesMutation } = ReportApi;

export type ReportApiType = {
	[ReportApi.reducerPath]: ReturnType<typeof ReportApi.reducer>;
};

/**
 * Lazy load
 * */
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof ReportApi> { }
}
