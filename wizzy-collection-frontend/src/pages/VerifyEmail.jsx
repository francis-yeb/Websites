import useAuthActions from "../redux/useHooks/useAuthActions";


const VerifyEmail = () => {
    const {VerifyUser,logout} = useAuthActions();
    const handleEmailVerification = () => {
        VerifyUser()
    }

    return (
        <>
            <div class="ui raised very padded text container segment">
                <img class="ui centered medium image" src={'/ver-email.png'}/>
                <h1 className="ui header centered">Verify your email address</h1>
                <h3 className="ui header centered">Please click the button below to verify your email address</h3>
                
                <div className="d-flex justify-content-between">
                <div onClick={handleEmailVerification} class="ui animated centered button blue " tabindex="0">
                    <div class="visible content">RESEND VERIFICATION EMAIL</div>
                    <div class="hidden content">
                        <i class="envelope outline icon"></i>
                    </div>
                </div>

                <div onClick={logout} class="ui animated centered button  " tabindex="0">
                    <div class="visible content">logout</div>
                    <div class="hidden content">
                        <i class="sign-out icon"></i>
                    </div>
                </div>
                </div>

            </div>
        </>
    );
}


export default VerifyEmail;