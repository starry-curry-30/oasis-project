# OASIS Project Website

Project page for **OASIS: Online Anchor-centric Scene Inference System for Open-Vocabulary Retrieval and Navigation in Dynamic Environments**, ACM Multimedia 2026.

- Code: https://github.com/starry-curry-30/OASIS
- Video: https://youtu.be/tATBsrzlUmQ
- Paper: https://arxiv.org/abs/2610.30589

## Website source

Static HTML, CSS, and JavaScript are in `dist/`. Edit `dist/index.html` for content, `dist/theme.css` for the desert and oasis theme, and `dist/site-config.js` for resource links and author homepages.

The page starts with the abstract and overview figure. A YouTube demonstration follows, without local MP4 files or autoplay.

## Local preview

Run `python3 -m http.server 8766 --directory dist` and open `http://localhost:8766`.

## Publish

Push to `main`. `.github/workflows/pages.yml` deploys `dist/` through GitHub Actions. In repository Settings → Pages, the publishing source must be GitHub Actions.

All research figures and results are from the OASIS paper. The logo is supplied by the authors.
