import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { userService } from "../services/userService";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  // Загрузка при инициализации
  useEffect(() => {
    setFavorites(userService.getFavorites());
    setAllUsers(userService.getAllUsers());
  }, []);

  // Синхронизация избранных с localStorage
  useEffect(() => {
    if (favorites.length >= 0) {
      userService.saveFavorites(favorites);
    }
  }, [favorites]);

  const addFavorite = useCallback((user) => {
    setFavorites((prev) => userService.addToFavorites(prev, user));
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => userService.removeFromFavorites(prev, id));
  }, []);

  const updateFavorite = useCallback((id, updatedUser) => {
    // Обновляем в избранном
    setFavorites((prev) => userService.updateUser(prev, id, updatedUser));

    // Обновляем в allUsers
    setAllUsers((prev) => {
      const updated = userService.updateUser(prev, id, updatedUser);
      userService.saveAllUsers(updated);
      return updated;
    });
  }, []);

  const setAllUsersData = useCallback((users) => {
    setAllUsers(users);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        allUsers,
        addFavorite,
        removeFavorite,
        updateFavorite,
        setAllUsersData,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
