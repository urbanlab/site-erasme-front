This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Breakpoints

The application was developped using the mobile first approach.
The minimum functional width is 390px (24.375rem).

The breakpoints are the following:

|Device|Minimum width|
|---|---|
|Medium tablet|768px (48rem)|
|Large tablet|1024px (64rem)|
|Medium desktop|1440px (90rem)|
|Large desktop|1920px (120rem)|

## Color filters
The application uses color filters on svgs icons to easily change their colors. This choice was made to:
- Avoid using third party libraries
- Avoid using/converting svg to js classes --> This approach would harden the application's maintenance (for example, in case of a icon's modification, a new class would have to be created and the svg code would have to be modified)
- Avoid duplication of svg icons of different colors
- Keep css files as simple and straightforward as possible

! The source svg icon must be black and have a transparent background.

The filters were generated with: [filter generator](https://isotropic.co/tool/hex-color-to-css-filter/) 

## ShapedImage masks
The shapedImage component uses an svg mask. If a new mask is added, make sure that its svg code has:
`preserveAspectRatio="none" width="100%" height="100%"` in the `<svg>` tag


## Apollo Client

### Backend endpoint
! If you are running the backend in local (localhost) and you want to build a **docker** image for the frontend (that will query the local backend graphql endpoint), you need to define the host part of the GRAPHQL_ENPOINT variable in .env file with your internal network IP address (`192.168.*.*`). `localhost` WON'T WORK WITH APOLLO CLIENT.
On Linux, You can find your IP address using the following command in the terminal:

```bash
ip -4 addr show | grep -oP '(?<=inet\s)192\.168\.\d+\.\d+'
```

HOWEVER, If you do **not** use docker (i.e you use turbopack to run the application in local), you must use `localhost` as the host part of the GRAPHQL_ENPOINT variable in .env

### Configuration
This application has both server and client side requests to the backend. Server side requests are configured in `apolloClient.tsx` file, while client side requests are configured in `apolloWrapper.tsx` file. 

To prevent CORS problems and to enhance security (caching the graphql token on browser), all client requests pass through a proxy, which is configured in `/proxy/route.tsx` file.

## Usefull vscode extensions
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [CSS Nesting Syntax Highlighting](https://marketplace.visualstudio.com/items/?itemName=jacobcassidy.css-nesting-syntax-highlighting)
- [Color Highlight](https://marketplace.visualstudio.com/items/?itemName=naumovs.color-highlight)
- [GraphQL: Syntax Highlighting](https://marketplace.visualstudio.com/items/?itemName=GraphQL.vscode-graphql-syntax)

## Developpers
- [@vbaroni](https://github.com/vbaroni)