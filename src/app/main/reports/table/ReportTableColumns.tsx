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
        header: 'Paciente',
        enableSorting: false,
        enableColumnOrdening: true
    },
    {
        id: 'study',
        accessorFn: (row) => renderStudyInfo(row),
        header: 'Estudio',
        enableSorting: false,
        enableColumnOrdening: true
    },
    {
        id: 'title',
        accessorFn: (row) => renderStudyDescription(row),
        header: 'Titulo',
        enableSorting: false,
        enableColumnOrdening: true
    },
    {
        id: 'date',
        accessorKey: 'StudyDate',
        header: 'Fecha',
        enableSorting: true,
        enableColumnOrdening: true
    },
    {
        id: 'actions',
        accessorFn: (row) => renderStudyActions(row),
        header: '',
        enableSorting: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
        enableGrouping: false,
        enableHiding: false,
    }
]