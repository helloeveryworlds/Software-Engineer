import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../groce-Save/src/components/CartReducer";
import ShopReducer from "../groce-Save/src/components/ShopReducer";


export default configureStore ({
    reducer:{
        cart:CartReducer,
        shop:ShopReducer
    }
})

// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import authReducer from "./reducers/auth";
// const middleware = [thunk];
// const store = createStore(authReducer, applyMiddleware(...middleware));
// export default store;