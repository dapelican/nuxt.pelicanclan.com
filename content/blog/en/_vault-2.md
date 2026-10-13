---
title: "Vault"
description: "Personal notes, JavaScript exercises, and book notes."
created_at: 2026-10-11
locale: en
visibility: private
category: Notes
slug: vault-2
---

# Vault

### Health

Special thanks to Dr. Mindy Pelz, Dr. Peter Attia and Dr. Philip Ovadia

### Exercise 1

Does the follwing code work as expected?

```javascript
function areArraysEqual(array_1, array_2) {
if (array_1.length !== array_2.length) {
  return false;
}

const obj_1 = {};
const obj_2 = {};

array_1.forEach((val) => {
  const symbol = Symbol.for(val);
  if (obj_1[symbol]) {
    obj_1[symbol] += 1;
  } else {
    obj_1[symbol] = 1;
  }
})

array_2.forEach((val) => {
  const symbol = Symbol.for(val);
  if (obj_2[symbol]) {
    obj_2[symbol] += 1;
  } else {
    obj_2[symbol] = 1;
  }
})

// console.log('obj_1', obj_1);
// console.log('obj_2', obj_2);

// console.log(Symbol.for('1') === Symbol.for(1));

for (let key of Object.getOwnPropertySymbols(obj_1)) {
  if (obj_1[key] !== obj_2[key]) {
    return false;
  }
}

return true;
}

console.log(areArraysEqual([1, 2, 3], [1, 2, 3]) === true);
console.log(areArraysEqual([1, 2, 3], [3, 2, 1]) === true);
console.log(areArraysEqual(['a', 'b', 'c'], ['b', 'c', 'a']) === true);
console.log(areArraysEqual([1, 1, 2, 3], [3, 1, 2, 1]) === true);
console.log(areArraysEqual([1, 2, 3, 4], [1, 1, 2, 3]) === false);
console.log(areArraysEqual([1, 1, 2, 2], [4, 2, 3, 1]) === false);
console.log(areArraysEqual([1, 1, 2], [1, 2, 2]) === false);
console.log(areArraysEqual([1, 1, 1], [1, 1]) === false);
console.log(areArraysEqual([1, 1], [1, 1]) === true);

console.log(areArraysEqual(['1', 2, 3], [1, 2, 3]) === false);
```

### What are the possible contexts? {#what-are-the-possible-contexts}

A context can either be unidirectional or bidirectional.

Unidirectional contexts establish 1-way communications: from the offerer to the target (or offeree). In particular, these contexts allow advertising, i.e. paying to deliver a fixed message to an audience.

Bidirectional contexts allow 2-way communication, i.e. back and forth between the offerer and the target. This kind of interactivity can be instantaneous (live conversations), or asynchronous (email or messaging).

Here are the 9 possible contexts:

1. Paying exposure
2. Owned exposure
3. Unfiltered/aggressive/raw exposure: direct interactions and messaging
4. related exposure: self-publishing information more or less related to your offering

1. Advertising (paying exposure) Highly scalable, depends on the budget
2. (Direct exposure) Lowly scalable, you need to be able to directly get in touch with your targets.
3. Self-publishing information (owned exposure)

| # | Contexts | Type |
| --- | --- | --- |
| 1 | Your hosting platforms | Unidirectional |
| 2 | Your physical assets | Unidirectional |
| 3 | Community platforms | Unidirectional or bidirectional |
| 4 | Exclusive platforms | Unidirectional |
| 5 | Digital messaging | Unidirectional or bidirectional |
| 6 | Others' physical assets | Unidirectional |
| 7 | Broadcasts | Unidirectional |
| 8 | Events | Unidirectional or bidirectional |
| 9 | Live conversations | Bidirectional |

#### Your hosting platforms

This context is the first context any business starts with. It lets you present your offering on your own terms. Your hosting platforms are the links (URLs) to:

