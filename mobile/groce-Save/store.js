import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../groce-Save/src/components/CartReducer";


export default configureStore ({
    reducer:{
        cart:CartReducer
    }
})