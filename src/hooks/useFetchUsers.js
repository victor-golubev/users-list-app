import { useState, useEffect } from "react";

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const cachedUsers = localStorage.getItem("allUsers");

        if (cachedUsers) {
          setUsers(JSON.parse(cachedUsers));
          setLoading(false);
          return;
        }

        const response = await fetch("https://randomuser.me/api/?results=12");
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const data = await response.json();

        const transformedUsers = data.results.map((user, index) => ({
          id: index + 1,
          name: `${user.name.first} ${user.name.last}`,
          username: user.login.username,
          email: user.email,
          age: user.dob.age,
        }));

        localStorage.setItem("allUsers", JSON.stringify(transformedUsers));
        setUsers(transformedUsers);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
