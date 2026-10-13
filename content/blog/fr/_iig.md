---
title: "Itérables, itérateurs et générateurs"
description: "Notes sur les itérables, les itérateurs et les générateurs en JavaScript."
created_at: 2026-10-11
locale: fr
visibility: private
category: Programmation
slug: iig
---

# Itérables, itérateurs et générateurs

## Qu'est-ce qu'un itérable 1 ?

### Ordre précis et prédéfini

Collection avec laquelle on peut itérer, c'est à dire utiliser des valeurs dans un ordre précis et prédéfini. Notion de suite, de séquence.

### Les syntaxes caramélisées

1. En particulier, collection avec laquelle on peut utiliser 3 syntaxes (syntaxes caramélisées):
   1. `for...of`.
   2. `...` et `Array.from()`. Ces 2 syntaxes sont équivalentes et elles permettent de transformer un itérable en tableau.
2. Remarque : la notion d'itérable est décorrélée de la notion d'index.

### Quels sont les itérables en JavaScript ?

#### Les strings

```javascript
'use strict';

const word = 'Hippopotamus';

for (const letter of word) {
    console.log(letter);
}

console.log('---');

const word_array_1 = [...word];
console.log(word_array_1);

console.log('---');

const word_array_2 = Array.from(word);
console.log(word_array_2);
```

#### Les tableaux

```javascript
const album_list = ['Zeit', 'Album #7', 'Liebe ist für alle da'];

for (const album of album_list) {
    console.log(album);
}

console.log('---');

const album_array_1 = [...album_list];
console.log(album_array_1);

console.log('---');

const album_array_2 = Array.from(album_list);
console.log(album_array_2);
```

#### Les Maps

```javascript
const singers_map = new Map([
    ['Tina', 'Turner'],
    ['Frank', 'Sinatra'],
    ['James', 'Brown'],
]);

for (const singer of singers_map) {
    console.log(singer);
}

console.log('---');

const singers_array_1 = [...singers_map];
console.log(singers_array_1);

console.log('---');

const singers_array_2 = Array.from(singers_map);
console.log(singers_array_2);
```

#### Les Sets

```javascript
const nintendo_set = new Set(['Mario', 'Luigi', 'Yoshi']);

for (const character of nintendo_set) {
    console.log(character);
}

console.log('---');

const nintendo_array_1 = [...nintendo_set];
console.log(nintendo_array_1);

console.log('---');

const nintendo_array_2 = Array.from(nintendo_set);
console.log(nintendo_array_2);
```

#### L'objet arguments dans les fonctions

Attention, l'objet arguments n'est pas ue tableau, mais un object similaire à un tableau.

```javascript
const log = function () {
    for (const argument of arguments) {
        console.log(argument);
    }
};

log(1, 2, 3, 4, 5);

const modernLog = (...param_list) => {
    for (const param of param_list) {
        console.log(param);
    }
};

modernLog(1, 2, 3, 4, 5);
```

#### Les NodeLists

```javascript
const h2_list = document.querySelectorAll('h2');

for (const h2 of h2_list) {
    console.log(h2);
}

const h2_array_1 = [...h2_list];
console.log(h2_array_1);

const h2_array_2 = Array.from(h2_list);
console.log(h2_array_2);
```

#### TypedArrays

#### Segments

## Quel est le lien entre itérateur, itérable et générateur ?

1. Un itérateur, un itérable et un générateur sont tous des **objects**. Les noms d'itérateurs et de générateurs peuvent être trompeurs, car on peut penser que ce sont des fonctions.
2. La notion d'itérable est la notion **centrale**. L'itérateur et le générateur sont au service de l'itérable.
3. Notion de gradation : itérateur < itérable < générateur. L'itérateur est un sous-itérable, le générateur est un sur-itérable. itérateur = boite manuelle, générateur = boite automatique. Itérateur = brocoli, générateur = glace ben and jerry's double chocolat noix de pécan.

## Qu'est-ce qu'un itérateur ?

### Définition 1 (informelle)

Un itérateur est un objet qui permet d'itérer sur des valeurs, en mode "séquence", avec :

1. un ordre précis.
2. une cadence que l'on maîtrise, en exécutant une méthode spéciale `next()`.

### Définition 2 (formelle)

Un itérateur est un objet qui implémente/suit/respecte le **protocole d'itérateur**.

C'est un objet qui a une méthode `next()` qui retourne toujours un objet avec 2 propriétés :

- `value`.
- `done`: un booléen qui indique si la dernière valeur de la séquence a été consommée.

#### Syntaxe basique

```javascript
const numbers = {
    five: 5,
    four: 4,
    one: 1,
    three: 3,
    two: 2,
};

const iterator = {
    next() {
        return {
            value: '___',
            done : '____'
        }
    }
};
```

