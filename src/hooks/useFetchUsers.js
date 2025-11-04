import { useState, useEffect } from "react";
import { userService } from "../services/userService";

export const useFetchUsers = (setAllUsersData) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
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
        if (isMounted) {
          setAllUsersData(users);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => (isMounted = false);
  }, [setAllUsersData]);

  return { loading, error };
};
