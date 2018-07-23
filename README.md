# Purfect engine

Abstraction over webpack and babel configuration so you don't need to deal with it. It is literraly 0-configuration package, just install and start developing your app.

### The problem

I found myself doing porting and improving of webpack and babel configurations between FE apps which is extremely error prone, tedious and time consuming. Not to mention it takes lots of time to upgrade versions and implement all the changes afterwards.

### The solution 

Abstract away webpack and babel configuration under single package. Manage all versions, configuration and setup in a single place and ship all updates via single package update.

## Features

| Feature | Command |
|---|---| 
| Start development server locally | `purfect-engine start` | 
| Start development server locally with production build | `purfect-engine start:prod` | 
| Build deployable distribution | `purfect-engine build` |

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
