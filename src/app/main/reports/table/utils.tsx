import Chip from '@mui/material/Chip';
import PatientListItem from "./Patient"
import { Box, IconButton } from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Email as EmailIcon,
  } from '@mui/icons-material';

export const renderPatient = (row) => {
    return <PatientListItem patient={row} />;
};

export const renderStudyInfo = (row) => {
    return <Chip label={`${row?.Modality} #${row?.StudyInstanceUID.split(".")[0]}`} color="success" />
};

export const renderStudyDescription = (row) => {
    return `${row?.StudyDescription || 'Sin datos'}`
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



