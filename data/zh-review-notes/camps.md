# Camps (/zh/camps) : items for a native reader

Files: `src/lib/zh/camps.ts`, `src/components/zh/CampsDirectoryZh.tsx`, `src/app/zh/camps/page.tsx`, `src/app/zh/camps/[slug]/page.tsx`. All 16 camps translated.

## Place names
- Kept as English (no settled Chinese form I was sure of): Watthana, Huai Khwang, Bang Kachao, Bang Rak, Khlong Toei.
- Chinese form with English in brackets: 暖武里 (Nonthaburi), 是隆 (Silom), 沙吞 (Sathorn), 北碧府 (Kanchanaburi). Please confirm 暖武里 and 北碧府 are what Chinese-speaking Bangkok parents actually say.
- 曼谷 for "Bangkok" and 多个分店 for "Several branches".
- Left in English on purpose: all street addresses and venue lines (Sukhumvit 77, Pracha Uthit Road, Thong Lo Soi 17, Soi Samahan, BTS Nana, BTS Saladaeng, Central World, Paragon, K Village etc.), plus every camp, school, operator and mall name.

## Terms to double-check
- 假期营 (camp), 半学期假 (half term), 泼水节 (Songkran; some may prefer 宋干节), 家长须知 ("Worth knowing"), 师生比 (supervision ratio; used for iCamp's staff ratio, which is staff to campers).
- "Acro" as 特技体操 and "aerial" as 空中舞蹈 (HoyHon, 十月特技体操与空中舞蹈营); "silks and hoop" as 空中绸缎和吊环; 软功 for contortion.
- "triple Olympic champion" (Adam Peaty) rendered as 拥有三枚奥运金牌, to avoid implying three Games.
- 拉玛九世逝世纪念日 (King Rama IX Memorial Day) and 朱拉隆功纪念日 (Chulalongkorn Day).
- 哈利·波特, 黄油啤酒 (Butterbeer), 海格 (Hagrid), 巧克力蛙 in the Little Pea highlights.
- "Thin results are normal this far out" notice rendered as 离假期还早时，结果少是正常的。
- Halloween page heading "What's brewing" rendered as 魔法锅里煮着什么 (a free rendering, check the tone).
- 老学员 for "returning campers".

## Programme names
Programme titles are translated descriptively but keep operator and brand words in English, e.g. "Regent's 英语十月营", "Grow 自然营", "Ivy Camps（Bangkok Prep 场）", "School of Magic：烹饪与科学营". Bricks 4 Kidz keeps its four product names with 营 added ("Junior Inventor 营" and so on). Say if a fully Chinese title reads better for any of these.

## Kept as English because there is no established Chinese form
Thai Club for Beginners is translated, but Creative Giants, Kids Mindfulness Co., Ltd, Mini Maker, Young Artist, Young Architects, Dream Spaces, LEGO Mindstorms EV3, Skywalk (as 北碧府 Skywalk 空中步道), Cambridge A1 to B2 and the hospital names Synphaet and Dan Makham Tia stay in English.

## Facts deliberately not changed
Prices keep the ฿ sign (so ฿12,000 reads the same on both sites; a few prose mentions say 泰铢). Times use the 24-hour clock in data fields and 上午/下午 in running prose. Dates in cards drop the year, as the English cards do; "last ran" dates carry the year. Every hedge was kept: "our estimate", "need confirming", "likely members only", "not published", "treat as a lead".

## Behaviour notes (not translation)
- Links to English-only pages (/school-breaks, /contact) carry hrefLang="en" and say （英文页面） in the link text. They do not carry lang="en" because the visible text is Chinese. The English-twin link at the foot of each page does carry lang="en" hrefLang="en", matching the zh homepage.
- The directory search matches both the Chinese and the English text, so "Minecraft" and "足球" both work.
- Bricks 4 Kidz sessions are built in code from the English generated records, so prices there can never drift from the English page.
- Repo has no ESLint config, so only `tsc --noEmit` was run on these files (clean for camps files).
