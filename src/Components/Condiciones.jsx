import React from "react";
import styles from './Condiciones.module.css';

function Condiciones() {
  return (
    <section id="condiciones">
      <div className={styles.containerTxtCondiciones}>
        <h2>Que <span style={{ color: "#ed5621" }}>condiciones</span> necesitas</h2>
      </div>
      <div className={styles.containerCondiciones}>
        <div className={styles.cardCondiciones}>
          <div className={styles.cardCondiciones2}>
            <span>Pensionado</span>
          </div>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <span className={styles.tituloCondicion}>Edad</span> Hasta 92 años
            </li>
            <li className={styles.listItem}>
              <span className={styles.tituloCondicion}>Plazo</span> Hasta 180 meses
            </li>
            <li className={styles.listItem}>
              <span className={styles.tituloCondicion}>Monto</span> Desde $1 millón y hasta 140 Millones
            </li>
            <li className={styles.listItem}>
              <span className={styles.tituloCondicion}>Condiciones</span> Ser pensionado de alguna de las pagadurías o fondos de pensiones con los cuales tenemos convenio
            </li>
          </ul>
          <div className={styles.heartImage}>
            <img src="/img/Pensionado_2.png" alt="Pensionado" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Condiciones;
