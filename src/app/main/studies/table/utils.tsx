import Chip from '@mui/material/Chip';
import PatientListItem from "./Patient"
import { Tooltip } from '@mui/material';
import { ModalityList, StudiesType } from '../StudiesType';
import EmptyColumn from './EmptyColumn';

export const MODALITY_LIST = ["CR", "CT", "DX", "MG", "MR", "OT", "PR", "US", "XA"];

export const MODALITY: ModalityList[] = [
    { id: "CR", label: "CR", description: "CR", color: '#0892A5' },
    { id: "CT", label: "CT", description: "CT", color: '#06908F' },
    { id: "DX", label: "DX", description: "DX", color: '#0CA4A5' },
    { id: "MG", label: "MG", description: "MG", color: '#DBB68F' },
    { id: "MR", label: "MR", description: "MR", color: '#BB7E5D' },
    { id: "OT", label: "OT", description: "OT", color: '#D4C5E2' },
    { id: "PR", label: "PR", description: "PR", color: '#C9D7F8' },
    { id: "US", label: "US", description: "US", color: '#A7E2E3' },
    { id: "XA", label: "XA", description: "XA", color: '#80CFA9' }
]

export const renderPatient = (row: StudiesType) => {
    return <PatientListItem patient={row} />;
};

export const renderStudyInfo = (row) => {
    const modalityInfo = MODALITY.find((mod) => mod?.id === row?.Modality);
    const color = modalityInfo?.color;
    const description = modalityInfo?.description;

    return (
        <Tooltip title={description}>
            <Chip label={`${row?.Modality} ${row?.AccessionNumber && `#${row?.AccessionNumber}`}`} style={{ cursor: 'pointer', backgroundColor: color }} />
        </Tooltip>
    )
};

export const renderStudyDescription = (row) => {
    return row?.StudyDescription
        ? `${row?.StudyDescription}`
        : <EmptyColumn />
};



