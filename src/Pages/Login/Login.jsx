import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Shared/Button';
import Input from '../../Components/Shared/Input';
import Label from '../../Components/Shared/Label';
import { User, Lock, X } from 'lucide-react';
import styles from './Login.module.css'; // Importamos el CSS Módulo

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Nombre de usuario o contraseña incorrectos');
      }

      const data = await response.json();
      // Guarda el token en el almacenamiento local o en el estado global
      localStorage.setItem('token', data.access_token);
      // Redirige a la página principal o a la que desees
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleClose = () => {
    navigate('/'); // Redirige a la página principal cuando se haga clic en el botón X
  };

  return (
    <div className={styles.loginContainer}>
      {/* Formulario de Login */}
      <div className={styles.loginCard}>
        {/* Botón de Cerrar dentro del formulario */}
        <button
          className={styles.closeButton}
          aria-label="Cerrar"
          onClick={handleClose}
        >
          <X size={24} />
        </button>

        {/* Título del Formulario */}
        <h1 className="text-3xl font-bold text-center mb-8">Iniciar Sesión</h1>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.loginField}>
            <Label htmlFor="username">Nombre de Usuario</Label>
            <div className="relative">
              <User className={styles.icon} size={20} />
              <Input
                id="username"
                type="text"
                placeholder="tu_usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className={styles.loginField}>
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Lock className={styles.icon} size={20} />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
}