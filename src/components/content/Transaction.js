import React, { useState, useRef } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import Grow from '@material-ui/core/Grow'
import {makeStyles, Grid} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { TextField, ClickAwayListener } from '@material-ui/core'
import zIndex from '@material-ui/core/styles/zIndex'

const useStyles = makeStyles({
    form : {
        padding : '50px',
        zIndex: 999
    }
})

export default function Transaction() {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <IconButton
                aria-label="add transaction"
                ref={anchorRef}
                onClick={handleToggle}
            >
                <AddCircleIcon color='secondary' fontSize='large' />
            </IconButton>

            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Card>
                            <ClickAwayListener onClickAway={handleClose}>
                                <Grid container spacing={3}>
                                    <Grid item sm={12}>
                                        Hello
                                    </Grid>
                                    <Grid item sm={12}>
                                        Hello
                                    </Grid>
                                    <Grid item sm={12}>
                                        Hello
                                    </Grid>
                                </Grid>
                            </ClickAwayListener>
                        </Card>
                    </Grow>
                )}
            </Popper>
        </div>
    )
}
