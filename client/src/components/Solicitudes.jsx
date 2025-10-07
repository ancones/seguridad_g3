import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

const SQ_BASE_URL = import.meta.env.VITE_SQ_API_BASE_URL;

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
};

const Solicitudes = () => {
  const { auth } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const endpoint = auth?.roles?.find(role => [ROLES.Editor, ROLES.Admin]?.includes(role))
          ? `${SQ_BASE_URL}/solicitudes`
          : `${SQ_BASE_URL}/solicitudes/${auth.user_id}`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`
          }
        });

        // Verificar que la respuesta sea un array
        if (Array.isArray(response.data)) {
          setSolicitudes(response.data);  // Guardamos solo si es un array
        } else {
          console.error("La respuesta no es un array", response.data);
          setSolicitudes([]);
        }
      } catch (error) {
        console.error('Error fetching solicitudes:', error);
        setSolicitudes([]);  // En caso de error, también establecemos un array vacío
      }
    };

    fetchSolicitudes();
  }, [auth]);

  // Verificar si el usuario tiene el rol de Editor
  const isEditor = auth?.roles?.includes(ROLES.Editor);

  return (
    <div>
      <h1 className="dashboard-title">Solicitudes</h1>
      <table className="solicitudes-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Área</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => (
              <tr key={solicitud.ID}>
                <td>{solicitud.ID}</td>
                <td>{solicitud.Area}</td>
                <td>{solicitud.Tipo}</td>
                <td
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {solicitud.Estado}
                  {isEditor &&
                    // Editor: mostrar el lápiz como enlace
                    <Link
                      to={`/put/${solicitud.ID}`}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: 0,
                        marginLeft: '8px',
                        textDecoration: 'none',
                      }}
                      aria-label="Editar Solicitud"
                      title="Editar Solicitud"
                    >
                      ✏️
                    </Link>
                  } <button
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: 0,
                        marginLeft: '8px',
                      }}
                      onClick={() => { /* Puedes hacer algo aquí si lo necesitas */ }}
                      aria-label="Ver Solicitud"
                      title="Ver Solicitud"
                    >
                      
                      <Link
                      to={`/solicitud/${solicitud.ID}`}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        padding: 0,
                        marginLeft: '8px',
                        textDecoration: 'none',
                      }}
                      aria-label="Editar Solicitud"
                      title="Editar Solicitud"
                    >
                      👁️
                    </Link>
                    </button>
                </td>
                <td>{solicitud.Description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay solicitudes disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Solicitudes;
