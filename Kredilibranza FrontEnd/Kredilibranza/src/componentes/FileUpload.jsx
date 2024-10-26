// FileUpload.jsx

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, File, Upload } from 'lucide-react';
import axios from 'axios';
import './FileUpload.css';

export default function FileUpload() {
  const [files, setFiles] = useState([]);

  // Estados para la nueva funcionalidad
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [searchCedula, setSearchCedula] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      let uploadUrl = '';
      if (file.type === 'application/pdf') {
        uploadUrl = 'http://localhost:8000/upload-pdf/';
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        uploadUrl = 'http://localhost:8000/upload-docx/';
      } else {
        alert('Tipo de archivo no soportado');
        return;
      }
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Verificar el token
      try {
        const response = await axios.post(uploadUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });

        const documentId = response.data.id;
        setFiles((prevFiles) => [
          ...prevFiles,
          {
            file,
            preview: URL.createObjectURL(file),
            id: documentId,
          },
        ]);
      } catch (error) {
        console.error('Error al subir el archivo:', error);
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const removeFile = async (fileObj) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Verificar el token
    try {
      await axios.delete(`http://localhost:8000/delete-document/${fileObj.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const newFiles = files.filter((f) => f.id !== fileObj.id);
      setFiles(newFiles);
      URL.revokeObjectURL(fileObj.preview);
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  };

  // Función para obtener las solicitudes desde el backend
  const fetchRequests = async (cedula = '') => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Verificar el token
    try {
      const response = await axios.get('http://localhost:8000/get-requests/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          cedula: cedula || null,
        },
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error al obtener las solicitudes:', error);
    }
  };

  // useEffect para obtener las solicitudes al abrir el modal
  useEffect(() => {
    if (showRequestsModal) {
      fetchRequests();
      // Añadir clase para hacer el fondo opaco
      document.body.classList.add('modal-open');
    } else {
      // Remover clase cuando el modal se cierra
      document.body.classList.remove('modal-open');
    }
  }, [showRequestsModal]);

  // Manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchCedula(e.target.value);
  };

  // Manejar envío del formulario de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRequests(searchCedula);
  };

  return (
    <div className="file-upload-container">
      <div className="file-upload-card">
        <h1 className="file-upload-title">Carga de Documentos</h1>

        {/* Botón para ver solicitudes */}
        <button
          onClick={() => setShowRequestsModal(true)}
          className="view-requests-button"
        >
          Ver solicitudes
        </button>

        <div
          {...getRootProps()}
          className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload size={48} />
          {isDragActive ? (
            <p>Suelta los archivos aquí ...</p>
          ) : (
            <p>Arrastra y suelta archivos PDF o DOCX aquí, o haz clic para seleccionar archivos</p>
          )}
        </div>

        {files.length > 0 && (
          <div className="uploaded-files-list">
            <h2>Documentos Cargados</h2>
            <ul>
              {files.map((fileObj) => (
                <li key={fileObj.id} className="uploaded-file-item">
                  <div className="file-info">
                    <File size={24} />
                    <span className="file-name">{fileObj.file.name}</span>
                  </div>
                  <button
                    onClick={() => removeFile(fileObj)}
                    className="remove-button"
                  >
                    <X size={20} />
                    <span className="sr-only">Eliminar archivo</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal de solicitudes */}
        {showRequestsModal && (
          <div className="modal-overlay" onClick={() => setShowRequestsModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Solicitudes Registradas</h2>

              {/* Formulario de búsqueda */}
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  type="text"
                  placeholder="Buscar por cédula"
                  value={searchCedula}
                  onChange={handleSearchChange}
                />
                <button type="submit">Buscar</button>
              </form>

              <div className="table-container">
                <table className="requests-table">
                  <thead>
                    <tr>
                      <th>Nombre Completo</th>
                      <th>Cédula</th>
                      <th>Convenio</th>
                      <th>Teléfono</th>
                      <th>Fecha de Nacimiento</th>
                      <th>Política de Privacidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td>{request.nombre_completo}</td>
                        <td>{request.cedula}</td>
                        <td>{request.convenio}</td>
                        <td>{request.telefono}</td>
                        <td>{new Date(request.fecha_nacimiento).toLocaleDateString()}</td>
                        <td>{request.politica_privacidad ? 'Sí' : 'No'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setShowRequestsModal(false)}
                className="close-modal-button"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
