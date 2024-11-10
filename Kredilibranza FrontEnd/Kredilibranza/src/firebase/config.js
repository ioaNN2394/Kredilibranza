//firebase/config.js

// Importar las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAu9FpLYLyNk_HqoXPCpGtzPaMI808qZI8",
  authDomain: "proyecto-edya2-49bfa.firebaseapp.com",
  projectId: "proyecto-edya2-49bfa",
  storageBucket: "proyecto-edya2-49bfa.firebasestorage.app",
  messagingSenderId: "961253448568",
  appId: "1:961253448568:web:ecee126fd230f6a9c8068d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar autenticación y proveedor de Google
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Exportar las configuraciones
export { app, auth, googleProvider };
