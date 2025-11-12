import { type FC, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/HomePage/HomePage';
import { ParticlesPage } from './pages/ParticlesPage/ParticlesPage';
import { ParticleDetailPage } from './pages/ParticleDetailPage/ParticleDetailPage';
import { ROUTES } from './constants/routes';
import { dest_root } from './target_config';
import './App.css';

const App: FC = () => {
  useEffect(() => {
    console.log("Tauri app initialized");
    return () => {
      console.log("Tauri app cleanup");
    }
  }, []);

  return (
    <BrowserRouter basename={dest_root}>
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
    </BrowserRouter>
  );
};

export default App;
