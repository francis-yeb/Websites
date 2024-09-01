import { RingLoader } from "react-spinners";


const Spinner = () => {
    return (
        <>
            <div className="spinner-overlay">
                <div className="spinner-container">
                    <RingLoader size={60} color="blue"/>
                </div>
            </div>
        </>
    );
}


export default Spinner;