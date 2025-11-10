# Bikube — Frontend (Human Resource Information System)

This document describes the Bikube frontend: architecture, technologies, key modules, coding conventions and how to run and extend the project. Use the links to open referenced source files and symbols in the workspace.

---

## Table of Contents

- Project overview
- Tech stack
- Architecture & routing
- Styling
- API layer and services
- Authentication & access control
- Data fetching & caching
- Forms, validation and registration flow
- UI components and patterns
- Charts & visualizations
- Utilities, masks and helpers
- Running, building and scripts
- Contributing & testing
- Important file index (quick links)

---

## Project overview

Bikube is a HR-oriented web application built with Next.js and TypeScript. It uses the Next App Router pattern and leverages modular services, hooks and component libraries to implement features such as recruitment, time/point management, announcements and candidate registration.

Key entry points:

- App root / layout: see [src/app/layout.tsx](src/app/layout.tsx).

Core configuration:

- Next config (SVG + styled-components): [next.config.js](next.config.js)
- Package and scripts: [package.json](package.json)

---

## Tech stack

- Framework: Next.js (App Router) + TypeScript
- UI: React + styled-components
  - Styled components support configured in [next.config.js](next.config.js)
- Data fetching & cache: @tanstack/react-query
- Forms: react-hook-form + yup (validation)
- HTTP: axios (centralized instance)
  - API instance: see [src/services/api.ts](src/services/api.ts) and symbol [`api`](src/services/api.ts)
- Charts: chart.js + react-chartjs-2
- Utilities: date-fns, react-icons, react-toastify
- Build: yarn (scripts in [package.json](package.json))

---

## Architecture & routing

- The app uses Next.js "app" folder routing with nested layouts. Main application layout is at [src/app/layout.tsx](src/app/layout.tsx).
- Features are grouped under `src/app/(funcionario)` and `src/app/(candidato)` to separate employee/administrator and candidate flows. Example feature layouts:
  - Recruitment pages layout: [src/app/(funcionario)/recrutamento/layout.tsx](<src/app/(funcionario)/recrutamento/layout.tsx>)
  - Vacancy-specific layout: [src/app/(funcionario)/recrutamento/[vacancyId]/layout.tsx](<src/app/(funcionario)/recrutamento/[vacancyId]/layout.tsx>)
- Reusable UI building blocks live in `src/components/*`:
  - Tabs: [`Tabs`](src/components/Tabs/Tabs.tsx)
  - Icons map: [`Icon`](src/components/Icons/Icons.tsx)

Navigation and tab behavior:

- Tabs component computes selected state by matching pathname (see [`Tabs`](src/components/Tabs/Tabs.tsx)).

---

## Styling

- All styles are implemented with styled-components. The Next compiler flag ensures SSR-friendly styles: [next.config.js](next.config.js).
- Components expose style files (examples):
  - Default button styles: [src/components/Buttons/DefaultButton/styles.ts](src/components/Buttons/DefaultButton/styles.ts)
  - Loading screen styles: [src/components/LoadingScreen/styles.ts](src/components/LoadingScreen/styles.ts)
  - Modal styles are encapsulated per modal (e.g., [`SuccessModal/styles.ts`](src/components/modals/SuccessModal/styles.ts))

Design patterns:

- Each component typically exports a React component and a sibling `styles.ts` exporting styled elements.
- Theme tokens are used, e.g., color tokens referenced via `theme.colors.*`.

---

## API layer and services

Central axios instance:

- The axios instance and configuration are centralized in [`src/services/api.ts`](src/services/api.ts). Import the exported [`api`](src/services/api.ts) in service modules.

Services are organized per domain:

- Vacancy service: [src/services/vacancy/vacancyService.ts](src/services/vacancy/vacancyService.ts)
  - Example functions: [`getApplicantThatMatchWithSkills`](src/services/vacancy/vacancyService.ts), [`getTopApplicantsForVacancy`](src/services/vacancy/vacancyService.ts), [`getVacancyApplicants`](src/services/vacancy/vacancyService.ts)
