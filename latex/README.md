# La Revue CAPES — sources LaTeX des sujets et corrigés

Ce dossier contient les sources LaTeX extraites de `La RévueCapesVrai.tex`,
découpées en un document par sujet et par corrigé. Les PDF compilés sont
rangés à la racine du dépôt :

| Dossier PDF             | Contenu                                                        |
|-------------------------|----------------------------------------------------------------|
| `sujetType/`            | 15 sujets types de mathématiques (`SujetType_01` à `_15`)      |
| `corrigeSujetType/`     | 15 corrigés détaillés des sujets types de mathématiques        |
| `AnciensSujet/`         | Anciens sujets de mathématiques, sessions 2016 à 2022          |
| `CorrigeAnciensSujets/` | Corrigés détaillés des anciens sujets de mathématiques         |
| `CultureGenerale/`      | Cours de méthodologie, 16 sujets types de dissertation et leurs corrigés, anciens sujets (2016, 2017, 2021, 2021 mesure nouvelle) et leurs corrigés |

## Compilation

Prérequis : une distribution TeX (TeX Live ou MiKTeX) avec `pdflatex`.

```sh
cd latex
./compiler.sh                                # tout recompiler
./compiler.sh corrigeSujetType               # un dossier
./compiler.sh sujetType/SujetType_01.tex     # un seul fichier
```

Les fichiers temporaires sont produits dans `/tmp/revuecapes-build` et les
PDF sont copiés dans le dossier correspondant à la racine du dépôt.

Tous les documents partagent le préambule `preambule.tex` (en-tête, filigrane
« La RevueCapes », commandes `\remarque`, `\rubrique`, `\partie`, …).

## Corrections apportées par rapport au document d'origine

Les corrigés ont été relus, vérifiés (calcul formel pour les mathématiques) et
détaillés. Les erreurs du document d'origine ont été corrigées ; les plus
importantes sont signalées dans les PDF par un encadré « Remarque ». Quelques
coquilles d'énoncés ont aussi été rectifiées (par exemple `|a| ≠ 1` dans le
sujet type 4, l'hypothèse `0 ≤ x₀ ≤ x` dans l'ancien sujet 2017, l'exposant de
`fₙ` dans l'ancien sujet 2020).

Le deuxième sujet intitulé « Session 2021 » dans le document d'origine est en
réalité la session 2022 (c'est ainsi qu'il est désigné dans les corrigés) ; il
est donc rangé sous `AncienSujet_2022`.
