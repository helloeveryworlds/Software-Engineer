import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name:"shop",
    initialState:{
        shop:[],
    },
    reducers:{
        addToShoppingList : (state,action) => {
            const itemInShop = state.shop.find((item) => item.name == action.payload.name);
            if(itemInShop){
                itemInShop.quantity++;
            }else{
                state.shop.push({...action.payload,quantity:1})
            }
        },
        removeFromShop : (state,action) => {
            const removeFromShop = state.shop.filter((item) => item.name !== action.payload.name);
            state.shop = removeFromShop;
        },
        clearShop: (state,action) => {
            const empty = [];
            state.shop = empty;
        }
    }
});


export const {addToShoppingList,removeFromShop, clearShop} = shopSlice.actions;

export default shopSlice.reducer;