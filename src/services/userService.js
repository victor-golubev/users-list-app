export const userService = {
  getAllUsers: () => {
    const cached = localStorage.getItem("allUsers");
    return cached ? JSON.parse(cached) : [];
  },

  saveAllUsers: (users) => {
    localStorage.setItem("allUsers", JSON.stringify(users));
  },

  getFavorites: () => {
    const cached = localStorage.getItem("favorites");
    return cached ? JSON.parse(cached) : [];
  },

  saveFavorites: (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  },

  fetchUsersFromAPI: async () => {
    const response = await fetch("https://randomuser.me/api/?results=12");
    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }
    const data = await response.json();

    return data.results.map((user, index) => ({
      id: index + 1,
      name: `${user.name.first} ${user.name.last}`,
      username: user.login.username,
      email: user.email,
      age: user.dob.age,
    }));
  },

  addToFavorites: (favorites, user) => {
    if (favorites.find((u) => u.id === user.id)) {
      return favorites;
    }
    return [...favorites, user];
  },

  removeFromFavorites: (favorites, userId) => {
    return favorites.filter((u) => u.id !== userId);
  },

  updateUser: (users, userId, updatedData) => {
    return users.map((u) => (u.id === userId ? { ...u, ...updatedData } : u));
  },

  searchUsers: (users, query) => {
    if (!query.trim()) return users;

    const lowerQuery = query.toLowerCase();
    return users.filter(
      (user) =>
        (user.name?.toLowerCase() || "").includes(lowerQuery) ||
        (user.username?.toLowerCase() || "").includes(lowerQuery)
    );
  },

  createUser: (userData) => {
    return {
      ...userData,
      id: Date.now(),
    };
  },
};
