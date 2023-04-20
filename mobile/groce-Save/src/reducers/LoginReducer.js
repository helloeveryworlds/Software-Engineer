import { LOGIN_SUCCESS, LOGOUT } from "../actions/type";
import AsyncStorage from "@react-native-async-storage/async-storage";
const user = AsyncStorage.getItem("user");
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
export default auth = (state = initialState, action) => {
  const { type, payload } = action;
switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

// import { createSlice } from "@reduxjs/toolkit";

// export const shopSlice = createSlice({
//     name:"shop",
//     initialState:{
//         shop:[],
//     },
//     reducers:{
//         addToShoppingList : (state,action) => {
//             const itemInShop = state.shop.find((item) => item.name == action.payload.name);
//             if(itemInShop){
//                 itemInShop.quantity++;
//             }else{
//                 state.shop.push({...action.payload,quantity:1})
//             }
//         },
//         removeFromShop : (state,action) => {
//             const removeFromShop = state.shop.filter((item) => item.name !== action.payload.name);
//             state.shop = removeFromShop;
//         }
//     }
// });


// export const {addToShoppingList,removeFromShop} = shopSlice.actions;

// export default shopSlice.reducer;