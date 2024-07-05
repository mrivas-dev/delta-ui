import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { AppThunk, RootState } from 'app/store/store';
import { StudiesFiltersType } from './types';

const PAGE_QUANTITY = 30;

const INITIAL_FILTERS = {
	columna: null,
	cuantos: PAGE_QUANTITY,
	direccion: null,
	pag: 0,
	texto: {
		datosEst: "",
		fecha: moment().format("YYYY-MM-DD"),
		hasta: "",
		hastaVisible: false,
		paciente: "",
		servidor: 1,
		tipoBusqueda: "EST",
		ifapproved: false,
		ifsigned: false,
		tipoEst: []
	}
};

export const changeStudiesFilters =
	(newFilters: any): AppThunk =>
		async (dispatch) => {
			dispatch(studiesFilterSlice.actions.studiesFilterChanged(newFilters));
		};

export const changeStudiesTextFilters =
	(newFilters: any): AppThunk =>
		async (dispatch, getState) => {
			const AppState = getState();
			const { studiesFilter } = AppState;
			const textFilters = { ...studiesFilter.texto, ...newFilters };
			dispatch(studiesFilterSlice.actions.studiesFilterChanged({ ...studiesFilter, ...{ texto: textFilters } }));
		};

/**
 * The Studies Filter Initial State
 */
const initialState: StudiesFiltersType = INITIAL_FILTERS;

/**
 * The Studies Filter slice
 */
export const studiesFilterSlice = createSlice({
	name: 'studiesFilter',
	initialState,
	reducers: {
		/**
		 * Updates the state with the new filters.
		 */
		studiesFilterChanged: (state, action: PayloadAction<StudiesFiltersType>) => {
			state = action.payload;
			return state;
		}
	}
});

export const selectStudiesFilter = (state: RootState) => {
	return state.studiesFilter;
};

export type studiesFilterSliceType = typeof studiesFilterSlice;

export default studiesFilterSlice.reducer;
