import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { setDoc, doc } from "firebase/firestore";

import styles from "../Login/Login.module.css";
import { TextField, Typography, Box, Button } from "@mui/material";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

import PasswordIcon from "../../Utils/PasswordIcon";

import { InputsValidations } from "../../Utils/Utils";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

const INITIAL_STATE = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  birthDate: "",
};

const LOGIN_FIELDS = [
  { id: "emailInput", name: "email", label: "Email", variant: "standard" },
  {
    id: "passwordInput",
    name: "password",
    label: "Password",
    variant: "standard",
  },
  {
    id: "confirmPasswordInput",
    name: "password",
    label: "Password",
    variant: "standard",
  },
  {
    id: "firstName",
    name: "firstName",
    label: "First Name",
    variant: "standard",
  },
  { id: "lastName", name: "lastName", label: "Last Name", variant: "standard" },
  {
    id: "birthDate",
    name: "birthDate",
    label: "Date of Birth",
    variant: "standard",
  },
];
const Register = () => {
  const [loginData, setLoginData] = useState(INITIAL_STATE);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorsState = InputsValidations(name, value);
    console.log(errorsState);
    setError({ ...error, [name]: errorsState });
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("login data submitted");
    console.log(loginData);
  };

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [birthDate, setBirthDate] = useState("");
  // let [errorsPlaceholder, setErrorsPlaceholder] = useState({});
  // const [errorsLine, setErrorsLine] = useState({});
  // let [errors, setErrors] = useState({});

  // const navigate = useNavigate();

  // const validateEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  //   return emailRegex.test(email);
  // };

  // const validatePassword = (password) => {
  //   const hasLetter = /[A-Za-z]/.test(password);
  //   const hasNumber = /\d/.test(password);
  //   const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  //   return password.length >= 6 && hasLetter && hasNumber && hasSpecialChar;
  // };

  // const validateAge = (birthDate) => {
  //   const today = new Date();
  //   const dob = new Date(birthDate);

  //   let age = today.getFullYear() - dob.getFullYear();

  //   const month = today.getMonth() - dob.getMonth();

  //   if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
  //     age--;
  //   }
  //   return age >= 18 && age <= 120;
  // };

  // const validateField = (field) => {
  //   const newErrorsPlaceholder = { ...errorsPlaceholder };
  //   const newErrorsline = { ...errorsLine };

  //   switch (field) {
  //     case "email":
  //       if (!email) {
  //         newErrorsPlaceholder.email = "Field is required";
  //       } else if (!validateEmail(email)) {
  //         newErrorsline.email = "Email is not valid";
  //       } else {
  //         delete newErrorsPlaceholder.email;
  //         delete newErrorsline.email;
  //       }
  //       break;
  //     case "password":
  //       if (!password) {
  //         newErrorsPlaceholder.password = "Field is required";
  //       } else if (!validatePassword(password)) {
  //         newErrorsline.password = "Password is not valid";
  //       } else {
  //         delete newErrorsPlaceholder.password;
  //         delete newErrorsline.password;
  //       }
  //       break;
  //     case "firstName":
  //       if (!firstName) {
  //         newErrorsPlaceholder.firstName = "Field is required";
  //       } else if (firstName.length < 2) {
  //         newErrorsline.firstName =
  //           "First Name must be longer than 2 characters";
  //       } else {
  //         delete newErrorsPlaceholder.firstName;
  //         delete newErrorsline.firstName;
  //       }
  //       break;
  //     case "lastName":
  //       if (!lastName) {
  //         newErrorsPlaceholder.lastName = "Field is required";
  //       } else if (lastName.length < 2) {
  //         newErrorsline.lastName = "Last Name must be longer than 2 characters";
  //       } else {
  //         delete newErrorsPlaceholder.lastName;
  //         delete newErrorsline.lastName;
  //       }
  //       break;

  //     case "dob":
  //       if (!birthDate) {
  //         newErrorsline.birthDate = "You must chose a date";
  //       } else if (!validateAge(birthDate)) {
  //         newErrorsline.birthDate = "The age should be between 18 - 120 years";
  //       } else {
  //         delete newErrorsline.birthDate;
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  //   setErrorsLine(newErrorsline);
  //   setErrorsPlaceholder(newErrorsPlaceholder);
  // };

  // const validateForm = () => {
  //   const newErrorsPlaceholder = {};
  //   const newErrorsline = {};
  //   if (!email) {
  //     newErrorsPlaceholder.email = "Field is required";
  //   } else if (!validateEmail(email)) {
  //     newErrorsline.email = "Email is not valid";
  //   }

  //   if (!password) {
  //     newErrorsPlaceholder.password = "Field is required";
  //   } else if (!validatePassword(password)) {
  //     newErrorsline.password = "Password is not valid";
  //   }
  //   if (!firstName) {
  //     newErrorsPlaceholder.firstName = "Field is required";
  //   } else if (firstName.length < 2) {
  //     newErrorsline.firstName = "First Name must be longer than 2 characters";
  //   }
  //   if (!lastName) {
  //     newErrorsPlaceholder.lastName = "Field is required";
  //   } else if (!lastName.length < 2) {
  //     newErrorsline.lastName = "Last Name must be longer than 2 characters";
  //   }
  //   if (!birthDate || !validateAge(birthDate)) {
  //     newErrorsline.birthDate = "The age should be between 18 - 120 years";
  //   }
  //   setErrorsLine(newErrorsline);
  //   setErrorsPlaceholder(newErrorsPlaceholder);

  //   errors = { ...newErrorsPlaceholder, ...newErrorsline };
  //   setErrors(errors);

  //   return Object.keys(errors).length === 0;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     try {
  //       const userCredential = await createUserWithEmailAndPassword(
  //         auth,
  //         email,
  //         password
  //       );
  //       await setDoc(doc(db, "users", userCredential.user.uid), {
  //         firstName,
  //         lastName,
  //         email,
  //         password,
  //         role: "user",
  //         flats: [],
  //       });
  //       alert("Registration succesful");
  //       navigate("/login");
  //     } catch (error) {
  //       console.error("Error registering user", error);
  //       setErrors({ firebase: " Failed register try again" });
  //     }
  //   }
  // };

  return (
    <Box
      className="authentication__form__container displayFlexCentered"
      component="form"
    >
      <Typography className={styles.title}>Register</Typography>
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
                    endAdornment:
                      field.name === "password" ? (
                        <PasswordIcon onToggle={setShowPassword} />
                      ) : null,
                  },
                }
              : { type: "email" }
          }
        />
      ))}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["SingleInputDateRangeField"]}>
        <DatePicker
          label="Picker with helper text"
          slotProps={{ textField: { helperText: 'Please fill this field' } }}
        />
        </DemoContainer>
      </LocalizationProvider>
      <Button
        startIcon={<AppRegistrationIcon />}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        {"Register"}
      </Button>
    </Box>
  );
};

