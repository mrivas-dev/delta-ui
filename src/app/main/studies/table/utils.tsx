import Chip from '@mui/material/Chip';
import PatientListItem from "./Patient"
import { Box, IconButton, Typography } from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Email as EmailIcon,
} from '@mui/icons-material';
import { ModalityList, StudiesType } from '../StudiesType';

export const MODALITY_LIST = ["CR", "CT", "DX", "MG", "MR", "OT", "PR", "US", "XA"];


export const MODALITY: ModalityList[] = [
    { id: "CR", label: "CR", color: '#0892A5' },
    { id: "CT", label: "CT", color: '#06908F' },
    { id: "DX", label: "DX", color: '#0CA4A5' },
    { id: "MG", label: "MG", color: '#DBB68F' },
    { id: "MR", label: "MR", color: '#BB7E5D' },
    { id: "OT", label: "OT", color: '#D4C5E2' },
    { id: "PR", label: "PR", color: '#C9D7F8' },
    { id: "US", label: "US", color: '#A7E2E3' },
    { id: "XA", label: "XA", color: '#80CFA9' }
]

export const renderPatient = (row: StudiesType) => {
    return <PatientListItem patient={row}/>;
};

export const renderStudyInfo = (row) => {
    const color = MODALITY.find((mod)=> mod?.id === row?.Modality)?.color;
    return <Chip label={`${row?.Modality} #${row?.AccessionNumber}`} style={{backgroundColor: color}} />
};

export const renderStudyDescription = (row) => {
    return row?.StudyDescription
        ? `${row?.StudyDescription}`
        : <Typography variant="subtitle1" className="text-gray-400" gutterBottom>
            Sin datos
        </Typography>
};

export const renderStudyActions = (row) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <IconButton
                onClick={() =>
                    console.log("First action click")
                }
            >
                <EmailIcon />
            </IconButton>
            <IconButton
                onClick={() => {
                    console.log("Second action click")
                }}
            >
                <EditIcon />
            </IconButton>
            <IconButton
                onClick={() => {
                    console.log("Third action click")
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Box>
    )
};



