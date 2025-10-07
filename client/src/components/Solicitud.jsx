import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useSelector } from 'react-redux';

import { getEstadoById, getAreaById, getTipoSolicitudById } from '../reducer/dataSlice';

const SQ_BASE_URL = import.meta.env.VITE_SQ_API_BASE_URL;

const Solicitud = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);

  const areaNombre = useSelector((state) =>
    solicitud ? getAreaById(state, solicitud.id_area) : "..."
  );
  const tipoSolicitudNombre = useSelector((state) =>
    solicitud ? getTipoSolicitudById(state, solicitud.id_tipo_solicitud) : "..."
  );
  const estadoNombre = useSelector((state) =>
    solicitud ? getEstadoById(state, solicitud.id_estado) : "..."
  );
  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        const res = await axios.get(`${SQ_BASE_URL}/solicitud/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });
        setSolicitud(res.data);
      } catch (error) {
        console.error('Error al cargar la solicitud:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitud();
  }, [id]);

  if (loading) return <p style={styles.loading}>Cargando solicitud...</p>;
  if (!solicitud) return <p style={styles.error}>No se encontró la solicitud.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Solicitud #{solicitud.id_solicitud}</h2>

      <div style={styles.field}>
        <strong>Usuario:</strong> <span>{solicitud.user_id}</span>
      </div>
      <div style={styles.field}>
        <strong>Área:</strong> <span>{areaNombre}</span>
      </div>
      <div style={styles.field}>
        <strong>Tipo de Solicitud:</strong> <span>{tipoSolicitudNombre}</span>
      </div>
      <div style={styles.field}>
        <strong>Estado:</strong> <span>{estadoNombre}</span>
      </div>
      <div style={styles.field}>
        <strong>Descripción:</strong>
        <p style={styles.textBox}>{solicitud.descripcion}</p>
      </div>
      <div style={styles.field}>
        <strong>Resultado:</strong>
        <p style={styles.textBox}>{solicitud.resultado || 'Sin resultado'}</p>
      </div>

      <button style={styles.button} onClick={() => navigate('/dashboard')}>
        Volver al Dashboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1.5rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fafafa',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  field: {
    marginBottom: '1rem',
    fontSize: '1rem',
    color: '#444',
  },
  textBox: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    padding: '0.75rem',
    borderRadius: '4px',
    whiteSpace: 'pre-wrap',
    marginTop: '0.25rem',
  },
  button: {
    display: 'block',
    margin: '2rem auto 0',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'red',
  },
};

export default Solicitud;
