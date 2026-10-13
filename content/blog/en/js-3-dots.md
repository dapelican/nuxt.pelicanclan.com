---
meta_title: "JavaScript: the 3 dots syntax with simple code examples"
meta_description: "An explanation of what the 3 dots mean and do in JavaScript. The rest parameter, the destructuring dots and the spread syntax. With simple code examples."
locale: en
visibility: public
category: Programming
slug: js-3-dots
created_at: 2024-11-13
updated_at: 2024-11-25
---

# JavaScript: the 3 dots syntax

In JavaScript, the 3 dots syntax (`...`) can be used in 3 different contexts and can have 3 different meanings. Beware of the 3 dots, do not confuse them. They can refer to a rest parameter, destructuring dots or a spread syntax. In a nutshell:

1. The [rest parameter](#rest) syntax is used when declararing (or defining) a function, more precisely within the parameters list of the function enclosed between an opening and a closing parenthesis.
2. The [destructuring dots](#destructuring) are used within an assignment statement, more precisely on the left-hand side of the equal sign.
3. The [spread syntax](#destructuring) is used within an array or an object to refer respectively to the values of another array or the property names and values of another object.

## The rest parameter {#rest}

A rest parameter is preceded by 3 dots, and it must be the last parameter in a function declaration. When you invoke a function with a rest parameter, the arguments you pass are first assigned to the non-rest parameters, and then any remaining arguments (i.e., the “rest” of the arguments) are stored in an array that becomes the value of the rest parameter. This last point is important: within the body of a function, the value of a rest parameter will always be an array. The array may be empty, but a rest parameter will never be `undefined`. That is the reason why it is never useful, and not legal, to define a parameter default for a rest parameter.

```javascript
// The rest parameter - Example 1
const print = (...params) => {
  params.forEach(val => console.log(val));
};

print(1, 2, 3, 4, 5);
```

First, we define a function called `print()`. This function has a rest parameter as its parameter. In other words, this function can be passed any number of arguments when it is invoked. These arguemnts will be stored as an array assigned to the local variable called `params`. In other words, the array `[1, 2, 3, 4, 5,]` is assigned to `params`. Then, within the function, we iterate through each element of the array with the `Array.prototype.forEach()` method, and display each element to the screen.

On the last line, we call the function `print()` and pass to it 5 integers (the integers from 1 to 5). These integers are logged to the screen.

```javascript
// The rest parameter - Example 2
const print = (a, b, ...params) => {
  params.forEach(val => console.log(val));
};

print(1, 2, 3, 4, 5);
```

In the previous code, the integers 1 to 5 are passed to the function `print()` as arguments. The integer 1 is assigned to the local variable `a` and the integer 2 is assigned to the local variable `b`. The local variable `params` is assigned the array `[3, 4, 5,]`. Therefore, the previous code displays integers 3, 4 and 5 to the screen.

## The destructuring dots {#destructuring}

The 3 dots can be used with destructuring assignment. This syntax does not have an official name, but we will refer to it informally as the destructuring dots syntax. It lets us assign an array of the remaining values left to be assigned to a single variable, which name is specified right after the 3 dots. This syntax works with any iterable object on the right-hand side of the equal sign. In JavaScript, arrays are iterable objects, and so are strings. 2 important remarks:

1. The destructing dots must always be used with the **last variable to be declared**, otherwise JavaScript throws an error (`SyntaxError`).
2. The destructuring dots always assign the remaining value or values to an array. In other words, the variable after the 3 dots is **always an array**, with 0 or more elements.

```javascript
// The detructuring dots
let [e, ...f] = [5, 6, 7, 8];
let [...g] = ['Pluto'];
let [first, ...last] = 'abcd';

console.log(e); // 5
console.log(f); // [6, 7, 8]
console.log(g); // ['Pluto']
console.log(first); // 'a'
console.log(last); // ['b', 'c', 'd']
```

## The Spread syntax {#spread}

A spread syntax "spreads" the elements of an iterable object in an array literal or an object literal.

```javascript
// The spread syntax - Example 1
const array = [...'abc'];
console.log(array); // ['a', 'b', 'c']
```

```javascript
// The spread syntax - Example 2
const a = ['a', 'b', 'c'];
const b = [ 1, ...a, 3];
console.log(b); // [1, 'a', 'b', 'c', 3]
```

```javascript
// The spread syntax - Example 3
const object = {a: 1, b: 2};
const newObject = { ...object, c: 3};
console.log(newObject) // {a: 1, b: 2, c: 3}
```

```javascript
// The spread syntax - Example 4
const letters = 'abcd';

[...letters].forEach(val => console.log(val));
```

In the previous example, the spread syntax is used to transform a string into an array. Any iterable can be transformed into an array by using the spread syntax.
