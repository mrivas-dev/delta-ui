import { useNavigate, useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/system/Box';
import _ from '@lodash';
import { useAppDispatch } from 'app/store/hooks';
import { useGetStudiesMutation } from '../StudiesApi';
import { useEffect, useState } from 'react';
import usePacServer from 'src/app/pac/usePacServer';
import { StudiesType } from '../StudiesType';
import { getNameInitials, parsePatientName } from 'app/theme-layouts/shared-components/userUtils';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import { renderStudyInfo } from '../table/utils';
import ArrowRight from '@mui/icons-material/ArrowRight';


const INITIAL_FILTERS = {
    columna: "StudyDate",
    cuantos: 10,
    datosEst: "",
    direccion: "desc",
    fecha: null,
    paciente: "",
    pag: 0,
    servidor: 1,
    tipoEst: []
}

const Patient = () => {
    const routeParams = useParams();
    const { getSelectedPac } = usePacServer();

    const { id: patientId } = routeParams as { id: string };

    const [patientLoading, setPatientLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [studiesMutation] = useGetStudiesMutation({});
    const [studiesInfo, setStudiesInfo] = useState<StudiesType[]>([])

    useEffect(() => {
        setPatientLoading(true);
        studiesMutation({
            ...INITIAL_FILTERS,
            ...{
                servidor: getSelectedPac()?.id,
                paciente: `${patientId}`
            }
        }).then((response: any) => {
            if (response?.data?.success) {
                setStudiesInfo(response?.data?.data);
            }
            setPatientLoading(false);
        });
    }, [patientId]);

    if (patientLoading) {
        return <FuseLoading className="min-h-screen" />;
    }

    if (!patientId) {
        return null;
    }

    return (
        <>
            <Box
				className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
				sx={{ backgroundColor: 'primary.main' }}
			>
				<svg
					className="pointer-events-none absolute inset-0"
					viewBox="0 0 960 540"
					width="100%"
					height="100%"
					preserveAspectRatio="xMidYMax slice"
					xmlns="http://www.w3.org/2000/svg"
				>
					<Box
						component="g"
						sx={{ color: 'primary.light' }}
						className="opacity-20"
						fill="none"
						stroke="currentColor"
						strokeWidth="100"
					>
						<circle
							r="234"
							cx="196"
							cy="23"
						/>
						<circle
							r="234"
							cx="790"
							cy="491"
						/>
					</Box>
				</svg>
				<Box
					component="svg"
					className="absolute -right-64 -top-64 opacity-20"
					sx={{ color: 'primary.light' }}
					viewBox="0 0 220 192"
					width="220px"
					height="192px"
					fill="none"
				>
					<defs>
						<pattern
							id="837c3e70-6c3a-44e6-8854-cc48c737b659"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect
								x="0"
								y="0"
								width="4"
								height="4"
								fill="currentColor"
							/>
						</pattern>
					</defs>
					<rect
						width="220"
						height="192"
						fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
					/>
				</Box>
				{/* <div className="relative z-10 w-full max-w-2xl">
					<div className="text-7xl font-bold leading-none text-gray-100">
						<div>{getNameInitials(studiesInfo[0]?.PatientName)}</div>
					</div>
				</div> */}
			</Box>
            <div className="relative flex flex-col flex-auto items-center p-24 pt-0 sm:p-48 sm:pt-0">
                <div className="w-full max-w-3xl">
                    <div className="flex flex-auto items-end -mt-64">
                        <Avatar
                            sx={{
                                borderWidth: 4,
                                borderStyle: 'solid',
                                borderColor: 'background.paper',
                                backgroundColor: 'background.default',
                                color: 'text.secondary'
                            }}
                            className="w-128 h-128 text-64 font-bold"
                        >
                            {getNameInitials(studiesInfo[0]?.PatientName)}
                        </Avatar>
                        {/* <div className="flex items-center ml-auto mb-4">
							<Button
								variant="contained"
								color="secondary"
								component={NavLinkAdapter}
								to="edit"
							>
								<FuseSvgIcon size={20}>heroicons-outline:pencil-alt</FuseSvgIcon>
								<span className="mx-8">Edit</span>
							</Button>
						</div> */}
                    </div>
                    <Typography className="mt-12 text-4xl font-bold truncate">{parsePatientName(studiesInfo[0]?.PatientName)}</Typography>
                    <Divider className="mt-16 mb-24" />
                    <div className="flex flex-col space-y-32">
                        <div className="flex items-center">
                            <FuseSvgIcon>heroicons-outline:identification</FuseSvgIcon>
                            <div className="ml-24 leading-6"> {studiesInfo[0]?.PatientID} </div>
                        </div>
                        <div className="flex items-center">
                            <FuseSvgIcon>heroicons-outline:cake</FuseSvgIcon>
                            <div className="ml-24 leading-6"> {studiesInfo[0]?.PatientBirthDate} </div>
                        </div>
                    </div>
                    <Divider className="mt-16 mb-24" />
                    <List
                        sx={{ bgcolor: 'background.paper' }}
                    >
                        {studiesInfo?.map((study) => {
                            return (
                                <ListItem className="pl-0 pr-0 w-100">
                                    <ListItemIcon>
                                        {renderStudyInfo(study)}
                                    </ListItemIcon>
                                    <ListItemText className="flex justify-center">
                                        {study?.StudyDate} - {study?.StudyTime}
                                    </ListItemText>
                                    <IconButton aria-label="Go to study">
                                        <FuseSvgIcon>heroicons-outline:arrow-circle-right</FuseSvgIcon>
                                    </IconButton>
                                </ListItem>
                            )
                        })}
                    </List>

                </div>
            </div>
        </>
    );
}

export default Patient;