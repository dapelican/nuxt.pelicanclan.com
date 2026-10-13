---
title: "My notes on: CSS for JS developers by Josh W Comeau"
description: "Here are my notes on Josh W Comeau's course CSS for JS developers."
created_at: 2026-10-11
locale: en
visibility: private
category: Programming
slug: css-for-js
---

# My notes on: CSS for JS developers by Josh W Comeau

Here are my notes on Josh W Comeau's course CSS for JS developers. I discovered Josh on Twitter, and I purchased his course when he launched it.

Esthetically, the pages of the course are well designed, just like Josh's website. So big up to the designer of the pages and to Josh for implementing everything.

The course in itsef is well-structured, with many bite-sized lessons, useful remarks and interesting exercices and quizzes. I definitely recommend this course. I enjoyed going though it. Josh is a great teacher.

Here are my notes by modules and lessons.

## Module 0: fundamentals recap

### Anatomy of a style rule

In this section, Josh provides an interesting quiz to remind us of the terminology related to CSS: declaration, property, value, selector, rule.

### Media queries

Media queries are the way to style a page depending on its width. A media query rule in CSS is similar to an if statement in JavaScript:

```css
/* CSS */
@media (condition) {
/* Some CSS that'll run if the condition is met. */
}
```

```javascript
// JavaScript
if (condition) {
  // Some JS that will run if the condition is met.
}
```

Usually, the conditions used in media queries involve either `max-width` or `min-width`.

### Selectors: pseudo-classes

Pseudo-classes are selectors that let us select HTML elements based on their state (`:hover`, `:focus`, `:checked`) or on their position (`:first-child`, `:last-child`, `:first-of-type`).

The characteristic of pseudo-classes is the the `:` syntax.

### Selectors: pseudo-elements

Pseudo-elements let us select sub-elements or within HTML elements. For example, `::placeholder`, `::before`, `::after`.

Josh recommends not to use `::before` and `::after`, because of accessibility concerns related to screen readers.

### Combinators

The space combinator, for example `nav a`, lets us select the descendant elements, whereas the `>` combinator (`nav > a`) lets us select the children elements.

Children elements are direct descendants, so the selection is stricter. The level of nesting matters with the `>` combinator, while it doesn't with the space combinator.

### Color

There are 4 ways to represent colors:

1. Keywords: red, blue, yellow.
2. Hexadecimal numbers. For instance: `#FF0000`. Each digit is an hexadecimal digit. The first 2 digits represent the red color, the 2 digits in the middle represent the green color, the last 2 digits represent the blue color.
3. RGB. It is similar to the previous hexadecimal numbers, except that integers between 0 and 255 (8 bits) are used to represent the red, green and blue colors. For example: `rgb(255,0,0)`.
4. HSL for Hue/Saturation/Lightness. In this representation, the available colors are available in a hue (circle), going from 0 to 359 degrees. For example: `hsl(200deg 100% 50%)`. The fourth value for opacity can also be added: `hsl(340deg 100% 50% / 1)`. Note that the opacity is separated from the rest of the values with a slash. The advantage of HSL ist that it is easy to create variations of the same color, simply by changing the percentages of saturation and lightness.

### Units

1. `px`: the most common unit.
2. `rem`: a very practical unit, relative to the root `<html>`. By default, the root element has a font size of `16px`, so `1rem` is equal to `16px`. Note that you shouldn't set a `px` font size on the `<html>` element. This will override a user's chosen default font size. The good practice is to set a percentage like this:

   ```css
   html {
       /* 125% * 16px = 20px */
       font-size: 125%;
   }
   ```

