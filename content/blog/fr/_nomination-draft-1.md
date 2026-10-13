---
title: "Nomination, brouillon 1"
description: "Brouillon sur les itérateurs et les générateurs en JavaScript."
created_at: 2026-10-11
locale: fr
visibility: private
category: Programmation
slug: nomination-draft-1
---

# Nomination, brouillon 1

## Sommaire

1. Le problème
2. Les itérateurs
3. Fonctions pour créer des itérateurs
4. Les générateurs
5. Les générateurs dans les objects
6. Itérables, générateur par défaut, boucles for...of
7. Les itérateurs itérables
8. L'itérateur par défaut dans les objects standards
9. Les autres itérateurs dans les objets standards
10. La syntaxe spread

## 1. Le problème

```javascript
const array = [1, 2, 3, 4];

for (let i = 0; i < array.length; i += 1) {
  console.log(array[i]);
}
```

```javascript
const array = [1, 2, 3, 4];

array.forEach((value) => console.log(value));
```

```javascript
const array = [1, 2, 3, 4];

for (let i = array.length - 1; i >= 0; i -= 1) {
  console.log(array[i]);
}
```

```javascript
const array = [1, 2, 3, 4];

array.forEach((__, index, array) => console.log(array[array.length -1 - index]));
```

## 2. Les itérateurs

```javascript
// ES5
var letters = ['a', 'b', 'c'];

var iterator_for_letters = {
  tracker: 0,
  next: function() {
    return {
      done: this.tracker >= letters.length,
      value: letters[this.tracker++],
    };
  }
};

console.log(iterator_for_letters.next());
// { done: false, value: 'a' }

console.log(iterator_for_letters.next());
// { done: false, value: 'b' }

console.log(iterator_for_letters.next());
// { done: false, value: 'c' }

console.log(iterator_for_letters.next());
// { done: true, value: undefined }
```

```javascript
// ES6
const letters = ['a', 'b', 'c'];

const iterator_for_letters = {
  tracker: 0,
  next() {
    return {
      done: this.tracker >= letters.length,
      value: letters[this.tracker++],
    };
  }
};

console.log(iterator_for_letters.next());
// { done: false, value: 'a' }

console.log(iterator_for_letters.next());
// { done: false, value: 'b' }

console.log(iterator_for_letters.next());
// { done: false, value: 'c' }

console.log(iterator_for_letters.next());
// { done: true, value: undefined }
```

## 3. Fonctions pour créer des itérateurs

```javascript
const letters = ['a', 'b', 'c'];
const numbers = [1, 2, 3, 4];

function createIterator(array) {
  return {
    tracker: 0,
    next() {
      return {
        done: this.tracker >= array.length,
        value: array[this.tracker++],
      };
    }
  };
};

const iterator_for_letters = createIterator(letters);

console.log(iterator_for_letters.next());
// { done: false, value: 'a' }

console.log(iterator_for_letters.next());
// { done: false, value: 'b' }

console.log(iterator_for_letters.next());
// { done: false, value: 'c' }

console.log(iterator_for_letters.next());
// { done: true, value: undefined }

const iterator_for_numbers = createIterator(numbers);

console.log(iterator_for_numbers.next());
// { done: false, value: 1 }

console.log(iterator_for_numbers.next());
// { done: false, value: 2 }

console.log(iterator_for_numbers.next());
// { done: false, value: 3 }

console.log(iterator_for_numbers.next());
// { done: false, value: 4 }

console.log(iterator_for_numbers.next());
// { done: true, value: undefined }
```

```javascript
const letters = ['a', 'b', 'c'];
  const numbers = [1, 2, 3, 4];
  
  function simplifiedCreateIterator(array) {
    let tracker = 0;
    return {
      next() {
        return {
          done: tracker >= array.length,
          value: array[tracker++],
        };
      }
    };
  };
  
  const iterator_for_letters = simplifiedCreateIterator(letters);
  
  console.log(iterator_for_letters.next());
  // { done: false, value: 'a' }
  
  console.log(iterator_for_letters.next());
  // { done: false, value: 'b' }
  
  console.log(iterator_for_letters.next());
  // { done: false, value: 'c' }
  
  console.log(iterator_for_letters.next());
  // { done: true, value: undefined }
  
  const iterator_for_numbers = simplifiedCreateIterator(numbers);
  
  console.log(iterator_for_numbers.next());
  // { done: false, value: 1 }
  
  console.log(iterator_for_numbers.next());
  // { done: false, value: 2 }
  
  console.log(iterator_for_numbers.next());
  // { done: false, value: 3 }
  
  console.log(iterator_for_numbers.next());
  // { done: false, value: 4 }
  
  console.log(iterator_for_numbers.next());
  // { done: true, value: undefined }
```

## 4. Les générateurs

```javascript
function *superHero() {
  yield 1;
  yield 2;
  yield 3;
}

const batman = superHero();

console.log(batman.next());
console.log(batman.next());
console.log(batman.next());
console.log(batman.next());
console.log(batman.next());
```

