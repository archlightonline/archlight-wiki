# Content Inventory — Archlight Wiki (Phase 1 migration checklist)

_Generated 2026-05-30 from `archlight_wiki_v534_concepts_static_hosts_fixed/` (read-only source)._

Status legend: ✅ migrated into the `pages` table · ⬜ not yet migrated.

## Summary

| Source | Pages | Category |
| --- | ---: | --- |
| `index.html` inline content | 11 | Activities (professions) + quests |
| `data/unlocks-tasks-pages.js` | 13 | world / unlock / quest pages |
| `data/updates-data.js` | 569 | Updates (one page per patch note) |
| `concepts/design-lab/in-review/…` | 44 | Concept pages (Classes, Power, Content, Equipment, Rewards, …) |
| **Total** | **637** | |
| Migrated so far | 637 | |

**Now migrated:** the concept/design-lab pages (Classes, Power, Content, Equipment, Professions, Guilds, Rewards, Tools) under `concepts/design-lab/in-review/…`, converted from HTML/JS to Markdown. **Still deferred:** media assets (most are "Image later" placeholders in the source) and the cinematic-carousel-engine demo.

---

## Hand-authored content pages (24)

| ID / slug | Title | Category | Subcategory | Content (chars) | Source | Migrated |
| --- | --- | --- | --- | ---: | --- | :---: |
| `farming` | Farming | Activities | — | 3,065 | index.html | ✅ |
| `fishing` | Fishing | Activities | — | 3,652 | index.html | ✅ |
| `mining` | Mining | Activities | — | 3,408 | index.html | ✅ |
| `skinning` | Skinning | Activities | — | 3,274 | index.html | ✅ |
| `woodcutting` | Woodcutting | Activities | — | 2,100 | index.html | ✅ |
| `alchemy` | Alchemy | Activities | — | 13,233 | index.html | ✅ |
| `blacksmithing` | Blacksmithing | Activities | — | 9,418 | index.html | ✅ |
| `cooking` | Cooking | Activities | — | 7,203 | index.html | ✅ |
| `jewelcrafting` | Jewelcrafting | Activities | — | 5,880 | index.html | ✅ |
| `tanning` | Tanning | Activities | — | 9,284 | index.html | ✅ |
| `woodworking` | Woodworking | Activities | — | 9,307 | index.html | ✅ |
| `forgotten-islands-access` | Forgotten Islands Access | Mission Unlock | unlock | 12,416 | unlocks-tasks-pages.js | ✅ |
| `olympus-tasks` | Olympus Tasks | Mission Unlock | task | 20,352 | unlocks-tasks-pages.js | ✅ |
| `otherworld` | OtherWorld Access | Questline | quest | 2,776 | unlocks-tasks-pages.js | ✅ |
| `ow-darkness` | OtherWorld Darkness | Questline | quest | 1,415 | unlocks-tasks-pages.js | ✅ |
| `progression-tasks-missions` | Progression Tasks & Dailies | Daily Checks | check | 11,065 | unlocks-tasks-pages.js | ✅ |
| `marius` | Council of Marius | Questline | quest | 4,625 | unlocks-tasks-pages.js | ✅ |
| `darkness-olympus-weapon` | Darkness Olympus Weapon | Weapon Task | task | 4,785 | unlocks-tasks-pages.js | ✅ |
| `darkness-quest` | Darkness Quest | Questline | quest | 5,758 | unlocks-tasks-pages.js | ✅ |
| `minerva-chain` | Minerva Chain | Unlock Chain | unlock | 722 | unlocks-tasks-pages.js | ✅ |
| `quest-minervas-tomb` | Minerva’s Tomb / Rift Knife | Questline | quest | 5,921 | unlocks-tasks-pages.js | ✅ |
| `minerva-uprising` | Minerva’s Uprising | Questline | quest | 2,017 | unlocks-tasks-pages.js | ✅ |
| `quest-task-cleanup` | Quest / Task Cleanup | Checklist | check | 782 | unlocks-tasks-pages.js | ✅ |
| `shadows-ashen-questline` | Shadows of the Ashen Questline | Questline | quest | 12,731 | unlocks-tasks-pages.js | ✅ |

---

## Concept / design-lab pages (44)

Migrated from `concepts/design-lab/in-review/…` (HTML/JS → Markdown), reachable from the sidebar nav. Page screenshots remain "Image later" placeholders in the source.

| ID / slug | Title | Category | Content (chars) | Migrated |
| --- | --- | --- | ---: | :---: |
| `awakening` | Awakening | Classes | 1,673 | ✅ |
| `classes` | Classes | Classes | 20,746 | ✅ |
| `companions` | Companions | Classes | 1,562 | ✅ |
| `feats` | Feats | Classes | 1,181 | ✅ |
| `prestige` | Prestige | Classes | 1,489 | ✅ |
| `promotions` | Promotions | Classes | 1,612 | ✅ |
| `bosses` | Bosses | Content | 7,927 | ✅ |
| `bounties` | Bounties | Content | 1,384 | ✅ |
| `dailies` | Dailies | Content | 2,197 | ✅ |
| `dimensions` | Dimensions | Content | 1,244 | ✅ |
| `dungeons` | Dungeons | Content | 5,127 | ✅ |
| `endless-abyss` | Endless Abyss | Content | 3,943 | ✅ |
| `events-hub` | Events Hub | Content | 20,869 | ✅ |
| `hunting-zones` | Hunting Zones | Content | 4,239 | ✅ |
| `monsters` | Monsters and Loot | Content | 13,034 | ✅ |
| `prisons` | Prisons | Content | 3,812 | ✅ |
| `ramparts` | Ramparts Siege | Content | 4,818 | ✅ |
| `rifts` | Rifts | Content | 3,181 | ✅ |
| `secret-maps` | Secret Maps | Content | 2,092 | ✅ |
| `wargates` | Wargates | Content | 4,243 | ✅ |
| `zaqors-tower` | Zaqor’s Tower | Content | 4,505 | ✅ |
| `equipment-index` | Equipments | Equipment | 39,901 | ✅ |
| `gear-enhancements` | Equipment Enhancements | Equipment | 19,231 | ✅ |
| `guilds` | Guilds | Guilds | 8,608 | ✅ |
| `artifacts` | Artifacts | Power | 1,730 | ✅ |
| `bestiary` | Bestiary | Power | 2,056 | ✅ |
| `glyphs` | Glyphs | Power | 1,667 | ✅ |
| `soul-shards` | Soul Shards | Power | 2,777 | ✅ |
| `stat-nodes` | Stat Nodes | Power | 1,710 | ✅ |
| `stats-caps` | Stats and Caps | Power | 1,840 | ✅ |
| `talent-tree` | Talent Tree | Power | 3,226 | ✅ |
| `training` | Training | Power | 1,161 | ✅ |
| `vocation-traits` | Vocation Traits | Power | 2,531 | ✅ |
| `professions` | Professions | Professions | 33,429 | ✅ |
| `achievements` | Achievements | Rewards | 1,268 | ✅ |
| `archpass-rewards` | Archpass | Rewards | 1,279 | ✅ |
| `boosts-blessing` | Blessings &amp; Boosts | Rewards | 1,242 | ✅ |
| `challenges-pass` | Challenges Pass | Rewards | 1,122 | ✅ |
| `cosmetic-bonus-sharing` | Cosmetic Bonus Sharing | Rewards | 1,124 | ✅ |
| `living-token-trader` | Living Token Trader | Rewards | 1,446 | ✅ |
| `race-points` | Race Points | Rewards | 1,297 | ✅ |
| `roulette` | Roulette &amp; Loot Crates | Rewards | 1,520 | ✅ |
| `addons` | Addons | Tools | 18,701 | ✅ |
| `heirloom-cross-linking` | Heirloom, Cross-Server, and Linking | Tools | 4,109 | ✅ |

---

## Updates / patch notes (569)

Each entry in `data/updates-data.js` becomes one page under the **Updates** category with slug `update-<entryId>`.

**By world:** Hardcore / PTR (4) · Legacy (518) · Abaldar (47)

**By type:** changelog (42) · patch-notes (527)

**By year:**

| Year | Count |
| --- | ---: |
| 2016 | 49 |
| 2017 | 170 |
| 2018 | 138 |
| 2019 | 56 |
| 2020 | 39 |
| 2021 | 13 |
| 2022 | 22 |
| 2023 | 40 |
| 2024 | 21 |
| 2025 | 17 |
| 2026 | 4 |

