# Deploying Pearl Collection to Vercel

## 1. Push the project to a Git repo (GitHub/GitLab/Bitbucket)

## 2. Import it on Vercel

Vercel reads `vercel.json`, which is already configured:

- Install: `bun install`
- Build: `NITRO_PRESET=vercel bun run build`
- Output: `.vercel/output` (Build Output API, detected automatically)

No framework preset needs to be selected.

## 3. Add the environment variable

In **Project Settings → Environment Variables**, add:

| Name               | Value                                          | Environments |
| ------------------ | ---------------------------------------------- | ------------ |
| `N8N_WEBHOOK_URL`  | your n8n production webhook URL                | All          |

## Why the webhook URL is hidden

The browser never sees the n8n URL. The chat widget posts to the app's own
endpoint `POST /api/public/chat`, which runs server-side, validates the payload
with Zod, and forwards it to `N8N_WEBHOOK_URL` (see
`src/lib/chat-webhook.server.ts` — a `.server.ts` module that is never bundled
into client code).

Expected n8n response: JSON containing any of `reply`, `output`, `text`,
`message`, or `answer` — or plain text.
