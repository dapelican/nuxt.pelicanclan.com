---
title: "Nomination, brouillon 2"
description: "Brouillon sur les itérateurs et les générateurs en JavaScript."
created_at: 2026-10-11
locale: fr
visibility: private
category: Programmation
slug: nomination-draft-2
---

# Nomination, brouillon 2

## Sommaire

1. Les itérateurs

## Itérateur

### Définition informelle

C'est un objet qui permet d'itérer sur des valeurs, en mode "séquence" (ordre précis, cadence que l'on maitrise).

```javascript
const president = {
    birth_year: 1917,
    first_name: 'John',
    middle_name: 'Fitzgerald',
    last_name: 'Kennedy',
};

const iterator_for_president = {};

iterator_for_president.next();
// 'John'

iterator_for_president.next();
// 'Fitzgerald'

iterator_for_president.next();
// 'Kennedy'

iterator_for_president.next();
// 1917

iterator_for_president.next();
// undefined
```

```javascript
const array = [1, 2, 3, 4];

const iterator_for_array = {};

iterator_for_array.next();
// 1

iterator_for_array.next();
// 2

iterator_for_array.next();
// 3

iterator_for_array.next();
// 4

iterator_for_array.next();
// undefined
```

### Définition formelle

Un itérateur est un objet qui implémente/suit/respecte le protocole d'itérateur.

C'est un objet qui a une méthode `next()` qui retourne toujours un objet avec 2 propriétés:

- `value`.
- `done`: un booléen qui indique si la dernière valeur de la séquence a été consommée.

```javascript
const president = {
    birth_year: 1917,
    first_name: 'John',
    middle_name: 'Fitzgerald',
    last_name: 'Kennedy',
};

const iterator_for_president = {
    sequence: ['first_name', 'middle_name', 'last_name', 'birth_year'],
    tracker: 0,
    next() {
        return {
            value: president[this.sequence[this.tracker++]],
            done: this.tracker >= this.sequence.length
        }
    }
};

console.log(iterator_for_president.next());
console.log(iterator_for_president.next());
console.log(iterator_for_president.next());
console.log(iterator_for_president.next());
console.log(iterator_for_president.next());
```

```javascript
const array = [1, 2, 3, 4];

const iterator_for_array = {
    tracker: 0,
    next() {
        return {
            value: array[this.tracker++],
            done: this.tracker >= array.length
        }
    }
};

console.log(iterator_for_array.next());
console.log(iterator_for_array.next());
console.log(iterator_for_array.next());
console.log(iterator_for_array.next());
console.log(iterator_for_array.next());
```

## Un générateur

### Définition

Un générateur est object retourné pat une fonction spéciale qui permet de créer simplement des itérateurs.

### Un générateur est un itérateur

```javascript
const president = {
    birth_year: 1917,
    first_name: 'John',
    middle_name: 'Fitzgerald',
    last_name: 'Kennedy',
};

function *presidentGenerator() {
    yield president.first_name;
    yield president.middle_name;
    yield president.last_name;
    return president.birth_year;
};

const president_iterator = presidentGenerator();

console.log(president_iterator.next());
console.log(president_iterator.next());
console.log(president_iterator.next());
console.log(president_iterator.next());
console.log(president_iterator.next());
```

```javascript
const array = [1, 2, 3, 4];

    function *arrayGenerator() {
        yield array[0];
        yield array[1];
        yield array[2];
        return array[3];
    };
    
    const array_iterator = arrayGenerator();
    
    console.log(array_iterator.next());
    console.log(array_iterator.next());
    console.log(array_iterator.next());
    console.log(array_iterator.next());
    console.log(array_iterator.next());
```

### Sans sucre syntaxique

```javascript
const president = {
    birth_year: 1917,
    first_name: 'John',
    middle_name: 'Fitzgerald',
    last_name: 'Kennedy',
};

function presidentGenerator() {
    return {
        tracker: 0,
        sequence: ['first_name', 'middle_name', 'last_name', 'birth_year'],
        next() {
            return {
                value: this.sequence[this.tracker++],
                done: this.tracker >= this.sequence.length,
            };
        },
    };
};

const president_iterator = presidentGenerator();

console.log(president_iterator.next());
console.log(president_iterator.next());
console.log(president_iterator.next());
console.log(president_iterator.next());
console.log(president_iterator.next());
```

```javascript
const array = [1, 2, 3, 4];

function *arrayGenerator1() {
    yield array[0];
    yield array[1];
    yield array[2];
    return array[3];
};

const array_iterator_1 = arrayGenerator1();

// console.log(array_iterator_1.next());
// console.log(array_iterator_1.next());
// console.log(array_iterator_1.next());
// console.log(array_iterator_1.next());
// console.log(array_iterator_1.next());

function arrayGenerator2() {
    return {
        tracker: 0,
        next() {
            return {
                value: array[this.tracker++],
                done: this.tracker >= array.length,
            };
        },
    };
}

const array_iterator_2 = arrayGenerator2();

// console.log(array_iterator_2.next());
// console.log(array_iterator_2.next());
// console.log(array_iterator_2.next());
// console.log(array_iterator_2.next());
// console.log(array_iterator_2.next());
```

### Un générateur est itérable

Un itérable est un object avec lequel on peut itérer en utilisant la boucle `for...of`.

qui a une méthode `*[Symbol.iterator]`
