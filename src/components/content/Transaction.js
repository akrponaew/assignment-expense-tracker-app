import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Divider, Grid } from '@material-ui/core';
import Categories from './Categories';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            <DialogTitle id="simple-dialog-title">Add Transaction</DialogTitle>
            <Divider />
            hello
            {/* <List>
                <ListItem>
                    <Grid container>
                        <Grid item xs={3}>
                            <Categories />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Detail" multiline={true} fullWidth={true} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField label="Amount" type='number' fullWidth={true} />
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" color="primary" fullWidth={true}>
                                ADD
                        </Button>
                        </Grid>
                    </Grid>

                </ListItem>
            </List> */}
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function Transaction() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false)
    };

    return (
        <div>
            {/* <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
            <br />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open simple dialog
      </Button>*/}
            <SimpleDialog open={open} onClose={handleClose} />
            <IconButton
                aria-label="add transaction"
                ref={anchorRef}
                onClick={handleClickOpen}
            >
                <AddCircleIcon color='secondary' fontSize='large' />
            </IconButton>
        </div>
    );
}


// import React, { useState, useRef } from 'react'
// import IconButton from '@material-ui/core/IconButton'
// import Popper from '@material-ui/core/Popper'
// import Paper from '@material-ui/core/Paper'
// import Card from '@material-ui/core/Card'
// import Grow from '@material-ui/core/Grow'
// import {makeStyles, Grid} from '@material-ui/core'
// import AddCircleIcon from '@material-ui/icons/AddCircle'
// import { TextField, ClickAwayListener } from '@material-ui/core'
// import zIndex from '@material-ui/core/styles/zIndex'

// const useStyles = makeStyles({
//     form : {
//         padding : '50px',
//         zIndex: 999
//     }
// })

// export default function Transaction() {
//     const classes = useStyles()
//     const [open, setOpen] = useState(false)
//     const anchorRef = useRef(null);

//     const handleToggle = () => {
//         setOpen((prevOpen) => !prevOpen);
//     };

//     const handleClose = (event) => {
//         if (anchorRef.current && anchorRef.current.contains(event.target)) {
//             return;
//         }

//         setOpen(false);
//     };

//     return (
//         <div>
//             <IconButton
//                 aria-label="add transaction"
//                 ref={anchorRef}
//                 onClick={handleToggle}
//             >
//                 <AddCircleIcon color='secondary' fontSize='large' />
//             </IconButton>

//             <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal >
//                 {({ TransitionProps, placement }) => (
//                     <Grow
//                         {...TransitionProps}
//                         style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
//                     >
//                         <Card>
//                             <ClickAwayListener onClickAway={handleClose}>
//                                 <Grid container spacing={3}>
//                                     <Grid item sm={12}>
//                                         Hello
//                                     </Grid>
//                                     <Grid item sm={12}>
//                                         Hello
//                                     </Grid>
//                                     <Grid item sm={12}>
//                                         Hello
//                                     </Grid>
//                                 </Grid>
//                             </ClickAwayListener>
//                         </Card>
//                     </Grow>
//                 )}
//             </Popper>
//         </div>
//     )
// }
