import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../../firebase";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//import { useNavigate } from "react-router-dom";

//const navigate = useNavigate();

const succesfulAlert = (message) =>{
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
  
}

const failedAlert = (message) =>{
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

export const signIn = async (userData) => {
	const { email, password } = userData;
    console.log(email, password)
	try {
		await signInWithEmailAndPassword(auth,email,password);
        
         succesfulAlert('Login succesful');
      
        return {success: true}

	} catch (error) {
		console.error("Error signing in: ", error);
        failedAlert('Incorrect email or password');
        
	}
};