```javascript
// Function declaration
const integers = [4, 5, 6];

function *createIterator(array) {
  for (let i = 0; i < array.length; i += 1) {
    yield array[i];
  }
}

const iterator_for_integers = createIterator(integers);

console.log(iterator_for_integers.next());
// { value: 4, done: false }

console.log(iterator_for_integers.next());
// { value: 5, done: false }

console.log(iterator_for_integers.next());
// { value: 6, done: false }

console.log(iterator_for_integers.next());
// { value: undefined, done: true }
```

```javascript
// Function expression
const integers = [4, 5, 6];

const createIterator = function *(array) {
  for (let i = 0; i < array.length; i += 1) {
    yield array[i];
  }
}

const iterator_for_integers = createIterator(integers);

console.log(iterator_for_integers.next());
// { value: 4, done: false }

console.log(iterator_for_integers.next());
// { value: 5, done: false }

console.log(iterator_for_integers.next());
// { value: 6, done: false }

console.log(iterator_for_integers.next());
// { value: undefined, done: true }
```

## 5. Les générateurs dans les objects

```javascript
// Syntax 1
const afl = {
  first_name: 'Aretha',
  last_name: 'Franklin',
  middle_name: 'Louise',
  createIterator: function *() {
    yield this.first_name;
    yield this.middle_name;
    yield this.last_name;
  }
};

const afl_names = afl.createIterator();

console.log(afl_names.next().value); // 'Aretha'
console.log(afl_names.next().value); // 'Louise'
console.log(afl_names.next().value); // 'Franklin'
```

```javascript
// Syntax 2 -  with concise method
const rfr = {
  first_name: 'Ricky',
  last_name: 'Ross',
  nickname: 'Freeway',
  *createIterator() {
    yield this.first_name;
    yield this.nickname;
    yield this.last_name;
  }
};

const rfr_names = rfr.createIterator();

console.log(rfr_names.next().value); // 'Ricky'
console.log(rfr_names.next().value); // 'Freeway'
console.log(rfr_names.next().value); // 'Ross'
```

## 6. Itérables, générateur par défaut, boucles for...of

```javascript
// Syntax 1
const afl = {
  first_name: 'Aretha',
  last_name: 'Franklin',
  middle_name: 'Louise',
  [Symbol.iterator]: function *() {
    yield this.first_name;
    yield this.middle_name;
    yield this.last_name;
  }
};

for (let name of afl) {
  console.log(name);
}

// Syntax 2 -  with concise method
const rfr = {
  first_name: 'Ricky',
  last_name: 'Ross',
  nickname: 'Freeway',
  *[Symbol.iterator]() {
    yield this.first_name;
    yield this.nickname;
    yield this.last_name;
  }
};

for (let name of rfr) {
  console.log(name);
}
```

## 7. Les itérateurs itérables

```javascript
function *generator() {
  yield 'a';
  yield 'b';
  yield 'c';
}

const iterator = generator();

for (let letter of iterator) {
  console.log(letter);
}
```

```javascript
const solar_system = {
  planets: [
    {
      name: "Earth",
      diameter: 12742,
      distanceToSun: 149.6,
      mass: 5.97,
    },
    {
      name: "Jupiter",
      diameter: 139820,
      distanceToSun: 778.5,
      mass: 1898,
    },
    {
      name: "Mars",
      diameter: 6779,
      distanceToSun: 227.9,
      mass: 0.642,
    },
    {
      name: "Mercury",
      diameter: 4879,
      distanceToSun: 57.91,
      mass: 0.33
    },
    {
      name: "Neptune",
      diameter: 49244,
      distanceToSun: 4495.1,
      mass: 102,
    },
    {
      name: "Saturn",
      diameter: 116460,
      distanceToSun: 1429.0,
      mass: 568,
    },
    {
      name: "Uranus",
      diameter: 50724,
      distanceToSun: 2871.0,
      mass: 86.8,
    },
    {
      name: "Venus",
      diameter: 12104,
      distanceToSun: 108.2,
      mass: 4.87,
    }
  ],
  *aToZ() {
    const sorted_planets = this.planets
      .sort((a, b) => a.name.localeCompare(b.name));
    for (const planet of sorted_planets) {
      yield planet;
    }
  },
  *zToA() {
    const sorted_planets = this.planets
      .sort((a, b) => b.name.localeCompare(a.name));
    for (const planet of sorted_planets) {
      yield planet;
    }
  },
  *byIncreasingMass() {
    const sorted_planets = this.planets
      .sort((a, b) => a.mass - b.mass);
    for (const planet of sorted_planets) {
      yield planet;
    }
  },
  *byIncreasingDiameter() {
    const sorted_planets = this.planets
      .sort((a, b) => a.diameter - b.diameter);
    for (const planet of sorted_planets) {
      yield planet;
    }
  },
};

for (let planet of solar_system.aToZ()) {
  console.log(planet.name);
}

console.log('-----');

for (let planet of solar_system.zToA()) {
  console.log(planet.name);
}

console.log('-----');

for (let planet of solar_system.byIncreasingMass()) {
  console.log(planet.name, planet.mass);
}

console.log('-----');

for (let planet of solar_system.byIncreasingDiameter()) {
  console.log(planet.name, planet.diameter);
}
```

