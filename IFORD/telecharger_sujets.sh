#!/usr/bin/env bash
# Télécharge tous les anciens sujets du concours IFORD dans IFORD/Anciens_Sujets/.
# Sources (voir SOURCES.md) :
#   - site officiel iford-cm.org            (sessions 2015 et 2023)
#   - kamerpower.com                        (session 2018 ; limite de 6 téléchargements / 24 h)
#   - Google Drive via concourscameroon.com (scans des sujets 2003 → 2012)
#   - Google Drive via commentpostuler.com  (retranscriptions touslesconcours 2007 → 2014)
# Relancer sans risque : les fichiers déjà présents ne sont pas retéléchargés.
set -u

DEST="$(cd "$(dirname "$0")" && pwd)/Anciens_Sujets"
UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36"

# source | chemin de destination (relatif à Anciens_Sujets/)
SUJETS=(
  "https://iford-cm.org/images/docs/anciens-sujets/2023/MATHS_A_2023.pdf|Type_A/Mathematiques/IFORD_2023-02_Fevrier_Mathematiques_TypeA.pdf"
  "https://iford-cm.org/images/docs/anciens-sujets/2023/PROBA-STAT_A_2023.pdf|Type_A/Probabilites_Statistique/IFORD_2023-02_Fevrier_ProbaStat_TypeA.pdf"
  "https://iford-cm.org/images/docs/anciens-sujets/2023/MATHS_B_2023.pdf|Type_B/Mathematiques/IFORD_2023-02_Fevrier_Mathematiques_TypeB.pdf"
  "https://iford-cm.org/images/docs/anciens-sujets/2023/PROBA-STAT_B_2023.pdf|Type_B/Probabilites_Statistique/IFORD_2023-02_Fevrier_ProbaStat_TypeB.pdf"
  "https://iford-cm.org/images/docs/anciens-sujets/2023/culture.pdf|Culture_Generale/IFORD_2023-02_Fevrier_CultureGenerale_TypeA_B.pdf"
  "https://iford-cm.org/images/docs/anciens-sujets/2023/annexes.pdf|Annexes/IFORD_2023-02_Fevrier_Annexe_Tables_ProbaStat.pdf"
  "https://iford-cm.org/images/docs/anciens-sujets/01-sujet1.pdf|Type_A/Mathematiques/IFORD_2015-03_Mars_Mathematiques_TypeA.pdf"
  "https://iford-cm.org/images/docs/anciens-sujets/03-sujet3.pdf|Type_A/Probabilites_Statistique/IFORD_2015-03_Mars_ProbaStat_TypeA.pdf"
  "https://iford-cm.org/images/docs/anciens-sujets/02-sujet2.pdf|Type_B/Mathematiques/IFORD_2015-03_Mars_Mathematiques_TypeB.pdf"
  "https://iford-cm.org/images/docs/anciens-sujets/03-sujet4.pdf|Type_B/Probabilites_Statistique/IFORD_2015-03_Mars_ProbaStat_TypeB.pdf"
  "https://iford-cm.org/images/docs/anciens-sujets/03-sujet5.pdf|Culture_Generale/IFORD_2015-03_Mars_CultureGenerale_TypeA_B.pdf"
  "kamerpower:128|Type_A/Mathematiques/IFORD_2018-02_Fevrier_Mathematiques_TypeA.pdf"
  "kamerpower:131|Type_B/Mathematiques/IFORD_2018-02_Fevrier_Mathematiques_TypeB.pdf"
  "kamerpower:130|Culture_Generale/IFORD_2018-02_Fevrier_CultureGenerale_TypeA_B.pdf"
  "gdrive:1jJeLItgo46xjGy6jlruH0ucbI2G0fCCj|Culture_Generale/IFORD_2003-04_Avril_CultureGenerale_TypeA_B_scan.pdf"
  "gdrive:1-AvVpT5bPqMBfRcvvPwzGOqtXp5JNStt|Type_A/Mathematiques/IFORD_2003-04_Avril_Mathematiques_TypeA_scan.pdf"
  "gdrive:1lmIA78ypSDD9PkfhCvwPdwSb5RBB5mho|Culture_Generale/IFORD_2005-04_Avril_CultureGenerale_TypeA_B_scan.pdf"
  "gdrive:1RHCwXpNP3PReDXiqpXyyp8hah___FrKP|Type_A/Mathematiques/IFORD_2005-04_Avril_Mathematiques_TypeA_scan.pdf"
  "gdrive:1HCxSdi9N6apFwoVKTulXLK4GiCIXJuhX|Culture_Generale/IFORD_2006-04_Avril_CultureGenerale_TypeA_B_scan.pdf"
  "gdrive:1sIAE7HC5AQbGY1yKZ3Kqk0trGP2NGPvA|Type_A/Mathematiques/IFORD_2006-04_Avril_Mathematiques_TypeA_scan.pdf"
  "gdrive:11S_jrlKzyjHNGXkydGYPXrGfL1TTuJNY|Culture_Generale/IFORD_2007-04_Avril_CultureGenerale_TypeA_B_scan.pdf"
  "gdrive:1TkEwcPoBJuNMGwq2CNFdDab8xTu__d1E|Type_A/Mathematiques/IFORD_2007-04_Avril_Mathematiques_TypeA_scan.pdf"
  "gdrive:1us35wNDw8d4bI1-YJlgAxBjxIDatTn2L|Culture_Generale/IFORD_2008-04_Avril_CultureGenerale_TypeA_B_scan.pdf"
  "gdrive:1vGhCXBjS3ty2K8t7SDYbz84nq_neVUf-|Type_A/Mathematiques/IFORD_2008-04_Avril_Mathematiques_TypeA_scan.pdf"
  "gdrive:1qBmgwGKXKJp5zyvL5hoHetT0hkBdudN3|Culture_Generale/IFORD_2009_CultureGenerale_TypeA_B_scan.pdf"
  "gdrive:1MaKKS7XQeY6IVo8tBTVuGHxa8xEovvCt|Type_A/Mathematiques/IFORD_2009_Mathematiques_TypeA_scan.pdf"
  "gdrive:1GMtyoXaPZxbhyoqVd1Ert0uY0iPIY_0T|Culture_Generale/IFORD_2010-04_Avril_CultureGenerale_TypeA_B_scan.pdf"
  "gdrive:1-QBtqIPMPb3a0_yE_bq7-qCO1znagcSl|Type_A/Mathematiques/IFORD_2010-04_Avril_Mathematiques_TypeA_scan.pdf"
  "gdrive:1qG7OvoYbrOfEdCaNak0wGLwxeQ9Dpl47|Culture_Generale/IFORD_2011-03_Mars_CultureGenerale_TypeA_B_scan.pdf"
  "gdrive:1SRJFBCnGPSupjLY3aIBQmEG2zvDPVJLw|Type_A/Mathematiques/IFORD_2011-03_Mars_Mathematiques_TypeA_scan.pdf"
  "gdrive:1WKAXCSU2ZzKhLWH4BUCVmvxnqCbfJ6Ks|Culture_Generale/IFORD_2012-03_Mars_CultureGenerale_TypeA_B_scan.pdf"
  "gdrive:11uewGTdHHeDfVwt2O1z-U-jYOREPcSqW|Type_A/Mathematiques/IFORD_2012-03_Mars_Mathematiques_TypeA_scan.pdf"
  "gdrive:1wdWs_MD6CiKW8konm3uDpBDbO1k-2HWB|Retranscriptions/IFORD_2007_CultureGenerale_TypeA_B_retranscrit.pdf"
  "gdrive:1KS9lmnLD9p8umB0dqXglTEOp0YO5KIE-|Retranscriptions/IFORD_2007_ProbaStat_et_Mathematiques_TypeA_retranscrit_avec_corrige.pdf"
  "gdrive:1EmKW29tCQD4oEE9khNWS7tLLBAJc_iGf|Retranscriptions/IFORD_2007_ProbaStat_et_Mathematiques_TypeB_retranscrit_avec_corrige.pdf"
  "gdrive:1-dNtVISsxZfk2qkdxWjNApNfTNujgNOh|Retranscriptions/IFORD_2008_Mathematiques_et_ProbaStat_TypeA_retranscrit_avec_corrige.pdf"
  "gdrive:1SkKGBcrIH_CK1REkJaTgHPK1u6aaG4R3|Retranscriptions/IFORD_2008_ProbaStat_et_Mathematiques_TypeB_retranscrit.pdf"
  "gdrive:1f7KUFKyMVoZubU69LUHTcgUWCEdWoNAA|Retranscriptions/IFORD_2009_CultureGenerale_TypeA_B_retranscrit.pdf"
  "gdrive:1u8tLO7WThP9ORWyb1r_XxRVYWXreXwmA|Retranscriptions/IFORD_2009_Mathematiques_et_ProbaStat_TypeA_retranscrit_avec_corrige.pdf"
  "gdrive:1O7bZITzWdGdchDDYivd-RSoCUW25Ro4U|Retranscriptions/IFORD_2009_ProbaStat_et_Mathematiques_TypeB_retranscrit.pdf"
  "gdrive:1bN5UMyXoxYoiInYDB6D4q5cQnDybullY|Retranscriptions/IFORD_2010_CultureGenerale_TypeA_B_retranscrit.pdf"
  "gdrive:1eNMFegUaAIKpY8izMMfvQDym8JCWsMXm|Retranscriptions/IFORD_2010_ProbaStat_et_Mathematiques_TypeA_retranscrit_avec_corrige.pdf"
  "gdrive:1WWzgd7Sue1lnIFSoFFwI9WblL47dRHPN|Retranscriptions/IFORD_2010_ProbaStat_et_Mathematiques_TypeB_retranscrit.pdf"
  "gdrive:1GkFLdKpsFAdvL-pF-l_sRurVdfpGG1YT|Retranscriptions/IFORD_2011-03_Mars_Mathematiques_TypeA_retranscrit_avec_corrige.pdf"
  "gdrive:1V17Ky3LpBthwZz60U0qh0ZCR4Z5566jv|Retranscriptions/IFORD_2011-03_Mars_ProbaStat_et_Mathematiques_TypeB_retranscrit_avec_corrige.pdf"
  "gdrive:1ltWskW6jUKv2KVmJW_7HF20akXWrbBNA|Retranscriptions/IFORD_2012-03_Mars_CultureGenerale_TypeA_B_retranscrit_avec_corrige.pdf"
  "gdrive:1hAz1b1Oy0SYvso1lwQR4DyvLzxFhZePW|Retranscriptions/IFORD_2012-03_Mars_ProbaStat_TypeA_retranscrit_avec_corrige.pdf"
  "gdrive:1ep1aC8ey56P2zBMxSEtpdmh3LxlxsGtS|Retranscriptions/IFORD_2012-03_Mars_ProbaStat_et_Mathematiques_TypeB_retranscrit_avec_corrige.pdf"
  "gdrive:1EmHDyLUdy-fXi-vAnFqOHWrrZzIxOGi_|Retranscriptions/IFORD_2013-03_Mars_CultureGenerale_TypeA_B_retranscrit.pdf"
  "gdrive:1i65rtK9jX-5RjutH9_2bwgWwdngjqYWh|Retranscriptions/IFORD_2013-03_Mars_ProbaStat_et_Mathematiques_TypeB_retranscrit.pdf"
  "gdrive:107_S9qjwGbXqP9swpy3EPvmODUAGXQ3L|Retranscriptions/IFORD_2014-03_Mars_CultureGenerale_TypeA_B_retranscrit.pdf"
  "gdrive:1DXKLmxVSnAHUxY9TdNQgxz5vyJgtlOH2|Retranscriptions/IFORD_2014-03_Mars_ProbaStat_et_Mathematiques_TypeA_retranscrit.pdf"
  "gdrive:1NKIvuMcdHIHfrtyPV8RW8F03kGhp3G3v|Retranscriptions/IFORD_2014-03_Mars_ProbaStat_et_Mathematiques_TypeB_retranscrit.pdf"
  "gdrive:1BnnUMn62lTkubyUy8-kpaX35FAvHQvRN|Retranscriptions/IFORD_2014-11_Octobre_CultureGenerale_TypeA_B_retranscrit.pdf"
  "gdrive:15P8v9NuFpanSBVBv5LEV2a6i0-Jw7DnS|Retranscriptions/IFORD_2014-11_Octobre_ProbaStat_et_Mathematiques_TypeA_retranscrit.pdf"
  "gdrive:1mZ4ZME92rqDK4JpDZOHYHCFUR0xMNn4X|Retranscriptions/IFORD_2014-11_Octobre_ProbaStat_et_Mathematiques_TypeB_retranscrit.pdf"
)

