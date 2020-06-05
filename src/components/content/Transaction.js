import React, { useState, useEffect } from 'react'
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import _ from 'lodash'
import * as Mock from '../../MockData'

const columns = [
    {
        name: "createdate",
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

        const filterDataByDate = Mock.dataList.filter(x =>
            new Date(x.createdate).getMonth() == date.getMonth()
        )
        
        

        setData(filterDataByDate)
    }, [props.selectedDate])

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
