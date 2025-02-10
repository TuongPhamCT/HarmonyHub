import React, { createContext, useContext, useState } from "react";

const ForceUpdateContext = createContext(() => {});

export const ForceUpdateProvider = ({ children }) => {
    const [_, setUpdate] = useState(0);
    const forceUpdate = () => setUpdate(prev => prev + 1);

    return (
        <ForceUpdateContext.Provider value={forceUpdate}>
            {children}
        </ForceUpdateContext.Provider>
    );
};

export const useForceUpdate = () => useContext(ForceUpdateContext);