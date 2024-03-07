import { useParams } from "react-router-dom";

import ChangePassword from "../components/ChangePassword";

export default function ChangePasswordPageNoAuth() {
  const { uuid } = useParams();

  return <ChangePassword uuid={uuid} />;
}
