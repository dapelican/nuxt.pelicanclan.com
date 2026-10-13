---
title: "My notes on Learning JavaScript Design Patterns by Addy Osmani"
description: "The book is not for beginners. There are some parts where the explanations are not explicit enough."
created_at: 2026-10-11
locale: en
visibility: private
category: Programming
slug: osmani-ljsdp
---

# My notes on Learning JavaScript Design Patterns by Addy Osmani

## Details

- Title: Learning JavaScript design patterns (2nd edition)
- Author: Addy Osmani

  - Website: [Addy Osmani](https://addyosmani.com/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}
  - Twitter: [@addyosmani](https://twitter.com/addyosmani?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}
- Year of publication: 2023
- Length: 296 pages
- Links:

  - [Amazon](https://www.amazon.com/Learning-JavaScript-Design-Patterns-Developers/dp/1098139879/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}

## General comments

The book is not for beginners. There are some parts where the explanations are not explicit enough. That's why my notes provide additional details and resources that are not in the book.

The book is mainly oriented for browsers, maybe some explanataions related to Node.js are needed.

The book points to very interesting resources. In particular, the website of the [V8 JavaScript engine](https://v8.dev/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} is incredible. Really clear and concise content.

## Chapter 1: Introduction to design patterns

From an historic point of view, there are 2 fundamental books about design patterns:

- *A pattern language*, by Christopher Alexander (1977).
- *Design patterns: Elements of Reusable Object-Oriented Software*, by the Gang of Four (1995). The Gang of Four is a group of 4 authors: Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides.

Definition of a pattern: a reusable solution template that you can apply to recurring problems and themes in software design.

Advantages of design patterns:

- They are proven solutions.
- They can be easily reused.
- They are expressive. They can be referenced by specific vocabulary.

## Chapter 2: "Pattern"-ity testing, proto-patterns, and the rule of three

A proto-pattern is a pattern that has not (yet) been recognized as a pattern by the community of developers.

A proto-pattern can become a formal pattern if it abides by the rule of three:

1. Fitness of purpose: how is the pattern considered successful?
2. Usefulness: why is the pattern considered successful?
3. Applicability: is the design worthy of being a pattern because it has broader applicability?

## Chapter 3: Structuring and writing patterns

No specific notes about this chapter.

## Chapter 4: Anti-Patterns

An anti-pattern is a bad design that is worthy of documenting.

Some anti-patterns in JavaScript:

- Global namespace pollution.
- Passing strings rather than function to `setTimeout()` or `setInterval()`, as this triggers the use of `eval()` internally.
- Modifying the `Object` prototype.
- Using `document.write` instead of `document.createElement`.

(Not in the book). An explanation of global namespace pollution: polluting the global namespace in JavaScript is declaring variables outside of a specific scope. Therefore, the variables are at the most upper scope of the application. This has 2 drawbacks:

1. It may cause memory/performance issues, since global variables are not eligible for [garbage collection](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}. They always stay in memory, and this can degrade the performance of the browser or the server running Node.js.
2. It can cause name clashing or collision. A variable is silently overriden by another one with the same name. This can cause bugs that are hard to find, because they do not throw explicit errors.

## Chapter 5: Modern JavaScript syntax and features

### Modules

ECMAScript 2015/ES 6 introduced modules, that can be used with the `export` and `import` keywords. This allows a JavaScript application to be split into smaller, reusable pieces of code.

(Not in the book). There is a syntax subtility about modules. It is different for [named exports and for default exports](https://stackoverflow.com/questions/36426521/what-does-export-default-do-in-jsx/36426988?utm_source=pelicanclan.com&utm_medium=article#36426988){target="_blank" rel="noopener noreferrer" class="text-primary"}.

<em>.mjs</em> is an extension used for JavaScript modules that helps us distinguish between module files and classic scripts (<em>.js</em>). The <em>.mjs</em> extension ensures that corresponding files are parsed as a module by runtimes and build tools (for example, Node.js, Babel). How is this a good thing? I don't know. Unless I'm mistaken, there is no further explanation in the book.

You can tell browsers to accept `<script>` tags that contain JavaScript modules by specifying the type attribute with a value of module:

```javascript
<script type="module" src="main.mjs"></script>
<script nomodule src="fallback.js"></script>
```

It is possible to import modules from remote sources:

```javascript
import { toto } from "https://example.com/modules/toto.mjs"
```

It is possible to import modules only when they are neeeded, instead of when the page loads. For instance, when the user clicks on a specific load or button. This is done with the [import()](https://v8.dev/features/dynamic-import?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} syntax. Beware: `import()` is not a function, despite the use of parenthesis!

Advantages of using modules:

- Module scripts are evaluated only once. It means that, in the following code, the same number is printed twice to the screen:

  ```javascript
  // Filemname: module_1.mjs
  export default Math.floor(Math.random() * 10_000);

  // Filename: module_2.mjs
  import random_number_2 from './module_1.mjs';
  export default random_number_2;

  // Filename: main.js
  import random_number_1 from './module_1.mjs';
  import random_number_2 from './module_2.mjs';

  console.log('random_number_1', random_number_1);
  console.log('random_number_2', random_number_2);
  ```

  In other words, there is some kind of cache involved with modules.
- In browsers, modules are auto-deferred. There is no need to use the `defer` attribute to make the browser defer the loading of modules.
- Modules are easy to maintain and reuse.
- Moudles provide namespacing. Modules automatically create a scope for the variables and functions declared within the module. So, there is no pollution of the global namespace.
- Modules enable bundlers such as webpack and Rollup to automatically remove unused modules, i.e. modules exported but not imported in any file.

A really great expanation about modules: [JavaScript modules](https://v8.dev/features/modules?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, on v8.dev.

### Classes

ES2015+ allows defining classes. MDN has a really nice guide about [using classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}. But it is best to know [object-oriented programming principles](/zakas-js-oop) before ES2015 to fully understand the novelty of the syntactical sugar brought by the `class` keyword.

## Chapter 6: Categories of design patterns

In this chapter, Addy presents the 23 design patterns introduced by the Gang of Four in 1995.

### The creational design patterns: how to properly create objects?

- Factory method: makes an instance of several derived classes based on interfaced data or events.
- Abstract factory: creates an instance of several families of classes without detailing concrete classes.
- Builder: separates object construction from its representation; always creates the same type of object.
- Prototype: a fully initialized instance used for copying or cloning.
- Singleton: a class with only a single instance with global access points.

### The structural design patterns: how to properly build blocks of objects?

- Adapter: matches interfaces of different classes so that classes can work together despite incompatible interfaces.
- Bridge: separates an object's interface from its implementation so that the two can vary independently.
- Composite: a structure of simple and composite objects that makes
- Decorator: dynamically adds alternate proessing to objects.
- Facade: a single class that hides the complexity of an entire subsystem.
- Flyweight: a fine-grained instance used for efficient sharing of information that is contained elsewhere.
- Proxy: a placeholder object representing the true object.
-

### The bahavioral design patterns: how to make object properly interact between one another?

- Interpreter: a way to include language elements in an application to match the grammar of the intended language.
- Template method: creates the shell of an algorithm in a method, then defers the exact steps to a subclass.
- Chain of responsibility: a way of passing a request between a chain of objects to find the object that can handle the request.
- Command: a way to separate the execution of a command from its invoker.
- Iterator: sequentially access the eleemnts of a collection without knowing the inner workings of the collection.
- Mediator: defines simplified communication between classes to prevent a group of classes from referring explicitly to each other.
- Memento: captures an object's internal state to be able to resotre it later.
- Observer: a way of notifying change to a number of classes to ensure connsistency between the classes.
- State: alters an object's behavior when its state changes.
- Strategy: encapsulates an algorithm inside a class, separating the selection from the implementation.
- Visitor: adds a new operation to a class without changing the class.

## Chapter 7: JavaScript design patterns
