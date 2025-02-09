import React, { createContext, useState, useContext, useCallback } from "react";
import { SongService } from "../../services/apiCall/song";

// 1. Tạo Context
const FavoriteContext = createContext();

// 2. Tạo Provider để bọc toàn bộ ứng dụng
export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState({}); // Trạng thái chung theo ID

    const toggleFavorites = useCallback(async (id) => {
        console.log(favorites);
        if (favorites[id] === undefined) {
            SongService.addSongToFavorite(id);
        } else if (favorites[id]){
            SongService.removeSongFromFavorite(id);
        } else {
            SongService.addSongToFavorite(id);
        }

        setFavorites(prev => ({
            ...prev,
            [id]: (prev[id] ? !prev[id] : true) // Đảo trạng thái favorite theo ID
        }));
    }, [favorites]);

    return (
        <FavoriteContext.Provider value={{ favorites, toggleFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};

// 3. Custom hook để dùng trong component khác
export const useFavorite = () => useContext(FavoriteContext);