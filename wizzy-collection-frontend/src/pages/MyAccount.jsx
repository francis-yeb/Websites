import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import FadeSpinner from "../spinners/FadeSpinner";
import useRegisterActions from "../redux/useHooks/useRegisterActions";
import useAuthActions from "../redux/useHooks/useAuthActions";
import { useParams } from "react-router-dom";


const MyAccount = () => {
    const {userId} = useParams();
    // console.log("User params: ", userId);
    // const {loading} = useRegisterActions();
    const {user,loading,EditUserInfo,ChangePassword,errors,setErrors,getUser} = useAuthActions();
    // console.log('user update errr ',user)
    const [values, setValues] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: user?.address || '',
        phone_number: user?.phone_number || '',
        userId: userId || null,
        old_password: '',
        new_password: '',
        password_confirmation: ''
    })
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues(prevValues => ({...prevValues,[name]:value}));
        
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        EditUserInfo(values);
        
    }

    const handleChangePassword = async(event) => {
        event.preventDefault();
        const response = await ChangePassword({
            "old_password":values.old_password,
            "new_password":values.new_password,
            "password_confirmation":values.password_confirmation
        })
        // console.log("rrrrrr: ",response&&response.status)
        if(response && response.status === 200){
            setValues({
                old_password: '',
                new_password: '',
                password_confirmation: ''
            });
        }
    }

    useEffect(() => {
        getUser();
    },[]);

    
    return (
        <div className="topPad" style={{paddingBottom:'20px'}}>
        {/* User personal Information */}
            <div class="ui raised very padded text container segment">
                <h2 className="ui header">Profile Information</h2>
                <h4 className="ui header">Update your account’s information and email address.</h4>
                
                <form class="ui form" onSubmit={handleEditSubmit}>
                    <div class="field">
                        <label>Full Name</label>
                        <input type="text" name={'name'} onChange={handleChange} value={values.name}/>
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input type="text" name="email" onChange={handleChange} value={values.email}/>
                    </div>
                    {errors.email && <p  aria-live="assertive" style={{color:'red'}}>{errors.email[0]}</p>}
                    <div class="field">
                        <label>Phone Number</label>
                        <input type="text" name="phone_number" onChange={handleChange} value={values.phone_number}/>
                    </div>
                    {errors.phone_number && <p  aria-live="assertive" style={{color:'red'}}>{errors.phone_number[0]}</p>}
                    
                    <div class="field">
                        <label>Address</label>
                        <input type="text" name="address" onChange={handleChange} value={values.address}/>
                    </div>
                    {errors.address && <p  aria-live="assertive" style={{color:'red'}}>{errors.address[0]}</p>}
                    
                    <button class="ui button blue" type="submit">{loading?<FadeSpinner/>:"Save"}</button>
                </form>
                
            </div>

            {/* Change password */}
            <div class="ui raised very padded text container segment">
                <h2 className="ui header">Change Password</h2>
                {/* <h4 className="ui header">Update your account’s information and email address.</h4> */}
                
                <form class="ui form" onSubmit={handleChangePassword}>
                    <div class="field">
                        <label>Old Password</label>
                        <input type="password" name="old_password" value={values.old_password} onChange={handleChange}/>
                    </div>
                    {errors.old_password && <p  aria-live="assertive" style={{color:'red'}}>{errors.old_password[0]}</p>}
                    <div class="field">
                        <label>New Password</label>
                        <input type="password" name="new_password" value={values.new_password} onChange={handleChange}/>
                    </div>
                    {errors.new_password && <p  aria-live="assertive" style={{color:'red'}}>{errors.new_password[0]}</p>}
                    <div class="field">
                        <label>Confirm Password</label>
                        <input type="password" name="password_confirmation" value={values.password_confirmation} onChange={handleChange} />
                    </div>
                    
                    <button class="ui button blue" type="submit">Change Password</button>
                </form>
                
            </div>
        
        </div>
    );
}


export default MyAccount;