/* eslint-disable react/prop-types */

import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function PasswordIcon({onToggle}){
    const [showPassword, setShowPassword] = useState(false);

   const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
    onToggle(!showPassword);
   }

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    
     const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    return (
      <InputAdornment position="end">
        <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        onMouseUp={handleMouseUpPassword}
      >
        {showPassword? (
          <VisibilityOff />
        ) : (
          <Visibility />
        )}
      </IconButton>
    </InputAdornment>
    )
}


