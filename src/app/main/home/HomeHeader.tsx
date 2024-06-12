import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import _ from '@lodash';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/store/hooks';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import en from './i18n/en';
import es from './i18n/es';
import i18next from 'i18next';

i18next.addResourceBundle('en', 'homePage', en);
i18next.addResourceBundle('es', 'homePage', es);
/**
 * The HomeHeader page.
 */
const HomeHeader = ({ isLoading, pacList }) => {
	const { t } = useTranslation('homePage');
	const { user } = useAppSelector(selectUser);
	const [selectedFilter, setSelectedFilter] = useState<string>("TODAY");

	const [selectedPac, setSelectedPac] = useState<{ id: number; menuEl: HTMLElement | null }>({
		id: 1,
		menuEl: null
	});

	function handleChangePac(id: number) {
		setSelectedPac({
			id,
			menuEl: null
		});
	}

	function handleOpenPacMenu(event: React.MouseEvent<HTMLElement>) {
		setSelectedPac({
			id: selectedPac.id,
			menuEl: event.currentTarget
		});
	}

	function handleClosePacMenu() {
		setSelectedPac({
			id: selectedPac.id,
			menuEl: null
		});
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<div className="flex flex-col w-full px-24 sm:px-32">
			<div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 my-32 sm:my-48">
				<div className="flex flex-auto items-center min-w-0">
					<div className="flex flex-col min-w-0 mx-16">
						<Typography className="text-2xl md:text-5xl font-semibold tracking-tight leading-7 md:leading-snug truncate">
							{`${t('HOME_HEADER_TITLE')} ${user.name}`}
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
					onClick={handleOpenPacMenu}
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
					{_.find(pacList, ['id', selectedPac.id])?.nombre}
				</Button>
				<Menu
					id="pac-menu"
					anchorEl={selectedPac.menuEl}
					open={Boolean(selectedPac.menuEl)}
					onClose={handleClosePacMenu}
				>
					{pacList &&
						pacList.map((project) => (
							<MenuItem
								key={project.id}
								onClick={() => {
									handleChangePac(project.id);
								}}
							>
								{project.nombre}
							</MenuItem>
						))}
				</Menu>
			</div>
		</div>
	);
};

export default HomeHeader;
