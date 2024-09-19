import React from "react";
import './NavBar.css';

function NavBar() {
  return (
    <nav id="navegacion">
      <img src="/img/logo sin fondo.png" alt="Kredilibranza Logo" className="logo" />
      <img id="Clientes" src="/img/clientes.png" alt="Clientes" />
      <span id="txtClientes" style={{ color: "#ed5621" }}>Clientes: 500</span>
      <ul>
        <li><a href="#simulador">Simulador</a></li>
        <li><a href="#condiciones">Condiciones</a></li>
        <li><a href="#quienes-somos">¿Quiénes Somos?</a></li>
        <li><a href="#contacto">Contáctanos</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
