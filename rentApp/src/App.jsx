import { Outlet } from "react-router-dom";

import Container from "@mui/material/Container";
// import "./App.css";
import { ToastContainer } from 'react-toastify';

import {useAuth} from './context/AuthContext';





const App = () => {
  const {currentUser,setCurrentUser} = useAuth();
  return (
    <>
   		<Container maxWidth="false" sx={{ height: "100%" }}>
			  <Outlet context={{currentUser, setCurrentUser}}/>
		 </Container>

   

      <ToastContainer
           position="bottom-right"
           autoClose={5000}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           theme="dark"
           />
    </>

  );
};

export default App;
