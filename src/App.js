import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./Components/Shared/NavBar";
import Header from "./Components/Shared/Header";
import Form from "./Helpers/RegistroForm/Form";
import Condiciones from "./Components/Condiciones";
import Simulador from "./Pages/Simulador/Simulador";
import QuienesSomos from "./Pages/QuienesSomos/QuienesSomos";
import Footer from "./Components/Shared/Footer";
import ChatBotPage from "./Pages/chatbot/chatbot";
import FloatingChatBot from "./Helpers/FloatingChatBot/FloatingChatBot"; // Importar el nuevo componente
import FileUpload from "./Helpers/FileUpload/FileUpload";
import Login from "./Pages/Login/Login"; 

import './Components/Shared/Banner.module.css'; // ya esta importado
import './Components/Shared/Footer.module.css'; // ya esta importado
import './Helpers/RegistroForm/Form.module.css'; // ya esta importado
import './Components/Shared/NavBar.module.css'; // ya esta importado
import './Pages/QuienesSomos/QuienesSomos.module.css'; // ya esta importado
import './Pages/Simulador/Simulador.module.css';  // ya esta importado
import './Components/Condiciones.module.css'; // ya esta importado
import './Pages/chatbot/chatbot.module.css'; // a medias
import './Helpers/FloatingChatBot/FloatingChatBot.module.css'; // Importar los estilos del flotante

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Form />
                <Condiciones />
                <Simulador />
                <QuienesSomos />
                <Footer />
              </>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/chatbot" element={<ChatBotPage />} />

          <Route
            path="/fileupload"
            element={
              <PrivateRoute>
                <FileUpload />
              </PrivateRoute>
            }/>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <FloatingChatBot /> {/* Agregar el flotante fuera de las rutas para que aparezca en todas las páginas */}
      </div>
    </Router>
  );
}

export default App;