- Candidate service: [src/services/candidate/candidateService.ts](src/services/candidate/candidateService.ts)
- Mirror (time/point) service: [src/services/mirror/mirrorService.ts](src/services/mirror/mirrorService.ts)
- Announcements: [src/services/announcementsService.ts](src/services/announcementsService.ts)
- Payslip generator: [src/services/paySlip/paySlipService.ts](src/services/paySlip/paySlipService.ts)
- Skills list: [src/services/skilss/skilssService.ts](src/services/skilss/skilssService.ts)

Error handling pattern:

- Services return a `Result<T>` (object with `data` or `error`) and delegate errors to a common handler via [`handleError`](src/utils/handleError.ts) or emulate it directly (see multiple services).

Binary responses:

- PDF generation example: [`generatePaySlipPdf`](src/services/paySlip/paySlipService.ts) uses `responseType: 'blob'` and returns an object URL for browser download.

Contract and types:

- Response payload shapes are expressed as TypeScript interfaces under `src/interfaces/*`, for example:
  - Vacancy applicants shape: [src/interfaces/vacancy/vacancyApplicantsByStepResponse.ts](src/interfaces/vacancy/vacancyApplicantsByStepResponse.ts)
  - Candidate details: [src/interfaces/candidate/cadidateDetailsResponse.ts](src/interfaces/candidate/cadidateDetailsResponse.ts)

---

## Authentication & access control

- Authentication state is handled by the `useAuth` hook context: [src/hooks/useAuth.tsx](src/hooks/useAuth.tsx).
  - `useAuth` exposes `user` with properties such as `id`, `role` and helper methods like `logout`.
- Role-based routing and navigation restrictions are applied at UI-level (example: `Navbar` tabs define allowed roles in [src/components/Navbar/index.tsx](src/components/Navbar/index.tsx)).
- The README and internal docs note that tokens and credentials are stored in local/session storage and used by the API instance.

---

## Data fetching & caching

- The app uses @tanstack/react-query to manage data fetching, caching and stale times across pages.
  - Usage examples:
    - Employee details: [src/app/(funcionario)/home/page.tsx](<src/app/(funcionario)/home/page.tsx>)
    - Announcements list: [src/app/(funcionario)/comunicados/page.tsx](<src/app/(funcionario)/comunicados/page.tsx>)
    - Candidate lists for vacancy: [`getVacancyApplicants`](src/services/vacancy/vacancyService.ts) consumed by vacancy pages and candidate details routes.
- Pagination and UI helpers:
  - Pagination component: [src/components/Pagination/Pagination.tsx](src/components/Pagination/Pagination.tsx)
  - Hook: `usePaginationRange` is used in historical point pages (see [src/app/(funcionario)/gestao-do-ponto/historico/page.tsx](<src/app/(funcionario)/gestao-do-ponto/historico/page.tsx>)).

Caching strategy:

- React Query `staleTime` is used to tune freshness (examples in query configs in pages).
- `keepPreviousData` is sometimes used for placeholder UX (see usages in `useQuery` calls).

---

## Forms, validation and registration flow

Core libs:

- react-hook-form + yup resolver (`@hookform/resolvers/yup`) implement forms with schema validation.

Examples:

- Announcement creation: schema at [src/validation/AnnouncementSchema.ts](src/validation/AnnouncementSchema.ts) used in the page [src/app/(funcionario)/comunicados/novo/page.tsx](<src/app/(funcionario)/comunicados/novo/page.tsx>).
- Point registration validation: [src/validation/PointRegistration.ts](src/validation/PointRegistration.ts)
- Absence justification modal uses [src/validation/AbsenceJustificationSchema.ts](src/validation/AbsenceJustificationSchema.ts).

Candidate registration multi-step flow:

