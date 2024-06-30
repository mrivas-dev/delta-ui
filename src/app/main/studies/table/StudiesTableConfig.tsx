import StudiesTableNoData from "./NoData";

const tableConfig: any = {
    layoutMode: 'semantic',
    enableColumnResizing: true,
    enableRowSelection: true,
    enableColumnFilters: false,
    enableGlobalFilter: false,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableColumnOrdering: true,
    muiPaginationProps: {
        rowsPerPageOptions: [30, 50, 100],
        variant: 'outlined',
        color: 'primary',
        shape: 'rounded',
    },
    renderEmptyRowsFallback: ({ table }) => (
        <StudiesTableNoData />
    ),
    paginationDisplayMode: 'pages',

    muiTopToolbarProps: {
        sx: {
            minHeight: '5.5rem',
            borderRadius: '16px',
        }
    },
    muiBottomToolbarProps: {
        sx: {
            minHeight: '5.5rem',
            borderRadius: '0 0 16px',
        }
    },
    muiTableContainerProps: {
        sx: {
            overflow: 'hidden'
        },
    },
    muiTablePaperProps: {
        sx: {
            padding: '16px',
            marginTop: '16px',
            borderRadius: '16px',
        },
    },
    mrtTheme: (theme) => ({
        baseBackgroundColor: '#fff',
    })
};

export default tableConfig;