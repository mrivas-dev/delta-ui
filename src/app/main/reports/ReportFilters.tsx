import { useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Box, Button, Checkbox, Collapse, FormControl, IconButton, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import en from './i18n/en';
import es from './i18n/es';
import { MODALITY_LIST } from './ReportContent';
import { DateTimePicker } from '@mui/x-date-pickers';

i18next.addResourceBundle('en', 'reportsPage', en);
i18next.addResourceBundle('es', 'reportsPage', es);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const CalendarIcon = () => {
    return <FuseSvgIcon>feather:calendar</FuseSvgIcon>
}


const ReportFilters = ({ filters, changeFilters }) => {
    const { t } = useTranslation('reportsPage');
    const [showFilters, setShowFilters] = useState(true);

    const changeTextFilters = (newFilters) => {
        const textFilters = { ...filters.texto, ...newFilters };
        changeFilters({ ...filters, ...{ texto: textFilters } });
    };

    return (
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
            <Box className="pb-12">
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
            </Box>
            <Collapse in={showFilters}>
                <Stack
                    direction={{ md: 'column', lg: 'row' }}
                    justifyContent={{ md: 'center', lg: 'space-between' }}>
                    <Stack
                        direction={{ md: 'column', lg: 'row' }}
                    >
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-studies">Buscar estudios</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-studies"
                                type="text"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FuseSvgIcon>feather:search</FuseSvgIcon>
                                    </InputAdornment>
                                }
                                label="Buscar estudios"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <DatePicker
                                label="Fecha"
                                onChange={(pickedFromDate: any) => {
                                    changeTextFilters({ fecha: new Date(pickedFromDate).toISOString() })
                                }}
                                slotProps={{
                                    textField: {
                                        id: 'filter-date',
                                        label: 'Fecha',
                                        InputLabelProps: {
                                            shrink: true
                                        },
                                        fullWidth: true,
                                        variant: 'outlined'
                                    },
                                    actionBar: {
                                        actions: ['clear', 'today']
                                    }
                                }}
                                slots={{
                                    openPickerIcon: CalendarIcon
                                }}
                            />
                        </FormControl>
                        <div>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel id="study-modality-label">Estudio</InputLabel>
                                <Select
                                    labelId="study-modality-label"
                                    id="study-modality"
                                    multiple
                                    onChange={(event: any) => {
                                        const {
                                            target: { value },
                                        } = event;
                                        changeTextFilters({ tipoEst: value })
                                    }}
                                    value={filters?.texto?.tipoEst}
                                    input={
                                        <OutlinedInput
                                            id="outlined-adornment-team"
                                            type="text"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <FuseSvgIcon>feather:settings</FuseSvgIcon>
                                                </InputAdornment>
                                            }
                                            label="Buscar estudios"
                                        />
                                    }
                                    renderValue={(selected: any) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    variant="outlined"
                                >
                                    {MODALITY_LIST.map((modality: string) => (
                                        <MenuItem key={modality} value={modality}>
                                            <Checkbox checked={filters?.texto?.tipoEst.indexOf(modality) > -1} />
                                            <ListItemText primary={modality} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel id="study-team-label">Equipo</InputLabel>
                                <Select
                                    labelId="study-team-label"
                                    id="study-team"
                                    multiple
                                    onChange={(event: any) => {
                                        const {
                                            target: { value },
                                        } = event;
                                        changeTextFilters({ tipoEst: value })
                                    }}
                                    value={filters?.texto?.tipoEst}
                                    input={
                                        <OutlinedInput
                                            id="outlined-adornment-team"
                                            type="text"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <FuseSvgIcon>feather:file-text</FuseSvgIcon>
                                                </InputAdornment>
                                            }
                                            label="Buscar equipo"
                                        />

                                    }
                                    renderValue={(selected: any) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    variant="outlined"
                                >
                                    {MODALITY_LIST.map((modality: string) => (
                                        <MenuItem key={modality} value={modality}>
                                            <Checkbox checked={filters?.texto?.tipoEst.indexOf(modality) > -1} />
                                            <ListItemText primary={modality} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Stack>
                    <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
                        <Button
                            className="whitespace-nowrap"
                            variant="outlined"
                            onClick={() => { changeFilters({ searchApproved: !filters.searchApproved }) }}
                            color={filters.searchApproved ? 'secondary' : 'primary'}
                        >
                            {t('REPORTS_FILTER_APPROVED')}
                        </Button>
                        <Button
                            className="whitespace-nowrap"
                            variant="outlined"
                            onClick={() => { changeFilters({ searchSigned: !filters.searchSigned }) }}
                            color={filters.searchSigned ? 'secondary' : 'primary'}
                        >
                            {t('REPORTS_FILTER_SIGNED')}
                        </Button>
                    </div>
                </Stack>
            </Collapse>
        </Paper>

    );
}

export default ReportFilters;
