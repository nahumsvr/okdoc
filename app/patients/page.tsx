"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Sidebar from "../components/moscati/Sidebar";
import { BellButton } from "../components/buttons/BellButton";

const MOCK_PATIENTS = [
  { id: "P-1001", name: "Juan Pérez", dob: "15 Mar 1980", lastVisit: "24 Oct 2023", status: "Pending Validation" },
  { id: "P-1002", name: "María González", dob: "22 Jun 1975", lastVisit: "20 Oct 2023", status: "Validated" },
  { id: "P-1003", name: "Carlos López", dob: "05 Nov 1990", lastVisit: "18 Oct 2023", status: "Pending Validation" },
  { id: "P-1004", name: "Ana Martínez", dob: "12 Apr 1988", lastVisit: "10 Oct 2023", status: "Validated" },
  { id: "P-1005", name: "Luis Fernandez", dob: "30 Aug 1995", lastVisit: "05 Oct 2023", status: "Pending Validation" },
];

export default function PatientsListPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = useMemo(() => {
    return MOCK_PATIENTS.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9F9F9]">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Custom Topbar for Patients Page */}
        <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "Manrope, sans-serif" }}>
              Medical Records
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Buscar registros..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-[#002D58] outline-none w-64 transition-all"
              />
            </div>

            <button className="bg-[#002D58] hover:bg-[#003a70] text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              Registrar Nuevo
            </button>

            <div className="w-px h-5 bg-gray-200 mx-1" />

            <BellButton />

            <div className="w-8 h-8 rounded-full bg-[#002D58] flex items-center justify-center text-white text-xs font-bold">
              JA
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "Manrope, sans-serif" }}>
              Patient List
            </h2>
            <span className="text-sm text-gray-500 font-medium">
              Showing {filteredPatients.length} records
            </span>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date of Birth</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Visit</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map(patient => (
                      <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{patient.id}</td>
                        <td className="px-6 py-4 text-sm font-bold text-[#002D58]">{patient.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{patient.dob}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{patient.lastVisit}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            patient.status === 'Validated' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-3">
                            <button className="text-gray-400 hover:text-gray-900 transition-colors" title="Ver Historial">
                              <svg className="w-5 h-5 border-b border-transparent hover:border-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 8v4l3 3" />
                                <circle cx="12" cy="12" r="10" />
                              </svg>
                            </button>
                            {patient.status === 'Pending Validation' ? (
                              <Link href="/validation" className="text-[#002D58] hover:text-[#003a70] font-semibold underline-offset-2 hover:underline">
                                Validar
                              </Link>
                            ) : (
                              <Link href={`#`} className="text-gray-400 hover:text-[#002D58] font-semibold underline-offset-2 hover:underline">
                                Detalles
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                        No se encontraron registros para la búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
