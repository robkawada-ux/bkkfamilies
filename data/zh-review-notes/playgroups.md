# Playgroups (/zh/playgroups): notes for the native reader

All 44 listings are translated. Names, venues, addresses, districts, phone numbers, LINE ids, URLs, prices, ages, times and dates are read from `src/lib/playgroups.ts` and are not retyped. Translated text lives in `src/lib/zh/playgroups.ts`.

## Terms to double-check

- 游乐中心或亲子咖啡馆 for "Play centre or cafe", 家长社群 for "Parents' group" (these are mostly parent-run sessions hosted at a venue, so 社群 may read oddly; 家长自办小组 is an alternative).
- 自由参加的游戏小组 for "Drop-in playgroup". Check it reads as "no enrolment, just turn up" rather than "free".
- 学步儿 for "toddler" (1 to 3). Some readers may prefer 幼儿 or 宝宝. Used throughout.
- 每两周一次 for "Every other week" (fortnightly) and 不定期 for "Occasional".
- 圆圈时间 for "circle time", 感官游戏 for "sensory play", 不怕弄脏的游戏 for "messy play", 软垫游戏 for "soft play", 降落伞游戏 for "parachute play", 泥巴厨房 for "mud kitchen", 小世界游戏 for "small-world play". Check each is how mainland parents say it.
- 保姆 for "nanny". Some mainland families say 阿姨 or 育儿嫂; 保姆 is the safest neutral term.
- 瑞吉欧教育理念 for "Reggio Emilia inspired", 蒙特梭利 for Montessori, 森林学校 for "forest school", 芬兰早期教育理念 for "Finnish early childhood education".
- 早期教育 for "Early Years" (UK school stage). Left "Early Years" in English when it is a named department or building (e.g. "Early Years building" is rendered 早期教育楼).
- 英国 EYFS kept in English as the curriculum acronym.
- 随到随玩 appears in a few descriptions as a gloss for "drop-in". Same concept as 自由参加, just more colloquial; pick one.
- 泼水节（宋干节）in the FAQ for Songkran. Check which form is more familiar; 宋干节 is the Thai-derived name.
- 期中假 for "half term".
- 家长 for "parent or carer" in most places; "carer" is sometimes rendered 照护人.

## Place names and where English was kept

- Zone names have a Chinese short form for filters and cards: 素坤逸, 市中心, 拉玛九与拉姆甘亨, 邦那及以东, 北部, 多个地点. The longer form with English in brackets (ZONE_ZH) exists in the data file but is not currently displayed. Check 拉玛九 and 拉姆甘亨 (Ramkhamhaeng) are the accepted spellings; some use 兰甘亨.
- District names (Watthana, Khlong Toei, Pathum Wan, Bang Rak and the rest) stay in English so they match maps and street signs. Only "Call for address" (地址请咨询) and "Various" (多个区) are translated.
- Suburb and street names inside descriptions stay in English: Sukhumvit Soi 49, Phatthanakan, Langsuan, Rama 9, Srinakarin, Phetchaburi, Convent Road, Chit Lom, Lumphini, Ploenchit, Phrom Phong, Thonglor, Ekkamai, Ari, Nana, Asok, Victory Monument, Sathorn, Dusit, Suvarnabhumi. Chinese forms exist for some (素坤逸, 沙吞, 通罗, 素万那普机场); I used 素坤逸 and 沙吞 in prose, and kept the rest in English, including Sathorn in the search placeholder. Decide on a consistent approach for 通罗 / 厄加迈 (Ekkamai) / 阿速 (Asok) if you want more Chinese.
- Transit lines are kept as "BTS" and "MRT", with station names in English. 地铁 is used when the English says "MRT" in running prose in a few places (check it is consistent: the notes say 地铁 Lumphini 站, 地铁 Hua Mak 站, 地铁 Silom 站).
- Venue and brand names are never translated: Little Gaia, One Bangkok, Parade, Playville, Wonder Woods, Tiny Tots, Snoezelen, theCOMMONS Thonglor, The Nine, Gymboree, Julia Gabriel, Neilson Hays Library, Christ Church, BAMBI, The Village.
- Programme names stay in English as labels: Little Pups, Big Pups, PlayNest, PlayClub, Mum & Me Playgroup, Friday Seedlings, Saturday Explorers, Tiny Tots, Eager Explorers, Parent & Baby Hangout and the other Little Pea session names, Tiddly Yoga. Generic labels are translated: 家长社群专场, 托儿所自办游戏小组, 英语游戏小组, 普通话游戏小组, 周六儿童故事时间, Little Daisies 学步儿游戏小组.
- Staff names (Ms Alex Rogan, Ms Deah) are kept in English.
- The Nord Anglia and Cognita school-group names are kept in English in the St Andrews note.

## Wording that carries a hedge (check the hedge survived)

- Little Gaia: October calendar shows roughly every two weeks, one session cancelled, "check the booking page".
- Little Panda: billed as every Friday but calendar shows about every other week.
- St Andrews Little Bunnies: confirm the Tuesday lunchtime slot when registering.
- St Andrews Dusit: last published block ran through September, check for the next.
- Brighton College: start time "unusually early", no snacks.
- RIS Swiss Section, Parry Kindergarten, Play Stations BKK: "details come from an older listing, contact before going".
- Kids' Academy Srinakarin, Outdoor School, First Steps, Regent's Langsuan: price not published.
- Gymboree: branches temporarily moved; prices quoted on LINE.
- Bumpsy Daisy: timetable changes monthly, some classes ended, check booking links first.

## Style choices

- Time ranges use 至 and a 24-hour clock ("9:30至11:00"), as common.ts defines, even though the English page uses 12-hour times. Check parents are comfortable with 24-hour times.
- Prices read "每次 ฿450" / "每期课程 ฿450" / "每年 ฿450". Check the word order.
- Ages: "6个月至3岁", "出生至2岁半", "1至3岁". Half years are written 岁半.
- FAQ and intro paragraphs were translated faithfully, not rewritten for a Chinese audience. The intro's voice is the English site's ("We went through them one by one"), which is first person plural.
- External links from /zh pages to English-only pages (schools, contact, The Village) carry `lang="en"` and say "(英文)" in the link text.
- `finePrint` ("Ask about discount for BAMBI members") is rendered 「BAMBI 会员可咨询是否有折扣」.

## Mechanical checks done

- Every digit in each English free-text field appears in the Chinese (dates, baht amounts, ages, times, phone numbers), apart from month and clock reformatting (e.g. 29 Sep becomes 9月29日, 12.15pm becomes 12:15).
- No em or en dashes in any /zh playgroups file.
- `npx tsc --noEmit` is clean. Lint was not run: no eslint binary is installed in this checkout.