```javascript
const solar_system = {
  planets: [
    {
      name: "Earth",
      diameter: 12742,
      distanceToSun: 149.6,
      mass: 5.97,
    },
    {
      name: "Jupiter",
      diameter: 139820,
      distanceToSun: 778.5,
      mass: 1898,
    },
    {
      name: "Mars",
      diameter: 6779,
      distanceToSun: 227.9,
      mass: 0.642,
    },
    {
      name: "Mercury",
      diameter: 4879,
      distanceToSun: 57.91,
      mass: 0.33
    },
    {
      name: "Neptune",
      diameter: 49244,
      distanceToSun: 4495.1,
      mass: 102,
    },
    {
      name: "Saturn",
      diameter: 116460,
      distanceToSun: 1429.0,
      mass: 568,
    },
    {
      name: "Uranus",
      diameter: 50724,
      distanceToSun: 2871.0,
      mass: 86.8,
    },
    {
      name: "Venus",
      diameter: 12104,
      distanceToSun: 108.2,
      mass: 4.87,
    }
  ],
  *[Symbol.iterator]() {
    const sorted_planets = this.planets
      .sort((a, b) => a.name.localeCompare(b.name));
    for (const planet of sorted_planets) {
      yield planet;
    }
  },
  *zToA() {
    const sorted_planets = this.planets
      .sort((a, b) => b.name.localeCompare(a.name));
    for (const planet of sorted_planets) {
      yield planet;
    }
  },
  *byIncreasingMass() {
      const sorted_planets = this.planets
        .sort((a, b) => a.mass - b.mass);
      for (const planet of sorted_planets) {
        yield planet;
      }
    },
  *byIncreasingDiameter() {
    const sorted_planets = this.planets
      .sort((a, b) => a.diameter - b.diameter);
    for (const planet of sorted_planets) {
      yield planet;
    }
  },
};

for (let planet of solar_system) {
  console.log(planet.name);
}
```

## 8. L'itérateur par défaut dans les objects standards

```javascript
const array = [1, 2, 3];

const iterator = array[Symbol.iterator]();

console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
```

```javascript
const array = [1, 2, 3];

function isIterable(object) {
  return typeof object[Symbol.iterator] === 'function';
}

console.log(isIterable(array)); // true
```

## 9. Les autres itérateurs dans les objets standards

```javascript
// entries()
const array = [1];

const map = new Map([
  [2, 'two']
]);

const set = new Set([3]);

for (let entry of array.entries()){
  console.log(entry);
};
// [0, 1]

for (let entry of map.entries()){
  console.log(entry);
};
// [2, 'two']

for (let entry of set.entries()){
  console.log(entry);
};
// [3, 3]
```

```javascript
// values()
const array = [1];

const map = new Map([
  [2, 'two']
]);

const set = new Set([3]);

for (let value of array.values()){
  console.log(value);
};
// [1]

for (let value of map.values()){
  console.log(value);
};
// ['two']

for (let value of set.values()){
  console.log(value);
};
// [3]
```

```javascript
// keys()
const array = [1];

const map = new Map([
  [2, 'two']
]);

const set = new Set([3]);

for (let key of array.keys()){
  console.log(key);
};
// [0]

for (let key of map.keys()){
  console.log(key);
};
// [2]

for (let key of set.keys()){
  console.log(key);
};
// [3]
```

## 10. La syntaxe spread

```javascript
const solar_system = {
planets: [
  {
    name: "Earth",
    diameter: 12742,
    distanceToSun: 149.6,
    mass: 5.97,
  },
  {
    name: "Jupiter",
    diameter: 139820,
    distanceToSun: 778.5,
    mass: 1898,
  },
  {
    name: "Mars",
    diameter: 6779,
    distanceToSun: 227.9,
    mass: 0.642,
  },
  {
    name: "Mercury",
    diameter: 4879,
    distanceToSun: 57.91,
    mass: 0.33
  },
  {
    name: "Neptune",
    diameter: 49244,
    distanceToSun: 4495.1,
    mass: 102,
  },
  {
    name: "Saturn",
    diameter: 116460,
    distanceToSun: 1429.0,
    mass: 568,
  },
  {
    name: "Uranus",
    diameter: 50724,
    distanceToSun: 2871.0,
    mass: 86.8,
  },
  {
    name: "Venus",
    diameter: 12104,
    distanceToSun: 108.2,
    mass: 4.87,
  }
],
*[Symbol.iterator]() {
  const sorted_planets = this.planets
    .sort((a, b) => a.name.localeCompare(b.name));
  for (const planet of sorted_planets) {
    yield planet.name;
  }
},
};

console.log(...solar_system);
```

[https://www.squash.io/understanding-javascript-generators-and-iterators/](https://www.squash.io/understanding-javascript-generators-and-iterators/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}
