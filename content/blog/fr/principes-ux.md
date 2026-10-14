---
meta_title: "Principes UX pour le web"
meta_description: "Règles concrètes relatives à la typographie, la mise en page et aux interactions pour des pages web lisibles."
locale: fr
visibility: public
category: UX
slug: principes-ux
created_at: 2026-10-13
updated_at: 2026-10-14
---

# Principes UX pour le web

Voici les règles que j'applique pour vérifier qu'une page web est optimale pour l'expérience utilisateur.

## Typographie

- La majorité du texte a une police d'au moins **16 pixels (px)**. Le texte des paragraphes a idéalement une police de 18 px, 19 px ou 20 px.
- Le texte sous 16 px se limite à des mentions très courtes, comme une légende ou une métadonnée. Il reste difficile à lire, y compris quand il est secondaire.
- Une ligne de paragraphe fait environ 50 à 75 caractères, 66 étant un bon repère. Au-delà de 80, l'œil perd le début de la ligne suivante. Cette mesure est celle des livres. On la retrouve sur écran en limitant la largeur du bloc de texte, généralement entre **500 px et 700 px** en fonction de la police et de sa taille.
- On n'écrit pas un mot, une phrase ou un titre entièrement en capitales. Les **minuscules** se lisent plus vite : leurs formes sont plus différenciées (hampes, jambages, panses), et nous y sommes habitués. Les capitales restent possibles pour un sigle ou une étiquette d'un ou deux mots, avec un peu d'interlettrage.
- Le texte doit toujours apparaître sur un **fond qui le contraste**, afin qu'il soit parfaitement lisible : du texte clair sur un fond sombre ou du texte sombre sur un fond clair.

## Mise en page

- Une page doit présenter une **symétrie apparente**.
- Chaque page a une **marge** en haut, en bas, à gauche et à droite. Ces marges restent constantes.   Elles rétrécissent sur mobile sans disparaître.
- Les éléments de même rôle **s'alignent** sur les mêmes axes.
- Les éléments de même rôle gardent la même taille, le même espacement et le même style, d'une section à l'autre. Un rôle doit provoquer un **effet de répétition**.
- Les éléments avec des rôles différents doivent être espacés pour créer un **effet de séparation**. Le plus difficile est de doser l'espacement, pour ne pas donner la sensation de vide inutile.
- On **évite le défilement horizontal**, quel que soit l'écran, sauf pour certains élements comme les tableaux. Le contenu doit s'adapter parfaitement à la largeur de l'écran. L'utilisateur peut voir davantage de contenu en utilisant le défilement vertical ("scroll"), qui est le défilement naturel pour une page web.
- Le placement des éléments au sein d'une page se fait de la même manière que la lecture de la langue de la page. Par exemple, en français, de gauche à droite, puis de huat en bas.

## Interactions

- On **minimise le nombre d'interactions** que l'utilisateur doit faire pour naviguer ou pour effectuer une tâche, tout en gardant une mise en page conforme aux principes précédents.
- Chaque action a un **effet visible** : 
    - un changement de page ou un changement apparent sur la page. Si ce changement n'est pas immédiat, prévoir un élement indiquant un chargement.
    - un message de succès.
    - un message d'échec, étant explicite pour l'utilisateur.