<details><summary><strong>2016</strong> — 49 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-legacy-2016-12-29-49` | Patch 6.0.3 | Legacy | ✅ |
| `update-legacy-2016-12-28-47` | 2x Weekend! | Legacy | ✅ |
| `update-legacy-2016-12-28-48` | Livestream | Legacy | ✅ |
| `update-legacy-2016-12-26-45` | Q&A Livestream #3 | Legacy | ✅ |
| `update-legacy-2016-12-26-46` | Wikipedia Winners! | Legacy | ✅ |
| `update-legacy-2016-12-25-44` | Merry Christmas! | Legacy | ✅ |
| `update-legacy-2016-12-24-43` | Santa's Coming | Legacy | ✅ |
| `update-legacy-2016-12-23-42` | Patch 6.0.2 | Legacy | ✅ |
| `update-legacy-2016-12-20-41` | 12 Days of Christmas! | Legacy | ✅ |
| `update-legacy-2016-12-19-40` | Legacy Rewards | Legacy | ✅ |
| `update-legacy-2016-12-18-39` | 12 Days of Christmas! | Legacy | ✅ |
| `update-legacy-2016-12-17-38` | Mini-Patch 6.0.1 | Legacy | ✅ |
| `update-legacy-2016-12-16-36` | 12 Days of Christmas | Legacy | ✅ |
| `update-legacy-2016-12-16-37` | Christmas Bundles! | Legacy | ✅ |
| `update-legacy-2016-12-13-35` | Live Developer Q&A | Legacy | ✅ |
| `update-legacy-2016-12-10-34` | Patch 6.0.0 | Legacy | ✅ |
| `update-legacy-2016-12-08-33` | Premium Area Teaser | Legacy | ✅ |
| `update-legacy-2016-12-07-32` | New Tutors! | Legacy | ✅ |
| `update-legacy-2016-12-06-30` | Q&A + Content Teaser | Legacy | ✅ |
| `update-legacy-2016-12-06-31` | Tutor Applications | Legacy | ✅ |
| `update-legacy-2016-12-05-29` | Monday Morning Patch | Legacy | ✅ |
| `update-legacy-2016-12-04-28` | Limiting MC's | Legacy | ✅ |
| `update-legacy-2016-12-03-27` | Upcoming Patch | Legacy | ✅ |
| `update-legacy-2016-11-30-24` | Prestige Patch | Legacy | ✅ |
| `update-legacy-2016-11-30-25` | Fight For Good! | Legacy | ✅ |
| `update-legacy-2016-11-30-26` | Change from Euro > CAD | Legacy | ✅ |
| `update-legacy-2016-11-29-22` | Patch Notes | Legacy | ✅ |
| `update-legacy-2016-11-29-23` | Wikipedia Giveaway! | Legacy | ✅ |
| `update-legacy-2016-11-28-19` | Couple o' Gifs | Legacy | ✅ |
| `update-legacy-2016-11-28-20` | Developers Notes | Legacy | ✅ |
| `update-legacy-2016-11-28-21` | Coin Giveaway! | Legacy | ✅ |
| `update-legacy-2016-11-27-17` | Poll! | Legacy | ✅ |
| `update-legacy-2016-11-27-18` | Dungeon Box + Crates | Legacy | ✅ |
| `update-legacy-2016-11-26-16` | First Day Hype! | Legacy | ✅ |
| `update-legacy-2016-11-25-15` | UNLEASH THE SWARM | Legacy | ✅ |
| `update-legacy-2016-11-24-14` | Points Ressurected! | Legacy | ✅ |
| `update-legacy-2016-11-23-10` | Vocation Balance Notes | Legacy | ✅ |
| `update-legacy-2016-11-23-11` | 500 Characters Created | Legacy | ✅ |
| `update-legacy-2016-11-23-12` | Launch Hype In Discord! | Legacy | ✅ |
| `update-legacy-2016-11-23-13` | Winter Update Teaser #6 | Legacy | ✅ |
| `update-legacy-2016-11-22-8` | Winter Update Teaser #5 | Legacy | ✅ |
| `update-legacy-2016-11-22-9` | Discord Coins Giveaway! | Legacy | ✅ |
| `update-legacy-2016-11-21-7` | Winter Update Teaser #4 | Legacy | ✅ |
| `update-legacy-2016-11-20-6` | Winter Update Teaser #3 | Legacy | ✅ |
| `update-legacy-2016-11-19-5` | Winter Update Teaser #2 | Legacy | ✅ |
| `update-legacy-2016-11-18-4` | Winter Update Teaser! | Legacy | ✅ |
| `update-legacy-2016-11-15-3` | Discord - Free Points! | Legacy | ✅ |
| `update-legacy-2016-11-11-2` | Winter Update and Era | Legacy | ✅ |
| `update-legacy-2016-10-28-1` | Archlight Online Wiki | Legacy | ✅ |

</details>

<details><summary><strong>2017</strong> — 170 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-legacy-2017-12-28-219` | Patch 10.6.1 | Legacy | ✅ |
| `update-legacy-2017-12-25-218` | Santa Gild | Legacy | ✅ |
| `update-legacy-2017-12-18-216` | House Contest Winners #4 | Legacy | ✅ |
| `update-legacy-2017-12-18-217` | Christmas On Archlight | Legacy | ✅ |
| `update-legacy-2017-12-15-215` | Patch 10.5.0 | Legacy | ✅ |
| `update-legacy-2017-12-13-212` | Patch 10.4.0 + Christmas Boost | Legacy | ✅ |
| `update-legacy-2017-12-13-213` | All Points Packs 10% Off! | Legacy | ✅ |
| `update-legacy-2017-12-13-214` | Released Logins | Legacy | ✅ |
| `update-legacy-2017-12-07-211` | Patch 10.3.0 Additions + Promo | Legacy | ✅ |
| `update-legacy-2017-12-05-210` | Patch 10.3.0 | Legacy | ✅ |
| `update-legacy-2017-12-04-208` | House Contest Winners #3 | Legacy | ✅ |
| `update-legacy-2017-12-04-209` | Legacy System Rework | Legacy | ✅ |
| `update-legacy-2017-11-29-207` | Patch 10.2.0 | Legacy | ✅ |
| `update-legacy-2017-11-26-206` | House Contest #2 Winners! | Legacy | ✅ |
| `update-legacy-2017-11-23-204` | Housing Contest Week 2! | Legacy | ✅ |
| `update-legacy-2017-11-23-205` | Black Friday Deals! | Legacy | ✅ |
| `update-legacy-2017-11-22-202` | Patch 10.1.0 | Legacy | ✅ |
| `update-legacy-2017-11-22-203` | More Houses! | Legacy | ✅ |
| `update-legacy-2017-11-21-201` | Tomorrow! | Legacy | ✅ |
| `update-legacy-2017-11-20-200` | Developer Insider | Legacy | ✅ |
| `update-legacy-2017-11-19-199` | Housing Contest Winners | Legacy | ✅ |
| `update-legacy-2017-11-17-198` | Youtuber Hegal! | Legacy | ✅ |
| `update-legacy-2017-11-16-197` | Upcoming Patch Notes | Legacy | ✅ |
| `update-legacy-2017-11-15-196` | House Contest | Legacy | ✅ |
| `update-legacy-2017-11-14-193` | PvP Video From Last Era! | Legacy | ✅ |
| `update-legacy-2017-11-14-194` | Legendary Keys Promo! | Legacy | ✅ |
| `update-legacy-2017-11-14-195` | New Client Build (Optional) | Legacy | ✅ |
| `update-legacy-2017-11-12-192` | Patch Notes | Legacy | ✅ |
| `update-legacy-2017-11-10-190` | Coins Ressurected! | Legacy | ✅ |
| `update-legacy-2017-11-10-191` | Doorbusters!! | Legacy | ✅ |
| `update-legacy-2017-11-09-189` | Hall Of Fame | Legacy | ✅ |
| `update-legacy-2017-11-04-188` | Returning Player Rewards | Legacy | ✅ |
| `update-legacy-2017-11-03-187` | Server Prep | Legacy | ✅ |
| `update-legacy-2017-10-28-186` | Launch Party! | Legacy | ✅ |
| `update-legacy-2017-10-27-185` | Archlight Legends | Legacy | ✅ |
| `update-legacy-2017-10-15-184` | Announcement | Legacy | ✅ |
| `update-legacy-2017-10-09-183` | 3x Rewards Patch 9.3.1 | Legacy | ✅ |
| `update-legacy-2017-10-08-182` | Patch 9.3.1 | Legacy | ✅ |
| `update-legacy-2017-10-07-181` | Patch 9.3.0 Paralyze Change | Legacy | ✅ |
| `update-legacy-2017-10-05-179` | Patch 9.3.0 | Legacy | ✅ |
| `update-legacy-2017-10-05-180` | Patch 9.2.7 Fix | Legacy | ✅ |
| `update-legacy-2017-10-03-176` | Patch 9.3.0 Teaser | Legacy | ✅ |
| `update-legacy-2017-10-03-177` | No Ping Partnership | Legacy | ✅ |
| `update-legacy-2017-10-03-178` | Patch 9.2.6 Notes | Legacy | ✅ |
| `update-legacy-2017-09-30-175` | 3x Week! | Legacy | ✅ |
| `update-legacy-2017-09-29-174` | Congratulations | Legacy | ✅ |
| `update-legacy-2017-09-28-172` | Livestock | Legacy | ✅ |
| `update-legacy-2017-09-28-173` | New PvP Sets | Legacy | ✅ |
| `update-legacy-2017-09-27-171` | Review by Polish Website/Chann | Legacy | ✅ |
| `update-legacy-2017-09-26-168` | Crafting Tutorial Video | Legacy | ✅ |
| `update-legacy-2017-09-26-169` | Crafting Change | Legacy | ✅ |
| `update-legacy-2017-09-26-170` | New Tutors! | Legacy | ✅ |
| `update-legacy-2017-09-25-165` | New Dawn PvP Video | Legacy | ✅ |
| `update-legacy-2017-09-25-166` | Scholomance Monastary | Legacy | ✅ |
| `update-legacy-2017-09-25-167` | Booster Packs + 9.3.0 Teaser | Legacy | ✅ |
| `update-legacy-2017-09-24-163` | Patch 9.1.1 + Client Build 1.2 | Legacy | ✅ |
| `update-legacy-2017-09-24-164` | Tutor Applications Open! | Legacy | ✅ |
| `update-legacy-2017-09-22-162` | Patch 9.1.0 Spoiler #2 | Legacy | ✅ |
| `update-legacy-2017-09-20-161` | Patch 9.1.0 | Legacy | ✅ |
| `update-legacy-2017-09-19-159` | Patch 9.0.7 | Legacy | ✅ |
| `update-legacy-2017-09-19-160` | Welcome <3 | Legacy | ✅ |
| `update-legacy-2017-09-15-158` | Patch 9.0.6 | Legacy | ✅ |
| `update-legacy-2017-09-14-156` | Patch 9.0.5 | Legacy | ✅ |
| `update-legacy-2017-09-14-157` | Repolishing and Shining Oils P | Legacy | ✅ |
| `update-legacy-2017-09-13-155` | PvP Tournament Prizepool | Legacy | ✅ |
| `update-legacy-2017-09-12-153` | PvP Tournament Registration | Legacy | ✅ |
| `update-legacy-2017-09-12-154` | Patch 9.1.0 + Client Build 1.2 | Legacy | ✅ |
| `update-legacy-2017-09-11-152` | Patch 9.0.4 | Legacy | ✅ |
| `update-legacy-2017-09-07-151` | PvP Tournament + Promo | Legacy | ✅ |
| `update-legacy-2017-09-06-150` | Patch 9.0.3 | Legacy | ✅ |
| `update-legacy-2017-09-02-147` | Biggest Expansion Ever | Legacy | ✅ |
| `update-legacy-2017-09-02-148` | Patch 9.0.2 | Legacy | ✅ |
| `update-legacy-2017-09-02-149` | Screenshot Contest! | Legacy | ✅ |
| `update-legacy-2017-09-01-145` | Doorbuster Exclusives! | Legacy | ✅ |
| `update-legacy-2017-09-01-146` | A New Dawn Client Released | Legacy | ✅ |
| `update-legacy-2017-08-31-143` | A New Dawn Hype | Legacy | ✅ |
| `update-legacy-2017-08-31-144` | PvP Tournament | Legacy | ✅ |
| `update-legacy-2017-08-29-142` | A New Dawn Patch Notes | Legacy | ✅ |
| `update-legacy-2017-08-26-140` | Hype | Legacy | ✅ |
| `update-legacy-2017-08-26-141` | Character Creation | Legacy | ✅ |
| `update-legacy-2017-08-19-139` | A New Dawn | Legacy | ✅ |
| `update-legacy-2017-08-15-138` | Patch + Client Build | Legacy | ✅ |
| `update-legacy-2017-08-09-136` | Patch 8.0.4 | Legacy | ✅ |
| `update-legacy-2017-08-09-137` | Corsair Spotlight | Legacy | ✅ |
| `update-legacy-2017-08-07-135` | Congratulations To New Tutors | Legacy | ✅ |
| `update-legacy-2017-08-03-134` | Sharptooth Isle | Legacy | ✅ |
| `update-legacy-2017-08-02-133` | Client 1.0.6 | Legacy | ✅ |
| `update-legacy-2017-08-01-132` | Patch + Client Build | Legacy | ✅ |
| `update-legacy-2017-07-31-130` | Quick post | Legacy | ✅ |
| `update-legacy-2017-07-31-131` | Developer Q&A Livestream! | Legacy | ✅ |
| `update-legacy-2017-07-29-129` | Day 1 Recap | Legacy | ✅ |
| `update-legacy-2017-07-28-128` | Patch Notes 8.0.1 | Legacy | ✅ |
| `update-legacy-2017-07-27-127` | Launch Bonus! | Legacy | ✅ |
| `update-legacy-2017-07-24-126` | Season 1 - FAQ | Legacy | ✅ |
| `update-legacy-2017-07-20-125` | Archlight Servers | Legacy | ✅ |
| `update-legacy-2017-07-17-124` | Corsair + Season Video | Legacy | ✅ |
| `update-legacy-2017-07-13-123` | Season 1 - July 28th | Legacy | ✅ |
| `update-legacy-2017-06-13-122` | Pirates Teaser | Legacy | ✅ |
| `update-legacy-2017-06-12-121` | Subscriber Mailing List | Legacy | ✅ |
| `update-legacy-2017-06-03-119` | New Companion Bonuses | Legacy | ✅ |
| `update-legacy-2017-06-03-120` | Hotfix patch 7.3.1 | Legacy | ✅ |
| `update-legacy-2017-06-02-118` | Patch 7.3.0 | Legacy | ✅ |
| `update-legacy-2017-05-31-117` | Archlight Merch!? | Legacy | ✅ |
| `update-legacy-2017-05-30-116` | ;) | Legacy | ✅ |
| `update-legacy-2017-05-29-115` | Mini-Patch 7.2.3 | Legacy | ✅ |
| `update-legacy-2017-05-27-114` | Hotfix Patch 7.2.2 | Legacy | ✅ |
| `update-legacy-2017-05-25-113` | Patch Notes 7.2.1 | Legacy | ✅ |
| `update-legacy-2017-05-22-112` | Patch 7.2.0 | Legacy | ✅ |
| `update-legacy-2017-05-19-111` | 2x Week Starts Early! | Legacy | ✅ |
| `update-legacy-2017-05-15-109` | New Tutors! | Legacy | ✅ |
| `update-legacy-2017-05-15-110` | Patch 7.1.0 | Legacy | ✅ |
| `update-legacy-2017-05-12-108` | Tutor Applications! | Legacy | ✅ |
| `update-legacy-2017-05-11-107` | Patch Notes 05.11.17 | Legacy | ✅ |
| `update-legacy-2017-05-09-106` | Patch Notes 05.10.17 | Legacy | ✅ |
| `update-legacy-2017-05-08-105` | Abaldar's Mansion | Legacy | ✅ |
| `update-legacy-2017-05-05-104` | Account Security | Legacy | ✅ |
| `update-legacy-2017-05-04-102` | Patch 05.04.17 | Legacy | ✅ |
| `update-legacy-2017-05-04-103` | Patch 05.04.17 | Legacy | ✅ |
| `update-legacy-2017-05-03-100` | Patch 05.03.17 | Legacy | ✅ |
| `update-legacy-2017-05-03-101` | Twitch Q&A + Giveaway | Legacy | ✅ |
| `update-legacy-2017-05-02-99` | Patch 05.02.17 | Legacy | ✅ |
| `update-legacy-2017-04-30-98` | Hiring Video Producer | Legacy | ✅ |
| `update-legacy-2017-04-28-97` | Dracona's Lair | Legacy | ✅ |
| `update-legacy-2017-04-27-96` | Dracona's Lair Patch | Legacy | ✅ |
| `update-legacy-2017-04-21-94` | Upcoming Patch | Legacy | ✅ |
| `update-legacy-2017-04-21-95` | Thank you! | Legacy | ✅ |
| `update-legacy-2017-04-19-92` | PvP Gallery | Legacy | ✅ |
| `update-legacy-2017-04-19-93` | Patch 04.19.17 | Legacy | ✅ |
| `update-legacy-2017-04-18-91` | Upcoming Balance Patch | Legacy | ✅ |
| `update-legacy-2017-04-17-90` | Patch 04.17.17 | Legacy | ✅ |
| `update-legacy-2017-04-15-89` | Patch 04.15.17 | Legacy | ✅ |
| `update-legacy-2017-04-13-86` | Points Ressurection! | Legacy | ✅ |
| `update-legacy-2017-04-13-87` | 04.13.17 Patch Notes | Legacy | ✅ |
| `update-legacy-2017-04-13-88` | Doorbuster Exclusives! | Legacy | ✅ |
| `update-legacy-2017-04-10-84` | Characer Creation Open! | Legacy | ✅ |
| `update-legacy-2017-04-10-85` | Patch Notes - Post Open Beta | Legacy | ✅ |
| `update-legacy-2017-04-08-80` | Open Beta | Legacy | ✅ |
| `update-legacy-2017-04-08-81` | Open Beta | Legacy | ✅ |
| `update-legacy-2017-04-08-82` | Twitch Livestream | Legacy | ✅ |
| `update-legacy-2017-04-08-83` | Patch Notes - Age of Dracona | Legacy | ✅ |
| `update-legacy-2017-03-20-78` | Age of Dracona - Boss Spotligh | Legacy | ✅ |
| `update-legacy-2017-03-20-79` | Age of Dracona - Creature Spot | Legacy | ✅ |
| `update-legacy-2017-03-10-76` | Archlight Lore - Part 1 | Legacy | ✅ |
| `update-legacy-2017-03-10-77` | Age of Dracona | Legacy | ✅ |
| `update-legacy-2017-02-27-75` | Patch Notes 02.27.17 | Legacy | ✅ |
| `update-legacy-2017-02-24-74` | Patch Sat/Sun/Mon | Legacy | ✅ |
| `update-legacy-2017-02-21-73` | Mini-Patch 21.2.17 | Legacy | ✅ |
| `update-legacy-2017-02-20-72` | The Future of Archlight! | Legacy | ✅ |
| `update-legacy-2017-02-17-71` | Patch Notes 2.17.17 | Legacy | ✅ |
| `update-legacy-2017-02-16-70` | Content Release Schedule! | Legacy | ✅ |
| `update-legacy-2017-02-11-69` | Developers Notes | Legacy | ✅ |
| `update-legacy-2017-02-07-68` | Mini-Patch | Legacy | ✅ |
| `update-legacy-2017-01-30-67` | Upcoming Change | Legacy | ✅ |
| `update-legacy-2017-01-28-66` | Patch Notes 01.28.17 | Legacy | ✅ |
| `update-legacy-2017-01-24-64` | Patch Notes 01.24.17 | Legacy | ✅ |
| `update-legacy-2017-01-24-65` | Value Bundles! | Legacy | ✅ |
| `update-legacy-2017-01-23-63` | Developers Notes | Legacy | ✅ |
| `update-legacy-2017-01-22-61` | Mini-Patch | Legacy | ✅ |
| `update-legacy-2017-01-22-62` | Wikipedia Rewards | Legacy | ✅ |
| `update-legacy-2017-01-21-58` | Patch Notes | Legacy | ✅ |
| `update-legacy-2017-01-21-59` | Mini-Patch | Legacy | ✅ |
| `update-legacy-2017-01-21-60` | Awakening Boots | Legacy | ✅ |
| `update-legacy-2017-01-19-57` | Facebook Giveaway! | Legacy | ✅ |
| `update-legacy-2017-01-16-56` | AFK Bot Checker | Legacy | ✅ |
| `update-legacy-2017-01-13-55` | New Tutors! | Legacy | ✅ |
| `update-legacy-2017-01-11-54` | Tutor Applications! | Legacy | ✅ |
| `update-legacy-2017-01-08-53` | Developers Notes! | Legacy | ✅ |
| `update-legacy-2017-01-07-52` | New Additions! | Legacy | ✅ |
| `update-legacy-2017-01-04-51` | New Player Bonus | Legacy | ✅ |
| `update-legacy-2017-01-02-50` | 2x Weekend! | Legacy | ✅ |

