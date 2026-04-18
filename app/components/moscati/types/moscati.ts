export type FieldStatus = "missing" | "suggested" | "validated"

export  interface ClinicalField {
  value: string | null
  status: FieldStatus
  confidence?: number // solo en suggested, ej: 0.94
}

export interface ReportSection {
  [key: string]: ClinicalField
}

export interface Report {
  atencionRequerida: {
    motivoConsulta: ClinicalField
    antecedentesFamiliares: ClinicalField
    alergiasConocidas: ClinicalField
  }
  revisionGeneral: {
    diagnosticoPresuntivo: ClinicalField
    tratamientoSugerido: ClinicalField
  }
  datosConfirmados: {
    signosVitales: ClinicalField
  }
}

export interface Patient {
  name: string
  date: string
}
