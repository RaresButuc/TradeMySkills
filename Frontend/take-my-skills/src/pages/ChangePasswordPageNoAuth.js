import ChangePassword from "../components/ChangePassword";
import { useParams } from "react-router-dom";

export default function ChangePasswordPageNoAuth() {
  const { uuid } = useParams();

  return <ChangePassword uuid={uuid} />;
}
