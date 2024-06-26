import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

export const CartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { name, color, size, img, price, quantity } = action.payload;
            const id = `${name}-${color}-${size}`;
            let foundItem = state.items.find(item => item.id === id);

            if (foundItem) {
                foundItem.quantity += quantity;
            } else {
                state.items.push({ id, name, color, size, img, price, quantity });
            }
        },
        deleteItem: (state, action) => {
            const param = action.payload.split(' ')
            if (param[0] === 'all') {
                state.items = state.items.filter(item => item.name !== param[1]);
            } else {
                state.items = state.items.filter(item => item.id !== action.payload);
            }

        },
        changeQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(item2 => item2.id !== id);
                }
            }
        }
    },
});

export const { addItem, deleteItem, changeQuantity } = CartSlice.actions;

export default CartSlice.reducer;