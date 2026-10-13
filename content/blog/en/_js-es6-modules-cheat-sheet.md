---
title: "ES6 modules cheat sheet"
description: "Here is my cheatcheet for ES6 modules. There are mainly 5 ways to export bindings in ES6."
created_at: 2026-10-11
locale: en
visibility: private
category: Programming
slug: js-es6-modules-cheat-sheet
---

# ES6 modules cheat sheet

## The 5 ways to export declarations with the ES6 syntax

Here is my cheatcheet for ES6 modules. There are mainly 5 ways to export bindings in ES6. Here they are, from the most flexible to the least flexible:

- [Export a list of declarations at the end of the file](#1) (recommended). Clean and expendable. You can export 1 or several declarations. You can cherry-pick what you need and rename if necessary. Or you can export all declarations with an export list, which has an object-like syntax.
- [Export default an object at the end of the file](#2). Almost as great as the previous way. The code is a bit longer if you want to rename some declarations of the module: you have to use destructuring assignment.
- [Export on the fly](#3). There is some repetition in the exported file (the keyword `export`). Also, if the file is very long, it's not convenient to find the exported declarations. Option 1 has the advantage of centralizing the exported declarations at the end of the file, which makes it easier to know what is exported.
- [Export default 1 declaration at the end of the file](#4). Much less convenient then the previous ways. You can only export 1 declaration.
- [Export default 1 declaration on the fly](#5). The least convenient solution. You can only export 1 declaration, and it can be anywhere in the file.

## 1. Export a list at the end of the file {#1}

### Export

```javascript
// module.js
const name = 'French Montana';
const brand = 'Coke Boys';
const city = 'New York';

export { name, brand, city };
```

### Import 1: cherry-pick and rename if necessary (recommended)

```javascript
// main.js
import { name as artist_name, brand } from './module.js';
console.log(artist_name); // 'French Monatana'
console.log(brand); // 'Coke Boys'
```

### Import 2: import everything as an object

```javascript
// main.js
import * as artist from './module.js';
console.log(artist.name); // 'French Montana'
```

## 2. Export default an object at the end of the file {#2}

### Export

```javascript
// module.js
const name = 'French Montana';
const brand = 'Coke Boys';
const city = 'New York';

export default { name, brand, city };
```

### Import 1: use the initial imported object

```javascript
// main.js
import artist from './module.js';
console.log(artist.name); // 'French Monatana'
```

### Import 2: destructure the imported object and rename if necessary

```javascript
// main.js
import artist from './module.js';

const {
  name: artist_name,
  brand,
} = artist;

console.log(artist_name); // 'French Monatana'
console.log(brand); // 'Coke Boys'
```

## 3. Export on the fly {#3}

```javascript
// module.js
export const name = 'French Montana';
export const brand = 'Coke Boys';
export const city = 'New York';
```

### Import 1: cherry-pick and rename if necessary

```javascript
// main.js
import { name as artist_name, city } from './module.js';
console.log(artist_name); // 'French Montana'
console.log(city); // 'New York'
```

### Import 2: import everything as an object

```javascript
// main.js
import * as artist from './module.js';
console.log(artist.name); // 'French Montana'
```

## 4. Export default a unique declaration at the end of the file {#4}

### Export

```javascript
// module.js
const name = 'French Montana';
const brand = 'Coke Boys';
const city = 'New York';

export default name;
```

### Import a: import the declaration with the same name

```javascript
// main.js
import name from './module.js';
console.log(name); // French Montana
```

### Import b: import and rename the declaration

```javascript
// main.js
import artist_name from './module.js';
console.log(artist_name); // French Montana
```

Note: imports a and b have the same syntax.

## 5. Export default a unique declaration on the fly {#5}

### Export

```javascript
// module.js
export default name = 'French Montana';
const brand = 'Coke Boys';
const name = 'New York';
```

### Import a: import the declaration with the same name

```javascript
// main.js
import name from './module.js';
console.log(name); // French Montana
```

### Import b: import and rename the declaration

```javascript
// main.js
import artist_name from './module.js';
console.log(artist_name); // French Montana
```

Note: imports a and b have the same syntax.

## Other resources

- A consice article with some advice: [Export and Import](https://javascript.info/import-export?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Module Cheatsheet](https://www.samanthaming.com/tidbits/79-module-cheatsheet/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, by Samantha Ming. Good article with:

  1. errors to avoid. For example: `export default` with a variable declaration.
  2. subtleties to understand. For example: an export list is not an object.
- [How to Use ES Modules in Node.js](https://dmitripavlutin.com/ecmascript-modules-nodejs/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}. Goog article if you want to use ES6 modules in Node.js.
- An article about the common dilemna [Export vs Export Default](https://mattshelley.dev/export-vs-export-default/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, by Matt Shelley.
- An opinionated article: [Default Exports in JavaScript Modules Are Terrible](https://www.lloydatkinson.net/posts/2022/default-exports-in-javascript-modules-are-terrible/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- Another opinionated article: [Why we have banned default exports in Javascript and you should do the same](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
