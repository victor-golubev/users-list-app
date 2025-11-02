import { useState } from "react";

export const useUserModal = (onSubmitCallback) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const openModalForEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const openModalForCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = (data) => {
    onSubmitCallback(data, editingUser);
    closeModal();
  };

  return {
    isModalOpen,
    editingUser,
    openModalForEdit,
    openModalForCreate,
    closeModal,
    handleSubmit,
  };
};
