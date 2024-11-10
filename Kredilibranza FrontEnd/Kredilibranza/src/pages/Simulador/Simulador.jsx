//pages/simulador/Simulador

import React from "react";
import styles from './Simulador.module.css';

function Simulador() {
  return (
    <section id="simulador" className={styles.simulador}>
      <div className={styles.containerSimulador}>
        <div className={styles.simuladorForm}>
          <div className={styles.formGroup}>
            <label htmlFor="monto" className={styles.label}>Monto</label>
            <input type="text" id="monto" placeholder="Desde $1.000.000 y hasta $140.000.000 COP" className={styles.input} />
            <p>Desde $1.000.000 y hasta $140.000.000 COP</p>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="plazo" className={styles.label}>Plazo</label>
            <select id="plazo" className={styles.select}>
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
              <option value="36">36 meses</option>
              <option value="48">48 meses</option>
            </select>
          </div>
          <button type="button" className={styles.btnSimular}>SIMULAR</button>
        </div>
        
        <div className={styles.resultado}>  
          <h2 className={styles.resultadoTitulo}>REVISA TU RESULTADO</h2>
          <p className={styles.resultadoTexto}>Monto solicitado</p>
          <p className={styles.resultadoTexto}>Interés %* (N.M.V.)</p>
          <p className={styles.resultadoTexto}>Tu cuota mensual*</p>
        </div>
        <p>*Sujeto a términos y condiciones de viabilidad para el otorgamiento del crédito</p>
      </div>
      <div className={styles.containerImg}>
        <img src="/img/Pensionado_3.png" alt="Personas pensionadas" className={styles.imgPensionados} />
        <div className={styles.beneficios}>
          <div className={styles.beneficioItem}>
            <img src="/img/Idea.png" alt="Idea" className={styles.iconBeneficio} />
            <p className={styles.beneficioTexto}>Somos 100% digitales</p>
          </div>
          <div className={styles.beneficioItem}>
            <img src="/img/Idea.png" alt="Idea" className={styles.iconBeneficio} />
            <p className={styles.beneficioTexto}>Trabajamos reportados y pensionados</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Simulador;
