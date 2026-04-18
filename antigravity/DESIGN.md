# Design System Strategy: The Clinical Curator

## 1. Overview & Creative North Star
The "Clinical Curator" is the guiding philosophy for this design system. In the high-stakes environment of medical AI validation, the interface must do more than display data—it must facilitate a dialogue between machine intelligence and human expertise. 

We move away from the "Dashboard Template" aesthetic. Instead, we embrace a **High-End Editorial** approach. This means utilizing intentional white space, dramatic typographic scale, and a "layered paper" philosophy. By breaking the standard grid with asymmetrical layouts and overlapping "glass" surfaces, we create a tool that feels less like a database and more like a sophisticated workspace for a medical specialist.

## 2. Colors & Surface Philosophy

### The Tonal Palette
Our palette is anchored by **Azul Navy Moscati (#002D58)** for authority and **Dorado Ocre (#C6A152)** for precision accents. 

*   **Primary (`#002D58`):** Use for deep immersion containers and critical action states.
*   **Secondary (`#C6A152`):** Reserved for "Moments of Truth"—validating an AI suggestion or highlighting a clinical insight.
*   **Status Tones:** 
    *   **Error (`#ba1a1a`):** For missing data or clinical alerts.
    *   **AI Suggestion (`#fed580`):** An amber warmth that signifies "Draft" or "Pending Review."
    *   **Success (`#008542`):** For validated states.

### The "No-Line" Rule
Standard 1px borders are prohibited for sectioning. They create visual noise and "grid-lock." Instead, define boundaries through **Background Color Shifts**. 
*   Place a `surface-container-lowest` (#ffffff) card on top of a `surface-container-low` (#f3f3f3) background. 
*   The contrast between these subtle grey shifts provides all the structure a professional eye needs without the clutter of lines.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of medical documents.
*   **Base Layer:** `surface` (#f9f9f9).
*   **Content Areas:** `surface-container` (#eeeeee).
*   **Actionable Cards:** `surface-container-lowest` (#ffffff).
*   **The Glass Rule:** For AI-driven overlays or floating sidebars, use `surface-container-lowest` at 80% opacity with a `20px` backdrop-blur. This keeps the user grounded in the clinical context while focusing on the validation task.

## 3. Typography: The Editorial Edge

We pair **Manrope** (Display/Headlines) with **Inter** (Body/UI) to balance character with clinical efficiency.

*   **Display (Manrope):** Use `display-md` or `headline-lg` for report titles. The wide apertures of Manrope convey a modern, "Tech-Forward" medical feel.
*   **Body (Inter):** Use `body-md` for patient data and AI findings. Inter’s high x-height ensures readability even in dense medical logs.
*   **The Hierarchy of Truth:** Labels (`label-md`) should be in `on-surface-variant` (#43474f) to recede, while the actual clinical data should be in `on-surface` (#1a1c1c) and bolded. This directs the clinician’s eye to the data, not the form.

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through tonal layering rather than shadows. 
1.  **Level 0 (Background):** `surface`
2.  **Level 1 (Sectioning):** `surface-container-low`
3.  **Level 2 (Interaction):** `surface-container-lowest`

### Ambient Shadows
If an element must "float" (e.g., a critical alert or a context menu), use an **Ambient Shadow**:
*   `box-shadow: 0 12px 32px -4px rgba(0, 45, 88, 0.08);`
*   Note the blue tint in the shadow (using our Primary color) to ensure the shadow feels like a natural part of the brand environment rather than a generic grey smudge.

### The "Ghost Border"
When accessibility requires a boundary, use a "Ghost Border": the `outline-variant` (#c3c6d0) at 15% opacity. It should be felt, not seen.

## 5. Components

### The Validation Card (Signature Component)
This is the heart of the system. Each AI-generated finding is housed here.
*   **Visual Style:** `surface-container-lowest` background, no border.
*   **Status Indicator:** Use the requested `border-l-4` on the left edge.
    *   Missing: `error`
    *   AI Suggested: `secondary`
    *   Validated: `green`
*   **Interaction:** On hover, the card should lift slightly with a subtle `surface-container-high` (#e8e8e8) background shift.

### Buttons
*   **Primary (Validation):** `primary-container` (#002d58) with `on-primary` (#ffffff) text. Use a subtle gradient from the top-left to bottom-right to give it a "pressed" clinical feel.
*   **Secondary (Edit):** `secondary-container` (#fed580) with `on-secondary-container`. 
*   **Tertiary (Discard):** Ghost style, no background, `on-surface-variant` text.

### Input Fields
Avoid the "boxed" look. Use a subtle `surface-container-high` background with a `2px` bottom-only border in `outline`. This mimics the look of a traditional paper medical form.

### Lists & Reports
**Forbid the use of divider lines.** Separate report sections using 32px or 48px of vertical whitespace. If separation is critical, use a full-width background band of `surface-container-low` to categorize the data.

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical layouts. Place the AI report on a wide left column and the validation controls on a narrower, floating right column.
*   **Do** use `Dorado Ocre` for checkboxes and radio buttons to signify the "Human Selection."
*   **Do** prioritize "Breathing Room." Medical data is dense; the UI shouldn't be.

### Don't
*   **Don't** use 100% black text. Always use `on-surface` (#1a1c1c) for a softer, more professional contrast.
*   **Don't** use standard "drop shadows" with 20%+ opacity. 
*   **Don't** use borders to separate the header from the content. Use a `surface-container-lowest` header sitting on a `surface` body to create the split.