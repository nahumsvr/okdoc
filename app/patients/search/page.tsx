"use client";

import React, { useEffect } from "react";
import Sidebar from "../../components/moscati/Sidebar";
import { SearchHeader } from "../../components/search/SearchHeader";
import { SearchInput } from "../../components/search/SearchInput";
import { SearchButton } from "../../components/search/SearchButton";
import { PatientResultCard, PatientResultProps } from "../../components/search/PatientResultCard";

export default function PatientSearchPage() {
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const profile = await response.json();
          localStorage.setItem("user_profile", JSON.stringify(profile));
        }
      } catch (err) {
        console.error("Error al obtener el perfil", err);
      }
    };
    fetchProfile();
  }, []);

  const mockResults: PatientResultProps[] = [
    {
      id: "1029-MCP-24",
      name: "Maria González Ruiz",
      status: "pending",
      lastUpdated: "Hace 2 horas",
    },
    {
      id: "8492-MCP-23",
      name: "Juan Pérez Gómez",
      status: "validated",
      lastUpdated: "Ayer, 14:30",
    },
  ];

  return (
    <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col antialiased">
      <SearchHeader />
      
      <div className="flex flex-1 overflow-hidden h-full relative">
        {/* Usamos el Sidebar existente de la aplicación */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-surface p-8 xl:p-12">
          <div className="max-w-5xl mx-auto space-y-12">
            
            {/* Search Section */}
            <section>
              <h1 className="text-3xl font-bold font-headline text-on-surface mb-2">
                Búsqueda de Pacientes
              </h1>
              <p className="text-on-surface-variant font-body mb-8 max-w-2xl">
                Ingrese los criterios de búsqueda para localizar un registro clínico en el sistema Moscati Clinical Precision.
              </p>
              
              <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 flex flex-col md:flex-row gap-6 items-end">
                <div className="w-full md:w-5/12">
                  <SearchInput label="Nombre" id="nombre" placeholder="Ej. Maria" />
                </div>
                <div className="w-full md:w-5/12">
                  <SearchInput label="Apellido" id="apellido" placeholder="Ej. González" />
                </div>
                <div className="w-full md:w-2/12">
                  <SearchButton>Buscar</SearchButton>
                </div>
              </div>
            </section>

            {/* Results Section */}
            <section>
              <h2 className="text-2xl font-bold font-headline text-on-surface mb-6 border-b border-outline-variant/20 pb-2">
                Resultados de Búsqueda
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {mockResults.map((patient) => (
                  <PatientResultCard key={patient.id} patient={patient} />
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
