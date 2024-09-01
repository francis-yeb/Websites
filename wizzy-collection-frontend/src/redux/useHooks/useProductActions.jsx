import { useDispatch, useSelector} from "react-redux";
// import { useNavigate} from "react-router-dom";
import { addNewProduct, productActions } from "../slice/ProductSlice";
import { useEffect } from "react";
import axios from "../../api/axios";
import Swal from "sweetalert2";



const useProductActions = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.allProducts);
    const viewProduct = useSelector(state=> state.product.selectedProduct);
    let {productSize,productCategories,productGenders,product,error,loading,categoryProducts} = useSelector((state) => state.product);
    // const csrf =() => axios.get('/sanctum/csrf-cookie');
    const allProducts = async() => {
       try{
        const response = await axios.get('/api/products');
        dispatch(productActions.allProducts(response.data))
        return response.data
       } catch(error){
        console.log("Err: ",error)
       }
        
       
    }

    const getAllCetegoryProducts = async(category) => {
       try{
        const response = await axios.get(`api/products/category/${category}`);
        dispatch(productActions.allCategoryProducts(response.data))
        return response.data.products
        // console.log("all category products",response.data.products)
       } catch(error){
        console.log("Err: ",error)
       }
        
       
    }

    const getProductDetail = async (productId) => {
        const response = await axios.get(`/api/products/${productId}`)
        .catch(err => {
            console.log("Error: ",err)
        });
        dispatch(productActions.selectedProduct(response.data));
        
    }
    const removeSelectedProduct = () => {
        dispatch(productActions.removeSelectedProduct());
    }
    const removeProductCategory = () => {
        dispatch(productActions.removeProductCategory());
    }

    // Getting product size from the server api
    const getProductCategory = async() => {
        
        try {
            const response = await axios.get("/api/productCategory")
            if(response && response.data){
                dispatch(productActions.productCategory(response.data))
            }
        }
        catch (error) {
            console.log("Error ", error)
        }

    }
    // Getting product size from the server api
    const getProductSizes = async() => {
        
        try {
            const response = await axios.get("/api/productSizes")
            if(response && response.data){
                dispatch(productActions.productSizes(response.data))
            }
        }
        catch (error) {
            console.log("Error ", error)
        }

    }
    // Getting product size from the server api
    const getProductGender = async() => {
        
        try {
            const response = await axios.get("/api/genders")
            if(response && response.data){
                dispatch(productActions.productGender(response.data))
            }
        }
        catch (error) {
            console.log("Error ", error)
        }

    }
    //Add Product method
    const addProduct = async({...data},closeEvent) => {
        dispatch(addNewProduct(data)).then(result => {
            if (result.payload && result.payload.product){
                closeEvent()
                Swal.fire("New Product", "You have successfully add new product.", "success")
                
                allProducts();
                
            }else{
                console.log("payload add errr: ", result)
            }
        });
        
    }

    const editProduct = async (data,productId,closeEvent) => {
        // console.log("edit data.... id",productId)
        loading = true;
        try {
            const response = await axios.post(`/api/products/${productId}`,data
            ,{
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            })
            if(response && response.data){
                // dispatch(productActions.productGender(response.data))
                // console.log("response after edittt ", response)
                loading = false
                closeEvent()
                Swal.fire("Update", "You have successfully updated the product.", "success")
                allProducts()
            }
            
        }
        catch (error) {
            console.log("Error ", error)
            closeEvent()
            Swal.fire("Error!!", error.response.data.message, "error")
        }
    }

    // delete product
    const deleteProduct = async(productId) => {
        const response = await axios.delete(`/api/products/${productId}`)
        
        .catch(err => {
            console.log("delete Error: ",err)
        });
        Swal.fire("Deleted!", "The product has been deleted.", "success");
        allProducts()
    }

    
    
    useEffect(()=> {
        allProducts()
        
    },[]);

    return {
        products: products,
        product:product,
        singleProductView: viewProduct,
        productSize: productSize,
        productGenders:productGenders,
        productCategories: productCategories,
        categoryProducts: categoryProducts,
        error:error,
        loading: loading,
        allProducts: allProducts,
        getProductDetail: getProductDetail, 
        removeSelectedProduct:removeSelectedProduct,
        deleteProduct: deleteProduct,
        getProductSizes: getProductSizes,
        getProductCategory: getProductCategory,
        getProductGender: getProductGender,
        addProduct: addProduct,
        editProduct: editProduct,
        getAllCetegoryProducts: getAllCetegoryProducts,
        removeProductCategory: removeProductCategory,
        
   }
}


export default useProductActions;