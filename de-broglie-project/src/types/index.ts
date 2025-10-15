export interface Particle {
  id: number;
  name: string;
  mass: number;
  image?: string;
  description?: string;
}

export interface FilterParams {
  particle?: string;
}

export interface DeBroglieCartInfo {
  draft_id: number;
  particles_cnt: number;
}