- The candidate registration flow is split across steps and uses a `useStepsRegistration` hook to persist step state (see components under `src/components/Forms/candidateRegister/*`):
  - Academic background: [src/components/Forms/candidateRegister/AcademicBackground/AcademicBackgroundForm.tsx](src/components/Forms/candidateRegister/AcademicBackground/AcademicBackgroundForm.tsx) and its hook [src/components/Forms/candidateRegister/AcademicBackground/useAcademicBackgroundForm.tsx](src/components/Forms/candidateRegister/AcademicBackground/useAcademicBackgroundForm.tsx)
  - Skills step: [src/components/Forms/candidateRegister/Skills/useSkillsForm.tsx](src/components/Forms/candidateRegister/Skills/useSkillsForm.tsx) which uses [`getSkills`](src/services/skilss/skilssService.ts)
  - Access credentials step: [src/components/Forms/candidateRegister/Credetials/AccessCredentialsForm.tsx](src/components/Forms/candidateRegister/Credetials/AccessCredentialsForm.tsx)

Client-side masks & helpers:

- Date masks such as `ddmmyyyyMask` are used across forms: [src/utils/masks/ddmmyyyyMask.ts] (referenced in form hooks).

---

## UI components and patterns

Componentization:

- Small building-block components (Inputs, Selects, Buttons, Modals) are reused across screens.
  - Input auxiliary messages: [src/components/Inputs/InputAuxText/styles.ts](src/components/Inputs/InputAuxText/styles.ts)
  - DefaultButton: [src/components/Buttons/DefaultButton/styles.ts](src/components/Buttons/DefaultButton/styles.ts)
  - Icons map: [src/components/Icons/Icons.tsx](src/components/Icons/Icons.tsx)

Modal & overlay pattern:

- Most modals follow a ModalBackground wrapper and a Modal content with fixed sizes (see modal styles under `src/components/modals/*`).

Accessibility:

- Basic accessibility is applied (button roles, semantic elements). Consider adding more aria attributes for improved screen-reader support.

---

## Charts & visualizations

- Charts use Chart.js via `react-chartjs-2`. Examples:
  - Vacancy matches (doughnut with center annotation): [src/components/Charts/VacancyMatchesChart/VacancyMatchesChart.tsx](src/components/Charts/VacancyMatchesChart/VacancyMatchesChart.tsx)
  - Candidate match annotation: [src/components/Charts/CandidateVacacnyMatch/CandidateVacacnyMatch.tsx](src/components/Charts/CandidateVacacnyMatch/CandidateVacacnyMatch.tsx)
  - Giving-up (desistentes) chart: [src/components/Charts/GivingUpChart/GivingUpChart.tsx](src/components/Charts/GivingUpChart/GivingUpChart.tsx)

Canvas drawing:

- Custom plugins add center text and annotations; read the plugin examples in the chart components.

---

## Utilities, masks and helpers

- Date formatting: `date-fns` used extensively (see pages that call `format`, `parseISO`).
- Masks: phone, cep and date masks used in forms (e.g., `ddmmyyyyMask`).
- Toast notifications: `notifyError` and other handlers are implemented in `src/utils/handleToast.ts` and used across services/pages.

Language and localization:

- Labels and options for months, languages, states are provided in utility files:
  - months arrays in date pickers and CSV pages.
  - languages list: [src/utils/languages.ts](src/utils/languages.ts)

---

## Running, building and scripts

Install and run locally:

- Install dependencies:
  - yarn install
- Development server:
  - yarn dev
- Build:
  - yarn build
- Production start:
  - yarn start

The scripts and dependencies are declared in [package.json](package.json).

---

## Testing and linting

- The repository includes ESLint configuration ([.eslintrc.json](.eslintrc.json)) and Prettier ([.prettierrc](.prettierrc)).
- Use `yarn lint` for lint checks and `yarn build` to verify TypeScript compilation.

---

## Contributing & extending

