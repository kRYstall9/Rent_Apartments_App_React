import { signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../services/firebase';
import { alertBuilder } from "../Utils/Utils";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const signIn = async (userData) => {
	const { email, password } = userData;
    console.log(email, password)
	try {
		await signInWithEmailAndPassword(auth,email,password);
        
         alertBuilder('Login succesful', true);
      
        return {success: true}

	} catch (error) {
		console.error("Error signing in: ", error);
        alertBuilder('Incorrect email or password', false);
        
	}
};
