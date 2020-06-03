import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import ExpenseList from './ExpenseList';
import Transaction from './Transaction'
import ListExpense from './ListExpense';
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

const useStyles = makeStyles({

});

export default function Content() {
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="DD/MM/yyyy"
                            margin="normal"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                }
                action={
                    <Transaction />
                }
            />
            <CardHeader
                subheader={
                    <Tabs
                        value={value}
                        onChange={handleChange}
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
                {/* <ExpenseList /> */}
                <ListExpense />
            </CardContent>
        </Card>
    )
}