#### Syntaxe 1 (avec le if)

```javascript
/* eslint-disable sort-keys */

'use strict';

const numbers = {
    five: 5,
    four: 4,
    one: 1,
    three: 3,
    two: 2,
};

const iterator_1 = {
    order: ['one', 'two', 'three', 'four', 'five'],
    tracker: 0,
    next() {
        if (this.tracker < this.order.length) {
            return {
                done: false,
                value: numbers[this.order.at(this.tracker++)],
            };
        }

        return {
            done: true,
            value: undefined,
        };
    },
};

for (let idx = 1; idx <= 7; idx += 1) {
    console.log(iterator_1.next());
}
```

#### Syntaxe 2 (sans le if)

```javascript
/* eslint-disable sort-keys */

'use strict';

const numbers = {
    five: 5,
    four: 4,
    one: 1,
    three: 3,
    two: 2,
};

const iterator_2 = {
    order: ['one', 'two', 'three', 'four', 'five'],
    tracker: 0,
    next() {
        return {
            done: this.tracker >= this.order.length,
            value: numbers[this.order.at(this.tracker++)],
        };
    },
};

for (let idx = 1; idx <= 7; idx += 1) {
    console.log(iterator_2.next());
}
```

#### Syntaxe 3 (itérateur dans l'objet)

```javascript
/* eslint-disable sort-keys */

'use strict';

const numbers = {
    five: 5,
    four: 4,
    one: 1,
    three: 3,
    two: 2,
    iterator: {
        order: ['one', 'two', 'three', 'four', 'five'],
        tracker: 0,
        next() {
            return {
                done: this.tracker >= this.order.length,
                value: numbers[this.order.at(this.tracker++)],
            };
        },
    },
};

for (let idx = 1; idx <= 7; idx += 1) {
    console.log(numbers.iterator.next());
}
```

### Remarques

1. Vocabulaire. Un itérateur est **consommé**, car on ne peut itérer qu'une seule fois avec un itérateur.
2. Un itérateur est une sorte de séquence infinie : on peut toujours appeler la méthode `next()`, autant de fois que l'on souhaite.

## Rappel sur les symboles

### Qu'est-ce qu'un symbole ?

1. C'est une valeur unique, qui garantit que les clés d'un objet ne seront pas écrasées par d'autres clés.
2. C'est une valeur privée, une boîte noire. Un symbole utilisé comme clé d'un objet n'apparaît pas dans les méthodes `Object.keys()`, ni dans la boucle `for...in`.

### Comment créer un symbole ?

```javascript
const symbol_1 = Symbol();

const symbol_2 = Symbol();

console.log(symbol_1, symbol_2, symbol_1 === symbol_2);
```

### Comment créer un symbole que l'on pourrait identifier après coup ?

```javascript
const symbol_3 = Symbol('toto');

const symbol_4 = Symbol('toto');

console.log(symbol_3, symbol_4, symbol_3 === symbol_4);
```

### Comment créer un symbole avec une clé unique ?

```javascript
const symbol_5 = Symbol.for('titi');

const symbol_6 = Symbol.for('titi');

console.log(symbol_5, symbol_6, symbol_5 === symbol_6);
```

### Les "Well-known symbols"

Les "Well-known symbols" sont des symboles prédéfinis, qui sont utilisés pour des méthodes spéciales, propre au fonctionnement interne de JavaScript.

## Qu'est-ce qu'un itérable 2 ?

Un itérable est un object qui implémente/suit/respecte le **protocole d'itérable**.

C'est un objet qui a implementé ou a accès à une méthode spéciale : `[Symbol.iterator]` également notée `@@iterator`.

Cette méthode retourne un itérateur.

On peut utiliser la boucle `for...of` pour itérer sur un itérable.

### Syntaxe 1 (avec les this)

```javascript
/* eslint-disable sort-keys */

'use strict';

const numbers = {
    five: 5,
    four: 4,
    one: 1,
    three: 3,
    two: 2,
    [Symbol.iterator]() {
        return {
            order: ['one', 'two', 'three', 'four', 'five'],
            tracker: 0,
            next() {
                return {
                    done: this.tracker >= this.order.length,
                    value: numbers[this.order.at(this.tracker++)],
                };
            },
        };
    },
};

for (const number of numbers) {
    console.log(number);
}
```

### Syntaxe 2 (sans les this)

```javascript
/* eslint-disable sort-keys */

'use strict';

const numbers = {
    five: 5,
    four: 4,
    one: 1,
    three: 3,
    two: 2,
    [Symbol.iterator]() {
        const order = ['one', 'two', 'three', 'four', 'five'];
        let tracker = 0;
        return {
            next() {
                return {
                    done: tracker >= order.length,
                    value: numbers[order.at(tracker++)],
                };
            },
        };
    },
};

for (const number of numbers) {
    console.log(number);
}
```

