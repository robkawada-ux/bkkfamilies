# Activities (/zh/activities): notes for the native reviewer

62 listings translated (30 days out and weekly classes, all of them). Source: `src/lib/activities.ts`. Chinese text: `src/lib/zh/activities.ts`. Prices, ages, phone numbers, LINE ids, URLs and dates are read from the English record, not retyped, so they cannot drift.

## Please check

- **Tone of the intro and FAQ** on `/zh/activities` (written to read like a parent talking to a parent, not like a brochure).
- **类别 labels**: 室内游乐场, 蹦床、攀岩与卡丁车, 主题乐园与水上乐园, 动物与水族馆, 博物馆与科学, 公园与户外, 市集、文化与观景, 节庆活动, 游泳, 足球, 体操, 舞蹈, 体能训练, 音乐, 艺术与科学.
- **区域 labels**: 素坤逸 (Sukhumvit), 市中心, 湄南河沿岸与吞武里 (Riverside and Thonburi), 拉玛九及以东, 邦那及以南, 北部, 曼谷周边一日游, 多个地点. Is 拉玛九 / 邦那 how Chinese-speaking families say these? Should the zone names carry the English in brackets?
- **价格单位**: 每小时, 每节, 每学期, 每期课程 (English "a course"), 每月. "Course" here means a block of classes sold together; 每期课程 may read oddly.
- **Age phrases**: 3岁及以上, 婴儿至13岁, 全年龄. "婴儿至N岁" renders "Babies to N".
- **Wording of "Worth knowing"** as 家长须知.
- **Reggio Emilia, atelierista** (Little Pea creative painting): rendered as "Reggio Emilia 教学法" and "工作室艺术教育者". A reader may know the accepted Chinese term (瑞吉欧教学法) and prefer it.
- **Snake farm** (Queen Saovabha Memorial Institute): described as 泰国红十字会的蛇类研究所.
- **Children's Discovery Museums** closure text (closed 1 Oct 2026): check it reads as a temporary closure with no reopening date, the same as the English.

## Kept in English on purpose

Business, venue, mall, school and teacher names (HarborLand, Playmondo, MELAND, Siam Paragon, EmQuartier, Ms. Lynn, Pop Up Art Studio, Claret & Brew, HomePro...), addresses and soi numbers, district names (Watthana, Khlong Toei, Phra Khanong...), BTS/MRT station names (with 站 added), programme and level names (Seahorse, Octopus, Seal, Lenny's Cubs and Lions, Junior Inventor, Advance Robotics, LEGO Mindstorms EV3, Aqua Bear, Little Splashers), plus branch names.

## Behaviour to know about

- Activities appear only if they have an entry in `ACTIVITIES_ZH`. A new English listing stays English-only until someone adds it.
- Every detail page links to its English twin and says the English is authoritative.
- Related-article links and the contact page go to the English site, and are marked `lang="en"`.
- Two intro links on the list page point to English blog posts and say (英文).
- Nothing here is indexed until `ZH_LAUNCHED` in `src/lib/i18n.ts` is set to true.
