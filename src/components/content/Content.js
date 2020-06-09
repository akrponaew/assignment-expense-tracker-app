import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import AddTransaction from './AddTransaction'
import Transaction from './Transaction';
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Overview from './Overview';
import JwtDecode from 'jwt-decode';
import axios from 'axios'
import moment from 'moment'

const useStyles = makeStyles({
    hide: {
        display: 'none'
    }
});

export default function Content() {
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [data, setData] = useState([])
    const [value, setValue] = React.useState(0)

    useEffect(async () => {
        const token = localStorage.getItem('token')
        const profile = JwtDecode(token)

        const url = `https://expense-tracker-api-arp.herokuapp.com/api/expense/${profile.username}`

        axios.get(url, { headers: { 'authorization': `bearer ${token}` } })
            .then(res => {
                // Array.from(res.data).map(x => x.expensedate = x.expensedate.split('T')[0])
                Array.from(res.data).map(x => x.expensedate = moment(x.expensedate).format('DD/MM/yyyy'))
                setData(res.data)
            })
            .catch(err => console.log(err))

    }, [])

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
    };

    return (
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
                    <AddTransaction />
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
    )
}
