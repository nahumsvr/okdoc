import React from "react"

interface PatientInfoProps {
  name: string
  date: string
}

export function PatientInfo({ name, date }: PatientInfoProps) {
  return (
    <div className="flex gap-8">
      <div>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">Paciente</p>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
      </div>
      <div>
        <p className="text-[10px] font-semibold tracking-widest uppercase text-gray-400">Fecha</p>
        <p className="text-sm font-semibold text-gray-900">{date}</p>
      </div>
    </div>
  )
}
