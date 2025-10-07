/*import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            console.log(`User Refresh: ${response.data.roles}`)
            return { 
                ...prev,
                user: response.data.user,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;*/
import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get('/refresh', {
                withCredentials: true
            });

            setAuth(prev => ({
                ...prev,
                user: response.data.user,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }));

            return response.data.accessToken;

        } catch (err) {
            console.error("Refresh token failed", err);

            // Aquí puedes limpiar el estado de auth o redirigir al login
            setAuth({}); // limpiar autenticación

            // Opcional: puedes lanzar el error para que el componente lo maneje
            throw err;
        }
    }

    return refresh;
};

export default useRefreshToken;
