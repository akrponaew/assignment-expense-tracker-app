import React, { useState, useRef, useEffect } from 'react'
import { red } from '@material-ui/core/colors'
import Popper from '@material-ui/core/Popper'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { makeStyles, Divider } from '@material-ui/core'
import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'
import JwtDecode from 'jwt-decode'

const useStyles = makeStyles({
    red: {
        color: '#fff',
        backgroundColor: red[500],
    },

    textcenter: {
        justifyContent: 'center',
    }
})

export default function Profile() {
    const history = useHistory()
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState([])
    const anchorRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token')
        const _profile = JwtDecode(token)
        setProfile(_profile)
    }, [])

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleClick = () => {
        localStorage.removeItem('token')
        history.push('/')
    }

    return (
        <div>
            <IconButton
                color="inherit"
                ref={anchorRef}
                onClick={handleToggle}>
                <Avatar className={classes.red}>{profile.name ? profile.name.substring(0, 1) : ''}</Avatar>
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} placement='bottom-end' role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose} >
                                <MenuList autoFocusItem={open} >
                                    <MenuItem disabled={true}>
                                        {profile.name} {profile.lastname}
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem className={classes.textcenter} onClick={handleClick}>
                                        Logout
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}
