import React, { useState } from "react";
import styles from './Form.module.css';

function Form() {

  const [formData, setFormData] = useState({
    nombre_completo: '',
    cedula: '',
    convenio: '',
    telefono: '',
    fecha_nacimiento: '',
    politica_privacidad: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.politica_privacidad) {
      alert('Debe aceptar la política de privacidad.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/submit-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        alert(`Error: ${data.detail}`);
        return;
      }
  
      const data = await response.json();
      alert(data.status);
  
      setFormData({
        nombre_completo: '',
        cedula: '',
        convenio: '',
        telefono: '',
        fecha_nacimiento: '',
        politica_privacidad: false,
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <section className={styles.registro}> {/* Cambia id="registro" */}
      <div className={styles.container}> {/* Cambia className="container" */}
        <div className={styles.left}> {/* Cambia className="left" */}
          <img className={styles.pensionado} src="/img/pensionado.jpeg" alt="Pensionado" />
          <img className={styles.banner} src="/img/Banner.png" alt="Banner" />
          <div className={styles.card2}>
            <span style={{ color: "#ed5621" }}>Atendemos</span>
            clientes pensionados y reportados: descubre nuestros servicios de libranza hoy mismo y en línea.
          </div>
        </div>
        <div className={styles.right}> {/* Cambia className="right" */}
          <img src="/img/logo sin fondo.png" alt="Kredilibranza Logo" className={styles.logo_registro} />
          <div className={styles.card}>
            <h1 className={styles.txtForm}>¡TOMA EL CONTROL DE TU VIDA FINANCIERA!</h1>
            <p className={styles.txtForm}>Obtén tu crédito rápido y fácil</p>
            <form className={styles.form} onSubmit={handleSubmit}> {/* Cambia id="form" */}
              <div className={styles.formGroup}> {/* Cambia className="form-group" */}
                <label className={styles.txtForm} htmlFor="nombre_completo">Nombre Completo:</label>
                <input
                  type="text" 
                  id="nombre_completo" 
                  name="nombre_completo" 
                  value={formData.nombre_completo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.txtForm} htmlFor="cedula">Cédula:</label>
                <input 
                  type="text" 
                  id="cedula" 
                  name="cedula" 
                  value={formData.cedula}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.txtForm} htmlFor="convenio">Convenio:</label>
                <select 
                  id="convenio" 
                  name="convenio"
                  value={formData.convenio}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="option1">Opción 1</option>
                  <option value="option2">Opción 2</option>
                  <option value="option3">Opción 3</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.txtForm} htmlFor="telefono">Teléfono:</label>
                <input 
                  type="text" 
                  id="telefono" 
                  name="telefono" 
                  value={formData.telefono}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.txtForm} htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
                <input 
                  type="date" 
                  id="fecha_nacimiento" 
                  name="fecha_nacimiento" 
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.politicaPrivacidadContainer}> {/* Cambia id="politica_privacidad_container" */}
                <input 
                  type="checkbox" 
                  id="politica_privacidad" 
                  name="politica_privacidad" 
                  className={styles.checkboxInput} 
                  checked={formData.politica_privacidad}
                  onChange={handleChange}
                />
                <label htmlFor="politica_privacidad">
                  He leído y acepto <span style={{ color: "#ed5621" }}>la política de privacidad de datos</span>
                </label>
              </div>
              <button type="submit" className={styles.submitButton}>Enviar</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Form;
