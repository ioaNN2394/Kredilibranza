import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../componentes/shared/Button';
import Input from '../../componentes/shared/Input';
import Label from '../../componentes/shared/Label';
import { User, Lock, X } from 'lucide-react';
import styles from './Register.module.css';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase/config';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Usuario registrado exitosamente');
      navigate('/login');
    } catch (err) {
      console.error(err.message);
      setError('Error al registrar usuario');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Registrado con Google exitosamente');
      navigate('/');
    } catch (err) {
      console.error(err.message);
      setError('Error al registrarse con Google');
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <button className={styles.closeButton} onClick={handleClose}>
          <X size={24} />
        </button>

        <h1 className="text-3xl font-bold">Registrarse</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <div className={styles.registerField}>
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className={styles.inputGroup}>
              <User className={styles.icon} size={20} />
              <Input
                id="email"
                type="email"
                placeholder="tu_correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
          </div>
          <div className={styles.registerField}>
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
          <div className={styles.registerField}>
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <div className={styles.inputGroup}>
              <Lock className={styles.icon} size={20} />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>
          </div>
          <Button type="submit" className={styles.submitButton}>
            Registrarse
          </Button>
        </form>

        <div className={styles.divider}><span>O</span></div>

        <button onClick={handleGoogleSignIn} className={styles.googleButton}>
          Registrarse con Google
        </button>

        <p className={styles.loginText}>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className={styles.loginLink}>
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
