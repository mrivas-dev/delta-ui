import { useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import ReportsAppHeader from './ReportsAppHeader';
import FuseLoading from '@fuse/core/FuseLoading';
import { useGetProjectDashboardWidgetsQuery } from './ReportsApi';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function Reports() {
	const { t } = useTranslation('reportsPage');
	const { data: widgets, isLoading } = useGetProjectDashboardWidgetsQuery();

	const [tabValue, setTabValue] = useState(0);

	function handleChangeTab(event: React.SyntheticEvent, value: number) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Root
			header={<ReportsAppHeader />}
			content={
				<div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
					HOLIS
				</div>
			}
		/>
	);
}

export default Reports;
