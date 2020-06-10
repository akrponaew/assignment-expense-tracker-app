import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import Transaction from './Transaction';
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Overview from './Overview';
import JwtDecode from 'jwt-decode';
import axios from 'axios'
import moment from 'moment'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { Divider } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button';

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
    hide: {
        display: 'none'
    },
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

export default function Content() {
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [data, setData] = useState([])
    const [openAddTransaction, setOpenAddTransaction] = useState(false)
    const [value, setValue] = useState(0)
    const [selectedDateAddtransaction, setSelectedDateAddtransaction] = useState(new Date())
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0)
    const [categories, setCategories] = useState('Food & Drink');
    const [save, setSave] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const profile = JwtDecode(token)

        const url = `https://expense-tracker-api-arp.herokuapp.com/api/expense/${profile.username}`

        axios.get(url, { headers: { 'authorization': `bearer ${token}` } })
            .then(res => {
                //change expense date format
                Array.from(res.data).map(x => x.expensedate = moment(x.expensedate).format('DD/MM/yyyy'))
                setData(res.data)
            })
            .catch(err => window.location.href = '/')

    }, [])

    const handleDateChangeAddTransaction = (date) => {
        setSelectedDateAddtransaction(date._d);
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        const profile = JwtDecode(token)

        const month = selectedDateAddtransaction.toString().split(' ')[1]
        const year = +selectedDateAddtransaction.toString().split(' ')[3]
        const expensedate = selectedDateAddtransaction

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
                        setData(res.data)
                    })

                setOpenAddTransaction(false);
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

    const handleTabChange = (event, newValue) => {
        setValue(newValue);

        if (newValue) {
            document.getElementById('divTransaction').classList.add(classes.hide)
            document.getElementById('divOverview').classList.remove(classes.hide)
        }
        else {
            document.getElementById('divTransaction').classList.remove(classes.hide)
            document.getElementById('divOverview').classList.add(classes.hide)
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date._d);
    }

    const handleOpenAddTransaction = () => {
        setOpenAddTransaction(true);
    }

    const handleCloseAddTransaction = (value) => {
        setOpenAddTransaction(false)
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader
                    avatar={
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                variant="inline"
                                margin="normal"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                views={['year', 'month']}
                                autoOk={true}
                            />
                        </MuiPickersUtilsProvider>
                    }
                    action={
                        // <AddTransaction />
                        <IconButton
                            aria-label="add transaction"
                            onClick={handleOpenAddTransaction}
                        >
                            <AddCircleIcon
                                color='secondary'
                                fontSize='large'
                            />
                        </IconButton>
                    }
                />
                <CardHeader
                    subheader={
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Transaction" />
                            <Tab label="Overview" />
                        </Tabs>
                    }
                >

                </CardHeader>
                <CardContent>
                    <div id='divTransaction'>
                        <Transaction selectedDate={selectedDate} data={data} />
                    </div>
                    <div id='divOverview' className={classes.hide}>
                        <Overview selectedDate={selectedDate} data={data} />
                    </div>
                </CardContent>
            </Card>

            <Dialog onClose={handleCloseAddTransaction} aria-labelledby="simple-dialog-title" open={openAddTransaction} >
                <DialogTitle id="simple-dialog-title">Add Transaction</DialogTitle>
                <Divider />
                <form noValidate autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            variant="inline"
                            margin="normal"
                            format="DD/MM/yyyy"
                            value={selectedDateAddtransaction}
                            onChange={handleDateChangeAddTransaction}
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
        </React.Fragment>
    )
}
