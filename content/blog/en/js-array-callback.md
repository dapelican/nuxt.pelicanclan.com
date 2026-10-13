---
meta_title: "JavaScript: the standard callback function for Array methods"
meta_description: "An explanation of how to use the standard callback function with Array methods in JavaScript. We explore its required and optional parameters."
locale: en
visibility: public
category: Programming
slug: js-array-callback
created_at: 2024-11-13
updated_at: 2024-11-25
---

# JavaScript: the standard callback function for Array methods

Let's consider the following code:

```javascript
const array = [1, 2, 3, 4, 5];

array.forEach((val, idx, arr) => console.log(val));

const newArray = array.map((val, idx, arr) => val + 1);

const greaterThan3 = array.some((val, idx, arr) => val > 3);
```

In the previous code, we call different Array methods. These methods take a function as an argument (aso known as a callback function) and this function always has the same parameters.

Most of the Array methods use the same type of callback function. This callback function is standard because it has same required and optional parameters in the same order, regardless of the Array method used (for most of them).

Therefore, it is possible to always use the same name for the parameters. This is quite useful if you want to develop some automatism when dealing with Array methods. We can choose either the full names (but it is quite long) or opt for shorter names.

First, let us have a look at the usual parameters:

1. The first parameter, `currentValue` is mandatory. It is the current value or element being processed in the array. Here are some alternative shorter names that can be used for this parameter: `element`, `value`, `currVal`, `currEl`, `val`, `ele`, `el`, `va` or `e`.
2. The second parameter, `index`, is optional. It is the index of the `currentValue`. Here are some alternative shorter names that can be used for this parameter: `idx`, `id` or `i`. It is not possible to use `in` because it is a reserved keyword in JavaScript.
3. The third parameter, `array`, is optional. It is the array on which the method is called on. Here are some alternative shorter names that can be used for this parameter: `arr`, `ar` or `a`.
4. The fourth parameter, `thisArg`, is optional. It is the value to use as `this` when executing the callback function. This fourth parameter is much less used than the previous ones.

Note that only the first parameter is mandatory. The other ones are all optional.

Whenever you have to write a standard callback function with an Array method, you can use the same 3-letter (as we did in our example), 2-letter or even 1-letter identifiers. The safest option is to go for the 3-letter identifiers: there are short enough to write concise code but also explicit enough to provide meaning and show intent in the code. Here are some possibilities:

```javascript
// 3-letter identifiers
(val, idx, arr) => {};
(val, idx) => {};
(val) => {};

// 2-letter identifiers
(el, id, ar) => {};
(el, id) => {};
(el) => {};

// 1-letter identifiers
(v, i, a) => {};
(v, i) => {};
(v) => {};

(e, i, a) => {};
(e, i) => {};
(e) => {};
```

Here are some code examples that use the optional parameters of the standard callback function of an Array method.

```javascript
// Alternative code 1
const numbers_1 = [0, 1, 2, 3, 4, 5];

numbers_1.forEach((el, id, ar) => {
  console.log(ar[id] + 1);
});
```

```javascript
// Alternative code 2
const numbers_1 = [0, 1, 2, 3, 4, 5];

numbers_1.forEach((_, id, ar) => {
  console.log(ar[id] + 1);
});
```

Since the mandatory argument is not the used in the block of the function, we can replace it with an underscore (`_`), to signal that the non-use of this argument is intentional.
