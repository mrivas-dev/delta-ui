import { motion } from 'framer-motion';
import ReportFilters from './ReportFilters';
import ReportTable from './table/ReportTable';
import { useGetStudiesMutation } from './ReportsApi';
import { useEffect, useState } from 'react';
import usePacServer from 'src/app/pac/usePacServer';

const PAGE_QUANTITY = 10;

const INITIAL_FILTERS = {
	columna: null,
	cuantos: PAGE_QUANTITY,
	direccion: null,
	pag: 0,
	texto: {
		datosEst: "",
		fecha: "",
		hasta: "",
		hastaVisible: false,
		paciente: "",
		servidor: 1,
		tipoBusqueda: "EST",
		tipoEst: [],
	}
}

const ReportContent = () => {
	const { getSelectedPac } = usePacServer();
	const [filters, setFilters] = useState<any>(INITIAL_FILTERS);
	const [studiesData, setStudiesData] = useState<any[]>([]);
	const [studiesLoading, setStudiesLoading] = useState<boolean>(false);
	const [studiesMutation] = useGetStudiesMutation({});

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

	const onFiltersChange = (newFilters) => {
		setFilters(newFilters);
	}

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
				<ReportFilters initialFilters={INITIAL_FILTERS} changeFilters={onFiltersChange} />
				<ReportTable isLoading={studiesLoading} studies={studiesData} filters={INITIAL_FILTERS} />
			</motion.div>
		</motion.div>
	);
}

export default ReportContent;
