import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/lib/types';
import React, {createContext, useContext, useEffect, useState} from 'react'

import { useNavigate } from 'react-router-dom';

export const INITIAL_USER ={
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:''
};


// declareing initial auth state 
const INITIAL_STATE ={
    user: INITIAL_USER,
    isLoading:false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean
}


const AuthContext = createContext<IContextType>(INITIAL_STATE);


const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser]= useState<IUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate();

    const  checkAuthUser = async() => {
        try {
            // try to get into currently logged in account
            const currentAccount = await getCurrentUser();

            if(currentAccount){
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio
                });

                setIsAuthenticated(true);

                return true;
            }
            return false; 
            
        } catch (error) {
            console.log(error);
            return false;
            
        }finally{
            setIsLoading(false);
        }
    };

    //   checkAuthUser need to be called whenever we reload the page for this we use useEffect

    useEffect(() => {
        // 
        if(localStorage.getItem('cookieFallback') === '[]' || localStorage.getItem('cookieFallback') === null ){
            navigate('/sign-in');
        }
        checkAuthUser();        // whenever page reloads this fucntion get called
    }, []);



    const value ={
        user,
        setUser,
        isLoading, 
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser

    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider


export const useUserContext =() => useContext(AuthContext);



