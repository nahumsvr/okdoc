'use client';

export default function TramiteFichaIdentificacion({ data, onChange }) {
  const handle = (field, value) => onChange({ ...data, [field]: value });

  return (
    <section className="form-section">
      <div className="section-header">
        <span className="section-number s1">1</span>
        <h2>Trámite y ficha de identificación</h2>
      </div>

      <div className="section-body">
        {/* Tipo de trámite */}
        <fieldset className="field">
          <legend>Tipo de trámite</legend>
          <div className="radio-group">
            {['Programación de cirugía', 'Tratamiento médico', 'Auxiliar diagnóstico', 'Reembolso'].map((op) => (
              <label key={op} className="radio-opt">
                <input
                  type="radio"
                  name="tramite"
                  value={op}
                  checked={data.tramite === op}
                  onChange={() => handle('tramite', op)}
                />
                {op}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Fecha solicitud + ID */}
        <div className="grid-2">
          <div className="field">
            <label>Fecha de solicitud</label>
            <input
              type="date"
              value={data.fechaSolicitud || ''}
              onChange={(e) => handle('fechaSolicitud', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Número de identificación</label>
            <input
              type="text"
              placeholder="Ej. 000123456"
              value={data.numeroIdentificacion || ''}
              onChange={(e) => handle('numeroIdentificacion', e.target.value)}
            />
          </div>
        </div>

        {/* Empresa */}
        <div className="field">
          <label>Nombre de la empresa o contratante</label>
          <input
            type="text"
            placeholder="Razón social o nombre del contratante"
            value={data.empresa || ''}
            onChange={(e) => handle('empresa', e.target.value)}
          />
        </div>

        {/* Nombres */}
        <div className="grid-2">
          <div className="field">
            <label>Nombre del titular</label>
            <input
              type="text"
              placeholder="Apellido paterno, materno y nombre(s)"
              value={data.nombreTitular || ''}
              onChange={(e) => handle('nombreTitular', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Nombre del afectado o afiliado</label>
            <input
              type="text"
              placeholder="Apellido paterno, materno y nombre(s)"
              value={data.nombreAfectado || ''}
              onChange={(e) => handle('nombreAfectado', e.target.value)}
            />
          </div>
        </div>

        {/* Nacimiento, Edad, Sexo */}
        <div className="grid-3">
          <div className="field">
            <label>Fecha de nacimiento</label>
            <input
              type="date"
              value={data.fechaNacimiento || ''}
              onChange={(e) => handle('fechaNacimiento', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Edad</label>
            <input
              type="number"
              min="0"
              max="120"
              placeholder="años"
              value={data.edad || ''}
              onChange={(e) => handle('edad', e.target.value)}
            />
          </div>
          <fieldset className="field">
            <legend>Sexo</legend>
            <div className="radio-group">
              {['F', 'M'].map((op) => (
                <label key={op} className="radio-opt">
                  <input
                    type="radio"
                    name="sexo"
                    value={op}
                    checked={data.sexo === op}
                    onChange={() => handle('sexo', op)}
                  />
                  {op}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Estado civil */}
        <div className="grid-2">
          <div className="field">
            <label>Estado civil</label>
            <input
              type="text"
              placeholder="Ej. Soltero/a, Casado/a..."
              value={data.estadoCivil || ''}
              onChange={(e) => handle('estadoCivil', e.target.value)}
            />
          </div>
        </div>

        {/* Teléfonos */}
        <div className="divider" />
        <p className="subsec-label">Teléfonos</p>
        <div className="grid-3">
          {[
            { key: 'telParticular', label: 'Particular' },
            { key: 'telOficina', label: 'Oficina' },
            { key: 'telOtro', label: 'Otro' },
          ].map(({ key, label }) => (
            <div key={key} className="field">
              <label>{label}</label>
              <input
                type="text"
                placeholder="10 dígitos"
                value={data[key] || ''}
                onChange={(e) => handle(key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
