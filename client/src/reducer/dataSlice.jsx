import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// URL base de la API
const SQ_BASE_URL = import.meta.env.VITE_SQ_API_BASE_URL; // Reemplaza con tu URL base

// Definir acciones asíncronas usando createAsyncThunk
export const fetchData = createAsyncThunk('data/fetchData', async (token) => {

    const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    };

  const [estadosRes, tiposRes, areasRes] = await Promise.all([
    axios.get(`${SQ_BASE_URL}/estados-solicitud`, { headers }),
    axios.get(`${SQ_BASE_URL}/tipos-solicitud`, { headers }),
    axios.get(`${SQ_BASE_URL}/areas`, { headers }),
  ]);
  
  return {
    estados: estadosRes.data,
    tiposSolicitud: tiposRes.data,
    areas: areasRes.data,
  };
});

// Crear el slice
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    estados: [],
    tiposSolicitud: [],
    areas: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.estados = action.payload.estados;
        state.tiposSolicitud = action.payload.tiposSolicitud;
        state.areas = action.payload.areas;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


// ✅ Selectors para buscar por ID (fuera del reducer, pero en el mismo archivo)
export const getEstadoById = (state, id) => {
  const estado = state.data.estados.find((e) => e.id_estado === id);
  return estado ? estado.nombre : "Estado no encontrado";
};

export const getTipoSolicitudById = (state, id) => {
  const tipo = state.data.tiposSolicitud.find((t) => t.id_tipo_solicitud === id);
  return tipo ? tipo.nombre : "Tipo de solicitud no encontrado";
};

export const getAreaById = (state, id) => {
  const area = state.data.areas.find((a) => a.id_area === id);
  return area ? area.nombre : "Área no encontrada";
};

export default dataSlice.reducer;