import Link from "next/link";

export type PatientStatus = "pending" | "validated";

export interface PatientResultProps {
  id: string;
  name: string;
  status: PatientStatus;
  lastUpdated: string;
}

export function PatientResultCard({ patient }: { patient: PatientResultProps }) {
  const isPending = patient.status === "pending";

  const statusLabel = isPending ? "Revisión Pendiente" : "Validado";
  const statusColorClass = isPending ? "text-secondary" : "text-[#008542]";
  const statusBgClass = isPending ? "bg-secondary-container" : "bg-[#008542]";
  const statusBgAlphaClass = isPending ? "bg-secondary-container/20" : "bg-[#008542]/10";
  const borderLeftClass = isPending ? "border-secondary-container" : "border-[#008542]";
  const iconName = isPending ? "pending_actions" : "check_circle";

  return (
    <Link href={`/patients/${patient.id}`} className="block">
      <div
        className={`bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_16px_-4px_rgba(0,45,88,0.06)] hover:shadow-[0_8px_24px_-4px_rgba(0,45,88,0.1)] transition-all duration-300 flex items-center justify-between border-l-4 ${borderLeftClass} group`}
      >
        <div className="flex items-center gap-5">
          <div
            className={`h-12 w-12 rounded-full ${statusBgAlphaClass} flex items-center justify-center ${statusColorClass} shrink-0`}
          >
            <span className="material-symbols-outlined filled">{iconName}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold font-headline text-on-surface group-hover:text-primary-container transition-colors">
              {patient.name}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm font-medium text-on-surface-variant font-mono bg-surface-container px-2 py-0.5 rounded">
                ID: {patient.id}
              </span>
              <span className="text-xs text-on-surface-variant flex items-center">
                <span className={`w-1.5 h-1.5 rounded-full ${statusBgClass} mr-1.5`}></span>
                {statusLabel}
              </span>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="text-right mr-4">
            <p className="text-sm font-medium text-on-surface">Última actualización</p>
            <p className="text-xs text-on-surface-variant">{patient.lastUpdated}</p>
          </div>
          <button className="text-primary-container hover:bg-surface-container p-2 rounded-full transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </Link>
  );
}
