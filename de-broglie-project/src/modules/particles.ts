import type { Particle, FilterParams } from '../types';
import { PARTICLES_MOCK } from '../data/mock';

export const getParticles = async (filters?: FilterParams): Promise<Particle[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters?.particle) {
      params.append('particle', filters.particle);
    }
    
    const queryString = params.toString();
    const url = `/api/particles${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API request failed, using mock data:', error);
    
    let filteredParticles = [...PARTICLES_MOCK];
    
    if (filters?.particle) {
      filteredParticles = filteredParticles.filter(particle =>
        particle.name.toLowerCase().includes(filters.particle!.toLowerCase())
      );
    }
    
    return filteredParticles;
  }
};

export const getParticle = async (id: number): Promise<Particle> => {
  try {
    const response = await fetch(`/api/particles/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API request failed, using mock data:', error);
    
    const particle = PARTICLES_MOCK.find(p => p.id === id);
    if (!particle) {
      throw new Error('Particle not found');
    }
    
    return particle;
  }
};
