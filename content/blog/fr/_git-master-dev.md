
# Cours Git de FrontendMasters

Mes notes et remarques sur le cours Git de FrontendMasters, dispensé par ThePrimeagen. La version écrite du cours est [disponible en ligne](https://theprimeagen.github.io/fem-git).

Remarque : j’ai eu énormément de mal à comprendre Git pour 3 raisons.

1. Je n’avais pas compris la puissance de Git, ou plus globalement d’un système de contrôle de versions. Grâce à Git, on peut avoir différentes versions d’un même dossier, avec des fichiers et des contenus différents, sans que le dossier ne change de nom. En changeant la branche courante d’un dossier Git, je peux avoir des fichiers différents. Bizarrement, j’ai eu dû mal avec cette idée.

2. Pour un répertoire Git donné, on ne peut peut être que sur une seule branche à la fois. Et quels que soient les moyens utilisés pour voir les fichiers de ce dossier (terminal ou fenêtre dans l’interface graphique), je verrai les fichiers de la branche courante. Donc, sur un même ordinateur, il est impossible de comparer des fichiers entre 2 branches différentes. On ne peut voir que les fichiers d’une seule branche à la fois. Si j’ouvre 2 terminaux, et si je change de branche sur un terminal, l’autre terminal aura aussi changé de branche, même si on en a pas forcément l’impression. Car la branche courante est stockée au niveau du répertoire GIt.

3. Dans toutes ressources liées à Git que j’ai vues ou lues, on n’insiste pas assez sur ce point : il est **primordial** de faire en sorte que le système d’exploitation (OS) indique toujours la branche courante de Git. A minima dans les terminaux. Et éventuellement dans les managers de fichiers de l’interface graphique.

Un commit représente l’entièreté du code d’un projet. Un commit est représenté par un ID appelé SHA, qui est une suite 40 caractères hexadécimaux.

Ajout personnel : Le SHA est généréré par l’algorithme SHA-1 (Secure Hash Algorithm). L’algorithme utilise le contenu du commit pour être généré. C’est un algorithme déterministe. Le même contenu créera le même ID, et un caractère qui change dans le contenu créera un ID différent.

Un fichier peut avoir 3 statuts différents aux yeux de Git :
- Les fichiers non suivis par Git. Git ignore l’existence de ces fichiers, car on ne lui a pas dit explicitement de les prendre en compte. Ce sont les fichiers que l’on peut perdre à tout jamais s’ils sont supprimés.
- Les fichiers suivis par Git. Ce sont les fichiers dont on a déclarés l’existence à Git, en utilisant la ligne de commande _git add_. Dans le jargon de Git, ces fichiers sont staged.
- Les fichiers qui ont été _commités_. Ces fichiers font désormais partis de l’historique du projet.

Dans Git, un _tree_ est similaire à un répertoire. Un _blob_ est similaire à un fichier. Un commit est un _tree_, qui contient au moins un _blob_.

Les questions clés
- Comment transforme t-on un répertoire en repo Git ?
- Comment transformer un repo Git en répertoire normal, c’est à dire sans historique de versions ?