</details>

<details><summary><strong>2018</strong> — 138 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-legacy-2018-12-26-355` | legacy-2018-12-26-355 | Legacy | ✅ |
| `update-legacy-2018-12-26-356` | legacy-2018-12-26-356 | Legacy | ✅ |
| `update-legacy-2018-12-26-357` | legacy-2018-12-26-357 | Legacy | ✅ |
| `update-legacy-2018-11-30-354` | Christmas Event | Legacy | ✅ |
| `update-legacy-2018-11-27-353` | Patch Notes | Legacy | ✅ |
| `update-legacy-2018-11-08-352` | 25% Off, Heirloom Points & Acc | Legacy | ✅ |
| `update-legacy-2018-11-01-351` | Feat Changes | Legacy | ✅ |
| `update-legacy-2018-10-27-350` | Character Reservation! | Legacy | ✅ |
| `update-legacy-2018-10-22-349` | Archlight North America | Legacy | ✅ |
| `update-legacy-2018-10-16-348` | Community Poll! | Legacy | ✅ |
| `update-legacy-2018-10-05-347` | Patch 14.1.1 | Legacy | ✅ |
| `update-legacy-2018-09-30-346` | First Ban Wave | Legacy | ✅ |
| `update-legacy-2018-09-29-345` | Heaven & Hell Limited Editions | Legacy | ✅ |
| `update-legacy-2018-09-26-344` | Additional Patch 14.1.0 Notes | Legacy | ✅ |
| `update-legacy-2018-09-18-343` | Patch 14.1.0 | Legacy | ✅ |
| `update-legacy-2018-09-15-342` | Patch 14.0.7 | Legacy | ✅ |
| `update-legacy-2018-09-10-341` | A Quick Poll! | Legacy | ✅ |
| `update-legacy-2018-09-07-340` | Patch 14.0.6 | Legacy | ✅ |
| `update-legacy-2018-09-06-339` | Game Designer Position | Legacy | ✅ |
| `update-legacy-2018-09-01-338` | Mini-Patch 14.0.5 | Legacy | ✅ |
| `update-legacy-2018-08-31-337` | Siege Wars Prizepool Doubled! | Legacy | ✅ |
| `update-legacy-2018-08-30-336` | August House Contest Winners! | Legacy | ✅ |
| `update-legacy-2018-08-24-335` | Orb Auras! | Legacy | ✅ |
| `update-legacy-2018-08-22-333` | Siege Wars | Legacy | ✅ |
| `update-legacy-2018-08-22-334` | Patch 14.0.4 | Legacy | ✅ |
| `update-legacy-2018-08-16-332` | ArchLauncher Improvements | Legacy | ✅ |
| `update-legacy-2018-08-14-331` | Quick Poll! | Legacy | ✅ |
| `update-legacy-2018-08-10-330` | Patch 14.0.3 | Legacy | ✅ |
| `update-legacy-2018-08-06-329` | 2x Sunflowers! | Legacy | ✅ |
| `update-legacy-2018-08-04-328` | Florisa Summer Event | Legacy | ✅ |
| `update-legacy-2018-08-03-327` | Regarding Patron | Legacy | ✅ |
| `update-legacy-2018-07-31-326` | Patch 14.0.2 | Legacy | ✅ |
| `update-legacy-2018-07-26-325` | Patch 14.0.1 | Legacy | ✅ |
| `update-legacy-2018-07-19-323` | Coins Resurrection! | Legacy | ✅ |
| `update-legacy-2018-07-19-324` | Doorbusters, New Launcher, Hyp | Legacy | ✅ |
| `update-legacy-2018-07-18-321` | Send Us Your Setup! | Legacy | ✅ |
| `update-legacy-2018-07-18-322` | Additional Patch Notes! | Legacy | ✅ |
| `update-legacy-2018-07-17-320` | Class Balance Notes | Legacy | ✅ |
| `update-legacy-2018-07-16-319` | Livestream Q&A! | Legacy | ✅ |
| `update-legacy-2018-07-15-318` | Passive AT's Removed! | Legacy | ✅ |
| `update-legacy-2018-07-13-315` | Teaser | Legacy | ✅ |
| `update-legacy-2018-07-13-316` | Character Creation Now Open! | Legacy | ✅ |
| `update-legacy-2018-07-13-317` | Apply to be a Tutor! | Legacy | ✅ |
| `update-legacy-2018-07-12-313` | Balancing Begins | Legacy | ✅ |
| `update-legacy-2018-07-12-314` | 8 Days Until War of Gods | Legacy | ✅ |
| `update-legacy-2018-07-09-312` | Unlimited PvP!~ | Legacy | ✅ |
| `update-legacy-2018-07-08-311` | Archlight: War of Gods | Legacy | ✅ |
| `update-legacy-2018-06-28-310` | Additional Patch 13.0.0 Notes | Legacy | ✅ |
| `update-legacy-2018-06-20-309` | Additional Patch 13.0.0 Notes | Legacy | ✅ |
| `update-legacy-2018-06-18-308` | June House Contest Winners! | Legacy | ✅ |
| `update-legacy-2018-06-16-307` | Patch 13.0.0 | Legacy | ✅ |
| `update-legacy-2018-05-31-306` | Patch 12.3.1 | Legacy | ✅ |
| `update-legacy-2018-05-26-304` | The Classes of Archlight! | Legacy | ✅ |
| `update-legacy-2018-05-26-305` | Thank You Archlighters! | Legacy | ✅ |
| `update-legacy-2018-05-21-303` | Hiring Video Editor | Legacy | ✅ |
| `update-legacy-2018-05-18-302` | Patch 12.3.0 | Legacy | ✅ |
| `update-legacy-2018-05-15-301` | May House Contest Winners! | Legacy | ✅ |
| `update-legacy-2018-05-14-300` | Grip Poll | Legacy | ✅ |
| `update-legacy-2018-05-09-299` | Archlight Featured | Legacy | ✅ |
| `update-legacy-2018-05-08-298` | Patch 12.3.0 (Expected Teaser) | Legacy | ✅ |
| `update-legacy-2018-05-07-296` | Lore Scroll #4 | Legacy | ✅ |
| `update-legacy-2018-05-07-297` | 5x Legacy Crystals! | Legacy | ✅ |
| `update-legacy-2018-05-04-295` | Lore Scroll #3 | Legacy | ✅ |
| `update-legacy-2018-05-03-293` | Lore Scrolls Discovered | Legacy | ✅ |
| `update-legacy-2018-05-03-294` | Lore Scroll #2 | Legacy | ✅ |
| `update-legacy-2018-05-02-292` | May House Contest! | Legacy | ✅ |
| `update-legacy-2018-05-01-291` | Patch 12.2.1 | Legacy | ✅ |
| `update-legacy-2018-04-28-290` | Content Timeline! | Legacy | ✅ |
| `update-legacy-2018-04-24-289` | Sarandiel Event | Legacy | ✅ |
| `update-legacy-2018-04-22-288` | Patch 12.2.0 | Legacy | ✅ |
| `update-legacy-2018-04-20-287` | The Kraken Is Coming.. | Legacy | ✅ |
| `update-legacy-2018-04-17-285` | Patch! :) | Legacy | ✅ |
| `update-legacy-2018-04-17-286` | Chaos and Order Feats | Legacy | ✅ |
| `update-legacy-2018-04-13-284` | Patch 12.1.0 | Legacy | ✅ |
| `update-legacy-2018-04-10-281` | Patch 12.0.1 + Client Build | Legacy | ✅ |
| `update-legacy-2018-04-10-282` | Most Unique Logins Ever | Legacy | ✅ |
| `update-legacy-2018-04-10-283` | Q&A Livestream | Legacy | ✅ |
| `update-legacy-2018-04-07-279` | Macro/External Software Policy | Legacy | ✅ |
| `update-legacy-2018-04-07-280` | Oray Studios | Legacy | ✅ |
| `update-legacy-2018-04-05-277` | Awakening Tutorial Video! | Legacy | ✅ |
| `update-legacy-2018-04-05-278` | Forgotten Islands Expansion | Legacy | ✅ |
| `update-legacy-2018-04-04-276` | New Player Videos! | Legacy | ✅ |
| `update-legacy-2018-04-02-275` | Patch 11.1.4 + Client Build | Legacy | ✅ |
| `update-legacy-2018-03-29-274` | Patch 11.1.3 + New Client Buil | Legacy | ✅ |
| `update-legacy-2018-03-27-273` | Developers Update | Legacy | ✅ |
| `update-legacy-2018-03-25-271` | [New] Referral System | Legacy | ✅ |
| `update-legacy-2018-03-25-272` | House Contest #6! | Legacy | ✅ |
| `update-legacy-2018-03-20-270` | Easter On Archlight! | Legacy | ✅ |
| `update-legacy-2018-03-18-268` | Patch 11.1.2 | Legacy | ✅ |
| `update-legacy-2018-03-18-269` | House Contest #4/5 | Legacy | ✅ |
| `update-legacy-2018-03-11-267` | Balance Patch 11.1.1 | Legacy | ✅ |
| `update-legacy-2018-03-08-265` | Patch 11.1.0 + Client Build | Legacy | ✅ |
| `update-legacy-2018-03-08-266` | Developers Livestream VOD | Legacy | ✅ |
| `update-legacy-2018-03-07-263` | ArchBot Poll! | Legacy | ✅ |
| `update-legacy-2018-03-07-264` | Livestream Q&A + Teasers | Legacy | ✅ |
| `update-legacy-2018-03-05-262` | Hall Of Fame Additions | Legacy | ✅ |
| `update-legacy-2018-03-04-261` | House Contest #3 Winners! | Legacy | ✅ |
| `update-legacy-2018-02-27-260` | Patch 11.0.4 | Legacy | ✅ |
| `update-legacy-2018-02-26-259` | Deadstone Access | Legacy | ✅ |
| `update-legacy-2018-02-25-256` | War Breakout! | Legacy | ✅ |
| `update-legacy-2018-02-25-257` | Regen Gem Balances | Legacy | ✅ |
| `update-legacy-2018-02-25-258` | House Contest #2 Winners! | Legacy | ✅ |
| `update-legacy-2018-02-20-255` | House Contest #1 | Legacy | ✅ |
| `update-legacy-2018-02-19-253` | Valentine's House Contest Winn | Legacy | ✅ |
| `update-legacy-2018-02-19-254` | Legendary Keys Promo! | Legacy | ✅ |
| `update-legacy-2018-02-17-252` | Protect Your Account | Legacy | ✅ |
| `update-legacy-2018-02-15-250` | Valentine's House Contest | Legacy | ✅ |
| `update-legacy-2018-02-15-251` | Patch 11.0.3 | Legacy | ✅ |
| `update-legacy-2018-02-14-248` | Apology On Crashes | Legacy | ✅ |
| `update-legacy-2018-02-14-249` | Valentine's Promo + Raids! | Legacy | ✅ |
| `update-legacy-2018-02-12-247` | Patch 11.0.2 | Legacy | ✅ |
| `update-legacy-2018-02-10-246` | Patch 11.0.1 | Legacy | ✅ |
| `update-legacy-2018-02-09-244` | New Client Download | Legacy | ✅ |
| `update-legacy-2018-02-09-245` | Coins + Legacy! | Legacy | ✅ |
| `update-legacy-2018-02-08-242` | Livestream Q&A + Teasers | Legacy | ✅ |
| `update-legacy-2018-02-08-243` | Doorbusters! | Legacy | ✅ |
| `update-legacy-2018-02-05-240` | Less than 4 Days | Legacy | ✅ |
| `update-legacy-2018-02-05-241` | Teaser #11 | Legacy | ✅ |
| `update-legacy-2018-02-04-239` | Teaser #10 | Legacy | ✅ |
| `update-legacy-2018-02-03-238` | Teaser #9 | Legacy | ✅ |
| `update-legacy-2018-02-02-237` | Teaser #8 | Legacy | ✅ |
| `update-legacy-2018-02-01-235` | 25 Hour Livestream! | Legacy | ✅ |
| `update-legacy-2018-02-01-236` | Teaser #7 | Legacy | ✅ |
| `update-legacy-2018-01-31-231` | Teaser #4-5 | Legacy | ✅ |
| `update-legacy-2018-01-31-232` | Hypeeee!!! | Legacy | ✅ |
| `update-legacy-2018-01-31-233` | Teaser Livestream! | Legacy | ✅ |
| `update-legacy-2018-01-31-234` | Teaser #6 | Legacy | ✅ |
| `update-legacy-2018-01-29-227` | Teaser #3 | Legacy | ✅ |
| `update-legacy-2018-01-29-228` | Weekly Patches/Content | Legacy | ✅ |
| `update-legacy-2018-01-29-229` | Character Creation Open! | Legacy | ✅ |
| `update-legacy-2018-01-29-230` | Character Creation Open! | Legacy | ✅ |
| `update-legacy-2018-01-27-226` | Teaser #2 (Of 14) | Legacy | ✅ |
| `update-legacy-2018-01-26-225` | Teaser #1 (Of 14) | Legacy | ✅ |
| `update-legacy-2018-01-16-224` | Rise Of The Otherworlds | Legacy | ✅ |
| `update-legacy-2018-01-06-223` | Quest Service Run | Legacy | ✅ |
| `update-legacy-2018-01-03-222` | 2x Points! | Legacy | ✅ |
| `update-legacy-2018-01-02-220` | Christmas House Winners! | Legacy | ✅ |
| `update-legacy-2018-01-02-221` | Patch 10.6.1 and Catch-Up Bags | Legacy | ✅ |

</details>

<details><summary><strong>2019</strong> — 56 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-legacy-2019-12-21-413` | $500USD 3v3 Arena Tournmament on EU | Legacy | ✅ |
| `update-legacy-2019-12-13-412` | Christmas Patch Notes & Events! | Legacy | ✅ |
| `update-legacy-2019-12-03-411` | Additional Patch Notes for Champions of Arena! | Legacy | ✅ |
| `update-legacy-2019-11-29-410` | Character Name Reservation Open! | Legacy | ✅ |
| `update-legacy-2019-11-23-409` | New European Season, ArchClient 2.0, Class Balances & $500USD 3v3 Arena Tournament | Legacy | ✅ |
| `update-legacy-2019-11-22-408` | Livestream Announcement | Legacy | ✅ |
| `update-legacy-2019-11-08-407` | Patch Notes November 8th | Legacy | ✅ |
| `update-legacy-2019-11-01-406` | Patch Notes November 1st | Legacy | ✅ |
| `update-legacy-2019-10-01-405` | Livestream! | Legacy | ✅ |
| `update-legacy-2019-09-14-404` | NA Season 3 Launch | Legacy | ✅ |
| `update-legacy-2019-08-24-403` | Patch Notes August 24th | Legacy | ✅ |
| `update-legacy-2019-08-16-402` | Patch Notes | Legacy | ✅ |
| `update-legacy-2019-08-10-401` | Patch Notes August 10th | Legacy | ✅ |
| `update-legacy-2019-08-09-400` | Archlight Team Hiring | Legacy | ✅ |
| `update-legacy-2019-08-08-399` | Wiki Rewards! | Legacy | ✅ |
| `update-legacy-2019-08-03-398` | Patch Notes August 3rd | Legacy | ✅ |
| `update-legacy-2019-08-02-397` | Patch Notes August 2nd | Legacy | ✅ |
| `update-legacy-2019-08-01-396` | Archlights 4th Anniversary | Legacy | ✅ |
| `update-legacy-2019-07-28-395` | Sieges Now Open | Legacy | ✅ |
| `update-legacy-2019-07-26-394` | July 26th Patch Notes | Legacy | ✅ |
| `update-legacy-2019-07-21-393` | Patch Notes July 21st | Legacy | ✅ |
| `update-legacy-2019-07-17-392` | EU Exclusive Cosmetics | Legacy | ✅ |
| `update-legacy-2019-07-16-391` | Teaser #9 - Content Creators, Bounty Hunt System & More | Legacy | ✅ |
| `update-legacy-2019-07-14-390` | Teaser #8 - New Expansion Content | Legacy | ✅ |
| `update-legacy-2019-07-12-388` | Character Name Reservation Open! | Legacy | ✅ |
| `update-legacy-2019-07-12-389` | Teaser #7 - Misc Changes & PvP Base Damage | Legacy | ✅ |
| `update-legacy-2019-07-10-387` | Teaser #6 - Gunslinger & Tamer | Legacy | ✅ |
| `update-legacy-2019-07-08-386` | Teaser #5 - Archlight Battlegrounds | Legacy | ✅ |
| `update-legacy-2019-07-06-385` | Teaser #4 - Content Balances & Changes | Legacy | ✅ |
| `update-legacy-2019-07-04-384` | Teaser #3 - Shop Changes | Legacy | ✅ |
| `update-legacy-2019-07-02-383` | Teaser #2 - Profession Changes | Legacy | ✅ |
| `update-legacy-2019-06-30-382` | Teaser #1 - Guild System Revamp | Legacy | ✅ |
| `update-legacy-2019-06-28-381` | New European Season | Legacy | ✅ |
| `update-legacy-2019-06-27-380` | Patch Notes June 28th | Legacy | ✅ |
| `update-legacy-2019-06-14-379` | Patch Notes July 15th | Legacy | ✅ |
| `update-legacy-2019-06-10-378` | Developer Post | Legacy | ✅ |
| `update-legacy-2019-06-04-377` | Patch Notes June 7th | Legacy | ✅ |
| `update-legacy-2019-05-23-376` | Patch Notes May 24th | Legacy | ✅ |
| `update-legacy-2019-05-21-375` | Patch Notes May 24th | Legacy | ✅ |
| `update-legacy-2019-05-17-374` | Coins For Clips! | Legacy | ✅ |
| `update-legacy-2019-05-16-373` | Patch Notes May 17th | Legacy | ✅ |
| `update-legacy-2019-05-10-372` | We're Hiring! | Legacy | ✅ |
| `update-legacy-2019-04-25-371` | Additional Patch Notes! | Legacy | ✅ |
| `update-legacy-2019-04-21-370` | Referral Contest! | Legacy | ✅ |
| `update-legacy-2019-04-16-369` | North America Season 2 | Legacy | ✅ |
| `update-legacy-2019-03-20-368` | New Content | Legacy | ✅ |
| `update-legacy-2019-03-19-367` | Patch Notes | Legacy | ✅ |
| `update-legacy-2019-03-06-366` | Patch Notes | Legacy | ✅ |
| `update-legacy-2019-03-03-365` | Patch Notes | Legacy | ✅ |
| `update-legacy-2019-02-24-364` | Patch Notes | Legacy | ✅ |
| `update-legacy-2019-02-21-363` | Quick Poll | Legacy | ✅ |
| `update-legacy-2019-02-19-362` | Patch Notes | Legacy | ✅ |
| `update-legacy-2019-02-15-361` | Doorbusters! | Legacy | ✅ |
| `update-legacy-2019-02-14-360` | New EU Season | Legacy | ✅ |
| `update-legacy-2019-02-08-359` | Character Reservation | Legacy | ✅ |
| `update-legacy-2019-01-15-358` | Patch Notes | Legacy | ✅ |

