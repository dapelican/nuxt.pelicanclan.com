---
title: "JavaScript frontend"
description: "Notes sur JavaScript dans le navigateur : DOM, événements et APIs web."
created_at: 2026-10-11
locale: fr
visibility: private
category: Programmation
slug: js-frontend
---

# JavaScript frontend

Source : [Vanilla JS](https://firtman.github.io/vanilla/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}

## Comprendre le fonctionnement d'un navigateur

Il est essentiel de comprendre le "critical rendering path".

[https://excalidraw.com/#json=YBtf6HgpwHF1LygTuyRUp,RE8XoKs-tzc8jUN0GZ3LTw](https://excalidraw.com/?utm_source=pelicanclan.com&utm_medium=article#json=YBtf6HgpwHF1LygTuyRUp,RE8XoKs-tzc8jUN0GZ3LTw){target="_blank" rel="noopener noreferrer" class="text-primary"}

Ressource utile: [Understand the critical path](https://web.dev/learn/performance/understanding-the-critical-path?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

## Les web APIs

### La différence entre les "specifications" (APIs) et les "interfaces"

Attention : l'API DOM ne suffit pas à elle-seule à intéragir avec le DOM, contrairement à ce que l'on pourrait intuitivement penser.

Les spécifications ou APIs sont des documents officiels crées par des organisations (comme W3C, WHATWG, ECMA) qui définissent comment une fonctionnalité doit être implémentée.

Les interfaces sont les objets et leurs propriétés (y compris les méthodes) qui permettent d'écrire du JavaScript pour faire quelque chose.

En d'autres termes, une spécification ou API définit une ou plusieurs interfaces.

En tant que développeurs, ce qui nous intéresse, ce sont les interfaces.

### Ne pas confondre le DOM et l'API DOM

Le DOM est une structure en mémoire du navigateur qui représente la structure (HTML) d'une page web, que l'on appelle "document".

L'API DOM est l'ensemble des objets, propriétés et méthodes (fonctions) qui permettent en JavaScript de modifier le DOM.

JavaScript permet de changer le DOM, puis le changement du DOM est répercuté (ou non) dans la page du navigateur. Important de retenir que changer le DOM n'implique pas forcément changer la page web. Un changement du DOM est répercuté dans le navigateur lorsque le thread est relâché.

Ambiguité entretenue voire assumée sur le site MDN. La page DOM est classée comme une sous-page de "Web APIs".

### Les objets intéressants (interfaces intéressantes) 1

| Nom de l'nterface | Objet JavaScript | Spécification/API |
| --- | --- | --- |
| Window | `console.log(window);` | HTML DOM API |
| Document | `console.log(document);` | DOM |
| Document | `console.log(window.document);` | HTML DOM API |
| Location | `console.log(location);`<br>`console.log(window.location)`<br>`console.log(document.location);`<br>`console.log(window.document.location);`<br>`location.reload();` | HTML DOM API/DOM |
| Element | `const body = document.getElementsByTagName('body')[0];console.log(body);` | DOM |

Remarque : `document.location` `window.document.location` sont considérés comme obsolètes ("legacy code").

## Les manipulations possibles d'un élement

1. Sélectionner un élément.
2. Lire son contenu.
3. Modifier son contenu.
4. Créer un nouvel élement. L'insérer à un endroit précis dasn la page, avant ou après un autre élément.
5. Supprimer l'élement sélectionné.

## Sélectionner les éléments

| Elément sélectionné par | Méthode | Type d'objet retourné |
| --- | --- | --- |
| ID | `document.getElementById()` | 1 élément (Element) |
| nom de classe | `document.getElementsByClassName()` | Liste dynamique ("live") d'éléments (HTMLCollection) |
| nom de l'élément (tag) | `document.getElementsByTagName()` | Liste dynamique ("live") d'éléments (HTMLCollection) |
| par sélecteur CSS 1 | `document.querySelector()` | 1 élément (Element) |
| par sélecteur CSS 2 | `document.querySelectorAll()` | Liste statique d'éléments (NodeList) |
| Par valeur de l'attribut `name` | `document.getElementsByName()` | Liste dynamique ("live") d'éléments (HTMLCollection) |
| en naviguant dans le DOM |  |  |

## Lire ou changer les attributs d'un élément

La plupart des attributs HTML et des propriétés JavaScript correspondantes ont le même nom. Pour les noms d'attributs avec des tirets ("kebab case"), l'équivalent en JavaScript est en casse chameau ("camel case"). On peut noter des exceptions lorsqu'en JavaScript, les noms des propriétés sont des mots réservés. Exemples:

```javascript
element.hidden = false;
element.className = "new"; // class est un mot réservé
element.htmlFor = 'bouton-bleu'; // for est un mot réservé
element.style.marginTop = '5px'; // casse chameau
```

## Ajouter un "event listener"

```javascript
element.addEventListener('event name', (event) => {
  // Faire quelque chose ici
});
```

## Lire et modifier le contenu d'un élement

1. `textContent`
2. `innerHTML`

```javascript
const element = document.querySelector('#title');
const text = element.textContent;
element.textContent = 'New title';
```

```javascript
const element = document.querySelector('h1');
const h1_html = element.innerHTML;
element.innerHTML = '<i>New title</i>';
```

## Créer un nouvel élément

```javascript
const element = document.querySelector('body');
const h1 = document.creatElement('h1');
h1.textContent = 'Bruno Mars';
element.appendChild(h1);
```

## Voir le code source / Inspecter

Quand on inspecte, on inspecte le DOM.

Même si le code source ne contient pas d'éléments **head** ou **body**, ils sont ajoutés automatiquement dans le DOM. C'est la raison pour laquelle la page suivante a un **body** bleu, alors même qu'il n'y a pas de **body** dans le code source de la page :

```html
<!DOCTYPE html>
<style>body { background-color: blue;}</style>

<title>Test</title>
```

## Performance

Il est possible de rendre JavaScript plus performant en évitant de chercher dans tout le document, mais en cherchant dans un fragment du document. Au lieu d'écrire :

```javascript
const span = document.querySelector('span');
```

Ecrire :

```javascript
const nav = document.querySelector('nav');
const span = nav.querySelector('span');
```

## Différence entre defer et async

Si on ne sait pas lequel utiliser, utiliser `defer`.

Mettre tous les scripts en bas de la page pour ne pas interrompre le parsing de la page est une pratique obsolète. Il faut utiliser `defer` ou `async`.

Avec `async`, le script sera exécuté dès qu'il sera téléchargé, ce qui peut interrompre le parsing de la page.

## Script setup

Even if we use a script with defer, it's not a ggod practice to srtat maniuplating the DOM right from the beggining of the script.

It is best to make sure that the brwoser has finished buildind the DOM by using `window.addEventListener('DOMContentReady', () => {})`

## Event handling

Each DOM element has a list of possible events we can listen to:

- Basic: 'load', 'click', 'dblclick'
- Value: 'change' (when the value changes in a form input for example)
- Keyboard events: 'keyup', 'keydown', 'keypress'
- Mous events: 'mouseover', 'mouseout'
- Pointer and touch events
- Scroll, focus and more APIs
- Some specific objects have special events: 'DOMContentLoaded' and 'popstate' are only available on the window object.

Normally, event names are lowercased, without seperators, and in infinitive mode ('click' vs 'clicked'). One exception is 'DOMContentLoaded'.

There are different ways to bind functions to events:

- `onevent` properties. For example: `onclick`, `onload`. `element.onclick = () => {};`, `element.onload = () => {};`.
- `addEventListener` (Recommended). We can use different functions for the same event, whereas it is not possible with `onevent` properties.

`addEventListener` can be passed options:

```javascript
const eventHandler = () => {};
const options = {
  once: true,
  passive: true;
};

element .addEventLister('load', eventHandler, options);
```

`removeEventListener` is useful so that we do not keep unnecessary functions in memory.

## Dispatch custom event

```javascript
const event = new Event('toto');
element.dispatchEvent(event);
```

## Reduce verbosity

JavaScript is very flexible language. It is possible to reduce verbosity by creating "aliases".

```javascript
const $ = () => document.querySlector.call(this, arguments);
const $$ = () => document.querySlectorAll.call(this, arguments);
HTMLElement.prototype.on = (a, b, c) => this.addEventListener(a, b, c);
HTMLElement.prototype.off = (a, b, c) => this.removeEventListener(a, b, c);
HTMLElement.prototype.$ = (s) => this.querySelector(s);
HTMLElement.prototype.$$ = (s) => this.querySelectorAll(s);
```

## History API

```javascript
// pushing a new URL; the second argument is unused
history.pushState(optional_state, null, "/new-url");

// to listen for changes in URL
window.addEventListenr('popstate', (event) => {
  let url ) location.url;
};
```

Warning: 'popstate' won't be fired if the user clicks on an external link or changes the URL manually.

## Dataset: attributs perrsonalisés

## Proxy

Un proxy est un garde du corps pour une célébrité. La célébrité est un objet.

Le garde du corps du corps offre une protection à la célébrité contre l'extérieur.

Tout élément extérieur qui voudra intéragir avec la célébrité devra passer par le gare du corps.
