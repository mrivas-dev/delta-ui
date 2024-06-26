import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StudiesFilters from './StudiesFilters';
import StudiesTable from './table/StudiesTable';
import { useGetStudiesMutation } from './StudiesApi';
import usePacServer from 'src/app/pac/usePacServer';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { changeStudiesTextFilters, selectStudiesFilter } from './filters/slice';

const container = {
	show: {
		transition: {
			staggerChildren: 0.04
		}
	}
};

const item = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0 }
};

const StudiesContent = () => {

	const { getSelectedPac } = usePacServer();
	const dispatch = useAppDispatch();
	const filters = useAppSelector(selectStudiesFilter);
	const [studiesData, setStudiesData] = useState<any[]>([]);
	const [studiesLoading, setStudiesLoading] = useState<boolean>(false);
	const [studiesMutation] = useGetStudiesMutation({});

	useEffect(() => {
		if (!filters.texto?.servidor || getSelectedPac()?.id !== filters.texto?.servidor) {
			dispatch(changeStudiesTextFilters({ servidor: getSelectedPac()?.id }));
		}
	}, [getSelectedPac]);

	useEffect(() => {
		setStudiesLoading(true);
		studiesMutation(filters).then((response: any) => {
			if (response?.data?.success) {
				setStudiesData(response?.data?.data);
			}
			setStudiesLoading(false);
		});
	}, [filters]);

	return (
		<motion.div
			className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-24 w-full min-w-0 p-24"
			variants={container}
			initial="hidden"
			animate="show"
		>
			<motion.div
				variants={item}
				className="sm:col-span-2 md:col-span-4"
			>
				<StudiesFilters />
				<StudiesTable isLoading={studiesLoading} studies={studiesData} />
			</motion.div>
		</motion.div>
	);
}

export default StudiesContent;
