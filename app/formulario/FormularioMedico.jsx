'use client';

import { useState } from 'react';
import TramiteFichaIdentificacion from './TramiteFichaIdentificacion';
import HistoriaClinicaDiagnostico from './HistoriaClinicaDiagnostico';
import HospitalizacionMedicos from './HospitalizacionMedicos';
import './formulario.css';

const INITIAL_STATE = {
  seccion1: {},
  seccion2: {},
  seccion3: {},
};

export default function FormularioMedico() {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSection = (section) => (data) =>
    setFormData((prev) => ({ ...prev, [section]: data }));

  const handleSubmit = () => {
    const payload = {
      ...formData.seccion1,
      ...formData.seccion2,
      ...formData.seccion3,
    };
    console.log('Formulario enviado:', payload);
    // TODO: conectar con tu API / backend
  };

  return (
    <div className="formulario-wrap">
      <header className="formulario-header">
        <h1>Solicitud de autorización médica</h1>
        <p>Completa todas las secciones. Los campos marcados son obligatorios.</p>
      </header>

      <TramiteFichaIdentificacion
        data={formData.seccion1}
        onChange={handleSection('seccion1')}
      />

      <HistoriaClinicaDiagnostico
        data={formData.seccion2}
        onChange={handleSection('seccion2')}
      />

      <HospitalizacionMedicos
        data={formData.seccion3}
        onChange={handleSection('seccion3')}
      />

      <div className="formulario-footer">
        <button className="btn-secondary" onClick={() => setFormData(INITIAL_STATE)}>
          Limpiar formulario
        </button>
        <button className="btn-primary" onClick={handleSubmit}>
          Enviar solicitud
        </button>
      </div>
    </div>
  );
}
