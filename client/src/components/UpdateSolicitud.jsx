import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import { useSelector } from 'react-redux';

import { getAreaById, getTipoSolicitudById } from '../reducer/dataSlice';

const SQ_BASE_URL = import.meta.env.VITE_SQ_API_BASE_URL;

const UpdateSolicitud = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [solicitud, setSolicitud] = useState(null);
  const [resultado, setResultado] = useState('');
  const [idEstado, setIdEstado] = useState('');
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);

  const areaNombre = useSelector((state) =>
    solicitud ? getAreaById(state, solicitud.id_area) : "..."
  );
  const tipoSolicitudNombre = useSelector((state) =>
    solicitud ? getTipoSolicitudById(state, solicitud.id_tipo_solicitud) : "..."
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [solicitudRes, estadosRes] = await Promise.all([
          axios.get(`${SQ_BASE_URL}/solicitud/${id}`, {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          }),
          axios.get(`${SQ_BASE_URL}/estados-solicitud`, {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          }),
        ]);

        const solicitudData = solicitudRes.data;
        setSolicitud(solicitudData);
        setResultado(solicitudData.resultado || '');
        setIdEstado(solicitudData.id_estado || '');
        setEstados(estadosRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `${SQ_BASE_URL}/solicitud/${id}`,
        null,
        {
          params: {
            resultado: resultado || null,
            id_estado: idEstado || null,
          },
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      alert('Solicitud actualizada correctamente');
      navigate('/solicitudes');
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error);
      alert('Error al actualizar la solicitud');
    }
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    header: {
      fontSize: '1.75rem',
      fontWeight: '600',
      color: '#1a202c',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #e2e8f0',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '2rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#4a5568',
      marginBottom: '0.5rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      backgroundColor: '#f7fafc',
      color: '#2d3748',
      boxSizing: 'border-box',
      cursor: 'not-allowed',
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      color: '#2d3748',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '100px',
    },
    textareaReadonly: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      backgroundColor: '#f7fafc',
      color: '#2d3748',
      boxSizing: 'border-box',
      fontFamily: 'inherit',
      resize: 'vertical',
      minHeight: '100px',
      cursor: 'not-allowed',
    },
    select: {
      width: '100%',
      padding: '0.75rem',
      fontSize: '1rem',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      backgroundColor: '#ffffff',
      color: '#2d3748',
      boxSizing: 'border-box',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      padding: '0.875rem',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#ffffff',
      backgroundColor: '#3182ce',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginTop: '1rem',
    },
    buttonHover: {
      backgroundColor: '#2c5aa0',
    },
    loading: {
      textAlign: 'center',
      padding: '3rem',
      fontSize: '1.125rem',
      color: '#718096',
    },
    error: {
      textAlign: 'center',
      padding: '3rem',
      fontSize: '1.125rem',
      color: '#e53e3e',
    },
  };

  if (loading) return <div style={styles.loading}>Cargando...</div>;
  if (!solicitud) return <div style={styles.error}>No se pudo cargar la solicitud.</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Editar Solicitud #{solicitud.id_solicitud}</h1>

      <div style={styles.card}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Usuario</label>
          <input 
            type="text" 
            value={solicitud.user_id} 
            readOnly 
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Área</label>
          <input 
            type="text" 
            value={areaNombre} 
            readOnly 
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Tipo de Solicitud</label>
          <input 
            type="text" 
            value={tipoSolicitudNombre} 
            readOnly 
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Descripción</label>
          <textarea 
            value={solicitud.descripcion} 
            readOnly 
            style={styles.textareaReadonly}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Resultado</label>
          <textarea
            value={resultado}
            onChange={(e) => setResultado(e.target.value)}
            style={styles.textarea}
            placeholder="Ingrese el resultado de la solicitud..."
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Estado</label>
          <select
            value={idEstado}
            onChange={(e) => setIdEstado(parseInt(e.target.value))}
            style={styles.select}
          >
            <option value="">-- Seleccionar Estado --</option>
            {estados.map((estado) => (
              <option key={estado.id_estado} value={estado.id_estado}>
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleUpdate}
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Actualizar Solicitud
        </button>
      </div>
    </div>
  );
};

export default UpdateSolicitud;