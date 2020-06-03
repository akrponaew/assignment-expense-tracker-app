import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const categories = [
    {
        value: 'fooranddrink',
        label: 'Food & Drink',
    },
    {
        value: 'travel',
        label: 'Travel',
    },
    {
        value: 'clothes',
        label: 'Clothes',
    },
    {
        value: 'sport',
        label: 'Sport',
    },
    {
        value: 'other',
        label: 'Other',
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        marginBottom: '100px'
    }
}));

export default function Categories(props) {
    const classes = useStyles();
    const [categorie, setCategorie] = useState('fooranddrink');

    const handleChange = (event) => {
        setCategorie(event.target.value);
    };

    return (
        <TextField
            select
            label="categories"
            value={categorie}
            onChange={handleChange}
            fullWidth={true}
            className={props.className}
        >
            {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}
