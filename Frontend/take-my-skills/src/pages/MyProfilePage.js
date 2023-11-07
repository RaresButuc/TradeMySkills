import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";
import Profile from "../components/Profile.js";

export default function MyProfile() {
  const auth = useAuthUser();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/email/${auth().email}`
        );
        const data = await response.data;
        setCurrentUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentUser();
  }, [auth().email]);

  return (
    <>
      <Profile id={currentUser?.id} />
    </>
  );
}
