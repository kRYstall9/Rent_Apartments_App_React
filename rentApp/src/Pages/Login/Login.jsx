/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputsValidations from "../../Utils/InputsValidations";

import styles from "./Login.module.css";

import { Link } from 'react-router-dom';

import { BottomNavigation, BottomNavigationAction } from "@mui/material";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  TextField,
  Typography,
  Box,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";


import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import { createTheme, ThemeProvider } from "@mui/material/styles";


import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import PasswordIcon from "../../Utils/PasswordIcon";

import { signIn } from "../../services/authentication";

import Navigation from "../../authentication/Navigation";
import Register from "../Register/Register";



const INITIAL_STATE = {
  email: "",
  password: "",
};


const LOGIN_FIELDS = [
  { id: "emailInput", name: "email", label: "Email", variant: "standard",},
  {
    id: "passwordInput",
    name: "password",
    label: "Password",
    variant: "standard",
    color: "secondary",
  },
];


const Login = (theme) => {
  const[loginData, setLoginData] = useState(INITIAL_STATE);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] =  useState({})


  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    const errorsState = InputsValidations(name,value);
   console.log(errorsState);
   setError({...error, [name] : errorsState })
    setLoginData({ ...loginData, [name]: value });
   

  };

  


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(loginData)
        const response =  await signIn(loginData);
        console.log(response)
        if(response.success){
          navigate('/homepage');
        }
          
    }

    

  
  return (
      <Box className="authentication__form__container displayFlexCentered">
        <Typography className={styles.title}>Login</Typography>
        <ThemeProvider theme={theme}>
          {LOGIN_FIELDS.map((field) => (
            <TextField
              required
              key={field.id}
              id={field.id}
              name={field.name}
              label={field.label}
              variant={field.variant}
              fullWidth
              onChange={handleChange}
              error={error[field.name]?.status}
              helperText={error[field.name]?.helpText}
              type={
                field.id === "passwordInput"
                  ? showPassword
                    ? "text"
                    : "password"
                  : ""
              }
              slotProps={
                field.id === "passwordInput"
                  ? {
                      input: {
                        endAdornment: field.name  === 'password' ? (
                          <PasswordIcon onToggle={setShowPassword}/> 
                        ) : null,                     
                      },
                    }
                  : { type: "email" }
              }
            />
          ))}

          {/* <Button disabled={error.email.error || error.password.error} onClick={handleSubmit}>Login</Button> */}
          <Button
			    	startIcon={<LoginIcon />}
				    variant="contained"
				    color="primary"
			    	onClick={handleSubmit}
			     >
				   {'Login'}
			    </Button>
        </ThemeProvider>
      </Box>
      

    

  );
};

export default Login;
