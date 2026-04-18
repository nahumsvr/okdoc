'use client';

export default function HistoriaClinicaDiagnostico({ data, onChange }) {
  const handle = (field, value) => onChange({ ...data, [field]: value });

  return (
    <section className="form-section">
      <div className="section-header">
        <span className="section-number s2">2</span>
        <h2>Historia clínica y diagnóstico</h2>
      </div>

      <div className="section-body">
        {/* Causa de atención */}
        <fieldset className="field">
          <legend>Causa de atención</legend>
          <div className="radio-group">
            {['Embarazo', 'Enfermedad', 'Accidente'].map((op) => (
              <label key={op} className="radio-opt s2">
                <input
                  type="radio"
                  name="causaAtencion"
                  value={op}
                  checked={data.causaAtencion === op}
                  onChange={() => handle('causaAtencion', op)}
                />
                {op}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Antecedentes */}
        <div className="field">
          <label>
            Antecedentes (personales patológicos, no patológicos, gineco-obstétricos, perinatales)
          </label>
          <textarea
            placeholder="Describa los antecedentes relevantes del paciente..."
            value={data.antecedentes || ''}
            onChange={(e) => handle('antecedentes', e.target.value)}
          />
        </div>

        {/* Padecimiento actual */}
        <div className="field">
          <label>Padecimiento actual (especificar tiempo de evolución)</label>
          <textarea
            placeholder="Descripción del padecimiento y tiempo de evolución..."
            value={data.padecimientoActual || ''}
            onChange={(e) => handle('padecimientoActual', e.target.value)}
          />
        </div>

        {/* Fecha inicio + Signos vitales */}
        <div className="grid-3">
          <div className="field">
            <label>Fecha de inicio de signos y síntomas</label>
            <input
              type="date"
              value={data.fechaInicioSintomas || ''}
              onChange={(e) => handle('fechaInicioSintomas', e.target.value)}
            />
          </div>
          <div className="field">
            <label>Peso (Kg)</label>
            <input
              type="number"
              min="0"
              placeholder="kg"
              value={data.peso || ''}
              onChange={(e) => handle('peso', e.target.value)}
            />
          </div>
          <div className="field">
            <label>TA (mmHg)</label>
            <input
              type="text"
              placeholder="120/80"
              value={data.ta || ''}
              onChange={(e) => handle('ta', e.target.value)}
            />
          </div>
        </div>

        <div className="grid-3">
          <div className="field">
            <label>Talla (cm)</label>
            <input
              type="number"
              min="0"
              placeholder="cm"
              value={data.talla || ''}
              onChange={(e) => handle('talla', e.target.value)}
            />
          </div>
        </div>

        <div className="divider" />
        <p className="subsec-label">Diagnóstico</p>

        {/* Diagnóstico CIE-10 */}
        <div className="field">
          <label>Diagnóstico(s) definitivo(s) y código CIE-10</label>
          <textarea
            placeholder="Ej. Diabetes mellitus tipo 2 — E11.9"
            value={data.diagnostico || ''}
            onChange={(e) => handle('diagnostico', e.target.value)}
          />
        </div>

        {/* Fecha diagnóstico + tipos */}
        <div className="grid-3">
          <div className="field">
            <label>Fecha de diagnóstico</label>
            <input
              type="date"
              value={data.fechaDiagnostico || ''}
              onChange={(e) => handle('fechaDiagnostico', e.target.value)}
            />
          </div>

          <fieldset className="field">
            <legend>Tipo: congénito o adquirido</legend>
            <div className="radio-group">
              {['Congénito', 'Adquirido'].map((op) => (
                <label key={op} className="radio-opt s2">
                  <input
                    type="radio"
                    name="tipoCongAdq"
                    value={op}
                    checked={data.tipoCongAdq === op}
                    onChange={() => handle('tipoCongAdq', op)}
                  />
                  {op}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="field">
            <legend>Tipo: agudo o crónico</legend>
            <div className="radio-group">
              {['Agudo', 'Crónico'].map((op) => (
                <label key={op} className="radio-opt s2">
                  <input
                    type="radio"
                    name="tipoAgudoCron"
                    value={op}
                    checked={data.tipoAgudoCron === op}
                    onChange={() => handle('tipoAgudoCron', op)}
                  />
                  {op}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Exploración física */}
        <div className="field">
          <label>Resultado de exploración física y estudios realizados</label>
          <textarea
            placeholder="Hallazgos de la exploración física y resultados de estudios..."
            value={data.exploracionFisica || ''}
            onChange={(e) => handle('exploracionFisica', e.target.value)}
          />
        </div>

        {/* Tratamiento */}
        <div className="field">
          <label>Tratamiento y código CPT</label>
          <textarea
            placeholder="Descripción del tratamiento indicado y código CPT..."
            value={data.tratamiento || ''}
            onChange={(e) => handle('tratamiento', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
