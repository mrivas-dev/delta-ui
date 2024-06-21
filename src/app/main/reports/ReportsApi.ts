import { WithSlice } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import { BASE_URL, IMG_STUDIES_API } from 'src/app/constants/api';
import { GetStudiesApiResponse, GetStudiesApiArg } from './ReportType';

export const addTagTypes = ['project_reports_studies'] as const;

const ReportApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
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

export const { useGetStudiesMutation } = ReportApi;

export type ReportApiType = {
	[ReportApi.reducerPath]: ReturnType<typeof ReportApi.reducer>;
};

/**
 * Lazy load
 * */
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof ReportApi> { }
}
