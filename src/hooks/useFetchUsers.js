import { useState, useEffect } from "react";
import { userService } from "../services/userService";

export const useFetchUsers = (setAllUsersData) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const cachedUsers = userService.getAllUsers();

        if (cachedUsers.length > 0) {
          setAllUsersData(cachedUsers);
          setLoading(false);
          return;
        }

        const users = await userService.fetchUsersFromAPI();
        userService.saveAllUsers(users);
        setAllUsersData(users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setAllUsersData]);

  return { loading, error };
};
