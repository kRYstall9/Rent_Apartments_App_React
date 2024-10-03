import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../src/Login/Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [errorsPlaceholder, setErrorsPlaceholder] = useState({});
  const [errorsLine, setErrorsLine] = useState({});
  let [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

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
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/homepage");
      } catch (error) {
        setErrors("Invalid email or password", error);
      }
    }
  };

  return (
    <div className="main">
      <form className="login_container" onSubmit={handleSubmit}>
        <h1 className="title">Login</h1>
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
        </div>
        <button className="login_btn">Login</button>
        <span className="register_link" onClick={goToRegister}>
          Register
        </span>
      </form>
    </div>
  );
};

export default Login;
