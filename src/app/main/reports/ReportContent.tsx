import { motion } from 'framer-motion';
import ReportFilters from './ReportFilters';
import ReportTable from './table/ReportTable';
import { useGetStudiesMutation } from './ReportsApi';
import { useEffect, useState } from 'react';

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

	const [filters, setFilters] = useState<any>(INITIAL_FILTERS);

	const [studiesMutation] = useGetStudiesMutation({});
	// const getStudies = () => {
	// 	studiesMutation(filters)
	// .then((data) => {
	// 	console.log({ data });
	// });
	// }

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
		studiesMutation(filters).then((data) => {
			console.log({ data });
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
				<ReportTable filters={INITIAL_FILTERS} />
			</motion.div>
		</motion.div>
	);
}

export default ReportContent;
