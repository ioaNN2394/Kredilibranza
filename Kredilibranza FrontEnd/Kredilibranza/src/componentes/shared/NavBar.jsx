// componentes/shared/NavBar/Navbar.jsx

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from './Navbar.module.css';

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isChatbotPage = location.pathname === "/chatbot";
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // Recupera el nombre de usuario

  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const shouldShowWelcome = localStorage.getItem('showWelcomeMessage') === 'true';
    if (shouldShowWelcome && username) {
      setShowWelcome(true);
      // Desactivar la bandera para que no se muestre nuevamente
      localStorage.setItem('showWelcomeMessage', 'false');

      // Ocultar el mensaje después de 5 segundos
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);

      // Limpiar el temporizador si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('username'); 
    localStorage.removeItem('showWelcomeMessage'); // Elimina la bandera si existe
    navigate('/');
  };

  return (
    <nav className={styles.navegacion}>
      {!isChatbotPage && (
        <>
          {/* Contenedor para el logo y la imagen de clientes */}
          <div className={styles.logoContainer}>
            <img src="/img/logo sin fondo.png" alt="Kredilibranza Logo" className={styles.logo} />
            <img src="/img/clientes.png" alt="Clientes" className={styles.clientes} />
            <span className={styles.txtClientes}>Clientes: 500</span>
          </div>

          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <a href="#simulador" className={styles.menuLink}>Simulador</a>
            </li>
            <li className={styles.menuItem}>
              <a href="#condiciones" className={styles.menuLink}>Condiciones</a>
            </li>
            <li className={styles.menuItem}>
              <a href="#quienes-somos" className={styles.menuLink}>¿Quiénes Somos?</a>
            </li>
            <li className={styles.menuItem}>
              <a href="#contenedor-contactos" className={styles.menuLink}>Contáctanos</a>
            </li>

            {token ? (
              <>
                {/* Muestra el nombre de usuario */}
                <li className={styles.menuItem}>
                  <span className={styles.welcomeText}>Hola, {username}</span>
                </li>
                
                {/* Renderizar "Administrador" solo si el usuario es Admin1 */}
                {username === 'Admin1' && (
                  <li className={styles.menuItem}>
                    <Link to="/fileupload" className={styles.menuLink}>Administrador</Link>
                  </li>
                )}

                <li className={styles.menuItem}>
                  <button className={styles.loginButton} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className={styles.menuItem}>
                <button className={styles.loginButton} onClick={() => navigate('/login')}>
                  Login
                </button>
              </li>
            )}
          </ul>

          {/* Mensaje de Bienvenida */}
          {showWelcome && (
            <div className={styles.welcomeCard}>
              <p>Bienvenido {username}</p>
            </div>
          )}
        </>
      )}
      {isChatbotPage && (
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link to="/" className={styles.menuLink}>Volver</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
