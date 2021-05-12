# Audio worklet with Next and Webpack 5 example
This repo is a reproduction at an attempt to deliver functional AudioWorklets in
Next. Based on `Custom server with TypeScript + Nodemon example`

To get started:
```bash
npm i
npm run dev
```
watch the chaos

# Custom server with TypeScript + Nodemon example

The example shows how you can use [TypeScript](https://typescriptlang.com) on both the server and the client while using [Nodemon](https://nodemon.io/) to live reload the server code without affecting the Next.js universal code.

Server entry point is `server/index.ts` in development and `dist/index.js` in production.
The second directory should be added to `.gitignore`.

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example custom-server-typescript custom-server-typescript-app
# or
yarn create next-app --example custom-server-typescript custom-server-typescript-app
```
