"use client"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { v2Theme } from '@/app/Mui/client.mjs';
import PasswordMUI from '@/app/Mui/components/PasswordMUI';
import AlertMUI from '@/app/Mui/components/AlertMUI';
import { emailPattern, passwordPattern } from '@/app/core.mjs';
import axios from "axios"

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://ahad-web.onrender.com/" style={{
                textDecoration: "none"
            }}>
                We App
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function UpdatePassword() {

    const [password, setPassword] = React.useState("")
    const [repeatPassword, setRepeatPassword] = React.useState("")
    const [clientErrorMessage, setClientErrorMessage] = React.useState(null)
    const [clientSuccessMessage, setClientSuccessMessage] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [mail, setMail] = React.useState(null)

    React.useEffect(() => {
        let email = location.href
            .split("?")[1]
            .split("=")[1]
            .split("%40");
        if (email[1]) {
            email = `${email[0]}@${email[1]}`;
            setMail(email);
        } else {
            email = email[0];
            setMail(email);
        }
    }, [])

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!passwordPattern.test(password) || !passwordPattern.test(repeatPassword)) {
            setClientErrorMessage("Password must be alphanumeric and 8 to 24 characters long")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return
        }

        if (password !== repeatPassword) {
            setClientErrorMessage("Passwords do not match")
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
            return
        }

        try {
            setIsLoading(true)

            const response = await axios.put("/api/v1/auth/update-password", {
                password: password,
                email: mail
            }, { withCredentials: true })

            setIsLoading(false)
            setClientSuccessMessage(response.data.message)
            setTimeout(() => {
                setClientSuccessMessage(null)
            }, 2000);
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            setClientErrorMessage(error.response.data.message)
            setTimeout(() => {
                setClientErrorMessage(null)
            }, 2000)
        }

    };

    return (
        <ThemeProvider theme={v2Theme}>
            {
                clientErrorMessage && <AlertMUI status="error" text={clientErrorMessage} />
            }
            {
                clientSuccessMessage && <AlertMUI status="success" text={clientSuccessMessage} />
            }
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Enter new password
                    </Typography>
                    <div className='p-[8px]'></div>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
                        <PasswordMUI
                            label="New Password * "
                            onChange={(value) => setPassword(value)}
                            name="password"
                        />
                        <div className='p-[8px]'></div>
                        <PasswordMUI
                            label="Repeat New Password * "
                            onChange={(value) => setRepeatPassword(value)}
                            name="password"
                        />
                        <FormControlLabel style={{
                            marginTop: "16px"
                        }}
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            disabled={isLoading}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {
                                isLoading ?
                                    <>
                                        <span className="buttonLoader"></span>
                                        Processing
                                    </>
                                    : "Update Password"
                            }
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}