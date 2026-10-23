# CV (sources LaTeX)

- `cv-fr.tex` : CV en français (avec photo)
- `cv-en.tex` : CV en anglais (sans photo ; remplacer le dernier argument `{}` de `\cvheader` par `{photo.png}` pour l'ajouter)
- `cv-style.sty` : mise en page commune (polices TeX Gyre Pagella et Inter, couleurs, rubriques)

## Mettre à jour

1. Modifier `cv-fr.tex` et/ou `cv-en.tex`.
2. Compiler avec XeLaTeX (deux passes) :

   ```bash
   cd cv
   xelatex cv-fr.tex && xelatex cv-fr.tex
   xelatex cv-en.tex && xelatex cv-en.tex
   ```

3. Copier les PDF dans le site :

   ```bash
   cp cv-fr.pdf ../public/cv-yacouba.pdf
   cp cv-en.pdf ../public/cv-yacouba-en.pdf
   ```

Les polices Inter et TeX Gyre Pagella doivent être installées sur la machine qui compile.
