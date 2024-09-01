import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { FormLog } from "../components/FormLog";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import axios from "../api/axios";
import useRegisterActions from "../redux/useHooks/useRegisterActions";
import FadeSpinner from "../spinners/FadeSpinner";
// import useAuthContenx from "../context/AuthContext";

export const Register = () => {
    const {register,error,loading} = useRegisterActions();
    console.log("server errors: ", error)
    const [errors, setErrors] = useState({});
    const [valid, setValid] = useState(true);
    const phoneValidation = (phone_number) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phone_number);
    }
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone_number:'',
        password_confirmation: '',

    });

    useEffect(()=>{
        setErrors(error || {})
    },[error]);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        register({...values});
        
        
    };

    const handleChange = (event, value) => {
        
        if(event !== 'phone_number'){
            const name = event.target.name;
            const value = event.target.value;
            setValues(values => ({...values, [name]: value}));
        }
        if (event === 'phone_number') {
            // setValid(phoneValidation(value));
            setValues(values => ({...values, [event]: value}));
        }
    }

    return (
        <div>
           <Container  className="topPad">
            <div style={{marginTop:'10px'}} className="row d-flex ">
                <FormLog className=''/>

                <form className="auth-form col-xs-12 col-md-6 " onSubmit={handleSubmit}>
                    {/* {csrf()} */}
                    <h1 className="d-flex justify-content-center align-items-center mt-5 mb-5">Create Account</h1>
                    <div className="mb-3">
                        <label  className="form-label">Name</label>
                        <input style={{background: '#454545',color:'white'}} type="text" className="form-control" id="name" 
                        aria-describedby="emailHelp" 
                        name='name' onChange={handleChange}/>
                        {errors.name && <p style={{color:'red'}}>{errors.name}</p>}
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Email address</label>
                        <input style={{background: '#454545',color:'white'}} type="text" className="form-control" id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        name="email" onChange={handleChange}/>
                        {errors.email && <p  aria-live="assertive" style={{color:'red'}}>{errors.email[0]}</p>}
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Phone Number</label>
                        <PhoneInput 
                        // containerStyle={{ backgroundColor: 'blue' }} 
                        inputStyle={{background:'none', color:'white',border:'none',width:'100%'}} 
                        country={'gh'}
                        name='phone_number'
                        style={{background: '#454545',color:'white'}}  
                        className="form-control" id="exampleInputPhone" 
                        aria-describedby="phoneHelp" 
                        onChange={(value) => handleChange('phone_number', value)}
                        />
                        {errors.phone_number && <p style={{color:'red'}}>{errors.phone_number}</p>}
                        {/* {!valid && <p style={{color:'red'}}>Please enter a valid</p>} */}
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Password</label>
                        <input style={{background: '#454545',color:'white'}} type="password" className="form-control" id="exampleInputPassword1"
                        name="password" onChange={handleChange}/>
                        {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Confirm Password</label>
                        <input style={{background: '#454545',color:'white'}} type="password" className="form-control" id="exampleInputPassword2"
                        name="password_confirmation" onChange={handleChange}/>
                    </div>
                        
                    <button type="submit" className="btn w-100 btn-success">{loading? <FadeSpinner/>:"Register"}</button>
                    <div style={{textDecoration:'none', textAlign:'center'}} className="mb-3">
                        <span>Already have an account? <Link to='/login' style={{textDecoration:'none'}}>Login</Link></span>
                    </div>
                </form>
           </div>
           </Container>
        </div>
    );
}




 