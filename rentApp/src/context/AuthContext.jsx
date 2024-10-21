import { onAuthStateChanged } from 'firebase/auth';
import {useContext,createContext, useEffect,useState } from 'react';
import {auth} from '../../firebase';


const AuthContext = createContext(null);



export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, async(user) =>{
            console.log('USER INSIDE THE USE EFFECT', user);
            setCurrentUser(user);
            setLoading(false);

        });
        return unsubscribe;
    },[]);
    return <AuthContext.Provider value={{currentUser,setCurrentUser}}>
        {!loading && children}
    </AuthContext.Provider>
}

