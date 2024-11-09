import React from "react";
import styles from "./Simulador.module.css"; // Importa los estilos

function Simulador() {
  return (
    <section id={styles.simulador}>
      <div className={styles.container_simulador}>
        <div className={styles.simulador_form}>
          <div className={styles.form_group}>
            <label htmlFor="monto">Monto</label>
            <input type="text" id="monto" placeholder="Desde $1.000.000 y hasta $140.000.000 COP" />
            <p>Desde $1.000.000 y hasta $140.000.000 COP</p>
          </div>
          <div className={styles.form_group}>
            <label htmlFor="plazo">Plazo</label>
            <select id="plazo">
              <option value="12">12 meses</option>
              <option value="24">24 meses</option>
              <option value="36">36 meses</option>
              <option value="48">48 meses</option>
            </select>
          </div>
          <button type="button" className={styles.btn_simular}>SIMULAR</button>
        </div>
        <div className={styles.resultado}>
          <h2>REVISA TU RESULTADO</h2>
          <p>Monto solicitado</p>
          <p>Interés %* (N.M.V.)</p>
          <p>Tu cuota mensual*</p>
        </div>
        <p>*Sujeto a términos y condiciones de viabilidad para el otorgamiento del crédito</p>
      </div>
      <div className={styles.container_img}>
        <img src="/img/Pensionado_3.png" alt="Personas pensionadas" className={styles.img_pensionados} />
        <div className={styles.beneficios}>
          <div className={styles.beneficio_item}>
            <img src="/img/Idea.png" alt="Idea" className={styles.icon_beneficio} />
            <p>Somos 100% digitales</p>
          </div>
          <div className={styles.beneficio_item}>
            <img src="/img/Idea.png" alt="Idea" className={styles.icon_beneficio} />
            <p>Trabajamos reportados y pensionados</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Simulador;
