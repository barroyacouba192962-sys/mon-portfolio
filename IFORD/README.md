# Concours d'entrée à l'IFORD (Yaoundé) — Dossier de préparation

Ressources pour préparer le concours d'entrée en **Master Professionnel en Démographie**
de l'**Institut de Formation et de Recherche Démographiques (IFORD)**, Université de Yaoundé II,
BP 1556 Yaoundé (Cameroun).

## 1. Le concours en bref

| | Concours **Type A** | Concours **Type B** |
|---|---|---|
| Public | Licence en Démographie, Géographie, Sociologie, Anthropologie | Diplôme d'Ingénieur des Travaux Statistiques (ITS), Licence en Sciences économiques, Statistique, Mathématiques, Informatique |
| Épreuve 1 (4 h, coef. 1/3) | Culture générale (commune A et B) | Culture générale (commune A et B) |
| Épreuve 2 (4 h, coef. 1/3) | Mathématiques A | Mathématiques B |
| Épreuve 3 (4 h, coef. 1/3) | Probabilités et Statistique A | Probabilités et Statistique B |

Les écrits se déroulent généralement fin février (session 2026 : 24-25 février 2026,
centre unique de Yaoundé pour le Cameroun, centres nationaux dans les autres pays membres).

### Programme (résumé du dépliant officiel)

**Mathématiques A** : équations et inéquations du 1er degré, systèmes de deux équations,
racines carrées, équations du 2nd degré (somme et produit des racines), fonctions usuelles
(polynômes, rationnelles, logarithme, exponentielle), dérivées, études de fonctions, suites
(arithmétiques, géométriques), primitives et intégrales simples, calcul matriciel élémentaire.

**Probabilités et Statistique A** : espaces probabilisés finis (axiomes, indépendance),
schémas de tirage avec et sans remise, variables aléatoires réelles discrètes finies et
fonction de répartition, couples de v.a. discrètes (lois conjointe et marginales),
espérance et variance, description statistique d'une population ou d'un échantillon,
représentations graphiques.

**Mathématiques B** : analyse (suites, séries, fonctions d'une et plusieurs variables,
intégrales généralisées, équations différentielles), algèbre linéaire (espaces vectoriels,
matrices, déterminants, diagonalisation), convergences stochastiques et applications
(inégalité de Bienaymé-Tchebychev, convergence en loi, en probabilité, loi faible des
grands nombres, théorème central limite).

**Probabilités et Statistique B** : statistique descriptive (unités, caractères qualitatifs et
quantitatifs, variables discrètes et continues, tableaux et graphiques, tendance centrale,
dispersion, concentration), dénombrement et probabilités, distributions à deux variables
(régression, corrélation), séries chronologiques, ajustement de distributions observées à des
lois théoriques (binomiale, Poisson, gamma, normale, log-normale, Pareto), estimation et tests.

**Culture générale** (commune) : dissertation ou commentaire sur un sujet de société,
souvent lié à la population et au développement (démographie africaine, urbanisation,
jeunesse, genre, santé, migrations, environnement, éducation, emploi, numérique…).

## 2. Contenu du dossier

```
IFORD/
├── README.md                      ← ce fichier
├── SOURCES.md                     ← où trouver les anciens sujets officiels (liens)
├── telecharger_sujets.sh          ← script pour télécharger les sujets officiels
├── Sujets_Officiels/              ← destination des PDF officiels (vide tant que le script n'a pas tourné)
│   ├── Type_A/
│   ├── Type_B/
│   └── Culture_Generale/
├── Type_A/
│   ├── IFORD_TypeA_Mathematiques_Entrainement.tex
│   └── IFORD_TypeA_ProbaStat_Entrainement.tex
├── Type_B/
│   ├── IFORD_TypeB_Mathematiques_Entrainement.tex
│   └── IFORD_TypeB_ProbaStat_Entrainement.tex
└── Culture_Generale/
    └── IFORD_CultureGenerale_Sujets.tex
```

> **Important — origine des documents.**
> Les fichiers `.tex` des dossiers `Type_A/`, `Type_B/` et `Culture_Generale/` sont des
> **sujets d'entraînement rédigés pour l'application**, au format et au niveau du concours
> (4 h, programme officiel). **Ce ne sont pas des reproductions des sujets officiels.**
> Les anciens sujets officiels sont publiés par l'IFORD (voir `SOURCES.md`) et se placent
> dans `Sujets_Officiels/` grâce au script `telecharger_sujets.sh`.

## 3. Compiler les sujets d'entraînement

```bash
cd IFORD/Type_A && pdflatex IFORD_TypeA_Mathematiques_Entrainement.tex
```

Chaque fichier contient le sujet puis, après un saut de page, un **corrigé**.
Ils n'utilisent que des paquets standards (`amsmath`, `amssymb`, `geometry`, `enumitem`,
`booktabs`) et compilent avec `pdflatex`, `xelatex` ou Overleaf.
