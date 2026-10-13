---
title: "My notes on Understanding ECMAScript 6 by Nicholas C. Zakas"
description: "Understanding ECMAScript 6 is a complete book that lists all the changes and novelties brought by ECMAScript 6 or ES6."
created_at: 2026-10-11
locale: en
visibility: private
category: Programming
slug: zakas-js-es6
---

# My notes on Understanding ECMAScript 6 by Nicholas C. Zakas

## Details

- Title: Understanding ECMAScript 6
- Author: Nicholas C. Zakas

  - Website: [Human Who Codes](https://humanwhocodes.com/blog/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}
  - Twitter: [@slicknet](https://twitter.com/slicknet?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}
- Year of publication: 2016
- Length: 311 pages
- Links:

  - [No Starch Press](https://nostarch.com/ecmascript6?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}
  - [Leanpub](https://leanpub.com/understandinges6?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}

## General comments

*Understanding ECMAScript 6* is a complete book that lists all the changes and novelties brought by ECMAScript 6 or ES6. There were many of them, and Nicholas categorized them by themes, one theme per chapter.

Some chapters can be very dense, because of the volume of the ES6 features, and also because of the complexity of some topics. By reading this book, I discovered concepts that I had never heard of before, even if they are not necessarily useful ones.

I've reviewed the book chapter by chapter. But this doesn't do justice to Nicholas' book. I've written mostly about things that I learnt or found interesting, while simply mentionning, listing or even ignoring others. So these notes are personal and biased, be aware of that. I also add personal things, that I not mentionned in Nicholas' book.

## Chapter 1: block bindings

A binding is the formal name of a variable. It is an identifier (or name), **bound** to a value within a scope.

`let` and `const` are introduced to fix an abnormal behavior of bindings in JavaScript compared to other C-based languages. I assume that Nicholas refers to [these languages](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} when he talks about C-based languages. Normally, bindings are block-scoped (or lexically-scoped).

But instead, in JavaScript, `var` is function-scoped or globally-scoped. It is also hoisted, which adds more confusion and "abnormality". The new keywords `let` and `const` fix this issue.

The best practice in regards to `let` and `const` is to use by default `const`, and to use `let` only when a new value must be reassigned to an existing variable.

In this chapter, Nicholas also details:

- how `let` and `const` work.
- what is the temporal dead zone (or TDZ). This is a theoric but unofficial concept to explain why variables declared with `let` and `const` are not accessible before their declaration. You can read a clear explanation if this [here](https://www.freecodecamp.org/news/javascript-temporal-dead-zone-and-hoisting-explained/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- why `let` and `const` simplify the use of functions in loops. Hint: no need to use immediately invoked function expression (IIFE) anymore.

## Chapter 2: strings and regular expressions

### Unicode

ES6 introduces the support of code points, which is essential in representing Unicode characters. A Unicode character is formally called a code point.

JavaScript uses the UTF-16 encoding format. The encoding format specifies the number of bits of code units. In UTF-16, a code unit is 16-bits long, i.e. has 16 binary digits (0 or 1). As a consequence, in UTF-16, a Unicode character (or a code point) can be represented either by one 16-bit code unit, or by two 16-bits code units (called surrogate pairs).

The first 2<sup>16</sup> Unicode characters (or code points) can be represented by one code unit. This first range of characters is called the basic multilingual plane (BMP). The BPM has exactly 65,536 characters (2<sup>16</sup>).

Beyond this range, any Unicode character requires two code units to be represented. Those characters, represented by 32 bits (2 code units of 16 bits each), are categorized in different arbitrary ranges called supplementary planes.

By default, the string methods in JavaScript only take into account code units, which can lead to surprising results. In particular, a code point represented by two code units has a length of 2 in JavaScript, even if visually for us, humans, it is supposed to have a length of 1.

Nicholas gives the following example: `let text = "𠮷";`. The Unicode character 𠮷 is represented by surropagate pairs, i.e. 2 code units. `console.log(text.length);` prints `2` to the screen.

Moreover, none of the existing methods in ES5, `String.prototype.charAt()` and `String.prototype.charCodeAt()` can handle properly the use case of Unicode characters belonging to supplementary planes.

That's why ES6 introduces novelties to fully support UTF-16:

- The method `String.prototype.codePointAt()`. This method is useful to determine if a character is represented by one or two code units.
- The method `String.fromCodePoint()`. This method returns the Unicode character from a decimal code point (expressed in base-10).
- The method `String.prototype.normalize()`. Normalization is out of scope of the book.
- The `u` flag for regular expressions. When the `u` flag is used, JavaScript matches code points instead of code units.

### Unicode is confusing

By reading the previous section of the book and by doing additional research, I realized that Unicode is quite complex and tricky. What is confusing is the numerous ways of representing a Unicode character, depending on the context. For instance, a Unicode character can be represented:

- as one character for humans: 𠮷.
- as one Unicode code point, in hexadecimal: U+20BB7. The 'U+' is a prefix to indicate that the sequence is a Unicode code point in hexadecimal.
- as one "human" code point in JavaScript: `'𠮷'`. JavaScript uses the UTF-16 encoding format, so, under the hood, the value of the character `'𠮷'` is stored as 2 code units (see below).
- as one Unicode hexadecimal code point in JavaScript: `'\u{20bb7}'`. The `'\u'` with brackets is a specific escape sequence used with Unicode hexadecimal code points.
- as one decimal or base-10 code point: 134071. In JavaScript, this code point is returned by `String.prototype.codePointAt()`, when applied to the **first** code unit. Warning: trickyness alert (with DJ Khaled's voice). This decimal code point is used to represent the character in HTML like this: `&#134071;`.
- as two hexadecimal numbers (code units) in UTF-16: 0xD842 0xDFB7. Note that the '0x' is a prefix to indicate that the sequence is an hexadecimal number.
- as a string of 2 hexadecimal code units in JavaScript: `'\uD842\uDFB7'` The `'\u'` is an escape sequence to indicate a 4 hexadecimal-digit code unit.
- as two decimal or base-10 code units in UTF-16: 55362 57271. These 2 numbers are returned by the ES5 method `String.prototype.charCodeAt()`.

I would like to mention 2 convenient sites while exploring Unicode:

- [A database with all Unicode code points](https://codepoints.net/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [A practical site to convert hexadecimal to decimal](https://www.rapidtables.com/convert/number/hex-to-decimal.html?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

It's important to remember that JavaScript primarily works with code units, and not code points. What we see is not what we get.

### New String methods

ES6 introduces 4 new String methods:

- `String.prototype.includes()`.
- `String.prototype.startsWith()`.
- `String.prototype.endsWith()`.
- `String.prototype.repeat()`.

### Regular expressions

ES6 brings:

- The `y` flag. The `y` flag is uselful when we use the native `lastIndex` property of a regular expression. [Very specific use case](https://stackoverflow.com/questions/4542304/what-does-regex-flag-y-do?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- The abilty to use the RegExp constructor function to duplicate and modify the flag of another regular expression. This wasn't possible in ES5.

  ```javascript
  const regex_1 = /abc/i;
  const regex_2 = new RegExp(regex_1, 'g');
  console.log(regex_2); // /abc/g
  ```
- An additonal `flags` property to fetch the flags of a regular expression. Now, in ES6, a regular expression has 2 native properties: `source` and `flags`.

  ```javascript
  const regex = /abc/gi;
  console.log(regex.source); // 'abc'
  console.log(regex.flags); // 'gi'
  ```

Last, Nicholas details the template literals, which allow 3 features:

- multiline strings.
- String interpolation or substitution mechanism, with the syntax `${...}`.
- [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals?utm_source=pelicanclan.com&utm_medium=article#tagged_templates){target="_blank" rel="noopener noreferrer" class="text-primary"}.

## Chapter 3: functions

### Default parameters

ES6 introduces default parameters for functions. I wasn't aware that a default paramater could use an expression including the previous parameters:

```javascript
function print(a = 1, b = 2, c = a + b) {
  console.log(c);
}

print(); // 3
print(2, 2); // 4
```

A default parameter can also be any value in JavaScript, including a function:

```javascript
function getValue() {
  return 2;
}

function print(a = 1, b = getValue()) {
  console.log(a + b);
}

print(); // 3
print(2, 2); // 4
```

### 3 dots syntax

ES6 introduces the [3 dots syntax](/js-3-dots) with 2 cases related to functions:

- The [rest parameter](/js-3-dots#rest).
- The [spread syntax](/js-3-dots#rest) or spread operator as Nicholas names it in his book, even though it is not an operator.

### Function name property

ES6 adds a native name property to all functions.

```javascript
function funky() {
  return 1;
}

console.log(funky.name); // 'funky'
```

### Arrow functions

Arrow functions are a major feature of ES6. No need to detail them here.

## Chapter 4: expanded object functionality

ES6 introduces the following object-related features.

### 1. Property initializer shorthand

```javascript
// without property initializer shorthand
function createBeaver1(name, age) {
  return {
    name: name,
    age: age,
  };
}

// with property initializer shorthand
function createBeaver2(name, age) {
  return {
    name,
    age,
  };
}
```

### 2. Consise methods

```javascript
// without concise method
const object_1 = {
  sayHello: function() {
    console.log('Hello');
  }
};

// with concise method
const object_2 = {
  sayHello() {
    console.log('Hello');
  }
};
```

### 3. Computed property names

```javascript
const suffix = '_name';

const person = {
  [`first${suffix}`]: 'John',
  [`last${suffix}`]: 'Doe',
};

console.log(person); // { first_name: 'John', last_name: 'Doe' }
```

### 4. The new Object.is() method

The `Object.is()` method is similar to using the `===` operator, except that it handles correctly 2 edge cases:

```javascript
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
```

### 5. The new Object.assign() method

```javascript
console.log(Object.assign({}, { a: 1 }, { b: 2 })); // { a: 1, b: 2 }
console.log(Object.assign({ a: 1 }, { b: 2 }, { b: 3 })); // { a: 1, b: 3 }
```

I think it's more elegant to use the spread syntax instead of the `Object.assign()` method:

```javascript
console.log({
  ...{ a: 1 },
  ...{ b: 2 }
});

console.log({
  ...{ a: 1 },
  ...{ b: 2 },
  ...{ b: 3 }
});
```

### 6. The new Object.setPrototypeOf() method

```javascript
const cat = {
  makeSound() {
    console.log('Meow!');
  },
};

const dog = {
  makeSound() {
    console.log('Woof!');
  },
};

const animal = Object.create(cat);
animal.makeSound(); // 'Meow!'
Object.setPrototypeOf(animal, dog);
animal.makeSound(); // 'Woof!''
```

In the previous code, the object `animal` is created by using `Object.create(cat)`. Therefore, `cat` is the prototype of `animal`. Then, we are able to change the prototype of `animal` to `dog`, thanks the method `Object.setPrototypeOf()`. This change is reflected in what the `makeSound()` function prints.

### 7. The super keyword in concise methods

```javascript
const duck = {
  getSound() {
    return 'Quack!';
  },
};

const cow = {
  getSound() {
    return 'Moo!';
  },
};

const animal_1 = {
  getSound() {
    return Object.getPrototypeOf(this).getSound.call(this);
  }
};

Object.setPrototypeOf(animal_1, duck);
console.log(animal_1.getSound()); // 'Quack!'

const animal_2 = {
  getSound() {
    return super.getSound.call(this);
  }
};

Object.setPrototypeOf(animal_2, cow);
console.log(animal_2.getSound()); // 'Moo!'

const animal_3 = {
  getSound: function() {
    return super.getSound.call(this); // throws a SyntaxError
  }
};
```

## Chapter 5: destructuring for easier data access

Excellent chapter regarding destructuring. Nicholas highlights some edge cases regarding the syntax that are worth knowing. I've created 2 exercises for them:

---

- [Values and variables 08: what's new?](/js-basics/d#values-and-variables-08)
- [Values and variables 09: who am I?](/js-basics/d#values-and-variables-09)

## Chapter 6: symbols and symbols properties

### The Symbol() constructor

Symbols are a new primitive type. Unlike other primitive types, symbols don't have a literal form. We can create symbols by using the `Symbol()` function. It is highly recommented to create Symbols with a description as an argument, so that we can tell easily what they represent.

```javascript
const eminem = Symbol();
console.log(eminem); // Symbol()

const nicki = Symbol('Nicki');
console.log(nicki); // Symbol(Nicki)
```

Nicholas doesn't mention it, but the `Symbol()` function always return a **unique** value, even if this value is a black box.

Symbols are similar to [Universally Unique Identifiers](https://en.wikipedia.org/wiki/Universally_unique_identifier?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} (UUIDs), except that the uniqueness of symbols is guaranteed by an internal registry, which is not the case for UUIDs.

One caveat of the `Symbol()` function is that we can create different symbols with the same description:

```javascript
const bruce_1 = Symbol('Bruce');
const bruce_2 = Symbol('Bruce');
console.log(bruce_1); // Symbol(Bruce)
console.log(bruce_2); // Symbol(Bruce)
console.log(bruce_1 === bruce_2) // false
```

The `bruce_1` and `bruce_2` symbols may look the same (be equal), but they aren't.

### The Symbol.for() method

It is possible to create symbols with unique descriptions (key) by calling the `Symbol.for()` function. Each time this function is called, the JavaScript engine checks in a global registry if a symbol with the same key (description) already exists. If it does, the existing symbol is used, otherwise a new one is created.

```javascript
const city_1 = Symbol('City');

const obj = {
  [city_1]: 'London',
};

console.log(obj[city_1]); // London

const city_2 = Symbol('City');

console.log(obj[city_2]); // undefined
```

In the previous code, `city_1` and `city_2` are 2 different symbols with the same description `'City'`.

```javascript
const city_1 = Symbol.for('City');

const obj = {
  [city_1]: 'Tokyo',
};

console.log(obj[city_1]); // Tokyo'

const city_2 = Symbol.for('City');

console.log(obj[city_2]); // Tokyo'
```

In the previous code, `city_1` and `city_2` reference the same symbol, so they are interchangeable. Symbols created with `Symbol.for()` are called shared symbols, because they are "shared" across the whole codebase. They are unique at the level of the codebase.

Symbols cannot be coerced into strings or numbers. JavaScript throws an error in these cases:

```javascript
const madonna = Symbol.for('Madonna');
const text = `${madonna} sings`; // TypeError

const one = Symbol.for('1');
const two = one + 1; // TypeError
```

### The Object.getOwnPropertySymbols() method

The `Object.keys()` and `Object.getOwnPropertyNames()` methods cannot retrieve symbol properties. That's why the new method `Object.getOwnPropertySymbols()` was introduced.

```javascript
let planet_name = Symbol.for('planet_name');

const uranus = {
  [planet_name]: 'Uranus',
};

console.log(Object.keys(uranus )); // []
console.log(Object.getOwnPropertyNames(uranus)); // []
console.log(Object.getOwnPropertySymbols(uranus)); // [Symbol(planet_name)]
```

### Internal operations with well-known symbols

ESt 6 has predefined symbols called well-known symbols that represent common behaviors in JavaScript that were previously considered internal-only operations. Each well-known symbol is represented by a property on the `Symbol` object.

In other words, the `Symbol` object in JavaScript is kind of a "junk yard" to centralize all properties that are usesd internally by JavaScript and that cannot be stored anywhere else.

Nicholas details several of these well-known symbols in the book. This seems repetitive and not that useful to have notes about this part here.

That is why Symbols are rarely used in actual code. There were mainly created for internal JavaScript purposes.

## Chapter 7: Sets and Maps

Clear chapter about the new collections introduced by ES6: sets and maps. In a nutshell:

---

- Sets are ordered list of unique values (without duplicates).
- Maps are ordered key-value pairs.

Personal advice: to become familiar with these new structures, try to use them whenever you can in your code instead of using arrays and objects.

Some useful pages to learn about sets and maps:

- [Sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Maps](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

## Chapter 8: iterators and generators

### The problem

If we want to iterate through an array, we will use a traditionnal `for` loop, just like this:

```javascript
const array = [1, 2, 3, 4];

for (let i = 0; i < array.length; i += 1) {
  console.log(array[i]);
}
```

This approach is problematic because it forces us to manipulate the error-prone notion of index, even when we are just interested in getting the values contained by the array in the right order, regardless of their specific index.

Iterators are meant to solve this problem.

### Iterators

An iterator is a special object used to iterate through another object, without having to track manually some index or position whatsoever.

An iterator object must have a `next()` method. The `next()` method itself returns an object with 2 properties:

---

- `value`, which is the value of the current iteration.
- `done`, which is a Boolean that is `true` when the iteration is over, i.e. there is no more relevant values to return.

Iterators are not a ES6 novelty. It was possible to create iterators in ES5. Let's see an example of an iterator to iterate over an array in ES5:

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

As we can see, by calling `iterator_for_letters.next()`, we are able to get an object that reflects which iteration we are at. This is what the `value` property indicates.

Here is the equivalent code in ES6:

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

### Functions to create iterators

Now the iterator we created previously can only be used for one specific array. We could create a function that creates an appropriate iterator for any array:

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

The previous function `createIterator()` can also be simplified, by removing the `this.tracker`:

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

### Generators

Having to declare a function to create iterators can be tedious. That's why ES6 introduces a new type of functions called generators.

As their name indicate, generators are functions that generate (or create) iterators. Generator functions are differentiated from other JavaScript functions by the use of special syntax: the `*` character. They also use the special keyword `yield`.

Let's create an iterator for an array by using a generator.

```javascript
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

It is also possible to declare a generator function by using a function expression like this:

```javascript
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

It is worth noting that:

---

- The `*` character always goes after the `function` keyword. It doesn't matter if the star is directly next to function or if there's some whitespace between it and the `*` character.
- The `yield` keyword can only go inside **non-nested** generator functions. In other words, generator functions cannot nest other generator functions. Otherwise, a syntax error is thrown when trying to execute the code.
- A generator function cannot be created with the arrow syntax.

### Generators in objects

It is possible to declare a generator function inside an object. There are 2 possible syntaxes:

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

### Iterables, default generator, for...of loops

An iterable is an object with a `Symbol.iterator` generator method. The "well-known" symbol `Symbol.iterator` names a default method that returns an iterator for the current object.

`Symbol.iterator` is a static property of the `Symbol()` constuctor. It acts like a constant in JavaScript. It is a Symbol, and since there no literal form for it, it is usually referred to with the double @ syntax like this: `@@iterator`.

The main advantage of iterables is that they can be used with a `for...of` loop.

If we come back to our previous examples, we are able to iterate through the names of `arf` and `rfr` like this:

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

Note that there is a good amount of syntactic sugar happening here. We don't even have to create explicitly an iterator. We define the generator method in the object with the right name `Symbol.iterator`, and that's it. The object is ready for iteration with `for...of`.

### Iterable iterators

Also note that any iterator created by a generator function is **automatically** iterable. Nicholas doesn't mention it in the book. And this is what makes generators really powerful.

To be more precise, any iterator created by a generator function is a [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} object. A Generator object is returned by a generator function and it conforms to both the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols?utm_source=pelicanclan.com&utm_medium=article#the_iterable_protocol){target="_blank" rel="noopener noreferrer" class="text-primary"} and the [iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols?utm_source=pelicanclan.com&utm_medium=article#the_iterator_protocol){target="_blank" rel="noopener noreferrer" class="text-primary"}.

For instance, let's consider the following code:

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

In the previous code, `iterator` is created (generated) with the `generator()`. `iterator` automatically inherits a `[Symbol.iterator]` property that references the original `*generator()` function.

Let's consider another example:

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

In the previous code, we declare several generator functions to sort the planets in a specific way. Then, we are able to iterate through the planets of an iterator with the `for..of` loop.

Note that we create the iterators by calling or executing the generator functions, with the parentheses.

We can even make the `*aToZ()` generator the default generator to be used with the `for..of` loop like this:

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

### The default iterator of built-in objects

In ES6, all collection objects, i.e. arrays, sets and maps are iterables. Strings and NodeLists (frontend) are also iterables. They have a default generator method. It is possible to use a "default" iterator like this:

```javascript
const array = [1, 2, 3];

const iterator = array[Symbol.iterator]();

console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
```

Since `Symbol.iterator` defines the default iterator of an object, it is possible to test if an object is an iterable by checking if the object itself or any object in its prototype chain has a method called `Symbol.iterator`:

```javascript
const array = [1, 2, 3];

function isIterable(object) {
  return typeof object[Symbol.iterator] === 'function';
}

console.log(isIterable(array)); // true
```

### Built-in iterators

ES6 has 3 types of collection objects: arrays, maps and sets. All 3 have 3 built-in iterators:

- `entries()`: returns an iterator whose values are key-value pairs.
- `values()`: returns an iterator whose values are the values of the collection.
- `keys()`: returns an iterator whose values are the keys contained in the collection.

Here some examples of how to use these built-in iterators and what values they return.

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

Note that each collection type has a default iterator, defined by the method `Symbol.iterator`. This iterator is used by the `for...of` loop:

- For arrays and sets, the default iterator is in fact `values()`.
- For maps, the default iterator is in fact `entries()`.

### The spread syntax

Iterables can also be used with the spread syntax. The spread syntax simply uses the default built-in iterator to determine which values to include.

## Chapter 9: JavaScript classes

Very interesting chapter that details how ES6 brought syntactic sugar for factory functions. I've created 2 exercises to sum it up:

1. [ES5 to ES6](/js-oop/d#es5-to-es6).
2. [ES6 to ES5](/js-oop/d#es5-to-es6).

Even if ES6 classes are syntactic sugar for factory functions, they also provide stricter syntax rules, which is an improvement.

One thing I didn't know what that classes have two forms: declarations and expressions. So far, I've only **declared** classes. But the following is also possible:

```javascript
const Dog = class {
  constructor(name) {
    this.name = name;
  }
};
```

Just like functions, classes are first-class citizens. This means that they can be used as values: they can be passed into functions, returned from functions and assigned to variables. For instance, the following code is legit:

```javascript
const Cat = class {
  constructor(name) {
    this.name = name;
  }

  meow() {
    console.log(`${this.name} meows.`);
  }
};

const copyCat = Cat;
const segundo = new copyCat('Segundo');
segundo.meow(); // 'Segundo meows.'

function newCat(name) {
  return new Cat(name);
}

const pistache = newCat('Pistache');
pistache.meow(); // 'Pistache meows.'
```

It is also possible to define getters, setters and to use computed names in classes like this:

```javascript
const property_name_1 = 'first_name';
const property_name_2 = 'talk';

const Hero = class {
  constructor(nickname, name) {
    this._nickname = nickname;
    this.name = name;
  }

  get nickname() {
    return this._nickname;
  }

  set nickname(value) {
    this._nickname = value;
  }

  get [property_name_1]() {
    return this.name.first;
  }

  [property_name_2]() {
    console.log('I live in Gotham City.');
  }
};

const batman = new Hero('Batman', {
  first: 'Bruce',
  last: 'Wayne'
});

batman.nickname = 'The batman';
console.log(batman.nickname); // 'The batman'
console.log(batman.first_name); // 'Bruce'
batman.talk(); // 'I live in Gotham City.'
```

## Chapter 10: improved array capabilities

### Array()

The `Array()` construtor function has an inconsistent behavior, depending on the type of the argument passed to it. For instance:

```javascript
const array_1 = new Array(1);
const array_2 = new Array('1');
const array_3 = new Array(1, 2);

console.log(array_1); // [empty]
console.log(array_2); // ['1']
console.log(array_3); // [1, 2]
```

### Array.of()

The `Array.of()` method was introduced to fix this:

```javascript
const array_1 = Array.of(1);
const array_2 = Array.of('1');
const array_3 = nArray.of(1, 2);

console.log(array_1); // [1]
console.log(array_2); // ['1']
console.log(array_3); // [1, 2]
```

### Array.from()

The `Array.from()` method can be used to create arrays from array-like objects and iterables. For example a string, or a NodeList (returned by the method `document.querySelectorAll()`).

```javascript
const array = Array.from('12345');
console.log(array); // [1, 2, 3, 4, 5]
```

The `Array.from()` function can also take a second argument, which is a mapping function:

```javascript
const array = Array.from('12345', (value) => Number(value) + 1);
console.log(array); // [2, 3, 4, 5, 6]
```

### Other new methods

The rest of the chapter talks about the new methods introduced with ES6: The useful `Array.prototype.find()` and `Array.prototype.findIndex()`, and the more specific `Array.prototype.fill()` and `Array.prototype.copyWihtin()`.

### Types arrays

I read through the part related to types arrays, but this remains quite theoric for me since I never had to use them. But Nicholas details this part.

## Chapter 11: promises and asynchronous programming

Nicholas gives a good explanation of the single-threaded event loop.

---

- Single threaded: the Javascript engine can only execute one piece of code at a time.
- Event loop: the JavaScript engine keeps tracks of the code to be run in a *job queue*. The event loop is the process in the JavaScript engine that manages the job queue.

I've discovered the definition of a thenable. Any method that implements the `then()` method that accepts a resolve and reject argument is a thenable. All promises are thenables, but not all thenables are promises. Here is an example of a non-promise thenable:

```javascript
let thenable = {
  then: function(resolve, reject) {
    resolve(1);
  }
};
```

The methods `Promise.resolve()` and `Promise.reject()` accept non-promise thenables as arguments. They work this way so that they can be compatible with many libraries that used thenables before ES6.

## Chapter 12: proxies and the reflection API

This is quite an exotic chapter. I don't see many practical cases in which I would use proxies, but good to know that they exist.

You can learn more about [JavaScript proxies](https://www.javascripttutorial.net/es6/javascript-proxy/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

## Chapter 13: encapsulating code with modules

ES6 introduces modules and the concept of **file-scope**: a binding declared in any file is scoped to this file. Morever, bindings of a file can be exported and imported into other files with the keywords `export`, `export default` and `import`.

What is important to note is that the ES6 module system is designed to export and import only the necessary bindings. In other words, **the norm is to cherry-pick**.

Nicholas explains well the syntax for exporting and importing. I've made a [ES6 modules cheat sheet](/js-es6-modules-cheat-sheet) to present the different syntax in a more concise way.

JavaScript has a cache system for modules, so that the code of a module gets executed only once: when the first import statement is executed. All additional import statements will use the cached code of the module. For example:

```javascript
import { walk } from './elephant.js';
import { run } from './elephant.js';
import { swim } from './elephant.js';
```

In the previous snippet, the code of the file./elephant.js only gets executed once, with the first `import`.

There is a module syntax limitation: `export`, `export default` and `import` must be at the top-level scope of the file. For example, you cannot use `export` within an `if` statement. The JS engine will thow an error.
