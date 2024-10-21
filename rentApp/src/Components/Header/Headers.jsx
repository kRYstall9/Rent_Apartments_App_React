import { NavLink, useOutletContext,Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut,onAuthStateChanged } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from '../../assets/gold_logo.png'
import { KeyboardReturnOutlined } from "@mui/icons-material";

const Headers = () => {
  const [userData, setUserData] = useState(null);
  const[isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const {currentUser, setCurrentUser} = useOutletContext();

  useEffect(() => {
    if(!currentUser) return;
    fetchUserData(currentUser);
  },[])

  const fetchUserData = async (user) => {
    const userDocRef = doc(db,'users', user.uid); //retu unde e documentul
    const userDoc = await getDoc(userDocRef); //ret continut doc
    if(userDoc.exists()){
      const finalUserData = userDoc.data(); //data e prop din firebase
      setUserData(finalUserData);
    }
    setIsLoading(false);
  }
  

  // const handleDelete = async () => {
  //   try {
  //     const user = auth.currentUser;
  //     await deleteUser(user);
  //     navigate("/register");
  //   } catch (error) {
  //     console.log("error deleting user", error);
  //   }
  // };

  const handleLogout = async () => {
    
    try {
      await signOut(auth);
      navigate("/authentication/login");
    } catch (error) {
      console.log("Error logging out", error);
    }
  };
  return (
    <>
    {!currentUser ? (<Navigate to='/authentication'></Navigate>):(
    <div className={styles.header}>
      <img src={logo}/>
      <div>
      Hello, 
      <span className={styles.username_color}>
      {isLoading ? 'Loading...' : (`${userData ? `${userData.firstName} ` : 'Guest'}`)}
      </span>
      </div>
      <nav>
        <ul className="nav">
          <li>
            <NavLink to="/homepage">Home</NavLink>
          </li>
          <li>
            <NavLink to="/myprofile">My profile</NavLink>
          </li>
          <li>
            <NavLink to="/myflats">My Flats</NavLink>
          </li>
          <li>
            <NavLink to="/favourites">Favourites</NavLink>
          </li>
          {/* <li>
            <button onClick={() => handleDelete()} className="delete_btn">Delete Account</button>
          </li> */}
        </ul>
      </nav>
      <div className={styles.logout_btn}>
        <LogoutIcon onClick={() => handleLogout()} />
      </div>
      {/* <button onClick={() => handleLogout()} className="logout_btn">Logout</button> */}
    </div>
    )}
    </>
  );
};

export default Headers;