fetch() { # $1 = source, $2 = fichier de sortie
  case "$1" in
    gdrive:*)
      curl -fsSL -m 180 "https://drive.usercontent.google.com/download?id=${1#gdrive:}&export=download&confirm=t" -o "$2" ;;
    kamerpower:*)
      local id="${1#kamerpower:}" jar link
      jar="$(mktemp)"
      link=$(curl -fsSL -m 60 -A "$UA" -c "$jar" -b "$jar" "https://kamerpower.com/epreuves/func-startdown/$id/" \
        | grep -oE "https://kamerpower.com/epreuves/func-download/$id/chk,[0-9a-f]+/no_html,1/" | head -1)
      [ -n "$link" ] && curl -fsSL -m 180 -A "$UA" -c "$jar" -b "$jar" \
        -e "https://kamerpower.com/epreuves/func-startdown/$id/" "$link" -o "$2"
      local rc=$?; rm -f "$jar"; return $rc ;;
    *)
      curl -fsSL -m 180 "$1" -o "$2" ;;
  esac
}

ok=0; ko=0
for entry in "${SUJETS[@]}"; do
  src="${entry%%|*}"
  out="$DEST/${entry#*|}"
  mkdir -p "$(dirname "$out")"
  if [ -s "$out" ]; then ok=$((ok + 1)); continue; fi
  if fetch "$src" "$out.part" && head -c 4 "$out.part" | grep -q '%PDF'; then
    mv "$out.part" "$out"; echo "OK     ${entry#*|}"; ok=$((ok + 1))
  else
    rm -f "$out.part"; echo "ÉCHEC  $src -> ${entry#*|}"; ko=$((ko + 1))
  fi
done

echo "Terminé : $ok fichier(s) présent(s), $ko échec(s) — dossier $DEST"
