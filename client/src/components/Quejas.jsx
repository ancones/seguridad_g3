import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from "../hooks/useAuth";

const SQ_BASE_URL = import.meta.env.VITE_SQ_API_BASE_URL;

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
};

const Quejas = () => {
  const { auth } = useAuth();
  const [quejas, setQuejas] = useState([]);

  useEffect(() => {
    const fetchQuejas = async () => {
      try {
        const endpoint = auth?.roles?.find(role => [ROLES.Admin, ROLES.Editor]?.includes(role))
          ? `${SQ_BASE_URL}/quejas`
          : `${SQ_BASE_URL}/quejas/${auth.user_id}`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        // Verificar que la respuesta sea un array
        if (Array.isArray(response.data)) {
          setQuejas(response.data);  // Guardamos las quejas si la respuesta es un array
        } else {
          console.error("La respuesta no es un array", response.data);
          setQuejas([]);
        }
      } catch (error) {
        console.error('Error fetching quejas:', error);
        setQuejas([]);  // En caso de error, también establecemos un array vacío
      }
    };

    fetchQuejas();
  }, [auth]);

  // Verificar si el usuario tiene el rol de Editor
  const isEditor = auth?.roles?.includes(ROLES.Editor);

  return (
    <div>
      <h1 className="dashboard-title">
        Quejas
        {/* Mostrar el emoji de lápiz si el usuario tiene el rol de Editor */}
        {isEditor && <span role="img" aria-label="Edit"> ✏️</span>}
      </h1>
      <table className="quejas-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Descripción</th>
            <th>Medida Tomada</th>
          </tr>
        </thead>
        <tbody>
          {quejas.length > 0 ? (
            quejas.map((queja) => (
              <tr key={queja.ID}>
                <td>{queja.ID}</td>
                <td>{queja.Usuario}</td>
                <td>{queja.Description}</td>
                <td>{queja["Medida Tomada"]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay quejas disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Quejas;
