#!/usr/bin/env bash
# Télécharge les anciens sujets officiels du concours IFORD dans IFORD/Sujets_Officiels/.
# Les URL proviennent de la page « Anciens sujets au concours » du site officiel :
#   https://iford-cm.org/index.php?option=com_content&view=article&id=125&Itemid=303
# (sessions publiées : février 2023 et mars 2015). Relancer sans risque : les fichiers déjà
# présents ne sont pas retéléchargés.
set -u

BASE="https://iford-cm.org/images/docs/anciens-sujets"
DEST="$(cd "$(dirname "$0")" && pwd)/Sujets_Officiels"

# URL source | chemin de destination
SUJETS=(
  "$BASE/2023/MATHS_A_2023.pdf|Type_A/IFORD_2023_Mathematiques_TypeA.pdf"
  "$BASE/2023/PROBA-STAT_A_2023.pdf|Type_A/IFORD_2023_ProbaStat_TypeA.pdf"
  "$BASE/2023/MATHS_B_2023.pdf|Type_B/IFORD_2023_Mathematiques_TypeB.pdf"
  "$BASE/2023/PROBA-STAT_B_2023.pdf|Type_B/IFORD_2023_ProbaStat_TypeB.pdf"
  "$BASE/2023/culture.pdf|Culture_Generale/IFORD_2023_CultureGenerale_AB.pdf"
  "$BASE/2023/annexes.pdf|Annexes/IFORD_2023_Annexe_ProbaStat_A_B.pdf"
  "$BASE/01-sujet1.pdf|Type_A/IFORD_2015_Mathematiques_TypeA.pdf"
  "$BASE/02-sujet2.pdf|Type_B/IFORD_2015_Mathematiques_TypeB.pdf"
  "$BASE/03-sujet3.pdf|Type_A/IFORD_2015_ProbaStat_TypeA.pdf"
  "$BASE/03-sujet4.pdf|Type_B/IFORD_2015_ProbaStat_TypeB.pdf"
  "$BASE/03-sujet5.pdf|Culture_Generale/IFORD_2015_CultureGenerale_AB.pdf"
)

ok=0; ko=0
for entry in "${SUJETS[@]}"; do
  url="${entry%%|*}"
  out="$DEST/${entry#*|}"
  mkdir -p "$(dirname "$out")"
  if [ -s "$out" ]; then ok=$((ok + 1)); continue; fi
  if curl -fsSL -m 120 "$url" -o "$out.part" && head -c 4 "$out.part" | grep -q '%PDF'; then
    mv "$out.part" "$out"; echo "OK     ${entry#*|}"; ok=$((ok + 1))
  else
    rm -f "$out.part"; echo "ÉCHEC  $url"; ko=$((ko + 1))
  fi
done

echo "Terminé : $ok fichier(s) présent(s), $ko échec(s) — dossier $DEST"
