import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
const StudiesTableNoData = () => {
    const { t } = useTranslation('studiesPage');
    return (
        <Typography variant="subtitle1" className="text-gray-400" gutterBottom>
            {t('STUDIES_TABLE_NO_DATA')}
        </Typography>


    )
}

export default StudiesTableNoData;
