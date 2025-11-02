// Бизнес-логика работы с пользователями
export const userService = {
  // Получить всех пользователей из localStorage
  getAllUsers: () => {
    const cached = localStorage.getItem("allUsers");
    return cached ? JSON.parse(cached) : [];
  },

  // Сохранить всех пользователей в localStorage
  saveAllUsers: (users) => {
    localStorage.setItem("allUsers", JSON.stringify(users));
  },

  // Получить избранных из localStorage
  getFavorites: () => {
    const cached = localStorage.getItem("favorites");
    return cached ? JSON.parse(cached) : [];
  },

  // Сохранить избранных в localStorage
  saveFavorites: (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  },

  // Загрузить пользователей с API
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

  // Добавить в избранное
  addToFavorites: (favorites, user) => {
    if (favorites.find((u) => u.id === user.id)) {
      return favorites; // Уже есть
    }
    return [...favorites, user];
  },

  // Удалить из избранного
  removeFromFavorites: (favorites, userId) => {
    return favorites.filter((u) => u.id !== userId);
  },

  // Обновить пользователя
  updateUser: (users, userId, updatedData) => {
    return users.map((u) => (u.id === userId ? { ...u, ...updatedData } : u));
  },

  // Поиск пользователей
  searchUsers: (users, query) => {
    if (!query.trim()) return users;

    const lowerQuery = query.toLowerCase();
    return users.filter(
      (user) =>
        (user.name?.toLowerCase() || "").includes(lowerQuery) ||
        (user.username?.toLowerCase() || "").includes(lowerQuery)
    );
  },

  // Создать нового пользователя
  createUser: (userData) => {
    return {
      ...userData,
      id: Date.now(),
    };
  },
};
