---
title: "The 4 characteristics of object-oriented programming"
description: "Object-oriented programming (commonly referred as OOP) is a way of organizing code."
created_at: 2026-10-11
locale: en
visibility: private
category: Programming
slug: js-oop-characterisitcs
---

# The 4 characteristics of object-oriented programming

## What is object-oriented programming?

Object-oriented programming (commonly referred as OOP) is a way of organizing code. in OOP, programmers choose to organize code by objects. Each object has specific data (properties) and specific actions (methods or functions).

This OOP paradigm has become very popular in the 1990s, and is now considered as the major and default way to organize code for web applications. It is also popular because almost all major programming languages are OOP friendly.

## The 4 charcteristics of OOP

There are 4 characteristics of OOP: encapsulation, composition, inheritance and polymorphism. Any language that implement these 4 characteristics can be used to write OOP code.

## Encapsulation

This first characteristic is in the definition of OOP. OOP is about organizing code in objects. In other words, objects can "encapsulate" data (properties) and actions (methods/functions). If a programming language lets you create objects that can have properties and functions, it implements encapsulation.

JavaScript implements encapsulation, as any JavaScript object can have properties that can either be data or functions. For instance:

```javascript
const dog = {
  name: 'Spartacus',
  age: 2,
  bark: () => console.log('Woof!'),
};
```

In the previous code, we created an object called `dog`. The dog object has data (`name` and `age`) and has an action, `bark`. The only difference between the data and the action is that the action can be executed.

With `dog.name`, we retrieve data. With `dog.bark()`, we execute a function. In JavaScript, the execution of a function is indicated by the parentheses.

Also note that there are different ways to declare functions inside of objects in JavaScript:

```javascript
const dog = {
  name: 'Spartacus',
  age: 2,
  bark: function() {
    console.log('Woof!');
  },
};
```

```javascript
const dog = {
  name: 'Spartacus',
  age: 2,
  bark() {
    console.log('Woof!');
  },
};
```

In the previous code, we use some syntactic sugar.

As you can see, JavaScript is very straigthforward in terms of encapsulation.

## Composition
