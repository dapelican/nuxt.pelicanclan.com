---
title: "Nomination, brouillon 3"
description: "Brouillon sur les itérateurs, les itérables et les générateurs en JavaScript."
created_at: 2026-10-11
locale: fr
visibility: private
category: Programmation
slug: nomination-draft-3
---

# Nomination, brouillon 3

## Premières remarques

1. Enjeu/problème : comment pouvoir itérer sur n'importe quel objet dans JS (et pas seulement sur les tableaux) ?
2. Les itérateurs et les itérables permettent la généralisation et standardisation de la notion d'**itération**.
3. La finalité de l'itération : utiliser une boucle "universelle" `for...of`.
4. itérateur < itérable < générateur.
5. Exemple au cours de cette présentation : `jfk` et `letters`.

## Itérateur : approche informelle

Un itérateur est un objet qui permet d'itérer sur des valeurs, en mode "séquence", avec :

1. un ordre précis.
2. une cadence que l'on maitrise.

## Itérateur : approche formelle

Un itérateur est un objet qui implémente/suit/respecte le **protocole d'itérateur**.

C'est un objet qui a une méthode `next()` qui retourne toujours un objet avec 2 propriétés :

- `value`.
- `done`: un booléen qui indique si la dernière valeur de la séquence a été consommée.

## Itérable

Un itérable est un objet qui a implementé ou a accès à une méthode spéciale : `[Symbol.iterator]` également notée `@@iterator`.

Cette méthode retourne un itérateur.

On peut utiliser la boucle `for...of` pour itérer sur un itérable.

## Objet itérable de différente façons

- Exemple : `planets`.

## Générateur

Un générateur est un itérateur itérable créé/retourné par une fonction spéciale.

Fonction spéciale = syntaxe spéciale :

1. `*`.
2. `yield`.

Attention, un générateur est forcément un itérateur, mais un itérateur n'est pas forcément un générateur.

Un générateur est un itérateur itérable.

Un objet peut être itérable de différentes façons en ayant plusieurs générateurs.

## L'itérateur par défaut dans les objects standards

## Les autres itérateurs dans les objets standards

## La syntaxe spread