</details>

<details><summary><strong>2020</strong> — 39 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-legacy-2020-12-11-452` | Santa Claus is Coming to Archlight! | Legacy | ✅ |
| `update-legacy-2020-12-03-451` | Ildar Season Doorbuster! | Legacy | ✅ |
| `update-legacy-2020-12-01-450` | New Ildar Season - December 4th - Season Notes | Legacy | ✅ |
| `update-legacy-2020-11-16-449` | A new Era of Ildar | Legacy | ✅ |
| `update-legacy-2020-10-21-448` | Halloween Patch | Legacy | ✅ |
| `update-legacy-2020-10-19-447` | Spooktober Wednesday Update! | Legacy | ✅ |
| `update-legacy-2020-10-11-446` | Archlight Team Grows! | Legacy | ✅ |
| `update-legacy-2020-09-15-445` | Anniversary Event, Class Balances, Manual Play Bonuses & More! | Legacy | ✅ |
| `update-legacy-2020-09-02-444` | Dracona Doorbusters, Cosmetic Races & Final Patch Notes | Legacy | ✅ |
| `update-legacy-2020-08-31-443` | Bonus Referral Rewards! | Legacy | ✅ |
| `update-legacy-2020-08-30-442` | New Shine Cosmetic & Race | Legacy | ✅ |
| `update-legacy-2020-08-21-441` | Character Creation Open For New Dracona Season! | Legacy | ✅ |
| `update-legacy-2020-08-17-440` | New Dracona Season - September 4th | Legacy | ✅ |
| `update-legacy-2020-07-27-439` | Mobile Client & New Awakening System | Legacy | ✅ |
| `update-legacy-2020-06-17-438` | Minor Backpacks, Doorbusters, and much more! | Legacy | ✅ |
| `update-legacy-2020-06-13-437` | Free T4 Aura | Legacy | ✅ |
| `update-legacy-2020-06-09-436` | Character Creation for New Ildar Season Open! | Legacy | ✅ |
| `update-legacy-2020-06-08-435` | New Ildar Season - Balance Changes - June 19th | Legacy | ✅ |
| `update-legacy-2020-06-06-434` | New Ildar Season June 19th | Legacy | ✅ |
| `update-legacy-2020-05-28-433` | Patch Notes May 29th | Legacy | ✅ |
| `update-legacy-2020-05-14-432` | Patch Notes May 15th | Legacy | ✅ |
| `update-legacy-2020-05-04-431` | Patch Notes May 5th | Legacy | ✅ |
| `update-legacy-2020-04-28-430` | Patch Notes April 28th | Legacy | ✅ |
| `update-legacy-2020-04-22-429` | Patch Notes April 23rd | Legacy | ✅ |
| `update-legacy-2020-04-14-428` | Balance Patch - April 17th (Dracona Launch) | Legacy | ✅ |
| `update-legacy-2020-04-10-427` | Character Creation Open For New Dracona Season! | Legacy | ✅ |
| `update-legacy-2020-04-07-426` | Patch Notes - April 7th | Legacy | ✅ |
| `update-legacy-2020-04-06-425` | New Dracona Season - April 17th | Legacy | ✅ |
| `update-legacy-2020-03-24-424` | Patch Notes March 24th | Legacy | ✅ |
| `update-legacy-2020-03-18-423` | Patch Notes March 18th | Legacy | ✅ |
| `update-legacy-2020-03-05-422` | Avuria Launch in 20 Hours!! | Legacy | ✅ |
| `update-legacy-2020-03-03-421` | Content Creators on Avuria & Last Patch Notes! | Legacy | ✅ |
| `update-legacy-2020-02-27-420` | Additional Patchs #3 | Legacy | ✅ |
| `update-legacy-2020-02-23-419` | Additional Patchs #2 | Legacy | ✅ |
| `update-legacy-2020-02-12-418` | Archlight 2 & New Bot-Free World Avuria | Legacy | ✅ |
| `update-legacy-2020-02-07-417` | A New Age Is Coming | Legacy | ✅ |
| `update-legacy-2020-01-28-416` | Patch Notes January 29th | Legacy | ✅ |
| `update-legacy-2020-01-19-415` | Catchup Pouches & 2x Living Archlight Tokens! | Legacy | ✅ |
| `update-legacy-2020-01-06-414` | Patch Notes January 6th | Legacy | ✅ |

</details>

<details><summary><strong>2021</strong> — 13 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-abaldar-2021-12-22-6` | Christmas Token Event! | Abaldar | ✅ |
| `update-abaldar-2021-12-20-5` | Christmas Event | Abaldar | ✅ |
| `update-abaldar-2021-12-09-4` | Record Breaking Launch! | Abaldar | ✅ |
| `update-abaldar-2021-11-30-3` | Additional Abaldar Notes! | Abaldar | ✅ |
| `update-abaldar-2021-11-26-1` | Abaldar Balance Notes | Abaldar | ✅ |
| `update-abaldar-2021-11-26-2` | Abaldar Character Creation | Abaldar | ✅ |
| `update-legacy-2021-10-28-459` | The Pumptastic invasion of Archlight city! | Legacy | ✅ |
| `update-legacy-2021-09-08-458` | Rise of the Death Knight! - Ildar Launches September 17th! | Legacy | ✅ |
| `update-legacy-2021-09-04-457` | New Ildar Season - Rise of the Death Knight - September 17th | Legacy | ✅ |
| `update-legacy-2021-07-08-456` | A special launch plan & Doorbusters! | Legacy | ✅ |
| `update-legacy-2021-06-27-455` | Dracona relaunches July 9th | Legacy | ✅ |
| `update-legacy-2021-02-05-454` | Dracona Season Class Balance Notes | Legacy | ✅ |
| `update-legacy-2021-01-28-453` | Dracona Season Expansion Notes | Legacy | ✅ |

