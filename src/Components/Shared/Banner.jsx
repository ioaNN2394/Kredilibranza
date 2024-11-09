import React from "react";
import styles from "./Banner.module.css";

export default function Banner() {
    return (
        <div className={styles.banner}>
            <h2>Kredilibranza</h2>
            <div className={styles.clientes}></div>
            <div className={styles.txtClientes}>Clientes</div>
        </div>
    );
}
