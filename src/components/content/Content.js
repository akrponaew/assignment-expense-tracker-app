import React, { useState } from 'react';
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

const useStyles = makeStyles({
    hide : {
        display: 'none'
    }
});

export default function Content() {
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [value, setValue] = React.useState(0)

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
                    <Transaction selectedDate={selectedDate} />
                </div>
                <div id='divOverview' className={classes.hide}>
                    <Overview selectedDate={selectedDate} />
                </div>
            </CardContent>
        </Card>
    )
}
