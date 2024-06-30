import { Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next";
const StudiesTableNoData = () => {
    const { t } = useTranslation('studiesPage');
    return (
        <Paper className="h-full w-full items-center flex justify-center shadow-none">
            <Typography variant="subtitle1" className="text-gray-400" gutterBottom>
                {t('STUDIES_TABLE_NO_DATA')}
            </Typography>
        </Paper>


    )
}

export default StudiesTableNoData;
