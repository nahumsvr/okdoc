# Prompt para Stitch MCP: Pantalla de Grabación y Análisis Principal

**Design System:** Moscati Clinical Precision (Light Mode Only, Navy Blue #002D58, Ocre #C6A152, Surface Colors, Manrope & Inter Typography, No Dark Mode).

**Screen Title:** Consultation Recording & Real-time Analysis Room

**Context:** Esta es la "Joya de la Corona" de la aplicación. Es la interfaz médica donde el doctor asiste a consultas. La vista se divide asimétricamente para separar las herramientas de Input (Audio/Voice) y las herramientas de Recopilación Dinámica de Inteligencia Artificial.

## UI Layout Specifications

1. **Estructura Global:**
   - La pantalla debe mantener el Sidebar a la izquierda (Layout global de la aplicación).
   - El contenedor principal consta de dos columnas balanceadas.
   - Todo el fondo del documento es claro (Surface background claro o bg-background de alta legibilidad, estrictamente SIN MODO OSCURO).
   - Eliminar por completo barras inferiores de navegación atestadas. 

2. **Columna Central / Izquierda (El Foco Primario - Grabación):**
   - **Contenedor Glassmorphism/Surface bajo:** Un área espaciosa dedicada a la interacción.
   - **Elemento Central (Action Button):** Un botón circular masivo en el centro, de color Navy Moscati (`#002D58`) o un degradado sutil con Ocre, que contiene un ícono de micrófono (`mic`).
   - **Animación Vital:** Alrededor del botón principal deben diseñarse ondas estáticas (frecuencia/soundwaves) renderizadas con Tailwind y SVG simulando una animación de grabación en vivo, para denotar "escucha activa" como un radar sonoro de alta tecnología clínica.
   - **Estado:** Pequeños indicadores (Tags o badges pildora) diciendo "IA Listening" o "Recording: 14:02 mins".

3. **Columna Derecha (Recopilación Inteligente - Real-time Data):**
   - Panel lateral dedicado a **Extracción Dinámica en Tiempo Real**.
   - **Contexto del Paciente Flotante:** A manera de tarjetas limpias tipo *no-lines* (usando el contraste de `bg-surface-container-lowest`), agrupa la información vital recién detectada o cargada:
     - Nombre Completo.
     - Edad.
     - Tipo de Sangre.
     - Peso.
   - **Formularios Dinámicos de Operación (Pre / Post):** Una sección separada para Formularios. Un panel estilo "To-Do" limpio donde se vayan llenando automáticamente campos detectados en la consulta (Alergias Conocidas, Síntomas Primarios de Diagnóstico).
   - Usa los estados clínicos aprendidos: Sugerencias IA en color ámbar suave (`border-secondary`), y campos médicos confirmados en verde profundo (`#008542`).

4. **Vibe y Estética:**
   - Precision Editorial. Limpio, minimalista, ausente de ruido. Espacio blanco (White space) generoso para que el doctor no se sature.
   - Typografías modernas (Headline fonts) gruesas para crear anclajes visuales.

Please generate a highly realistic Next.js HTML/Tailwind mockup of this dual-column audio consultation interface without using dark mode elements.
