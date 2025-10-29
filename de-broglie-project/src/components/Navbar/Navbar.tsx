import { type FC } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES, ROUTE_LABELS } from '../../constants/routes';
import phetLogo from '../../assets/phet_logo.png';
import uniLogo from '../../assets/uni_logo.png';
import './Navbar.css';

export const Navbar: FC = () => {
  const location = useLocation();

  return (
    <BootstrapNavbar expand="lg" className="custom-navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} to={ROUTES.HOME} className="navbar-brand">
          <div className="logo-container">
            <img src={phetLogo} alt="PhET Logo" className="logo-image" />
            <div className="logo-divider"></div>
            <img src={uniLogo} alt="University Logo" className="logo-image" />
          </div>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              as={Link} 
              to={ROUTES.HOME}
              className={location.pathname === ROUTES.HOME ? 'active' : ''}
            >
              {ROUTE_LABELS.HOME}
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to={ROUTES.PARTICLES}
              className={location.pathname === ROUTES.PARTICLES ? 'active' : ''}
            >
              {ROUTE_LABELS.PARTICLES}
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};
