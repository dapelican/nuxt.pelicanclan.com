---
meta_title: "JavaScript: iterate through Arrays with for statements"
meta_description: "The 3 ways to iterate through Arrays with for statements in JavaScript: Simple code examples provided for each case."
locale: en
visibility: public
category: Programming
slug: js-array-for
created_at: 2024-11-13
updated_at: 2024-11-25
---

# JavaScript: iterate through Arrays with for statements

## The 3 for statements

There are 3 ways to iterate through an array with `for` loops:

1. With the simple `for` loop.
2. With the `for...of` loop, which works with any **iterable** object. Arrays are iterable objects.
3. With the `for...in` loop, which works with any object. Arrays are objects that happen to have integer-like strings as keys (or property names).

Note that the `for...of` statement iterates through the elements of the array while the `for...in`` statement iterates through the property names (or keys) of the array, which are its **indices**.

## Example

```javascript
const array = [1, 2, 3, 4, 5];

// Simple for loop
for (let i = 0; i < array.length; i += 1) {
  console.log(array[i]);
}

// for...of loop
for (let num of array) {
  console.log(num);
}

// for...in loop
for (let i in array) {
  console.log(array[i]);
}
```
