/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useMemo, useState } from 'react';
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef
} from 'material-react-table';
import { useTranslation } from "react-i18next";
import tableConfig from "./StudiesTableConfig";
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { StudiesTableColumns } from './StudiesTableColumns';
import { changeStudiesFilters, selectStudiesFilter } from '../filters/slice';

const StudiesTable = ({ studies, isLoading }) => {
	const { t } = useTranslation('studiesPage');
	const dispatch = useAppDispatch();
	const filters = useAppSelector(selectStudiesFilter);

	const [pagination, setPagination] = useState({
		pageIndex: filters?.pag,
		pageSize: filters?.cuantos
	});

	const columns = useMemo<MRT_ColumnDef<any>[]>(() => StudiesTableColumns(t), []);

	useEffect(() => {
		if (pagination.pageSize !== filters?.cuantos || pagination.pageIndex !== filters?.pag) {
			dispatch(changeStudiesFilters({ ...filters, ...{ cuantos: pagination.pageSize, pag: pagination.pageIndex } }));
		}
	}, [pagination]);

	const table = useMaterialReactTable(
		{
			columns,
			data: studies?.length ? studies : [],
			state: {
				isLoading,
				pagination
			},
			...tableConfig,
			initialState: {
				pagination
			},
			onPaginationChange: setPagination
		}
	);

	return (
		<MaterialReactTable table={table} />
	);
}

export default StudiesTable;
