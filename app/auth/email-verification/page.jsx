"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { theme, v2Theme } from "@/app/Mui/client.mjs";
import PasswordMUI from "@/app/Mui/components/PasswordMUI";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { MuiOtpInput } from "mui-one-time-password-input";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://ahad-web.onrender.com/"
        style={{
          textDecoration: "none",
        }}
      >
        We App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function EmailVerification() {
  const [mail, setMail] = React.useState("");
  const [otp, setOtp] = React.useState("");

  React.useEffect(() => {
    let email = location.href
      .split("/")[4]
      .split("?")[1]
      .split("=")[1]
      .split("%40");
    if (email[1]) {
      email = `${email[0]}@${email[1]}`;
    } else {
      email = email;
    }
    setMail(email);
  }, []);

  const router = useRouter()

  const handleChange = (newValue) => {
    setOtp(newValue);

    if (newValue.length === 6) {
      console.log(newValue);
    }
  };

  return (
    <ThemeProvider theme={v2Theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify your email
          </Typography>
          <Typography
            component="p"
            variant="p"
            style={{
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            Enter 6 digit code sent to: {mail}
          </Typography>
          <Box noValidate sx={{ mt: 1, width: "100%" }}>
            <MuiOtpInput
              type="number"
              length={6}
              value={otp}
              onChange={handleChange}
              style={{
                margin: "32px 0",
              }}
            />
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "100px" }}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={() => router.back()}
              >
                <ArrowBackIos
                  style={{
                    fontSize: "16px",
                    marginLeft: "4px",
                  }}
                />
                <span
                  style={{
                    width: "50%",
                    textAlign: "center",
                    paddingLeft: "4px",
                  }}
                >
                  Back
                </span>
              </Button>
              <Typography
                component="p"
                variant="p"
                style={{
                  color: theme.palette.text.primary,
                  textDecoration: "underline",
                  textDecorationColor: theme.palette.text.primary,
                  cursor: "pointer",
                }}
              >
                Resend OTP
              </Typography>
            </Box>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
