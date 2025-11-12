import type { DeBroglieCartInfo } from '../types';
import { dest_api } from '../target_config';

export const getDeBroglieCartInfo = async (): Promise<DeBroglieCartInfo> => {
  try {
    const response = await fetch(`${dest_api}/requestdebrogliecalculations/debrogliecart`, {
      method: 'GET',
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
