import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { darken, styled } from '@mui/material/styles';
import { StudiesType } from '../ReportsApi';

type PatientListItemPropsType = {
    patient: StudiesType;
};

/**
 * The Patient list item.
 * 
 * 
 * 
 * 
 */
const PatientListItem = (patient: PatientListItemPropsType) => {

    const parsePatientName = (name: string) => {
        const splitedName = name.split("^");
        const lastName = splitedName[0].charAt(0).toUpperCase() + splitedName[0].slice(1).toLocaleLowerCase();
        const firstName = splitedName[1].charAt(0).toUpperCase() + splitedName[1].slice(1).toLocaleLowerCase();
        const secondName = splitedName.length > 1 ? splitedName[2]?.charAt(0).toUpperCase() + splitedName[2]?.slice(1).toLocaleLowerCase() : '';
        return `${lastName}, ${firstName}${secondName ? ` ${secondName}` : ''}`;
    }

    return (
        <div className="flex">
            <Avatar
                sx={{
                    background: (theme) => darken(theme.palette.background.default, 0.05),
                    color: (theme) => theme.palette.text.secondary
                }}
                className="md:mx-4"
            >
                {patient.patient?.PatientName?.charAt(0)}
            </Avatar>
            <div className="min-h-40 min-w-40 p-0 md:px-16 md:py-6">
                <Typography
                    component="span"
                    className="flex font-semibold"
                >
                    {parsePatientName(patient.patient.PatientName)}
                </Typography>
                <Typography
                    className="text-11 font-medium capitalize"
                    color="text.secondary"
                >
                    {`${patient?.patient?.PatientID} - ${patient?.patient?.StudyDate}`}
                </Typography>
            </div>
        </div>



    );
}

export default PatientListItem;
