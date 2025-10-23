import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAuth from "../hooks/useAuth";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SQ_BASE_URL = import.meta.env.VITE_SQ_API_BASE_URL;

const Metadata = () => {
  const { auth } = useAuth();
  const [data, setData] = useState({ solicitudes_count: 0, quejas_count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await axios.get(`${SQ_BASE_URL}/metadata`, {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener metadatos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [auth]);

  if (loading) return <p>Cargando datos...</p>;

  const chartData = {
    labels: ["Solicitudes", "Quejas"],
    datasets: [
      {
        label: "Cantidad",
        data: [data.solicitudes_count, data.quejas_count],
        backgroundColor: ["#3b82f6", "#ef4444"],
        borderColor: ["#2563eb", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Estadísticas generales" },
    },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "center" }}>
      <h2>📊 Metadatos del sistema</h2>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "1.5rem" }}>
        <div
          style={{
            background: "#1e293b",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h3>Solicitudes</h3>
          <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#3b82f6" }}>
            {data.solicitudes_count}
          </p>
        </div>

        <div
          style={{
            background: "#1e293b",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          <h3>Quejas</h3>
          <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ef4444" }}>
            {data.quejas_count}
          </p>
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Metadata;
