import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { useGetUserPacsQuery } from './HomeApi';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/store/hooks';
import { setUserPacs } from 'src/app/auth/user/store/userSlice';
import HomeHeader from './HomeHeader';

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

function Home() {
	const { t } = useTranslation('homePage');
	const dispatch = useAppDispatch();
	const [pacList, setPacList] = useState<any[]>([]);
	const { data, isLoading } = useGetUserPacsQuery();

	useEffect(() => {
		if(data && data?.pacs){
			dispatch(setUserPacs(data));
			setPacList(data?.pacs);
		}
	}, [data]);

	return (
		<Root
			header={<HomeHeader isLoading={isLoading} pacList={pacList} />}
			content={
				<div className="p-24">
					<h4>{t('CONTENT')}</h4>
					<br />
				</div>
			}
		/>
	);
}

export default Home;
