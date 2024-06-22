/* eslint-disable react/no-unstable-nested-components */
import { useMemo } from 'react';
import {
	MaterialReactTable,
	useMaterialReactTable,
	type MRT_ColumnDef
} from 'material-react-table';
import FuseLoading from '@fuse/core/FuseLoading';
import { ReportTableColumns } from './ReportTableColumns';

const ReportTable = ({ studies, isLoading }) => {

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => ReportTableColumns,
		[]
	);

	const table = useMaterialReactTable({
		columns,
		layoutMode: 'semantic',
		data: studies?.length ? studies : [],
		enableColumnResizing: true,
		enableRowSelection: true,
		enableColumnFilters: false,
		enableGlobalFilter: false, 
		enableFullScreenToggle: false,
		enableDensityToggle: false,
		enableColumnOrdering: true,
		initialState: {
			pagination: { pageSize: 25, pageIndex: 0 }
		},
		muiPaginationProps: {
			rowsPerPageOptions: [25, 50, 100],
			variant: 'outlined',
			color: 'primary',
			shape: 'rounded',
		},
		renderEmptyRowsFallback: ({ table }) => (
			<span>No data found (TODO)</span>
		),
		paginationDisplayMode: 'pages',
		state: {
			isLoading
		},
		muiTopToolbarProps: {
			sx: {
				minHeight: '5.5rem',
				borderRadius: '16px',
			}
		},
		muiBottomToolbarProps: {
			sx: {
				minHeight: '5.5rem',
				borderRadius: '0 0 16px',
			}
		},
		muiTableContainerProps: {
			sx: {
				overflow: 'hidden'
			},
		},
		muiTablePaperProps: {
			sx: {
				padding: '16px',
				marginTop: '16px',
				borderRadius: '16px',
			},
		},
		mrtTheme: (theme) => ({
			baseBackgroundColor: '#fff',
		}),
	});
	return (
		<MaterialReactTable table={table} />
	);
}

export default ReportTable;
