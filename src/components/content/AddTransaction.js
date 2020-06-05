import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Divider } from '@material-ui/core';
import Categories from './Categories';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    form : {
        margin: '30px 50px'
    },
    formControl : {
        marginBottom: '30px'
    }
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
            <form noValidate autoComplete="off" className={classes.form}>
                <Categories className={classes.formControl} />
                <TextField className={classes.formControl} label="Detail" multiline={true} fullWidth={true} />
                <TextField className={classes.formControl} label="Amount" type='number' fullWidth={true} />
                <Button variant="contained" color="primary" fullWidth={true}>
                    ADD
                </Button>
            </form>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default function AddTransaction() {
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