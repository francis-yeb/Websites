import { useState, useRef, useEffect} from "react";
import { Container } from "react-bootstrap";
import { Link} from "react-router-dom";
import { FormLog } from "../components/FormLog";
// import useNotificationActions from "../redux/useHooks/useNotificationActions";
import useAuthActions from "../redux/useHooks/useAuthActions";
import FadeSpinner from "../spinners/FadeSpinner";
    

export const Login = () => {
        // const {showNotification} = useNotificationActions();
        const {login,error,loading} = useAuthActions();
        const [serverErrors, setServerErrors] = useState({});
        const emailRef = useRef();
        // const errorRef = useRef();

        const [values, setValues] = useState({
            email: '',
            password: ''
        })

        useEffect(() => {
            setServerErrors(error || {});
            if (emailRef.current) {
                emailRef.current.focus();
            }
        }, [error]);

        
        const handleChange = (event)=> {
            const name = event.target.name;
            const value = event.target.value;
            setValues(values => ({...values, [name]:value}));
            
        }

        const storeCookie = document.cookie.split(';');
        storeCookie.forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            // console.log("user in local    cookie login: ",value)
        })

        const onSubmit = async(e) => {
            e.preventDefault();
            login({...values});
        }

        return (
            <div>
            {/* {<Notification type={'success'} message={'Login'}/>} */}
            <Container   className="topPad">
            <div style={{marginTop:'10px'}} className="row d-flex">
                <FormLog />

            <form className="auth-form col-xs-12 col-md-6" onSubmit={onSubmit}>
                <h1 className="d-flex justify-content-center align-items-center mt-5 mb-3">WELCOME BACK!</h1>
                <h6 className="mb-5 col-sm-12 text-center">Type your email and password to login to your account</h6>
                    <div className="mb-3">
                        <label  className="form-label">Email address</label>
                        <input style={{background: '#454545',color:'white'}} 
                        type="text" className="input form-control" id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        ref={emailRef}
                        name="email" onChange={handleChange}/>
                        {serverErrors.email && <p  aria-live="assertive" style={{color:'red'}}>{serverErrors.email[0]}</p>}
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Password</label>
                        <input style={{background: '#454545',color:'white'}}  type="password" className="input form-control" id="exampleInputPassword1"
                        name="password" onChange={handleChange}/>
                        {serverErrors.password && <p  aria-live="assertive" style={{color:'red'}}>{serverErrors.password[0]}</p>}
                    </div>
                    <div style={{textDecoration:'none', textAlign:'center'}} className="mb-3">
                        <Link to={"/forgot-password"} style={{textDecoration:'none'}}>Forgot password?</Link>
                    </div>
                    <button style={{height:'50px',position:'relative'}} type="submit" className="btn w-100 btn-primary mb-3">{loading? <FadeSpinner/>:'Login'}</button>
                    {/* {serverErrors.email&&(
                        <div className="alert alert-danger" role="alert">{serverErrors.email[0]}</div>
                    )} */}
                    <div style={{textDecoration:'none', textAlign:'center'}} className="mb-3">
                        <span>Don’t have an account? <Link to='/register' style={{textDecoration:'none'}}>Sign up</Link></span>
                    </div>
                </form>
            </div>
            </Container>
            </div>
        );

    }