</details>

<details><summary><strong>2022</strong> — 22 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-abaldar-2022-09-07-16` | Changelog 9/6/22 | Abaldar | ✅ |
| `update-abaldar-2022-08-31-15` | Anniversary Event, Balancement, Quality of Life changes and fixes! | Abaldar | ✅ |
| `update-abaldar-2022-08-19-14` | Patch notes august 19th! | Abaldar | ✅ |
| `update-abaldar-2022-08-17-13` | Changelog August 17th | Abaldar | ✅ |
| `update-abaldar-2022-08-15-12` | Changelog 8/15 | Abaldar | ✅ |
| `update-abaldar-2022-08-13-11` | Pre-Launch Adjustments/Additional Patch | Abaldar | ✅ |
| `update-abaldar-2022-08-06-10` | Abaldar Fresh Start August 13th | Abaldar | ✅ |
| `update-legacy-2022-06-16-471` | Changelog June 14th | Legacy | ✅ |
| `update-legacy-2022-06-08-470` | Changelog June 8th | Legacy | ✅ |
| `update-legacy-2022-06-01-469` | Changelog June 1st | Legacy | ✅ |
| `update-legacy-2022-05-30-468` | Changelog May 30th | Legacy | ✅ |
| `update-legacy-2022-05-25-467` | Changelog May 25th | Legacy | ✅ |
| `update-legacy-2022-05-24-466` | Changelog May 24th | Legacy | ✅ |
| `update-legacy-2022-05-20-465` | Patch Notes May 20th | Legacy | ✅ |
| `update-legacy-2022-05-13-464` | Pre-Launch Adjustments | Legacy | ✅ |
| `update-legacy-2022-05-10-463` | Legacy Doorbusters and Races! | Legacy | ✅ |
| `update-legacy-2022-05-06-460` | Archlight Legacy New Season Notes | Legacy | ✅ |
| `update-legacy-2022-05-06-461` | Archlight Legacy - Class Changes | Legacy | ✅ |
| `update-legacy-2022-05-06-462` | Legacy Character Creation & Accounting Merging | Legacy | ✅ |
| `update-abaldar-2022-04-29-9` | Archlight Legacy New Season Notes | Abaldar | ✅ |
| `update-abaldar-2022-01-12-8` | Patch Notes January 12th 2022 | Abaldar | ✅ |
| `update-abaldar-2022-01-04-7` | Patch Notes January 3rd 2022 | Abaldar | ✅ |

</details>

<details><summary><strong>2023</strong> — 40 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-legacy-2023-12-31-495` | Happy New Year - New Year Gifts | Legacy | ✅ |
| `update-legacy-2023-12-24-494` | Celebrate Christmas with a free snow outline cosmetic gift | Legacy | ✅ |
| `update-legacy-2023-12-21-493` | Changelogs 12/20 | Legacy | ✅ |
| `update-legacy-2023-12-20-492` | Changelogs 12/19 | Legacy | ✅ |
| `update-legacy-2023-12-14-491` | Christmas Event Starts Tomorrow, December 15th! | Legacy | ✅ |
| `update-legacy-2023-12-11-490` | Changelogs 12/11 | Legacy | ✅ |
| `update-legacy-2023-12-06-489` | Doorbuster, Races, ArchPass and Additional Notes! | Legacy | ✅ |
| `update-legacy-2023-12-04-488` | Character Creation Is Now Open! | Legacy | ✅ |
| `update-legacy-2023-12-02-487` | New Legacy Season Starts December 9th! | Legacy | ✅ |
| `update-legacy-2023-11-25-486` | Fresh Legacy Start December 9th! | Legacy | ✅ |
| `update-abaldar-2023-11-25-32` | Fresh Legacy Start December 9th! | Abaldar | ✅ |
| `update-abaldar-2023-10-17-31` | Autumn and anniversary celebrations farewell! | Abaldar | ✅ |
| `update-abaldar-2023-10-10-30` | Anniversary and autumn celebrations are drawing to a close | Abaldar | ✅ |
| `update-abaldar-2023-10-06-29` | Changelog 06/10/2023 | Abaldar | ✅ |
| `update-abaldar-2023-09-29-28` | Anniversary Event & Autumn Event - Patch Notes | Abaldar | ✅ |
| `update-abaldar-2023-09-16-27` | Changelog 9/15 | Abaldar | ✅ |
| `update-abaldar-2023-09-12-26` | Changelog 9/12 | Abaldar | ✅ |
| `update-abaldar-2023-09-08-25` | Changelog 9/8 | Abaldar | ✅ |
| `update-abaldar-2023-09-03-24` | Changelog 9/3 | Abaldar | ✅ |
| `update-abaldar-2023-09-02-23` | Pre launch and additional notes! | Abaldar | ✅ |
| `update-legacy-2023-08-31-485` | Donations Open and Doorbusters! | Legacy | ✅ |
| `update-abaldar-2023-08-31-22` | Donations Open and Doorbusters! | Abaldar | ✅ |
| `update-legacy-2023-08-25-484` | Abaldar's Character Creation is now open! | Legacy | ✅ |
| `update-abaldar-2023-08-25-21` | Abaldar's Character Creation is now open! | Abaldar | ✅ |
| `update-legacy-2023-08-24-483` | Fresh Start Abaldar Season! | Legacy | ✅ |
| `update-abaldar-2023-08-24-20` | Fresh Start Abaldar Season! | Abaldar | ✅ |
| `update-legacy-2023-08-19-482` | Fresh Start Abaldar Season | Legacy | ✅ |
| `update-abaldar-2023-08-19-19` | Fresh Start Abaldar Season | Abaldar | ✅ |
| `update-legacy-2023-04-27-481` | Latest Changelogs 4/20/2023 | Legacy | ✅ |
| `update-legacy-2023-04-06-480` | Easter Event 2023 | Legacy | ✅ |
| `update-legacy-2023-04-05-479` | Latest Changelogs | Legacy | ✅ |
| `update-legacy-2023-03-30-478` | Changelog March 30th 2023 | Legacy | ✅ |
| `update-legacy-2023-03-27-476` | Latest Changelogs | Legacy | ✅ |
| `update-legacy-2023-03-27-477` | Changelog March 27th 2023 | Legacy | ✅ |
| `update-legacy-2023-03-18-475` | Pre-Launch Adjustments/Additional Patch | Legacy | ✅ |
| `update-legacy-2023-03-16-474` | Legacy Doorbusters, LAT Shop Changes & Legacy Cosmetic Races! | Legacy | ✅ |
| `update-legacy-2023-03-13-472` | New Legacy Season | Legacy | ✅ |
| `update-legacy-2023-03-13-473` | Character Creation for Legacy Fresh Start is NOW OPEN | Legacy | ✅ |
| `update-abaldar-2023-03-13-18` | Legacy Character Creation | Abaldar | ✅ |
| `update-abaldar-2023-03-12-17` | New Legacy Season | Abaldar | ✅ |

