# Brooks and Creeks Chambers – Website

A premium, fully responsive, SEO-optimised one-page website for the Nigerian legal practice
**Brooks and Creeks Chambers** (Principal Partner: Sufian Abdulkarim Ajenifuja).
Registered with the Corporate Affairs Commission (CAC), Nigeria, in 2022.

---

## Project Structure

```
brooks-and-creeks-chambers/
├── index.html          # Complete one-page website (semantic HTML5)
├── 404.html            # Branded 404 page (Netlify serves this automatically)
├── css/
│   └── style.css       # All styling (navy #101D35 · gold #C5A04A)
├── js/
│   └── main.js         # Nav, animations, modals, enquiry form logic
├── assets/
│   ├── hero-law-office.png      # Hero background (replace with licensed photo)
│   ├── about-columns.png        # About section image
│   └── partner-placeholder.png  # PLACEHOLDER portrait — replace with real photo
├── sitemap.xml         # XML sitemap (update domain before submission)
├── robots.txt          # Robots file (update domain)
└── README.md           # This file
```

**Stack:** HTML5, CSS3, vanilla JavaScript. No build step, no dependencies — deployable as-is.

---

## 1. Enquiry Form

The form is connected to **Formspree** at `https://formspree.io/f/maeezjnk`
(set as the form's `action` in `index.html`). Submissions are sent via `fetch`
from `js/main.js` and delivered to the notification email configured in the
Formspree dashboard. To change the destination, update the `action` URL.

If the `action` is ever reset to the `YOUR_FORM_ID` placeholder, the form shows a clear notice instead of silently failing
(no fake submissions are created). A honeypot field (`_gotcha`) filters spam bots.

> Alternative backends: swap the `action` for a Web3Forms access key
> (<https://web3forms.com>) or your own endpoint — the JS in `js/main.js`
> posts via `fetch` and handles success/error states.

---

## 2. Replace Placeholder Images

| File | Replace with |
|---|---|
| `assets/partner-placeholder.png` | Official portrait of Sufian Abdulkarim Ajenifuja. **Important:** search-sourced stock photos are placeholders only — do not publish them as the partner's likeness without a proper licence. |
| `assets/hero-law-office.png` | A licensed high-resolution photo of the firm's office / a legal library. |
| `assets/about-columns.png` | Optional: any licensed legal-themed photo. |

After replacing images, keep the same filenames (or update the paths in `index.html`)
and keep meaningful `alt` attributes for SEO.

---

## 3. Update Domain References

Search the project for `brooksandcreekschambers.com.ng` and replace with your real domain in:

- `index.html` — canonical URL, Open Graph / Twitter `og:url` and `og:image`
- `sitemap.xml` — the `<loc>` entry
- `robots.txt` — the `Sitemap:` line

---

## 4. Deploy to Netlify (Recommended)

### Option A – Drag & Drop (fastest)
1. Go to <https://app.netlify.com/drop>.
2. Drag the **entire project folder** onto the page.
3. Netlify assigns a temporary URL (e.g. `https://your-site.netlify.app`).

### Option B – Git-based (recommended for updates)
1. Create a repository on GitHub/GitLab and push this folder.
2. In Netlify: **Add new site → Import an existing project**.
3. Build settings: **leave blank** (static site, no build command).
   Publish directory: `/` (root).
4. Every `git push` redeploys automatically.

Netlify automatically uses `404.html` and serves `robots.txt` / `sitemap.xml` from the root.

### Other hosts
- **GitHub Pages:** push to a repo → Settings → Pages → select branch.
- **Vercel / Cloudflare Pages:** import repo, no build command, output root.

---

## 5. Custom Domain

1. In Netlify: **Domain management → Add custom domain** (e.g. `brooksandcreekschambers.com.ng`).
2. At your domain registrar, point DNS:
   - **Option 1 (Netlify DNS):** delegate the domain to Netlify's nameservers.
   - **Option 2 (external DNS):** add an `A` record → `75.2.60.5`
     and a `CNAME` record for `www` → `your-site.netlify.app`.
3. Netlify provisions free HTTPS automatically (Let's Encrypt).
4. Update the domain references listed in step 3, then redeploy.

---

## 6. Google Search Console Setup

1. Go to <https://search.google.com/search-console>.
2. Add a **Domain property** (requires DNS verification) or a **URL-prefix property**
   (e.g. `https://www.brooksandcreekschambers.com.ng/`).
3. Verify ownership (DNS TXT record or the HTML file — for the file method, upload it
   to the project root and redeploy).
4. **Sitemap:** in Search Console go to *Sitemaps* → submit
   `https://your-domain/sitemap.xml`.
5. Use **URL Inspection → Request Indexing** on the homepage to speed up first crawl.

### Local SEO readiness (next steps when an office address exists)
- Create a **Google Business Profile** with the firm's name, phones and address.
- Add `PostalAddress` to the `LegalService` JSON-LD block in `index.html`.
- List the firm on reputable Nigerian legal directories.

---

## Compliance Notes

- No fabricated addresses, emails, memberships or credentials are present anywhere
  on the site.
- Telephone links (`tel:`) and WhatsApp links (`wa.me`) use the supplied numbers
  in international format (+234…).
- Privacy Policy and Legal Disclaimer open as accessible modals from the footer.
- The site is WCAG-conscious: semantic landmarks, aria labels, keyboard-friendly
  modals, visible focus styles and `prefers-reduced-motion` support.

© Brooks and Creeks Chambers. All rights reserved.
