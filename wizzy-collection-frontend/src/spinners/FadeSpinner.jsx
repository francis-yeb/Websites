import { CButton, CSpinner } from "@coreui/react";
import { FadeLoader } from "react-spinners";


const FadeSpinner = () => {
    return (
        <>
            <div className="spinner" >
                <div className="spinner"  >
                    {/* <FadeLoader size={'sm'} color="white"/> */}
                    {/* <CButton color="primary" disabled> */}
                        <CSpinner as="span" size="sm" variant="grow" aria-hidden="true" />
                        Loading...
                    {/* </CButton> */}
                </div>
            </div>
        </>
    );
}


export default FadeSpinner;