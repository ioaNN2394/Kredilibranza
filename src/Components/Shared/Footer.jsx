import React from "react";
import styles from "./Footer.module.css"; // Importa los estilos de módulos CSS

function Footer() {
  return (
    <footer id={styles["contenedor-contactos"]}>
      <img
        src="/img/logo sin fondo.png"
        alt="Kredilibranza Logo"
        className={styles.logoft}
        aria-label="Logo Kredilibranza"
      />
      <div className={styles.contactos}>
        <div className={styles.celular}>
          <h2>PUEDES COMUNICARTE AL</h2>
          <p>
            <img
              src="/img/Telefono.png"
              alt="Teléfono"
              aria-label="Teléfono"
            />{" "}
            304-589-7423
          </p>
          <h2>LINEA WHATSAPP</h2>
          <p>
            <img
              src="/img/Whatsapp.png"
              alt="WhatsApp"
              aria-label="WhatsApp"
            />{" "}
            304-589-7423
          </p>
        </div>
        <div className={styles.redes}>
          <h2>NUESTRAS REDES SOCIALES</h2>
          <p>
            <img
              src="/img/Instagram.png"
              alt="Instagram"
              aria-label="Instagram"
            />{" "}
            @KREDILIBRANZA
          </p>
          <p>
            <img
              src="/img/Facebook.png"
              alt="Facebook"
              aria-label="Facebook"
            />{" "}
            KREDILIBRANZA
          </p>
        </div>
        <div className={styles.pagina_web}>
          <h2>PAGINA WEB</h2>
          <p>
            <img src="/img/Web.png" alt="Web" aria-label="Página web" />{" "}
            www.Kredilibranza.com.co
          </p>
        </div>
      </div>
      <p className={styles.footerText}>Todos los derechos reservados. Kredilibranza 2024</p>
    </footer>
  );
}

export default Footer;
