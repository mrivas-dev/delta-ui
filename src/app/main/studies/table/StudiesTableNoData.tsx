import { Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next";
const StudiesTableNoData = () => {
    const { t } = useTranslation('studiesPage');
    return (
        <Paper className="flex flex-col flex-auto p-36 bg-card shadow rounded-b-2xl overflow-hidden">
            <div className="flex flex-col items-center mt-2">
                <Typography variant="h1" className="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500">
                    {t('STUDIES_TABLE_NO_DATA_PLACEHOLDER_TITLE')}
                </Typography>
                <Typography variant="subtitle1" className="text-lg font-medium text-blue-600 dark:text-blue-500" gutterBottom>
                    {t('STUDIES_TABLE_NO_DATA_PLACEHOLDER_SUB_TITLE1')}
                </Typography>
                <Typography variant="subtitle1" className="text-lg font-medium text-blue-600 dark:text-blue-500" gutterBottom>
                    {t('STUDIES_TABLE_NO_DATA_PLACEHOLDER_SUB_TITLE2')}
                </Typography>
            </div>
        </Paper >
    )
}

export default StudiesTableNoData;
