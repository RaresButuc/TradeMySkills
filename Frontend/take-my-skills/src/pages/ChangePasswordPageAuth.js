import ChangePassword from "../components/ChangePassword";
import { useAuthUser } from "react-auth-kit";

export default function ChangePasswordPageAuth() {
  const auth = useAuthUser();

  return <ChangePassword email={auth()?.email} />;
}
