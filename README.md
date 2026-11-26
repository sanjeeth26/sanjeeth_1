# Sanjeeth Kumar – Portfolio (React + Vite)

## Run it on your computer

1. Install **Node.js** (version 18 or newer) from https://nodejs.org
2. Unzip this folder, open a terminal inside it, and run:

```bash
npm install
npm run dev
```

3. Open the link it shows (usually http://localhost:5173).

## Make the final website files

```bash
npm run build
```

This creates a `dist` folder. That folder is your finished website.

## Put it online (free)

- **Netlify:** go to https://app.netlify.com/drop and drag the `dist` folder onto the page.
- **Vercel:** push this folder to GitHub, then import the repo at https://vercel.com/new (framework: Vite).
- **GitHub Pages:** upload the contents of `dist` to a repo and turn on Pages.

## Where to edit things

| What | File |
| --- | --- |
| All text, jobs, services, skills, tools | `src/App.jsx` (the arrays at the top: `SERVICES`, `TOOLS`, `GROUPS`, `JOBS`, `COMP`, `TICKER`) |
| Colours, fonts, layout | `src/index.css` (colours are at the top in `:root`) |
| Photos, logos, ad image | `public/img/` |
| TV ad video | `public/media/avanga-tv-ad.mp4` |

To change a photo, replace the file in `public/img/` with a new one of the same name.