</details>

<details><summary><strong>2024</strong> — 21 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-legacy-2024-10-02-507` | Changelogs [10/2] | Legacy | ✅ |
| `update-legacy-2024-09-29-506` | Latest Changelogs | Legacy | ✅ |
| `update-legacy-2024-09-26-505` | Anniversary/Autumn Event 2024 | Legacy | ✅ |
| `update-legacy-2024-09-23-504` | Latest Changelogs | Legacy | ✅ |
| `update-legacy-2024-09-18-502` | Latest Changelogs | Legacy | ✅ |
| `update-legacy-2024-09-18-503` | Changelogs [9/18] | Legacy | ✅ |
| `update-legacy-2024-09-16-501` | Changelogs [9/15] | Legacy | ✅ |
| `update-legacy-2024-09-14-500` | Legacy's New Season Doors Are Officially Wide Open! Launch Day Notes Available Now | Legacy | ✅ |
| `update-legacy-2024-09-11-499` | Legacy Donations Are Now Open: Check Out New Doorbusters and Additional Notes! | Legacy | ✅ |
| `update-legacy-2024-09-09-498` | Legacy Character Creation is Officially Open! | Legacy | ✅ |
| `update-legacy-2024-09-07-497` | Big news! The patch notes for Legacy’s new season have officially landed | Legacy | ✅ |
| `update-legacy-2024-08-31-496` | Legacy's New Season Kicks Off September 14th! | Legacy | ✅ |
| `update-abaldar-2024-07-04-41` | Changelog July 4th | Abaldar | ✅ |
| `update-abaldar-2024-06-25-40` | Changelog June 25th | Abaldar | ✅ |
| `update-abaldar-2024-06-24-39` | Changelog June 24th | Abaldar | ✅ |
| `update-abaldar-2024-06-20-38` | Changelog June 20th | Abaldar | ✅ |
| `update-abaldar-2024-06-19-37` | Balancement and Miscellaneous Changes | Abaldar | ✅ |
| `update-abaldar-2024-06-08-36` | Abaldar Season Doors Open - Launch Day Notes Now Available! | Abaldar | ✅ |
| `update-abaldar-2024-06-05-35` | Donations Now Open: Additional Notes and Doorbusters Up for Grabs! | Abaldar | ✅ |
| `update-abaldar-2024-06-01-34` | Abaldar's Fresh Start - June 8th! Patch Notes Now Live! | Abaldar | ✅ |
| `update-abaldar-2024-05-25-33` | Abaldar's Fresh Start - June 8th! | Abaldar | ✅ |

</details>

<details><summary><strong>2025</strong> — 17 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-legacy-2025-11-14-518` | End of Halloween Event & Latest Changelogs | Legacy | ✅ |
| `update-legacy-2025-11-05-517` | Latest Changelogs | Legacy | ✅ |
| `update-legacy-2025-10-31-516` | Halloween and 10 Years of Archlight! | Legacy | ✅ |
| `update-legacy-2025-10-29-515` | Latest Changelogs | Legacy | ✅ |
| `update-legacy-2025-10-25-514` | Legacy Doors Are Open — Official Launch in 2 Hours! Additional launch notes are available | Legacy | ✅ |
| `update-legacy-2025-10-22-513` | Donations Are Now LIVE for Legacy Season! | Legacy | ✅ |
| `update-legacy-2025-10-16-512` | Legacy Returns on October 25th — Mark Your Calendars! | Legacy | ✅ |
| `update-legacy-2025-10-11-510` | Legacy PTR Extended! | Legacy | ✅ |
| `update-legacy-2025-10-11-511` | Legacy PTR Closed! | Legacy | ✅ |
| `update-legacy-2025-10-08-509` | Legacy 2025 patch notes are live! | Legacy | ✅ |
| `update-legacy-2025-10-06-508` | Legacy PTR Account & Character Creation is Live! | Legacy | ✅ |
| `update-abaldar-2025-05-29-47` | Changelogs [5/29] | Abaldar | ✅ |
| `update-abaldar-2025-05-23-46` | Changelogs [5/23] | Abaldar | ✅ |
| `update-abaldar-2025-05-12-45` | Changelogs [5/12] | Abaldar | ✅ |
| `update-abaldar-2025-05-07-44` | Latest Changelogs | Abaldar | ✅ |
| `update-abaldar-2025-05-01-43` | Abaldar’s Donation is Open – Doorbusters Up for Grabs! | Abaldar | ✅ |
| `update-abaldar-2025-04-26-42` | Abaldar's Patch Notes Are Live – Official Launch May 3rd! | Abaldar | ✅ |

</details>

<details><summary><strong>2026</strong> — 4 updates</summary>

| ID / slug | Title | World | Migrated |
| --- | --- | --- | :---: |
| `update-hardcore-2026-04-03-001` | New World PTR – Changelog [4/3/2026] | Hardcore / PTR | ✅ |
| `update-hardcore-2026-04-01-002` | New World PTR – Changelogs [4/2/2026] | Hardcore / PTR | ✅ |
| `update-hardcore-2026-03-31-003` | New World PTR – Changelogs [4/1/2026] | Hardcore / PTR | ✅ |
| `update-hardcore-2026-03-30-004` | New World PTR – Patch Notes and PTR Account Creation Now Available! | Hardcore / PTR | ✅ |

</details>
