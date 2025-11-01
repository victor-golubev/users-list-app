import { useForm } from "react-hook-form";
import "./UserForm.css";

const UserForm = ({ user, onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user || {
      name: "",
      username: "",
      email: "",
      age: "",
    },
  });

  return (
    <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>{user ? "Редактировать пользователя" : "Создать пользователя"}</h3>

      <div className="form-group">
        <label>Имя *</label>
        <input
          type="text"
          {...register("name", { required: "Имя обязательно" })}
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label>Username *</label>
        <input
          type="text"
          {...register("username", { required: "Username обязателен" })}
        />
        {errors.username && (
          <span className="error">{errors.username.message}</span>
        )}
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          {...register("email", {
            required: "Email обязателен",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Некорректный email",
            },
          })}
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label>Возраст *</label>
        <input
          type="number"
          {...register("age", {
            required: "Возраст обязателен",
            min: { value: 18, message: "Минимум 18 лет" },
            max: { value: 100, message: "Максимум 100 лет" },
          })}
        />
        {errors.age && <span className="error">{errors.age.message}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          Сохранить
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Отмена
        </button>
      </div>
    </form>
  );
};

export default UserForm;
