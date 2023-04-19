import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../groce-Save/src/components/CartReducer";
import ShopReducer from "../groce-Save/src/components/ShopReducer";


export default configureStore ({
    reducer:{
        cart:CartReducer,
        shop:ShopReducer
    }
})