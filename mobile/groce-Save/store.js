import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../groce-Save/src/reducers/CartReducer";
import ShopReducer from "../groce-Save/src/reducers/ShopReducer";
import LoginReducer from "../groce-Save/src/reducers/LoginReducer";

export default configureStore ({
    reducer:{
        cart:CartReducer,
        shop:ShopReducer,
        login: LoginReducer
    }
});