import { useState, useEffect } from "react";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { useFavorites } from "../../context/FavoritesContext";
import UserCard from "../../components/UserCard/UserCard";
import Modal from "../../components/Modal/Modal";
import UserForm from "../../components/UserForm/UserForm";
import "./Home.css";

const Home = () => {
  const { users: initialUsers, loading, error } = useFetchUsers();
  const { addFavorite, removeFavorite, updateFavorite, favorites } =
    useFavorites();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  useEffect(() => {
    const handleStorageChange = () => {
      const cachedUsers = localStorage.getItem("allUsers");
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
      }
    };

    const interval = setInterval(handleStorageChange, 100);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="loading">Загрузка пользователей...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  const isFavorite = (userId) => {
    return favorites.some((fav) => fav.id === userId);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    updateFavorite(editingUser.id, data);

    setUsers(
      users.map((u) => (u.id === editingUser.id ? { ...u, ...data } : u))
    );

    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="home">
      <h2>Все пользователи</h2>
      <div className="users-grid">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onAdd={addFavorite}
            onRemove={removeFavorite}
            onEdit={handleEdit}
            isFavorite={isFavorite(user.id)}
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <UserForm
            user={editingUser}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Home;
