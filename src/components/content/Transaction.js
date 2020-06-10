import React, { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import _ from 'lodash'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import axios from 'axios'
import moment from 'moment'
import JwtDecode from 'jwt-decode'
import { Grid } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const getMuiTheme = createMuiTheme({
    overrides: {
        MUIDataTableBodyCell: {
            stackedCommon: {
                '@media (max-width:959.95px)': {
                    height: '100%'
                }
            }
        }
    }
})

const useStyle = makeStyles({
    form: {
        margin: '30px 50px'
    },
    formControl: {
        marginBottom: '25px'
    }
})

export default function Transaction(props) {
    const classes = useStyle()
    const [data, setData] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [openEditAlert, setOpenEditAlert] = useState(false)
    const [openDeleteAlert, setOpenDeleteAlert] = useState(false)
    const [categories, setCategories] = useState()
    const [description, setDescription] = useState()
    const [amount, setAmount] = useState(0)
    const [id, setId] = useState()

    useEffect(() => {
        const date = props.selectedDate
        const filterDataByDate = props.data.filter(x => moment(x.expensedate,'DD/MM/yyyy').month() == date.getMonth())

        setData(filterDataByDate)
    }, [props.selectedDate, props.data])

    const handleClose = () => {
        setOpen(false)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
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

        const url = `https://expense-tracker-api-arp.herokuapp.com/api/expense/${id}`

        axios.put(url, data, { headers: { 'authorization': `bearer ${token}` } })
            .then(res => {
                const url = `https://expense-tracker-api-arp.herokuapp.com/api/expense/${profile.username}`

                axios.get(url, { headers: { 'authorization': `bearer ${token}` } })
                    .then(res => {
                        //change expense date format
                        Array.from(res.data).map(x => x.expensedate = moment(x.expensedate).format('DD/MM/yyyy'))
                        setData(res.data)
                        setOpenEditAlert(true)
                    })

                setOpen(false)
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
                e.target.value ? setEdit(false) : setEdit(true)
                break;
            case 'description':
                setDescription(e.target.value)
                break;
        }
    }

    const handleDelete = (e) => {
        const token = localStorage.getItem('token')
        const profile = JwtDecode(token)
        const url = `https://expense-tracker-api-arp.herokuapp.com/api/expense/${id}`

        axios.delete(url, { headers: { 'authorization': `bearer ${token}` } })
            .then(res => {
                const url = `https://expense-tracker-api-arp.herokuapp.com/api/expense/${profile.username}`

                axios.get(url, { headers: { 'authorization': `bearer ${token}` } })
                    .then(res => {
                        //change expense date format
                        Array.from(res.data).map(x => x.expensedate = moment(x.expensedate).format('DD/MM/yyyy'))
                        setData(res.data)
                        setOpenDeleteAlert(true)
                    })

                setOpen(false)
            })
            .catch(err => console.log(err))
    }

    const handleEditAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenEditAlert(false);
    }

    const handleDeleteAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenDeleteAlert(false);
    }

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
    ];

    const columns = [
        {
            name: "_id",
            options: {
                filter: false,
                sort: true,
                display: 'false',
                viewColumns: false
            }
        },
        {
            name: "expensedate",
            label: "Date",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "categories",
            label: "Categories",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "description",
            label: "Description",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "amount",
            label: "Amount",
            options: {
                filter: true,
                sort: false,
            }
        }
    ]

    const options = {
        download: false,
        print: false,
        pagination: false,
        selectableRows: false,
        responsive: 'stacked',
        onRowClick: (event, rowData) => {
            setId(event[0])
            setSelectedDate(moment(event[1],'DD/MM/yyyy'))
            setCategories(event[2])
            setDescription(event[3])
            setAmount(event[4])
            setOpen(true)
        },
    }

    return (
        <React.Fragment>
            <MuiThemeProvider theme={getMuiTheme}>
                <MUIDataTable
                    title={`Total ${_.sumBy(data, 'amount')} Baht`}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </MuiThemeProvider>

            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} >
                <Grid container>
                    <Grid item xs>
                        <DialogTitle>Edit Transaction</DialogTitle>
                    </Grid>
                    <Grid item>
                        <DialogTitle>
                            <IconButton size='small' onClick={handleClose}>
                                <CloseIcon color='secondary' />
                            </IconButton>
                        </DialogTitle>
                    </Grid>
                </Grid>
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
                        value={description}
                        name='description'
                        label="Description"
                        multiline={true}
                        fullWidth={true}
                        onChange={handleChange}
                    />
                    <TextField
                        className={classes.formControl}
                        value={amount}
                        name='amount'
                        label="Amount"
                        type='number'
                        fullWidth={true}
                        onChange={handleChange}
                        placeholder='0.00'
                        inputMode='decimal'
                    />
                    <Grid container justify="space-between">
                        <Grid item>
                            <Button variant="contained" disabled={edit} startIcon={<EditIcon />} type='submit' color="primary" >
                                EDIT
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={handleDelete} startIcon={<DeleteIcon />} color="secondary">
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Dialog>

            <Snackbar open={openEditAlert} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleEditAlertClose}>
                <Alert onClose={handleEditAlertClose} severity="success">
                    Edit successfully
                </Alert>
            </Snackbar>

            <Snackbar open={openDeleteAlert} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleDeleteAlertClose}>
                <Alert onClose={handleDeleteAlertClose} severity="success">
                    Delete Completed
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}
