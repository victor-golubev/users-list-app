import { useState, useMemo } from "react";
import { useFavorites } from "../../context/FavoritesContext";
import { useUserModal } from "../../hooks/useUserModal";
import { userService } from "../../services/userService";
import UserCard from "../../components/UserCard/UserCard";
import Modal from "../../components/Modal/Modal";
import UserForm from "../../components/UserForm/UserForm";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, removeFavorite, updateFavorite, addFavorite } =
    useFavorites();
  const [searchQuery, setSearchQuery] = useState("");

  const handleModalSubmit = (data, editingUser) => {
    if (editingUser) {
      updateFavorite(editingUser.id, data);
    } else {
      const newUser = userService.createUser(data);
      addFavorite(newUser);
    }
  };

  const {
    isModalOpen,
    editingUser,
    openModalForEdit,
    openModalForCreate,
    closeModal,
    handleSubmit,
  } = useUserModal(handleModalSubmit);

  // Используем сервис для поиска + мемоизация
  const filteredFavorites = useMemo(() => {
    return userService.searchUsers(favorites, searchQuery);
  }, [favorites, searchQuery]);

  return (
    <div className="favorites">
      <div className="favorites-header">
        <h2>Избранные пользователи</h2>
        <button className="btn-create" onClick={openModalForCreate}>
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
              onEdit={openModalForEdit}
              isFavorite={true}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <UserForm
            user={editingUser}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Favorites;
