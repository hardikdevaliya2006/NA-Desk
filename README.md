# NA DESK

React + Vite + Tailwind CSS v4 + Redux Toolkit + shadcn **Nova** theme (Base UI) starter.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **shadcn** `base-nova` style (Base UI primitives) + `tw-animate-css`
- **Redux Toolkit** + **react-redux**
- **React Router**
- **react-hot-toast**
- Optional **Supabase** client wired from `.env`

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build

## Structure

```
src/
  components/
    common/ dashboard/ forms/ sidebar/ theme/ ui/ ...
  constants/
  helper/
  hooks/
  layout/
  lib/
  pages/
  routes/
  services/
  store/features/<feature>/{actions,reducers,selectors}
  supabase/
```

Add shadcn components with:

```bash
npx shadcn@latest add <component>
```
