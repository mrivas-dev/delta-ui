import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";

const StudiesTableActions = ({ study }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
            <IconButton
                onClick={() =>
                    console.log("First action click")
                }
            >
                <FuseSvgIcon className="text-48" size={24} color="action">feather:monitor</FuseSvgIcon>
            </IconButton>
            <IconButton
                onClick={() => {
                    console.log("Second action click")
                }}
            >
                <FuseSvgIcon className="text-48" size={24} color="action">feather:share-2</FuseSvgIcon>
            </IconButton>
            <IconButton
                onClick={() => {
                    console.log("Third action click")
                }}
            >
                <FuseSvgIcon className="text-48" size={24} color="action">feather:disc</FuseSvgIcon>
            </IconButton>
            <Button
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                variant="contained"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                disableElevation
                endIcon={<KeyboardArrowDownIcon />}
            >
                <FuseSvgIcon className="text-48" size={24} color="action">feather:eye</FuseSvgIcon>
            </Button>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
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
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    )
};

export default StudiesTableActions;