import { useEffect, useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
    Box,
    Button,
    Checkbox,
    Collapse,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Stack
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { es } from 'date-fns/locale';
import english from './i18n/en';
import spanish from './i18n/es';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { changeStudiesTextFilters, selectStudiesFilter } from './filters/slice';
import { MODALITY } from './table/utils';
import { ModalityList } from './StudiesType';

i18next.addResourceBundle('en', 'studiesPage', english);
i18next.addResourceBundle('es', 'studiesPage', spanish);

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

const StudiesFilters = () => {
    const { t } = useTranslation('studiesPage');
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectStudiesFilter);
    const [showFilters, setShowFilters] = useState(true);
    const [studiesInputValue, setStudiesInputValue] = useState("");

    const changeTextFilters = (newFilters) => {
        dispatch(changeStudiesTextFilters(newFilters));
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            changeTextFilters({ datosEst: studiesInputValue });
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [studiesInputValue, 500]);

    return (
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
            <Box className="pb-12">
                {t('STUDIES_FILTER')}
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
                            <InputLabel htmlFor="outlined-adornment-studies">{t('STUDIES_FILTER_SEARCH_STUDIES')}</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-studies"
                                type="text"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FuseSvgIcon>feather:search</FuseSvgIcon>
                                    </InputAdornment>
                                }
                                onChange={(event) => { setStudiesInputValue(event.target.value); }}
                                label={t('STUDIES_FILTER_SEARCH_STUDIES')}
                            />
                        </FormControl>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <DatePicker
                                    label="Fecha"
                                    value={new Date(filters?.texto?.fecha)}
                                    onChange={(pickedFromDate: any) => {
                                        changeTextFilters({ fecha: new Date(pickedFromDate).toISOString() })
                                    }}
                                    slotProps={{
                                        textField: {
                                            id: 'filter-date',
                                            label: `${t('STUDIES_FILTER_DATE')}`,
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            fullWidth: true,
                                            variant: 'outlined'
                                        },
                                        inputAdornment: {
                                            position: 'start',
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
                        </LocalizationProvider>
                        <div>
                            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                                <InputLabel id="study-modality-label">{t('STUDIES_FILTER_MODALITY')}</InputLabel>
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
                                            label={t('STUDIES_FILTER_MODALITY')}
                                        />
                                    }
                                    renderValue={(selected: any) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    variant="outlined"
                                >
                                    {MODALITY.map((modality: ModalityList) => (
                                        <MenuItem key={modality.id} value={modality.label}>
                                            <Checkbox checked={filters?.texto?.tipoEst.indexOf(modality.id) > -1} />
                                            <ListItemText primary={modality.label} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        {/* <div>
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
                        </div> */}
                    </Stack>
                    <div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
                        <Button
                            className="whitespace-nowrap"
                            variant="outlined"
                        >
                            {t('STUDIES_FILTER_APPROVED')}
                        </Button>
                        <Button
                            className="whitespace-nowrap"
                            variant="outlined"
                        >
                            {t('STUDIES_FILTER_SIGNED')}
                        </Button>
                    </div>
                </Stack>
            </Collapse>
        </Paper>

    );
}

export default StudiesFilters;
