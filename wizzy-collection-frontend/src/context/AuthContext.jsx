import { createContext,useContext,useEffect,useState } from "react";
import axios from "../api/axios";
// import Swal from "sweetalert2";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const userRef = useReducer(user);
    const navigate = useNavigate();
    const [errorShown, setErrorShown] = useState(false);

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const getUser = async () => {
        try {
            // Check if the user is authenticated
            let isAuthenticated = true; /* Add your logic to check if the user is authenticated */
            
            if (isAuthenticated) {
                // If the user is authenticated, fetch user data
                const { data } = await axios.get('/api/user');
                setUser(data.data);
            } else {
                isAuthenticated = false;
            }
        } catch (error) {
            // Handle error if user data retrieval fails
            if (error.response.status === 401 && !errorShown) { // Check if error message has been shown
                Swal.fire('Error!', 'User is already logout', 'error');
                setErrorShown(true); // Set errorShown to true to prevent showing the error again
            }
            console.error('Error fetching user data:', error);
        }
    };
    

    useEffect(() => {
        getUser();
    }, []); // Empty dependency array to run the effect only once, on component mount
    
    

    const login = async ({...data}) => {
        // await csrf();

        try {
            const response = await axios.post('/api/login', data);
            // const name = response.data.user.name;
            // console.log(name);
            console.log("Login data: ",response.data.user.name);
            await getUser();
            Swal.fire('Success','','success');
            navigate('/');
        } catch (error) {
            if(error.response.status === 422){
                setErrors(error.response.data.errors);
                console.log("errors ", error.response.data.errors)
            }
            // errorRef.current.focus();
        }
    }
    const register = async ({...data}) => {
        // await csrf();

        try {

            const response = await axios.post('/api/register', data);
            console.log('register r: ', response)
                Swal.fire('Success!', 'You have been registered. Please log in!', 'success');
                await getUser();
                navigate('/login'); // Redirect to login page
        } catch (error) {
            if(error.response.status === 422){
                setErrors(error.response.data.errors);
                console.log("errors ", error.response.data.errors)
            }
        }
    }

    const logout = () => {
        // if (e) {
        //     e.preventDefault();
        // }
        const authenticated = true;
        if(authenticated){
            try {
                axios.post('/api/logout')
                .then(() => {
                    setUser(null);
                    authenticated = false;
                    Swal.fire('Success!', "You've successfully logged out", 'success');
                });
            } catch (e) {
                console.log("logout: ",e.response);
                if(e.response.status === 401){
                    Swal.fire('Error!', 'User is already logout', 'error')
                }
            }
            authenticated = false;
        }
    }

    

    return (
        <AuthContext.Provider value={{user, errors, getUser, login,logout, register,setUser}}>
            {children}
        </AuthContext.Provider>
    );
}

// export default AuthContext;

export default function useAuthContext(){
    return useContext(AuthContext);
}