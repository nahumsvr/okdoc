'use client';

import { useState } from 'react';
import Link from 'next/link';
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
        <button className="btn-draft" onClick={() => console.log('Borrador Guardado', formData)}>
          Guardar Borrador
        </button>
        <button className="btn-primary" onClick={handleSubmit}>
          Guardar Registro
        </button>
      </div>

      <div className="formulario-footer" style={{ borderTop: '2px dashed #e2e8f0', paddingTop: '2rem', marginTop: '1rem', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Navegación</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%' }}>
          <Link href="/patients" className="btn-secondary" style={{ textDecoration: 'none', textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined text-[20px]">home</span>
            Ir al Inicio
          </Link>
          <Link href="/patients/search" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', flex: 1, backgroundColor: '#002D58', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined text-[20px]">search</span>
            Buscar Otro Paciente
          </Link>
        </div>
      </div>
    </div>
  );
}
