import { useNavigate } from "react-router-dom";
import {  registerUser } from "../slice/RegisterSlice";
import { useDispatch, useSelector } from "react-redux";
import useNotificationActions from "./useNotificationActions";
import { authActions } from "../slice/AuthSlice";
import useAuthActions from "./useAuthActions";


const useRegisterActions = () => {
    const {showNotification} = useNotificationActions();
    const {loading,error,user} = useSelector(state => state.register);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {getUser} = useAuthActions();

    const register = async ({...data}) => {
        // await csrf();
        // console.log("register form input: ",data)   
    
        try {
            dispatch(registerUser(data)).then(result => {
                if(result.payload && result.payload.user){
                    // dispatch(authActions.login());
                    getUser();
                    showNotification({type:'success',message:'You have been register successfully',open:true});
                    // navigate(`/verify-email/${userId}`); 
                }else if(result.payload && result.payload.errors){
                    
                    console.log('payload error: is not included ')
                    // showNotification({type:'error',message:'Errors',open:true});
                }else {
                    
                    showNotification({type:'error',message:'The Server is not responding',open:true});
                }
            });
           
        } catch (error) {
            if(error.response.status === 422){
                // setErrors(error.response.data.errors);
                // console.log("422 error: ", error)
            }
            // errorRef.current.focus();
                console.log("errors payload", error)
        }
    }


    return {
        register: register,
        loading: loading,
        error: error,
        user:user,
    }
}


export default useRegisterActions;