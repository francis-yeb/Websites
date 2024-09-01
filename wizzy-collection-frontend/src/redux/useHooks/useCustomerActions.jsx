import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { customerActions } from "../slice/CustomerSlice";
import Swal from "sweetalert2";
import { useEffect } from "react";
import useAuthActions from "./useAuthActions";
import { registerUser } from "../slice/RegisterSlice";


const useCustomerActions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {getUser,user} = useAuthActions();
    const {allCustomers,loading,error} = useSelector(state => state.customer);

    //Fetching all customers data
    const customers = async () => {
        try {
            const response = await axios.get('/api/customers');
            const customersData = response.data && response.data.data;
            dispatch(customerActions.allCustomers(customersData));
            // console.log("response", customersData);
        }catch (error){

        }
    }

    //Add Customer
    const addCustomer = async({...data},closeEvent) => {
        dispatch(registerUser(data)).then(result => {
            if (result.payload && result.payload.product){
                closeEvent()
                Swal.fire("New Product", "You have successfully add new product.", "success")
                
                customers();
                
            }else{
                console.log("payload add errr: ", result)
            }
        });
        
    }

    //Updating customer information
    const editCustomer = async (data,customerId,closeEvent) => {
        console.log("edit data.... id",typeof customerId);
        console.log("Data",data.get('address'));
        // loading = true;
        dispatch(customerActions.loading(true))
        try {
            const response = await axios.post(`/api/customers/${customerId}`,data
            //     {
            //     id: data.get('id'),
            //     name: data.get('name'),
            //     email: data.get('email'),
            //     phone_number: data.get('phone_number'),
            //     address: data.get('address'),
            // }
            ,{
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            }
            );
            getUser();
            console.log("Response",response);
            if(response && response.data){
                // dispatch(productActions.productGender(response.data))
                // console.log("response after edittt ", response)
                dispatch(customerActions.loading(false));
                closeEvent()
                Swal.fire("Update", "You have successfully updated the customer information.", "success")
                customers();
            }
            
        }
        catch (error) {
            console.log("Error ", error.response.data.errors)
            dispatch(customerActions.errors(error.response.data.errors))
            // closeEvent()
            // Swal.fire("Error!!", error.response.data.message, "error")
        }
    }

    // remove customer from the system
    const deleteCustomer = async(customerId) => {
        const response = await axios.delete(`/api/customers/${customerId}`)
        
        .catch(err => {
            console.log("delete Error: ",err)
        });
        console.log("Delete user",response);
        Swal.fire("Deleted!", "Customer has been deleted.", "success");
        customers()
    }

    useEffect(() => {
        customers();
    },[user]);

    return {
        allCustomers,
        loading,
        error,
        customers,
        editCustomer,
        addCustomer,
        deleteCustomer,
    }

}

export default useCustomerActions;