import { useAuthUser } from "react-auth-kit";

import ChangePassword from "../components/ChangePassword";

export default function ChangePasswordPageAuth() {
  const auth = useAuthUser();

  return <ChangePassword email={auth()?.email} />;
}
