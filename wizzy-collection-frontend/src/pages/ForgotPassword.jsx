import { useState } from "react";
import useAuthActions from "../redux/useHooks/useAuthActions";
import axios from "axios";
import FadeSpinner from "../spinners/FadeSpinner";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    // const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const {ForgotPassword ,errors,setErrors,loading} = useAuthActions();
    const errorEmail = errors.response && errors.response.data.errors;
    // console.log("errors: ", errors.response && errors.response.data.errors.email)

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            ForgotPassword({email});

        }catch (error) {
           
        }
        // console.log('forgot password ', email);
        
    }

    return (
        <>
        <div className="ui raised very padded text container segment">
            <div className="mb-10 text-center md:mb-16">
                Forgot your password? Let us know your email address and we will email you a password reset link
            </div>
            <div class="ui form error">
                <div class="field">
                    <label>E-mail</label>
                    <input name={'email'} onChange={e => {setEmail(e.target.value);setErrors({})}} type="email" placeholder="joe@schmoe.com"/>
                </div>
                {errorEmail && <p  aria-live="assertive" style={{color:'red'}}>{errorEmail.email[0]}</p>}
                {/* <div class="ui error message">
                    <div class="header ">Action Forbidden</div>
                    <p>You can only sign up for an account once with a given e-mail address.</p>
                </div> */}
                <div onClick={handleSubmit} class="ui submit button blue">{loading? <FadeSpinner/>:'Submit'}</div>
                </div>
            </div>
        </>
    );
}


export default ForgotPassword;