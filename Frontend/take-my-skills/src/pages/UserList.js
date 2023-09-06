// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BASE_URL = 'http://localhost:8080'; // Replace with your actual backend URL

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch the list of users when the component mounts
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/users`);
//         const userList = response.json();
//         console.log(userList);
//         setUsers(userList);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>User List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul>
//           {users.map((user) => (
//             <h1 key={user.id}>
//               <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
//             </h1>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UserList;

import { useState, useEffect } from "react";
import axios from 'axios';

export default function History() {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response =await axios.get("http://localhost:8080/users"); 
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
      {users&&users.map((user) => (
        <div className="users">
          <h1>{user.name}</h1>
          </div>
      ))}
    </>
  );
}