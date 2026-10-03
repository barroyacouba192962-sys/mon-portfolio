#!/usr/bin/env bash
# Télécharge les anciens sujets officiels du concours IFORD dans IFORD/Sujets_Officiels/.
# Le schéma d'URL est celui du site officiel :
#   https://iford-cm.org/images/docs/anciens-sujets/<ANNÉE>/<FICHIER>.pdf
# Seul MATHS_B_2023.pdf est confirmé ; les autres noms sont des variantes probables.
# Les fichiers introuvables sont ignorés.
set -u

BASE="https://iford-cm.org/images/docs/anciens-sujets"
DEST="$(cd "$(dirname "$0")" && pwd)/Sujets_Officiels"
FIRST_YEAR=${FIRST_YEAR:-2010}
LAST_YEAR=${LAST_YEAR:-$(date +%Y)}

# dossier_destination:nom1,nom2,...  (YYYY est remplacé par l'année)
EPREUVES=(
  "Type_A:MATHS_A_YYYY,MATH_A_YYYY,MATHEMATIQUES_A_YYYY"
  "Type_B:MATHS_B_YYYY,MATH_B_YYYY,MATHEMATIQUES_B_YYYY"
  "Type_A:PROBA_A_YYYY,PROBAS_A_YYYY,PROBA_STAT_A_YYYY,STAT_A_YYYY"
  "Type_B:PROBA_B_YYYY,PROBAS_B_YYYY,PROBA_STAT_B_YYYY,STAT_B_YYYY"
  "Culture_Generale:CG_YYYY,CULTURE_GENERALE_YYYY,CULTURE_G_YYYY,CG_AB_YYYY"
)

found=0
for year in $(seq "$FIRST_YEAR" "$LAST_YEAR"); do
  for entry in "${EPREUVES[@]}"; do
    dir="${entry%%:*}"
    IFS=',' read -ra names <<< "${entry#*:}"
    mkdir -p "$DEST/$dir"
    for pattern in "${names[@]}"; do
      name="${pattern//YYYY/$year}.pdf"
      out="$DEST/$dir/$name"
      [ -s "$out" ] && { found=$((found + 1)); break; }
      if curl -fsSL -m 60 "$BASE/$year/$name" -o "$out.part" \
         && head -c 4 "$out.part" | grep -q '%PDF'; then
        mv "$out.part" "$out"
        echo "OK  $year/$name -> $dir/"
        found=$((found + 1))
        break
      fi
      rm -f "$out.part"
    done
  done
done

echo "Terminé : $found sujet(s) dans $DEST"
[ "$found" -gt 0 ] || echo "Aucun fichier trouvé : vérifiez la connexion ou consultez SOURCES.md."
