import { toast, Bounce } from 'react-toastify';

const _validateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);

    let age = today.getFullYear() - dob.getFullYear();

    const month = today.getMonth() - dob.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age >= 18 && age <= 120;
};

function InputsValidations(name, value) {
    let validationObj = { status: true, helpText: "" };
    let emailRegex = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$");
    let passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$");
  
    switch (name) {
      case "email":
        if (value === "") {
          validationObj.status = true;
          validationObj.helpText = "Field can't be empty";
        } else if (
          !emailRegex.test(value)
        ) {
          validationObj.status = true;
          validationObj.helpText = "Invalid email";
        } else {
          validationObj.status = false;
          validationObj.helpText = "";
        }
        break;
      case "password":
        if (value === "") {
          validationObj.status = true;
          validationObj.helpText = "Field can't be empty";
        } else if (
          !(
            value.length >= 6 &&
            passwordRegex.test(value)
          )
        ) {
          validationObj.status = true;
          validationObj.helpText = "Invalid password";
        } else {
          validationObj.status = false;
          validationObj.helpText = "";
        }
        break;
      case "lastName":
        if (value === "") {
          validationObj.status = true;
          validationObj.helpText = "Field can't be empty";
        } else if (value.length < 2) {
          validationObj.status = true;
          validationObj.helpText = "Last Name must be longer than 2 characters";
        } else {
          validationObj.status = false;
          validationObj.helpText = "";
        }
        break;
      case "firstName":
        if (value === "") {
          validationObj.status = true;
          validationObj.helpText = "Field can't be empty";
        } else if (value.length < 2) {
          validationObj.status = true;
          validationObj.helpText = "Last Name must be longer than 2 characters";
        } else {
          validationObj.status = false;
          validationObj.helpText = "";
        }
        break;
  
      case "dob":
        if (value === "") {
          validationObj.status = true;
          validationObj.helpText = "Field can't be empty";
        } else if (!_validateAge(value)) {
          validationObj.status = true;
          validationObj.helpText  = "The age should be between 18 - 120 years";
        } else {
          validationObj.status = false;
          validationObj.helpText = "";
        }
        break;
      default:
        break;
    }
    return validationObj;
}

function alertBuilder(message, isSuccess){

    if(isSuccess){
        toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        return;
    }

    toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition : Bounce,
    });

}

export {InputsValidations, alertBuilder};