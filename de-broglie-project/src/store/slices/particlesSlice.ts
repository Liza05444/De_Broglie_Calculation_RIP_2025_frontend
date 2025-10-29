import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const particlesSlice = createSlice({
  name: 'particles',
  initialState: {
    particles: [],
    debrogliecartInfo: { draft_id: 0, particles_cnt: 0 },
    
    searchQuery: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    setParticles(state, { payload }) {
      state.particles = payload;
    },
    setDeBroglieCartInfo(state, { payload }) {
      state.debrogliecartInfo = payload;
    },

    setSearchQuery(state, { payload }) {
      state.searchQuery = payload;
    },
    
    setLoading(state, { payload }) {
      state.isLoading = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const useParticles = () =>
  useSelector((state: any) => state.particles.particles);

export const useDeBroglieCartInfo = () =>
  useSelector((state: any) => state.particles.debrogliecartInfo);

export const useSearchQuery = () =>
  useSelector((state: any) => state.particles.searchQuery);

export const useIsLoading = () =>
  useSelector((state: any) => state.particles.isLoading);

export const useError = () =>
  useSelector((state: any) => state.particles.error);

export const {
  setParticles: setParticlesAction,
  setDeBroglieCartInfo: setDeBroglieCartInfoAction,
  setSearchQuery: setSearchQueryAction,
  setLoading: setLoadingAction,
  setError: setErrorAction,
} = particlesSlice.actions;

export default particlesSlice.reducer;
