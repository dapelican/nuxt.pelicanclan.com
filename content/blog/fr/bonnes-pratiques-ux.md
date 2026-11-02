---
meta_title: "Bonnes pratiques UX pour le web"
meta_description: "Règles concrètes relatives à la typographie, la mise en page et aux interactions pour des pages web lisibles."
locale: fr
visibility: public
category: UX
slug: bonnes-pratiques-ux
created_at: 2026-11-02
updated_at: 2026-11-02
---

# Bonnes pratiques UX pour le web

Voici mes bonnes pratiques pour garantir une expérience utilisateur optimale sur le web.

## Typographie

- La majorité du texte a une police d'au moins **16 pixels (px)**. Le texte des paragraphes a idéalement une police de 18 px, 19 px ou 20 px.
- Le texte sous 16 px se limite à des mentions très courtes, comme une légende ou une métadonnée. Il reste difficile à lire, y compris quand il est secondaire.
  C'est pour cela que son usage doit être exceptionnel.
- Une ligne de texte compte entre 50 et 75 caractères. Pour cela, on limite la largeur du bloc de texte, généralement entre **500 px et 700 px** en fonction de la police et de sa taille. Un texte plus large devient pénible à lire.
- On n'écrit pas de texte entièrement en lettres majuscules. Les **minuscules** se lisent plus vite : leurs formes sont plus différenciées (hampes, jambages, panses), et nous y sommes habitués. Les majuscules restent possibles pour un sigle, mais rien d'autre.
- Le texte doit toujours apparaître sur un **fond qui le contraste**, afin qu'il soit parfaitement lisible : du texte clair sur un fond sombre ou du texte sombre sur un fond clair.

## Mise en page

- Une page doit présenter une **symétrie apparente**.
- Chaque page a une **marge** en haut, en bas, à gauche et à droite. Ces marges restent constantes.   Elles rétrécissent sur mobile sans disparaître.
- Les éléments de même rôle **s'alignent** sur les mêmes axes.
- Les éléments de même rôle gardent la même taille, le même espacement et le même style, d'une section à l'autre. Un rôle doit provoquer un **effet de répétition**.
- Les éléments avec des rôles différents doivent être espacés pour créer un **effet de séparation**. Le plus difficile est de doser l'espacement, pour ne pas donner la sensation de vide inutile.
- On évite le défilement horizontal, quel que soit l'écran, sauf pour certains élements comme les tableaux. Le contenu doit s'adapter parfaitement à la largeur de l'écran. L'utilisateur peut voir davantage de contenu en utilisant le **défilement vertical** ("scroll"), qui est le défilement naturel pour une page web.
  Autrement dit, on cherche à "empiler" les grands élements les uns au dessus des autres, plutôt qu'à les juxtaposer les uns à côté des autres.
- Le placement des éléments au sein d'une page se fait de la même manière que la lecture de la langue de la page. Par exemple, en français, de gauche à droite, puis de haut en bas.
- Pour un site multilingue, un visiteur peut changer la langue du site facilement en haut de page.

## Interactions

- On **minimise le nombre d'interactions** que l'utilisateur doit faire pour naviguer ou pour effectuer une tâche, tout en gardant une mise en page conforme aux principes précédents.
- Chaque action a un **effet visible** : 
    - un changement de page ou un changement apparent sur la page.
    - un message de succès.
    - un message d'échec, étant explicite pour l'utilisateur.
- Si l'effet de l'action n'est pas immédiat, signler à l'utilisateur qu'il y de l'attente.
