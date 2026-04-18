'use client';

const HONORARIOS_FIELDS = [
  { key: 'honTratante',     label: 'Médico tratante' },
  { key: 'honCirujano',     label: 'Cirujano' },
  { key: 'honAnestesio',    label: 'Anestesiólogo' },
  { key: 'honAyudante',     label: 'Ayudante' },
  { key: 'honOtros',        label: 'Otros' },
];

export default function HospitalizacionMedicos({ data, onChange }) {
  const handle = (field, value) => onChange({ ...data, [field]: value });

  return (
    <section className="form-section">
      <div className="section-header">
        <span className="section-number s3">3</span>
        <h2>Hospitalización y médicos</h2>
      </div>

      <div className="section-body">
        {/* Complicaciones */}
        <div className="grid-2">
          <fieldset className="field">
            <legend>¿Existen complicaciones?</legend>
            <div className="radio-group">
              {['Sí', 'No'].map((op) => (
                <label key={op} className="radio-opt s3">
                  <input
                    type="radio"
                    name="complicaciones"
                    value={op}
                    checked={data.complicaciones === op}
                    onChange={() => handle('complicaciones', op)}
                  />
                  {op}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="field">
          <label>Descripción de complicaciones y observaciones</label>
          <textarea
            placeholder="Detalle las complicaciones u observaciones relevantes..."
            value={data.descComplicaciones || ''}
            onChange={(e) => handle('descComplicaciones', e.target.value)}
          />
        </div>

        {/* Hospital */}
        <div className="divider" />
        <p className="subsec-label">Datos del hospital</p>

        <div className="field">
          <label>Nombre del hospital</label>
          <input
            type="text"
            placeholder="Nombre completo del hospital o clínica"
            value={data.hospitalNombre || ''}
            onChange={(e) => handle('hospitalNombre', e.target.value)}
          />
        </div>

        <div className="grid-3">
          <div className="field">
            <label>Ciudad</label>
            <input
              type="text"
              placeholder="Ciudad"
              value={data.hospitalCiudad || ''}
              onChange={(e) => handle('hospitalCiudad', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Estado</label>
            <input
              type="text"
              placeholder="Estado"
              value={data.hospitalEstado || ''}
              onChange={(e) => handle('hospitalEstado', e.target.value)}
            />
          </div>
        </div>

        {/* Fechas + tipo de estancia */}
        <div className="grid-3">
          <div className="field">
            <label>Fecha de ingreso</label>
            <input
              type="date"
              value={data.fechaIngreso || ''}
              onChange={(e) => handle('fechaIngreso', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Fecha de egreso</label>
            <input
              type="date"
              value={data.fechaEgreso || ''}
              onChange={(e) => handle('fechaEgreso', e.target.value)}
            />
          </div>
          <fieldset className="field">
            <legend>Tipo de estancia</legend>
            <div className="radio-group">
              {['Hospitalización', 'Urgencia', 'Corta estancia / ambulatoria'].map((op) => (
                <label key={op} className="radio-opt s3">
                  <input
                    type="radio"
                    name="tipoEstancia"
                    value={op}
                    checked={data.tipoEstancia === op}
                    onChange={() => handle('tipoEstancia', op)}
                  />
                  {op}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Médico tratante */}
        <div className="divider" />
        <p className="subsec-label">Datos del médico tratante</p>

        <div className="grid-2">
          <div className="field">
            <label>Nombre del médico</label>
            <input
              type="text"
              placeholder="Nombre completo"
              value={data.medicoNombre || ''}
              onChange={(e) => handle('medicoNombre', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Especialidad</label>
            <input
              type="text"
              placeholder="Especialidad médica"
              value={data.medicoEspecialidad || ''}
              onChange={(e) => handle('medicoEspecialidad', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Cédula(s) profesional(es)</label>
            <input
              type="text"
              placeholder="Número(s) de cédula"
              value={data.medicoCedulas || ''}
              onChange={(e) => handle('medicoCedulas', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Teléfono(s)</label>
            <input
              type="text"
              placeholder="Teléfono de contacto"
              value={data.medicoTelefonos || ''}
              onChange={(e) => handle('medicoTelefonos', e.target.value)}
            />
          </div>
          <div className="field span-2">
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={data.medicoEmail || ''}
              onChange={(e) => handle('medicoEmail', e.target.value)}
            />
          </div>
        </div>

        <fieldset className="field">
          <legend>¿Médico de red?</legend>
          <div className="radio-group">
            {['Sí', 'No'].map((op) => (
              <label key={op} className="radio-opt s3">
                <input
                  type="radio"
                  name="medicoRed"
                  value={op}
                  checked={data.medicoRed === op}
                  onChange={() => handle('medicoRed', op)}
                />
                {op}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Honorarios */}
        <div className="divider" />
        <p className="subsec-label">Honorarios médicos ($)</p>

        <div className="grid-2">
          {HONORARIOS_FIELDS.map(({ key, label }) => (
            <div key={key} className="field">
              <label>{label}</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={data[key] || ''}
                onChange={(e) => handle(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Lugar, fecha y firma */}
        <div className="divider" />
        <div className="grid-3">
          <div className="field">
            <label>Lugar</label>
            <input
              type="text"
              placeholder="Ciudad, Estado"
              value={data.lugar || ''}
              onChange={(e) => handle('lugar', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Fecha</label>
            <input
              type="date"
              value={data.fechaFirma || ''}
              onChange={(e) => handle('fechaFirma', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Firma (nombre)</label>
            <input
              type="text"
              placeholder="Nombre del firmante"
              value={data.firma || ''}
              onChange={(e) => handle('firma', e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
