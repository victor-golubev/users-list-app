import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const addFavorite = (user) => {
    if (!favorites.find((u) => u.id === user.id)) {
      setFavorites([...favorites, user]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((u) => u.id !== id));
  };

  const updateFavorite = (id, updatedUser) => {
    setFavorites(
      favorites.map((u) => (u.id === id ? { ...u, ...updatedUser } : u))
    );

    const cachedUsers = localStorage.getItem("allUsers");
    if (cachedUsers) {
      const allUsers = JSON.parse(cachedUsers);
      const updatedAllUsers = allUsers.map((u) =>
        u.id === id ? { ...u, ...updatedUser } : u
      );
      localStorage.setItem("allUsers", JSON.stringify(updatedAllUsers));
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, updateFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
