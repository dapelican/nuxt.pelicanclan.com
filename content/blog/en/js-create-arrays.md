---
meta_title: "JavaScript: 4 ways to create arrays, and 1 subtlety"
meta_description: "The 4 ways to create arrays in JavaScript: the array literal notation, the Array() constructor, the factory functions Array.of() and Array.from()."
locale: en
visibility: public
category: Programming
slug: js-create-arrays
created_at: 2024-11-13
updated_at: 2024-1-25
---

# JavaScript: how to create arrays?

## Way #1: the array literal notation

We can create an array in JavaScript by using brackets. The elements of the array go between the brackets. It is the most straightforward and most visual way to create an array.

```javascript
// Empty array
const a = [];

// Array with 1 element
const b = [1];

// Array with 3 elements
const c = [1, 2, 3];
```

## Way #2: the Array() constructor function

It is also possible to create an array by using the `Array()` constructor function, with the `new` keyword.

When invoked without any argument, this function creates an empty array. When invoked with a **single integer argument**, it creates an array of the **specified length**. When invoked with 2 or more arguments or with a single non-integer element, it creates an array containing each argument as an element. The following code creates arrays that you would expect:

```javascript
// Empty array
const d = new Array();
console.log(d); // []

// Array with 3 elements
const e = new Array(1, 2, 3);
console.log(e); // [1, 2, 3]
```

But this **function has a flaw**. Its behaviour is "unexpected" when invoked with a single integer argument:

```javascript
// Special empty arrays
const f = new Array(5);
console.log(f); // [ , , , , ];

const g = new Array(1);
console.log(g); // [ ]
```

The length of the array `f` is 5, but there are no elements. The length of the array `g` is 1, but there is no element.

Note that this behavior happens only if the single argument is an integer. Take a look at the following examples:

```javascript
// Arrays with 1 element
const h = new Array('a');
console.log(a); // ['a']

const i = new Array(true);
console.log(i) // [true]
```

## Way #3: the Array.of() factory function

The flaw of the `Array()` constructor function is an anomaly that cannot be fixed, since JavaScript maintains backward compatibility. However, the method `Array.of()` was specifically introduced in the ES6/ES2015 specification to address this problem.

`Array.of()` is a factory function that creates and returns a new array, using the values of its arguments as the array elements, regardless of how many of them they are.

## Way #4: the Array.from() factory function

The `Array.from()` factory function was also introduced in the ES6/ES2015 specification. It expects an **iterable** or **array-like object** as its first argument and returns a new array that contains the elements of that object. With an `iterable` argument, `Array.from(iterable)` works like the spread operator `[... iterable]` does. Here is an example with an iterable object other than an array, a string:

```javascript
const j = 'Babar';
const k = Array.from(j);
console.log(k); // ['B', 'a', 'b', 'a', 'r']
```

A note on array-like objects: "Some objects in JavaScript look like an array, but they aren't one. That usually means that they have indexed access and a length property, but none of the array methods. Examples include the special variable `arguments`, DOM node lists, and strings." (Dr. Axel Rauschmayer).

`Array.from()` also accepts an optional second argument. If you pass a function as the second argument, then as the new array is being built, each element from the source object will be passed to the function you specify, and the return value of the function will be stored in the array instead of the original value. In this case, the `Array.from()` function behaves exactly like `Array.prototype.map()`.

```javascript
const l = 'moon';
const m = Array.from(l, el => el.toUpperCase());
console.log(m); // ['M', 'O', 'O', 'N']
```
