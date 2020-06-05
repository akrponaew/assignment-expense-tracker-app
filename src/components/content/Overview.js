import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Grid, makeStyles } from '@material-ui/core';
import _ from 'lodash'

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

        const filterDataByDate = dataList.filter(x =>
            new Date(x.date).getMonth() == date.getMonth()
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