## Itérateurs itérables

Commencer itérer de différentes façons sur un objet ?

En utilisant des itérateurs itérables.

1. L'itérateur permet de définir l'ordre de l'itération.
2. L'itérable permet d'utiliser les syntaxes caramélisées.

### Code 1 : itérateur non itérable

```javascript
/* eslint-disable sort-keys */

'use strict';

const numbers = {
    five: 5,
    four: 4,
    one: 1,
    three: 3,
    two: 2,
    [Symbol.iterator]() {
        const order = ['one', 'two', 'three', 'four', 'five'];
        let tracker = 0;
        return {
            next() {
                return {
                    done: tracker >= order.length,
                    value: numbers[order.at(tracker++)],
                };
            },
        };
    },
    countdown() {
        const order = ['five', 'four', 'three', 'two', 'one'];
        let tracker = 0;
        return {
            next() {
                return {
                    done: tracker >= order.length,
                    value: numbers[order.at(tracker++)],
                };
            },
        };
    },
};

const iterator = numbers.countdown();

for (let idx = 1; idx <= 7; idx += 1) {
    console.log(iterator.next());
}
```

### Code 2 : itérateur itérable

```javascript
/* eslint-disable sort-keys */

'use strict';

const numbers = {
    five: 5,
    four: 4,
    one: 1,
    three: 3,
    two: 2,
    [Symbol.iterator]() {
        const order = ['one', 'two', 'three', 'four', 'five'];
        let tracker = 0;
        return {
            next() {
                return {
                    done: tracker >= order.length,
                    value: numbers[order.at(tracker++)],
                };
            },
        };
    },
    countdown() {
        const order = ['five', 'four', 'three', 'two', 'one'];
        let tracker = 0;
        return {
            next() {
                return {
                    done: tracker >= order.length,
                    value: numbers[order.at(tracker++)],
                };
            },
        };
    },
    evenOdd() {
        const order = ['two', 'four', 'one', 'three', 'five'];
        let tracker = 0;
        return {
            next() {
                return {
                    done: tracker >= order.length,
                    value: numbers[order.at(tracker++)],
                };
            },
            [Symbol.iterator]() {
                return this;
            },
        };
    },
};

for (const number of numbers.evenOdd()) {
    console.log(number);
}
```

## Qu'est-ce qu'un générateur ?

Un générateur est un (itérateur) itérable créé/retourné par une fonction spéciale.

Fonction spéciale = syntaxe spéciale :

1. `*`.
2. `yield`.

1. La place de l'étoile.
2. Syntaxe qui va par paire. L'un sans l'autre provoque une erreur JavaScript.
3. function declaration et function expression. Pas d'arrow function.

### Syntaxe 1 (function declaration)

```javascript
/* eslint-disable jsdoc/require-jsdoc */

'use strict';

function *generator1() {
    yield 'a';
    yield 'b';
    yield 'c';
};

const generator_1 = generator1();

for (let idx = 1; idx <= 5; idx += 1) {
    console.log(generator_1.next());
}

for (const letter of generator_1) {
    console.log(letter);
}
```

### Syntaxe 2 (function expression)

```javascript
/* eslint-disable func-names */

'use strict';

const generator2 = function *() {
    yield 'a';
    yield 'b';
    yield 'c';
};

const generator_2 = generator2();

for (let idx = 1; idx <= 5; idx += 1) {
    console.log(generator_2.next());
}

for (const letter of generator_2) {
    console.log(letter);
}
```

### Code

```javascript
/* eslint-disable sort-keys */

'use strict';

const numbers = {
    five: 5,
    four: 4,
    one: 1,
    three: 3,
    two: 2,
    [Symbol.iterator]() {
        const order = ['one', 'two', 'three', 'four', 'five'];
        let tracker = 0;
        return {
            next() {
                return {
                    done: tracker >= order.length,
                    value: numbers[order.at(tracker++)],
                };
            },
        };
    },
    *countdown() {
        yield this.five;
        yield this.four;
        yield this.three;
        yield this.two;
        yield this.one;
    },
    *evenOdd() {
        yield this.two;
        yield this.four;
        yield this.one;
        yield this.three;
        yield this.five;
    },
};

for (const number of numbers.countdown()) {
    console.log(number);
}
```

## Les générateurs dans les objets standards

| Type | `[Symbol.iterator]()` | keys() | values() | entries() |
| --- | --- | --- | --- | --- |
| String | ✅ | ❌ | ❌ | ❌ |
| Array | values() | ✅ | ✅ | ✅ |
| Map | entries() | ✅ | ✅ | ✅ |
| Set | values() | ✅ | ✅ | ✅ |
