import React from "react";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import usePacServer from "src/app/pac/usePacServer";
import { useGetStudyAltViewerMutation } from "../StudiesApi";
import { showMessage } from "@fuse/core/FuseMessage/fuseMessageSlice";
import { useAppDispatch } from "app/store/hooks";
import { useTranslation } from "react-i18next";
import ShareStudyDialog from "../ShareStudyDialog";
import { openDialog } from "@fuse/core/FuseDialog/fuseDialogSlice";

const PaperProps = {
    elevation: 0,
    sx: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
}

const StudiesTableActions = ({ study }) => {
    const { t } = useTranslation('studiesPage');
    const { getSelectedPac } = usePacServer();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [studiesAltVisor] = useGetStudyAltViewerMutation({ ...study, ...{ servidor: getSelectedPac()?.id } });
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openVisor = (visorUrl: string) => {
        let parsedVisorUrl = visorUrl;
        Object.keys(study).forEach((key) => {
            parsedVisorUrl = parsedVisorUrl.replace(`{{${key}}}`, study[key]);
        });

        window.open(parsedVisorUrl, '_blank').focus();

    };

    const renderOtherVisor = () => {
        return (
            getSelectedPac().otroVisor?.map((eachVisor) => (
                <Tooltip title={`${t('STUDIES_TABLE_ACTIONS_OTHER_VISOR')} ${eachVisor?.tipo}`}>
                    <MenuItem key={`visor-menu-${eachVisor?.tipo}`} onClick={() => openVisor(eachVisor?.url)}>
                        <FuseSvgIcon className="text-46 mr-6" size={24} color="action">{`material-solid:${eachVisor?.icono}`}</FuseSvgIcon>
                        {eachVisor?.tipo}
                    </MenuItem>
                </Tooltip>
            ))
        )
    }

    const openShareDialog = () => {
        dispatch(openDialog({
            children: <ShareStudyDialog study={study} />
        }));
    }

    const openAltViewer = () => {
        studiesAltVisor({
            study,
            server: getSelectedPac()?.id
        }).then(({ data }: any) => {
            if (data.success) {
                window.open(`${data.uriVisor}${data.link}`, '_blank');
            } else {
                if (data.error && data.error == 500) {
                    dispatch(showMessage({ type: 'error', message: data.message }));
                }
            }
        });
    };

    const createCD = () => { console.log('This is a work in progress') }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <Tooltip title={`${t('STUDIES_TABLE_ACTIONS_VISOR_ALT')}`}>
                <IconButton
                    onClick={openAltViewer}
                >
                    <FuseSvgIcon className="text-48" size={24} color="action">feather:monitor</FuseSvgIcon>
                </IconButton>
            </Tooltip>
            <Tooltip title={`${t('STUDIES_TABLE_ACTIONS_SHARE')}`}>
                <IconButton
                    onClick={() => {
                        openShareDialog();
                    }}
                >
                    <FuseSvgIcon className="text-48" size={24} color="action">feather:share-2</FuseSvgIcon>
                </IconButton>
            </Tooltip>
            <Tooltip title={`${t('STUDIES_TABLE_ACTIONS_CD')}`}>
                <IconButton
                    onClick={() => {
                        createCD();
                    }}
                >
                    <FuseSvgIcon className="text-48" size={24} color="action">feather:disc</FuseSvgIcon>
                </IconButton>
            </Tooltip>
            <Button
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                variant="contained"
                aria-controls={open ? 'extra-visor-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                endIcon={<KeyboardArrowDownIcon />}
            >
                <FuseSvgIcon className="text-48" size={24} color="action">feather:eye</FuseSvgIcon>
            </Button>
            <Menu
                anchorEl={anchorEl}
                id="extra-visor-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{ paper: { ...PaperProps } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {renderOtherVisor()}
            </Menu>
        </Box>
    )
};

export default StudiesTableActions;