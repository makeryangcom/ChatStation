# NodeChain  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

⚡ Local Large Model For Desktop UI ⚡

## Develop

> Set up the development environment according to the guide below.

### Environment

| Dependent          | Windows | MacOS   |
|--------------------|---------|---------|
| NodeJS             | 18.13.0 | 18.13.0 |
| Python             | 3.10.+  | 3.10.+  |
| Visual Studio 2019 |  ✔      |         |

> When developing on the Windows platform, check the `Desktop development with C++` option when installing `Visual Studio 2019`.

### Install

1、 Install Yarn

```shell
npm install --global yarn
```

2、 Set up the software repository

```shell
yarn config set registry https://registry.npmmirror.com
yarn config set ELECTRON_MIRROR "https://registry.npmmirror.com/-/binary/electron/"
yarn config set "strict-ssl" false -g
```

3、Install Electron

```shell
yarn global add electron@22.2.0
```

### Download

1、 Download the source code and enter the root directory of the project.

```shell
git clone git@github.com:makeryangcom/NodeChain.git
cd NodeChain
```

2、Initialize project dependencies

```shell
yarn
```

### Development mode

```shell
yarn rebuild
```

```shell
yarn build
```

```shell
yarn dev
```

### Build mode

> Compile and package the project as a desktop application.

```shell
# Windows
yarn win64
# MacOS
yarn mac
# Linux
yarn linux
```

## Links & Thank

[https://github.com/ollama/ollama](https://github.com/ollama/ollama)

[https://www.radix-ui.com/icons](https://www.radix-ui.com/icons)

[https://www.shadcn-vue.com](https://www.shadcn-vue.com)

[https://vuejs.org](https://vuejs.org)

[https://vitejs.dev](https://vitejs.dev/)