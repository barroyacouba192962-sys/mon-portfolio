# Portfolio de Yacouba Barro

Site personnel en ligne sur [bdigistat.com](https://bdigistat.com) : parcours, recherche, projets numériques, design et contact.

## Modifier le contenu

Tout le contenu de la page (formation, expérience, certifications, projets de recherche, projets, compétences, langues)
est regroupé en haut de `app/page.tsx`, dans des listes faciles à modifier. Les images et vidéos des galeries vont dans `public/`.

Les métadonnées (titre, description, aperçu de partage) sont dans `app/layout.tsx`.

## CV

Les CV téléchargeables sont `public/cv-yacouba.pdf` (français) et `public/cv-yacouba-en.pdf` (anglais).
Leurs sources LaTeX sont dans `cv/` ; voir `cv/README.md` pour les régénérer.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.
