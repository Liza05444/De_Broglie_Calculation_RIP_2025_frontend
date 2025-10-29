import { type FC } from 'react';
import { Card, Button } from 'react-bootstrap';
import type { Particle } from '../../types';
import defaultImage from '../../assets/default_particle.png';
import './ParticleCard.css';

interface ParticleCardProps {
  particle: Particle;
  onViewDetails: (id: number) => void;
}

export const ParticleCard: FC<ParticleCardProps> = ({ 
  particle, 
  onViewDetails
}) => {
  return (
    <Card className="particle-card">
      <div className="particle-image-wrapper">
        <Card.Img 
          variant="top" 
          src={particle.image || defaultImage} 
          alt={particle.name}
          className="particle-image"
        />
      </div>
      <Card.Body className="particle-info">
        <Card.Title className="particle-title">{particle.name}</Card.Title>
        <Card.Text className="particle-mass">
          Масса: {particle.mass} кг
        </Card.Text>
      </Card.Body>
      <Card.Footer className="particle-actions">
        <Button 
          variant="outline-primary" 
          className="action-button"
          onClick={() => onViewDetails(particle.id)}
        >
          Подробнее
        </Button>
      </Card.Footer>
    </Card>
  );
};
