import { closeDialog } from '@fuse/core/FuseDialog/fuseDialogSlice';
import { Button } from '@mui/base';
import { DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useAppDispatch } from 'app/store/hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';

const ShareStudyDialog = ({ study }) => {
    const { t } = useTranslation('studiesPage');
    const dispatch = useAppDispatch();
    return (
        <React.Fragment>
            <DialogTitle id="alert-dialog-title">{t('STUDIES_SHARE_DIALOG_TITLE')}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Insert DATAAAA
                </DialogContentText>
            </DialogContent>
            <DialogActions className="m-24">
                <Button onClick={() => dispatch(closeDialog())} color="primary">
                    {t('STUDIES_SHARE_DIALOG_ACTION_CLOSE')}
                </Button>
                <Button onClick={() => dispatch(closeDialog())} color="primary" autoFocus>
                    {t('STUDIES_SHARE_DIALOG_ACTION_SHARE')}
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

export default ShareStudyDialog;
