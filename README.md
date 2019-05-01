<div align="center">
⚠️ 🚧
<img src="https://raw.githubusercontent.com/crakoucas/Dockertron/master/resources/dockertron.png" width="250px" />
🚧 ⚠️   ️ 
</div>
</br>
<p align="center">
An Electron App based on  <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React + Hooks</a>, <a href="https://github.com/reactjs/redux">React Router</a>, <a href="http://webpack.github.io/docs/">Webpack</a>, <a href="https://ant.design/docs/react/introduce">Ant Design</a> and <a href="https://github.com/gaearon/react-hot-loader">React Hot Loader</a> for manage your <a href="https://www.docker.com/">Docker container</a>.
</p>

<hr>
<br>

<div align="center">

[![Build Status][travis-image]][travis-url]
[![Appveyor Build Status][appveyor-image]][appveyor-url]
[![Dependency Status][david_img]][david_site]
[![DevDependency Status][david_img_dev]][david_site_dev]
[![Github Tag][github-tag-image]][github-tag-url]

</div>

## Install

First be sure to have Docker install without sudo command

[Tutorial for 🐧](https://docs.docker.com/install/linux/linux-postinstall/)

[Tutorial for 🍏](https://docs.docker.com/docker-for-mac/install/)

[Tutorial for 🐙 Windows](https://docs.docker.com/docker-for-windows/install/)

Second, clone the repo via git:

```bash
git clone --branch master https://github.com/crakoucas/Dockertron.git
```

And then install the dependencies with yarn.

```bash
$ cd Dockertron
$ yarn
```

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

If you don't need autofocus when your files was changed, then run `dev` with env `START_MINIMIZED=true`:

```bash
$ START_MINIMIZED=true yarn dev
```

## Packaging

To package apps for the local platform:

```bash
$ yarn package
```

To package apps for all platforms:

First, refer to the [Multi Platform Build docs](https://www.electron.build/multi-platform-build) for dependencies.

Then,

```bash
$ yarn package-all
```

To package apps with options:

```bash
$ yarn package --[option]
```

To run End-to-End Test

```bash
$ yarn build-e2e
$ yarn test-e2e

# Running e2e tests in a minimized window
$ START_MINIMIZED=true yarn build-e2e
$ yarn test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:

```bash
DEBUG_PROD=true yarn package
```

## Todo

- [ ] Add Test ...
- [ ] Volume ...
- [ ] Network ...
- [ ] Create Docker Container from DockerHub

## ScreenShots

<div align="center">
<img src="https://raw.githubusercontent.com/crakoucas/Dockertron/master/resources/container.png" width="350px" />
</div>
</br>
<div align="center">
<img src="https://raw.githubusercontent.com/crakoucas/Dockertron/master/resources/logs.png" width="350px" />
</div>

## Thanks to

<div align="center">
<br>
<img src="https://user-images.githubusercontent.com/12294525/44203609-77d50800-a147-11e8-98f0-f2403527abdc.png" width="600px" />

</div>

<br>

[npm-image]: https://img.shields.io/npm/v/electron-react-boilerplate.svg?style=flat-square
[github-tag-image]: https://img.shields.io/github/tag/crakoucas/Dockertron.svg
[github-tag-url]: https://github.com/crakoucas/Dockertron/releases/latest
[travis-image]: https://api.travis-ci.org/crakoucas/Dockertron.svg?branch=master
[travis-url]: https://travis-ci.com/electron-react-boilerplate/electron-react-boilerplate
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/crakoucas/Dockertron?svg=true
[appveyor-url]: https://ci.appveyor.com/project/crakoucas/Dockertron/branch/master
[david_img]: https://img.shields.io/david/crakoucas/Dockertron.svg
[david_site]: https://david-dm.org/crakoucas/Dockertron
[david_img_dev]: https://david-dm.org/crakoucas/Dockertron/dev-status.svg
[david_site_dev]: https://david-dm.org/crakoucas/Dockertron?type=dev
