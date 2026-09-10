#!/bin/bash
# Checks every external school website link in schools.ts
# Prints only non-2xx results. Runs 12 at a time.
check() {
  slug="${1%%|*}"; url="${1#*|}"
  code=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 25 \
    -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36" \
    "$url" 2>/dev/null)
  case "$code" in
    2*) ;;
    *) printf "%-6s %-52s %s\n" "$code" "$slug" "$url" ;;
  esac
}
export -f check

echo "Checking 115 school website links..."
echo
printf "%-6s %-52s %s\n" CODE SLUG URL
printf "%s\n" "------------------------------------------------------------------------"
cat <<'URLS' | xargs -P 12 -I{} bash -c 'check "{}"'
abc-pathways-international-kindergarten|https://www.abcpathways.co.th
anglo-singapore-international-school|https://anglosingapore.ac.th
annabels-early-years-international-school|https://www.annabels.ac.th
ascot-international-school|https://ascot.ac.th
associe-international-kindergarten-bangkok|https://www.aikb35.ac.th
bangkok-christian-international-school|https://www.bcis.ac.th
bangkok-grace-international-school-bgis|https://www.grace.ac.th
bangkok-patana-school|https://www.patana.ac.th
bangkok-prep|https://www.bangkokprep.ac.th
basis-international-school-bangkok|https://basis.ac.th
berkeley-international-school-bangkok|https://www.berkeley.ac.th
bernie-british-international-prep-kindergarten-early-years|https://www.bernie-bipc.co.th
bright-skies-international-school|https://brightskiesinternationalschool.com
brighton-college-bangkok|https://brightoncollege.ac.th
british-columbia-international-school|https://www.bcisb.ac.th
bromsgrove-international-school-thailand|https://www.bromsgrove.ac.th
canadian-international-school-of-thailand|https://canadianschool.com
centurion-international-school-bangkok|https://cisb.ac.th
charter-international-school|https://charter.ac.th
concordian-bangkok-concordian-international-school-bangkok|https://www.concordian.ac.th
denla-british-school|https://www.dbsbangkok.ac.th
dprep-bangkok|https://dprep.ac.th
ekamai-international-school|https://www.eis.ac.th
garden-international-school-bangkok|https://www.gardenbangkok.com
global-english-school|https://www.facebook.com/gesthailand/
global-indian-international-school|http://www.gisschool.org
glory-singapore-international-school|https://glorysingapore.com
hampton-international-school|https://hamptonschool.ac.th
harrow-international-school-bangkok|https://www.harrowschool.ac.th
heathfield-international-school|https://heathfield.ac.th
international-community-school|https://www.ics.ac.th
international-montessori-center|https://www.imc.ac.th
international-pioneers-school|https://ips.ac.th
ipc-international-kindergarten|https://www.ipcthai.com
kevalee-international-school|https://www.kevalee.ac.th
kiddykare-international-kindergarten|https://www.kiddykare.ac.th
kis-international-school-bangkok|https://www.kis.ac.th
kpis-international-school|https://kpis.ac.th
magic-years-international-school-thailand|https://magicyears.ac.th
nist-international-school-bangkok|https://www.nist.ac.th
the-american-school-of-bangkok-asb|https://asb.ac.th
the-british-school-of-bangkok-topsy-turvy-international-school|https://bsbangkok.ac
the-country-school-by-elc|https://www.elc.ac.th
the-first-steps-international-school|https://thefirststeps.ac.th
the-purple-elephant-55|https://www.elc.ac.th
the-tiny-seeds-international-pre-school-bangkok|https://www.elc.ac.th
the-village-international-education-centre-vie|https://www.village-education.com
thonglor-greenfield-nursery|https://www.thonglorgreenfieldnursery.com
tiny-tots-international-school|https://tinytotsinternational.com
traill-international-school|https://www.traillschool.ac.th
trinity-international-school|https://trinity.ac.th
wellington-international-school-bangkok|https://www.wellingtoncollege.ac.th
shrewsbury-international-school-bangkok|https://www.shrewsbury.ac.th
international-school-bangkok-isb|https://www.isb.ac.th
ruamrudee-international-school-ris|https://www.rism.ac.th
kings-college-international-school-bangkok|https://www.kingsbangkok.ac.th
st-andrews-international-school-bangkok|https://www.nordangliaeducation.com/sta-bangkok
wells-international-school|https://wells.ac.th
regents-international-school-bangkok|https://regents.ac.th
amnuay-silpa-school|https://www.amnuaysilpa.ac.th
invictus-international-programme|https://www.invictus.school
rbis-international-school|https://rbis.ac.th
singapore-international-school-of-bangkok|https://www.sisb.ac.th
norwich-international-school|https://www.norwichschool.ac.th
sequoia-nova-international-primary-school|https://sequoia-nova.com
rose-marie-academy|https://rose-marie.ac.th
xcl-american-school-of-bangkok|https://www.asbsk.ac.th
bangkok-adventist-international-school|https://bais.ac.th
rising-oaks-international-school-bangkok|https://roisb.ac.th
astra-academy-international-school|https://www.astra.ac.th
welearn-academy|https://welearnthailand.com
st-marks-international-school|https://stmarks.ac.th
australian-international-school-bangkok|https://www.australianisb.ac.th
international-christian-school-nonthaburi|https://icsn.ac.th
beaconhouse-yamsaard-international-school|https://bys.ac.th
bsb-british-international-primary-school|https://bsbangkok.ac
crescent-international-school|https://cis.ac.th
royce-royal-international-school|https://www.royceroyal.ac.th
dulwich-college-international-school-bangkok|https://bangkok.dulwich.org
thai-chinese-international-school|https://www.tcis.ac.th
kids-academy-international-school|https://www.kidsacademy.ac.th
ramkhamhaeng-advent-international-school|https://www.rais.ac.th
pan-asia-international-school|http://www.pais.ac.th
niva-american-international-school|https://www.niva.ac.th
john-wyatt-montessori-bangkok|https://www.jwmontessori.com
new-day-learning|https://newdaylearningco.com
british-mandarin-international-school|https://bmis.ac.th
lertlah-school|https://lertlah.com
st-andrews-international-school-sathorn|https://www.standrewssathorn.com
westminster-college-bangkok|https://westminster.ac.th
modern-international-school-bangkok|https://www.misb.ac.th
thai-international-school|https://thaiinternationalschool.ac.th
satit-pattana-secondary-school|https://www.satitpattana.ac.th
kincaid-international-school-of-bangkok|https://www.kincaidbangkok.com
siam-international-school|https://www.siamis.ac.th
wycombe-abbey-international-school-bangkok|https://wycombeabbey.ac.th
st-andrews-international-school-dusit|https://www.standrewsdusit.com
aster-international-school-bangkok|https://aster.ac.th
ris-swiss-section-deutschsprachige-schule-bangkok|https://ris-swiss-section.org
lycee-francais-international-de-bangkok|http://www.lfib.ac.th
tsi-international-school|https://tsi.ac.th
future-steps-international-school-bangkok|https://thefirststeps.ac.th
king-mongkuts-international-demonstration-school|https://www.kmids.ac.th
the-jataka-school|https://www.thejatakaschool.com
sarasas-ektra-school|https://www.ektra.ac.th
st-andrews-samakee-international-school|https://www.standrews-samakee.com
st-andrews-international-school-sukhumvit-107|https://www.standrewssukhumvit.com
knightsbridge-house-international-school-nonthaburi|https://kbh.ac.th
raffles-american-school-bangkok|https://ras.ac.th
rc-international-school|https://www.rcis.ac.th
roong-aroon-international-school|https://www.roongaroonis.ac.th
satit-bilingual-school-of-rangsit-university|https://sbs.ac.th
montessori-academy-bangkok-international-school|https://www.montessoribkk.com
pensmith-school|https://pensmithschool.com
bangkok-chicago-christian-international-school|https://bcci.ac.th
URLS

echo
echo "Done. Anything listed above is broken or unreachable."
echo "000 = could not connect at all (dead domain, DNS gone, or timeout)."
