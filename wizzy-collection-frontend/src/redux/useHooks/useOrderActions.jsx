import axios from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom"
import { orderActions } from "../slice/OrderSlice";
import { useEffect } from "react";
import Swal from "sweetalert2";



const useOrderActions = () => {
    const dispatch = useDispatch();

    let {order,status,ordercategory,userOrders,loading} = useSelector(state => state.order);
   

    // eslint-disable-next-line no-unused-vars
    const csrf  = () => axios.get('/sanctum/csrf-cookie')
    .catch(err => {
        console.log("csrf errr: ",err)
    });

    const makePayement = async(data) => {
        try {
            const response = await axios.post('/api/pay',{
                email: data.email,
                total_amount: Number.parseInt(data.amount),
                user_id: data.userId,
            })
            const authorizationUrl = response.data && response.data.data.authorization_url;
            console.log("payment respo ",response);
            console.log("data sending", data)
            window.location.href = authorizationUrl;
        }
        catch (error) {

        }
    }

    //Getting the payment data after successfull transaction
    const paymentData = async(reference) => {
        try {
            const response = await axios.get(`/api/paymentData/${reference}`);
        } catch (error) {
            console.log("Error Getting PaymentData",error);
        }
    }

    //getting status
    const orderStatus = async () => {
        try {
            const response = await axios.get('/api/orders/status');
            console.log("status res...",response);
        }catch (error) {
            console.log('status errror', error);
        }
    }

    //Getting orders by status
    const ordersByStatus = async (status) => {
        try {
            const response = await axios.get(`/api/orders/bystatus/${status}`);
            dispatch(orderActions.getOrderCategory(response.data.orders))
            // console.log('status data',response.data.orders);

        }catch (error) {
            console.log('error', error);
        }

    }
    //Getting the current user orders
    const getUserOrders = async () => {
        try {
            const response = await axios.get('/api/orders/userorders');
            dispatch(orderActions.userOrders(response.data))
            console.log("user orders...", response.data);

        } catch (error) {
            console.log("user orders errors", error);
        }

    }

    //remove order category products when click on another status
    const removeOrderCategory = () => {
        dispatch(orderActions.removeOrderCategory());
    }

    //Saving the order in the backend api
    const saveOrder = async ({...data}) => {
        const response = await axios.post('/api/orders',data);
    }

    //Update order status
    const updateOrderStatus = async (data,orderId,closeEvent) => {
        loading = true;
        try {
            const response = await axios.patch(`/api/orders/${orderId}`,data);
            // dispatch(orderActions.userOrders(response.data))
            console.log("user orders...", response.data);

            if(response && response.data){
                // dispatch(productActions.productGender(response.data))
                // console.log("response after edittt ", response)
                loading = false
                closeEvent()
                Swal.fire("Update", "You have successfully updated the order.", "success")
                await getUserOrders();
                await ordersByStatus();
            }
        } catch (error) {
            console.log("user orders errors", error);
        }
    }

    //Update order status
    const cancelOrder = async (data) => {
        loading = true;
        try {
            const response = await axios.patch(`/api/orders/${data.id}`,data);
            console.log("user orders...", response.data);
            Swal.fire("Cancel!", "The order has been canceled.", "success");
            await getUserOrders();
        } catch (error) {
            console.log("user orders errors", error);
        }
    }

    //Update order status
    const reOrder = async (data) => {
        loading = true;
        try {
            const response = await axios.patch(`/api/orders/${data.id}`,data);
            console.log("user orders...", response.data);
            Swal.fire("Re-Order!", "The order has been re ordered.", "success");
            await getUserOrders();
        } catch (error) {
            console.log("user orders errors", error);
        }
        
    }
    

    // delete product
    const deleteOrder = async(orderId) => {
        await axios.delete(`/api/orders/${orderId}`)
        .catch(err => {
            console.log("delete Error: ",err)
        });
        Swal.fire("Delete!", "The order has been deleted.", "success");
        await getUserOrders();
    }

    useEffect(() => {
        getUserOrders();
        // userOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return {
        loading,
        order,
        status,
        ordercategory,
        userOrders,
        makePayement,
        paymentData,
        saveOrder,
        ordersByStatus,
        orderStatus,
        removeOrderCategory,
        getUserOrders,
        deleteOrder,
        updateOrderStatus,
        cancelOrder,
        reOrder,
    }
}


export default useOrderActions;