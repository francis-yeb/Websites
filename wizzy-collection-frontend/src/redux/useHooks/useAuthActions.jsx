import {  useDispatch, useSelector } from "react-redux";
import { authActions, loginUser } from "../slice/AuthSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useNotificationActions from "./useNotificationActions";
import { cartActions } from "../slice/CartSlice";

const useAuthActions = () => {
    const [errors,setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {showNotification} = useNotificationActions()
    
    const csrf  = () => axios.get('/sanctum/csrf-cookie')
    .catch(err => {
        console.log("csrf errr: ",err)
    });
    // console.log("csrf",csrf);
    
    //Redux state
    const {loading,error,user,userData} = useSelector(state => state.auth);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn || false);

    //Mehtods

    //Email verification method
    const VerifyUser = async() => {
        await axios.post('/email/verification-notification')
            .then(response => {
                // Handle successful response, such as showing a notification
                console.log('Verification email sent successfully:', response.data);
            })
            .catch(error => {
                // Handle error, such as showing an error message
                console.error('Error resending verification email:', error);
                showNotification({type:'error',message:'Network Error, check your connectivity',open:true});
            });
    }

    //Get user data from the serve
    const getUser = async() => {
        await csrf()
        let user = null;
        try {
            const response = await axios.get('/api/user');
            const user = response.data;
            // localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('user',JSON.stringify(user));
            const getUser = localStorage.getItem('user');
            if (getUser !== null){
                dispatch(authActions.login(user));
                dispatch(authActions.user(user));
            }
        }
        catch (error){
            console.log('getting user error: ',error)
        }
        return user;
    }


    //Login method
    const login = async ({...data}) => {
        await csrf();

        try {
            dispatch(loginUser(data)).then(result => {
                // console.log("result", result)
                if(result.payload && result.payload.user){
                    const userr = getUser()
                    console.log("userrrrr ", result.payload.user.role)
                    if(result.payload.user.role === 'user'){

                        navigate('/'); 
                    }else {
                        navigate('/dashboard');
                    }
                }else if (result.payload && result.payload.errors){

                }
                else {
                    showNotification({type:'error',message:'The Server is not response',open:true});
                    
                }
            });
           
        } catch (error) {
            if(error.response.status === 422){
                setErrors(error.response.data.errors);
            }
            // errorRef.current.focus();
                // console.log("errors payload", error)
        }
    }


    //Forgot password method
    const ForgotPassword = async({email}) => {
        dispatch(authActions.loading(true))
        // console.log("Email::: ",email)
        await csrf()

        try {
            const response = await axios.post('/forgot-password',{email:email})
            dispatch(authActions.loading(false));
            // console.log("response reset: ",response.data.status)
            showNotification({type:'success',message:response.data.status,open:true});

        }
        catch (error) {
            // console.log('forgot password errors',error)
            setErrors(error);
            dispatch(authActions.loading(false));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            // if(error.response.)
        }

    }


    //Reset Password method
    const ResetPassword = async({...data}) => {
        dispatch(authActions.loading(true))
        await csrf()

        try {
            const response = await axios.post('/reset-password',data)
            dispatch(authActions.loading(false));
            // console.log("response reset: ",response)
            showNotification({type:'success',message:response.data.status,open:true});
            
        }
        catch (error) {
            setErrors(error.response.data.errors);
            dispatch(authActions.loading(false));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            // if(error.response.)
        }

    }


    const EditUserInfo = async({...data}) => {
        dispatch(authActions.loading(true))
        console.log(data);

        try {
            const response = await axios.patch(`/api/user/${data.userId}`,{
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                address: data.address,
            });
            getUser();
            showNotification({type:'success',message:response.data.message,open:true});
            dispatch(authActions.loading(false));
            // console.log('eddi resp ',response)
        }catch (error) {
            dispatch(authActions.loading(false))
            setErrors(error.response.data.errors)
            // console.log('errerer ',error.response.data.errors)
        }
    }

    //Change Password method
    const ChangePassword = async (data)=> {
        try {
            const response = await axios.post('/api/change-password',{
                "old_password":data.old_password,
                "new_password":data.new_password,
                // "confirmation_password":data.password_confirmation
                "new_password_confirmation":data.password_confirmation
            });
            showNotification({type:'success',message:response.data.message,open:true});
            // console.log("change Password ",response)
            return response;

        }catch (error) {
            console.log('chang pass err: ',error)
            setErrors(error.response.data.errors)
        }

    }
    

    //logout method
    const logout = async() => {
        await csrf();
        await axios.post('/logout'
        ).then(() => {
            localStorage.removeItem('user');
            // const userRemoved = sessionStorage.getItem('user');
            const userRemoved = localStorage.getItem('user');
            if(userRemoved === null) {
                dispatch(authActions.logout());
                showNotification({type:'success',message:'Logout successfully',open:true})
                dispatch(cartActions.clearCart())
            }
        })
        .catch(error => {
            showNotification({type:'error',message:'Logout fail,Check your network connection',open:true})
            console.error('Logout fail: ', error)
        })
    }
    
    

    // window.onbeforeunload = function () {
    //     // event.preventDefault();
        
    //      logout();
    //     // Clear local storage
    //     // localStorage.clear();
    //     // // Clear session cookies
    //     // document.cookie.split(";").forEach(function(c) {
    //     //     document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    //     // });
    // };

    return {
        isLoggedIn: isLoggedIn,
        user: user ,
        userData: userData,
        errors: errors,
        setErrors:setErrors, 
        login: login,
        logout: logout,
        loading:loading,
        error: error,
        getUser: getUser,
        VerifyUser: VerifyUser,
        ForgotPassword: ForgotPassword,
        ResetPassword: ResetPassword,
        EditUserInfo: EditUserInfo,
        ChangePassword: ChangePassword,
    }
    
}

export default useAuthActions;