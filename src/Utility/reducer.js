
import { type } from './action.type';

export const initialState = {
    basket: [],
    user: null,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case type.ADD_TO_BASKET:
            //* Check if the item exists
            const existingItem = state.basket.find((item) => item.id === action.item.id);
            if (!existingItem) {
                return {
                    ...state,
                    basket: [...state.basket, { ...action.item, amount: 1 }]
                };
            } else {
                const updatedBasket = state.basket.map((item) => {
                    return item.id === action.item.id
                        ? { ...item, amount: item.amount + 1 }
                        : item;
                });
                return {
                    ...state,
                    basket: updatedBasket
                };
            }

        case type.REMOVE_FROM_BASKET:
            const index = state.basket.findIndex((item) => item.id === action.id);
            let newBasket = [...state.basket];

            if (index >= 0) {
                if (newBasket[index].amount > 1) {
                    newBasket[index] = { ...newBasket[index], amount: newBasket[index].amount - 1 };
                } else {
                    newBasket.splice(index, 1);
                }
            }
            return {
                ...state,
                basket: newBasket
            };
            case type.EMPTY__BASKET:
                return {
                   ...state,
                    basket :[]
                }

            case type.SET_USER:
                return{
                    ...state,
                    user: action.user,
                };

        default:
            return state;
    }
};
