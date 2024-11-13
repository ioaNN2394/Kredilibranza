// src/api.js

const apiUrl = "https://kredilibranza-production.up.railway.app";

// Función para obtener datos (GET)
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Función para enviar datos (POST)
export const postData = async (endpoint, body) => {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

// Función para autenticación (token)
export const authenticateUser = async (username, password) => {
  const body = new URLSearchParams({ username, password });
  try {
    const response = await fetch(`${apiUrl}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error('Error de autenticación');
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la autenticación:", error);
    throw error;
  }
};

// Función para cargar archivos (POST)
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${apiUrl}/upload-file/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Función para eliminar un documento (DELETE)
export const deleteDocument = async (documentId) => {
  try {
    const response = await fetch(`${apiUrl}/delete-document/${documentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

// Función para enviar un formulario (POST)
export const submitForm = async (formData) => {
  try {
    return await postData('/submit-form/', formData);
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    throw error;
  }
};

// Función para generar respuesta del chatbot (POST)
export const generateAnswer = async (question) => {
  try {
    return await postData('/generate-answer/', { question });
  } catch (error) {
    console.error("Error con el chatbot:", error);
    throw error;
  }
};

// Función para guardar un documento (POST)
export const saveDocument = async (content) => {
  try {
    return await postData('/save-document/', { content });
  } catch (error) {
    console.error("Error al guardar documento:", error);
    throw error;
  }
};
