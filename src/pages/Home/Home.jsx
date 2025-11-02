import { useMemo } from "react";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import { useFavorites } from "../../context/FavoritesContext";
import { useUserModal } from "../../hooks/useUserModal";
import UserCard from "../../components/UserCard/UserCard";
import Modal from "../../components/Modal/Modal";
import UserForm from "../../components/UserForm/UserForm";
import "./Home.css";

const Home = () => {
  const {
    allUsers,
    addFavorite,
    removeFavorite,
    updateFavorite,
    favorites,
    setAllUsersData,
  } = useFavorites();
  const { loading, error } = useFetchUsers(setAllUsersData);

  const handleModalSubmit = (data, editingUser) => {
    updateFavorite(editingUser.id, data);
  };

  const {
    isModalOpen,
    editingUser,
    openModalForEdit,
    closeModal,
    handleSubmit,
  } = useUserModal(handleModalSubmit);

  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((fav) => fav.id));
  }, [favorites]);

  if (loading) {
    return <div className="loading">Загрузка пользователей...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="home">
      <h2>Все пользователи</h2>
      <div className="users-grid">
        {allUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onAdd={addFavorite}
            onRemove={removeFavorite}
            onEdit={openModalForEdit}
            isFavorite={favoriteIds.has(user.id)}
          />
        ))}
      </div>

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

export default Home;
