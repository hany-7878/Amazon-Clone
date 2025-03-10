import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "../../Utility/reducer";

export const DataContext = createContext(); 

export const DataProvider = ({ children }) => {
    const value = useReducer(reducer, initialState); 
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
