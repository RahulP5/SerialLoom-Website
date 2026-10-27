# www.serialloom.com

The website for [SerialLoom](https://github.com/RahulP5/SerialLoom), the free, open-source virtual COM port software for Windows. It is a plain static site (HTML, CSS and a little JavaScript) hosted on GitHub Pages. There is no build step.

## Pages

| URL | Targets searches like |
|---|---|
| `/` | virtual COM port software for Windows, virtual serial port |
| `/virtual-com-port-windows/` | virtual COM port Windows 10 / 11, create virtual serial port |
| `/virtual-null-modem/` | virtual null-modem cable, virtual serial port pair |
| `/serial-port-splitter/` | share COM port between applications, serial port splitter |
| `/serial-to-tcp/` | serial to TCP/IP, COM port over network, COM port redirector |
| `/com0com-alternative/` | com0com alternative, com0com Windows 11 test mode |
| `/download/` | download virtual serial port software |
| `/docs/` | how-to guide and troubleshooting |

## Layout

```
index.html, */index.html   pages (one folder per URL, so links have no .html)
404.html                   GitHub Pages "not found" page
assets/css/site.css        all styles (dark by default, light follows the visitor's system setting)
assets/js/site.js          mobile menu, scroll animations, latest-release download link
assets/img/                logo, icons, screenshots (dark and light, 3 sizes), og-image.png for social links
CNAME                      custom domain: www.serialloom.com
sitemap.xml, robots.txt    for search engines
.nojekyll                  serve files as they are, without Jekyll
```

## Releasing a new SerialLoom version

Download buttons and version labels update themselves: `site.js` asks the GitHub API for the latest release and points the buttons at its `*_x64-setup.exe`. If that request fails, the buttons still go to the latest release page.

Two places still name the version in the HTML and are worth updating now and then: `softwareVersion` in the structured data of `index.html` and `download/index.html`, and the fallback text `v0.1.1` inside `data-version` elements.

## Preview locally

```powershell
npx serve .        # or: python -m http.server 8080
```

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository (for example `RahulP5/serialloom.com`).
2. In the repository: *Settings > Pages > Build and deployment*, choose *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. *Custom domain*: `www.serialloom.com` (already in `CNAME`), then tick *Enforce HTTPS* once the certificate is ready.
4. At your DNS provider:
   - `CNAME` record: `www` → `rahulp5.github.io`
   - `A` records for the bare domain `serialloom.com`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (GitHub then redirects it to `www`)

## Getting found on Google

1. Add the site to [Google Search Console](https://search.google.com/search-console) as a *Domain* property (verify with a DNS TXT record).
2. Submit `https://www.serialloom.com/sitemap.xml` under *Sitemaps*.
3. Do the same in [Bing Webmaster Tools](https://www.bing.com/webmasters) (it can import from Search Console). Bing also feeds DuckDuckGo and others.
4. Link to the site from places people already look: the SerialLoom GitHub repo's *About > Website* field and README, the release notes, and answers on forums or Stack Overflow where SerialLoom solves the question. Links like these matter more for ranking than anything on the page itself.
5. Add GitHub topics to the SerialLoom repo, such as `virtual-com-port`, `virtual-serial-port`, `serial-port`, `com-port`, `null-modem`, `windows`.
