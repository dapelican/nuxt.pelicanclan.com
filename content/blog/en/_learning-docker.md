---
title: "Learning Docker"
description: "Here are the resources I recommend to learn Docker:"
created_at: 2026-10-11
locale: en
visibility: private
category: Programming
slug: learning-docker
---

# Learning Docker

## My recommended resources

Here are the resources I recommend to learn Docker:

1. [Docker for beginners](https://docker-curriculum.com/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, by Prakhar Srivastav. The best tutorial I've found on Docker. If you study carefully this tutorial, You will have a solid basis in Docker.
2. [Docker's command line reference](https://docs.docker.com/engine/reference/commandline/docker/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}. The explanation of each command line on the official documentation is actually quite good. I definitely recommend it. For each command line appearing in Prakhar's tutorial, have a look at the official documentation.
3. [Docker for Dummies](https://dev.to/stevenmcgown/docker-for-dummies-2bff?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}, by StevenMcGown. Very short but interesting article, in particular to be clear about the difference between a container and an image. The recipe and cake analogy stuck with me.

## My struggle with Docker

Learning Docker has been a struggle for me. I had to use Docker Compose at work, without knowing anything about Docker. It's like trying to run without knowing how to walk.

I made many attempts to try to learn and understand this shit: dozens of books, videos, articles. There are indeed many resources about Docker, but most of them were useless for me. The only resource that was a game changer was Prakhar Srivastav's tutorial (the first ressource listed above). Congrats to you Prakhar! You have my infinite gratitude.

I had 2 difficulties with Docker:

1. The concept of an image was hard to grasp for me. The word seems so simple, but the concept behind it is much more abstract. A Docker image can be built, can be stored on a registry, can be downloaded (pulled), can be used to create a container. But we cannot see directly its contents. That was weird to me.
2. Docker is a command line game. So reading about it from a theoric point of view is a waste of time. I think you can really understand and master Docker only by mastering the command lines and their options. In particular, by knowing exactly what a command line does. This is exactly the approach taken by Prakhar in his tutorial, and that's why this tutorial made so much sense to me.