- your website.
- your podcast hosting service. For example: [Transistor](https://transistor.fm/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, [Simplecast](https://www.simplecast.com/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, [Ausha](https://www.ausha.co/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, [Anchor](https://anchor.fm/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- your video hosting service, which is usually also a community platform (more on that later on). For example: [YouTube](https://www.youtube.com/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, [Vimeo](https://vimeo.com/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, [Odysee](https://odysee.com/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

This context allows unidirectional communication such as:

- Setting up a landing page for your offering.
- Publishing articles or blog posts on your website.
- Publishing a podcast episode or a video on your hosting platform once a week.

#### Your physical assets

Your physical assets can be packaging, material for physical shops, printed documents, fleet of vehicles or branded clothes for employees. They are of primary importance if you have a physical place where users come for your offering (shop or office).

This context allows unidirectional communication such as:

- Designing and manufacturing the package of your cookies if you sell cookies.
- Designing and printing the menu of your food truck in different physical formats to hand them to your targets.
- Putting your brand name and logo on your professional car.
- Distributing flyers in the streets around your shop.
- Sending your latest brochure by mail to your most loyal customers.
- Paying a posting service to send a promotional card to all people living in a specific area.

#### Community platforms

Community platforms are online platforms that rely on their users to post content and to interact with one another. This includes social media, forums and message boards. To name a few generalist community platforms: Facebook, Twitter, Instagram, Pinterest, Reddit, TikTok, Snapchat, LinkedIn, Quora or Medium. There are plenty of specialized community platforms as well. In most cases, community platforms have recommendation systems (suggestion algorithms) that increase the chances of content being seen by a very large audience (the content can go "viral").

This context allows unidirectonnal communication such as:

- Publishing pieces of content.
- Advertising, by boosting the visibility of a piece of content.

It also allows bidirectionnal communication with comments, replies and private messages.

#### Exclusive platforms

Exclusive platforms are online platforms that rely on exclusive content coming from a selected number of sources. Sometimes, it is possible for "outsiders" to submit content. But most of the time, advertising is the way to go with these platforms. Exclusive platforms include search engines and editorial websites.

This context allows unidirectional communication such as:

- Advertising on search engines ([Google Ads](https://ads.google.com/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, [Microsoft Ads](https://ads.microsoft.com/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}).
- Submitting articles on editorial websites.

#### Digital messaging

Digital messaging is primarily email, and secondarily other digital messaging tools, such as Facebook Messenger, Whatsapp, Telegram, Signal.

This context allows unidirectional communication such as:

- Sending newsletters to your subscribers. Your subscribers are identified prospects or users who have explicitly accepted to receive information from you.
- Sending automatic emails to recover abandoned checkouts on an ecommerce website.
- Advertising in newsletters. For example with [Paved](https://www.paved.com/advertisers?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- Sending cold emails to HR people if you sell HT software.

It also allows bidirectionnal communication, as your targets can reply to your message and start a conversation with you.

#### Others' physical assets

These assets are similar to your assets, except that you don't own them, so you don't control them.

This context allows unidirectional communication such as:

- Using Out-Of-Home (OOH) advertising, i.e. advertising in public spaces (billboards, posters, and large screens). In particular: displaying ads on screens or billboards around your restaurant or displaying ads on taxis of a specific city.
- Advertising in the Miami Herald newspaper if you target Miami-based people.

#### Broadcasts

Broadcasts are shows on television, radio or online. It is possible to advertise during commercial breaks before, during or after the show. It is also possible to sponsor a show or a segment of the show.

For instance:

- Advertising during the Super Bowl. A 30-second commercial now costs more than 6 millions dollars.
- Sponsoring the half-time show of the Super Bowl. It is a multi-year deal signed between the sponsor and the NFL, for several dozens of million dollars. The sponsor for the upcoming Super Bowl editions is [Apple Music](https://www.nfl.com/news/nfl-introduces-the-apple-music-super-bowl-halftime-show?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

I took the extreme example of the Super Bowl, but you have similar opportunities with most broadcasts (and with more reasonable budgets).

You can also participate to broadcasts as a guest. In this case, this requires you to get invited, usually by doing some PR work beforehand.

#### Events

The goal of participating to events is to be able to reach a maximum of qualified prospects in a single venue and in minimal time. Events are usually meetups, exhibitions (trade shows or trade fairs), conferences and their online equivalent (mostly webinars).

This context naturally allows bidirectionnal communication (live conversations). It also allows unidirectional communication, such as sponsoring the event or advertising in the event.

#### Live conversations

This context is the natural complementary context to almost all other contexts. It is primarily the context used by salespeople working in business-to-business markets. As this process is very time-consuming, it is best suited for high-priced offerings or recurring offerings (with a high customer lifetime value). This includes face-to-face meetings, phone calls or video calls.

This context can be triggered by:

- Going door-to-door in a neighborhood to present your grass-cutting services.
- Calling business owners in your area if you sell corporate services (beware, this can appear quite shady).
- Demoing a product at a event with a prospect.
- Setting up a call after sending a few cold emails.

## Chapter 1: primitive and reference types

In the first chapter, Nicholas explores primitive types and reference types. Great chapter. Written in simple words and with simple examples.

I would sum up the information about primitive types with this table:

| Declaration | Primitive type | typeof |
| --- | --- | --- |
| `const a = 'abc';` | String | `typeof a // 'string'` |
| `const b = 10;` | Number (Integer) | `typeof b // 'number'` |
| `const c = 2.5;` | Number (Float) | `typeof c // 'number'` |
| `const d = false;` | Boolean | `typeof d // 'boolean'` |
| `const e = undefined;` | Undefined | `typeof e // 'undefined'` |
| `const f = null;` | Null | `typeof f // 'object'` |

The suprising part is with the Null type, where `typeof null` surprinsingly returns `'object'`. This is an error in the language. It cannot be correted because JavaScript maintains backward compatibility.

Nicholas also details how JavaScript create object wrappers on the fly for primitive types. In particuler, this is what explains how strings can have methods as if they were objects even though they are not. Really interesting.

Similarly, I would sum up the information about reference types with this table:

| Declaration | Reference type | typeof | instanceof |
| --- | --- | --- | --- |
| const a = {}; | Object | typeof a // 'object' | a instanceof Object // true |
| const b = () => console.log('toto'); | Function | typeof b // 'function' | b instanceof Object // true<br>b instanceof Function // true |
| const c = []; | Array | typeof c // 'object' | c instanceof Object // true<br>c instanceof Array // true |
| const d = new Error('toto'); | Error | typeof d // 'object' | d instanceof Object // true<br>d instanceof Error // true |
| const e = /\d/g; | RegExp | typeof e // 'object' | e instanceof Object // true<br>e instanceof RegExp // true |

There are 2 things to note in the previous table:

1. the typeof a funcion returns 'function'. Functions are objects in JvaScript, but there are such special objects (they can be executed) that they have their own specific typeof.
2. All reference types are instances of Object.

## Chpater 2: functions
