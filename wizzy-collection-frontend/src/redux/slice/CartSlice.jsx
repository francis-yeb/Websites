import { createSlice } from "@reduxjs/toolkit";


// export const CartComponent = () => {

export const GetItemsFromStorage = () => {
    const jsonLocalstoreUser = localStorage.getItem('user');
    const JsonLocalstorageCart = localStorage.getItem('cart');
    const JsonSessionstorageCart = sessionStorage.getItem('cart');
    const jsonUserToObject = JSON.parse(jsonLocalstoreUser)
    
    const sessionJsonCartBackToObject = JSON.parse(JsonSessionstorageCart);
    if (!jsonLocalstoreUser ) {
        return sessionJsonCartBackToObject || [];
    }
    
    
    const locaJsonCartbackToObject = JSON.parse(JsonLocalstorageCart);
    
    if (!locaJsonCartbackToObject || jsonUserToObject.id !== locaJsonCartbackToObject.user) {
        return [];
    }

    if(!jsonUserToObject){
        return sessionJsonCartBackToObject
    }
    
    return locaJsonCartbackToObject.items || [];
}

    

    // const store = GetItemsFromStorage(); // Return the result of GetItemsFromStorage directly
    // return store;
// }


const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemList: GetItemsFromStorage() || [],
        totalQuantity: 0,
        totalPrice: 0.0,
        showCart: false,
    },
    reducers: {
        addToCart: (state,action) => {
            const newItem = action.payload;
            //to check if the item is already is available
            // localStorage.setItem('cart',JSON.stringify(state.itemList))
            // const itemsstorage = localStorage.getItem('cart')
            // console.log("Items in local storage: ",state.itemList)
            const existingItem = state.itemList.find((item)=> item.id === newItem.id);
            
            if (existingItem){
                existingItem.quantity++;
                existingItem.totalPrice += parseFloat(newItem.price);
                // state.totalPrice = existingItem.totalPrice + parseFloat(newItem.price);
            }else {
                
                state.itemList.push({
                    id: newItem.id,
                    price: parseFloat(newItem.price),
                    quantity: 1,
                    totalPrice: parseFloat(newItem.price),
                    title: newItem.title,
                    image: newItem.image
                })
                // state.totalPrice = parseFloat(newItem.price);
            }
            state.totalQuantity++
            
        },

        incrementItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.itemList.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice +=parseFloat( existingItem.price);
                state.totalQuantity++;
            }
        },
        
        decrementItem: (state,action) => {
            const id = action.payload;

            const existingItem = state.itemList.find(item => item.id === id);
            if(existingItem){
                if (existingItem.quantity === 1){
                    state.itemList = state.itemList.filter(item => item.id !== id);
                }else {
                    existingItem.quantity--;
                    existingItem.totalPrice -= existingItem.price;
                }
                state.totalQuantity--;
            }
        },
        removeFromCart: (state,action) => {
            const id = action.payload;

            const existingItem = state.itemList.find(item => item.id === id);
            if(existingItem){
                state.itemList = state.itemList.filter(item => item.id !== id);
                
            }
        },
        
        setShowCart: (state)=>{
            state.showCart = !state.showCart;
        }, 

        clearCart: state => {
            state.itemList = []
        },

        totalAmount: (state,action) => {
            state.totalPrice = action.payload;
        }
    }
});

export const cartActions = CartSlice.actions;

export default CartSlice;