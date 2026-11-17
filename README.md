# Campus — Student Information Portal

A responsive React student portal built for the React Routing and reusable JSX laboratory exercise. Includes a campus dashboard, a searchable student directory, a course catalog, and an About page. All records are fictional demonstration data.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm (tested with Node.js 24).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://127.0.0.1:5173`.

```sh
npm run lint     # Check JavaScript and React hooks
npm run build    # Create the production build in dist/
npm run preview  # Serve the production build locally
```

## Pages and features

| Route | Page | Features |
| --- | --- | --- |
| `/` | Home | Community statistics, program links, and navigation to the directories |
| `/students` | Students | Six reusable student cards; search by name, ID, or email; program and year filters; profile dialogs |
| `/courses` | Courses | Six reusable course cards; search by name, code, or instructor; department filter; course details |
| `/about` | About | Portal introduction and explanation of the demonstration data |
| Any unknown URL | Not found | Friendly recovery link to Home |

Course filters are stored in the URL, so filtered links can be shared and survive refreshes. Dialogs support Escape, a close button, backdrop dismissal, and keyboard focus restoration. All pages adapt to mobile, tablet, and desktop layouts. Navigation uses React Router without full-page reloads.

This is a front-end demonstration. It does not include authentication, a database, editing records, or enrollment. Google Fonts supplies optional typography; local sans-serif fallbacks work without it. All icons are bundled locally.

## Project structure

```text
src/
  components/
    Navbar.jsx          Shared navigation with active route styling
    StudentCard.jsx     Reusable student summary
    CourseCard.jsx      Reusable course summary
    DetailDialog.jsx    Shared accessible native modal
    Icon.jsx            Shared icon mapping
  pages/
    Home.jsx
    Students.jsx
    Courses.jsx
    About.jsx
  data/portal.js        Fictional student, program, and course records
  App.jsx               Routes and shared page layout
  main.jsx              React entry point and BrowserRouter
  styles.css            Responsive styling
tests/portal.spec.js     Browser interaction and responsive layout checks
```

## Browser checks

Install Playwright's browser once, then run the tests:

```sh
npx playwright install chromium
npm test
```

If Microsoft Edge is already installed, PowerShell users can use it without downloading Chromium:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm test
```

The tests check navigation, direct URL refreshes, active links, unknown routes, combined filters, search, empty states, dialog controls and focus, shareable course filters, and horizontal overflow at 320, 390, 768, and 1440 pixels. The test runner starts the development server automatically if necessary.

## Git and rubric

- `main` contains the styled React application.
- `no-style` preserves the initial semantic HTML version without CSS or JavaScript. Open that branch's `index.html` directly in a browser.
- The repository uses the existing Git identity configured on this computer.
- Separate commits preserve the baseline and the React implementation.

The screenshot's written instructions require React; some rubric descriptions mention an HTML-only branch. Both are provided: the working React project is on `main`, and the original static page is on `no-style`.

GitHub repository: [Andreijeresano/Lab2_app](https://github.com/Andreijeresano/Lab2_app).

The repository is configured as `origin`. To publish future changes to both branches:

```sh
git push -u origin main
git push origin no-style
```

Submit this repository URL: https://github.com/Andreijeresano/Lab2_app.

## Hosting

Deploy the output of `npm run build` to a static host. Because the app uses `BrowserRouter`, configure the host to serve `index.html` for unknown paths so refreshes on `/students`, `/courses`, and `/about` work. Vite's development and preview servers already support this behavior. Subdirectory hosting requires adjusting Vite's `base` and the router's `basename` together.
