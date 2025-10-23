import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useRefreshToken from "../hooks/useRefreshToken";
import Metadata from "./Metadata";

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout()
    const refresh = useRefreshToken()

    const signOut = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        navigate('/linkpage');
        await logout()
    }

    return (
        <section>
            <Metadata />
        </section>
    )
}

export default Home