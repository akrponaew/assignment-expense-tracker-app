import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Divider } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import axios from 'axios'
import JwtDecode from 'jwt-decode'
import SaveIcon from '@material-ui/icons/Save'
import moment from 'moment'

const _categories = [
    {
        value: 'Food & Drink',
        label: 'Food & Drink',
    },
    {
        value: 'Travel',
        label: 'Travel',
    },
    {
        value: 'Clothes',
        label: 'Clothes',
    },
    {
        value: 'Sport',
        label: 'Sport',
    },
    {
        value: 'Other',
        label: 'Other',
    }
]

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    form: {
        margin: '30px 50px'
    },
    formControl: {
        marginBottom: '25px'
    }
})

function SimpleDialog(props) {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0)
    const [categories, setCategories] = useState('Food & Drink');
    const [save, setSave] = useState(true)
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date._d);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        const profile = JwtDecode(token)

        const month = selectedDate.toString().split(' ')[1]
        const year = +selectedDate.toString().split(' ')[3]
        const expensedate = selectedDate

        const data = {
            username: profile.username,
            categories: categories,
            description: description,
            amount: amount,
            month: month,
            year: year,
            expensedate: expensedate
        }

        const url = `https://expense-tracker-api-arp.herokuapp.com/api/expense`

        axios.post(url, data, { headers: { 'authorization': `bearer ${token}` } })
            .then(res => {
                const url = `https://expense-tracker-api-arp.herokuapp.com/api/expense/${profile.username}`

                axios.get(url, { headers: { 'authorization': `bearer ${token}` } })
                    .then(res => {
                        //change expense date format
                        Array.from(res.data).map(x => x.expensedate = moment(x.expensedate).format('DD/MM/yyyy'))
                        // setData(res.data)
                    })

                onClose(selectedValue);
            })
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        const targetName = e.target.name

        switch (targetName) {
            case 'categories':
                setCategories(e.target.value)
                break;
            case 'amount':
                setAmount(e.target.value)
                e.target.value ? setSave(false) : setSave(true)
                break;
            case 'description':
                setDescription(e.target.value)
                break;
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
            <DialogTitle id="simple-dialog-title">Add Transaction</DialogTitle>
            <Divider />
            <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDatePicker
                        variant="inline"
                        margin="normal"
                        format="DD/MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        autoOk={true}
                        fullWidth={true}
                        className={classes.formControl}
                    />
                </MuiPickersUtilsProvider>
                <TextField
                    select
                    label="categories"
                    name='categories'
                    value={categories}
                    onChange={handleChange}
                    fullWidth={true}
                    className={classes.formControl}
                >
                    {_categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    className={classes.formControl}
                    name='description'
                    label="Description"
                    multiline={true}
                    fullWidth={true}
                    onChange={handleChange}
                />
                <TextField
                    className={classes.formControl}
                    name='amount'
                    label="Amount"
                    type='number'
                    fullWidth={true}
                    onChange={handleChange}
                    inputMode='decimal'
                    placeholder='0.00'
                />
                <Button variant="contained" disabled={save} startIcon={<SaveIcon />} type='submit' color="primary" fullWidth={true}>
                    SAVE
                </Button>
            </form>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
}

export default function AddTransaction() {
    const [openAddTransaction, setOpenAddTransaction] = useState(false)

    const handleOpenAddTransaction = () => {
        setOpenAddTransaction(true);
    }

    const handleCloseAddTransaction = (value) => {
        setOpenAddTransaction(false)
    }

    return (
        <div>
            <SimpleDialog
                open={openAddTransaction}
                onClose={handleCloseAddTransaction}
            />
            <IconButton
                aria-label="add transaction"
                onClick={handleOpenAddTransaction}
            >
                <AddCircleIcon
                    color='secondary'
                    fontSize='large'
                />
            </IconButton>
        </div>
    );
}