---
meta_title: "JavaScript object wrappers: understanding autoboxing"
meta_description: "An explanation of how JavaScript makes primitives behave like objects and makes it possible to call methods directly on them."
locale: en
visibility: public
category: Programming
slug: js-object-wrappers
created_at: 2024-11-13
updated_at: 2024-11-25
---

# JavaScript object wrappers: understanding autoboxing

In JavaScript, there are 2 types of data:

1. The primitive types (or primitives). There are 7 of them:
- String
- Number
- Boolean
- Null
- Undefined
- Symbol
- BigInt
2. The references (or objects).

Primitive types are not objects, so they cannot have methods and they cannot have access to methods. However, JavaScript makes it seeem possible for primitive types to have access to methods. For example:

```javascript
const text = 'SUN';
const new_text = text.toLowerCase();
```

In the previous code, the variable text is assigned a string (Primitive type) on the 1st line. On the 2nd line, we call the method `toLowerCase()` on a primitive value, and no error is thrown. How come?

The reason why the previous code works is because JavaScript creates object wrappers under the hood when dealing with primitives. The previous code is actually transformed by JavaScript like this:

```javascript
const text = 'SUN';
let temp = new String(text);
const new_text = temp.toLowerCase();
temp = null;
```

JavaScript created a temporary String object that we called `temp`. This String object has access to all the methods of `String.prototype`, just like all String objects. Therefore, `temp.toLowerCase()` works fine.

Notice that the temporary String object only exists for one statement. After that, it is automatically destroyed (or dereferenced). This process of destroying the temporary object right after its first (and unique) use is called **autoboxing**.

Autoboxing is also the reason why we cannot add a property to a primitive type. Consider the following code:

```javascript
const number = 5;
number.type = 'odd';
console.log(number.type); // undefined
```

The previous code prints `undefined`. This is what JavaScript does under the hood:

```javascript
const number = 5;
let temp = new Number(5);
temp.type = 'odd';
temp = null; // temp is dereferenced right away

temp = new Number(5);
console.log(temp.type); // undefined
```

When we try to access the `type` property of the `temp` object, it no longer exists since a brand new object has been assigned to it. Hence the `undefined`.
