---
meta_title: "JavaScript: the Promise() constructor clearly explained"
meta_description: "A simple and clear explanation of how the Promise() constructor works. 3 useful case scenarios to identify the eventual state of the returned promise."
locale: en
visibility: public
category: Programming
slug: js-promise-constructor
created_at: 2024-11-13
updated_at: 2024-11-25
---

# JavaScript: the Promise() constructor

## What is a promise? (Reminder) {#what-is-a-promise}

A promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

A promise can have 3 different states:
1. *pending*: initial state, neither *fulfilled* nor *rejected*.
2. *fulfilled*: meaning that the operation was completed successfully.
3. *rejected*: meaning that the operation failed.

The eventual state of a *pending* promise can either be *fulfilled* with a *resolved* value or *rejected* with a *reason* (usually an error). if a promise doesn't fulfill or reject, than its state stays in *pending*.

A promise is said to be *settled* if it is either *fulfilled* or *rejected*, but not *pending*. Note that *settled* is not a state: it is just a linguistic convenience.

## The executor function {#the-executor-function}

The `Promise()` constructor has 1 parameter: a function called the **executor** function.

The executor has itself 2 parameters: a function that resolves and a function that rejects.

1. The first parameter is the resolving function. It is a function that **resolves a value** and changes the state of the newly created promise from pending to fulfilled.
2. The second parameter is the rejecting function. It is a function that **rejects with a reason** and changes the state of the newly created promise from pending to rejected.

```javascript
// Example of a promise that resolves the value 'Giraffe'
const promise = new Promise((resolve, reject) => {
  resolve('Giraffe');
});

promise
  .then((value) => console.log(value)); // 'Giraffe'
```

By convention, the resolving function is usually called `resolve` and the rejecting function is usually called `reject`. But they can be named differently. For example, `cat()` and `dog()`, like in the following code:

```javascript
// Example of a promise with funky parameter names
const promise = new Promise((cat, dog) => {
  dog('Snoop');
});

promise
  .catch((reason) => console.log(reason)); // 'Snoop'
```

Note that the names of the parameters do not matter, but their order does. The first parameter is always the resolving function, and the second is always the rejecting function, no matter what they are named.

## The state of the promise {#the-state-of-the-promise}

The Promise constructor returns a promise, but what will be the state of the Promise?

Note that the executor function doesn't need to return explicitly a value. The return value of the executor function is irrelevant to the state of the newly created promise. But a `return` statement or or a `throw` statement can impact where the execution of the code inside the block of the executor function breaks. Therefore, it can impact the state of the promise. It is subtle, but it is really impotant to understand this.

There are 3 case scenarios.

### Case scenario #1 {#case-scenario-1}

If the resolving function or the rejecting function can be executed at least once, then the **first** execution of either the resolving function or the rejecting function determines the state of the promise. If the resolving function gets executed first, then the promise fulfills. The value of the fulfillment is the argument passed to this first resolving function. If the rejecting function gets executed first, then the promise rejects. The reason of the rejection is the argument passed to this first rejecting function. If other executions of either the resolving function or the rejecting function follow, they do not matter for the state of the promise: they are ignored by the JavaScript engine. But the rest of the code still gets executed. The resolving function and the rejecting function do not break the execution of the code like the statements `return` and `throw` would.

```javascript
// Case scenario 1
const promise_1 = new Promise((resolve) => {
  resolve(1);
  resolve(2);
  return resolve(3);
});

promise_1
  .then((value) => console.log(value)); // 1
```

### Case scenario #2 {#case-scenario-2}

If neither the resolving function nor the rejecting function can be executed before a `return` statement breaks the execution of the code, then the promise stays in the *pending* state. The promise doesn't settle: it doesn't fulfill, it doesn't reject.

```javascript
// Case scenario 2
const promise_2 = new Promise(() => {
  return null;
});

promise_2
  .then(() => console.log('fulfilled'))
  .catch(() => console.log('rejected'));
```

In the previous code, `promise_2` stays in the *pending* state. Therefore, neither `'fulfilled'` nor `'rejected'` are printed to the screen.

### Case scenario #3 {#case-scenario-3}

If neither the resolving function nor the rejecting function can be executed before a `throw` statement breaks the execution of the code, then the promise rejects. The reason of rejection is the expression that follows the `throw` statement.

Very important remark: the expression following the `throw` statement must not be an invocation of the resolving function nor the rejecting function. Otherwise, we are in [case scenario #1](#case-scenario-1).

```javascript
// Case scenario 3
const promise_3 = new Promise(() => {
  throw 'Rabbit';
});

promise_3
  .then(() => console.log('fulfilled'))
  .catch((reason) => console.log(reason)); // 'Rabbit'
```
