import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useNavigate, useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/system/Box';
import format from 'date-fns/format';
import _ from '@lodash';
import { useAppDispatch } from 'app/store/hooks';

const Patient = () => {
    const routeParams = useParams();
    const { id: contactId } = routeParams as { id: string };
    const dispatch = useAppDispatch();

    const navigate = useNavigate();


    return (
        <>
            <Box
                className="relative w-full h-160 sm:h-192 px-32 sm:px-48"
                sx={{
                    backgroundColor: 'background.default'
                }}
            >
                <FuseLoading className="min-h-screen" />;
            </Box>
        </>
    );
}

export default Patient;