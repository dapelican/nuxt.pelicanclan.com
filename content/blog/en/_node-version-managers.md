---
title: "Node.js version managers"
description: "Notes on Node.js version managers and how they switch Node versions."
created_at: 2026-10-11
locale: en
visibility: private
category: Programming
slug: node-version-managers
---

# Node.js version managers

## What is a Node.js Version Manager (nvm)?

Node.js version managers (NVMs), also called "environment managers" or "runtime version managers", are pieces of software (Operating System packages) that allow programmers to install and manage multiple versions of Node.js on their computers or servers.

NVMs are valuable because different projects may need different Node.js versions, and manually switching between versions without dedicated software can be challenging.

NVMs enable us to switch between Node.js versions simply by typing short command lines.

![Node.js Version Manager](/images/node-js-version-manager.png)

## Node.js versions

Some remarks about Node.js versions:

---

1. Node.js uses [Semantic Versioning (SemVer)](https://semver.org/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
2. [Other versioning schemes](https://www.baeldung.com/cs/semantic-versioning?utm_source=pelicanclan.com&utm_medium=article#other-versioning-schemes){target="_blank" rel="noopener noreferrer" class="text-primary"} exist. For instance, [WordPress](https://en.wikipedia.org/wiki/WordPress?utm_source=pelicanclan.com&utm_medium=article#Release_history){target="_blank" rel="noopener noreferrer" class="text-primary"} doesn't use SemVer. Neither do [Windows](https://en.wikipedia.org/wiki/List_of_Microsoft_Windows_versions?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, [Ubuntu](https://en.wikipedia.org/wiki/List_of_Microsoft_Windows_versions?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, nor [mac OS](https://en.wikipedia.org/wiki/MacOS_version_history?utm_source=pelicanclan.com&utm_medium=article#Releases){target="_blank" rel="noopener noreferrer" class="text-primary"}.
3. Here is an overview of [Node.js previous versions](https://github.com/nodejs/release?utm_source=pelicanclan.com&utm_medium=article#release-schedule){target="_blank" rel="noopener noreferrer" class="text-primary"}. Some remarks:

   - A major version has been released each year since 2015.
   - Major versions are even.
   - Major versions also have a codename, which is an element of the [periodic table of elements](https://pubchem.ncbi.nlm.nih.gov/periodic-table/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
   - Major versions are active and maintained for 30 months (active for 12 months and maintained for 18 months).
   - Major versions can have 1 of 5 statuses:

     1. Pending.
     2. Current.
     3. LTS (Long Term Support)/Active.
     4. Maintenance.
     5. End-of-Life.
4. We can have a better presentation of end of lives on [endoflife.date](https://endoflife.date/nodejs?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

## The major packages

There are different NVMs available. Here are the major ones, sorted by their date of creation:

---

- [nvm](https://github.com/nvm-sh/nvm?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} (2014), which stands for "Node Version Manager".
- [n](https://github.com/tj/n?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} (2015). Yes, this is a one-letter name package.
- [nvs](https://github.com/jasongin/nvs?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} (2016), which stands for "Node Version Switcher".
- [Volta](https://volta.sh/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} (2018).
- [fnm](https://github.com/Schniz/fnm?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} (2019), which stands for "Fast Node Manager". This is the [package I use and recommend](/fnm).
- [asdf](https://asdf-vm.com/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} (2021), with the [asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} plugin. This package is different from the previous ones because it can handle runtimes of different programming languages.
