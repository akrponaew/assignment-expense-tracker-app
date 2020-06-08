import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { Route, useHistory } from 'react-router-dom';
import Layout from './Layout';
import { Snackbar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    hide: {
        display: 'none'
    }
}));

export default function SignIn(props) {
    const history = useHistory()
    const classes = useStyles()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (props.location.state) setOpen(true)
    }, [props.location.state])

    const handleSubmit = (e) => {
        e.preventDefault()

        const url = `https://expense-tracker-api-arp.herokuapp.com/api/users/${username}/${password}`

        axios.get(url)
            .then(res => {
                localStorage.setItem('token', res.data)
                history.push('/main')
                // const isUser = Array.from(res.data).filter(x => x.username == username && x.password == password && x.status == 'A')
                // isUser.length ? history.push('/main', { userData: isUser })
                //     : document.getElementById('alertUsernamePassword').classList.remove(classes.hide)
            })
            .catch(err => {
                console.log(err)
            })


    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleChange = (e) => {
        const targetName = e.target.name
        targetName === 'username' ? setUsername(e.target.value) : setPassword(e.target.value)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Username"
                        name="username"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Alert severity="error" id='alertUsernamePassword' className={classes.hide}>Username or Password incorrect.</Alert>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Signup successfully
                </Alert>
            </Snackbar>
        </Container>
    );
}