import React, { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const columns = [
    {
        name: "date",
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
        name: "detail",
        label: "Deatail",
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

const dataList = [
    { id: 0, date: '2020-04-01', categories: 'Travel', detail: 'Cupcake', amount: 2 },
    { id: 1, date: '2020-04-02', categories: 'Food & Drink', detail: 'Donut', amount: 4 },
    { id: 2, date: '2020-04-03', categories: 'Clothes', detail: 'Lollipop', amount: 3.7 },
    { id: 3, date: '2020-05-10', categories: 'Food & Drink', detail: 'Oreo', amount: 1.6 },
    { id: 4, date: '2020-05-13', categories: 'Clothes', detail: 'Marshmallow', amount: 8 },
    { id: 5, date: '2020-05-15', categories: 'Food & Drink', detail: 'Nougat', amount: 9 },
    { id: 6, date: '2020-05-17', categories: 'Travel', detail: 'KitKat', amount: 2.5 },
    { id: 7, date: '2020-06-01', categories: 'Sports', detail: 'Gingerbread', amount: 8.1 },
    { id: 8, date: '2020-06-03', categories: 'Sports', detail: 'Eclair', amount: 3.3 },
    { id: 9, date: '2020-06-20', categories: 'Food & Drink', detail: 'Honeycomb', amount: 5 }
];

const options = {
    download: false,
    print: false,
    pagination: false
    // filterType: 'checkbox',
};

const getMuiTheme = createMuiTheme({
    overrides: {
        MuiTableCell: {
            root: {
                // backgroundColor: "#FF0000"
                borderBottom: '0px solid rgba(224, 224, 224, 1)'
            }
        },
        MUIDataTableBodyCell: {
            cellStackedSmall : {
                width: '50px',
                // paddingBottom : '25px'
            }
        }
    }
})

export default function Transaction(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        const date = props.selectedDate

        const filterDataByDate = dataList.filter(x =>
            new Date(x.date).getMonth() == date.getMonth()
        )
        setData(filterDataByDate)
    }, [props.selectedDate])

    return (
        <MuiThemeProvider theme={getMuiTheme}>
            <MUIDataTable
                title={"Expense List"}
                data={data}
                columns={columns}
                options={options}
            />
        </MuiThemeProvider>
    )
}
