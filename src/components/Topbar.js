import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

export default function Topbar() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
