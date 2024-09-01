import { useEffect, useState } from "react";
import useAuthActions from "../redux/useHooks/useAuthActions";
import FadeSpinner from "../spinners/FadeSpinner";
import { useParams, useSearchParams } from "react-router-dom";


const ResetPassword = () => {
    // const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const [values, setValues] = useState({
        email: '',
        token: '',
        password: '',
        password_confirmation: ''
    });
    
    const {ResetPassword ,errors,setErrors,loading} = useAuthActions();
    // const errorEmail = errors.response && errors.response.data.errors;
    const [searchParams] = useSearchParams();
    const [passErrors,setPassErrors] = useState(errors);
    console.log('passerror', passErrors)
    const {token} = useParams();
    console.log("errors:::::::: ", errors && errors)

    useEffect(()=>{
        const emailParam = searchParams.get('email');
        setValues(prevValues => ({...prevValues, email:emailParam}));
        setValues(prevValues => ({...prevValues, token:token}));
        console.log('emmmail: ',values.email);
    },[]);

    const handleChange =(event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues(prevValues => ({...prevValues, [name]:value}));
            setErrors({});
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            // console.log("values; ",values)
            ResetPassword({...values});

        }catch (error) {
           
            console.log('forgot reset password ', error);
        }
        
    }

    return (
        <>
            <div className="ui raised very padded text container segment">
                <div className="mb-10 text-center md:mb-16">
                    Add your new password
                </div>
                <form class="ui form error" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label  className="form-label">Password</label>
                        <input style={{background: '',color:''}} type="password" className="form-control" id="exampleInputPassword1"
                        name="password" onChange={handleChange}/>
                        {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Confirm Password</label>
                        <input style={{background: '',color:''}} type="password" className="form-control" id="exampleInputPassword2"
                        name="password_confirmation" onChange={handleChange}/>
                    </div>
                    <button type="submit" class="ui submit button blue">{loading? <FadeSpinner/>:'Submit'}</button>
                </form>
            </div>
        </>
    );
}


export default ResetPassword;