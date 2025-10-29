import { type FC, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  setSearchQueryAction, 
  setLoadingAction, 
  setErrorAction, 
  useIsLoading,
  useError,
  useSearchQuery,
  setParticlesAction, 
  setDeBroglieCartInfoAction,
  useParticles,
  useDeBroglieCartInfo
} from '../../store/slices/particlesSlice';
import type { FilterParams } from '../../types';
import { getParticles } from '../../modules/particles';
import * as DeBroglieCart from '../../modules/debrogliecart';
import { ROUTES, ROUTE_LABELS } from '../../constants/routes';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ParticleCard } from '../../components/ParticleCard/ParticleCard';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import bannerImage from '../../assets/banner.png';
import debrogliecartIcon from '../../assets/debrogliecart_icon.png';
import './ParticlesPage.css';

export const ParticlesPage: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useIsLoading();
  const error = useError();
  const particles = useParticles();
  const debrogliecartInfo = useDeBroglieCartInfo();
  const searchQuery = useSearchQuery();
  
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const loadParticles = async (filters?: FilterParams) => {
      dispatch(setLoadingAction(true));
      dispatch(setErrorAction(null));
      
      try {
        const data = await getParticles(filters);
        dispatch(setParticlesAction(data));
      } catch (err) {
        dispatch(setErrorAction('Ошибка при загрузке частиц'));
        console.error('Error loading particles:', err);
      } finally {
        dispatch(setLoadingAction(false));
      }
    };

    const loadDeBroglieCartInfo = async () => {
      try {
        const debrogliecartData = await DeBroglieCart.getDeBroglieCartInfo();
        dispatch(setDeBroglieCartInfoAction(debrogliecartData));
      } catch (err) {
        console.error('Error loading debrogliecart info:', err);
      }
    };

    const particleParam = searchParams.get('particle');
    
    if (particleParam) {
      dispatch(setSearchQueryAction(particleParam));
      loadParticles({ particle: particleParam });
    }
    else if (searchQuery) {
      setSearchParams({ particle: searchQuery });
      loadParticles({ particle: searchQuery });
    }
    else {
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
          <img src={bannerImage} className="banner-image" alt="Banner" />
        </div>
        <h1>Частицы</h1>
      </div>

      <SearchBar 
        onSearch={handleSearch}
        placeholder="Найти..."
        initialValue={searchQuery}
      />

      <Container className="space">
        {isLoading && (
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

        {!isLoading && !error && particles.length === 0 && (
          <div className="no-results">
            <h3>Частицы не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
          </div>
        )}

        {!isLoading && !error && particles.length > 0 && (
          <div className="particles-grid">
            {particles.map((particle: any) => (
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
        <img src={debrogliecartIcon} alt="Debrogliecart" className="debrogliecart-icon" />
        {debrogliecartInfo.particles_cnt > 0 && (
          <span className="debrogliecart-count">{debrogliecartInfo.particles_cnt}</span>
        )}
      </div>

      <footer className="footer">© 2025 University of Colorado. Все права защищены.</footer>
    </div>
  );
};
