# Day-06: TypeScript and Employee Dashboard

A beginner-friendly TypeScript practice set and a responsive employee management dashboard built with React, TypeScript, Vite, and plain CSS.

## Project Overview

The `typescript` folder contains six small, runnable examples covering core TypeScript concepts with employee-related data. The `react-app` folder contains a working employee directory with search, department filters, sorting, profile details, validated add/edit forms, and confirmed delete actions.

## Features

- Workforce statistics: employee count, average salary, and department count.
- Search across employee names, email addresses, and departments.
- Filter by department; sort by name, salary, or department in either direction.
- View an employee profile, add a new employee, edit a profile, and delete with confirmation.
- Form validation with field-specific messages.
- Loading, empty, success, API information, and API fallback states.
- Responsive layout, accessible labels and dialogs, and reduced-motion support.
- Employee changes persist in browser localStorage and remain available after refresh.
- Ten realistic local sample employees keep the dashboard usable when the demo API is unreachable.

## Folder Structure

```text
Day-06/
├── typescript/
│   ├── fundamentals.ts
│   ├── arrays-objects.ts
│   ├── interfaces-types.ts
│   ├── functions-classes.ts
│   ├── generics.ts
│   └── type-narrowing.ts
├── react-app/
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── types.ts
│       ├── services/employeeService.ts
│       ├── hooks/useEmployees.ts
│       ├── components/
│       └── styles/style.css
├── .gitignore
└── README.md
```

## Technologies

- TypeScript 5, React 19, and Vite 6
- Plain CSS; no component or icon libraries
- JSONPlaceholder demo users API
- Browser localStorage for dashboard CRUD persistence
- `tsx` via `npx` to run the standalone TypeScript examples

## Prerequisites

- Node.js 20.19+ or 22.12+ (Node.js 24 is also suitable)
- npm (included with Node.js)
- A modern browser

## Run the TypeScript Examples

Open the VS Code terminal at the `Day-06` folder. Run each example separately:

```powershell
npx --yes tsx typescript/fundamentals.ts
npx --yes tsx typescript/arrays-objects.ts
npx --yes tsx typescript/interfaces-types.ts
npx --yes tsx typescript/functions-classes.ts
npx --yes tsx typescript/generics.ts
npx --yes tsx typescript/type-narrowing.ts
```

The first run may download `tsx` into npm's cache. It does not add a dependency to this project.

## Install and Run the React Application

In the VS Code terminal, change into the application folder, install its dependencies, and start Vite:

```powershell
cd react-app
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`. To create and preview a production build:

```powershell
npm run build
npm run preview
```

Run these npm commands from `Day-06/react-app`, where the app's `package.json` is located.

## API Integration and Data Limitations

The service layer requests users from `https://jsonplaceholder.typicode.com/users` when there is no saved directory. JSONPlaceholder is a public **fake/demo API**: it supplies sample names, emails, and locations, not a real employee database. The app combines those user fields with illustrative local job titles, departments, and salaries, so those details are not supplied or verified by the API.

The request uses `fetch` and checks the HTTP response. If the network is unavailable, the request fails, or the response is unexpected, the service returns ten bundled sample employees and displays a warning. The dashboard remains usable; the warning is not a blocking error. A saved local directory is loaded first, avoiding an API request on later visits.

The app does **not** create, update, or delete JSONPlaceholder records. Its public demo API is read-only for this project; CRUD changes are not sent to that API.

## localStorage CRUD

Add, edit, and delete operations update the typed service-layer data and write the complete employee list to this browser's localStorage under `day06-employees-v1`. Changes survive refreshes in the same browser profile. They are not uploaded to JSONPlaceholder, shared with another browser/device, or stored on a server. Clearing this site's browser storage removes the saved directory; when no saved list exists, the app loads the API demo users or bundled sample employees again. If browser storage is disabled or full, a write can fail and the interface reports that it could not save the change.

## Testing Checklist

1. Start the app and verify the directory and all three statistics appear.
2. Search using part of a name, email, and department; clear the search and filter.
3. Sort by employee, department, and salary, and click each heading again to reverse its order.
4. Open a profile from its name or view action; verify email, location, department, salary, and ID.
5. Add a valid employee; try an invalid email, blank department, short name, and zero salary to see validation messages.
6. Edit an employee and verify the table and average salary update.
7. Delete an employee, cancel once, then confirm; verify the count updates.
8. Refresh the page and confirm add/edit/delete changes persist.
9. Disconnect the network or block the JSONPlaceholder request with browser developer tools, then reload with local storage cleared to see the sample fallback and warning.
10. Resize to a phone viewport and test the search, filter, table scrolling, and dialogs.
11. From `react-app`, run `npm run build` and verify it completes without TypeScript errors.

## Upload to GitHub

Create an empty GitHub repository first, then open a terminal in the `Day-06` folder. Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` with your GitHub details:

```powershell
git init
git add .
git commit -m "Build Day-06 TypeScript employee dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

The root `.gitignore` excludes installed packages and generated build output, but keeps `package-lock.json` for repeatable installs.

## Deploy on Render

1. Push this project to GitHub and sign in to Render.
2. Choose **New** then **Static Site**, and connect the repository.
3. Set the **Root Directory** to `react-app`.
4. Set the **Build Command** to `npm install && npm run build`.
5. Set the **Publish Directory** to `dist`.
6. Create the static site and open its published URL.

The built dashboard is static; the JSONPlaceholder request runs in each visitor's browser. The browser's localStorage is per visitor and does not become shared server data. A public deployment should not be used for sensitive employee information.