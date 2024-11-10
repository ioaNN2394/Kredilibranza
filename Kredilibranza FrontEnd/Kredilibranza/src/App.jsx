// src/App.jsx

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './componentes/PrivateRoute';
import FloatingChatBot from './helpers/FloatingChatBot/FloatingChatBot';
import NavBar from './componentes/shared/NavBar';

// Importar estilos globales y módulos
import './componentes/shared/Banner.css';
import './componentes/shared/Footer.css';
import './helpers/RegistroForm/Form.css';
import './componentes/shared/Navbar.module.css';
import './pages/QuienesSomos/QuienesSomos.module.css';
import './pages/Simulador/Simulador.module.css';
import './componentes/shared/Condiciones.css';
import './pages/chatbot/chatbot.module.css';
import './helpers/FloatingChatBot/FloatingChatBot.css';
import './pages/Login/Login.module.css';

// Carga diferida de componentes para mejorar el rendimiento
const Header = lazy(() => import('./componentes/shared/Header'));
const Form = lazy(() => import('./helpers/RegistroForm/Form'));
const Condiciones = lazy(() => import('./componentes/Condiciones'));
const Simulador = lazy(() => import('./pages/Simulador/Simulador'));
const QuienesSomos = lazy(() => import('./pages/QuienesSomos/QuienesSomos'));
const Footer = lazy(() => import('./componentes/shared/Footer'));
const ChatBotPage = lazy(() => import('./pages/chatbot/chatbot'));
const FileUpload = lazy(() => import('./helpers/FileUpload/FileUpload'));
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/register/Register'));

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Suspense fallback={<div>Cargando...</div>}>
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
            <Route path="/register" element={<Register />} />
            <Route path="/chatbot" element={<ChatBotPage />} />
            <Route
              path="/fileupload"
              element={
                <PrivateRoute>
                  <FileUpload />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
        <FloatingChatBot />
      </div>
    </Router>
  );
}

export default React.memo(App);
