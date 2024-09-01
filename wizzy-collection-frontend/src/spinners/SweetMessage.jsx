import { useEffect } from "react";
import Swal from "sweetalert2";

const SweetMessage = ({ title, message, type }) => {
    useEffect(() => {
      Swal.fire({
        title: title,
        text: message,
        icon: type,
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timer: 3000, // Adjust the timer as needed
        customClass: {
          container: 'sweet-alert-container'
        }
      });
    }, [title, message, type]);
  
    return null; // Don't render anything for this component
  };
  
  export default SweetMessage;
  