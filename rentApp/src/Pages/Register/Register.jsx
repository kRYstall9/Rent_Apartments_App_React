import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '..src/firebase';
import { setDoc, doc } from "firebase/firestore";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  let [errorsPlaceholder, setErrorsPlaceholder] = useState({});
  const [errorsLine, setErrorsLine] = useState({});
  let [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    return password.length >= 6 && hasLetter && hasNumber && hasSpecialChar;
  };

  const validateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);

    let age = today.getFullYear() - dob.getFullYear();

    const month = today.getMonth() - dob.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 18 && age <= 120;
  };

  const validateField = (field) => {
    const newErrorsPlaceholder = { ...errorsPlaceholder };
    const newErrorsline = { ...errorsLine };

    switch (field) {
      case "email":
        if (!email) {
          newErrorsPlaceholder.email = "Field is required";
        } else if (!validateEmail(email)) {
          newErrorsline.email = "Email is not valid";
        } else {
          delete newErrorsPlaceholder.email;
          delete newErrorsline.email;
        }
        break;
      case "password":
        if (!password) {
          newErrorsPlaceholder.password = "Field is required";
        } else if (!validatePassword(password)) {
          newErrorsline.password = "Passwod is not valid";
        } else {
          delete newErrorsPlaceholder.password;
          delete newErrorsline.password;
        }
        break;
      case "firstName":
        if (!firstName) {
          newErrorsPlaceholder.firstName = "Field is required";
        } else if (firstName.length < 2) {
          newErrorsline.firstName =
            "First Name must be longer than 2 characters";
        } else {
          delete newErrorsPlaceholder.firstName;
          delete newErrorsline.firstName;
        }
        break;
      case "lastName":
        if (!lastName) {
          newErrorsPlaceholder.lastName = "Field is required";
        } else if (lastName.length < 2) {
          newErrorsline.lastName = "Last Name must be longer than 2 characters";
        } else {
          delete newErrorsPlaceholder.lastName;
          delete newErrorsline.lastName;
        }
        break;

      case "dob":
        if (!birthDate) {
          newErrorsline.birthDate = "You must chose a date";
        } else if (!validateAge(birthDate)) {
          newErrorsline.birthDate = "The age should be between 18 - 120 years";
        } else {
          delete newErrorsline.birthDate;
        }
        break;

      default:
        break;
    }
    setErrorsLine(newErrorsline);
    setErrorsPlaceholder(newErrorsPlaceholder);
  };

  const validateForm = () => {
    const newErrorsPlaceholder = {};
    const newErrorsline = {};
    if (!email) {
      newErrorsPlaceholder.email = "Field is required";
    } else if (!validateEmail(email)) {
      newErrorsline.email = "Email is not valid";
    }

    if (!password) {
      newErrorsPlaceholder.password = "Field is required";
    } else if (!validatePassword(password)) {
      newErrorsline.password = "Passwod is not valid";
    }
    if (!firstName) {
      newErrorsPlaceholder.firstName = "Field is required";
    } else if (firstName.length < 2) {
      newErrorsline.firstName = "First Name must be longer than 2 characters";
    }
    if (!lastName) {
      newErrorsPlaceholder.lastName = "Field is required";
    } else if (!lastName.length < 2) {
      newErrorsline.lastName = "Last Name must be longer than 2 characters";
    }
    if (!birthDate || !validateAge(birthDate)) {
      newErrorsline.birthDate = "The age should be between 18 - 120 years";
    }
    setErrorsLine(newErrorsline);
    setErrorsPlaceholder(newErrorsPlaceholder);

    errors = { ...newErrorsPlaceholder, ...newErrorsline };
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", userCredential.user.uid), {
          firstName,
          lastName,
          email,
          password,
          role: "user",
          flats: [],
        });
        alert("Registration succesful");
        navigate("/login");
      } catch (error) {
        console.error("Error registering user", error);
        setErrors({ firebase: " Failed register try again" });
      }
    }
  };

  return (
    <div className="main">
      <form className="login_container" onSubmit={handleSubmit}>
        <h1 className="title">Register</h1>
        <div>
          <input
            type="email"
            placeholder={
              errorsPlaceholder.email ? errorsPlaceholder.email : "E-mail"
            }
            className={`input ${
              errorsPlaceholder.email
                ? "red-placeholder"
                : errorsLine.email
                ? "input-error"
                : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateField("email")}
          />
          {!validateEmail(email) && <p className="error">{errorsLine.email}</p>}

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
                ? "red-placeholder"
                : errorsLine.firstName
                ? "input-error"
                : ""
            }`}
            onBlur={() => validateField("firstName")}
          />
          {errorsLine.firstName && (
            <p className="error">{errorsLine.firstName}</p>
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
                ? "red-placeholder"
                : errorsLine.lastName
                ? "input-error"
                : ""
            }`}
            onBlur={() => validateField("lastName")}
          />
          {!lastName < 2 && <p className="error">{errorsLine.lastName}</p>}

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
                ? "red-placeholder"
                : errorsLine.password
                ? "input-error"
                : ""
            }`}
            onBlur={() => validateField("password")}
          />
          {!validatePassword(password) && (
            <p className="error">{errorsLine.password}</p>
          )}
          {/* style the date */}
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            onBlur={() => validateField("dob")}
            className={`input ${
              errorsLine.birthDate ? "error-date" : "date-container"
            }`}
          />
          {errorsLine.birthDate && (
            <p className="error">{errorsLine.birthDate}</p>
          )}
        </div>
        <button className="login_btn">Register</button>
      </form>
    </div>
  );
};

export default Login;
