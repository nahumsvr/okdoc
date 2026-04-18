"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/moscati/Sidebar";
import { SearchHeader } from "../../components/search/SearchHeader";
import { SearchInput } from "../../components/search/SearchInput";

export default function NewPatientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    fechaNacimiento: "",
    genero: "Femenino",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch("http://localhost:3001/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          fechaNacimiento: new Date(formData.fechaNacimiento).toISOString(),
          genero:
            formData.genero === "Masculino"
              ? "h"
              : formData.genero === "Femenino"
                ? "m"
                : "o",
          telefono: formData.telefono,
        }),
      });

      if (response.ok) {
        router.push("/patients/search");
      } else {
        const error = await response.json();
        alert(
          "Error al registrar paciente: " +
            (error.message || "Verifique los datos"),
        );
      }
    } catch (err) {
      console.error(err);
      alert("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface h-screen overflow-hidden flex flex-col antialiased">
      <SearchHeader />

      <div className="flex flex-1 overflow-hidden h-full relative">
        <Sidebar />

        <main className="flex-1 overflow-y-auto bg-surface p-8 xl:p-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <section>
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold font-headline text-on-surface">
                  Registrar Nuevo Paciente
                </h1>
                <button
                  type="button"
                  onClick={() => router.push("/patients/search")}
                  className="text-primary-container hover:underline px-4 py-2 text-sm font-medium"
                >
                  Regresar
                </button>
              </div>
              <p className="text-on-surface-variant font-body mb-8">
                Llene los campos para dar de alta al paciente en el sistema
                Moscati.
              </p>

              <form
                onSubmit={handleSubmit}
                className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SearchInput
                    label="Nombre"
                    id="nombre"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium text-on-surface-variant mb-2"
                      htmlFor="fechaNacimiento"
                    >
                      Fecha de Nacimiento
                    </label>
                    <input
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      type="date"
                      required
                      value={formData.fechaNacimiento}
                      onChange={handleChange}
                      className="w-full bg-surface-container-high border-0 border-b-2 border-outline text-on-surface focus:ring-0 focus:border-primary-container p-3 rounded-t transition-colors"
                    />
                  </div>
                  <SearchInput
                    label="Teléfono (Opcional)"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium text-on-surface-variant mb-2"
                      htmlFor="genero"
                    >
                      Género
                    </label>
                    <select
                      id="genero"
                      name="genero"
                      value={formData.genero}
                      onChange={handleChange}
                      className="w-full bg-surface-container-high border-0 border-b-2 border-outline text-on-surface focus:ring-0 focus:border-primary-container p-3 rounded-t transition-colors"
                    >
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <div className="w-full md:w-1/3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary-container text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#001834] transition-colors flex items-center justify-center shadow-[0_4px_12px_rgba(0,45,88,0.2)]"
                    >
                      {loading ? "Guardando..." : "Guardar Paciente"}
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
