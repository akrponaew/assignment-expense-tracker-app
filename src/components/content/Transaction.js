import React, { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import _ from 'lodash'
import * as Mock from '../../MockData'

const columns = [
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
    },
];

const options = {
    download: false,
    print: false,
    pagination: false,
    selectableRowsHeader: false,
    responsive: 'stacked'
    // selectableRowsOnClick: true
    // filterType: 'checkbox',
};

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

export default function Transaction(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        const date = props.selectedDate

        const filterDataByDate = props.data.filter(x =>
            new Date(x.createdate).getMonth() == date.getMonth()
        )

        setData(filterDataByDate)
    }, [props.selectedDate, props.data])

    return (
        <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable
                title={`Total ${_.sumBy(data, 'amount')} Baht`}
                data={data}
                columns={columns}
                options={options}
            />
        </MuiThemeProvider>
    )
}
