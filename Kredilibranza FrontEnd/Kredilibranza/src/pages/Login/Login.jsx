import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../componentes/shared/Button';
import Input from '../../componentes/shared/Input';
import Label from '../../componentes/shared/Label';
import { User, Lock, X } from 'lucide-react';
import styles from './Login.module.css';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Intentar iniciar sesión con Firebase usando correo electrónico y contraseña
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // Obtener el nombre para mostrar: preferiblemente displayName, si no, usar el email
      const displayName = user.displayName || user.email;

      // Almacenar el token y el nombre de usuario en localStorage
      localStorage.setItem('token', userCredential.user.accessToken);
      localStorage.setItem('username', displayName);
      localStorage.setItem('showWelcomeMessage', 'true'); // Activar la bandera para mostrar el mensaje

      // Redirigir al usuario a la página principal
      navigate('/');
    } catch (err) {
      console.error('Error con Firebase:', err.message);
      setError('Nombre de usuario o contraseña incorrectos');
    }

    // Intentar iniciar sesión con el backend local
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
        throw new Error('Nombre de usuario o contraseña incorrectos en el backend');
      }

      const data = await response.json();
      // Suponiendo que el backend devuelve un access_token y posiblemente el nombre de usuario
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('username', data.username || username); // Ajusta según la respuesta del backend
      localStorage.setItem('showWelcomeMessage', 'true'); // Activar la bandera para mostrar el mensaje

      // Redirigir al usuario a la página principal
      navigate('/');
    } catch (err) {
      console.error('Error con el backend:', err.message);
      setError(err.message);
    }
  };

  // Manejar el inicio de sesión con Google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const displayName = user.displayName || user.email;

      // Almacenar el token y el nombre de usuario en localStorage
      localStorage.setItem('token', user.accessToken);
      localStorage.setItem('username', displayName);
      localStorage.setItem('showWelcomeMessage', 'true'); // Activar la bandera para mostrar el mensaje

      // Redirigir al usuario a la página principal
      navigate('/');
    } catch (err) {
      console.error('Error con Google Sign-In:', err.message);
      setError('Error al iniciar sesión con Google');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <button className={styles.closeButton} aria-label="Cerrar" onClick={handleClose}>
          <X size={24} />
        </button>

        <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.loginField}>
            <Label htmlFor="username">Nombre de Usuario</Label>
            <div className={styles.inputGroup}>
              <User className={styles.icon} size={20} />
              <Input
                id="username"
                type="text"
                placeholder="tu_usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
          </div>
          <div className={styles.loginField}>
            <Label htmlFor="password">Contraseña</Label>
            <div className={styles.inputGroup}>
              <Lock className={styles.icon} size={20} />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
          </div>
          <Button type="submit" className={styles.submitButton}>
            Iniciar Sesión
          </Button>
        </form>

        {/* Divider y botón de Google */}
        <div className={styles.divider}><span>O</span></div>

        <button onClick={handleGoogleSignIn} className={styles.googleButton}>
          Iniciar sesión con Google
        </button>

        {/* Enlace para registrarse */}
        <p className={styles.registerText}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" className={styles.registerLink}>
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
