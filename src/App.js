import React from "react";
import NavBar from "./componentes/NavBar";
import Header from "./componentes/Header";
import Form from "./componentes/Form";
import Condiciones from "./componentes/Condiciones";
import Simulador from "./componentes/Simulador";
import QuienesSomos from "./componentes/QuienesSomos";
import Footer from "./componentes/Footer";

import './componentes/Banner.css'
import './componentes/Footer.css'
import './componentes/Form.css'
import './componentes/NavBar.css'
import './componentes/QuienesSomos.css'
import './componentes/Simulador.css'
import './componentes/Condiciones.css'

function App() {
  return (
    <div>
      <NavBar />
      <Header />
      <Form />
      <Condiciones />
      <Simulador />
      <QuienesSomos />
      <Footer />
    </div>
  );
}

export default App;
