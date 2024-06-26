import { WithSlice } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import { BASE_URL, IMG_STUDIES_API } from 'src/app/constants/api';
import { GetStudiesApiResponse, GetStudiesApiArg } from './StudiesType';

export const addTagTypes = ['project_studies_studies'] as const;

const StudiesApi = api
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
export default StudiesApi;

export const { useGetStudiesMutation } = StudiesApi;

export type StudiesApiType = {
	[StudiesApi.reducerPath]: ReturnType<typeof StudiesApi.reducer>;
};

/**
 * Lazy load
 * */
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof StudiesApi> { }
}
