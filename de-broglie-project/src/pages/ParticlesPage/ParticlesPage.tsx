import { type FC, useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Particle, FilterParams, DeBroglieCartInfo } from '../../types';
import { getParticles } from '../../modules/particles';
import * as DeBroglieCart from '../../modules/debrogliecart';
import { ROUTES, ROUTE_LABELS } from '../../constants/routes';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ParticleCard } from '../../components/ParticleCard/ParticleCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import './ParticlesPage.css';

export const ParticlesPage: FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debrogliecartInfo, setDeBroglieCartInfo] = useState<DeBroglieCartInfo>({ draft_id: 0, particles_cnt: 0 });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return searchParams.get('particle') || '';
  });

  useEffect(() => {
    const loadParticles = async (filters?: FilterParams) => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getParticles(filters);
        setParticles(data);
      } catch (err) {
        setError('Ошибка при загрузке частиц');
        console.error('Error loading particles:', err);
      } finally {
        setLoading(false);
      }
    };

    const loadDeBroglieCartInfo = async () => {
      try {
        const debrogliecartData = await DeBroglieCart.getDeBroglieCartInfo();
        setDeBroglieCartInfo(debrogliecartData);
      } catch (err) {
        console.error('Error loading debrogliecart info:', err);
      }
    };

    const particleParam = searchParams.get('particle');
    if (particleParam) {
      setSearchQuery(particleParam);
      loadParticles({ particle: particleParam });
    } else {
      setSearchQuery('');
      loadParticles();
    }
    
    loadDeBroglieCartInfo();
  }, [searchParams]);

  const handleViewDetails = (id: number) => {
    navigate(`${ROUTES.PARTICLES}/${id}`);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      setSearchParams({ particle: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="particles-page">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.PARTICLES }]} />
      
      <div className="banner-container">
        <div className="banner">
          <img src="/src/assets/banner.png" className="banner-image" alt="Banner" />
        </div>
        <h1>Частицы</h1>
      </div>

      <SearchBar 
        onSearch={handleSearch}
        placeholder="Найти..."
        initialValue={searchQuery}
      />

      <Container className="space">
        {loading && (
          <div className="loading-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Загрузка...</span>
            </Spinner>
            <p>Загрузка частиц...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger" className="error-alert">
            {error}
          </Alert>
        )}

        {!loading && !error && particles.length === 0 && (
          <div className="no-results">
            <h3>Частицы не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        )}

        {!loading && !error && particles.length > 0 && (
          <div className="particles-grid">
            {particles.map((particle) => (
              <div key={particle.id} className="particle-col">
                <ParticleCard
                  particle={particle}
                  onViewDetails={handleViewDetails}
                />
              </div>
            ))}
          </div>
        )}
      </Container>

      <div className={`debrogliecart-icon-container ${debrogliecartInfo.draft_id === 0 && debrogliecartInfo.particles_cnt === 0 ? 'disabled' : ''}`}>
        <img src="/src/assets/debrogliecart_icon.png" alt="Debrogliecart" className="debrogliecart-icon" />
        {debrogliecartInfo.particles_cnt > 0 && (
          <span className="debrogliecart-count">{debrogliecartInfo.particles_cnt}</span>
        )}
      </div>

      <footer className="footer">© 2025 University of Colorado. Все права защищены.</footer>
    </div>
  );
};
