import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import _ from '@lodash';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { useTranslation } from 'react-i18next';
import en from './i18n/en';
import es from './i18n/es';
import i18next from 'i18next';
import usePacServer from 'src/app/pac/usePacServer';
import { PacServerType } from 'src/app/pac/PacServerTypes';

i18next.addResourceBundle('en', 'reportsPage', en);
i18next.addResourceBundle('es', 'reportsPage', es);
/**
 * The ReportsAppHeader page.
 */
function ReportsAppHeader() {
	const { t } = useTranslation('reportsPage');
	const { getPacs, isPacServerProviderListLoading, getPacServerProvider, setPacServerProvider } = usePacServer();
	const [pacList, setPacList] = useState<PacServerType[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<string>("TODAY");
	const [selectedProject, setSelectedProject] = useState<{ id: number; menuEl: HTMLElement | null }>({
		id: 1,
		menuEl: null
	});

	useEffect(() => {
		if (getPacs()?.length && !pacList.length) {
			setPacList(getPacs());
			handleChangeProject(getPacServerProvider()?.id || pacList[0]?.id);
		}
	}, [getPacs]);

	const handleChangeProject = (id: number) => {
		setPacServerProvider(pacList.find((e => e.id === id)));
		setSelectedProject({
			id,
			menuEl: null
		});
	}

	function handleOpenProjectMenu(event: React.MouseEvent<HTMLElement>) {
		setSelectedProject({
			id: selectedProject.id,
			menuEl: event.currentTarget
		});
	}

	function handleCloseProjectMenu() {
		setSelectedProject({
			id: selectedProject.id,
			menuEl: null
		});
	}

	if (isPacServerProviderListLoading) {
		return <FuseLoading />;
	}

	return (
		<div className="flex flex-col w-full px-24 sm:px-32">
			<div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
				<div className="flex flex-auto items-center min-w-0">
					<div className="flex flex-col min-w-0 mx-16">
						<Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
							{t('REPORTS_HEADER_TITLE')}
						</Typography>
					</div>
				</div>
				<div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
					<Button
						className="whitespace-nowrap"
						variant={selectedFilter === 'TODAY' ? 'contained' : 'outlined'}
						onClick={() => { setSelectedFilter('TODAY') }}
						color={selectedFilter === 'TODAY' ? 'secondary' : 'primary'}
					>
						{t('REPORTS_HEADER_BUTTON_TODAY')}
					</Button>
					<Button
						className="whitespace-nowrap"
						variant={selectedFilter === 'YESTERDAY' ? 'contained' : 'outlined'}
						onClick={() => { setSelectedFilter('YESTERDAY') }}
						color={selectedFilter === 'YESTERDAY' ? 'secondary' : 'primary'}
					>
						{t('REPORTS_HEADER_BUTTON_YESTERDAY')}
					</Button>
				</div>
			</div>
			<div className="flex items-center">
				<Button
					onClick={handleOpenProjectMenu}
					className="flex items-center border border-solid border-b-0 rounded-t-xl rounded-b-0 h-40 px-16 text-13 sm:text-16"
					sx={{
						backgroundColor: (theme) => theme.palette.background.default,
						borderColor: (theme) => theme.palette.divider
					}}
					endIcon={
						<FuseSvgIcon
							size={20}
							color="action"
						>
							heroicons-solid:chevron-down
						</FuseSvgIcon>
					}
				>
					{_.find(pacList, ['id', selectedProject.id])?.nombre}
				</Button>
				<Menu
					id="project-menu"
					anchorEl={selectedProject.menuEl}
					open={Boolean(selectedProject.menuEl)}
					onClose={handleCloseProjectMenu}
				>
					{pacList?.length &&
						pacList.map((project) => (
							<MenuItem
								key={`${project.id}-${project.codigo}`}
								onClick={() => {
									handleChangeProject(project.id);
								}}
							>
								{project.nombre}
							</MenuItem>
						))}
				</Menu>
			</div>
		</div>
	);
}

export default ReportsAppHeader;
