---
title: "fnm: the basic command lines"
description: "The basic command lines for installing and using fnm, the node version manager."
created_at: 2026-10-11
locale: en
visibility: private
category: Programming
slug: fnm
---

# fnm: the basic command lines

## What is fnm?

fnm (Fast Node Manager) is a [node version manager](/node-versions-managers), i.e. a piece of software that lets us install and switch between different node versions just by typing command lines.

It is presented as a [fast and simple Node.js version manager](https://github.com/Schniz/fnm?tab=readme-ov-file&utm_source=pelicanclan.com&utm_medium=article#--fast-node-manager-fnm----){target="_blank" rel="noopener noreferrer" class="text-primary"}. I confirm that it is.

## Install fnm (Linux Ubuntu)

### 0. Make sure curl and zip packages are installed

```bash
curl --version
```

```bash
zip --version
```

If `curl` or `zip` are not installed yet, you can do so with the following command lines:

```bash
sudo apt install curl
```

```bash
sudo apt install zip
```

### 1. Install

```bash
curl -fsSL https://fnm.vercel.app/install | bash
```

We can make the `curl` options `-fsSL` more explicit like this:

```bash
curl \
--fail \
--silent \
--show-error \
--location \
https://fnm.vercel.app/install | bash
```

By default, the package is installed in:

1. `$XDG_DATA_HOME/fnm`.
2. `$HOME/.local/share/fnm` if the environment variable `$XDG_DATA_HOME` is not defined.

The file `$HOME/.bashrc` is also automatically appended by the install process to provide some configration for `fnm`.

PS: if your username is `pelicanclan`, then `$HOME` is the folder `/home/pelicanclan/`.

To install the package in the folder `$HOME/fnm`:

```bash
cd && curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir "./.fnm"
```

### 2. Check the install

```bash
fnm --version
```

To have more information about the install:

- [fnm installation](https://github.com/Schniz/fnm?tab=readme-ov-file&utm_source=pelicanclan.com&utm_medium=article#installation){target="_blank" rel="noopener noreferrer" class="text-primary"}.

## Upgrade fnm (Linux Ubuntu)

### 1. Check the current version of fnm

```bash
fnm --version
```

### 2. Upgrade to the newest version

```bash
curl -fsSL https://fnm.vercel.app/install | bash -s -- --skip-shell
```

The `--skip-shell` prevents fnm from appending the current shell config file, usually `$HOME/.bashrc`.

Also, you might find weird the lonely double dash (`--`) before `--skip-shell`. It is not a typo. A double dash (`--`) is used in most Bash built-in commands and many other commands to signify the end of command options, after which only positional ("non-option") arguments are accepted.

### 3. Recheck the current version of fnm

```bash
fnm --version
```

## Useful command lines

The [official documentation](https://github.com/Schniz/fnm/blob/master/docs/commands.md?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} is well done.

Here are the useful command lines:

1. `fnm list-remote`: list all remote Node.js versions.
2. `fnm list`: list all locally installed Node.js versions.
3. `fnm install 14`: install the latest Node 14 version (14.21.3).
4. `fnm install 20.14.0`: install the specific Node version 20.14.0.
5. `fnm install --lts`: install the latest LTS (Long-term support) Node version.
6. `fnm use 14`: use the latest Node 14 version installed locally.
7. `fnm use 20.14.0`: use the specific Node version 20.14.0.
8. `fnm default 20.14.0`: make Node version 20.14.0 the default one. This will be the default Node version used when you open a terminal.
9. `fnm current`: print the current Node.js version. It is the same as `node -v`.
10. `fnm uninstall 14.21.3`: uninstall the specific Node version 14.21.3.

## Uninstall fnm (Linux Ubuntu)

1. Delete the `$HOME/.local/share/fnm` folder.
2. Delete all the lines related to fnm in the file `$HOME/.bashrc`. These are usually the last lines of the file.
