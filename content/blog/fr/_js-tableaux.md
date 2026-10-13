---
title: "Tableaux JavaScript"
description: "Notes sur la création de tableaux en JavaScript."
created_at: 2026-10-11
locale: fr
visibility: private
category: Programmation
slug: js-tableaux
---

# Tableaux JavaScript

## 1. Notation littérale

```javascript
// Tableau vide
const a = [];
```

```javascript
// Tableau avec 1 élément
const b = [1];

// Tableau avec 3 eléments
const c1 = [1, 2, 3];

// Tableau avec 5 eléments
const c2 = [ 'a', 'b', 'c', 'd', 'e', ];
```

```javascript
// Syntaxe plus simple à lire 1
const c3 = [
  'a',
  'b',
  'c',
  'd',
  'e',
];

// Syntaxe plus simple à lire 2
const c4 = [
  {
      a: 1,
      b: 2,
  },
  {
    c: 3,
    d: 4,
    e: 5,
    f: 6,
  },
  {
    g: 7,
    h: 8,
    i: 9,
  },
];
```

## 2. La fonction Array()

```javascript
// Tableau vide
const d = new Array();
console.log(d); // []
```

```javascript
// Tableau avec 3 éléments
const e = new Array(1, 2, 3);
console.log(e); // [1, 2, 3]
```

```javascript
const f = new Array(5);
console.log(f); // [ , , , , ]
console.log(f.length); // 5

console.log(f[0]); // undefined
console.log(f[50]); // undefined

const g = new Array(1);
console.log(g); // [ ]
console.log(g.length); // 1

const h = new Array('a');
console.log(h); // ['a']

const i = new Array(true);
console.log(i) // [true]
```

## 3. La fonction Array.of()

```javascript
// Tableau vide
const i = Array.of();
console.log(i); // []
```

```javascript
const j = Array.of(1);
console.log(j); // [1]

const k = Array.of('a', 'b', 'c');
console.log(k); // ['a', 'b', 'c']
```

## 4. La fonction Array.from()

```javascript
// Tableau vide
const l = Array.from('');
console.log(l); // []
```

```javascript
const m1 = Array.from('Babar');
console.log(m1); // ['B', 'a', 'b', 'a', 'r']

const m2 = [...'Babar'];
console.log(m2); // ['B', 'a', 'b', 'a', 'r']
```

```javascript
const n1 = Array.from('moon', el => el.toUpperCase());
console.log(n1); // ['M', 'O', 'O', 'N']

const n2 = [...'moon']
           .map((el) => el.toUpperCase());
console.log(n2); // ['M', 'O', 'O', 'N']
```
