import {
    renderPatient,
    renderStudyActions,
    renderStudyDescription,
    renderStudyInfo
} from './utils';

export const ReportTableColumns = [
    {
        id: 'customer',
        accessorFn: (row) => renderPatient(row),
        header: 'Paciente'
    },
    {
        id: 'study',
        accessorFn: (row) => renderStudyInfo(row),
        header: 'Estudio'
    },
    {
        id: 'title',
        accessorFn: (row) => renderStudyDescription(row),
        header: 'Titulo'
    },
    {
        id: 'date',
        accessorKey: 'StudyDate',
        header: 'Fecha'
    },
    {
        id: 'actions',
        accessorFn: (row) => renderStudyActions(row),
        header: ''
    }
]