# AFSA Chapter Legislative Playbook

A static site that helps AFSA members learn the 2026–27 legislative priorities, take part in Legislative Awareness Week, and build relationships with their elected officials and staff.

No database, no login, no cookies, no third-party scripts. Fonts are hosted with the site.

## What's in this folder

| File | What it is |
| --- | --- |
| `index.html` | Home |
| `toolkit.html` | Chapter toolkit: lookups, scripts and templates, proclamations, follow-up, personal-capacity guidance |
| `impact.html` | The record, with Congress.gov proof links |
| `platform.html` | 2026–27 platform focus groups and this year's Hill Day priorities |
| `contact.html` | Military and Government Relations contact |
| `404.html` | Shown by GitHub Pages for any missing page |
| `assets/css/site.css` | All styles (no inline styles, so the security policy stays strict) |
| `assets/js/site.js` | Copy buttons (templates, talking points, top priorities), Senate lookup, template personalizer, light/dark toggle. Every page works without it. |
| `assets/js/theme.js` | Applies a visitor's saved light or dark choice before the page draws, so there is no flash |
| `assets/fonts/` | Newsreader and Instrument Sans (SIL Open Font License, included) |
| `assets/img/` | Favicon, touch icon, and the social share card |
| `sitemap.xml`, `robots.txt` | Search engine files |
| `.nojekyll` | Tells GitHub Pages to serve the files as-is |

## Publish on GitHub Pages

The site is built to live at the root of `https://afsa-legislative.github.io/`. That address comes from a repository named exactly `afsa-legislative.github.io` in the `afsa-legislative` account. It sits alongside the existing `AFSA_Legislative` repository, which keeps working at `/AFSA_Legislative/`.

1. In the `afsa-legislative` GitHub account, create a new public repository named `afsa-legislative.github.io`.
2. Upload everything in this folder, including the hidden `.nojekyll` file, to the root of the `main` branch.
3. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. On the same page, turn on **Enforce HTTPS** once it becomes available.
5. Wait a minute or two, then open `https://afsa-legislative.github.io/`.

If you publish somewhere else instead (another repository or a custom domain), the pages still work, but update the address `https://afsa-legislative.github.io/` in each page's `<head>` (canonical and Open Graph tags), in `sitemap.xml`, and in `robots.txt`. `robots.txt` is only read at the root of a domain.

## Checks to run after publishing

Run these against the live address.

| Test | Where | Expected on GitHub Pages |
| --- | --- | --- |
| Lighthouse (all four categories) | Chrome DevTools → Lighthouse, mobile and desktop | 95+ target |
| WAVE / axe | wave.webaim.org, or the axe DevTools extension | Zero errors (axe was run on every page before delivery: zero violations, light and dark, phone and desktop) |
| W3C HTML | validator.w3.org/nu | No errors (checked before delivery) |
| Rich Results Test | search.google.com/test/rich-results on the home page | Detects Organization |
| Mozilla HTTP Observatory | developer.mozilla.org/observatory | Below A is expected. GitHub Pages cannot send custom headers, so X-Content-Type-Options and anti-framing headers cannot be set. The Content-Security-Policy and referrer policy are set with meta tags. |
| SSL Labs | ssllabs.com/ssltest | Managed by GitHub; not configurable |
| DNSSEC, SPF, DMARC | DNSViz, MXToolbox | Not applicable on a github.io address, which GitHub owns |

## Keeping it current

- **Legislative Awareness Week dates:** search the pages for `dates TBD` (Home and Toolkit).
- **Cosponsor counts and Hill Day figures:** labeled "as of March 2026" on Impact and Platform. Update the label when the figures change.
- **Bill links:** all point to Congress.gov pages for the 119th Congress.
- **Contact address:** `milgov3@hqafsa.org` appears in the footer of every page and on Contact.

## Content rules this site follows

- Statistics come only from AFSA source documents.
- Non-partisan, non-accusatory framing toward the administration, Congress, and the Department of War.
- Member engagement is always described as personal capacity: out of uniform, on personal time, from personal email.
