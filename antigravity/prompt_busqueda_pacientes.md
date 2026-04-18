# Prompt para la Creación del Diseño: Página de Búsqueda de Pacientes

**Objetivo:** Crear el frontend interactivo y el diseño (UI/UX) para la nueva página de búsqueda de pacientes en la aplicación. La búsqueda se realizará ingresando "Nombre" y "Apellido", e incluirá un botón primario para ejecutar la acción de búsqueda.

## 1. Componentes Existentes (Reutilizar)
Para mantener la coherencia visual y de arquitectura del proyecto, debes basarte en la estructura actual e integrar los siguientes componentes de la carpeta `app/components`:

* **Layout Base:** Utilizar el `Topbar` y `Sidebar` (de `components/moscati`) para estructurar la página en el layout principal. Si es en móvil, considerar el uso de `FooterNav` o `NavItem`.
* **Visualización de Resultados:** Para desplegar los pacientes encontrados, reutiliza los componentes `PatientInfo` y `Avatar` (`components/ui`). Estos deben poblarse con los datos correspondientes según la respuesta de la búsqueda.
* **Badges y Estados:** Puedes incluir `ConfirmedBadge` o `ConfidenceBadge` dentro de los resultados para indicar el estatus de validación del paciente.
* **Filtros Adicionales (Opcional):** Emplear el `FilterToggle` por si en el futuro se desea buscar usando filtros avanzados adicionales al nombre y apellido.

## 2. Componentes No Existentes (A Crear)
Debes idear, diseñar e implementar los siguientes componentes nuevos para lograr la funcionalidad requerida de manera elegante:

* **`SearchInput` / `TextField`:** Un componente re-utilizable para entradas de texto. Debe instanciarse dos veces (uno para "Nombre" y otro para "Apellido") o estar agrupado en una sola barra avanzada. Debe manejar estados de *hover, focus y placeholder*.
* **`SearchButton`:** Un botón destacado que triggere la búsqueda. A diferencia de `ConfirmButton` o `PlayButton`, este debe estar diseñado específicamente para la metáfora de búsqueda (idealmente con un icono de lupa y texto "Buscar"). Debe soportar un estado de *loading* (cargando).
* **`EmptyState`:** Un componente visual amigable que informe al usuario cuando "No se encontraron resultados" para la búsqueda o dar instrucciones iniciales para invitarlo a buscar.
* **`PatientListContainer`:** Un contenedor estructurado (en forma de grilla o lista vertical) donde irán mapeados y renderizados los distintos `PatientInfo`.

## 3. Requerimientos Estéticos y de Comportamiento (UX/UI)
* **Alineación Modular:** Los campos de "Nombre" y "Apellido" pueden ir lado a lado en desktop, y apilarse verticalmente en pantallas móviles para garantizar accesibilidad.
* **Feedback Inmediato:** El botón "Buscar" debe mostrar interactividad. 
* **Look and Feel Premium:** Asegurarse de mantener las sombras sutiles, esquinas redondeadas y la paleta de colores de la aplicación.
* **Carga de Datos:** Considera un estado "Skeleton" o de carga mientras la base de datos responde.

---
**Instrucción para el Agente / Desarrollador:**
Por favor, genera el código de la vista (por ejemplo en `app/patients/search/page.tsx`) donde armes el formulario de búsqueda ensamblando tanto los Componentes Existentes importados, como los Componentes Nuevos.
