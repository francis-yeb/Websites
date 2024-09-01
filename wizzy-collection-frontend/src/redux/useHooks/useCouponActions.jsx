import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { couponActions, createCoupon } from "../slice/CouponSlice";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useNotificationActions from "./useNotificationActions";


const useCouponActions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {showNotification} = useNotificationActions();
    let {coupons,selectedCoupon,type,appliedCouponResults,loading,error} = useSelector(state => state.coupon);

    //Gettin all coupons from the backend api
    const allCoupons = async () => {
        try{
            const response = await axios.get('/api/coupons');
            dispatch(couponActions.allCoupons(response.data.data));
            // console.log("Coupons", response.data.data);
            return response.data.data;
        }
        catch (error) {
            console.log("Errors",error);

        }

    }

    //Gettin all coupons from the backend api
    const singleCoupon = async () => {
        try{
            const response = await axios.get('/api/coupons');
            dispatch(couponActions.allCoupons(response.data));
            // console.log("Coupons", response.data);
            return response.data;
        }
        catch (error) {
            console.log("Errors",error);

        }

    }

    //Applying coupon to the cart items
    
    const applyCoupon = async ({...data}) => {
        try {
            const response = await axios.post('/api/coupons/apply',data);
            console.log("coupon data",data);
            if(response.data.status === 'success'){
                const data = response.data.data;
                dispatch(couponActions.appliedCouponData(data));
                // console.log("apply coupon",response.data);

            }
            // console.log("response",response);
            showNotification({type:'success',message:'Coupon has been applied!',open:true});
            
        }
        catch (error) {
            const message = error.response.data.errors.code[0];
            dispatch(couponActions.errors(error.response.data.errors))
            showNotification({type:'error',message:message,open:true});
            console.log("error",error);
                    
            // console.log("apply coupon error", error.response.data.errors);
        }
    }

    const removeCoupon = () =>{
        dispatch(couponActions.removeCoupon());
    }

    //Creating new coupon
    const addCoupon = async ({...data}, closeEvent) => {
        const response = dispatch(createCoupon(data)).then(result => {
            // console.log("Results",result);
            if (result.payload && result.payload.success){
                closeEvent()
                Swal.fire("New Coupon", "You have successfully add new coupon.", "success")
                
                allCoupons();
                
            }else{
                console.log("payload add errr: ", result)
            }
        });
        // console.log("coupon response",response);
    }

    //Deleting coupon from the backend api
    const deleteCoupon = async (couponId) => {
        try {
            const response = await axios.delete(`/api/coupons/${couponId}`);
            // console.log("respons", response);
            Swal.fire("Deleted!", "The coupon has been deleted.", "success");
            allCoupons();
        } catch (error){
            console.log("delete error",error);
        }
    }

    // useEffect(() => {
    //     allCoupons()
    // });

    return {
        coupons,
        selectedCoupon,
        type,
        appliedCouponResults,
        loading,
        error,
        allCoupons,
        addCoupon,
        deleteCoupon,
        applyCoupon,
        removeCoupon,
    }

}

export default useCouponActions;