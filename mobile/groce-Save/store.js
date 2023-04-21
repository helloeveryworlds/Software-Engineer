import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../groce-Save/src/reducers/CartReducer";
import ShopReducer from "../groce-Save/src/reducers/ShopReducer";

export default configureStore ({
    reducer:{
        cart:CartReducer,
        shop:ShopReducer
    }
});