A dilemna web developers frequently face is when to use `px` or `rem`. Josh wrote an article about it: [The Surprising Truth About Pixels and Accessibility](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

### Typography

The 2 major font families:

1. Serif.
2. Sans-serif.

The 3 most common formatting options:

- Bold: `font-weight: bold;` or `font-weight: 700;`. font-weight comes with a number system, from 1 to 1000. 400 is normal text.
- Italic: `font-style: italic;`
- Underline: `text-decoration: underline;`

For bold and italic, using `<strong>` and `<em>` does the job. No need to use `<b>` or `<i>`.

Here are other properties that apply to text:

- `<text-align>`.
- `<text-transform>`.
- `<letter-spacing>`.
- `<line-height>`. Surprisingly, `<line-height>` accepts unitless values. This value is multiplied by the element `font-size` to calculate the actual line height.

## Rendering logic 1

### Built-in declarations and inheritance

Every browser applies default styles rules to elements, through their **user-agent stylesheet**. These rules can be partially or totally modified (reset).

Some CSS properties are inherited from other elements, while others aren't. Those that are inherited usually relate to typography rules. For instance:

```html
<style>
p {
    color: deeppink;
}
</style>

<p>
    I know <em>you</em> are, but what am I?
</p>
```

Here is an example of an uninherited property:

```html
<style>
    p {
        border: 1px solid hotpink;
    }
</style>

<p>
    I know <em>you</em> are, but what am I?
</p>
```

It is possible to force inheritance by using `inherit`:

```html
<style>
    a {
        color: inherit;
    }
</style>

<p>
    This paragraph contains <a href="#">a hyperlink</a>!
</p>
<p style="color: red;">
    This is a red paragraph with <a href="#">another link</a>.
</p>
```

### The cascade

The CSS language includes many different selectors, and each selector has a relative power. For example, classes are "more specific" than tags, so if there is a conflict between a class and a tag, the class wins. IDs, however, are more specific than classes.

In principle, the cascade algorithm works something like this:

```javascript
const appliedStyles = {
    ...inheritedStyles,
    ...tagStyles,
    ...classStyles,
    ...idStyles,
    ...inlineStyles,
    ...importantStyles
  };
```

CSS specificity gets pretty tricky pretty quickly when you dive below the surface. You can calculate it by adding up the tags, classes, and IDs. But this isn't necessary to know this stuff anymore, because component-based frameworks prevent from having complex selectors.

### Block and inline declarations

The web was built for displaying inter-linked documents. A lot of CSS mechanics and terminology are inherited from the print world:

- Block direction is like lego blocks: they stack together one on top of the other.
- Inline direction is like people standing in-line; they stand side by side, not one on top of the other.

Here are the built-in styles for p tags in Chrome:

```css
p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
```

These properties are equivalent to the 4 cardinal directions: `margin-top`, `margin-bottom`, `margin-left`, and `margin-right`.

`margin-block` refers to the vertical axis. `margin-block-start` refers to the top, since block elements are stacked top-to-bottom. Similarly, `margin-inline-start` refers to the left edge, since "inline" is the horizontal direction, and words are placed left-to-right.

The previous properties are called logical properties. They are intended to entirely replace their conventional alternatives.

### The box model

The 4 aspects of the box model:

1. Content.
2. Padding.
3. Margin.
4. Border.

By default, the `box-sizing` CSS property is set to `content-box`.

It is good practice to reset the the `box-sizing` property to `border-box` like this:

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}
```

The `*` selector will select all elements, but `::before` and `::after` aren't considered elements. They are pseudo-elements. And so we need to select them explicitly.

### Padding

The best unit to set padding is pixels.

```css
.two-way-padding {
    padding: 15px 30px;
}

.three-way-padding {
    padding: 48px 48px 0;
    /* top, right and bottom. The left is equal to the right */
}

.three-way-improved {
    padding: 48px;
    padding-bottom: 0;
}

