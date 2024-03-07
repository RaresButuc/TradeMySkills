import { useParams } from "react-router-dom";

import Profile from "../components/Profile.js";

export default function OtherUserProfile() {
  const { id } = useParams();

  return <Profile id={id} />;
}
