import "./UserCard.css";

const UserCard = ({ user, onAdd, onRemove, onEdit, isFavorite }) => {
  return (
    <div className="user-card">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Возраст:</strong> {user.age} лет
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div className="user-actions">
        {!isFavorite ? (
          <button className="btn-add" onClick={() => onAdd(user)}>
            Добавить в избранное
          </button>
        ) : (
          <>
            {onEdit && (
              <button className="btn-edit" onClick={() => onEdit(user)}>
                Изменить
              </button>
            )}
            <button className="btn-delete" onClick={() => onRemove(user.id)}>
              Удалить
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