- Follow the existing folder conventions: domain services under `src/services/*`, UI under `src/components/*`, pages under `src/app/*`.
- Add typed interfaces to `src/interfaces/*` next to the domain they describe.
- Keep axios calls in service modules and return `Result<T>` shapes (see multiple service examples).
- Prefer react-query for new GET endpoints and use invalidation/refetch patterns for mutation flows.

---

## Important file index (quick links)

Files and important symbols referenced in this doc (open them directly):

- Configuration

  - [next.config.js](next.config.js)
  - [package.json](package.json)

- App entry & layout

  - [src/app/layout.tsx](src/app/layout.tsx)

- API & services

  - [src/services/api.ts](src/services/api.ts) — exported [`api`](src/services/api.ts)
  - [src/services/vacancy/vacancyService.ts](src/services/vacancy/vacancyService.ts) — examples: [`getApplicantThatMatchWithSkills`](src/services/vacancy/vacancyService.ts), [`getVacancyApplicants`](src/services/vacancy/vacancyService.ts)
  - [src/services/candidate/candidateService.ts](src/services/candidate/candidateService.ts)
  - [src/services/mirror/mirrorService.ts](src/services/mirror/mirrorService.ts)
  - [src/services/announcementsService.ts](src/services/announcementsService.ts)
  - [src/services/paySlip/paySlipService.ts](src/services/paySlip/paySlipService.ts)
  - [src/services/skilss/skilssService.ts](src/services/skilss/skilssService.ts)

- Hooks & auth

  - [src/hooks/useAuth.tsx](src/hooks/useAuth.tsx)

- Components & UI

  - [src/components/Tabs/Tabs.tsx](src/components/Tabs/Tabs.tsx)
  - [src/components/Icons/Icons.tsx](src/components/Icons/Icons.tsx)
  - [src/components/Buttons/DefaultButton/styles.ts](src/components/Buttons/DefaultButton/styles.ts)
  - [src/components/Inputs/InputAuxText/styles.ts](src/components/Inputs/InputAuxText/styles.ts)
  - [src/components/LoadingScreen/styles.ts](src/components/LoadingScreen/styles.ts)
  - [src/components/Pagination/Pagination.tsx](src/components/Pagination/Pagination.tsx)

- Forms & validation

  - [src/components/Forms/candidateRegister/AcademicBackground/AcademicBackgroundForm.tsx](src/components/Forms/candidateRegister/AcademicBackground/AcademicBackgroundForm.tsx)
  - [src/components/Forms/candidateRegister/AcademicBackground/useAcademicBackgroundForm.tsx](src/components/Forms/candidateRegister/AcademicBackground/useAcademicBackgroundForm.tsx)
  - [src/components/Forms/candidateRegister/Skills/useSkillsForm.tsx](src/components/Forms/candidateRegister/Skills/useSkillsForm.tsx)
  - [src/validation/AnnouncementSchema.ts](src/validation/AnnouncementSchema.ts)
  - [src/validation/AbsenceJustificationSchema.ts](src/validation/AbsenceJustificationSchema.ts)
  - [src/validation/PointRegistration.ts](src/validation/PointRegistration.ts)

- Interfaces
  - [src/interfaces/vacancy/vacancyApplicantsByStepResponse.ts](src/interfaces/vacancy/vacancyApplicantsByStepResponse.ts)
  - [src/interfaces/candidate/cadidateDetailsResponse.ts](src/interfaces/candidate/cadidateDetailsResponse.ts)

---

If you want, I can:

- generate CONTRIBUTING.md and CODE_OF_CONDUCT templates,
- produce a short developer onboarding checklist with commands and VSCode settings,
- or create a diagram-style file that maps service dependencies and routes.

## Backend repository: [bikube-backend](https://github.com/VictorYuzoBR/api-rh)

Colaborators:

- [Victor Yuzo](https://github.com/VictorYuzoBR)
- [Adrian Felipe](https://github.com/Adrian128018)
