import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils  from '@date-io/moment'
import ExpenseList from './ExpenseList';

const useStyles = makeStyles({

});

export default function Content() {
    const classes = useStyles()
    const [selectedDate, setSelectedDate] = useState(new Date())

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <Card>
            <CardHeader
                avatar={
                    <MuiPickersUtilsProvider utils={MomentUtils }>
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
                    <IconButton aria-label="add transaction">
                        <AddCircleIcon color='secondary' fontSize='large' />
                    </IconButton>
                }
            />
            <CardContent>
                <ExpenseList />
            </CardContent>
        </Card>
    )
}
