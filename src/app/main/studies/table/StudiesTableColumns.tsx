import StudiesTableActions from './StudiesTableActions';
import {
    renderPatient,
    renderStudyDescription,
    renderStudyInfo
} from './utils';

export const StudiesTableColumns = (translate: any) => ([
    {
        id: 'customer',
        accessorFn: (row) => renderPatient(row),
        header: translate('STUDIES_TABLE_COLUMN_HEADER_PATIENT'),
        enableSorting: false,
        enableColumnOrdening: true
    },
    {
        id: 'study',
        accessorFn: (row) => renderStudyInfo(row),
        header: translate('STUDIES_TABLE_COLUMN_HEADER_STUDIES'),
        enableSorting: false,
        enableColumnOrdening: true
    },
    {
        id: 'title',
        accessorFn: (row) => renderStudyDescription(row),
        header: translate('STUDIES_TABLE_COLUMN_HEADER_TITLE'),
        enableSorting: false,
        enableColumnOrdening: true
    },
    {
        id: 'date',
        accessorKey: 'StudyDate',
        header: translate('STUDIES_TABLE_COLUMN_HEADER_DATE'),
        enableSorting: true,
        enableColumnOrdening: true
    },
    {
        id: 'actions',
        accessorFn: (row) => <StudiesTableActions study={row} />,
        header: '',
        enableSorting: false,
        enableColumnActions: false,
        enableColumnOrdering: false,
        enableGrouping: false,
        enableHiding: false,
    }
])