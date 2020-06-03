import React from 'react'
import MUIDataTable from "mui-datatables";

const columns = [
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

const data = [
    { id: 0, categories: 'Travel', detail: 'Cupcake', amount: 2 },
    { id: 1, categories: 'Food & Drink', detail: 'Donut', amount: 4 },
    { id: 2, categories: 'Clothes', detail: 'Lollipop', amount: 3.7 },
    { id: 3, categories: 'Food & Drink', detail: 'Oreo', amount: 1.6 },
    { id: 4, categories: 'Clothes', detail: 'Marshmallow', amount: 8 },
    { id: 5, categories: 'Food & Drink', detail: 'Nougat', amount: 9 },
    { id: 6, categories: 'Travel', detail: 'KitKat', amount: 2.5 },
    { id: 7, categories: 'Sports', detail: 'Gingerbread', amount: 8.1 },
    { id: 8, categories: 'Sports', detail: 'Eclair', amount: 3.3 },
    { id: 9, categories: 'Food & Drink', detail: 'Honeycomb', amount: 5 }
];

const options = {
    // filterType: 'checkbox',
};

export default function ListExpense() {
    return (
        <MUIDataTable
            title={"Expense List"}
            data={data}
            columns={columns}
            options={options}
        />
    )
}
