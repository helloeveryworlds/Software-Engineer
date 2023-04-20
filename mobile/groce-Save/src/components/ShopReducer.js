import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
    name:"shop",
    initialState:{
        shop:[],
    },
    reducers:{
        addToShoppingList : (state,action) => {
            const itemInShop = state.shop.find((item) => item.id == action.payload.id);
            if(itemInShop){
                itemInShop.quantity++;
            }else{
                state.shop.push({...action.payload,quantity:1})
            }
        },
        removeFromShop : (state,action) => {
            const removeFromShop = state.shop.filter((item) => item.id !== action.payload.id);
            state.shop = removeFromShop;
        }
        // incrementItems : (state,action) => {
        //     const itemInShop = state.shop.find((item) => item == action.payload.id);
        //     itemInShop.quantity++;
        // },
        // decrementItems : (state,action) => {
        //     const itemInShop = state.shop.find((item) => item == action.payload.id);
        //     if(itemInShop.quantity == 1){
        //         const removeFromShop = state.shop.filter((item) => item !== action.payload.id);
        //         state.shop = removeFromShop;
        //     }else{
        //         itemInShop.quantity--;
        //     }

        // }
    }
});


export const {addToShoppingList,removeFromShop} = shopSlice.actions;

export default shopSlice.reducer;