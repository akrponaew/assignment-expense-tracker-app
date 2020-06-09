import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Content from './content/Content';
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import Profile from './topbar/Profile';
import axios from 'axios'
import JwtDecode from 'jwt-decode'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    title: {
        flexGrow: 1,
        marginLeft: '10px'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }
}));

export default function Layout() {
    const classes = useStyles()
    const history = useHistory()

    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     const profile = JwtDecode(token)
    //     const url = `https://expense-tracker-api-arp.herokuapp.com/api/expense/${profile.username}`

    //     axios.get(url, { headers: { 'authorization': `bearer ${token}` } })
    //         .catch(err => history.push('/'))
    // })

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <AccountBalanceWalletOutlinedIcon />
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Expense Tracker
                    </Typography>
                    <Profile />
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Content />
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}
