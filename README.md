# cardania-tools

Enter an ADA address and see what Cardania Resources are missing.

See demo [here](https://t5software.github.io/cardania-tools-prod/)

## Setup

Using node v16

```bash
# set environment variable which is used in svelte build
export TARGET="dev"

# install dependencies
npm ci

# to run tests you'll need playwright
npx playwright install --with-deps
```

## Developing

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# or start on a different port i.e. 8080 for AWS Cloud9
npm run dev -- -p 8080

# linting and formatting are enabled
npm run lint
npm run format
```

## Tests

You can run playwright tests with `npm test`

## Building

To create a production version of your app:

```bash
npm run build

# preview the production build with
npm run preview

# or preview on a different port i.e. 8080 for AWS Cloud9
npm run preview -- -p 8080
```

## CI/CD

This uses GitHub Actions to deploy to GitHub Pages. There are `dev` and `prod` environments:

- Pushes to `dev` branch publish to repository [cardania-tools-dev](https://github.com/t5software/cardania-tools-dev)
- Pushes to `main` main publish to repository [cardania-tools-prod](https://github.com/t5software/cardania-tools-prod)

This follows a concept from an article found [here](https://medium.com/geekculture/when-youre-working-on-a-static-site-and-github-pages-feels-like-the-perfect-hosting-solution-a41c37f4e326).

Checkout the `.github\workflows` folder.
