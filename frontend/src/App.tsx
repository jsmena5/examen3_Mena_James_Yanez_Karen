import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import InvestigadoresList from './components/Investigador/InvestigadorList';
import AsignacionPage from './components/Asignacion/AsignacionPage';

import './App.css';

const Home = () => (
  <div className="home-container">
    <h1>Sistema de Gestión de Investigadores</h1>
    <div className="home-content">
      <h2>Bienvenido al Sistema de Gestión de Investigadores</h2>
      <p>Este sistema te permite gestionar la información de investigadores y sus asignaciones.</p>
      
      <div className="features">
        <div className="feature">
          <h3>Investigadores</h3>
          <p>Gestiona la información y disponibilidad de los investigadores.</p>
        </div>
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="about-container">
    <h2>Acerca del Proyecto</h2>
    
    <div className="about-content">
      <h3>Información Institucional</h3>
      <p><strong>Departamento:</strong> Ciencias de la Computación</p>
      <p><strong>Carrera:</strong> Tecnologías de la Información</p>
      <p><strong>Asignatura:</strong> Programación Integrativa de Componentes</p>
      <p><strong>Proyecto:</strong> Examen 3 Parcial - Gestión de Grupos</p>

      <h3>Integrantes</h3>
      <ul className="member-list">
        <li>James Mena</li>
        <li>Karen Yanez</li>
      </ul>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/investigadores" element={<InvestigadoresList />} />
            <Route path="/asignaciones" element={<AsignacionPage />} />


            <Route path="/acerca" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;