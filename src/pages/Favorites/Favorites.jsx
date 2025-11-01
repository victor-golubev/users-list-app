import { useState } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import UserCard from "../../components/UserCard/UserCard";
import Modal from "../../components/Modal/Modal";
import UserForm from "../../components/UserForm/UserForm";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, removeFavorite, updateFavorite, addFavorite } =
    useFavorites();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const filteredFavorites = favorites.filter(
    (user) =>
      (user.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (user.username?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingUser) {
      updateFavorite(editingUser.id, data);
    } else {
      const newUser = {
        ...data,
        id: Date.now(),
      };
      addFavorite(newUser);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h2>Избранные пользователи</h2>
        <button className="btn-create" onClick={handleCreate}>
          Создать пользователя
        </button>
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Поиск по имени или username..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredFavorites.length === 0 ? (
        <div className="empty-state">
          {favorites.length === 0
            ? "Нет избранных пользователей. Добавьте их на главной странице."
            : "Пользователи не найдены."}
        </div>
      ) : (
        <div className="users-grid">
          {filteredFavorites.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onRemove={removeFavorite}
              onEdit={handleEdit}
              isFavorite={true}
            />
          ))}
        </div>
      )}

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

export default Favorites;
