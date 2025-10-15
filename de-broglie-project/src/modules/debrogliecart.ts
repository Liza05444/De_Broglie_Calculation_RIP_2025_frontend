import type { DeBroglieCartInfo } from '../types';

export const getDeBroglieCartInfo = async (): Promise<DeBroglieCartInfo> => {
  try {
    const response = await fetch(`/api/requestdebrogliecalculations/debrogliecart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API request failed, using default debrogliecart info:', error);
    return {
      draft_id: 0,
      particles_cnt: 0,
    };
  }
};
