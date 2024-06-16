import { useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Button, Collapse, IconButton, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const ReportFilters = ({ initialFilters, changeFilters }) => {
    const [showFilters, setShowFilters] = useState(true);

    return (
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
            <div>
                Filtrar
                <IconButton
                    disableRipple
                    className="h-16 w-16 p-0 ltr:ml-4 rtl:mr-4"
                    color="inherit"
                    onClick={() => { setShowFilters((prev) => !prev) }}
                    size="large"
                >
                    <FuseSvgIcon
                        size={16}
                        className="arrow-icon"
                    >
                        {showFilters
                            ? 'heroicons-outline:arrow-sm-down'
                            : 'heroicons-outline:arrow-sm-up'}
                    </FuseSvgIcon>
                </IconButton>
            </div>
            <Collapse in={showFilters}>
                <Stack
                    direction={{ md: 'column', lg: 'row' }}
                    justifyContent={{ md: 'center', lg: 'space-between' }}>
                    <Stack
                        direction={{ md: 'column', lg: 'row' }}
                    >
                        <Paper
                            component="form"
                            variant='outlined'
                            sx={{ p: '2px 4px', margin: '0 10px 0 0', display: 'flex', alignItems: 'center', width: "25%" }}
                        >
                            <div className="ml-10 mt-10 mb-10">
                                <FuseSvgIcon>feather:search</FuseSvgIcon>
                            </div>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Buscar estudio"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                        </Paper>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker disableFuture label="Fecha" />
                        </LocalizationProvider>
                        <Paper
                            component="form"
                            variant='outlined'
                            sx={{ p: '2px 4px', margin: '0 10px', display: 'flex', alignItems: 'center', width: "25%" }}
                        >
                            <div className="ml-10 mt-10 mb-10">
                                <FuseSvgIcon>feather:settings</FuseSvgIcon>
                            </div>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Equipo"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                        </Paper>
                        <Paper
                            component="form"
                            variant='outlined'
                            sx={{ p: '2px 4px', margin: '0 10px', display: 'flex', alignItems: 'center', width: "25%" }}
                        >
                            <div className="ml-10 mt-10 mb-10">
                                <FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
                            </div>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Estudio"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                        </Paper>
                    </Stack>
                    <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
                        <Button
                            className="whitespace-nowrap"
                            variant="outlined"
                            color="primary"
                        >
                            Aprobados
                        </Button>
                        <Button
                            className="whitespace-nowrap"
                            variant="outlined"
                            color="primary"
                        >
                            Firmados
                        </Button>
                    </div>
                </Stack>
            </Collapse>
        </Paper>

    );
}

export default ReportFilters;
