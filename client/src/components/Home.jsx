import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useRefreshToken from "../hooks/useRefreshToken";

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
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
            <div className="flexGrow">
                <button onClick={() => refresh()}>Refresh</button>
            </div>
        </section>
    )
}

export default Home