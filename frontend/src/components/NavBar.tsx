import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Gestión de Investigadores
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Inicio</Link>
          <Link to="/investigadores" className="navbar-link">Investigadores</Link>
          <Link to="/asignaciones" className="navbar-link">Asignaciones</Link>

          <Link to="/acerca" className="navbar-link">Acerca de</Link>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;