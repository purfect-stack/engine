# Purfect engine

Abstraction over webpack and babel configuration so you don't need to deal with it. It is literraly **0-configuration** package, just install and start developing your app.

### The problem

I found myself doing porting and improving of webpack and babel configurations between FE apps which is extremely error prone, tedious and time consuming. Not to mention it takes lots of time to upgrade versions and implement all the changes afterwards.

### The solution 

Abstract away webpack and babel configuration under single package. Manage all versions, configuration and setup in a single place and ship all updates via single package update.

## How to start?

1. `npm install --save @purfect/engine` or `yarn add @purfect/engine`
2. In your project's `package.json` add these scripts
```
"scripts": {
  "start": "purfect-engine start",
  "start:prod": "purfect-engine start:prod",
  "build": "purfect-engine build"
}
```
3. If you don't have `src` directory with `index.ejs` and `index.jsx` entry files yet, run `node_modules/.bin/purfect-engine init`
4. Run `npm start` or `yarn start`
5. Open url on which the app is running
6. Start developing

## Features

| Command | Feature |
|---|---| 
| `purfect-engine start` | Start development server locally | 
| `purfect-engine start:prod` | Start development server locally with production build | 
| `purfect-engine build` | Build deployable distribution |

### Development server

Purfect engine uses `webpack-dev-server` under the hood, it has hot reload enabled by default.

### Loaders included by default

- `*.js` and `*.jsx` are loaded with `babel-loader` - which can be extended via `.babelrc` in your root directory
- `*.pcss` files are loaded using `css-loader`, `style-loader` and piped through preconfigured set of `postcss-loader`
- `*.css` files are loaded using `css-loader` without css modules
- `Assets` are loaded using `file-loader`

### Alias

This module allows to alias all folders that are put under `/src` directory in a project directly, without forcing you to use relative paths. (I.e. `import Button from 'components/Button'` will import component from `root/src/components/Button`)

### Production build

Generated production build includes minified and compressed version of both `js` and `css` bundles. It also adds `hash` to the filenames ensuring that the cache will be busted on the next release. Assets loaded with `import` statements will also benefit from cash-busting `hashes`.

### Application structure

The only requirement of this package is to ensure that you use following structure:

```
- src
  - index.ejs
  - index.jsx
```

1. You must have `src` directory which contains your source code and specifically two entry files
2. `index.ejs` - main html template which is your application entry point. It is compiled to `index.html` during the build step
3. `index.jsx` - your code entry point. This file is included in your `index.html`

If you are bootstraping new project you can use `purfect-engine init` command to add them automatically
