import React, { createContext, useState, useContext, useCallback } from "react";

// 1. Tạo Context
const FavoriteContext = createContext();

// 2. Tạo Provider để bọc toàn bộ ứng dụng
export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState({}); // Trạng thái chung theo ID

    const toggleFavorites = useCallback((id) => {
        setFavorites(prev => ({
            ...prev,
            [id]: !prev[id] // Đảo trạng thái favorite theo ID
        }));
    }, []);

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};

// 3. Custom hook để dùng trong component khác
export const useFavorite = () => useContext(FavoriteContext);