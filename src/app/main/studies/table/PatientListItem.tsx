import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { darken } from '@mui/material/styles';
import { StudiesType } from '../StudiesType';
import usePacServer from 'src/app/pac/usePacServer';
import { useNavigate } from 'react-router';
import { parsePatientName } from 'app/theme-layouts/shared-components/userUtils';

type PatientListItemPropsType = {
    patient: StudiesType;
};

const PatientListItem = (patient: PatientListItemPropsType) => {
    const navigate = useNavigate();
    const { getSelectedPac } = usePacServer();

    const imagePath = `${getSelectedPac()?.uriVisor}im1/${patient.patient?.StudyInstanceUID}?s=${getSelectedPac()?.id}`;

    const onPatientClick = () => {
        navigate(`/studies/${patient.patient.PatientID}`);
    }

    return (
        <div className="flex cursor-pointer" onClick={() => onPatientClick()}>
            <Avatar
                sx={{
                    background: (theme) => darken(theme.palette.background.default, 0.05),
                    color: (theme) => theme.palette.text.secondary,
                    width: 75,
                    height: 75
                }}
                className="md:mx-4"
                src={imagePath}
            />
            <div className="min-h-40 min-w-40 p-0 md:px-16 md:py-6">
                <Typography
                    component="span"
                    className="flex font-semibold"
                >
                    {parsePatientName(patient.patient?.PatientName)}
                </Typography>
                <Typography
                    className="text-11 font-medium capitalize"
                    color="text.secondary"
                >
                    {`${patient?.patient?.PatientID} - ${patient?.patient?.PatientBirthDate}`}
                </Typography>
            </div>
        </div>
    );
}

export default PatientListItem;