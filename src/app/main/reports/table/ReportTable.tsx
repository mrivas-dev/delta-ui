/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useMemo, useState } from 'react';
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef
} from 'material-react-table';
import tableConfig from "./ReportTableConfig";
import { ReportTableColumns } from './ReportTableColumns';

const ReportTable = ({ studies, isLoading, filters, changeFilters }) => {

	const [pagination, setPagination] = useState({
		pageIndex: filters?.pag,
		pageSize: filters?.cuantos
	});


	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => ReportTableColumns,
		[]
	);

	useEffect(() => {
		if (pagination.pageSize !== filters?.cuantos || pagination.pageIndex !== filters?.pag) {
			changeFilters({ ...filters, ...{ cuantos: pagination.pageSize, pag: pagination.pageIndex } })
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

export default ReportTable;
