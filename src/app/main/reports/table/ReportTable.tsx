/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useMemo } from 'react';
import { MRT_GlobalFilterTextField, MRT_TableBodyCellValue, MRT_TablePagination, MRT_ToolbarAlertBanner, flexRender, useMaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDeleteECommerceOrdersMutation, useGetECommerceOrdersQuery } from '../ECommerceApi';
import { renderPatient, renderStudyActions, renderStudyDescription, renderStudyInfo } from './utils';


const ReportTable = ({ studies, filters, isLoading }) => {
	const { data: orders } = useGetECommerceOrdersQuery();

	const [removeOrders] = useDeleteECommerceOrdersMutation();

	const columns = useMemo<MRT_ColumnDef<any>[]>(
		() => [
			{
				id: 'customer',
				accessorFn: (row) => renderPatient(row),
				header: 'Paciente'
			},
			{
				id: 'study',
				accessorFn: (row) => renderStudyInfo(row),
				header: 'Estudio'
			},
			{
				id: 'title',
				accessorFn: (row) => renderStudyDescription(row),
				header: 'Titulo'
			},
			{
				id: 'date',
				accessorKey: 'StudyDate',
				header: 'Fecha'
			},
			{
				id: 'actions',
				accessorFn: (row) => renderStudyActions(row),
				header: ''
			}
		],
		[]
	);
	const table = useMaterialReactTable({
		columns,
		data: studies?.length ? studies : [],
		enableRowSelection: true,
		initialState: {
			pagination: { pageSize: 5, pageIndex: 0 },
			showGlobalFilter: true,
		},
		muiPaginationProps: {
			rowsPerPageOptions: [5, 10, 15],
			variant: 'outlined',
		},
		paginationDisplayMode: 'pages',
	});


	if (isLoading) {
		return <FuseLoading />;
	}


	return (
		<Paper
			className="mt-5 flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<Stack sx={{ m: '2rem 0' }}>
				<MRT_ToolbarAlertBanner stackAlertBanner table={table} />
				<TableContainer>
					<Table>
						<TableHead>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableCell align="center" variant="head" key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.Header ??
													header.column.columnDef.header,
													header.getContext(),
												)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableHead>
						<TableBody>
							{table.getRowModel().rows.map((row, rowIndex) => (
								<TableRow key={row.id} selected={row.getIsSelected()}>
									{row.getVisibleCells().map((cell, _columnIndex) => (
										<TableCell align="center" variant="body" key={cell.id}>
											<MRT_TableBodyCellValue
												cell={cell}
												table={table}
												staticRowIndex={rowIndex}
											/>
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<MRT_TablePagination table={table} />
				</Box>
			</Stack>

		</Paper>
	);
}

export default ReportTable;
