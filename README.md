# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Prayer request delivery

Prayer requests are submitted to the Vercel serverless function at
`POST /api/prayer-requests` and forwarded to the configured Telegram chat. They
are not stored in a website database.

In the Vercel project, add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` under
**Settings → Environment Variables** for each environment where submissions
should work. Redeploy after adding or changing the variables. Keep the bot
token server-side; do not add it to a `VITE_` variable or frontend code. Add the
bot to the destination group and ensure it can send messages there.

For local development, install the Vercel CLI, create an untracked
`.env.local` file in the project root with those two variables, then run
`vercel dev` to test the complete local integration. Vite's `npm run dev`
serves the frontend but does not run Vercel functions. After deploying, submit
a test request and confirm it appears in the configured Telegram group. A
success response is returned only after Telegram accepts the message.

The endpoint limits requests to five per minute per client IP in each running
function instance, and limits payload and field sizes. Serverless instance
limits are best-effort and can reset when instances scale or restart.
