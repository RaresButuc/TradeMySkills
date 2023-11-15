import ChangePassword from "../components/ChangePassword";
import { useParams } from "react-router-dom";

export default function ChangePasswordPageNoAuth() {
    const { email } = useParams();

    return <ChangePassword email={email} />;
}