.four-way-padding {
    padding: 10px 20px 30px 40px;
}
```

### Border

Border is a bit of an odd duck in the trinity of padding/border/margin. Unlike the other two, it has a visual/cosmetic component.

There are three styles specific to border:

- Border width (eg. 3px, 1em).
- Border style (eg. solid, dotted).
- Border color (eg. hotpink, black).

They can be combined into a shorthand. The only required field is border-style. Without it, no border will be shown:

```css
.not-good {
    /* 🙅‍♀️ Won't work – needs a style! */
    border: 2px pink;
  }

  .good {
    /* 🙆‍♀️ Will produce a black, 3px-thick border */
    border: solid;
  }
```

### Margin

With padding and border, only positive numbers (including 0) are supported. With margin, however, we can drop into the negatives. A negative margin can pull an element outside its parent. Negative margins can affect the position of all siblings.

Margins can also be used to center a child in a container. This only works for horizontal margin. Setting top/bottom margin to auto is equivalent to setting it to 0. This only works on elements with an explicit width.

```html
<style>
.content {
    width: 50%;
    margin-left: auto;
    margin-right: auto;
}
</style>

<main>
<section class="content">
    Hello World
</section>
</main>
```

### Flow layout

Flow layout is the default layout used in CSS.

There are 3 main element types in Flow layout:

- Block elements, that stack one upon another.
- Inline elements, that fit one next to each other, by line-wrapping.
- Inline-block elements, that fit one next to each other, without line-wrapping.

Each HTML tag has a default type, that can be changed with the `display` property.

Block elements take all the horizontal space they can. Their `width` is set to `auto` (and not `100%`), unless their `width` is explicitly set to `fit-content`.

Inline elements are numb to the properties `width`, `height`, `margin-top`, `margin-bottom`, `padding-top`, `padding-bottom`, except for replaced elements like:

- `<img />`.
- `<video />`.
- `<canvas />`.

The `width` of inline elements is implicitly set to `fit-content` and cannot be changed.

Inline elements, including replaced elements, have a `line-height`.

### Margin collapse

1. Only vertical margins collapse, and they only do in the flow layout.
2. The bigger margin wins.
3. Nesting doesn't prevent collapsing.
4. Margins only collapse with direct adjacent margins (nested or not).
5. Margins can collapse in the same direction.

## Rendering Logic 2

### The positioned layout

It is possible to opt out of the flow layout by using the `position` property.

The default value for the property `position` is `static` or `initial`.

When we opt into positoned layout, by setting the `position` property to `relative`, `absolute`, `fixed`, or `sticky`, we enable a handful of new CSS properties, including:

It's important to understand that postion doesn't impact layout, i.e. it dosn't impact the postion of the other elements.

### Absolute positioning

Absolute elements can only be contained by ancestor elements using positioned layout. Otherwise, they position themselves in the "initial containing block", which is a box of the size of the viewport.

When an absolute element is used without setting `top`, `right`, `bottom`, `left` or `inset`, it sits in its default in-flow position, but is "invisible" to other in-flow elements.

It is possible to center an absolute element by setting its `inset` property to `0` and its `margin` property to `auto`. The element must have a `width` and a `height`.

### Stacking contexts

Positioned elements always render on top of non-positioned ones.

It is possible to create a stacking context with the property `isolation: isolate;`. This can prevent the "z-index wars".

The `z-index` property doesn't work inthe flow layout, but it works with the flex and grid layout.

### Fixed positioning

Fixed positioning only works in regards to the viewport. Fixed-position element are immune to scrolling.

Beware. Fixed positiong only works if any ancestor doesn't have a `transform` property.

### Overflow

If an element goes outside of its parent, it is possible to use the property `overflow: scroll` or `overflow: auto` to make the content stay inside of its parent.

`overflow: auto` is a smart value. A scrollbar is only added if necessary.

`overflow` is a shorthand for 2 distinc properties:

1. `overflow-x`.
2. `overflow-y`.

It is possible to make inline elements scrollable by using the properties `white-space: nowrap;` and `overflow: auto;`.

### Sticky positioning

A sticky-positioned element always stays in its parent.
