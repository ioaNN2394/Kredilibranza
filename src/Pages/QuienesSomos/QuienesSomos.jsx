import React from "react";
import styles from "./QuienesSomos.module.css"; // Importa los estilos

function QuienesSomos() {
  return (
    <section id={styles["quienes-somos"]}>
      <h2>¿Quiénes Somos?</h2>
      <p>
        Somos Kredilibranza, una empresa especializada en créditos de libranza para pensionados y personas reportadas en el sector financiero. Nos
        destacamos por nuestra experiencia y compromiso en brindar soluciones financieras sólidas y confiables a nuestros clientes, con un
        enfoque serio y profesional.
      </p>
      <hr id={styles.separador2} />
      <div className={styles["mision-vision"]}>
        <div className={styles.mision}>
          <h3>MISIÓN</h3>
          <p>
            Nuestra misión es ayudar a pensionados y personas reportadas en el sector financiero mediante créditos de libranza accesibles, siendo
            el puente hacia oportunidades financieras que cumplan sus metas y sueños.
          </p>
        </div>
        <div className={styles.vision}>
          <h3>VISIÓN</h3>
          <p>
            Nuestra visión es consolidarnos como un referente confiable en la industria de créditos de libranza, destacándonos por nuestro
            compromiso con la atención personalizada y la solidez financiera.
          </p>
        </div>
      </div>
    </section>
  );
}

export default QuienesSomos;
