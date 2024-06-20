import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import HomeHeader from './HomeHeader';
import HomeContent from './HomeContent';
import { useGetHomeWidgetsQuery } from './HomeApi';
import FuseLoading from '@fuse/core/FuseLoading';
import usePacServer from 'src/app/pac/usePacServer';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`
	}
}));

const Home = () => {
	const { isLoading } = useGetHomeWidgetsQuery();
	const { isPacServerProviderListLoading } = usePacServer();
	if (isLoading || isPacServerProviderListLoading) {
		return <FuseLoading />;
	}
	return (
		<Root
			header={<HomeHeader />}
			content={
				<div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
					<HomeContent />
				</div>
			}
		/>
	);
}

export default Home;
