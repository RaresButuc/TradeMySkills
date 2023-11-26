import { useState, useEffect } from "react";
import axios from "axios";
import DefaultURL from "../GlobalVariables";

export default function History() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${DefaultURL}/users`);
        const data = response.data;
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1>Users</h1>
      {users &&
        users.map((user) => (
          <div className="users">
            <h1>{user.name}</h1>
          </div>
        ))}
    </>
  );
}
