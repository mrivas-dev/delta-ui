/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useMemo } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';
import DataTable from 'app/shared-components/data-table/DataTable';
import { ListItemIcon, MenuItem, Paper } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { EcommerceOrder, useDeleteECommerceOrdersMutation, useGetECommerceOrdersQuery } from '../ECommerceApi';
import OrdersStatus from '../OrdersStatus';
import { renderPatient, renderStudyInfo } from './utils';

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
				accessorKey: 'StudyDescription',
				header: 'Titulo'
			},
			{
				id: 'date',
				accessorKey: 'StudyDate',
				header: 'Fecha'
			}
		],
		[]
	);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Paper
			className="mt-5 flex flex-col flex-auto shadow-3 rounded-t-16 overflow-hidden rounded-b-0 w-full h-full"
			elevation={0}
		>
			<DataTable
				initialState={{
					density: 'comfortable',
					showColumnFilters: false,
					showGlobalFilter: true,
					columnPinning: {
						left: ['mrt-row-expand'],
						right: ['mrt-row-actions']
					},
					pagination: {
						pageIndex: 0,
						pageSize: 20
					}
				}}
				data={studies}
				columns={columns}
				renderRowActionMenuItems={({ closeMenu, row, table }) => [
					<MenuItem
						key={0}
						onClick={() => {
							removeOrders([row.original.id]);
							closeMenu();
							table.resetRowSelection();
						}}
					>
						<ListItemIcon>
							<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
						</ListItemIcon>
						Delete
					</MenuItem>
				]}
				renderTopToolbarCustomActions={({ table }) => {
					const { rowSelection } = table.getState();

					if (Object.keys(rowSelection).length === 0) {
						return null;
					}

					return (
						<Button
							variant="contained"
							size="small"
							onClick={() => {
								const selectedRows = table.getSelectedRowModel().rows;
								removeOrders(selectedRows.map((row) => row.original.id));
								table.resetRowSelection();
							}}
							className="flex shrink min-w-40 ltr:mr-8 rtl:ml-8"
							color="secondary"
						>
							<FuseSvgIcon size={16}>heroicons-outline:trash</FuseSvgIcon>
							<span className="hidden sm:flex mx-8">Delete selected items</span>
						</Button>
					);
				}}
			/>
		</Paper>
	);
}

export default ReportTable;
