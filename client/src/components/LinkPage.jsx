import { Link, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react";

const LinkPage = () => {
    const [first, setfirst] = useState(1)
    const test = useRef(1)

    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
    }, [])

    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Home</Link>
            <Link to="/editor">Editors Page</Link>
            <Link to="/admin">Admin Page</Link>
        </section>
    )
}

export default LinkPage