import { WithSlice } from '@reduxjs/toolkit';
import { apiService as api } from 'app/store/apiService';
import { BASE_URL, PACK_INFO_API_URL } from 'src/app/constants/api';
import { GetPacServerApiResponse, GetPacServerApiArg } from './PacServerTypes';

export const addTagTypes = ['pac_server_list'] as const;

const PacServerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPacServer: build.query<
				GetPacServerApiResponse,
				GetPacServerApiArg
			>({
				query: () => ({ url: `${BASE_URL}${PACK_INFO_API_URL}` }),
				providesTags: ['pac_server_list']
			})
		}),
		overrideExisting: false
	});
export default PacServerApi;

export const { useGetPacServerQuery } = PacServerApi;

export type PacServerApiType = {
	[PacServerApi.reducerPath]: ReturnType<typeof PacServerApi.reducer>;
};

/**
 * Lazy load
 * */
declare module 'app/store/lazyLoadedSlices' {
	export interface LazyLoadedSlices extends WithSlice<typeof PacServerApi> { }
}
