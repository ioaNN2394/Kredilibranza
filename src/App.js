import React from 'react';
import NavBar from './componentes/NavBar';
import Header from './componentes/Header';
import RegistroForm from './componentes/RegistroForm';
import Services from './componentes/Services';
import Footer from './componentes/Footer';
import Contacto from './componentes/Contacto';
import Banner from './componentes/Banner';
import './App.css'; // Aquí se importa el archivo CSS con todos los estilos

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <Banner />
      <Services />
      <RegistroForm />
      <Contacto />
      <Footer />
    </div>
  );
}

export default App;
