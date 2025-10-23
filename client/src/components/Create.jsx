import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import styles from "./Create.module.css";

function mostrarMensaje(tipo) {
  // tipo puede ser 'success' o 'error'
  const mensaje = document.querySelector(`.message.${tipo}`);
  
  if (mensaje) {
    // Activar el mensaje (puedes añadir tu lógica de mostrar)
    // mensaje.classList.add('active');

    // Hacer scroll suave hasta el elemento
    mensaje.scrollIntoView({
      behavior: 'smooth',
      block: 'top' // lo centra en la pantalla
    });
  }
}


const SQ_BASE_URL = import.meta.env.VITE_SQ_API_BASE_URL;

const Create = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  const [activeForm, setActiveForm] = useState("solicitud");
  const [isLoading, setIsLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

  // Solicitud state
  const [idSolicitud, setIdSolicitud] = useState("");
  const [descripcionSolicitud, setDescripcionSolicitud] = useState("");
  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [areas, setAreas] = useState([]);
  const [tipos, setTipos] = useState([]);

  // Queja state
  const [idQueja, setIdQueja] = useState("");
  const [descripcionQueja, setDescripcionQueja] = useState("");
  const [medidaTomada, setMedidaTomada] = useState("Contenido");
  const [file, setFile] = useState(null);  

  const messageRef = useRef(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error("Error al refrescar token:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth?.accessToken) {
      verifyToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAreas = await axios.get(`${SQ_BASE_URL}/areas`, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        });
        const resTipos = await axios.get(`${SQ_BASE_URL}/tipos-solicitud`, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
        });
        setAreas(resAreas.data);
        setTipos(resTipos.data);
      } catch (err) {
        console.error("Error al cargar áreas o tipos", err);
      }
    };

    if (activeForm === "solicitud" && auth?.accessToken) {
      fetchData();
    }
  }, [activeForm, auth?.accessToken]);

  useEffect(() => {
    if (mensaje && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [mensaje]);
  

  const handleSubmitSolicitud = async (e) => {
    e.preventDefault();
    try {
      const body = {
        id_area: parseInt(areaSeleccionada),
        id_tipo_solicitud: parseInt(tipoSeleccionado),
        id_estado: 1,
        descripcion: descripcionSolicitud,
      };

      await axios.post(`${SQ_BASE_URL}/solicitudes/`, body, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      setMensaje("Solicitud creada correctamente");
      setIdSolicitud("");
      setDescripcionSolicitud("");
      setAreaSeleccionada("");
      setTipoSeleccionado("");
    } catch (err) {
      console.error(err);
      setMensaje("Error al crear solicitud");
    }
  };

  const handleSubmitQueja = async (e) => {
    e.preventDefault();
    try {
      const body = {
        descripcion: descripcionQueja,
      };

      await axios.post(`${SQ_BASE_URL}/quejas/`, body, {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      setMensaje("Queja creada correctamente");
      setIdQueja("");
      setDescripcionQueja("");
      setMedidaTomada("");
    } catch (err) {
      console.error(err);
      setMensaje("Error al crear queja");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!medidaTomada || !descripcionQueja || !file) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    // Validar tamaño del archivo (100 KB = 102400 bytes)
    const MAX_SIZE = 100 * 1024; // 100 KB
    if (file.size > MAX_SIZE) {
      alert(`El archivo es demasiado grande. Tamaño máximo: 100 KB. Tamaño actual: ${(file.size / 1024).toFixed(2)} KB`);
      return;
    }

    // Crear el FormData
    const formData = new FormData();
    formData.append("nombre", descripcionQueja);
    formData.append("edad", medidaTomada);
    formData.append("file", file);

    try {
      const response = await axios.post(`${SQ_BASE_URL}/upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Respuesta del servidor:", response.data);
      alert("¡Datos enviados correctamente!");
    } catch (error) {
      if (error.response?.status === 413) {
        alert("Error: El archivo es demasiado grande (máximo 100 KB)");
      } else {
        console.error("Error al enviar los datos:", error);
        alert("Error al enviar los datos");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Crear nueva {activeForm === "solicitud" ? "Solicitud" : "Queja"}
        </h2>
        
        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.tabButton} ${activeForm === "solicitud" ? styles.active : ""}`}
            onClick={() => { setActiveForm("solicitud"); setMensaje(""); }}
          >
            <span className={styles.icon}>📝</span>
            Crear Solicitud
          </button>
          <button 
            className={`${styles.tabButton} ${activeForm === "queja" ? styles.active : ""}`}
            onClick={() => { setActiveForm("queja"); setMensaje(""); }}
          >
            <span className={styles.icon}>⚠️</span>
            Crear Queja
          </button>
        </div>
      </div>

      {mensaje && (
        <div ref={messageRef} className={`${styles.message} ${mensaje.includes("Error") ? styles.error : styles.success}`}>
          <span className={styles.messageIcon}>
            {mensaje.includes("Error") ? "❌" : "✅"}
          </span>
          {mensaje}
        </div>
      )}

      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Cargando...</p>
        </div>
      )}

      {!isLoading && auth?.accessToken && activeForm === "solicitud" && (
        <form onSubmit={handleSubmitSolicitud} className={styles.form}>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Nueva Solicitud</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descripción:</label>
              <textarea
                value={descripcionSolicitud}
                onChange={(e) => setDescripcionSolicitud(e.target.value)}
                className={styles.textarea}
                placeholder="Describa detalladamente su solicitud"
                rows="4"
                required
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Área:</label>
                <select
                  value={areaSeleccionada}
                  onChange={(e) => setAreaSeleccionada(e.target.value)}
                  className={styles.select}
                  required
                >
                  <option value="">Seleccione un área</option>
                  {areas.map((area) => (
                    <option key={area.id_area} value={area.id_area}>
                      {area.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tipo de Solicitud:</label>
                <select
                  value={tipoSeleccionado}
                  onChange={(e) => setTipoSeleccionado(e.target.value)}
                  className={styles.select}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  {tipos.map((tipo) => (
                    <option key={tipo.id_tipo_solicitud} value={tipo.id_tipo_solicitud}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Archivos Opcionales:</label>

              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  id="archivo"
                  className={styles.fileInput}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="archivo" className={styles.fileLabel}>
                  📎 Seleccionar archivo
                </label>
                {file && <span className={styles.fileName}>{file.name}</span>}
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              <span className={styles.buttonIcon}>📨</span>
              Enviar Solicitud
            </button>
          </div>
        </form>
      )}

      {!isLoading && auth?.accessToken && activeForm === "queja" && (
        <form onSubmit={handleSubmitQueja} className={styles.form}>
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Nueva Queja</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descripción:</label>
              <textarea
                value={descripcionQueja}
                onChange={(e) => setDescripcionQueja(e.target.value)}
                className={styles.textarea}
                placeholder="Describa detalladamente su queja"
                rows="4"
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              <span className={styles.buttonIcon}>📤</span>
              Enviar Queja
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Create;