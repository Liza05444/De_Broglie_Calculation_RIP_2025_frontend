import { type FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/HomePage/HomePage';
import { ParticlesPage } from './pages/ParticlesPage/ParticlesPage';
import { ParticleDetailPage } from './pages/ParticleDetailPage/ParticleDetailPage';
import { ROUTES } from './constants/routes';
import './App.css';

const App: FC = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.PARTICLES} element={<ParticlesPage />} />
          <Route path={`${ROUTES.PARTICLES}/:id`} element={<ParticleDetailPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
