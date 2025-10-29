import { type FC, useState, useEffect } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSearchQuery } from '../../store/slices/particlesSlice';
import type { Particle } from '../../types';
import { getParticle } from '../../modules/particles';
import { ROUTES, ROUTE_LABELS } from '../../constants/routes';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import defaultImage from '../../assets/default_particle.png';
import './ParticleDetailPage.css';

export const ParticleDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const searchQuery = useSearchQuery();
  const [particle, setParticle] = useState<Particle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const backUrl = searchQuery ? `${ROUTES.PARTICLES}?particle=${encodeURIComponent(searchQuery)}` : ROUTES.PARTICLES;

  useEffect(() => {
    const loadParticle = async () => {
      if (!id) {
        setError('ID частицы не указан');
        setLoading(false);
        return;
      }

      try {
        const particleId = parseInt(id, 10);
        if (isNaN(particleId)) {
          setError('Неверный ID частицы');
          setLoading(false);
          return;
        }

        const data = await getParticle(particleId);
        setParticle(data);
      } catch (err) {
        setError('Ошибка при загрузке частицы');
        console.error('Error loading particle:', err);
      } finally {
        setLoading(false);
      }
    };

    loadParticle();
  }, [id]);

  if (loading) {
    return (
      <div className="particle-detail-page">
        <div className="loading-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
          <p>Загрузка информации о частице...</p>
        </div>
      </div>
    );
  }

  if (error || !particle) {
    return (
      <div className="particle-detail-page">
        <Alert variant="danger" className="error-alert">
          {error || 'Частица не найдена'}
        </Alert>
      </div>
    );
  }

  return (
    <div className="particle-detail-page">
      <BreadCrumbs 
        crumbs={[
          { label: ROUTE_LABELS.PARTICLES, path: backUrl },
          { label: particle.name }
        ]} 
      />
      
      <Container className="particle-detail-container">
        <h1>{particle.name}</h1>
        
        <div className="particle-card">
          <div className="particle-image-wrapper">
            <img
              src={particle.image || defaultImage}
              alt={particle.name}
              className="particle-image"
            />
          </div>
          <div className="particle-info-wrapper">
            <p className="particle-detail-mass"><strong>Масса:</strong> {particle.mass} кг</p>
            {particle.description && (
              <p className="particle-detail-description"><strong>Описание:</strong> {particle.description}</p>
            )}
          </div>
        </div>
      </Container>
      
      <footer className="footer">© 2025 University of Colorado. Все права защищены.</footer>
    </div>
  );
};
