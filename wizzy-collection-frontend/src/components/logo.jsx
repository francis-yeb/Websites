import { Link } from "react-router-dom";

const Logo = () => {
    return (

        <>
            <Link to={'/'}>
                <img style={{ maxWidth: '100px', margin: "0px 10px" }} className='logo' src="../logo.png" alt="" />
            </Link>
        </>
    );
}

export default Logo;