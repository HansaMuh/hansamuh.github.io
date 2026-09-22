# hansamuh.github.io

My personal portfolio, live at **[hansamuh.github.io](https://hansamuh.github.io)**.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router), exported as static files
- React 19 and TypeScript
- Tailwind CSS v4, [shadcn/ui](https://ui.shadcn.com) and Radix primitives
- [Magic UI](https://magicui.design) for the marquee and the flickering grid
- [zod](https://zod.dev) to validate the site's content at build time

## Running it

Requires Node 22 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

To check the real deploy artifact rather than the dev server:

```bash
npm run build      # writes the static site to out/
npx serve out
```

`npm run lint` runs ESLint. There is no test suite; `npm run build` doubles as the type check and the content check.

## Editing the content

Everything personal lives in [`src/data/resume.json`](./src/data/resume.json): the introduction, status lines, work history, skills, projects, certifications and contact links.

The file is validated against a schema in [`src/data/resume.ts`](./src/data/resume.ts) when the site builds, so a missing or mistyped field fails the build with the path to the problem instead of breaking the page.

- **Icons** are referenced by name. The allowed names are the keys of `ICONS` in [`src/data/icons.tsx`](./src/data/icons.tsx); register a new icon there before using it.
- **Project artwork** goes in `public/`. Each project lists its `previews` (the images or videos shown in the preview panel, in order) and an optional `thumbnail`, a lighter copy for the card.

## Deployment

Every push to `main` runs lint and build in GitHub Actions ([`deploy.yml`](./.github/workflows/deploy.yml)) and publishes `out/` to GitHub Pages. In the repository settings, Pages must be set to deploy from **GitHub Actions**.

## Credits

Built on [Dillion Verma's portfolio template](https://github.com/dillionverma/portfolio) and components from [Magic UI](https://magicui.design). The banner loop is by [Chillhop Music](https://chillhop.com).

## License

[MIT](./LICENSE).
