import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";


const Users = () => {
    const [users, setUsers] = useState();
    const [solicitudes, setSolicitudes] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const effectRan = useRef(false)

    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()


    useEffect(() => {
        console.log('effect ran');
        let isMounted = true;
        const controller = new AbortController();
        
        if (effectRan.current === true) {

            const getUsers = async () => {
                try {
                    const response = await axiosPrivate.get('/users', {
                        signal: controller.signal
                    });
                    console.log(response.data);
                    isMounted && setUsers(response.data);
                } catch (err) {
                    console.error(err);
                    navigate('/login', { state: { from: location }, replace: true });
                }
            }

            getUsers();
        }

        return () => {
            console.log('unmounted');
            effectRan.current = true
            isMounted = false;
            controller.abort();
        }
    }, [])


    // useEffect(() => {
    //   const verifyRefreshToken = async () => {
    //     try {
    //         await refresh()
    //     } catch (err) {
    //         console.error(err);
    //     } finally {
    //         setIsLoading(false)
    //     }
    //   }
    
    //   !auth?.accessToken ? verifyRefreshToken(): setIsLoading(false)
    //   console.log(`[${auth?.accessToken? true: false}] Execution Of persisted login /(/, editor, admin, lounge)`)
    // }, [])

    // useEffect(() => {
    //     const fetchSolicitudes = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:8000/solicitudes/", {
    //                 headers: {
    //                     Authorization: `Bearer ${auth?.accessToken}`
    //                 }
    //             });
    //             setSolicitudes(response.data);
    //             setFetchError(null);
    //         } catch (err) {
    //             console.error("Error fetching solicitudes:", err);
    //             setFetchError(err.response?.data?.detail || err.message);
    //         }
    //     };

    //     if (!isLoading && auth?.accessToken) {
    //         fetchSolicitudes();
    //     }
    // }, [isLoading, auth?.accessToken]);

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
            {/* <div>
                <h2>Solicitudes</h2>
                {isLoading && <p>Loading solicitudes...</p>}
                {fetchError && <p>Error: {fetchError}</p>}
                {solicitudes?.length ? (
                    <ul>
                        {solicitudes.map((solicitud, i) => (
                            <li key={i}>
                                <strong>Solicitud ID:</strong> {solicitud.id_solicitud} <br />
                                <strong>Descripción:</strong> {solicitud.descripcion} <br />
                                <strong>Resultado:</strong> {solicitud.resultado || 'No hay resultado'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No solicitudes to display</p>
                )}
            </div> */}
        </article>
    );
};

export default Users;