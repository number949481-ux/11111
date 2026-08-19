# webapp — Arabic Greeting Cards

## Project overview
Three standalone, responsive Arabic greeting-card pages built with semantic HTML, embedded CSS, and lightweight JavaScript interactions.

## Completed features
- Congratulations card with animated confetti.
- Birthday card with an interactive wish effect.
- Thank-you card with one-click message copying.
- RTL Arabic layout, responsive typography, and reduced-motion support.

## Entry URLs
- `/congratulations.html` — congratulations card.
- `/birthday.html` — birthday card.
- `/thanks.html` — thank-you card.
- `/` — Hono application root.

## User guide
Open any of the three HTML paths in a browser. Each card includes one interactive action button.

## Data architecture
No persistent storage or data models are required. All three cards are static files served from `public/`.

## Development
```bash
npm run build
npm run dev
```

## Deployment
- **Platform:** Cloudflare Pages / Workers
- **Status:** Ready to deploy
- **Stack:** Hono, Vite, HTML, CSS, JavaScript

## Not yet implemented
- Custom recipient and sender names.
- Share links and downloadable card images.

## Recommended next steps
Add URL parameters for personalized names and messages, then deploy to Cloudflare Pages.
