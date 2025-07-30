This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Developpment

## Getting Started

### System requirements
Before you begin, make sure your system meets the following requirements:

- Node.js 22.
- macOS, Windows (including WSL), or Linux.

### Running the application
For the first time, install the necessary packages:
```bash
npm install
```

Then, run the development server:

- Compiling with Turbopack:
```bash
npm run dev
```

or

- Compiling without Turbopack:
```bash
npm run dev-no-turbopack
```

Turbopack is the prefered way to run the application in terms of performance, but it still has some bugs with css display (which doesn't happen on the 2nd option)

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Code organisation
We use the `app router` approach from Nextjs.

All the application code is inside the `app` folder.

- Shared components are inside private folders (the ones prefixed with an underscore) in the root of the `app` folder (`_ui`, `_globals`, `_hooks`...)
- For individual routes, use the following model:

`
  _ui
  	  _components
  		    components.tsx
      		components.module.css
  	  _client-components
  		    client-components.tsx
      		client-components.module.css
  _data
    	page-texts.tsx
  _utils.tsx
  page.tsx
  page.module.css
`

  Where the private folders are only used in the context of the corresponding route.

- Keep `page.tsx` only for data fetch (see section below) and page organisation.

### `app/_data/queries.tsx`
This is the file that "implements" the graphql queries generated with codegen. Use the functions from this file to fetch data in server components. 


## Breakpoints

The application was developped using the mobile first approach.
The minimum functional width is 390px (24.375rem).

The application has a breakpoint at `80rem (~1280px)`.

"mobile" version < 80rem <= "desktop" version 

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


## [Service] Apollo

### Backend endpoint
! If you are running the backend in local (localhost) and you want to build a **docker** image for the frontend (that will query the local backend graphql endpoint), you need to define the NEXT_PUBLIC_BACKEND_BASE_URL variable in .env file with your internal network IP address (`192.168.*.*`). `localhost` WON'T WORK WITH APOLLO CLIENT.
On Linux, You can find your IP address using the following command in the terminal:

```bash
ip -4 addr show | grep -oP '(?<=inet\s)192\.168\.\d+\.\d+'
```

Note that you will also need to add `build-arg` for all the environment variables on the docker command.

HOWEVER, If you do **not** use docker (i.e you use turbopack to run the application in local), you must use `localhost` for the NEXT_PUBLIC_BACKEND_BASE_URL variable in .env

### Configuration
This application has both server and client side requests to the backend. Server side requests are configured in `apolloClient.tsx` file, while client side requests are configured in `apolloWrapper.tsx` file. 

To prevent CORS problems and to enhance security (caching the graphql token on browser), all client requests pass through a proxy, which is configured in `/proxy/route.tsx` file.

### Revalidation
All the server-side queries are revalidate every X seconds. Check `apolloClient.tsx` file to change it, if needed.

## [Service] GraphQL
Write graphql queries/fragments here. 
Then, to generate types, run:

```bash
npm run codegen
```
! This uses the documentation genration from the graphql endpoint. It will fail if the connection to the graphql is not working or if there any errors in the query construction.

The `__generated__` folder is generated/updated with this prompt. 


## [Service] RemoteHtml
Handle html-like strings.

Use this to deal with SPIP html and to fix their layout.

## [Service] Cookie consent manager
Manage cookie consent preferences for the user.

Do not forget to update the services list in `getServiceName` function whenever new iframes services are used in the back-office.


## URL redirection from former ERASME website
The former Erasme website used a different logic for the URLs. 

To (try to) handle this, a mechanism was set in the `/[identifiant]` dynamic route segment.

---
# DevOps
A CI/CD is set on the `dev` and `main` branches.

## Environment variables
To add a new environment variable:

If an environment variable is used directly in client-side components (without proxy), it must be prefixed with `NEXT_PUBLIC_`.
For example, the `NEXT_PUBLIC_BACKEND_BASE_URL` is required by the footer.

Note that this is an exception. Most variables do **not** need the `NEXT_PUBLIC_` prefix, since a proxy is configured and most API calls are handled by server components only. As a result, these variables remain server-side and do not need to be exposed to the browser.

### For local development 
Simply add the new variable in the .env local file
    - Do not forget to update `.env.example` file as well

### For the deployed version:
- Update Dockerfile with ARG and ENV lines, like the following:
    ```
    ARG MY_NEW_VARIABLE
    ENV MY_NEW_VARIABLE=$MY_NEW_VARIABLE
    ```

- Update `.github/workflows/build.yaml`
  - Add `MY_NEW_VARIABLE ${{ vars.MY_NEW_VARIABLE }}` to `env` section 
    - ! If it's a secret, use **secrets** instead of **vars**
  - Add `MY_NEW_VARIABLE` to `build-args` property on Docker build/push step
  
- Update github environment variable on _Settings --> Environments --> [dev/prod] --> Add environment [variable/secret]_
  - Do not forget to update all the concerned environments
  - /!\ You must have admin rights for the repository

- Most of the variables must also be available for the server or browser during runtime (mainly for fetch/refetch reasons). For these, in addition to the other steps, you must update them on kubernetes' (Rancher) --> *Environment Variables* on the frontend Deployment. 

---

## Useful vscode extensions
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [CSS Nesting Syntax Highlighting](https://marketplace.visualstudio.com/items/?itemName=jacobcassidy.css-nesting-syntax-highlighting)
- [Color Highlight](https://marketplace.visualstudio.com/items/?itemName=naumovs.color-highlight)
- [GraphQL: Syntax Highlighting](https://marketplace.visualstudio.com/items/?itemName=GraphQL.vscode-graphql-syntax)

## Developpers
- [@vbaroni](https://github.com/vbaroni)