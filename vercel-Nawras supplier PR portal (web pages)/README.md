# Nawras supplier PR portal (web pages)

Two static pages that read directly from the Supabase tables the
extension keeps in sync — no login, no build step, no framework.

- `index.html` — list of open (Approved) requisitions, mirrors `pr.asp`
- `pr-detail.html?pr=<PR No>` — line items for one requisition, mirrors `PRDet.asp`
- `style.css` — shared styling
- `config.js` — your Supabase URL + **anon** key

## 1. Fill in config.js

Open `config.js` and paste in:
- `SUPABASE_URL` — same project URL used in the extension
- `SUPABASE_ANON_KEY` — from Supabase's Project Settings → API. This is
  the **anon** key, not the service_role key. It's meant to be public —
  it only ever has read access, enforced by the RLS policies on
  `pr_list`/`pr_lines`.

## 2. Test locally

Any static file server works, e.g. from this folder:
```
npx serve .
```
or Python's built-in one:
```
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## 3. Deploy to Vercel

- Easiest: drag this folder onto vercel.com's dashboard, or
- `npx vercel` from this folder and follow the prompts

No build settings needed — it's plain static files.

## 4. Share access

There's no login. Access control is simply who you send the link to —
share the deployed URL only with the suppliers you've chosen to invite
to quote.

## Notes

- The list auto-updates on every page load, straight from Supabase —
  whatever the extension last synced is what suppliers see.
- If a PR gets cancelled/converted/reverted to Open in the real ERP,
  the next extension sync removes it from Supabase, and it disappears
  from both pages automatically — including showing a friendly
  "no longer open" message if someone still has an old detail link
  open.
- Suppliers send pricing/terms by email to the buyer shown on the
  page — there's no submission form here by design.
