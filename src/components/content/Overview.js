import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Grid, makeStyles } from '@material-ui/core';
import _ from 'lodash'
import * as Mock from '../../MockData'

const useStyles = makeStyles({
    container: {
        maxWidth: '650px',
        margin: 'auto',
        padding : '20px',
        boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    }
})

export default function Overview(props) {
    const classes = useStyles()
    const [data, setData] = useState([])
    const [label, setLabel] = useState([])

    useEffect(() => {
        const date = props.selectedDate

        const filterDataByDate = Mock.dataList.filter(x =>
            new Date(x.createdate).getMonth() == date.getMonth()
        )

        const categories = _(filterDataByDate)
            .groupBy('categories')
            .map((obj, key) => ({
                'label': key,
                'sum': _.sumBy(obj, 'amount')
            }))
            .value()

        setData(categories.map(x => x.sum.toFixed(2)))
        setLabel(categories.map(x => x.label))

    }, [props.selectedDate])

    const doughnutData = {
        labels: label,
        datasets: [{
            data: data,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }]
    };

    return (
        <Grid container className={classes.container} >
            <Doughnut data={doughnutData} />
        </Grid>

    );
}