export default Register;
{
  /* <form className={styles.login_container} onSubmit={handleSubmit}>
        <h1 className= {styles.title}>Register</h1>
        <div>
          <input
            type="email"
            placeholder={
              errorsPlaceholder.email ? errorsPlaceholder.email : "E-mail"
            }
            className={`input ${
              errorsPlaceholder.email
                ? styles.red_placeholder
                : (errorsLine.email
                ? styles.input_error
                : "") 
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateField("email")}
          />
          {!validateEmail(email) && <p className={styles.error}>{errorsLine.email}</p>}

          <input
            type="text"
            placeholder={
              errorsPlaceholder.firstName
                ? errorsPlaceholder.firstName
                : "First Name"
            }
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`input ${
              errorsPlaceholder.firstName
                ? styles.red_placeholder
                : (errorsLine.firstName
                ? styles.input_error
                : "") 
            }`}
            onBlur={() => validateField("firstName")}
          />
          {errorsLine.firstName && (
            <p className={styles.error}>{errorsLine.firstName}</p>
          )}

          <input
            type="text"
            placeholder={
              errorsPlaceholder.lastName
                ? errorsPlaceholder.lastName
                : "Last name"
            }
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`input ${
              errorsPlaceholder.lastName
                ? styles.red_placeholder
                : (errorsLine.lastName
                ? styles.input_error
                : "") 
            }`}
            onBlur={() => validateField("lastName")}
          />
          {!lastName < 2 && <p className={styles.error}>{errorsLine.lastName}</p>}

          <input
            type="password"
            placeholder={
              errorsPlaceholder.password
                ? errorsPlaceholder.password
                : "Password"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`input ${
              errorsPlaceholder.password
                ? styles.red_placeholder
                : (errorsLine.password
                ? styles.input_error
                : "")
            }`}
            onBlur={() => validateField("password")}
          />
          {!validatePassword(password) && (
            <p className={styles.error}>{errorsLine.password}</p>
          )}
          {/* style the date */
}
{
  /* <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            onBlur={() => validateField("dob")}
            className={`input ${
              errorsLine.birthDate ? styles.error_date : styles.date_container
            }`}
          />
          {errorsLine.birthDate && (
            <p className={styles.error}>{errorsLine.birthDate}</p>
          )}
        </div>
        <button className={styles.login_btn}>Register</button>
      </form> */
}
