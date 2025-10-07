import { useState, useEffect } from "react";
import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import styles from "./Create.module.css";


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
  const [medidaTomada, setMedidaTomada] = useState("");

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
    console.log(areas)
    console.log("SQ_BASE_URL")
    console.log(SQ_BASE_URL)
  }, [areas]);

  

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
        <div className={`${styles.message} ${mensaje.includes("Error") ? styles.error : styles.success}`}>
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
            
            {/* <div className={styles.formGroup}>
              <label className={styles.label}>ID Solicitud:</label>
              <input
                type="number"
                value={idSolicitud}
                onChange={(e) => setIdSolicitud(e.target.value)}
                className={styles.input}
                placeholder="Ingrese el ID de la solicitud"
                required
              />
            </div> */}

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
            
            {/* <div className={styles.formGroup}>
              <label className={styles.label}>ID Queja:</label>
              <input
                type="number"
                value={idQueja}
                onChange={(e) => setIdQueja(e.target.value)}
                className={styles.input}
                placeholder="Ingrese el ID de la queja"
                required
              />
            </div> */}

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