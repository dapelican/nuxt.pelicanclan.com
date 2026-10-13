---
meta_title: "JS: blocking and non-blocking (asynchronous) functions"
meta_description: "A short and a long explanation about blocking (synchronous) functions and non-blocking (non-blocking) functions in JavaScript."
locale: en
visibility: public
category: Programming
slug: js-blocking
created_at: 2024-11-13
updated_at: 2024-11-25
---

# JS: blocking and non-blocking (asynchronous) functions

## Short version

In JavaScript, it is possible to have tasks (functions) that are non-blocking (or asynchronous). Regardless, the JavaScript engine parses the code from top to bottom and executes each statement in the order in which they appear in the file.

However, JavaScript always waits for the full completion of blocking (or synchronous) tasks (this code is supposed to be fast) before moving on to the next statement. In contrast, when JavaScript parses a non-blocking function, it starts the execution of the function, but does not wait for its full completion (it is supposed to take time), and moves on to next statement. If necessary, JavaScript completes the non-blocking tasks after it has executed and completed all blocking tasks in the file. JavaScript keeps track of the non-blocking tasks that are "pending" by listing them in a kind of waiting list, the event loop.

## Long version

A JavaScript program is a sequence of statements that the JavaScript engine reads and executes one after the other, from top to bottom, in the exact order in which they appear in the file.

JavaScript has 6 kinds of statements:

1. Declarations and assignments of variables;
2. Definitions of functions;
3. Increment, decrement and delete operations;
4. Control structures (conditionals, loops and jumps);
5. Calls or invocations of blocking functions;
6. Calls or invocations of non-blocking functions.

For the first 5 kinds of statements, JavaScript reads and executes one statement at a time, and also waits for the execution to be **fully completed** before moving on to the next statement. This behavior is usually called synchronous behavior or blocking behavior. No matter how long the execution takes to be fully completed, JavaScript waits. Hence the use of the term "blocking". For instance, if JavaScript reads and executes an infinite loop of blocking code, it will never move on to the next statement, because it will be waiting for the current one to complete.

But, there is one kind of statement that makes JavaScript behave differently. It is the calls or invocations of non-blocking functions. When JavaScript reads invocations of non-blocking functions, it reads and starts executing the statement, but it does not wait for the full completion of the task(s). It moves on to the next task. JavaScript knows there is some waiting involved with non-blocking functions, so it does not wait, no matter how short the wait is.

A blocking function, just like a non-blocking function, takes in one or several inputs and performs one or several tasks. We usually expect a function, blocking or non-blocking, to deliver a useful result in some way. This result is meant to be reused later in our program. But this point is exactly what separates blocking functions from non-blocking ones: how easy is it to get that useful result?

Blocking functions are straightforward in that regard. They **return a value** that can be assigned to a variable and reused later on, in a different scope from the blocking function's one.

Non-blocking functions are trickier. They do not and they cannot return a value that can be "**directly**" useable or stored in a variable. The important word here is directly. Also, there are 2 types of non-blocking functions that are quite different, regarding how "directly" the useful value can be used.

1. **Callback-based non-blocking functions** use a callback function to be able to execute some code after a non-blocking task is completed. These functions **do not and cannot return a value**. There is no way to store a useful result in a variable for later use. If you try to do so, the variable will be assigned the value `undefined`, since the function does not and cannot return an explicit value. Moreover, if you have several tasks to execute after a non-blocking task is completed, you have to nest several callbacks within one another, inside the function. This problem is called callback hell or the Christmas tree problem, and it produces ugly and, most importantly, hard-to-maintain code.
2. **Promise-based non-blocking functions** use special objects called Promises, that were introduced in the ES6/ES2015 specification. Promises address the disadvantages of callback-based non-blocking functions in a very clean way. First, Promise-based non-blocking functions can and should return a value, in the form of a Promise object. This object is complex: it has a state that changes through time. Regardless, it is an object that can be stored in a variable. It can be reused later on, **almost** like any variable that stores the return value of a blocking function. Almost, because performing a task after a Promise settles (by resolving a value or rejecting a reason for failing) requires using either the `then()` method, either the syntactic sugar keywords `async`/`await` with a function.

The key to writing clean non-blocking code is to make sure that non-blocking functions **always** return Promises. If a non-blocking function is not available in its Promise-based version, you can create it: this is called to "promisify" a function.
