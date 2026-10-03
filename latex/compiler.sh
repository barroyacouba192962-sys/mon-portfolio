#!/usr/bin/env bash
# Compile les fichiers .tex de latex/<Dossier>/ et place les PDF dans <racine du dépôt>/<Dossier>/.
# Usage : ./compiler.sh                               (tout)
#         ./compiler.sh sujetType                     (un dossier)
#         ./compiler.sh sujetType/SujetType_01.tex    (un fichier)
set -u
cd "$(dirname "$0")"
ROOT=..
BUILD=/tmp/revuecapes-build
mkdir -p "$BUILD"
targets=("$@")
[ ${#targets[@]} -eq 0 ] && targets=(sujetType corrigeSujetType AnciensSujet CorrigeAnciensSujets CultureGenerale)
fail=0
for t in "${targets[@]}"; do
  if [ -d "$t" ]; then files=("$t"/*.tex); else files=("$t"); fi
  for f in "${files[@]}"; do
    dir=$(dirname "$f"); name=$(basename "$f" .tex)
    mkdir -p "$ROOT/$dir" "$BUILD/$dir"
    ok=1
    for pass in 1 2; do
      (cd "$dir" && pdflatex -interaction=nonstopmode -halt-on-error -output-directory="$BUILD/$dir" "$name.tex" > "$BUILD/$dir/$name.stdout" 2>&1) || { ok=0; break; }
    done
    if [ $ok = 1 ]; then cp "$BUILD/$dir/$name.pdf" "$ROOT/$dir/$name.pdf"; echo "OK   $f";
    else echo "FAIL $f (voir $BUILD/$dir/$name.log)"; fail=1; fi
  done
done
exit $fail
