# Sources des anciens sujets officiels de l'IFORD

Recherche effectuée en octobre 2026. Les liens ci-dessous ont été identifiés par recherche web.

## Source officielle (à privilégier)

- Page du concours : https://iford-cm.org/index.php/concours-entree
- Rubrique « Anciens sujets au concours » : http://www.iford-cm.org/index.php/formation?id=123
- Dossier des sujets : `https://iford-cm.org/images/docs/anciens-sujets/<ANNÉE>/<FICHIER>.pdf`
  - Exemple confirmé : https://iford-cm.org/images/docs/anciens-sujets/2023/MATHS_B_2023.pdf
    (Mathématiques, concours B, 21 février 2023, durée 4 h)
- Dépliant / programme officiel : https://iford-cm.org/images/docs/06-depliant-conc.pdf
- Affiche du concours : http://www.iford-cm.org/images/docs/07-concours-2023.pdf

## Autres plateformes recensant des anciens sujets (A et B, sessions 2014 → 2025)

- Kamerpower : https://kamerpower.com/fr/iford-anciens-sujets-epreuves-et-corriges-concours-iford/
  et https://kamerpower.com/epreuves/concours/cm/iford-cm/
  (sessions 2014, 2015… : Maths A et B, Probabilités-Statistique A et B, Culture générale)
- Comment Postuler : https://www.commentpostuler.com/2021/03/anciens-sujets-au-concours-dentree.html
- Edukamer : https://www.edukamer.info/collections-des-anciennes-epreuves-concours-iford-pdf/
- Orni Préparation : https://ornipreparation.com/downloadss/sujets-au-concours-dentree-a-iford-institut-de-formation-et-de-recherche-demographiques
- Scribd : https://fr.scribd.com/document/935179062/Sujets-de-IFORD ,
  https://www.scribd.com/document/838418448/Iford-Voie-b-2025

## Récupérer les PDF

Lancer depuis la racine du projet, sur une machine ayant accès à Internet :

```bash
bash IFORD/telecharger_sujets.sh
```

Le script essaie les noms de fichiers usuels du dossier officiel pour chaque année et
chaque épreuve, et range les PDF trouvés dans `IFORD/Sujets_Officiels/`.
Les noms autres que `MATHS_B_2023.pdf` sont des hypothèses : les fichiers absents sont
simplement ignorés. Pour les autres sites (Kamerpower, Edukamer…), le téléchargement se fait
à la main depuis un navigateur.

> Les sujets restent la propriété de l'IFORD : vérifier les conditions de réutilisation avant
> de les redistribuer dans l'application.
