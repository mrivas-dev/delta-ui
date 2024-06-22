/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef
} from 'material-react-table';
import tableConfig from "./ReportTableConfig";
import { ReportTableColumns } from './ReportTableColumns';

const ReportTable = ({ studies, isLoading }) => {

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => ReportTableColumns,
		[]
	);

	const table = useMaterialReactTable(
		{
			columns,
			data: studies?.length ? studies : [],
			state: {
				isLoading
			},
			...tableConfig
		}
	);

	return (
		<MaterialReactTable table={table} />
	);
}

export default ReportTable;
