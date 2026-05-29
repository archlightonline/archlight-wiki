window.PROFESSIONS_INTERNAL_CONCEPT = {
  "meta": {
    "category": "Custom Internal Page",
    "title": "Professions",
    "lead": "Professions were revamped into a clearer UI-driven system: level professions, upgrade a single tool per profession, manage energy, use house or Guild Island stations, specialize after level 50, and craft stronger long-term progression items.",
    "stats": [
      [
        "Categories",
        "2"
      ],
      [
        "Professions",
        "11"
      ],
      [
        "Current model",
        "UI, tools, energy"
      ]
    ]
  },
  "groups": [
    {
      "id": "gathering",
      "title": "Gathering",
      "note": "Farming, Fishing, Mining, Skinning, Woodcutting"
    },
    {
      "id": "crafting",
      "title": "Crafting",
      "note": "Alchemy, Blacksmithing, Cooking, Jewelcrafting, Tanning, Woodworking"
    }
  ],
  "overviewSections": [
    {
      "title": "Overview",
      "html": "\n<p>Professions are split between <strong>Gathering</strong> and <strong>Crafting</strong>. Gathering feeds materials into crafting, while crafting unlocks items, tools, food, stations, profession bonuses, and long-term progression routes.</p>\n<p>The modern system is managed through the <strong>Profession UI</strong> under Character. It shows profession experience, bonuses, material locations, usable tools, station access, and workshop actions such as rune or weapon swaps.</p>\n<div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"><tbody>\n<tr><th>Energy cap</th><td>2,500 base, plus +250 maximum energy per Prestige Level.</td></tr>\n<tr><th>Daily item energy limit</th><td>+2,000 energy from consumable items per day, beds excluded.</td></tr>\n<tr><th>Activity energy</th><td>Daily task +25, dungeon +100, quest +100, Zaqor's Tower +1,000.</td></tr>\n<tr><th>Guild energy</th><td>Daily Training plot grants 200 / 300 / 500 energy by tier.</td></tr>\n<tr><th>Tools</th><td>Each profession now uses one upgradeable tool, progressing from Iron through Dragon instead of carrying many separate tools.</td></tr>\n<tr><th>Stations</th><td>Depot stations only cover early levels. Higher tiers use house stations or Guild Island stations.</td></tr>\n<tr><th>Specialization</th><td>After level 50, players choose two specializations. One can be mastered and can apply Craftsman Perk bonuses.</td></tr>\n<tr><th>Crafting time</th><td>Most crafts stay instant, but stronger crafts can require time and energy. Time can be sped up with Gold or Archlight Tokens.</td></tr>\n</tbody></table></div>\n<p>Daily profession tasks are no longer about crafting one fixed item. They now ask players to gain profession experience from that profession. Completing the daily grants bonus experience and a 10% profession experience bonus for the rest of the day.</p>\n",
      "tableCount": 1
    }
  ],
  "professions": [
    {
      "id": "farming",
      "group": "gathering",
      "role": "Crop production",
      "energy": "Uses energy when harvesting. Rare Saffron can drop from farming materials at higher progression.",
      "value": "Cooking ingredients, daily profession UI task progress, Achievement Points, Monster Essence bonus, Daily recipes, tool upgrades, material sorting",
      "icon": "🌿",
      "name": "Farming",
      "source": "farming.html",
      "lead": "Farming supplies cooking ingredients and now benefits from the revamped UI, tool upgrades, farm upgrades, and rare Saffron drops used by advanced Cooking crafts.",
      "media": [
        [
          "farm_bidding.png",
          "Farm Bidding"
        ],
        [
          "help_icon.png",
          "Help Icon"
        ],
        [
          "seed_merchant.png",
          "Seed Merchant"
        ],
        [
          "horse.png",
          "Horse"
        ],
        [
          "planting.gif",
          "Planting"
        ],
        [
          "watering.gif",
          "Watering"
        ],
        [
          "harvesting.gif",
          "Harvesting"
        ],
        [
          "daily_farming.png",
          "Daily Farming"
        ],
        [
          "clay-watering_can.png",
          "Clay Watering Can"
        ],
        [
          "potatoe_plant.png",
          "Potatoe Plant"
        ],
        [
          "iron-watering_can.png",
          "Iron Watering Can"
        ],
        [
          "ironingot.png",
          "Ironingot"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "corn_plant.png",
          "Corn Plant"
        ],
        [
          "copper-watering_can.png",
          "Copper Watering Can"
        ],
        [
          "copperingot.png",
          "Copperingot"
        ],
        [
          "carrot_plant.png",
          "Carrot Plant"
        ],
        [
          "chicken.gif",
          "Chicken"
        ],
        [
          "steel-watering_can.png",
          "Steel Watering Can"
        ],
        [
          "coalingot.png",
          "Coalingot"
        ],
        [
          "onion_plant.png",
          "Onion Plant"
        ],
        [
          "pig.gif",
          "Pig"
        ],
        [
          "gold-watering_can.png",
          "Gold Watering Can"
        ],
        [
          "goldingot.png",
          "Goldingot"
        ],
        [
          "tomato_plant.png",
          "Tomato Plant"
        ],
        [
          "sheep.gif",
          "Sheep"
        ],
        [
          "mythril-watering_can.png",
          "Mythril Watering Can"
        ],
        [
          "mythrilingot.png",
          "Mythrilingot"
        ],
        [
          "cucumber_plant.png",
          "Cucumber Plant"
        ],
        [
          "dragon-watering_can.png",
          "Dragon Watering Can"
        ],
        [
          "dragoningot.png",
          "Dragoningot"
        ],
        [
          "marijuana_plant.png",
          "Marijuana Plant"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Farming remains the crop and cooking-material profession. Update the old farm/watering guide with the current energy model: harvesting costs energy, daily recipes/tasks are the preferred active progression route, and Guild Island plots can contribute to energy support.</p><p>Use this section for farm bidding, planting, watering, harvesting, crop growth, and current daily farming recipe expectations. Keep old images as historical references until new UI screenshots are captured.</p><p> <p> Products from farming are used in <a class=\"prof-wiki-link ut-link\">Cooking</a> recipes.<br/> Cooked meals give significant stat and regen bonuses so it might be worthwhile to get your hands dirty and set up a farm. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1. First of all, you will need a farm. To buy one you have to bid on it just like you bid on <a class=\"prof-wiki-link ut-link\">Houses</a>.<br/> You have to enter house bidding menu and then switch to farms. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/farm_bidding.png\"/> </p> <p> 2. You get clay watering can from lvl 275 <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> reward. If you misplaced it, you can always buy another one from the Seed Merchant. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/seed_merchant.png\"/> </p> <p> 3. To get to Seed Merchant you need to talk to Horse. He's located at -1 floor in DP building. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/horse.png\"/> </p> <p> 4. When you have your farm, watering can and seeds ready, you can start your farming frenzy.<br/> To plant seed simply click on fence of your farm and select what you need to plant, or drop a single seed<br/> on empty farm tile to plant it. Before planting you might want to visit <a class=\"prof-wiki-link ut-link\">Daily farming npc</a> . </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/planting.gif\"/> </p> <p> 5. Then you have to water your plants and wait. To water plants you can either use watering can on them, or simply right-click them (with watering can in backpack).<br/> Base growth time is 8 hours. This can be reduced by using Dragon Watering Can and futrther increasing your farming level. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/watering.gif\"/> </p> <p> 6. When the time comes to harvest you will need a scythe (it can be also used directly on plants before they're fully grown to remove them).<br/> Either use scythe on grown plant or simply right-click it while scythe is in your backpack. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/harvesting.gif\"/> </p> <p> 7. Every harvest will cost you 10 energy that can be lowered by certain <a class=\"prof-wiki-link ut-link\">Trinkets</a>, <a class=\"prof-wiki-link ut-link\">Backpacks</a> and <a class=\"prof-wiki-link ut-link\">Companions</a>.<br/> These bonuses are additive and energy reduction items will definitely help you save alot of money. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Daily Task",
          "html": "<p> <p> To progress faster you can do daily tasks. Each day you will be asked to harvest specific plants. They will yield 200% of regular experience. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/daily_farming.png\"/> </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Stat Bonus",
          "html": "<p> <p> When you reach certain tresholds with <b>Farming</b> you will get bonus <strong>Monster Essence</strong> stats. </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Farming<br/>level</th> <th>Bonus</th> </tr> </thead> <tbody> <tr> <td>20</td> <td>+1</td> </tr> <tr> <td>40</td> <td>+2</td> </tr> <tr> <td>60</td> <td>+3</td> </tr> <tr> <td>70</td> <td>+4</td> </tr> <tr> <td>80</td> <td>+5</td> </tr> <tr> <td>90</td> <td>+7</td> </tr> <tr> <td>100</td> <td>+10</td> </tr> <tr> <td>110</td> <td>+15</td> </tr> <tr> <td>120</td> <td>+25</td> </tr> </tbody> </table></div> <p> This bonus isn't additive so on level 120 you will have +25 <strong>Monster Essence</strong>. </p> </p>",
          "tableCount": 1
        },
        {
          "title": "Tools",
          "html": "<p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>farming</th> <th>Ingredients</th> <th>Plants you can water</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clay-watering_can.png\"/> Clay Watering Can </td> <td>0</td> <td> Seed Merchant<br/> 1000 Gold Coins<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> reward (275 lvl) </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/potatoe_plant.png\"/> Potatoes </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-watering_can.png\"/> Iron Watering Can </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>100 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> <p>Blacksmith Skill (10)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/corn_plant.png\"/> Corn </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-watering_can.png\"/> Copper Watering Can </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>100 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> <p>Blacksmith Skill (20)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/carrot_plant.png\"/> Carrot <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/chicken.gif\"/> Chickens </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel-watering_can.png\"/> Steel Watering Can </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>100 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>1 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> <p>Blacksmith Skill (30)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/onion_plant.png\"/> Onion <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/pig.gif\"/> Pig </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-watering_can.png\"/> Gold Watering Can </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> <p>Blacksmith Skill (50)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tomato_plant.png\"/> Tomato <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sheep.gif\"/> Sheep </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-watering_can.png\"/> Mythril Watering Can </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>15 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> <p>Blacksmith Skill (65)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cucumber_plant.png\"/> Cucumber </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-watering_can.png\"/> Dragon Watering Can </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>40 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> <p>Blacksmith Skill (80)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/marijuana_plant.png\"/> Marijuana <br/> Reduces growth time by % <br/> (based on farming level) </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        }
      ],
      "tableCount": 2
    },
    {
      "id": "fishing",
      "group": "gathering",
      "role": "Water gathering",
      "energy": "Uses energy when fishing. Legendary Fish can appear as a rare high-value catch.",
      "value": "Fish, sliced fish, gold, Cooking supply, fishing task progress, Daily recipes, tool upgrades, material sorting",
      "icon": "🐟",
      "name": "Fishing",
      "source": "fishing.html",
      "lead": "Fishing supplies sliced fish, fish fins, Legendary Fish, and cooking progression. Legendary Fish give much more experience and are used for special meals.",
      "media": [
        [
          "fred_the_fisherman.png",
          "Fred The Fisherman"
        ],
        [
          "help_icon.png",
          "Help Icon"
        ],
        [
          "tool_merchant.png",
          "Tool Merchant"
        ],
        [
          "fishing_spots.png",
          "Fishing Spots"
        ],
        [
          "bubbles.gif",
          "Bubbles"
        ],
        [
          "fishing_lure.gif",
          "Fishing Lure"
        ],
        [
          "clay-fishing_rod.png",
          "Clay Fishing Rod"
        ],
        [
          "iron-fishing_rod.png",
          "Iron Fishing Rod"
        ],
        [
          "ironingot.png",
          "Ironingot"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "copper-fishing_rod.png",
          "Copper Fishing Rod"
        ],
        [
          "copperingot.png",
          "Copperingot"
        ],
        [
          "steel-fishing_rod.png",
          "Steel Fishing Rod"
        ],
        [
          "coalingot.png",
          "Coalingot"
        ],
        [
          "gold-fishing_rod.png",
          "Gold Fishing Rod"
        ],
        [
          "goldingot.png",
          "Goldingot"
        ],
        [
          "mythril-fishing_rod.png",
          "Mythril Fishing Rod"
        ],
        [
          "mythrilingot.png",
          "Mythrilingot"
        ],
        [
          "dragon-fishing_rod.png",
          "Dragon Fishing Rod"
        ],
        [
          "dragoningot.png",
          "Dragoningot"
        ],
        [
          "fishing_net.png",
          "Fishing Net"
        ],
        [
          "mythril-leather.png",
          "Mythril Leather"
        ],
        [
          "snapper.png",
          "Snapper"
        ],
        [
          "green_perch.png",
          "Green Perch"
        ],
        [
          "northern_pike.png",
          "Northern Pike"
        ],
        [
          "rainbow_trout.png",
          "Rainbow Trout"
        ],
        [
          "bass.png",
          "Bass"
        ],
        [
          "carp.png",
          "Carp"
        ],
        [
          "squid.png",
          "Squid"
        ],
        [
          "marlin.png",
          "Marlin"
        ],
        [
          "archlight_loot_crate.png",
          "Archlight Loot Crate"
        ],
        [
          "dragon_carp.png",
          "Dragon Carp"
        ],
        [
          "shark.png",
          "Shark"
        ],
        [
          "wild_bass.png",
          "Wild Bass"
        ],
        [
          "wild_carp.png",
          "Wild Carp"
        ],
        [
          "wild_squid.png",
          "Wild Squid"
        ],
        [
          "wild_dragon_carp.png",
          "Wild Dragon Carp"
        ],
        [
          "wild_shark.png",
          "Wild Shark"
        ],
        [
          "ocean_bass.png",
          "Ocean Bass"
        ],
        [
          "ocean_carp.png",
          "Ocean Carp"
        ],
        [
          "ocean_squid.png",
          "Ocean Squid"
        ],
        [
          "ocean_dragon_carp.png",
          "Ocean Dragon Carp"
        ],
        [
          "ocean_shark.png",
          "Ocean Shark"
        ],
        [
          "deepsea_bass.png",
          "Deepsea Bass"
        ],
        [
          "deepsea_carp.png",
          "Deepsea Carp"
        ],
        [
          "deepsea_squid.png",
          "Deepsea Squid"
        ],
        [
          "deepsea_dragon_carp.png",
          "Deepsea Dragon Carp"
        ],
        [
          "deepsea_shark.png",
          "Deepsea Shark"
        ],
        [
          "daily_fishing.png",
          "Daily Fishing"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Fishing should be documented as an active gathering profession with the revamped daily task/recipe flow. The older shard-task language should be replaced with current daily recipes and energy-based progression.</p><p>Add placeholders for the current fishing UI, fishing tool upgrade path, daily recipe NPC, and any Guild Island fishing plot/station screenshots.</p><p> <p> After you catch a fish you can either sell it to Fred The Fisherman to get fishing experience and gold or ask him to slice it.<br/> Sliced Fish can be used in <a class=\"prof-wiki-link ut-link\">Cooking</a> recipes or it can be sold on market for profit. </p> </p> <p> He is located upstairs, he will either slice fish for you or you can sell him fish for experience and gold. <br/> <a class=\"prof-wiki-link ut-link\"><p><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/fred_the_fisherman.png\"/></p></a><br/> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1. You get clay fishing rod from lvl 275 <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> reward. If you misplaced it, you can always buy another one from the Tool Merchant at -1 floor in DP building. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tool_merchant.png\"/> </p> <p> 2. Around the city there are few spots where you can find fishing spots. They are marked as black circles.<br/> Gold circle is where Fred The Fisherman lives along with <a class=\"prof-wiki-link ut-link\">Daily fishing task</a> npc. The best fishing spot remains in <a class=\"prof-wiki-link ut-link\">guildhouse</a>. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/fishing_spots.png\"/> </p> <p> 3. After you found your favourite spot, prepare some <a class=\"prof-wiki-link ut-link\">energy</a> and you can start fishing.<br/> To catch a fish you have to right-click air bubbles that appear on the surface of the water. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/bubbles.gif\"/> </p> <p> 4. Fishing rod can be equipped in ring slot. While equipped it will significantly boost your fishing level<br/> allowing you to catch bigger fishes. To further boost your fishing you can explore <a class=\"prof-wiki-link ut-link\">prisons</a> and try to get Fishing Lure <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/fishing_lure.gif\"/>. <br/> Once used it will permamently boost your fishing level by 30. </p> <p> 5. Every succesfull attempt will cost you 5 energy that can be lowered by certain <a class=\"prof-wiki-link ut-link\">Trinkets</a>, <a class=\"prof-wiki-link ut-link\">Backpacks</a> and <a class=\"prof-wiki-link ut-link\">Companions</a>.<br/> These bonuses are additive and energy reduction items will definitely help you save alot of money. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Tools",
          "html": "<p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>fishing</th> <th>Ingredients</th> <th>Fishing bonus</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clay-fishing_rod.png\"/> Clay Fishing Rod </td> <td>0</td> <td> <p> Tool Merchant<br/> 1000 Gold Coins </p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> reward (275 lvl) </td> <td> 3 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-fishing_rod.png\"/> Iron Fishing Rod </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>100 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> <p>Blacksmith Skill (10)</p> </td> <td> 5 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-fishing_rod.png\"/> Copper Fishing Rod </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>100 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> <p>Blacksmith Skill (20)</p> </td> <td> 7 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel-fishing_rod.png\"/> Steel Fishing Rod </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>100 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Token</span><br/> <p>Blacksmith Skill (30)</p> </td> <td> 10 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-fishing_rod.png\"/> Gold Fishing Rod </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Token</span><br/> <p>Blacksmith Skill (50)</p> </td> <td> 15 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-fishing_rod.png\"/> Mythril Fishing Rod </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>15 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Token</span><br/> <p>Blacksmith Skill (65)</p> </td> <td> 20 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-fishing_rod.png\"/> Dragon Fishing Rod </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>40 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>50 Archlight Token</span><br/> <p>Blacksmith Skill (80)</p> </td> <td> 30 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/fishing_net.png\"/> Fishing Net </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>200 Mythril Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>35 Archlight Token</span><br/> <p>Tanning Skill (85)</p> </td> <td> 20 <br/> Catch 2 fish at once. </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        },
        {
          "title": "Fish",
          "html": "<p> <p> Fish are not exactly bound to fishing rod that you're using. The higher your fishing level is,<br/> the bigger fish you will be able to catch. Bigger fish = more experience if you sell it to Fred, more slices if you slice it. </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th> Fish </th> <th> Possible Weight (in Oz) </th> <th> Required Fishing </th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/snapper.png\"/> Snapper </td> <td> 1 - 4 </td> <td> 0 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/green_perch.png\"/> Green Perch </td> <td> 1.5 - 6 </td> <td> 0 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/northern_pike.png\"/> Northern Pike </td> <td> 2 - 8 </td> <td> 5 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rainbow_trout.png\"/> Rainbow Trout </td> <td> 2.5 - 10 </td> <td> 10 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/bass.png\"/> Bass </td> <td> 3 - 12 </td> <td> 20 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/carp.png\"/> Carp </td> <td> 3.5 - 14 </td> <td> 30 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/squid.png\"/> Squid </td> <td> 4 - 16 </td> <td> 40 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/marlin.png\"/> Marlin </td> <td> 5 - 20 </td> <td> 50 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/archlight_loot_crate.png\"/> <a class=\"prof-wiki-link ut-link\">Archlight Loot Crate</a> </td> <td> 0.08 </td> <td> 55 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon_carp.png\"/> Dragon Carp </td> <td> 6 - 24 </td> <td> 60 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shark.png\"/> Shark </td> <td> 7 - 28 </td> <td> 65 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/wild_bass.png\"/> Wild Bass </td> <td> 8 - 32 </td> <td> 70 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/wild_carp.png\"/> Wild Carp </td> <td> 9 - 36 </td> <td> 75 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/wild_squid.png\"/> Wild Squid </td> <td> 10 - 40 </td> <td> 80 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/wild_dragon_carp.png\"/> Wild Dragon Carp </td> <td> 12 - 48 </td> <td> 85 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/wild_shark.png\"/> Wild Shark </td> <td> 14 - 56 </td> <td> 90 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean_bass.png\"/> Ocean Bass </td> <td> 16 - 64 </td> <td> 95 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean_carp.png\"/> Ocean Carp </td> <td> 18 - 72 </td> <td> 100 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean_squid.png\"/> Ocean Squid </td> <td> 20-80 </td> <td> 105 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean_dragon_carp.png\"/> Ocean Dragon Carp </td> <td> 25 - 100 </td> <td> 110 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean_shark.png\"/> Ocean Shark </td> <td> 30 - 120 </td> <td> 115 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/deepsea_bass.png\"/> Deepsea Bass </td> <td> 40 - 160 </td> <td> 120 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/deepsea_carp.png\"/> Deepsea Carp </td> <td> 50 - 200 </td> <td> 125 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/deepsea_squid.png\"/> Deepsea Squid </td> <td> 60 - 240 </td> <td> 130 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/deepsea_dragon_carp.png\"/> Deepsea Dragon Carp </td> <td> 80 - 320 </td> <td> 135 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/deepsea_shark.png\"/> Deepsea Shark </td> <td> 100 - 500 </td> <td> 140 </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        },
        {
          "title": "Daily Task",
          "html": "<p> <p> To progress faster you can do daily tasks. Each day you will be asked to bring few fishes in exchange for additional fishing experience. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/daily_fishing.png\"/> </p> </p>",
          "tableCount": 0
        }
      ],
      "tableCount": 2
    },
    {
      "id": "mining",
      "group": "gathering",
      "role": "Ore extraction",
      "energy": "Uses energy when mining. Celestial Ore Veins can appear as rare profession nodes.",
      "value": "Ores, ingots, crafting materials, Gold Drop bonus, Daily recipes, tool upgrades, material sorting",
      "icon": "⛏️",
      "name": "Mining",
      "source": "mining.html",
      "lead": "Mining feeds Blacksmithing and other material routes. Clay nodes were removed, tools gather on the first click, and rare Celestial Ore Veins can appear for high-level Dragon Tool users.",
      "media": [
        [
          "help_icon.png",
          "Help Icon"
        ],
        [
          "tool_merchant.png",
          "Tool Merchant"
        ],
        [
          "mining.gif",
          "Mining"
        ],
        [
          "clay-pickaxe.png",
          "Clay Pickaxe"
        ],
        [
          "clay-vein.gif",
          "Clay Vein"
        ],
        [
          "iron-vein.gif",
          "Iron Vein"
        ],
        [
          "clay-ore.gif",
          "Clay Ore"
        ],
        [
          "iron-ore.gif",
          "Iron Ore"
        ],
        [
          "iron-pickaxe.png",
          "Iron Pickaxe"
        ],
        [
          "ironingot.png",
          "Ironingot"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "copper-vein.gif",
          "Copper Vein"
        ],
        [
          "copper-ore.gif",
          "Copper Ore"
        ],
        [
          "copper-pickaxe.png",
          "Copper Pickaxe"
        ],
        [
          "copperingot.png",
          "Copperingot"
        ],
        [
          "coal-vein.gif",
          "Coal Vein"
        ],
        [
          "coal-ore.gif",
          "Coal Ore"
        ],
        [
          "steel-pickaxe.png",
          "Steel Pickaxe"
        ],
        [
          "coalingot.png",
          "Coalingot"
        ],
        [
          "gold-vein.gif",
          "Gold Vein"
        ],
        [
          "gold-ore.gif",
          "Gold Ore"
        ],
        [
          "gold-pickaxe.png",
          "Gold Pickaxe"
        ],
        [
          "goldingot.png",
          "Goldingot"
        ],
        [
          "mythril-vein.gif",
          "Mythril Vein"
        ],
        [
          "mythril-ore.gif",
          "Mythril Ore"
        ],
        [
          "mythril-pickaxe.png",
          "Mythril Pickaxe"
        ],
        [
          "mythrilingot.png",
          "Mythrilingot"
        ],
        [
          "dragon-vein.gif",
          "Dragon Vein"
        ],
        [
          "dragon-ore.gif",
          "Dragon Ore"
        ],
        [
          "dragon-pickaxe.png",
          "Dragon Pickaxe"
        ],
        [
          "dragoningot.png",
          "Dragoningot"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Mining feeds ore and metal progression into blacksmithing and other crafting routes. The old material tables still help, but the section now needs to explain current energy use, tool upgrades, daily mining recipes, and material sorting.</p><p>Add placeholders for the current mining UI, upgraded pickaxe/tool tiers, daily recipe NPC, and Guild Island mining support.</p><p> <p> Ores and ingots are used in many recipes in <a class=\"prof-wiki-link ut-link\">Blacksmithing</a>, <a class=\"prof-wiki-link ut-link\">Alchemy</a>, <a class=\"prof-wiki-link ut-link\">Woodworking</a> and <a class=\"prof-wiki-link ut-link\">Jewelcrafting</a>.<br/> High versatility makes them a high-demand product and mining can be a good source of income. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1. You get clay pickaxe from lvl 275 <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> reward. If you misplaced it, you can always buy another one from the Tool Merchant at -1 floor in DP building. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tool_merchant.png\"/> </p> <p> 2. Check out <a class=\"prof-wiki-link ut-link\">where to find ores</a> and prepare some <a class=\"prof-wiki-link ut-link\">energy</a> for mining. </p> <p> 3. You either need to use a pickaxe on a ore vein or simply right-click it with pickaxe in any of your backpacks. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mining.gif\"/> </p> <p> 4. Every succesfull attempt will cost you 10 energy that can be lowered by certain <a class=\"prof-wiki-link ut-link\">Trinkets</a>, <a class=\"prof-wiki-link ut-link\">Backpacks</a> and <a class=\"prof-wiki-link ut-link\">Companions</a>.<br/> These bonuses are additive and energy reduction items will definitely help you save alot of money. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Daily Task",
          "html": "<p> <p> To progress faster you can do daily tasks. Each day you will be asked to mining specific nodes. They will yield 200% of regular experience. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Stat Bonus",
          "html": "<p> <p> When you reach certain tresholds with <b>Mining</b> you will get bonus <strong>Gold Drop</strong> stats.<br/> </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Mining<br/>level</th> <th>Bonus</th> </tr> </thead> <tbody> <tr> <td>20</td> <td>+1</td> </tr> <tr> <td>40</td> <td>+2</td> </tr> <tr> <td>60</td> <td>+3</td> </tr> <tr> <td>70</td> <td>+4</td> </tr> <tr> <td>80</td> <td>+5</td> </tr> <tr> <td>90</td> <td>+7</td> </tr> <tr> <td>100</td> <td>+10</td> </tr> <tr> <td>110</td> <td>+15</td> </tr> <tr> <td>120</td> <td>+25</td> </tr> </tbody> </table></div> <p> This bonus isn't additive so on level 120 you will have +25 <strong>Gold Drop</strong>. </p> </p>",
          "tableCount": 1
        },
        {
          "title": "Tools",
          "html": "<p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>mining</th> <th>Ingredients</th> <th>Ores you can mine</th> <th>Rewards</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clay-pickaxe.png\"/> Clay Pickaxe </td> <td>0</td> <td> <p> Tool Merchant<br/> 1000 Gold Coins </p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> reward (275 lvl) </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clay-vein.gif\"/> Clay Ore Vein <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-vein.gif\"/> Iron Ore Vein </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clay-ore.gif\"/> Clay Ore <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-ore.gif\"/> Iron Ore </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-pickaxe.png\"/> Iron Pickaxe </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>100 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> <p>Blacksmith Skill (10)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-vein.gif\"/> Copper Ore Vein </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-ore.gif\"/> Copper Ore </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-pickaxe.png\"/> Copper Pickaxe </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>100 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> <p>Blacksmith Skill (20)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coal-vein.gif\"/> Coal Ore Vein </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coal-ore.gif\"/> Coal Ore </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel-pickaxe.png\"/> Steel Pickaxe </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>100 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Token</span><br/> <p>Blacksmith Skill (30)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-vein.gif\"/> Gold Ore Vein </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-ore.gif\"/> Gold Ore </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-pickaxe.png\"/> Gold Pickaxe </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>12 Archlight Token</span><br/> <p>Blacksmith Skill (50)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-vein.gif\"/> Mythril Ore Vein </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-ore.gif\"/> Mythril Ore </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-pickaxe.png\"/> Mythril Pickaxe </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>15 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>25 Archlight Token</span><br/> <p>Blacksmith Skill (65)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-vein.gif\"/> Dragon Ore Vein </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-ore.gif\"/> Dragon Ore </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-pickaxe.png\"/> Dragon Pickaxe </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>40 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>60 Archlight Token</span><br/> <p>Blacksmith Skill (80)</p> </td> <td>All Above</td> <td>Gives a chance to get <p>2x ores on use </p> </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        },
        {
          "title": "Locations",
          "html": "<p> <p> Ores, except copper and clay ore, are best found in <a class=\"prof-wiki-link ut-link\">Guild Halls</a> mines, but there are<br/> spawns like ogres, gnomeviles or <a class=\"prof-wiki-link ut-link\">Otherworld</a> which are abundant in high-tier ores. </p> <p> This isn't a complete list of spawns. </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th> Ore </th> <th> Possible Placement (Values in brackets are the portal levels) </th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clay-ore.gif\"/> Clay Ore </td> <td> Crystal Spider(250), Undead Dragon(250), Guzzlemaws(130),<br/> Hydras(70), Heroes(70), Forest Fury(40) </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-ore.gif\"/> Iron Ore </td> <td> Vexclaw(900), Aggresive Armadile(450), Hellfleshed Demon(450), Crystal Spider(250),<br/> Undead Dragon(250), Guzzlemaws(130), Hydras(70), Heroes(70), Forest Fury(40) </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-ore.gif\"/> Copper Ore </td> <td> Gnomevil(900), Plagued Rats(900), High level iron spawns(250+). </td></tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coal-ore.gif\"/> Coal Ore </td> <td> Ogres(900 Gnomevil(900), Plagued Rats(900), Leviathans(900),<br/> Otherworlds, Forgotten islands </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-ore.gif\"/> Gold Ore </td> <td> Ogres(900 Gnomevil(900), Plagued Rats(900), Leviathans(900),<br/> Otherworlds, Forgotten islands </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-ore.gif\"/> Mythril Ore </td> <td> Ogres(900 Gnomevil(900), Plagued Rats(900), Leviathans(900),<br/> Otherworlds, Forgotten islands </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-ore.gif\"/> Dragon Ore </td> <td> Ogres(900), Gnomevil(900), Plagued Rats(900), Leviathans(900),<br/> Otherworlds, Forgotten islands </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        }
      ],
      "tableCount": 3
    },
    {
      "id": "skinning",
      "group": "gathering",
      "role": "Corpse harvesting",
      "energy": "Uses energy when skinning where applicable. Blood is no longer obtained through Skinning.",
      "value": "Skin scraps, leather materials, blood vials, Loot Rate bonus, Daily recipes, tool upgrades, material sorting",
      "icon": "🔪",
      "name": "Skinning",
      "source": "skinning.html",
      "lead": "Skinning supplies scraps and leather routes. Blood is now handled by crafted Blood Vials used on monster corpses, not by Skinning itself.",
      "media": [
        [
          "help_icon.png",
          "Help Icon"
        ],
        [
          "tool_merchant.png",
          "Tool Merchant"
        ],
        [
          "skinning.gif",
          "Skinning"
        ],
        [
          "clay-knife.png",
          "Clay Knife"
        ],
        [
          "stampor.gif",
          "Stampor"
        ],
        [
          "dragon.gif",
          "Dragon"
        ],
        [
          "minotaur.gif",
          "Minotaur"
        ],
        [
          "kongra.gif",
          "Kongra"
        ],
        [
          "orc_berserker.gif",
          "Orc Berserker"
        ],
        [
          "light-scrap.png",
          "Light Scrap"
        ],
        [
          "5oz.png",
          "5Oz"
        ],
        [
          "iron-knife.png",
          "Iron Knife"
        ],
        [
          "ironingot.png",
          "Ironingot"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "hydra.gif",
          "Hydra"
        ],
        [
          "werewolf.gif",
          "Werewolf"
        ],
        [
          "black_knight.gif",
          "Black Knight"
        ],
        [
          "lizard_priest.gif",
          "Lizard Priest"
        ],
        [
          "crystal_spider.gif",
          "Crystal Spider"
        ],
        [
          "heavy-scrap.png",
          "Heavy Scrap"
        ],
        [
          "10oz.png",
          "10Oz"
        ],
        [
          "copper-knife.png",
          "Copper Knife"
        ],
        [
          "copperingot.png",
          "Copperingot"
        ],
        [
          "behemoth.gif",
          "Behemoth"
        ],
        [
          "dragon_lord.gif",
          "Dragon Lord"
        ],
        [
          "demon.gif",
          "Demon"
        ],
        [
          "retching_horror.gif",
          "Retching Horror"
        ],
        [
          "draken_abomination.gif",
          "Draken Abomination"
        ],
        [
          "gold-scrap.png",
          "Gold Scrap"
        ],
        [
          "15oz.png",
          "15Oz"
        ],
        [
          "steel-knife.png",
          "Steel Knife"
        ],
        [
          "coalingot.png",
          "Coalingot"
        ],
        [
          "serpent_spawn.gif",
          "Serpent Spawn"
        ],
        [
          "yeti.gif",
          "Yeti"
        ],
        [
          "cliff_strider.gif",
          "Cliff Strider"
        ],
        [
          "bog_raider.gif",
          "Bog Raider"
        ],
        [
          "glowing-scrap.png",
          "Glowing Scrap"
        ],
        [
          "20oz.png",
          "20Oz"
        ],
        [
          "gold-knife.png",
          "Gold Knife"
        ],
        [
          "goldingot.png",
          "Goldingot"
        ],
        [
          "ogre.gif",
          "Ogre"
        ],
        [
          "plagued_rat.gif",
          "Plagued Rat"
        ],
        [
          "nomad.gif",
          "Nomad"
        ],
        [
          "hellhound.gif",
          "Hellhound"
        ],
        [
          "aged-scrap.png",
          "Aged Scrap"
        ],
        [
          "25oz.png",
          "25Oz"
        ],
        [
          "mythril-knife.png",
          "Mythril Knife"
        ],
        [
          "mythrilingot.png",
          "Mythrilingot"
        ],
        [
          "draptor.gif",
          "Draptor"
        ],
        [
          "dragonling.gif",
          "Dragonling"
        ],
        [
          "werebear.gif",
          "Werebear"
        ],
        [
          "thornback_tortoise.gif",
          "Thornback Tortoise"
        ],
        [
          "mythril-scrap.png",
          "Mythril Scrap"
        ],
        [
          "30oz.png",
          "30Oz"
        ],
        [
          "dragon-knife.png",
          "Dragon Knife"
        ],
        [
          "dragoningot.png",
          "Dragoningot"
        ],
        [
          "sand_dusk_scarab.gif",
          "Sand Dusk Scarab"
        ],
        [
          "panther.gif",
          "Panther"
        ],
        [
          "rhutum.gif",
          "Rhutum"
        ],
        [
          "forsaken_dragon.gif",
          "Forsaken Dragon"
        ],
        [
          "inferno-scrap.png",
          "Inferno Scrap"
        ],
        [
          "35oz.png",
          "35Oz"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Skinning remains a gathering support profession for leather and creature materials. The current text should focus on energy cost, daily recipe/task progress, and how materials feed Tanning or other crafting routes.</p><p>Add placeholders for current skinning UI, tool progression, and daily task screenshots.</p><p> <p> Skin scraps and blood that you get from monsters is used in <a class=\"prof-wiki-link ut-link\">Tanning</a> and <a class=\"prof-wiki-link ut-link\">Alchemy</a>.<br/> There is very high demand for high-tier blood vials that are used for polishing and shining oils in <a class=\"prof-wiki-link ut-link\">Alchemy</a>.<br/> This means skinning can become a profitable hobby for someone with no social life </p> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1. You get clay skinning knife from lvl 275 <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> reward. If you misplaced it, you can always buy another one from the Tool Merchant at -1 floor in DP building. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tool_merchant.png\"/> </p> <p> 2. Prepare some <a class=\"prof-wiki-link ut-link\">energy</a> for skinning. You either need to use a skinning knife on a fresh corpse<br/> or simply right-click (open) their corpse with skinning knife in any of your backpacks. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/skinning.gif\"/> </p> <p> 3. Every succesfull attempt will cost you 5 energy that can be lowered by certain <a class=\"prof-wiki-link ut-link\">Trinkets</a>, <a class=\"prof-wiki-link ut-link\">Backpacks</a> and <a class=\"prof-wiki-link ut-link\">Companions</a>.<br/> These bonuses are additive and energy reduction items will definitely help you save alot of money. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Daily Task",
          "html": "<p> <p> To progress faster you can do daily tasks. Each day you will be asked to mining specific nodes. They will yield 200% of regular experience. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Stat Bonus",
          "html": "<p> <p> When you reach certain tresholds with <b>Skinning</b> you will get bonus <strong>Loot Rate</strong> stats.<br/> </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Skinning<br/>level</th> <th>Bonus</th> </tr> </thead> <tbody> <tr> <td>20</td> <td>+1</td> </tr> <tr> <td>40</td> <td>+2</td> </tr> <tr> <td>60</td> <td>+3</td> </tr> <tr> <td>70</td> <td>+4</td> </tr> <tr> <td>80</td> <td>+5</td> </tr> <tr> <td>90</td> <td>+7</td> </tr> <tr> <td>100</td> <td>+10</td> </tr> <tr> <td>110</td> <td>+15</td> </tr> <tr> <td>120</td> <td>+25</td> </tr> </tbody> </table></div> <p> This bonus isn't additive so on level 120 you will have +25 <strong>Loot Rate</strong>. </p> </p>",
          "tableCount": 1
        },
        {
          "title": "Tools and spawns",
          "html": "<p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>skinning</th> <th>Ingredients</th> <th>Monsters to skin</th> <th>Rewards</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clay-knife.png\"/> Clay Skinning Knife </td> <td>0</td> <td> Tool Merchant<br/> 1000 Gold Coins<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> reward (275 lvl) </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/stampor.gif\"/> Stampors <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon.gif\"/> Dragons <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/minotaur.gif\"/> Minotaurs <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/kongra.gif\"/> Apes <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/orc_berserker.gif\"/> Orcs <p>Also: Larvaes, Forest Furys, Trolls...</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/light-scrap.png\"/> Light Skin Scrap <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/5oz.png\"/> 5oz vial of blood </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-knife.png\"/> Iron Skinning Knife </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>100 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> <p>Blacksmith Skill (10)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/hydra.gif\"/> Hydras <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/werewolf.gif\"/> Werewolves <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/black_knight.gif\"/> Black Knights <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/lizard_priest.gif\"/> Lizards <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/crystal_spider.gif\"/> Crystal Spiders <p>Also: Dark Torturers, Heroes, Corrupted Hydras...</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/heavy-scrap.png\"/> Heavy Skin Scrap <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/10oz.png\"/> 10oz vial of blood </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-knife.png\"/> Copper Skinning Knife </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>100 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> <p>Blacksmith Skill (20)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/behemoth.gif\"/> Behemoths <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon_lord.gif\"/> Dragon Lords <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/demon.gif\"/> Demons <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/retching_horror.gif\"/> Retching Horrors <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/draken_abomination.gif\"/> Drakens <p>Also: Hellspawns, Lost Berserkers, Enslaved Dwarves...</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-scrap.png\"/> Gold Skin Scrap <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/15oz.png\"/> 15oz vial of blood </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel-knife.png\"/> Steel Skinning Knife </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>100 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Token</span><br/> <p>Blacksmith Skill (30)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/serpent_spawn.gif\"/> Aged Serpent Spawns <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/yeti.gif\"/> Yetis <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cliff_strider.gif\"/> Cliff Striders <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/bog_raider.gif\"/> Bog Raiders <p>Also: Deepseas, Aquatics, Gnomeviles...</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-scrap.png\"/> Glowing Skin Scrap <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/> 20oz vial of blood </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-knife.png\"/> Gold Skinning Knife </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Token</span><br/> <p>Blacksmith Skill (50)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ogre.gif\"/> Ogres <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/plagued_rat.gif\"/> Plagued Rats <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/nomad.gif\"/> Nomads <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/hellhound.gif\"/> Hellhounds <p>Also: Helms, Plagued Mammals, Experiment Fours...</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-scrap.png\"/> Aged Skin Scrap <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/25oz.png\"/> 25oz vial of blood </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-knife.png\"/> Mythril Skinning Knife </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>15 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Token</span><br/> <p>Blacksmith Skill (65)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/draptor.gif\"/> Draptors <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragonling.gif\"/> Dragonlings <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/werebear.gif\"/> Werecreatures <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/thornback_tortoise.gif\"/> Gold Cove Tortoises <p>Also: Hideouts, Spidris Elites, Exileds...</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-scrap.png\"/> Mythril Skin Scrap <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/30oz.png\"/> 30oz vial of blood </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-knife.png\"/> Dragon Skinning Knife </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>40 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>50 Archlight Token</span><br/> <p>Blacksmith Skill (80)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sand_dusk_scarab.gif\"/> Dusk Scarabs <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/panther.gif\"/> Panthers <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rhutum.gif\"/> Rhutums <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forsaken_dragon.gif\"/> Forsaken Dragons <p>Also: Gargantoises, Experiment Sevens, Dire Wolves (Blackridge), <br/>Island Tiger (Rumrunner Bay), Rock Wyverns (Blackridge)...</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-scrap.png\"/> Inferno Skin Scrap <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/35oz.png\"/> 35oz vial of blood <br/> <br/> Gives a chance to get <p>2x scraps and bloods on use </p> </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        }
      ],
      "tableCount": 2
    },
    {
      "id": "woodcutting",
      "group": "gathering",
      "role": "Timber harvesting",
      "energy": "Uses energy when chopping trees. Profession nodes no longer disappear over time, a new one spawns only after harvest.",
      "value": "Logs, planks, furniture support, Woodworking materials, Daily recipes, tool upgrades, material sorting",
      "icon": "🪓",
      "name": "Woodcutting",
      "source": "woodcutting.html",
      "lead": "Woodcutting supplies logs and planks for Woodworking, stations, furniture, traps, walls, and Guild Island construction.",
      "media": [
        [
          "tool_merchant.png",
          "Tool Merchant"
        ],
        [
          "cutting_wood.gif",
          "Cutting Wood"
        ],
        [
          "clayhatchet.png",
          "Clayhatchet"
        ],
        [
          "eldertree.png",
          "Eldertree"
        ],
        [
          "venomtree.png",
          "Venomtree"
        ],
        [
          "elderlog.png",
          "Elderlog"
        ],
        [
          "venomlog.png",
          "Venomlog"
        ],
        [
          "ironhatchet.png",
          "Ironhatchet"
        ],
        [
          "ironingot.png",
          "Ironingot"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "shadowtree.png",
          "Shadowtree"
        ],
        [
          "shadowlog.png",
          "Shadowlog"
        ],
        [
          "copperhatchet.png",
          "Copperhatchet"
        ],
        [
          "copperingot.png",
          "Copperingot"
        ],
        [
          "glowingtree.png",
          "Glowingtree"
        ],
        [
          "glowinlog.png",
          "Glowinlog"
        ],
        [
          "steelhatchet.png",
          "Steelhatchet"
        ],
        [
          "coalingot.png",
          "Coalingot"
        ],
        [
          "blood-soakedtree.png",
          "Blood Soakedtree"
        ],
        [
          "blood-soakedlog.png",
          "Blood Soakedlog"
        ],
        [
          "goldhatchet.png",
          "Goldhatchet"
        ],
        [
          "goldingot.png",
          "Goldingot"
        ],
        [
          "spirittree.png",
          "Spirittree"
        ],
        [
          "spiritlog.png",
          "Spiritlog"
        ],
        [
          "mythrilhatchet.png",
          "Mythrilhatchet"
        ],
        [
          "mythrilingot.png",
          "Mythrilingot"
        ],
        [
          "soultree.png",
          "Soultree"
        ],
        [
          "soullog.png",
          "Soullog"
        ],
        [
          "dragonhatchet.png",
          "Dragonhatchet"
        ],
        [
          "dragoningot.png",
          "Dragoningot"
        ],
        [
          "giant_spider.gif",
          "Giant Spider"
        ],
        [
          "bog_raider.gif",
          "Bog Raider"
        ],
        [
          "werewolf.gif",
          "Werewolf"
        ],
        [
          "nomad.gif",
          "Nomad"
        ],
        [
          "draptor.gif",
          "Draptor"
        ],
        [
          "wailing_widow.gif",
          "Wailing Widow"
        ],
        [
          "gargantoise.gif",
          "Gargantoise"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Woodcutting feeds planks and woodworking. The current section should explain energy, tool upgrades, daily recipe flow, rare materials, and Guild Island station support.</p><p>Add placeholders for the current woodcutting UI, axe/tool upgrade path, and station screenshots.</p><p> <p> Woodcutting is required in order to create new furniture and siege weapons via <a class=\"prof-wiki-link ut-link\">Woodworking</a>. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1.Buy a clay hatchet from the Tool Merchant at -1 floor in DP building. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tool_merchant.png\"/> </p> <p> 2. Check out <a class=\"prof-wiki-link ut-link\">where to find trees</a> and prepare some <a class=\"prof-wiki-link ut-link\">energy</a> for logging!<br/> To cut trees you either need to use a hatchet on the tree or simply right-click it with hatchet in any of your backpacks. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cutting_wood.gif\"/> </p> <p> 3. Every succesfull attempt will cost you 10 energy that can be lowered by certain <a class=\"prof-wiki-link ut-link\">Trinkets</a>, <a class=\"prof-wiki-link ut-link\">Backpacks</a> and <a class=\"prof-wiki-link ut-link\">Companions</a>.<br/> These bonuses are additive and energy reduction items will definitely help you save alot of money. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Tools",
          "html": "<p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>woodcutting</th> <th>Ingredients</th> <th>Trees you can cut</th> <th>Rewards</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clayhatchet.png\"/> Clay Hatchet </td> <td>0</td> <td>Tool Merchant<br/>1 000 Gold Coins</td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/eldertree.png\"/> <p>Elder Tree</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/venomtree.png\"/> Venom Tree </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/elderlog.png\"/> <p>Elder Log</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/venomlog.png\"/> Venom Log </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironhatchet.png\"/> Iron Hatchet </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>100 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> <p>Blacksmith Skill (10)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shadowtree.png\"/> Shadow Tree </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shadowlog.png\"/> Shadow Log </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperhatchet.png\"/> Copper Hatchet </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>100 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> <p>Blacksmith Skill (20)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowingtree.png\"/> Glowing Tree </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowinlog.png\"/> Glowing Log </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steelhatchet.png\"/> Steel Hatchet </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>100 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Token</span><br/> <p>Blacksmith Skill (30)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood-soakedtree.png\"/> Blood-soaked Tree </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood-soakedlog.png\"/> Blood-soaked Log </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldhatchet.png\"/> Gold Hatchet </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Token</span><br/> <p>Blacksmith Skill (50)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirittree.png\"/> Spirit Tree </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spiritlog.png\"/> Spirit Log </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilhatchet.png\"/> Mythril Hatchet </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>15 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Token</span><br/> <p>Blacksmith Skill (65)</p> </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soultree.png\"/> Soul Tree </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soullog.png\"/> Soul Log </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragonhatchet.png\"/> Dragon Hatchet </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>40 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>50 Archlight Token</span><br/> <p>Blacksmith Skill (80)</p> </td> <td>All Above</td> <td>Gives a chance to cut <p>2x logs on use </p> </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        },
        {
          "title": "Locations",
          "html": "<p> <p> Higher tiers of trees can be found in higher tier spawns. High level spawns do not have low-level trees (Elder/Venom). </p> <p> 1. Elder and Venom trees are common in low level areas like: </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/giant_spider.gif\"/> Giant Spiders, <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/bog_raider.gif\"/> Bog Raiders, <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/werewolf.gif\"/> Werewolves </p> <p> 2. Shadow, Glowing, Blood-soaked and Spirit trees are common at high level spawns like: </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/nomad.gif\"/> Nomads, <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/draptor.gif\"/> Draptors, <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/wailing_widow.gif\"/> Venomous Widow or <img alt=\"This is a gargantoise, please do not argue\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gargantoise.gif\" title=\"This is a gargantoise, please do not argue\"/> Gargantoises. </p> <p> 3. Soul Trees are only found on <a class=\"prof-wiki-link ut-link\">Forgotten Islands</a> and in <a class=\"prof-wiki-link ut-link\">guildhouse</a> woodcutting areas </p> </p>",
          "tableCount": 0
        }
      ],
      "tableCount": 1
    },
    {
      "id": "alchemy",
      "group": "crafting",
      "role": "Elixirs, oils, enchantment work",
      "energy": "Complex crafts can consume energy and crafting time.",
      "value": "Elixirs, oils, infusions, enchantment support, Healing and Mana bonuses, Daily recipes, tool upgrades, material sorting",
      "icon": "⚗️",
      "name": "Alchemy",
      "source": "alchemy.html",
      "lead": "Alchemy focuses potions, elixirs, Blood Vials, and profession support items. Small/strong/great elixirs were consolidated, with Ultimate Health and Ultimate Mana Elixirs as the key craftable elixirs.",
      "media": [
        [
          "alchemy_npc.png",
          "Alchemy Npc"
        ],
        [
          "exclamation_mark.png",
          "Exclamation Mark"
        ],
        [
          "help_icon.png",
          "Help Icon"
        ],
        [
          "enhancement_crafting_option.png",
          "Enhancement Crafting Option"
        ],
        [
          "enhancement_crafting_window.png",
          "Enhancement Crafting Window"
        ],
        [
          "enhancement_buying_window.png",
          "Enhancement Buying Window"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "small_vial.png",
          "Small Vial"
        ],
        [
          "ironingot.png",
          "Ironingot"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "medium_vial.png",
          "Medium Vial"
        ],
        [
          "large_vial.png",
          "Large Vial"
        ],
        [
          "coalingot.png",
          "Coalingot"
        ],
        [
          "extra_large_vial.png",
          "Extra Large Vial"
        ],
        [
          "mythrilingot.png",
          "Mythrilingot"
        ],
        [
          "health_elixir.png",
          "Health Elixir"
        ],
        [
          "5oz.png",
          "5Oz"
        ],
        [
          "mana_elixir.png",
          "Mana Elixir"
        ],
        [
          "strong_skill_boost_potion.png",
          "Strong Skill Boost Potion"
        ],
        [
          "skill_boost_potion.png",
          "Skill Boost Potion"
        ],
        [
          "agility_elixir.png",
          "Agility Elixir"
        ],
        [
          "forest-gem.gif",
          "Forest Gem"
        ],
        [
          "strenght_elixir.png",
          "Strenght Elixir"
        ],
        [
          "inferno-gem.gif",
          "Inferno Gem"
        ],
        [
          "arcane_elixir.png",
          "Arcane Elixir"
        ],
        [
          "ocean-gem.gif",
          "Ocean Gem"
        ],
        [
          "swiftness_elixir.png",
          "Swiftness Elixir"
        ],
        [
          "cloud-gem.gif",
          "Cloud Gem"
        ],
        [
          "resistance_elixir.png",
          "Resistance Elixir"
        ],
        [
          "order-gem.gif",
          "Order Gem"
        ],
        [
          "strong_health_elixir.png",
          "Strong Health Elixir"
        ],
        [
          "strong_mana_elixir.png",
          "Strong Mana Elixir"
        ],
        [
          "strong_agility_elixir.png",
          "Strong Agility Elixir"
        ],
        [
          "10oz.png",
          "10Oz"
        ],
        [
          "strong_strenght_elixir.png",
          "Strong Strenght Elixir"
        ],
        [
          "strong_arcane_elixir.png",
          "Strong Arcane Elixir"
        ],
        [
          "strong_swiftness_elixir.png",
          "Strong Swiftness Elixir"
        ],
        [
          "strong_resistance_elixir.png",
          "Strong Resistance Elixir"
        ],
        [
          "great_health_elixir.png",
          "Great Health Elixir"
        ],
        [
          "20oz.png",
          "20Oz"
        ],
        [
          "great_mana_elixir.png",
          "Great Mana Elixir"
        ],
        [
          "great_spirit_elixir.png",
          "Great Spirit Elixir"
        ],
        [
          "great_agility_elixir.png",
          "Great Agility Elixir"
        ],
        [
          "great_strenght_elixir.png",
          "Great Strenght Elixir"
        ],
        [
          "great_arcane_elixir.png",
          "Great Arcane Elixir"
        ],
        [
          "great_swiftness_elixir.png",
          "Great Swiftness Elixir"
        ],
        [
          "great_resistance_elixir.png",
          "Great Resistance Elixir"
        ],
        [
          "ultimate_health_elixir.gif",
          "Ultimate Health Elixir"
        ],
        [
          "30oz.png",
          "30Oz"
        ],
        [
          "ultimate_mana_elixir.gif",
          "Ultimate Mana Elixir"
        ],
        [
          "ultimate_spirit_elixir.gif",
          "Ultimate Spirit Elixir"
        ],
        [
          "ultimate_agility_elixir.png",
          "Ultimate Agility Elixir"
        ],
        [
          "ultimate_strenght_elixir.png",
          "Ultimate Strenght Elixir"
        ],
        [
          "ultimate_arcane_elixir.png",
          "Ultimate Arcane Elixir"
        ],
        [
          "ultimate_swiftness_elixir.png",
          "Ultimate Swiftness Elixir"
        ],
        [
          "ultimate_resistance_elixir.png",
          "Ultimate Resistance Elixir"
        ],
        [
          "supreme_skill_elixir.png",
          "Supreme Skill Elixir"
        ],
        [
          "supreme_vial_of_blood.png",
          "Supreme Vial Of Blood"
        ],
        [
          "charged-inferno-gem.gif",
          "Charged Inferno Gem"
        ],
        [
          "mythril-leather.png",
          "Mythril Leather"
        ],
        [
          "supreme_stat_elixir.png",
          "Supreme Stat Elixir"
        ],
        [
          "charged-ocean-gem.gif",
          "Charged Ocean Gem"
        ],
        [
          "supreme_monster_essence_elixir.png",
          "Supreme Monster Essence Elixir"
        ],
        [
          "charged-forest-gem.gif",
          "Charged Forest Gem"
        ],
        [
          "spirit_plank.png",
          "Spirit Plank"
        ],
        [
          "supreme_experience_elixir.png",
          "Supreme Experience Elixir"
        ],
        [
          "charged-cloud-gem.gif",
          "Charged Cloud Gem"
        ],
        [
          "rots.png",
          "Rots"
        ],
        [
          "15oz.png",
          "15Oz"
        ],
        [
          "25oz.png",
          "25Oz"
        ],
        [
          "extra_large_health_infusion.gif",
          "Extra Large Health Infusion"
        ],
        [
          "35oz.png",
          "35Oz"
        ],
        [
          "empowered_ricochet_enchantment.png",
          "Empowered Ricochet Enchantment"
        ],
        [
          "ricochet_enchantment.png",
          "Ricochet Enchantment"
        ],
        [
          "empowered_clear_state_enchantment.png",
          "Empowered Clear State Enchantment"
        ],
        [
          "clear_state_enchantment.png",
          "Clear State Enchantment"
        ],
        [
          "empowered_enraging_enchantment.png",
          "Empowered Enraging Enchantment"
        ],
        [
          "enraging_enchantment.png",
          "Enraging Enchantment"
        ],
        [
          "empowered_enflaming_enchantment.png",
          "Empowered Enflaming Enchantment"
        ],
        [
          "enflaming_enchantment.png",
          "Enflaming Enchantment"
        ],
        [
          "empowered_grasping_enchantment.png",
          "Empowered Grasping Enchantment"
        ],
        [
          "grasping_enchantment.png",
          "Grasping Enchantment"
        ],
        [
          "empowered_hemorage_enchantment.png",
          "Empowered Hemorage Enchantment"
        ],
        [
          "hemorage_enchantment.png",
          "Hemorage Enchantment"
        ],
        [
          "empowered_life_bloom_enchantment.png",
          "Empowered Life Bloom Enchantment"
        ],
        [
          "life_bloom_enchantment.png",
          "Life Bloom Enchantment"
        ],
        [
          "empowered_life_leech_enchantment.png",
          "Empowered Life Leech Enchantment"
        ],
        [
          "life_leech_enchantment.png",
          "Life Leech Enchantment"
        ],
        [
          "awakened_ricochet_enchantment.png",
          "Awakened Ricochet Enchantment"
        ],
        [
          "awakened_clear_state_enchantment.png",
          "Awakened Clear State Enchantment"
        ],
        [
          "awakened_enraging_enchantment.png",
          "Awakened Enraging Enchantment"
        ],
        [
          "awakened_enflaming_enchantment.png",
          "Awakened Enflaming Enchantment"
        ],
        [
          "awakened_grasping_enchantment.png",
          "Awakened Grasping Enchantment"
        ],
        [
          "awakened_hemorage_enchantment.png",
          "Awakened Hemorage Enchantment"
        ],
        [
          "awakened_life_bloom_enchantment.png",
          "Awakened Life Bloom Enchantment"
        ],
        [
          "awakened_life_leech_enchantment.png",
          "Awakened Life Leech Enchantment"
        ],
        [
          "repolishing_oil.png",
          "Repolishing Oil"
        ],
        [
          "shining_oil.png",
          "Shining Oil"
        ],
        [
          "large_stat_stone.gif",
          "Large Stat Stone"
        ],
        [
          "stat_stone.gif",
          "Stat Stone"
        ],
        [
          "ancient_stat_stone.png",
          "Ancient Stat Stone"
        ],
        [
          "rune_exchange_token.png",
          "Rune Exchange Token"
        ],
        [
          "tier_4_healing_emblem_token.png",
          "Tier 4 Healing Emblem Token"
        ],
        [
          "forgotten_fighter_emblem.png",
          "Forgotten Fighter Emblem"
        ],
        [
          "forgotten_mage_emblem.png",
          "Forgotten Mage Emblem"
        ],
        [
          "forgotten_specialist_emblem.png",
          "Forgotten Specialist Emblem"
        ],
        [
          "seven_trials_rune_token.png",
          "Seven Trials Rune Token"
        ],
        [
          "adorned_fighter_emblem.png",
          "Adorned Fighter Emblem"
        ],
        [
          "adorned_mage_emblem.png",
          "Adorned Mage Emblem"
        ],
        [
          "adorned_specialist_emblem.png",
          "Adorned Specialist Emblem"
        ],
        [
          "gold_emblem_token.png",
          "Gold Emblem Token"
        ],
        [
          "gold_fighter_emblem.png",
          "Gold Fighter Emblem"
        ],
        [
          "gold_mage_emblem.png",
          "Gold Mage Emblem"
        ],
        [
          "gold_specialist_emblem.png",
          "Gold Specialist Emblem"
        ],
        [
          "tier_2_soul_rune_token.png",
          "Tier 2 Soul Rune Token"
        ],
        [
          "t2_archer_soul_rune.png",
          "T2 Archer Soul Rune"
        ],
        [
          "t2_bard_soul_rune.png",
          "T2 Bard Soul Rune"
        ],
        [
          "t2_berserker_soul_rune.png",
          "T2 Berserker Soul Rune"
        ],
        [
          "t2_corsair_soul_rune.png",
          "T2 Corsair Soul Rune"
        ],
        [
          "t2_druid_soul_rune.png",
          "T2 Druid Soul Rune"
        ],
        [
          "t2_gunslinger_soul_rune.png",
          "T2 Gunslinger Soul Rune"
        ],
        [
          "t2_monk_soul_rune.png",
          "T2 Monk Soul Rune"
        ],
        [
          "t2_necromancer_soul_rune.png",
          "T2 Necromancer Soul Rune"
        ],
        [
          "t2_rogue_soul_rune.png",
          "T2 Rogue Soul Rune"
        ],
        [
          "t2_sorcerer_soul_rune.png",
          "T2 Sorcerer Soul Rune"
        ],
        [
          "t2_tamer_soul_rune.png",
          "T2 Tamer Soul Rune"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Alchemy should focus on potion/consumable crafting under the new profession flow: energy cost based on recipe complexity, daily recipes, station support, and material sorting.</p><p>Add placeholders for current alchemy station UI and example daily recipe.</p><p> <p> Alchemy is used to craft various elixirs and oils with bloods that you accumulated from <a class=\"prof-wiki-link ut-link\">Skinning</a>. Powerful elixirs are not the only reward from this craft, highly skilled alchemists will wield the power of combining <a class=\"prof-wiki-link ut-link\">Enchantments</a> into their <strong>Empowered</strong> and <strong>Awakened</strong> forms. <br/><br/> Each crafting profession of archlight will <a class=\"prof-wiki-link ut-link\">Enhance</a> your character in a certain way when you reach higher level. Additionaly to Enhancement, you will get <a class=\"prof-wiki-link ut-link\">Stat Bonus</a> that will significantly boost your stats once maxed. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1. When you get your first bloods from <a class=\"prof-wiki-link ut-link\">Skinning</a> (and few ores from <a class=\"prof-wiki-link ut-link\">Mining</a> for vials) you should head to -1 floor in DP building, to <strong>Daily Alchemy</strong> npc. To begin crafting, simply right-click the <strong>bellow</strong> and select the item you need. Remember to ask the npc about the <a class=\"prof-wiki-link ut-link\">daily task</a>, as it will significantly boost your progress. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/alchemy_npc.png\"/> </p> <p> 2. When you craft an item for the first time it's marked with exclamation mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/exclamation_mark.png\"/> next to it's name and it will yield 400% experience. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Daily task",
          "html": "<p> <p> Once a day you can visit <strong>Daily Alchemy</strong> npc and ask him for a task. He will ask you to craft something for him, and depending on your level it might be anything from small elixirs to powerful elixir infusions. Every item that is currently needed for your daily task will be marked with question mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> next to it's name. You will keep this item and additionally you will get <strong>200%</strong> experience for that craft. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Enhancements",
          "html": "<p> <p> Enhancement for <strong>Alchemy</strong> is increasing your <strong>Healing</strong>. Once you reach certain thresholds new crafting option called <strong>Enhancements</strong> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_option.png\"/>will appear available. Only then you will be able to pay and obtain your precious title. This bonus is not additive, on 95 level of alchemy you will have +25% increased Healing. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_window.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_buying_window.png\"/> </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Title<br/>Level</th> <th>Apprentice<br/>60</th> <th>Skilled<br/>70</th> <th>Expert<br/>80</th> <th>Artisan<br/>90</th> <th>Masterclass<br/>95</th> </tr> </thead> <tbody> <tr> <td>Healing<br/>buff</td> <td>5%</td> <td>10%</td> <td>15%</td> <td>20%</td> <td>25%</td> </tr> <tr> <td>Cost</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>300 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        },
        {
          "title": "Stat Bonus",
          "html": "<p> <p> When you reach certain tresholds with alchemy you will get bonus <strong>Mana</strong> stats.<br/> Unlike Enhancements, bonuses are applied automatically once you reach required level. (Bonus levels from cosmetics count towards these bonuses) </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Alchemy<br/>level</th> <th>Bonus</th> </tr> </thead> <tbody> <tr> <td>20</td> <td>+1</td> </tr> <tr> <td>40</td> <td>+2</td> </tr> <tr> <td>60</td> <td>+3</td> </tr> <tr> <td>70</td> <td>+4</td> </tr> <tr> <td>80</td> <td>+5</td> </tr> <tr> <td>90</td> <td>+7</td> </tr> <tr> <td>100</td> <td>+10</td> </tr> <tr> <td>110</td> <td>+15</td> </tr> <tr> <td>120</td> <td>+25</td> </tr> </tbody> </table></div> <p> This bonus isn't additive so on level 120 you will have +25 <strong>Mana</strong>. </p> </p>",
          "tableCount": 1
        },
        {
          "title": "Crafting Recipes",
          "html": "<h3 class=\"sectionedit7\">Vials</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/small_vial.png\"/> 1 Small Vial </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>5 Iron Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/medium_vial.png\"/> 1 Medium Vial </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>15 Iron Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/> 1 Large Vial </td> <td>35</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>30 Coal Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_vial.png\"/> 1 Extra Large Vial </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>20 Mythril Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit8\">Elixirs</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td colspan=\"4\"><strong>Regular Elixirs</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/health_elixir.png\"/> 100 Health Elixirs </td> <td>5</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/small_vial.png\"/>1 Small Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/5oz.png\"/>10 5oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> Regenerates small amount of health. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mana_elixir.png\"/> 100 Mana Elixirs </td> <td>5</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/small_vial.png\"/>1 Small Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/5oz.png\"/>10 5oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> Regenerates small amount of mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strong_skill_boost_potion.png\"/> 1 Strong Skill Boost Potion </td> <td>5</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/skill_boost_potion.png\"/>25 Skill Boost Potions</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> Significantly increases selected skill. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/agility_elixir.png\"/> 1 Dexterity Elixir </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/small_vial.png\"/>1 Small Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forest-gem.gif\"/>1 Forest Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/5oz.png\"/>10 5oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 Dexterity for 15 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strenght_elixir.png\"/> 1 Strength Elixir </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/small_vial.png\"/>1 Small Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-gem.gif\"/>1 Inferno Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/5oz.png\"/>10 5oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 Strength for 15 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/arcane_elixir.png\"/> 1 Intelligence Elixir </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/small_vial.png\"/>1 Small Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean-gem.gif\"/>1 Ocean Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/5oz.png\"/>10 5oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 Intelligence for 15 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/swiftness_elixir.png\"/> 1 Swiftness Elixir </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/small_vial.png\"/>1 Small Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cloud-gem.gif\"/>1 Cloud Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/5oz.png\"/>10 5oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +2% Movement Speed For 5 Minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/resistance_elixir.png\"/> 1 Resistance Elixir </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/small_vial.png\"/>1 Small Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/order-gem.gif\"/>1 Order Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/5oz.png\"/>10 5oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +2% Resistance For 15 Minutes. </td> </tr> <tr> <td colspan=\"4\"><strong>Strong Elixirs</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strong_health_elixir.png\"/> 100 Strong Health Elixirs </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/small_vial.png\"/>1 Small Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/5oz.png\"/>10 5oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> Regenerates moderate amount of health. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strong_mana_elixir.png\"/> 100 Strong Mana Elixirs </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/small_vial.png\"/>1 Small Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/5oz.png\"/>10 5oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> Regenerates moderate amount of mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strong_agility_elixir.png\"/> 1 Strong Dexterity Elixir </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/medium_vial.png\"/>1 Medium Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forest-gem.gif\"/>2 Forest Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/10oz.png\"/>10 10oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> +10 Dexterity for 30 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strong_strenght_elixir.png\"/> 1 Strong Strength Elixir </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/medium_vial.png\"/>1 Medium Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-gem.gif\"/>2 Inferno Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/10oz.png\"/>10 10oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> +10 Strength for 30 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strong_arcane_elixir.png\"/> 1 Strong Intelligence Elixir </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/medium_vial.png\"/>1 Medium Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean-gem.gif\"/>2 Ocean Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/10oz.png\"/>10 10oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> +10 Intelligence for 30 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strong_swiftness_elixir.png\"/> 1 Strong Swiftness Elixir </td> <td>45</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/medium_vial.png\"/>1 Medium Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cloud-gem.gif\"/>2 Cloud Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/10oz.png\"/>10 10oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> +3% Movement Speed For 30 Minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strong_resistance_elixir.png\"/> 1 Strong Resistance Elixir </td> <td>45</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/medium_vial.png\"/>1 Medium Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/order-gem.gif\"/>2 Order Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/10oz.png\"/>10 10oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> +3% Resistance for 30 Minutes. </td> </tr> <tr> <td colspan=\"4\"><strong>Great Elixirs</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_health_elixir.png\"/> 100 Great Health Elixirs </td> <td>35</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 20oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> Regenerates substantial amount of health. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_mana_elixir.png\"/> 100 Great Mana Elixirs </td> <td>35</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 20oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> Regenerates substantial amount of mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_spirit_elixir.png\"/> 100 Great Spirit Elixirs </td> <td>35</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 20oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> Regenerates substantial amount of health and mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_agility_elixir.png\"/> 1 Great Dexterity Elixir </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forest-gem.gif\"/>3 Forest Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 20oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +15 Dexterity for 45 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_strenght_elixir.png\"/> 1 Great Strength Elixir </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-gem.gif\"/>3 Inferno Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 20oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +15 Strenght for 45 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_arcane_elixir.png\"/> 1 Great Intelligence Elixir </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean-gem.gif\"/>3 Ocean Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 20oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +15 Intelligence for 45 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_swiftness_elixir.png\"/> 1 Great Swiftness Elixir </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cloud-gem.gif\"/>3 Cloud Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 20oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +4% Movement Speed For 45 Minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_resistance_elixir.png\"/> 1 Great Resistance Elixir </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/order-gem.gif\"/>3 Order Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 20oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +4% Resistance for 45 Minutes. </td> </tr> <tr> <td colspan=\"4\"><strong>Ultimate Elixirs</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_health_elixir.gif\"/> 100 Ultimate Health Elixirs </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/30oz.png\"/>10 30oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> <td> Regenerates large amount of health. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_mana_elixir.gif\"/> 100 Ultimate Mana Elixirs </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/30oz.png\"/>10 30oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> <td> Regenerates large amount of mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_spirit_elixir.gif\"/> 100 Ultimate Spirit Elixirs </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_vial.png\"/>1 Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/30oz.png\"/>10 30oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> <td> Regenerates large amount of health and mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_agility_elixir.png\"/> 1 Ultimate Dexterity Elixir </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_vial.png\"/>1 Extra Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forest-gem.gif\"/>4 Forest Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 30oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> +20 Dexterity for 60 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_strenght_elixir.png\"/> 1 Ultimate Strength Elixir </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_vial.png\"/>1 Extra Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-gem.gif\"/>4 Inferno Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 30oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> +20 Strenght for 60 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_arcane_elixir.png\"/> 1 Ultimate Intelligence Elixir </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_vial.png\"/>1 Extra Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean-gem.gif\"/>4 Ocean Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 30oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> +20 Intelligence for 60 minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_swiftness_elixir.png\"/> 1 Ultimate Swiftness Elixir </td> <td>100</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_vial.png\"/>1 Extra Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cloud-gem.gif\"/>4 Cloud Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 30oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> +5% Movement Speed For 60 Minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_resistance_elixir.png\"/> 1 Ultimate Resistance Elixir </td> <td>100</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_vial.png\"/>1 Extra Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/order-gem.gif\"/>4 Order Gems</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/20oz.png\"/>10 30oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> +5% Resistance for 60 Minutes. </td> </tr> <tr> <td colspan=\"4\"><strong>Supreme Elixirs</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/supreme_skill_elixir.png\"/> 1 Supreme Skill Elixir </td> <td>120</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_vial.png\"/>1 Extra Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/supreme_vial_of_blood.png\"/>1 Supreme vial of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-inferno-gem.gif\"/>1 Charged Inferno Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>20 Mythril Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> <td> +30% base Skills for 60 Minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/supreme_stat_elixir.png\"/> 1 Supreme Resistance Elixir </td> <td>120</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_vial.png\"/>1 Extra Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/supreme_vial_of_blood.png\"/>1 Supreme vial of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-ocean-gem.gif\"/>1 Charged Ocean Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>20 Mythril Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> <td> +20% All Stats and Resistance for 60 Minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/supreme_monster_essence_elixir.png\"/> 1 Supreme Monster Essence Elixir </td> <td>120</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_vial.png\"/>1 Extra Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/supreme_vial_of_blood.png\"/>1 Supreme vial of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-forest-gem.gif\"/>1 Charged Forest Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>20 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> <td> +25% Monster Essence find for 60 Minutes. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/supreme_experience_elixir.png\"/> 1 Supreme Experience Elixir </td> <td>120</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_vial.png\"/>1 Extra Large Vial</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/supreme_vial_of_blood.png\"/>1 Supreme vial of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-cloud-gem.gif\"/>1 Charged Cloud Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rots.png\"/>10 Rings of the Sky</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> <td> +100% Experience gained for 60 Minutes. </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit9\">Infusions</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_health_elixir.png\"/> 10 Great Health Elixirs </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strong_health_elixir.png\"/>100 Strong Health Elixirs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/15oz.png\"/>5 15oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> Regenerates substantial amount of health. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_mana_elixir.png\"/> 10 Great Mana Elixirs </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/strong_mana_elixir.png\"/>100 Strong Mana Elixirs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/15oz.png\"/>5 15oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> Regenerates substantial amount of mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_health_elixir.gif\"/> 10 Ultimate Health Elixirs </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_health_elixir.png\"/>100 Great Health Elixirs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/25oz.png\"/>5 25oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> Regenerates large amount of mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_mana_elixir.gif\"/> 10 Ultimate Mana Elixirs </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_mana_elixir.png\"/>100 Great Mana Elixirs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/25oz.png\"/>5 25oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> Regenerates large amount of mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_spirit_elixir.gif\"/> 10 Ultimate Spirit Elixirs </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/great_spirit_elixir.png\"/>100 Great Spirit Elixirs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/25oz.png\"/>5 25oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> Regenerates large amount of health and mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_health_infusion.gif\"/> 10 Extra Large Health Infusions </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_health_elixir.gif\"/>100 Ultimate Health Elixirs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/35oz.png\"/>5 35oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> Regenerates very large amount of health. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_health_infusion.gif\"/> 10 Extra Large Mana Infusions </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_mana_elixir.gif\"/>100 Ultimate Mana Elixirs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/35oz.png\"/>5 35oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> Regenerates very large amount of mana. </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/extra_large_health_infusion.gif\"/> 10 Extra Large Spirit Infusions </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ultimate_spirit_elixir.gif\"/>100 Ultimate Spirit Elixirs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/35oz.png\"/>5 35oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> Regenerates very large amount of health and mana. </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit10\">Enchantments</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td colspan=\"3\"><strong>Empowered Enchantments</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_ricochet_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Empowered Ricochet Enchantment</a> </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ricochet_enchantment.png\"/>5 Ricochet Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_clear_state_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Empowered Clear State Enchantment</a> </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clear_state_enchantment.png\"/>5 Clear State Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_enraging_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Empowered Enraging Enchantment</a> </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enraging_enchantment.png\"/>5 Enraging Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_enflaming_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Empowered Enflaming Enchantment</a> </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enflaming_enchantment.png\"/>5 Enflaming Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_grasping_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Empowered Grasping Enchantment</a> </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/grasping_enchantment.png\"/>5 Grasping Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_hemorage_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Empowered Hemorage Enchantment</a> </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/hemorage_enchantment.png\"/>5 Hemorage Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_life_bloom_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Empowered Life Bloom Enchantment</a> </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/life_bloom_enchantment.png\"/>5 Life Bloom Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_life_leech_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Empowered Life Leech Enchantment</a> </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/life_leech_enchantment.png\"/>5 Life Leech Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> </tr> <tr> <td colspan=\"3\"><strong>Awakened Enchantments</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_ricochet_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Awakened Ricochet Enchantment</a> </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_ricochet_enchantment.png\"/>5 Empowered Ricochet Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_clear_state_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Awakened Clear State Enchantment</a> </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_clear_state_enchantment.png\"/>5 Empowered Clear State Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_enraging_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Awakened Enraging Enchantment</a> </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_enraging_enchantment.png\"/>5 Empowered Enraging Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_enflaming_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Awakened Enflaming Enchantment</a> </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_enflaming_enchantment.png\"/>5 Empowered Enflaming Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_grasping_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Awakened Grasping Enchantment</a> </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_grasping_enchantment.png\"/>5 Empowered Grasping Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_hemorage_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Awakened Hemorage Enchantment</a> </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_hemorage_enchantment.png\"/>5 Empowered Hemorage Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_life_bloom_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Awakened Life Bloom Enchantment</a> </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_life_bloom_enchantment.png\"/>5 Empowered Life Bloom Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_life_leech_enchantment.png\"/> <a class=\"prof-wiki-link ut-link\">Awakened Life Leech Enchantment</a> </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/empowered_life_leech_enchantment.png\"/>5 Empowered Life Leech Enchantments</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Tokens</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit11\">Oils</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/repolishing_oil.png\"/> Repolishing Oil </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/30oz.png\"/>5 30oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shining_oil.png\"/> Shining Oil </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/30oz.png\"/>5 30oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/repolishing_oil.png\"/> Forged Repolishing Oil </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/repolishing_oil.png\"/>2 Repolishing Oil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_shard.png\"/>10 Void Mysterious Powder</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit12\">Transmuting</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td colspan=\"3\"><strong>Rookie Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_stat_stone.gif\"/> Large Stat Stone </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/stat_stone.gif\"/>12 Stat Stones</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td colspan=\"3\"><strong>Intermediate Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_stat_stone.gif\"/> Large Stat Stone </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/stat_stone.gif\"/>10 Stat Stones</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td colspan=\"3\"><strong>Expert Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_stat_stone.gif\"/> Large Stat Stone </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/stat_stone.gif\"/>8 Stat Stones</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td colspan=\"3\"><strong>Ancient Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ancient_stat_stone.png\"/> Ancient Stat Stone </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/large_stat_stone.gif\"/>8 Large Stat Stones</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 6
        },
        {
          "title": "Rune Exchange",
          "html": "<p> <p> To exchange runes and emblems you need to buy <img alt=\"Rune Exchange Token\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_exchange_token.png\" title=\"Rune Exchange Token\"/> <strong>Rune Exchange Token</strong>. It's available at the <strong>Store</strong> for 250 points. </p> </p> <h3 class=\"sectionedit14\">T4 Healing Emblems</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tier_4_healing_emblem_token.png\"/> T4 Healing Emblem Token </td> <td>0</td> <td> <img alt=\"Forgotten Fighter Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgotten_fighter_emblem.png\" title=\"Forgotten Fighter Emblem\"/> <img alt=\"Forgotten Mage Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgotten_mage_emblem.png\" title=\"Forgotten Mage Emblem\"/> <img alt=\"Forgotten Specialist Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgotten_specialist_emblem.png\" title=\"Forgotten Specialist Emblem\"/> <br/> <p>Any Forgotten Emblem</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_exchange_token.png\"/> <p>Rune Exchange Token</p> </td> </tr> </tbody> </table></div> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"Forgotten Fighter Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgotten_fighter_emblem.png\" title=\"Forgotten Fighter Emblem\"/> <img alt=\"Forgotten Mage Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgotten_mage_emblem.png\" title=\"Forgotten Mage Emblem\"/> <img alt=\"Forgotten Specialist Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgotten_specialist_emblem.png\" title=\"Forgotten Specialist Emblem\"/> <br/> <p>Any Forgotten Emblem</p> </td> <td>0</td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tier_4_healing_emblem_token.png\"/> T4 Healing Emblem Token </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit15\">Seven Trials Emblems</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/seven_trials_rune_token.png\"/> Seven Trials Rune Token </td> <td>0</td> <td> <img alt=\"Adorned Fighter Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/adorned_fighter_emblem.png\" title=\"Adorned Fighter Emblem\"/> <img alt=\"Adorned Mage Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/adorned_mage_emblem.png\" title=\"Adorned Mage Emblem\"/> <img alt=\"Adorned Specialist Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/adorned_specialist_emblem.png\" title=\"Adorned Specialist Emblem\"/> <br/> <p>Any Adorned Emblem</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_exchange_token.png\"/> <p>Rune Exchange Token</p> </td> </tr> </tbody> </table></div> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"Adorned Fighter Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/adorned_fighter_emblem.png\" title=\"Adorned Fighter Emblem\"/> <img alt=\"Adorned Mage Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/adorned_mage_emblem.png\" title=\"Adorned Mage Emblem\"/> <img alt=\"Adorned Specialist Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/adorned_specialist_emblem.png\" title=\"Adorned Specialist Emblem\"/> <br/> <p>Any Adorned Emblem</p> </td> <td>0</td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/seven_trials_rune_token.png\"/> Seven Trials Rune Token </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit16\">Gold Emblems</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_emblem_token.png\"/> Gold Emblem Rune Token </td> <td>0</td> <td> <img alt=\"Gold Fighter Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_fighter_emblem.png\" title=\"Gold Fighter Emblem\"/> <img alt=\"Gold Mage Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_mage_emblem.png\" title=\"Gold Mage Emblem\"/> <img alt=\"Gold Specialist Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_specialist_emblem.png\" title=\"Gold Specialist Emblem\"/> <br/> <p>Any Gold Emblem</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_exchange_token.png\"/> <p>Rune Exchange Token</p> </td> </tr> </tbody> </table></div> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"Gold Fighter Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_fighter_emblem.png\" title=\"Gold Fighter Emblem\"/> <img alt=\"Gold Mage Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_mage_emblem.png\" title=\"Gold Mage Emblem\"/> <img alt=\"Gold Specialist Emblem\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_specialist_emblem.png\" title=\"Gold Specialist Emblem\"/> <br/> <p>Any Gold Emblem</p> </td> <td>0</td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_emblem_token.png\"/> Gold Emblem Rune Token </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit17\">Tier 2 Soul Runes</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>alchemy</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tier_2_soul_rune_token.png\"/> T2 Soul Rune Token </td> <td>0</td> <td> <img alt=\"Tier 2 Archer Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_archer_soul_rune.png\" title=\"Tier 2 Archer Soul Rune\"/> <img alt=\"Tier 2 Bard Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_bard_soul_rune.png\" title=\"Tier 2 Bard Soul Rune\"/> <img alt=\"Tier 2 Berserker Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_berserker_soul_rune.png\" title=\"Tier 2 Berserker Soul Rune\"/> <img alt=\"Tier 2 Corsair Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_corsair_soul_rune.png\" title=\"Tier 2 Corsair Soul Rune\"/> <img alt=\"Tier 2 Druid Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_druid_soul_rune.png\" title=\"Tier 2 Druid Soul Rune\"/> <img alt=\"Tier 2 Gunslinger Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_gunslinger_soul_rune.png\" title=\"Tier 2 Gunslinger Soul Rune\"/> <img alt=\"Tier 2 Monk Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_monk_soul_rune.png\" title=\"Tier 2 Monk Soul Rune\"/> <img alt=\"Tier 2 Necromancer Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_necromancer_soul_rune.png\" title=\"Tier 2 Necromancer Soul Rune\"/> <img alt=\"Tier 2 Rogue Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_rogue_soul_rune.png\" title=\"Tier 2 Rogue Soul Rune\"/> <img alt=\"Tier 2 Sorcerer Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_sorcerer_soul_rune.png\" title=\"Tier 2 Sorcerer Soul Rune\"/> <img alt=\"Tier 2 Tamer Soul Rune\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/t2_tamer_soul_rune.png\" title=\"Tier 2 Tamer Soul Rune\"/> <br/> <p>Any Tier 2 Soul Rune</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_exchange_token.png\"/> <p>Rune Exchange Token</p> </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 7
        }
      ],
      "tableCount": 15
    },
    {
      "id": "blacksmithing",
      "group": "crafting",
      "role": "Tools, ingots, gear",
      "energy": "Complex crafts can consume energy and crafting time.",
      "value": "Ingots, tools, equipment, Damage and Health bonuses, Daily recipes, tool upgrades, material sorting",
      "icon": "⚒️",
      "name": "Blacksmithing",
      "source": "blacksmithing.html",
      "lead": "Blacksmithing now owns tool progression, rods, transmutation, regrade keys, Honing Stones, and equipment progression crafts. Several former sources were moved into Blacksmithing crafts.",
      "media": [
        [
          "blacksmithing_npc.png",
          "Blacksmithing Npc"
        ],
        [
          "exclamation_mark.png",
          "Exclamation Mark"
        ],
        [
          "help_icon.png",
          "Help Icon"
        ],
        [
          "enhancement_crafting_option.png",
          "Enhancement Crafting Option"
        ],
        [
          "enhancement_crafting_window.png",
          "Enhancement Crafting Window"
        ],
        [
          "enhancement_buying_window.png",
          "Enhancement Buying Window"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "clayingot.png",
          "Clayingot"
        ],
        [
          "clayore.png",
          "Clayore"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "ironingot.png",
          "Ironingot"
        ],
        [
          "ironore.png",
          "Ironore"
        ],
        [
          "copperingot.png",
          "Copperingot"
        ],
        [
          "copperore.png",
          "Copperore"
        ],
        [
          "coalingot.png",
          "Coalingot"
        ],
        [
          "coalore.png",
          "Coalore"
        ],
        [
          "goldingot.png",
          "Goldingot"
        ],
        [
          "goldore.png",
          "Goldore"
        ],
        [
          "mythrilingot.png",
          "Mythrilingot"
        ],
        [
          "mythrilore.png",
          "Mythrilore"
        ],
        [
          "dragoningot.png",
          "Dragoningot"
        ],
        [
          "dragonore.png",
          "Dragonore"
        ],
        [
          "celestialingot.png",
          "Celestialingot"
        ],
        [
          "celestialore.png",
          "Celestialore"
        ],
        [
          "dark_iron_helmet.png",
          "Dark Iron Helmet"
        ],
        [
          "dark_iron_armor.png",
          "Dark Iron Armor"
        ],
        [
          "dark_iron_legs.png",
          "Dark Iron Legs"
        ],
        [
          "dark_iron_boots.png",
          "Dark Iron Boots"
        ],
        [
          "copper_helmet.png",
          "Copper Helmet"
        ],
        [
          "copper_armor.png",
          "Copper Armor"
        ],
        [
          "copper_legs.png",
          "Copper Legs"
        ],
        [
          "copper_boots.png",
          "Copper Boots"
        ],
        [
          "steel_helmet.png",
          "Steel Helmet"
        ],
        [
          "steel_armor.png",
          "Steel Armor"
        ],
        [
          "steel_legs.png",
          "Steel Legs"
        ],
        [
          "steel_boots.png",
          "Steel Boots"
        ],
        [
          "reinforced_steel_helmet.png",
          "Reinforced Steel Helmet"
        ],
        [
          "reinforced_steel_armor.png",
          "Reinforced Steel Armor"
        ],
        [
          "reinforced_steel_legs.png",
          "Reinforced Steel Legs"
        ],
        [
          "reinforced_steel_boots.png",
          "Reinforced Steel Boots"
        ],
        [
          "spartan_helmet.png",
          "Spartan Helmet"
        ],
        [
          "spartan_armor.png",
          "Spartan Armor"
        ],
        [
          "spartan_legs.png",
          "Spartan Legs"
        ],
        [
          "spartan_boots.png",
          "Spartan Boots"
        ],
        [
          "forsaken_helmet.png",
          "Forsaken Helmet"
        ],
        [
          "forsaken_armor.png",
          "Forsaken Armor"
        ],
        [
          "forsaken_legs.png",
          "Forsaken Legs"
        ],
        [
          "forsaken_boots.png",
          "Forsaken Boots"
        ],
        [
          "demonforged_helmet.png",
          "Demonforged Helmet"
        ],
        [
          "demonforged_armor.png",
          "Demonforged Armor"
        ],
        [
          "demonforged_legs.png",
          "Demonforged Legs"
        ],
        [
          "demonforged_boots.png",
          "Demonforged Boots"
        ],
        [
          "ancient_celestial_helmet.png",
          "Ancient Celestial Helmet"
        ],
        [
          "ancient_celestial_armor.png",
          "Ancient Celestial Armor"
        ],
        [
          "ancient_celestial_legs.png",
          "Ancient Celestial Legs"
        ],
        [
          "ancient_celestial_boots.png",
          "Ancient Celestial Boots"
        ],
        [
          "crystal_regrade_key.png",
          "Crystal Regrade Key"
        ],
        [
          "broken_archlight_key.png",
          "Broken Archlight Key"
        ],
        [
          "old_fake_archlight_key.png",
          "Old Fake Archlight Key"
        ],
        [
          "archlight_key.png",
          "Archlight Key"
        ],
        [
          "legendary_key_fragment.png",
          "Legendary Key Fragment"
        ],
        [
          "iron-pickaxe.png",
          "Iron Pickaxe"
        ],
        [
          "copper-pickaxe.png",
          "Copper Pickaxe"
        ],
        [
          "steel-pickaxe.png",
          "Steel Pickaxe"
        ],
        [
          "gold-pickaxe.png",
          "Gold Pickaxe"
        ],
        [
          "mythril-pickaxe.png",
          "Mythril Pickaxe"
        ],
        [
          "dragon-pickaxe.png",
          "Dragon Pickaxe"
        ],
        [
          "ironhatchet.png",
          "Ironhatchet"
        ],
        [
          "copperhatchet.png",
          "Copperhatchet"
        ],
        [
          "steelhatchet.png",
          "Steelhatchet"
        ],
        [
          "goldhatchet.png",
          "Goldhatchet"
        ],
        [
          "mythrilhatchet.png",
          "Mythrilhatchet"
        ],
        [
          "dragonhatchet.png",
          "Dragonhatchet"
        ],
        [
          "iron-knife.png",
          "Iron Knife"
        ],
        [
          "copper-knife.png",
          "Copper Knife"
        ],
        [
          "steel-knife.png",
          "Steel Knife"
        ],
        [
          "gold-knife.png",
          "Gold Knife"
        ],
        [
          "mythril-knife.png",
          "Mythril Knife"
        ],
        [
          "dragon-knife.png",
          "Dragon Knife"
        ],
        [
          "iron-fishing_rod.png",
          "Iron Fishing Rod"
        ],
        [
          "copper-fishing_rod.png",
          "Copper Fishing Rod"
        ],
        [
          "steel-fishing_rod.png",
          "Steel Fishing Rod"
        ],
        [
          "gold-fishing_rod.png",
          "Gold Fishing Rod"
        ],
        [
          "mythril-fishing_rod.png",
          "Mythril Fishing Rod"
        ],
        [
          "dragon-fishing_rod.png",
          "Dragon Fishing Rod"
        ],
        [
          "iron-watering_can.png",
          "Iron Watering Can"
        ],
        [
          "copper-watering_can.png",
          "Copper Watering Can"
        ],
        [
          "steel-watering_can.png",
          "Steel Watering Can"
        ],
        [
          "gold-watering_can.png",
          "Gold Watering Can"
        ],
        [
          "mythril-watering_can.png",
          "Mythril Watering Can"
        ],
        [
          "dragon-watering_can.png",
          "Dragon Watering Can"
        ],
        [
          "awakened_rune_stone.png",
          "Awakened Rune Stone"
        ],
        [
          "relic_rune_stone.png",
          "Relic Rune Stone"
        ],
        [
          "awakened_soul_stone.png",
          "Awakened Soul Stone"
        ],
        [
          "relic_soul_stone.png",
          "Relic Soul Stone"
        ],
        [
          "awakened_stone.png",
          "Awakened Stone"
        ],
        [
          "relic_stone.png",
          "Relic Stone"
        ],
        [
          "legendary_stone.png",
          "Legendary Stone"
        ],
        [
          "upgrade_stone.png",
          "Upgrade Stone"
        ],
        [
          "rune_soil.png",
          "Rune Soil"
        ],
        [
          "soul_soil.png",
          "Soul Soil"
        ],
        [
          "weapon_exchange_token.png",
          "Weapon Exchange Token"
        ],
        [
          "living_archlight_token.png",
          "Living Archlight Token"
        ],
        [
          "darksteel_exchange_token.png",
          "Darksteel Exchange Token"
        ],
        [
          "darksteel_bow.png",
          "Darksteel Bow"
        ],
        [
          "darksteel_claw.png",
          "Darksteel Claw"
        ],
        [
          "darksteel_dagger.png",
          "Darksteel Dagger"
        ],
        [
          "darksteel_hammer.png",
          "Darksteel Hammer"
        ],
        [
          "darksteel_heavyaxe.png",
          "Darksteel Heavyaxe"
        ],
        [
          "darksteel_heavysword.png",
          "Darksteel Heavysword"
        ],
        [
          "darksteel_katana.png",
          "Darksteel Katana"
        ],
        [
          "darksteel_pistol.png",
          "Darksteel Pistol"
        ],
        [
          "darksteel_shield.png",
          "Darksteel Shield"
        ],
        [
          "darksteel_staff.png",
          "Darksteel Staff"
        ],
        [
          "darksteel_grip.png",
          "Darksteel Grip"
        ],
        [
          "iceforged_exchange_token.png",
          "Iceforged Exchange Token"
        ],
        [
          "iceforged_bow.png",
          "Iceforged Bow"
        ],
        [
          "iceforged_claw.png",
          "Iceforged Claw"
        ],
        [
          "iceforged_dagger.png",
          "Iceforged Dagger"
        ],
        [
          "iceforged_hammer.png",
          "Iceforged Hammer"
        ],
        [
          "iceforged_heavyaxe.png",
          "Iceforged Heavyaxe"
        ],
        [
          "iceforged_heavysword.png",
          "Iceforged Heavysword"
        ],
        [
          "iceforged_katana.png",
          "Iceforged Katana"
        ],
        [
          "iceforged_pistol.png",
          "Iceforged Pistol"
        ],
        [
          "iceforged_shield.png",
          "Iceforged Shield"
        ],
        [
          "iceforged_staff.png",
          "Iceforged Staff"
        ],
        [
          "iceforged_grip.png",
          "Iceforged Grip"
        ],
        [
          "reforged_mastercrafted_weapon_token.png",
          "Reforged Mastercrafted Weapon Token"
        ],
        [
          "reforged_mastercrafted_bow.png",
          "Reforged Mastercrafted Bow"
        ],
        [
          "reforged_mastercrafted_claw.png",
          "Reforged Mastercrafted Claw"
        ],
        [
          "reforged_mastercrafted_dagger.png",
          "Reforged Mastercrafted Dagger"
        ],
        [
          "reforged_mastercrafted_hammer.png",
          "Reforged Mastercrafted Hammer"
        ],
        [
          "reforged_mastercrafted_heavyaxe.png",
          "Reforged Mastercrafted Heavyaxe"
        ],
        [
          "reforged_mastercrafted_heavysword.png",
          "Reforged Mastercrafted Heavysword"
        ],
        [
          "reforged_mastercrafted_katana.png",
          "Reforged Mastercrafted Katana"
        ],
        [
          "reforged_mastercrafted_pistol.png",
          "Reforged Mastercrafted Pistol"
        ],
        [
          "reforged_mastercrafted_shield.png",
          "Reforged Mastercrafted Shield"
        ],
        [
          "reforged_mastercrafted_staff.png",
          "Reforged Mastercrafted Staff"
        ],
        [
          "reforged_mastercrafted_grip.png",
          "Reforged Mastercrafted Grip"
        ],
        [
          "forgemaster_weapon_token.png",
          "Forgemaster Weapon Token"
        ],
        [
          "forgemaster_bow.gif",
          "Forgemaster Bow"
        ],
        [
          "forgemaster_claw.gif",
          "Forgemaster Claw"
        ],
        [
          "forgemaster_dagger.gif",
          "Forgemaster Dagger"
        ],
        [
          "forgemaster_heavyaxe.gif",
          "Forgemaster Heavyaxe"
        ],
        [
          "forgemaster_katana.gif",
          "Forgemaster Katana"
        ],
        [
          "forgemaster_pistol.gif",
          "Forgemaster Pistol"
        ],
        [
          "forgemaster_shield.gif",
          "Forgemaster Shield"
        ],
        [
          "forgemaster_staff.gif",
          "Forgemaster Staff"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Blacksmithing should explain current crafting energy costs, station usage, upgrade materials, and the new profession tool/crafting flow instead of only old static recipes.</p><p>Add placeholders for current blacksmithing station UI, tool upgrade UI, and a modern recipe example.</p><p> <p> Blacksmithing is used to craft various tools, gear and ingots from ores that you get through <a class=\"prof-wiki-link ut-link\">Mining</a>. Each crafting profession of archlight will <a class=\"prof-wiki-link ut-link\">Enhance</a> your character in a certain way when you reach higher level. Additionaly to Enhancement, you will get <a class=\"prof-wiki-link ut-link\">Stat Bonus</a> that will significantly boost your stats once maxed. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1. When you get your first ores from <a class=\"prof-wiki-link ut-link\">Mining</a> you should head to -1 floor in DP building, to <strong>Daily Blacksmithing</strong> npc.<br/> To begin crafting, simply right-click the <strong>anvil</strong> and select the item you need.<br/> Remember to ask the npc about the <a class=\"prof-wiki-link ut-link\">daily task</a>, as it will significantly boost your progress. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blacksmithing_npc.png\"/> </p> <p> 2. When you craft an item for the first time it's marked with exclamation mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/exclamation_mark.png\"/> next to it's name and it will yield 400% experience. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Daily task",
          "html": "<p> <p> Once a day you can visit <strong>Daily Blacksmithing</strong> npc and ask him for a task.<br/> He will ask you to craft something for him, and depending on your level it might be anything from clay ingots<br/> To mythril tools and gear. Every item that is currently needed for your daily task will be marked with question mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> next to it's name.<br/> You will keep this item and additionally you will get <strong>200%</strong> experience for that craft. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Enhancements",
          "html": "<p> <p> Enhancement for <strong>Blacksmithing</strong> is increasing your <strong>overall damage</strong>. Once you reach certain thresholds new crafting option called <strong>Enhancements</strong> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_option.png\"/>will appear available.<br/> Only then you will be able to pay and obtain your precious title. This bonus is not additive, on 95 level of blacksmithing you will have 15% increased damage. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_window.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_buying_window.png\"/> </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Title<br/>Level</th> <th>Apprentice<br/>60</th> <th>Skilled<br/>70</th> <th>Expert<br/>80</th> <th>Artisan<br/>90</th> <th>Masterclass<br/>95</th> </tr> </thead> <tbody> <tr> <td>Damage<br/>increase</td> <td>5%</td> <td>7.5%</td> <td>10%</td> <td>12.5%</td> <td>15%</td> </tr> <tr> <td>Cost</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>300 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        },
        {
          "title": "Stat Bonus",
          "html": "<p> <p> When you reach certain tresholds with blacksmithing you will get bonus <strong>Health</strong> stats.<br/> Unlike Enhancements, bonuses are applied automatically once you reach required level. (Bonus levels from cosmetics count towards these bonuses) </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Blacksmithing<br/>level</th> <th>Bonus</th> </tr> </thead> <tbody> <tr> <td>20</td> <td>+1</td> </tr> <tr> <td>40</td> <td>+2</td> </tr> <tr> <td>60</td> <td>+3</td> </tr> <tr> <td>70</td> <td>+4</td> </tr> <tr> <td>80</td> <td>+5</td> </tr> <tr> <td>90</td> <td>+7</td> </tr> <tr> <td>100</td> <td>+10</td> </tr> <tr> <td>110</td> <td>+15</td> </tr> <tr> <td>120</td> <td>+25</td> </tr> </tbody> </table></div> <p> This bonus isn't additive so at level 120 you will have +25 <strong>Health</strong>. </p> </p>",
          "tableCount": 1
        },
        {
          "title": "Crafting Recipes",
          "html": "<h3 class=\"sectionedit7\">Ingots</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clayingot.png\"/> 5x Clay Ingot </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/clayore.png\"/>10 Clay Ore</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/> 5x Iron Ingot </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironore.png\"/>10 Iron Ore</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/> 5x Copper Ingot </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperore.png\"/>10 Copper Ore</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/> 5x Coal Ingot </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalore.png\"/>10 Coal Ore</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/> 5x Gold Ingot </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldore.png\"/>10 Gold Ore</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/> 5x Mythril Ingot </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilore.png\"/>10 Mythril Ore</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/> 5x Dragon Ingot </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragonore.png\"/>10 Dragon Ore</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/celestialingot.png\"/> 1x celestial Ingot </td> <td>120</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/celestialore.png\"/>2 Celestial Ore</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit8\">Equipment</h3> <p> <p> Each set has same amount of ingredients required for each item. </p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Set</th> <th>Required<br/>blacksmithing</th> <th>Ingredients per item</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dark_iron_helmet.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dark_iron_armor.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dark_iron_legs.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dark_iron_boots.png\"/> <a class=\"prof-wiki-link ut-link\">Dark Iron Set</a> </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>25 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper_helmet.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper_armor.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper_legs.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper_boots.png\"/> <a class=\"prof-wiki-link ut-link\">Copper Set</a> </td> <td>25</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>25 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel_helmet.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel_armor.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel_legs.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel_boots.png\"/> <a class=\"prof-wiki-link ut-link\">Steel Set</a> </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>12 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>25 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reinforced_steel_helmet.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reinforced_steel_armor.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reinforced_steel_legs.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reinforced_steel_boots.png\"/> <a class=\"prof-wiki-link ut-link\">Reinforced Steel Set</a> </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>10 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>20 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>25 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>5 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spartan_helmet.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spartan_armor.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spartan_legs.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spartan_boots.png\"/> <a class=\"prof-wiki-link ut-link\">Spartan Set</a> </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>75 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>30 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forsaken_helmet.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forsaken_armor.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forsaken_legs.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forsaken_boots.png\"/> <a class=\"prof-wiki-link ut-link\">Forsaken Set</a> </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>75 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>50 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/demonforged_helmet.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/demonforged_armor.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/demonforged_legs.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/demonforged_boots.png\"/> <a class=\"prof-wiki-link ut-link\">Demonforged Set</a> </td> <td>100</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>80 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ancient_celestial_helmet.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ancient_celestial_armor.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ancient_celestial_legs.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ancient_celestial_boots.png\"/> <a class=\"prof-wiki-link ut-link\">Ancient Celestial Set</a> </td> <td>120</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/celestialingot.png\"/>5 Celestial Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>250 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>250 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>250 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1250 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit9\">Keys</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/crystal_regrade_key.png\"/> Crystal Regrade Key </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/broken_archlight_key.png\"/> Broken Archlight Key </td> <td>5</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/old_fake_archlight_key.png\"/>1 Old Fake Archlight Key</span> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/archlight_key.png\"/> Archlight Key </td> <td>5</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/broken_archlight_key.png\"/>5 Broken Archlight Key</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/archlight_key.png\"/> Legendary Archlight Key </td> <td>5</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_key_fragment.png\"/>3 Legendary Key Fragment</span> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit10\">Mining Tools</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-pickaxe.png\"/> Iron Pickaxe </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>100 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-pickaxe.png\"/> Copper Pickaxe </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>100 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel-pickaxe.png\"/> Steel Pickaxe </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>100 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-pickaxe.png\"/> Gold Pickaxe </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>12 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-pickaxe.png\"/> Mythril Pickaxe </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>15 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>25 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-pickaxe.png\"/> Dragon Pickaxe </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>40 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>60 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit11\">Woodcutting Tools</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironhatchet.png\"/> Iron Hatchet </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>100 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperhatchet.png\"/> Copper Hatchet </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>100 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steelhatchet.png\"/> Steel Hatchet </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>100 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldhatchet.png\"/> Gold Hatchet </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilhatchet.png\"/> Mythril Hatchet </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>15 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragonhatchet.png\"/> Dragon Hatchet </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>40 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>50 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit12\">Skinning Tools</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-knife.png\"/> Iron Skinning Knife </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>100 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-knife.png\"/> Copper Skinning Knife </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>100 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel-knife.png\"/> Steel Skinning Knife </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>100 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-knife.png\"/> Gold Skinning Knife </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-knife.png\"/> Mythril Skinning Knife </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>15 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-knife.png\"/> Dragon Skinning Knife </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>40 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>50 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit13\">Fishing Tools</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-fishing_rod.png\"/> Iron Fishing Rod </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>100 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-fishing_rod.png\"/> Copper Fishing Rod </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>100 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel-fishing_rod.png\"/> Steel Fishing Rod </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>100 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-fishing_rod.png\"/> Gold Fishing Rod </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-fishing_rod.png\"/> Mythril Fishing Rod </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>15 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Token</span><br/> <p>Blacksmith Skill (65)</p> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-fishing_rod.png\"/> Dragon Fishing Rod </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>40 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>50 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit14\">Farming Tools</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iron-watering_can.png\"/> Iron Watering Can </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>100 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copper-watering_can.png\"/> Copper Watering Can </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>100 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steel-watering_can.png\"/> Steel Watering Can </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>100 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-watering_can.png\"/> Gold Watering Can </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-watering_can.png\"/> Mythril Watering Can </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>100 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>15 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-watering_can.png\"/> Dragon Watering Can </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>40 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>50 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit15\">Stone Breakdown</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_rune_stone.png\"/> 4 Awakened Rune Stone </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/relic_rune_stone.png\"/>1 Relic Rune Stone</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_soul_stone.png\"/> 4 Awakened Soul Stone </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/relic_soul_stone.png\"/>1 Relic Soul Stone</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_stone.png\"/> 5 Awakened Stone </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/relic_stone.png\"/>1 Relic Stone</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/> 5 Legendary Stone </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_stone.png\"/>1 Awakened Stone</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/upgrade_stone.png\"/> 10 Upgrade Stone </td> <td>35</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>1 Legendary Stone</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 2 Rune Soil </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_rune_stone.png\"/>1 Awakened Rune Stone</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/> 2 Soul Soil </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_soul_stone.png\"/>1 Awakened Soul Stone</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit16\">Transmuting</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/> 1 Legendary Stone </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/upgrade_stone.png\"/>20 Upgrade Stone</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_stone.png\"/> 1 Awakened Stone </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>5 Legendary Stone</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/relic_rune_stone.png\"/> 1 Relic Rune Stone </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_rune_stone.png\"/>4 Awakened Rune Stone</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 10
        },
        {
          "title": "Weapon Exchange",
          "html": "<p> <p> To exchange weapons you need to buy <img alt=\"Weapon Exchange Token\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/weapon_exchange_token.png\" title=\"Weapon Exchange Token\"/> <strong>Weapon Exchange Token</strong>. It's available at <strong>Living Token Exchanger</strong> npc at depot for 1 <img alt=\"Living Archlight Token\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/living_archlight_token.png\" title=\"Living Archlight Token\"/> <strong>Living Archlight Token</strong>.<br/> <strong>Abaldar</strong> players can buy it at coin store for 1100 Archlight Coins (points). </p> </p> <h3 class=\"sectionedit18\">Darksteel</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_exchange_token.png\"/> 1 Darksteel Exchange Token </td> <td>0</td> <td> <img alt=\"Darksteel Bow\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_bow.png\" title=\"Darksteel Bow\"/> <img alt=\"Darksteel Claw\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_claw.png\" title=\"Darksteel Claw\"/> <img alt=\"Darksteel Dagger\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_dagger.png\" title=\"Darksteel Dagger\"/> <img alt=\"Darksteel Hammer\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_hammer.png\" title=\"Darksteel Hammer\"/> <img alt=\"Darksteel Heavyaxe\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_heavyaxe.png\" title=\"Darksteel Heavyaxe\"/> <img alt=\"Darksteel Heavysword\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_heavysword.png\" title=\"Darksteel Heavysword\"/> <img alt=\"Darksteel Katana\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_katana.png\" title=\"Darksteel Katana\"/> <img alt=\"Darksteel Pistol\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_pistol.png\" title=\"Darksteel Pistol\"/> <img alt=\"Darksteel Shield\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_shield.png\" title=\"Darksteel Shield\"/> <img alt=\"Darksteel Staff\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_staff.png\" title=\"Darksteel Staff\"/> <img alt=\"Darksteel Grip\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_grip.png\" title=\"Darksteel Grip\"/> <br/> <p>Any Darksteel Weapon or Grip</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/weapon_exchange_token.png\"/> <p>1 Weapon Exchange Token</p> </td> </tr> </tbody> </table></div> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"Darksteel Bow\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_bow.png\" title=\"Darksteel Bow\"/> <img alt=\"Darksteel Claw\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_claw.png\" title=\"Darksteel Claw\"/> <img alt=\"Darksteel Dagger\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_dagger.png\" title=\"Darksteel Dagger\"/> <img alt=\"Darksteel Hammer\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_hammer.png\" title=\"Darksteel Hammer\"/> <img alt=\"Darksteel Heavyaxe\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_heavyaxe.png\" title=\"Darksteel Heavyaxe\"/> <img alt=\"Darksteel Heavysword\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_heavysword.png\" title=\"Darksteel Heavysword\"/> <img alt=\"Darksteel Katana\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_katana.png\" title=\"Darksteel Katana\"/> <img alt=\"Darksteel Pistol\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_pistol.png\" title=\"Darksteel Pistol\"/> <img alt=\"Darksteel Shield\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_shield.png\" title=\"Darksteel Shield\"/> <img alt=\"Darksteel Staff\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_staff.png\" title=\"Darksteel Staff\"/> <img alt=\"Darksteel Grip\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_grip.png\" title=\"Darksteel Grip\"/> <br/> <p>Any Darksteel Weapon or Grip</p> </td> <td>0</td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/darksteel_exchange_token.png\"/> 1 Darksteel Exchange Token </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit19\">Iceforged</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_exchange_token.png\"/> 1 Iceforged Exchange Token </td> <td>0</td> <td> <img alt=\"Iceforged Bow\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_bow.png\" title=\"Iceforged Bow\"/> <img alt=\"Iceforged Claw\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_claw.png\" title=\"Iceforged Claw\"/> <img alt=\"Iceforged Dagger\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_dagger.png\" title=\"Iceforged Dagger\"/> <img alt=\"Iceforged Hammer\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_hammer.png\" title=\"Iceforged Hammer\"/> <img alt=\"Iceforged Heavyaxe\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_heavyaxe.png\" title=\"Iceforged Heavyaxe\"/> <img alt=\"Iceforged Heavysword\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_heavysword.png\" title=\"Iceforged Heavysword\"/> <img alt=\"Iceforged Katana\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_katana.png\" title=\"Iceforged Katana\"/> <img alt=\"Iceforged Pistol\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_pistol.png\" title=\"Iceforged Pistol\"/> <img alt=\"Iceforged Shield\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_shield.png\" title=\"Iceforged Shield\"/> <img alt=\"Iceforged Staff\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_staff.png\" title=\"Iceforged Staff\"/> <img alt=\"Iceforged Grip\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_grip.png\" title=\"Iceforged Grip\"/> <br/> <p>Any Iceforged Weapon or Grip</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/weapon_exchange_token.png\"/> <p>1 Weapon Exchange Token</p> </td> </tr> </tbody> </table></div> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"Iceforged Bow\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_bow.png\" title=\"Iceforged Bow\"/> <img alt=\"Iceforged Claw\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_claw.png\" title=\"Iceforged Claw\"/> <img alt=\"Iceforged Dagger\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_dagger.png\" title=\"Iceforged Dagger\"/> <img alt=\"Iceforged Hammer\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_hammer.png\" title=\"Iceforged Hammer\"/> <img alt=\"Iceforged Heavyaxe\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_heavyaxe.png\" title=\"Iceforged Heavyaxe\"/> <img alt=\"Iceforged Heavysword\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_heavysword.png\" title=\"Iceforged Heavysword\"/> <img alt=\"Iceforged Katana\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_katana.png\" title=\"Iceforged Katana\"/> <img alt=\"Iceforged Pistol\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_pistol.png\" title=\"Iceforged Pistol\"/> <img alt=\"Iceforged Shield\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_shield.png\" title=\"Iceforged Shield\"/> <img alt=\"Iceforged Staff\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_staff.png\" title=\"Iceforged Staff\"/> <img alt=\"Iceforged Grip\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_grip.png\" title=\"Iceforged Grip\"/> <br/> <p>Any Iceforged Weapon or Grip</p> </td> <td>0</td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/iceforged_exchange_token.png\"/> 1 Iceforged Exchange Token </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit20\">Reforged Mastercrafted</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_weapon_token.png\"/> 2 Reforged Mastercrafted Weapon Token </td> <td>0</td> <td> <img alt=\"Reforged Mastercrafted Bow\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_bow.png\" title=\"Reforged Mastercrafted Bow\"/> <img alt=\"Reforged Mastercrafted Claw\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_claw.png\" title=\"Reforged Mastercrafted Claw\"/> <img alt=\"Reforged Mastercrafted Dagger\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_dagger.png\" title=\"Reforged Mastercrafted Dagger\"/> <img alt=\"Reforged Mastercrafted Hammer\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_hammer.png\" title=\"Reforged Mastercrafted Hammer\"/> <img alt=\"Reforged Mastercrafted Heavyaxe\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_heavyaxe.png\" title=\"Reforged Mastercrafted Heavyaxe\"/> <img alt=\"Reforged Mastercrafted Heavysword\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_heavysword.png\" title=\"Reforged Mastercrafted Heavysword\"/> <img alt=\"Reforged Mastercrafted Katana\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_katana.png\" title=\"Reforged Mastercrafted Katana\"/> <img alt=\"Reforged Mastercrafted Pistol\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_pistol.png\" title=\"Reforged Mastercrafted Pistol\"/> <img alt=\"Reforged Mastercrafted Shield\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_shield.png\" title=\"Reforged Mastercrafted Shield\"/> <img alt=\"Reforged Mastercrafted Staff\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_staff.png\" title=\"Reforged Mastercrafted Staff\"/> <img alt=\"Reforged Mastercrafted Grip\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_grip.png\" title=\"Reforged Mastercrafted Grip\"/> <br/> <p>Any Reforged Mastercrafted Weapon or Grip</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/weapon_exchange_token.png\"/> <p>1 Weapon Exchange Token</p> </td> </tr> </tbody> </table></div> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_bow.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_claw.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_dagger.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_hammer.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_heavyaxe.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_heavysword.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_katana.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_pistol.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_shield.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_staff.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_grip.png\"/> <br/> <p>Any Reforged Mastercrafted Weapon or Grip</p> </td> <td>0</td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_weapon_token.png\"/> 2 Reforged Mastercrafted Weapon Token </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit21\">Forgemaster</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_weapon_token.png\"/> 1 Forgemaster Weapon Token </td> <td>0</td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_bow.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_claw.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_dagger.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_hammer.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_heavyaxe.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_heavysword.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_katana.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_pistol.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_shield.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_staff.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_grip.png\"/> <br/> <p>Any Forgemaster Weapon or Grip</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/weapon_exchange_token.png\"/> <p>1 Weapon Exchange Token</p> </td> </tr> </tbody> </table></div> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_bow.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_claw.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_dagger.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_hammer.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_heavyaxe.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reforged_mastercrafted_heavysword.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_katana.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_pistol.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_shield.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_staff.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_grip.png\"/> <br/> <p>Any Forgemaster Weapon or Grip</p> </td> <td>0</td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgemaster_weapon_token.png\"/> 1 Forgemaster Weapon Token </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 8
        }
      ],
      "tableCount": 20
    },
    {
      "id": "cooking",
      "group": "crafting",
      "role": "Meals and buff food",
      "energy": "Complex meals can consume energy and crafting time.",
      "value": "Prepared meals, stat buffs, regeneration, Healing Received bonus, Daily recipes, tool upgrades, material sorting",
      "icon": "🍲",
      "name": "Cooking",
      "source": "cooking.html",
      "lead": "Cooking converts gathered food, fish, Legendary Fish, and profession materials into meals with stronger value. Craftsman rank can improve crafted food percentage bonuses.",
      "media": [
        [
          "cooking_npc.png",
          "Cooking Npc"
        ],
        [
          "exclamation_mark.png",
          "Exclamation Mark"
        ],
        [
          "help_icon.png",
          "Help Icon"
        ],
        [
          "enhancement_crafting_option.png",
          "Enhancement Crafting Option"
        ],
        [
          "enhancement_crafting_window.png",
          "Enhancement Crafting Window"
        ],
        [
          "enhancement_buying_window.png",
          "Enhancement Buying Window"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "northern_pike.png",
          "Northern Pike"
        ],
        [
          "snapper.png",
          "Snapper"
        ],
        [
          "green_perch.png",
          "Green Perch"
        ],
        [
          "ham.gif",
          "Ham"
        ],
        [
          "meat.gif",
          "Meat"
        ],
        [
          "cucumber.gif",
          "Cucumber"
        ],
        [
          "peas.gif",
          "Peas"
        ],
        [
          "carrot.gif",
          "Carrot"
        ],
        [
          "corncob.gif",
          "Corncob"
        ],
        [
          "onion.gif",
          "Onion"
        ],
        [
          "tomato.gif",
          "Tomato"
        ],
        [
          "potato.gif",
          "Potato"
        ],
        [
          "pork_and_corn.png",
          "Pork And Corn"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "steak_platter.png",
          "Steak Platter"
        ],
        [
          "bass_fillet.png",
          "Bass Fillet"
        ],
        [
          "sliced_fish.gif",
          "Sliced Fish"
        ],
        [
          "carp_platter.png",
          "Carp Platter"
        ],
        [
          "dragon_carp_platter.png",
          "Dragon Carp Platter"
        ],
        [
          "squid_platter.png",
          "Squid Platter"
        ],
        [
          "shark_soup.png",
          "Shark Soup"
        ],
        [
          "savoury_pork_and_corn.png",
          "Savoury Pork And Corn"
        ],
        [
          "savoury_steak_platter.png",
          "Savoury Steak Platter"
        ],
        [
          "savoury_bass_fillet.png",
          "Savoury Bass Fillet"
        ],
        [
          "savoury_carp_platter.png",
          "Savoury Carp Platter"
        ],
        [
          "savoury_dragon_carp_platter.png",
          "Savoury Dragon Carp Platter"
        ],
        [
          "savoury_squid_platter.png",
          "Savoury Squid Platter"
        ],
        [
          "savoury_shark_soup.png",
          "Savoury Shark Soup"
        ],
        [
          "artisan_pork_and_corn.png",
          "Artisan Pork And Corn"
        ],
        [
          "artisan_steak_platter.png",
          "Artisan Steak Platter"
        ],
        [
          "artisan_bass_fillet.png",
          "Artisan Bass Fillet"
        ],
        [
          "artisan_carp_platter.png",
          "Artisan Carp Platter"
        ],
        [
          "artisan_dragon_carp_platter.png",
          "Artisan Dragon Carp Platter"
        ],
        [
          "artisan_squid_platter.png",
          "Artisan Squid Platter"
        ],
        [
          "artisan_shark_soup.png",
          "Artisan Shark Soup"
        ],
        [
          "gourmet_pork_and_corn.png",
          "Gourmet Pork And Corn"
        ],
        [
          "gourmet_steak_platter.png",
          "Gourmet Steak Platter"
        ],
        [
          "gourmet_bass_fillet.png",
          "Gourmet Bass Fillet"
        ],
        [
          "gourmet_carp_platter.png",
          "Gourmet Carp Platter"
        ],
        [
          "gourmet_dragon_carp_platter.png",
          "Gourmet Dragon Carp Platter"
        ],
        [
          "gourmet_squid_platter.png",
          "Gourmet Squid Platter"
        ],
        [
          "gourmet_shark_soup.png",
          "Gourmet Shark Soup"
        ],
        [
          "soul_soil.png",
          "Soul Soil"
        ],
        [
          "rune_soil.png",
          "Rune Soil"
        ],
        [
          "legendary_stone.png",
          "Legendary Stone"
        ],
        [
          "awakened_rune_stone.png",
          "Awakened Rune Stone"
        ],
        [
          "relic_stone.png",
          "Relic Stone"
        ],
        [
          "awakened_stone.png",
          "Awakened Stone"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Cooking turns farming and other gathered ingredients into meals and buffs. Keep recipe tables, but update the overview to explain current daily recipe flow and energy usage.</p><p>Add placeholders for current cooking station UI and daily cooking recipe.</p><p> <p> Cooking gives you the ability to prepare unique dishes of <strong>Archlight</strong> which will significantly boost your stats and HP/MP regen. To get started, you will need some ingredients. You will have to either buy a farm and start <a class=\"prof-wiki-link ut-link\">Farming</a> or buy meats and veggies from other players. <a class=\"prof-wiki-link ut-link\">Fishing</a> will also come in handy as fish soups are very good stat boosters. <strong>Base food buff duration is 30 minutes.</strong> <br/><br/> Each crafting profession of archlight will <a class=\"prof-wiki-link ut-link\">Enhance</a> your character in a certain way when you reach higher level. Additionaly to Enhancement, you will get <a class=\"prof-wiki-link ut-link\">Stat Bonus</a> that will significantly boost your stats once maxed. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1. When you get your first veggies from <a class=\"prof-wiki-link ut-link\">Farming</a> (as well as some fish slices from <a class=\"prof-wiki-link ut-link\">Fishing</a>) you should head to -1 floor in DP building, to <strong>Horse</strong> npc and travel to <strong>Farm Shops</strong>. To begin crafting, simply right-click the <strong>large cauldron</strong> and select the meal you need. Remember to ask the npc about the <a class=\"prof-wiki-link ut-link\">daily task</a>, as it will significantly boost your progress. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cooking_npc.png\"/> </p> <p> 2. When you cook a meal for the first time it's marked with exclamation mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/exclamation_mark.png\"/> next to it's name and it will yield 400% experience. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Daily task",
          "html": "<p> <p> Once a day you can visit <strong>Daily Cooking</strong> npc and ask him for a task. He will ask you to cook something for him. Every item that is currently needed for your daily task will be marked with question mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> next to it's name. You will keep this meal and additionally you will get <strong>200%</strong> experience. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Enhancements",
          "html": "<p> <p> Enhancement for <strong>Cooking</strong> is increasing your <strong>Food buff duration</strong>. Once you reach certain thresholds new crafting option called <strong>Enhancements</strong> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_option.png\"/>will appear available. Only then you will be able to pay and obtain your precious title. This bonus is not additive, on 95 level of cooking you will have +30% increased buff duration. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_window.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_buying_window.png\"/> </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Title<br/>Level</th> <th>Apprentice<br/>60</th> <th>Skilled<br/>70</th> <th>Expert<br/>80</th> <th>Artisan<br/>90</th> <th>Masterclass<br/>95</th> </tr> </thead> <tbody> <tr> <td>Food<br/>buff duration</td> <td>10%</td> <td>15%</td> <td>20%</td> <td>25%</td> <td>30%</td> </tr> <tr> <td>Cost</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>300 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        },
        {
          "title": "Stat Bonus",
          "html": "<p> <p> When you reach certain tresholds with cooking you will get bonus <strong>Healing Received</strong> stats. <br/> Unlike Enhancements, bonuses are applied automatically once you reach required level. (Bonus levels from cosmetics count towards these bonuses) </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Cooking<br/>level</th> <th>Bonus</th> </tr> </thead> <tbody> <tr> <td>20</td> <td>+1</td> </tr> <tr> <td>40</td> <td>+2</td> </tr> <tr> <td>60</td> <td>+3</td> </tr> <tr> <td>70</td> <td>+4</td> </tr> <tr> <td>80</td> <td>+5</td> </tr> <tr> <td>90</td> <td>+7</td> </tr> <tr> <td>100</td> <td>+10</td> </tr> <tr> <td>110</td> <td>+15</td> </tr> <tr> <td>120</td> <td>+25</td> </tr> </tbody> </table></div> <p> This bonus isn't additive so on level 120 you will have +25 <strong>Healing Received</strong>. </p> </p>",
          "tableCount": 1
        },
        {
          "title": "Crafting Recipes",
          "html": "<h3 class=\"sectionedit7\">Prepared Meals</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>cooking</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/northern_pike.png\"/> 7 Northern Pikes </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/snapper.png\"/> 7 Snappers </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/green_perch.png\"/> 7 Green Perchs </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ham.gif\"/> 7 Haunches of Ham </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/meat.gif\"/> 7 Haunches of Meat </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cucumber.gif\"/> 35 Cucumbers </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/peas.gif\"/>10 Peas</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cucumber.gif\"/> 35 Cucumbers </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/carrot.gif\"/> 35 Carrots </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/corncob.gif\"/> 35 Corncobs </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/onion.gif\"/> 35 Onions </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tomato.gif\"/> 35 Tomatoes </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/potato.gif\"/> 35 Potatoes </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coins</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit8\">Basic Meals</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>cooking</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/pork_and_corn.png\"/> Pork and Cork </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/meat.gif\"/> 5 Haunches of Meat</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/corncob.gif\"/> 25 Corncobs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> 1% mana every 5 seconds </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/steak_platter.png\"/> Steak Platter </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ham.gif\"/> 5 Haunches of Ham</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/potato.gif\"/> 25 Potatoes</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> 1% health every 5 seconds </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/bass_fillet.png\"/> Bass Fillet </td> <td>25</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 8 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cucumber.gif\"/> 25 Cucumbers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 to Vitality </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/carp_platter.png\"/> Carp Platter </td> <td>25</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 8 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/onion.gif\"/> 25 Onions</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 to Strength </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon_carp_platter.png\"/> Dragon Carp Platter </td> <td>25</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 8 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tomato.gif\"/> 25 Tomatoes</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 to Intelligence </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/squid_platter.png\"/> Squid Platter </td> <td>25</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 8 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/peas.gif\"/> 25 Peas</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 to Arcane </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shark_soup.png\"/> Shark Soup </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 8 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/carrot.gif\"/> 25 Carrots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 to all Stats </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit9\">Savoury Meals</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>cooking</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/savoury_pork_and_corn.png\"/> Savoury Pork and Cork </td> <td>35</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/meat.gif\"/> 10 Haunches of Meat</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/corncob.gif\"/> 50 Corncobs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> 1.5% mana every 5 seconds </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/savoury_steak_platter.png\"/> Savoury Steak Platter </td> <td>35</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ham.gif\"/> 10 Haunches of Ham</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/potato.gif\"/> 50 Potatoes</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> 1.5% health every 5 seconds </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/savoury_bass_fillet.png\"/> Savoury Bass Fillet </td> <td>45</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 12 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cucumber.gif\"/> 50 Cucumbers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> +10 to Vitality </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/savoury_carp_platter.png\"/> Savoury Carp Platter </td> <td>45</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 12 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/onion.gif\"/> 50 Onions</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> +10 to Strength </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/savoury_dragon_carp_platter.png\"/> Savoury Dragon Carp Platter </td> <td>45</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 12 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tomato.gif\"/> 50 Tomatoes</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> +10 to Intelligence </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/savoury_squid_platter.png\"/> Savoury Squid Platter </td> <td>45</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 12 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/peas.gif\"/> 50 Peas</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> +10 to Arcane </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/savoury_shark_soup.png\"/> Savoury Shark Soup </td> <td>55</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 12 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/carrot.gif\"/> 50 Carrots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> +10 to all Stats </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit10\">Artisan Meals</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>cooking</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/artisan_pork_and_corn.png\"/> Artisan Pork and Cork </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/meat.gif\"/> 20 Haunches of Meat</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/corncob.gif\"/> 100 Corncobs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> 2% mana every 5 seconds </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/artisan_steak_platter.png\"/> Artisan Steak Platter </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ham.gif\"/> 20 Haunches of Ham</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/potato.gif\"/> 100 Potatoes</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> 2% health every 5 seconds </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/artisan_bass_fillet.png\"/> Artisan Bass Fillet </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 16 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cucumber.gif\"/> 100 Cucumbers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +15 to Vitality </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/artisan_carp_platter.png\"/> Artisan Carp Platter </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 16 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/onion.gif\"/> 100 Onions</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +15 to Strength </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/artisan_dragon_carp_platter.png\"/> Artisan Dragon Carp Platter </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 16 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tomato.gif\"/> 100 Tomatoes</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +15 to Intelligence </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/artisan_squid_platter.png\"/> Artisan Squid Platter </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 16 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/peas.gif\"/> 100 Peas</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +15 to Arcane </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/artisan_shark_soup.png\"/> Artisan Shark Soup </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 16 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/carrot.gif\"/> 100 Carrots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +15 to all Stats </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit11\">Gourmet Meals</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>cooking</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gourmet_pork_and_corn.png\"/> Gourmet Pork and Cork </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/meat.gif\"/> 40 Haunches of Meat</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/corncob.gif\"/> 200 Corncobs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>6 Archlight Tokens</span><br/> </td> <td> 2.5% mana every 5 seconds </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gourmet_steak_platter.png\"/> Gourmet Steak Platter </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ham.gif\"/> 40 Haunches of Ham</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/potato.gif\"/> 200 Potatoes</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>6 Archlight Tokens</span><br/> </td> <td> 2.5% health every 5 seconds </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gourmet_bass_fillet.png\"/> Gourmet Bass Fillet </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 24 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cucumber.gif\"/> 200 Cucumbers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> <td> +20 to Vitality </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gourmet_carp_platter.png\"/> Gourmet Carp Platter </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 24 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/onion.gif\"/> 200 Onions</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> +20 to Strength </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gourmet_dragon_carp_platter.png\"/> Gourmet Dragon Carp Platter </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 24 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tomato.gif\"/> 200 Tomatoes</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> +20 to Intelligence </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gourmet_squid_platter.png\"/> Gourmet Squid Platter </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 24 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/peas.gif\"/> 200 Peas</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> +20 to Arcane </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gourmet_shark_soup.png\"/> Gourmet Shark Soup </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sliced_fish.gif\"/> 24 Slices of Fish</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/carrot.gif\"/> 200 Carrots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> +20 to all Stats </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit12\">Transmuting</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>cooking</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td colspan=\"3\"><strong>Rookie Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/> Soul Soil </td> <td>75</td> <td> <span> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 4 Rune Soils<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/> 1 Archlight Token </span> </td> </tr> <tr> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>Legendary Stone</span><br/> </td> <td>75</td> <td> <span> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 4 Rune Soils<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/> 1 Archlight Token </span> </td> </tr> <tr> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_rune_stone.png\"/>Awakened Rune Stone</span><br/> </td> <td>75</td> <td> <span> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 6 Rune Soils<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/> 1 Archlight Token </span> </td> </tr> <tr> <td colspan=\"3\"><strong>Intermediate Transmutions</strong></td> </tr> <tr> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>Soul Soil</span><br/> </td> <td>85</td> <td> <span> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 3 Rune Soils<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/> 1 Archlight Token </span> </td> </tr> <tr> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>Legendary Stone</span><br/> </td> <td>85</td> <td> <span> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 3 Rune Soils<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/> 1 Archlight Token </span> </td> </tr> <tr> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_rune_stone.png\"/>Awakened Rune Stone</span><br/> </td> <td>85</td> <td> <span> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 5 Rune Soils<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/> 1 Archlight Token </span> </td> </tr> <tr> <td colspan=\"3\"><strong>Expert Transmutions</strong></td> </tr> <tr> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>Soul Soil</span><br/> </td> <td>95</td> <td> <span> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 2 Rune Soils<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/> 1 Archlight Token </span> </td> </tr> <tr> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>Legendary Stone</span><br/> </td> <td>95</td> <td> <span> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 2 Rune Soils<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/> 1 Archlight Token </span> </td> </tr> <tr> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_rune_stone.png\"/>Awakened Rune Stone</span><br/> </td> <td>95</td> <td> <span> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 4 Rune Soils<br/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/> 1 Archlight Token </span> </td> </tr> <tr> <td colspan=\"3\"><strong>Relic Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/relic_stone.png\"/> Relic Stone </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_stone.png\"/>5 Awakened Stones</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 6
        }
      ],
      "tableCount": 8
    },
    {
      "id": "jewelcrafting",
      "group": "crafting",
      "role": "Gems and jewelry",
      "energy": "Complex jewel crafts can consume energy and crafting time.",
      "value": "Gems, jewelry, amulets, Gem and Rune Effectiveness bonuses, Daily recipes, tool upgrades, material sorting",
      "icon": "💎",
      "name": "Jewelcrafting",
      "source": "jewelcrafting.html",
      "lead": "Jewelcrafting handles gems, jewels, jewelry, sockets, frames, polished and surging gem routes, and high-tier crafting chains.",
      "media": [
        [
          "jewelcrafting_npc.png",
          "Jewelcrafting Npc"
        ],
        [
          "exclamation_mark.png",
          "Exclamation Mark"
        ],
        [
          "help_icon.png",
          "Help Icon"
        ],
        [
          "enhancement_crafting_option.png",
          "Enhancement Crafting Option"
        ],
        [
          "enhancement_crafting_window.png",
          "Enhancement Crafting Window"
        ],
        [
          "enhancement_buying_window.png",
          "Enhancement Buying Window"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "cloud-gem.gif",
          "Cloud Gem"
        ],
        [
          "forest-gem.gif",
          "Forest Gem"
        ],
        [
          "inferno-gem.gif",
          "Inferno Gem"
        ],
        [
          "mountain-gem.gif",
          "Mountain Gem"
        ],
        [
          "ocean-gem.gif",
          "Ocean Gem"
        ],
        [
          "order-gem.gif",
          "Order Gem"
        ],
        [
          "goldingot.png",
          "Goldingot"
        ],
        [
          "coalingot.png",
          "Coalingot"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "charged-cloud-gem.gif",
          "Charged Cloud Gem"
        ],
        [
          "charged-forest-gem.gif",
          "Charged Forest Gem"
        ],
        [
          "charged-inferno-gem.gif",
          "Charged Inferno Gem"
        ],
        [
          "charged-mountain-gem.gif",
          "Charged Mountain Gem"
        ],
        [
          "charged-ocean-gem.gif",
          "Charged Ocean Gem"
        ],
        [
          "charged-order-gem.gif",
          "Charged Order Gem"
        ],
        [
          "supercharged_magnet.gif",
          "Supercharged Magnet"
        ],
        [
          "overcharged-cloud-gem.gif",
          "Overcharged Cloud Gem"
        ],
        [
          "overcharged-forest-gem.gif",
          "Overcharged Forest Gem"
        ],
        [
          "overcharged-inferno-gem.gif",
          "Overcharged Inferno Gem"
        ],
        [
          "overcharged-mountain-gem.gif",
          "Overcharged Mountain Gem"
        ],
        [
          "overcharged-ocean-gem.gif",
          "Overcharged Ocean Gem"
        ],
        [
          "overcharged-order-gem.gif",
          "Overcharged Order Gem"
        ],
        [
          "polished_gem.png",
          "Polished Gem"
        ],
        [
          "unpolished_gem.png",
          "Unpolished Gem"
        ],
        [
          "repolishing_oil.png",
          "Repolishing Oil"
        ],
        [
          "unpolished_gem_shard.png",
          "Unpolished Gem Shard"
        ],
        [
          "rots.png",
          "Rots"
        ],
        [
          "gem_remover.png",
          "Gem Remover"
        ],
        [
          "dragon_necklace.png",
          "Dragon Necklace"
        ],
        [
          "copperingot.png",
          "Copperingot"
        ],
        [
          "ironingot.png",
          "Ironingot"
        ],
        [
          "foxtail_amulet.png",
          "Foxtail Amulet"
        ],
        [
          "sapphire_amulet.png",
          "Sapphire Amulet"
        ],
        [
          "mythrilingot.png",
          "Mythrilingot"
        ],
        [
          "amulet_of_theurgy.png",
          "Amulet Of Theurgy"
        ],
        [
          "dragoningot.png",
          "Dragoningot"
        ],
        [
          "the_lions_heart.png",
          "The Lions Heart"
        ],
        [
          "cobra_amulet.png",
          "Cobra Amulet"
        ],
        [
          "jade_amulet.png",
          "Jade Amulet"
        ],
        [
          "hornet_ring.png",
          "Hornet Ring"
        ],
        [
          "glowinlog.png",
          "Glowinlog"
        ],
        [
          "glowing-leather.png",
          "Glowing Leather"
        ],
        [
          "gold_ring.png",
          "Gold Ring"
        ],
        [
          "25oz.png",
          "25Oz"
        ],
        [
          "star_ring.gif",
          "Star Ring"
        ],
        [
          "mythril-leather.png",
          "Mythril Leather"
        ],
        [
          "death_ring.png",
          "Death Ring"
        ],
        [
          "30oz.png",
          "30Oz"
        ],
        [
          "blister_ring.png",
          "Blister Ring"
        ],
        [
          "inferno-leather.png",
          "Inferno Leather"
        ],
        [
          "35oz.png",
          "35Oz"
        ],
        [
          "butterfly_ring.png",
          "Butterfly Ring"
        ],
        [
          "rune_soil.png",
          "Rune Soil"
        ],
        [
          "legendary_stone.png",
          "Legendary Stone"
        ],
        [
          "soul_soil.png",
          "Soul Soil"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Jewelcrafting should focus on current crafting station usage, recipe complexity energy costs, rare materials, and enhancement-related outputs where applicable.</p><p>Add placeholders for current jewelcrafting station UI and modern recipe example.</p><p> <p> Jewelcrafting is used to craft various gems, jewelery and more from ores, leathers, planks and blood vials that you get through <a class=\"prof-wiki-link ut-link\">Gathering Professions</a>. Each crafting profession of archlight will <a class=\"prof-wiki-link ut-link\">Enhance</a> your character in a certain way when you reach higher level. Additionaly to Enhancement, you will get <a class=\"prof-wiki-link ut-link\">Stat Bonus</a> that will significantly boost your stats once maxed. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1. When you get your first ores from <a class=\"prof-wiki-link ut-link\">Mining</a> you should head to -1 floor in DP building, to <strong>Daily Jewelcrafting</strong> npc.<br/> To begin crafting, simply right-click the <strong>bellow</strong> and select the item you need.<br/> Remember to ask the npc about the <a class=\"prof-wiki-link ut-link\">daily task</a>, as it will significantly boost your progress. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/jewelcrafting_npc.png\"/> </p> <p> 2. When you craft an item for the first time it's marked with exclamation mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/exclamation_mark.png\"/> next to it's name and it will yield 400% experience. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Daily task",
          "html": "<p> <p> Once a day you can visit <strong>Daily Jewelcrafting</strong> npc and ask him for a task. He will ask you to craft something for him, and depending on your level it might be anything from regular gems To charged and overcharged gems. Every item that is currently needed for your daily task will be marked with question mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> next to it's name. You will keep this item and additionally you will get <strong>200%</strong> experience for that craft. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Enhancements",
          "html": "<p> <p> Enhancement for <strong>Jewelcrafting</strong> is increasing your <strong>Gem Effectiveness</strong>. Once you reach certain thresholds new crafting option called <strong>Enhancements</strong> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_option.png\"/>will appear available. Only then you will be able to pay and obtain your precious title. This bonus is not additive, on 95 level of jewelcrafting you will have +25% to Gem Effectiveness. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_window.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_buying_window.png\"/> </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Title<br/>Level</th> <th>Apprentice<br/>60</th> <th>Skilled<br/>70</th> <th>Expert<br/>80</th> <th>Artisan<br/>90</th> <th>Masterclass<br/>95</th> </tr> </thead> <tbody> <tr> <td>Gem<br/>effectiveness</td> <td>5%</td> <td>10%</td> <td>15%</td> <td>20%</td> <td>25%</td> </tr> <tr> <td>Cost</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>300 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        },
        {
          "title": "Stat Bonus",
          "html": "<p> <p> When you reach certain tresholds with jewelcrafting you will get bonus <strong>Rune Effectiveness</strong> stats. <br/> Unlike Enhancements, bonuses are applied automatically once you reach required level. (Bonus levels from cosmetics count towards these bonuses) </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Jewelcrafting<br/>level</th> <th>Bonus</th> </tr> </thead> <tbody> <tr> <td>20</td> <td>+1</td> </tr> <tr> <td>40</td> <td>+2</td> </tr> <tr> <td>60</td> <td>+3</td> </tr> <tr> <td>70</td> <td>+4</td> </tr> <tr> <td>80</td> <td>+5</td> </tr> <tr> <td>90</td> <td>+7</td> </tr> <tr> <td>100</td> <td>+10</td> </tr> <tr> <td>110</td> <td>+15</td> </tr> <tr> <td>120</td> <td>+25</td> </tr> </tbody> </table></div> <p> This bonus isn't additive so on level 120 you will have +25 <strong>Rune Effectiveness</strong>. </p> </p>",
          "tableCount": 1
        },
        {
          "title": "Crafting Recipes",
          "html": "<h3 class=\"sectionedit7\">Gems</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>jewelcrafting</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cloud-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forest-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mountain-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/order-gem.gif\"/> </p> 1 Basic Gem </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>5 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>5 Coal Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-cloud-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-forest-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-inferno-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-mountain-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-ocean-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-order-gem.gif\"/> </p> 1 Charged Gem </td> <td>60</td> <td> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cloud-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forest-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mountain-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ocean-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/order-gem.gif\"/> </p> 2 Basic Gem of the same type<br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/supercharged_magnet.gif\"/>1 Supercharged Magnet</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>6 Archlight Token</span><br/> </td> </tr> <tr> <td> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/overcharged-cloud-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/overcharged-forest-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/overcharged-inferno-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/overcharged-mountain-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/overcharged-ocean-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/overcharged-order-gem.gif\"/> </p> 1 Overcharged Gem </td> <td>95</td> <td> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-cloud-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-forest-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-inferno-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-mountain-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-ocean-gem.gif\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/charged-order-gem.gif\"/> </p> 5 Charged Gem of the same type<br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/supercharged_magnet.gif\"/>2 Supercharged Magnet</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/polished_gem.png\"/> 1 Polished Gem </td> <td>100</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/unpolished_gem.png\"/>1 Unpolished Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/repolishing_oil.png\"/>100 Repolishing Oil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>35 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> The <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/unpolished_gem.png\"/> <strong>Unpolished Gems</strong> are obtained from <strong>Tier 7 Boxes</strong> by killing the <strong>Olympus Gods</strong>.<br/> The same boxes drops <a class=\"prof-wiki-link ut-link\"><p><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/unpolished_gem_shard.png\"/></p></a> <strong>Unpolished Gems Shards</strong> too and by combining 3 you will get a <strong>Unpolished Gem</strong>. </p> <h3 class=\"sectionedit8\">Misc</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>jewelcrafting</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rots.png\"/> 1 Ring of the Sky </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gem_remover.png\"/> 1 Gem Remover </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>300 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit9\">Amulets</h3> <p> <p> <strong>Skill Value</strong> bonus means you get boost to main skill of your vocation. For example <strong>Berserker</strong> will get melee skill, <strong>Sorcerer</strong> will get magic level etc. </p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>jewelcrafting</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon_necklace.png\"/> Dragon Necklace </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>5 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>10 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +6 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/foxtail_amulet.png\"/> Foxtail Amulet </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>10 Copper Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>10 Iron Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> <p>+5 - 10 to Skill Value</p> +0.5% - 1% base HP/MP </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sapphire_amulet.png\"/> Sapphire Amulet </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>10 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>20 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +12 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/amulet_of_theurgy.png\"/> Amulet of Theurgy </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>10 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>10 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> <p>+10 - 18 to Skill Value</p> +1% - 1.5% base HP/MP </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/the_lions_heart.png\"/> The Lions Heart </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>20 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>10 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>20 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +20 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cobra_amulet.png\"/> Cobra Amulet </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>50 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>50 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>5 Archlight Token</span><br/> </td> <td> <p>+18 - 22 to Skill Value</p> +1.5% - 2.5% base HP/MP </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/jade_amulet.png\"/> Jade Amulet </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>150 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>150 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>100 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +25 to Skill Value </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit10\">Rings</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>jewelcrafting</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/hornet_ring.png\"/> Hornet Ring </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowinlog.png\"/>10 Glowing Log</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>10 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>10 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> <p>+4% to Resistance</p> +1% to Monster Essence Find </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_ring.png\"/> Gold Ring </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>50 Gold Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/25oz.png\"/>20 25oz Vial of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>30 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> </td> <td> <p>+4% to Resistance</p> +3% to Monster Essence Find </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/star_ring.gif\"/> Star Ring </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>20 Mythril Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>30 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>30 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Token</span><br/> </td> <td> <p>+3% - 5% to Resistance</p> +3% to Monster Essence Find </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/death_ring.png\"/> Death Ring </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>50 Soul Plank</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/30oz.png\"/>20 30oz Vial of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Token</span><br/> </td> <td> <p>+6% to Resistance</p> +2% to Monster Essence Find </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blister_ring.png\"/> Blister Ring </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>150 Inferno Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/35oz.png\"/>150 35oz Vial of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>75 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>20 Archlight Token</span><br/> </td> <td> <p>+5% - 7% to Resistance</p> +2% - 4% to Monster Essence Find </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/butterfly_ring.png\"/> Butterfly Ring </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>150 Dragon Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>150 Mythril Ingot</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>100 Mythril Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>60 Archlight Token</span><br/> </td> <td> <p>+8% to Resistance</p> +5% to Monster Essence Find </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit11\">Transmuting</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>jewelcrafting</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td colspan=\"3\"><strong>Rookie Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> Rune Soil </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>3 Legendary Stone</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/> Soul Soil </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>3 Legendary Stone</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td colspan=\"3\"><strong>Intermediate Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> Rune Soil </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>2 Legendary Stone</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/> Soul Soil </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>2 Legendary Stone</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td colspan=\"3\"><strong>Expert Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> Rune Soil </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>1 Legendary Stone</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/> Soul Soil </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/>1 Legendary Stone</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 5
        }
      ],
      "tableCount": 7
    },
    {
      "id": "tanning",
      "group": "crafting",
      "role": "Leathers, backpacks, decorations",
      "energy": "Complex leather crafts can consume energy and crafting time.",
      "value": "Backpacks, beds, dolls, decorations, Movement Speed and Attack Speed bonuses, Daily recipes, tool upgrades, material sorting",
      "icon": "🧵",
      "name": "Tanning",
      "source": "tanning.html",
      "lead": "Tanning converts skin scraps into leather materials used by multiple professions and progression crafts.",
      "media": [
        [
          "tanning_npc.png",
          "Tanning Npc"
        ],
        [
          "exclamation_mark.png",
          "Exclamation Mark"
        ],
        [
          "help_icon.png",
          "Help Icon"
        ],
        [
          "enhancement_crafting_option.png",
          "Enhancement Crafting Option"
        ],
        [
          "enhancement_crafting_window.png",
          "Enhancement Crafting Window"
        ],
        [
          "enhancement_buying_window.png",
          "Enhancement Buying Window"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "fur-backpack.png",
          "Fur Backpack"
        ],
        [
          "light-leather.png",
          "Light Leather"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "camouflage-backpack.png",
          "Camouflage Backpack"
        ],
        [
          "heavy-leather.png",
          "Heavy Leather"
        ],
        [
          "brocade-backpack.png",
          "Brocade Backpack"
        ],
        [
          "glooth-backpack.png",
          "Glooth Backpack"
        ],
        [
          "glowing-leather.png",
          "Glowing Leather"
        ],
        [
          "gold-leather.png",
          "Gold Leather"
        ],
        [
          "deepling-backpack.png",
          "Deepling Backpack"
        ],
        [
          "aged-leather.png",
          "Aged Leather"
        ],
        [
          "expedition-backpack.png",
          "Expedition Backpack"
        ],
        [
          "wolf-backpack.png",
          "Wolf Backpack"
        ],
        [
          "pannier-backpack.png",
          "Pannier Backpack"
        ],
        [
          "mushroom-backpack.png",
          "Mushroom Backpack"
        ],
        [
          "minotaur-backpack.png",
          "Minotaur Backpack"
        ],
        [
          "crown-backpack.png",
          "Crown Backpack"
        ],
        [
          "dragon-backpack.png",
          "Dragon Backpack"
        ],
        [
          "mythril-leather.png",
          "Mythril Leather"
        ],
        [
          "demon-backpack.png",
          "Demon Backpack"
        ],
        [
          "inferno-leather.png",
          "Inferno Leather"
        ],
        [
          "crystal-backpack.png",
          "Crystal Backpack"
        ],
        [
          "green-bed.png",
          "Green Bed"
        ],
        [
          "yellow-bed.png",
          "Yellow Bed"
        ],
        [
          "red-bed.png",
          "Red Bed"
        ],
        [
          "royal-bed.png",
          "Royal Bed"
        ],
        [
          "annihilation_bear.png",
          "Annihilation Bear"
        ],
        [
          "midnight_panther_doll.png",
          "Midnight Panther Doll"
        ],
        [
          "mountain-gem.gif",
          "Mountain Gem"
        ],
        [
          "black_knight_doll.png",
          "Black Knight Doll"
        ],
        [
          "little_adventurer_doll.gif",
          "Little Adventurer Doll"
        ],
        [
          "dread_doll.gif",
          "Dread Doll"
        ],
        [
          "nightmare_doll.png",
          "Nightmare Doll"
        ],
        [
          "light-scrap.png",
          "Light Scrap"
        ],
        [
          "heavy-scrap.png",
          "Heavy Scrap"
        ],
        [
          "gold-scrap.png",
          "Gold Scrap"
        ],
        [
          "glowing-scrap.png",
          "Glowing Scrap"
        ],
        [
          "aged-scrap.png",
          "Aged Scrap"
        ],
        [
          "mythril-scrap.png",
          "Mythril Scrap"
        ],
        [
          "inferno-scrap.png",
          "Inferno Scrap"
        ],
        [
          "cinnabar-leather.png",
          "Cinnabar Leather"
        ],
        [
          "cinnabar-scrap.png",
          "Cinnabar Scrap"
        ],
        [
          "fishing_net.png",
          "Fishing Net"
        ],
        [
          "gold_points_doll.png",
          "Gold Points Doll"
        ],
        [
          "promotion_token.png",
          "Promotion Token"
        ],
        [
          "fountain_of_life-trinket.gif",
          "Fountain Of Life Trinket"
        ],
        [
          "soulbound_exchange_token.png",
          "Soulbound Exchange Token"
        ],
        [
          "forgestone-trinket.gif",
          "Forgestone Trinket"
        ],
        [
          "hunters-trinket.gif",
          "Hunters Trinket"
        ],
        [
          "journeymans-trinket.gif",
          "Journeymans Trinket"
        ],
        [
          "spiritseer-trinket.gif",
          "Spiritseer Trinket"
        ],
        [
          "craftsman_backpack.gif",
          "Craftsman Backpack"
        ],
        [
          "gatherers_backpack.gif",
          "Gatherers Backpack"
        ],
        [
          "soulhunter_backpack.gif",
          "Soulhunter Backpack"
        ],
        [
          "brocade_tapestry.png",
          "Brocade Tapestry"
        ],
        [
          "sword_tapestry.png",
          "Sword Tapestry"
        ],
        [
          "lordly_tapestry.png",
          "Lordly Tapestry"
        ],
        [
          "psychedelic_tapestry.png",
          "Psychedelic Tapestry"
        ],
        [
          "rift_tapestry.png",
          "Rift Tapestry"
        ],
        [
          "all-seeing_tapestry.png",
          "All Seeing Tapestry"
        ],
        [
          "menacing_tapestry.png",
          "Menacing Tapestry"
        ],
        [
          "demonic_tapestry.png",
          "Demonic Tapestry"
        ],
        [
          "rune_soil.png",
          "Rune Soil"
        ],
        [
          "soul_soil.png",
          "Soul Soil"
        ],
        [
          "legendary_stone.png",
          "Legendary Stone"
        ],
        [
          "awakened_soul_stone.png",
          "Awakened Soul Stone"
        ],
        [
          "relic_soul_stone.png",
          "Relic Soul Stone"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Tanning processes skinning materials into leather and related crafting components. Explain the current daily recipe flow, station use, and energy model before old recipe tables.</p><p>Add placeholders for current tanning station UI and daily recipe.</p><p> <p> Tanning is used to craft Backpacks, Beds, Dolls, House Decorations and various other items from leathers that you get through <a class=\"prof-wiki-link ut-link\">Skinning</a>. Each crafting profession of archlight will <a class=\"prof-wiki-link ut-link\">Enhance</a> your character in a certain way when you reach higher level.<br/> Additionaly to Enhancement, you will get <a class=\"prof-wiki-link ut-link\">Stat Bonus</a> that will significantly boost your stats once maxed. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1. When you get your first leather scraps from <a class=\"prof-wiki-link ut-link\">Skinning</a> you should head to -1 floor in DP building, to <strong>Daily Tanning</strong> npc.<br/> To begin crafting, simply right-click the <strong>tanning station</strong> and select the item you need.<br/> Remember to ask the npc about the <a class=\"prof-wiki-link ut-link\">daily task</a>, as it will significantly boost your progress. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/tanning_npc.png\"/> </p> <p> 2. When you craft an item for the first time it's marked with exclamation mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/exclamation_mark.png\"/> next to it's name and it will yield 400% experience. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Daily task",
          "html": "<p> <p> Once a day you can visit <strong>Daily Tanning</strong> npc and ask him for a task.<br/> He will ask you to craft something for him, and depending on your level it might be few glowing or mythril leathers.<br/> Every item that is currently needed for your daily task will be marked with question mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> next to it's name.<br/> You will keep this item and additionally you will get <strong>200%</strong> experience for that craft. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Enhancements",
          "html": "<p> <p> Enhancement from <strong>Tanning</strong> is increasing your <strong>movement speed</strong>. Once you reach certain thresholds new crafting option called <strong>Enhancements</strong> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_option.png\"/> will appear available.<br/> Only then you will be able to pay and obtain your precious title. This bonus is not additive, on 95 level of tanning you will have 30% increased movement speed. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_window.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_buying_window.png\"/> </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Title<br/>Level</th> <th>Apprentice<br/>60</th> <th>Skilled<br/>70</th> <th>Expert<br/>80</th> <th>Artisan<br/>90</th> <th>Masterclass<br/>95</th> </tr> </thead> <tbody> <tr> <td>Movement speed<br/>increase</td> <td>10%</td> <td>15%</td> <td>20%</td> <td>25%</td> <td>30%</td> </tr> <tr> <td>Cost</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>300 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        },
        {
          "title": "Stat Bonus",
          "html": "<p> <p> When you reach certain tresholds with tanning you will get bonus <strong>Attack Speed</strong> stats.<br/> Unlike Enhancements, bonuses are applied automatically once you reach required level. (Bonus levels from cosmetics count towards these bonuses) </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Tanning<br/>level</th> <th>Bonus</th> </tr> </thead> <tbody> <tr> <td>20</td> <td>+1</td> </tr> <tr> <td>40</td> <td>+2</td> </tr> <tr> <td>60</td> <td>+3</td> </tr> <tr> <td>70</td> <td>+4</td> </tr> <tr> <td>80</td> <td>+5</td> </tr> <tr> <td>90</td> <td>+7</td> </tr> <tr> <td>100</td> <td>+10</td> </tr> <tr> <td>110</td> <td>+15</td> </tr> <tr> <td>120</td> <td>+25</td> </tr> </tbody> </table></div> <p> This bonus isn't additive so at level 120 you will have +25 <strong>Attack Speed</strong>. </p> </p>",
          "tableCount": 1
        },
        {
          "title": "Crafting Recipes",
          "html": "<h3 class=\"sectionedit7\">Backpacks</h3> <p> <p> <strong>Skill Value</strong> bonus means you get boost to main skill of your vocation. For example <strong>Berserker</strong> will get melee skill, <strong>Sorcerer</strong> will get magic level etc. </p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>tanning</th> <th>Ingredients</th> <th>Wearing<br/>effect</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/fur-backpack.png\"/> Fur Backpack (vol: 24) </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/light-leather.png\"/>25 Light Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>2 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +2 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/camouflage-backpack.png\"/> Camouflage Backpack (vol: 24) </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/light-leather.png\"/>25 Light Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/heavy-leather.png\"/>10 Heavy Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +3 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/brocade-backpack.png\"/> Brocade Backpack (vol: 24) </td> <td>25</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/heavy-leather.png\"/>25 Heavy Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>5 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +4 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glooth-backpack.png\"/> Glooth Backpack (vol: 32) </td> <td>45</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>25 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>10 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>10 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +9 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/deepling-backpack.png\"/> Deepling Backpack (vol: 32) </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>50 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>50 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>50 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>20 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 <a class=\"prof-wiki-link ut-link\">Fishing</a> skill </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/expedition-backpack.png\"/> Expedition Backpack (vol: 32) </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>50 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>50 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>50 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>20 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 <a class=\"prof-wiki-link ut-link\">Mining</a> skill </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/wolf-backpack.png\"/> Wolf Backpack (vol: 32) </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>50 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>50 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>50 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>20 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 <a class=\"prof-wiki-link ut-link\">Skinning</a> skill </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/pannier-backpack.png\"/> Pannier Backpack (vol: 32) </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>50 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>50 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>50 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>20 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 <a class=\"prof-wiki-link ut-link\">Woodcutting</a> skill </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mushroom-backpack.png\"/> Mushroom Backpack (vol: 32) </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>50 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>50 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>50 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>20 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +5 <a class=\"prof-wiki-link ut-link\">Farming</a> skill </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/minotaur-backpack.png\"/> Minotaur Backpack (vol: 28) </td> <td>55</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>35 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>15 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> +7 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/crown-backpack.png\"/> Crown Backpack (vol: 32) </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>50 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Token</span><br/> </td> <td> +9 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragon-backpack.png\"/> Dragon Backpack (vol: 32) </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>50 Mythril Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>300 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>25 Archlight Token</span><br/> </td> <td> +12 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/demon-backpack.png\"/> Demon Backpack (vol: 36) </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>150 Inferno Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>60 Archlight Token</span><br/> </td> <td> +15 to Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/crystal-backpack.png\"/> Crystal Backpack (vol: 40) </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>250 Inferno Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>500 Mythril Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>1 000 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>120 Archlight Token</span><br/> </td> <td> +22 to Skill Value </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit8\">Beds</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>tanning</th> <th>Ingredients per item</th> <th>Stored energy</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/green-bed.png\"/> <a class=\"prof-wiki-link ut-link\">Green Bed Kit</a> </td> <td>55</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/heavy-leather.png\"/>35 Heavy Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>5 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>75 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> </td> <td> 180 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/yellow-bed.png\"/> <a class=\"prof-wiki-link ut-link\">Yellow Bed Kit</a> </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>50 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>225 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Token</span><br/> </td> <td> 240 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/red-bed.png\"/> <a class=\"prof-wiki-link ut-link\">Red Bed Kit</a> </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>50 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>550 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>50 Archlight Token</span><br/> </td> <td> 300 </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/royal-bed.png\"/> <a class=\"prof-wiki-link ut-link\">Royal Bed Kit</a> </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>150 Inferno Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>950 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>100 Archlight Token</span><br/> </td> <td> 360 </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit9\">Dolls</h3> <p> <p> <strong>Skill Value</strong> bonus means you get boost to main skill of your vocation. For example <strong>Berserker</strong> will get melee skill, <strong>Sorcerer</strong> will get magic level etc. </p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>tanning</th> <th>Ingredients</th> <th>Effect (while carrying)</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/annihilation_bear.png\"/> Annihilation Bear Doll </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>35 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/heavy-leather.png\"/>15 Heavy Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>75 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Token</span><br/> </td> <td> +3 Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/midnight_panther_doll.png\"/> Midnight Panther Doll </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>50 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mountain-gem.gif\"/>2 Mountain Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Token</span><br/> </td> <td> +2.5% Movement Speed </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/black_knight_doll.png\"/> Black Knight Doll </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>70 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>550 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Token</span><br/> </td> <td> +5 Skill Value </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/little_adventurer_doll.gif\"/> Little Adventurer Doll </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>100 Mythril Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>950 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Token</span><br/> </td> <td> +10% Gathering Exp </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dread_doll.gif\"/> Dread Doll </td> <td>100</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>150 Inferno Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>1 000 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Token</span><br/> </td> <td> +3% Essence Find </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/nightmare_doll.png\"/> Nightmare Doll </td> <td>100</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>150 Inferno Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>1 000 Crystal Coin</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Token</span><br/> </td> <td> +3% Essence Find </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit10\">Leathers</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>tanning</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/light-leather.png\"/> 5 Light Leather </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/light-scrap.png\"/>10 Light Skin Scrap</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/heavy-leather.png\"/> 5 Heavy Leather </td> <td>5</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/heavy-scrap.png\"/>10 Heavy Skin Scrap</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/> 5 Gold Leather </td> <td>15</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-scrap.png\"/>10 Gold Skin Scrap</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/> 5 Glowing Leather </td> <td>25</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-scrap.png\"/>10 Glowing Skin Scrap</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/> 5 Aged Leather </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-scrap.png\"/>10 Aged Skin Scrap</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/> 5 Mythril Leather </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-scrap.png\"/>10 Mythril Skin Scrap</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/> 5 Inferno Leather </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-scrap.png\"/>10 Inferno Skin Scrap</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cinnabar-leather.png\"/> Cinnabar Leather </td> <td>120</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cinnabar-scrap.png\"/>2 Cinnabar Skin Scrap</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit11\">Misc</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>tanning</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/fishing_net.png\"/> Fishing Net </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>200 Mythril Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>3 000 Crystal Coins</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>35 Archlight Token</span><br/> </td> <td> Catch 2 fish at once. </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit12\">Soulbound exchange</h3> <p> <p> Solbound exchange is different for <strong>Abaldar</strong> because it doesn't use <strong>LAT/Promotion token</strong> system.<br/> If you play on <strong>Abaldar</strong> points from exchange will be automatically added to your account, the doll here is only for demostration purpose.<br/> Soulbound exchange requires tanning level 0 so it's omitted in this table. </p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Rewards on<br/><strong>Abaldar</strong></th> <th>Rewards on<br/><strong>Ildar/Dracona</strong></th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_points_doll.png\"/> 2400 Points </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/promotion_token.png\"/> 5 Promotion Token </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/fountain_of_life-trinket.gif\"/> <p>Fountain of Life Trinket</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soulbound_exchange_token.png\"/> Soulbound Exchange Token </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_points_doll.png\"/> 2400 Points </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/promotion_token.png\"/> 5 Promotion Token </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/forgestone-trinket.gif\"/> <p>Forgestone Trinket</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soulbound_exchange_token.png\"/> Soulbound Exchange Token </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_points_doll.png\"/> 2400 Points </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/promotion_token.png\"/> 5 Promotion Token </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/hunters-trinket.gif\"/> <p>Hunters Trinket</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soulbound_exchange_token.png\"/> Soulbound Exchange Token </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_points_doll.png\"/> 2400 Points </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/promotion_token.png\"/> 5 Promotion Token </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/journeymans-trinket.gif\"/> <p>Journeymans Trinket</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soulbound_exchange_token.png\"/> Soulbound Exchange Token </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_points_doll.png\"/> 2400 Points </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/promotion_token.png\"/> 5 Promotion Token </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spiritseer-trinket.gif\"/> <p>Spiritseer Trinket</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soulbound_exchange_token.png\"/> Soulbound Exchange Token </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_points_doll.png\"/> 2750 Points </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/promotion_token.png\"/> 6 Promotion Token </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/craftsman_backpack.gif\"/> <p>Craftsman Backpck</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soulbound_exchange_token.png\"/> Soulbound Exchange Token </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_points_doll.png\"/> 2750 Points </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/promotion_token.png\"/> 6 Promotion Token </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gatherers_backpack.gif\"/> <p>Gatherers Backpck</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soulbound_exchange_token.png\"/> Soulbound Exchange Token </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold_points_doll.png\"/> 2750 Points </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/promotion_token.png\"/> 6 Promotion Token </td> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soulhunter_backpack.gif\"/> <p>Soulhunter Backpck</p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soulbound_exchange_token.png\"/> Soulbound Exchange Token </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit13\">Tapestries</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>blacksmithing</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/brocade_tapestry.png\"/> Brocade Tapestry </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/heavy-leather.png\"/>20 Heavy Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/light-leather.png\"/>20 Light Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sword_tapestry.png\"/> Sword Tapestry </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>20 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/heavy-leather.png\"/>20 Heavy Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/lordly_tapestry.png\"/> Lordly Tapestry </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>20 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/heavy-leather.png\"/>20 Heavy Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/psychedelic_tapestry.png\"/> Psychedelic Tapestry </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>30 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>20 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rift_tapestry.png\"/> Rift Tapestry </td> <td>45</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>45 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/gold-leather.png\"/>30 Gold Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/all-seeing_tapestry.png\"/> All-Seeing Tapestry </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>50 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>20 Glowing Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/menacing_tapestry.png\"/> Menacing Tapestry </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>50 Mythril Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>30 Aged Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/demonic_tapestry.png\"/> Demonic Tapestry </td> <td>100</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>150 Inferno Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>50 Mythril Leather</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit14\">Transmuting</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>tanning</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td colspan=\"3\"><strong>Rookie Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 1 Rune Soil </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>4 Soul Soil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/> 1 Legendary Stone </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>4 Soul Soil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_soul_stone.png\"/> 1 Awakened Soul Stone </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>6 Soul Soil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td colspan=\"3\"><strong>Intermediate Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 1 Rune Soil </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>3 Soul Soil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/> 1 Legendary Stone </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>3 Soul Soil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_soul_stone.png\"/> 1 Awakened Soul Stone </td> <td>85</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>5 Soul Soil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td colspan=\"3\"><strong>Expert Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rune_soil.png\"/> 1 Rune Soil </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>2 Soul Soil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/legendary_stone.png\"/> 1 Legendary Stone </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>2 Soul Soil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/awakened_soul_stone.png\"/> 1 Awakened Soul Stone </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>4 Soul Soil</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td colspan=\"3\"><strong>Relic Stone Transmutions</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/relic_soul_stone.png\"/> 1 Relic Soul Stone </td> <td>110</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_soil.png\"/>4 Awakened Soul Stone</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 8
        }
      ],
      "tableCount": 10
    },
    {
      "id": "woodworking",
      "group": "crafting",
      "role": "Furniture, planks, siege support",
      "energy": "Complex crafts can consume energy and crafting time.",
      "value": "Planks, furniture, decorations, siege support, Cooldown Reduction bonus, Daily recipes, tool upgrades, material sorting",
      "icon": "🪵",
      "name": "Woodworking",
      "source": "woodworking.html",
      "lead": "Woodworking creates planks, furniture, beds, traps, walls, and construction tools. Craftsman rank can improve furniture bonuses and bed energy values.",
      "media": [
        [
          "woodworking_npc.png",
          "Woodworking Npc"
        ],
        [
          "exclamation_mark.png",
          "Exclamation Mark"
        ],
        [
          "help_icon.png",
          "Help Icon"
        ],
        [
          "enhancement_crafting_option.png",
          "Enhancement Crafting Option"
        ],
        [
          "enhancement_crafting_window.png",
          "Enhancement Crafting Window"
        ],
        [
          "enhancement_buying_window.png",
          "Enhancement Buying Window"
        ],
        [
          "cc.png",
          "Cc"
        ],
        [
          "bejeweled_telescope.png",
          "Bejeweled Telescope"
        ],
        [
          "glowing_plank.png",
          "Glowing Plank"
        ],
        [
          "goldingot.png",
          "Goldingot"
        ],
        [
          "cloud-gem.gif",
          "Cloud Gem"
        ],
        [
          "at.png",
          "At"
        ],
        [
          "hamster_in_a_wheel.png",
          "Hamster In A Wheel"
        ],
        [
          "spirit_plank.png",
          "Spirit Plank"
        ],
        [
          "stuffed_bear_display.png",
          "Stuffed Bear Display"
        ],
        [
          "aged-leather.png",
          "Aged Leather"
        ],
        [
          "bear_paw.png",
          "Bear Paw"
        ],
        [
          "pinata.png",
          "Pinata"
        ],
        [
          "soul_plank.png",
          "Soul Plank"
        ],
        [
          "mythril-leather.png",
          "Mythril Leather"
        ],
        [
          "chest_of_abundance.png",
          "Chest Of Abundance"
        ],
        [
          "inferno-leather.png",
          "Inferno Leather"
        ],
        [
          "dragoningot.png",
          "Dragoningot"
        ],
        [
          "35oz.png",
          "35Oz"
        ],
        [
          "ancient_shrine.png",
          "Ancient Shrine"
        ],
        [
          "cinnabar-leather.png",
          "Cinnabar Leather"
        ],
        [
          "blood_soaked_plank.png",
          "Blood Soaked Plank"
        ],
        [
          "rustic_cabinet.png",
          "Rustic Cabinet"
        ],
        [
          "elder_plank.png",
          "Elder Plank"
        ],
        [
          "ironingot.png",
          "Ironingot"
        ],
        [
          "rustic_chair.png",
          "Rustic Chair"
        ],
        [
          "rustic_table.png",
          "Rustic Table"
        ],
        [
          "rustic_trunk.png",
          "Rustic Trunk"
        ],
        [
          "ferocious_chair.png",
          "Ferocious Chair"
        ],
        [
          "shadowlog.png",
          "Shadowlog"
        ],
        [
          "copperingot.png",
          "Copperingot"
        ],
        [
          "ferocious_table.png",
          "Ferocious Table"
        ],
        [
          "bamboo_drawer.png",
          "Bamboo Drawer"
        ],
        [
          "shadow_plank.png",
          "Shadow Plank"
        ],
        [
          "bamboo_shelf.png",
          "Bamboo Shelf"
        ],
        [
          "verdant_cabinet.png",
          "Verdant Cabinet"
        ],
        [
          "glowinlog.png",
          "Glowinlog"
        ],
        [
          "glowing-leather.png",
          "Glowing Leather"
        ],
        [
          "verdant_chair.png",
          "Verdant Chair"
        ],
        [
          "verdant_table.png",
          "Verdant Table"
        ],
        [
          "verdant_trunk.png",
          "Verdant Trunk"
        ],
        [
          "alchemy_bookstand.gif",
          "Alchemy Bookstand"
        ],
        [
          "blood-soakedlog.png",
          "Blood Soakedlog"
        ],
        [
          "alchemy_cabinet.png",
          "Alchemy Cabinet"
        ],
        [
          "alchemy_chair.png",
          "Alchemy Chair"
        ],
        [
          "alchemy_table.png",
          "Alchemy Table"
        ],
        [
          "25oz.png",
          "25Oz"
        ],
        [
          "comfy_cabinet.png",
          "Comfy Cabinet"
        ],
        [
          "mythrilingot.png",
          "Mythrilingot"
        ],
        [
          "comfy_chair.png",
          "Comfy Chair"
        ],
        [
          "comfy_chest.png",
          "Comfy Chest"
        ],
        [
          "comfy_table.png",
          "Comfy Table"
        ],
        [
          "vengothic_cabinet.png",
          "Vengothic Cabinet"
        ],
        [
          "vengothic_chair.png",
          "Vengothic Chair"
        ],
        [
          "vengothic_table.png",
          "Vengothic Table"
        ],
        [
          "vengothic_trunk.png",
          "Vengothic Trunk"
        ],
        [
          "ornate_cabinet.png",
          "Ornate Cabinet"
        ],
        [
          "ornate_chair.png",
          "Ornate Chair"
        ],
        [
          "ornate_chest.png",
          "Ornate Chest"
        ],
        [
          "ornate_table.png",
          "Ornate Table"
        ],
        [
          "elderlog.png",
          "Elderlog"
        ],
        [
          "venom_plank.png",
          "Venom Plank"
        ],
        [
          "venomlog.png",
          "Venomlog"
        ],
        [
          "spiritlog.png",
          "Spiritlog"
        ],
        [
          "soullog.png",
          "Soullog"
        ],
        [
          "explosive_keg.png",
          "Explosive Keg"
        ],
        [
          "coalingot.png",
          "Coalingot"
        ],
        [
          "caltrops.png",
          "Caltrops"
        ],
        [
          "spike_trap.png",
          "Spike Trap"
        ],
        [
          "rooting_trap.png",
          "Rooting Trap"
        ],
        [
          "ice_trap.gif",
          "Ice Trap"
        ],
        [
          "fire_trap.gif",
          "Fire Trap"
        ],
        [
          "wooden_wall.png",
          "Wooden Wall"
        ],
        [
          "sturdy_wall.png",
          "Sturdy Wall"
        ],
        [
          "reinforced_wall.png",
          "Reinforced Wall"
        ],
        [
          "ballista.png",
          "Ballista"
        ],
        [
          "catapult.png",
          "Catapult"
        ]
      ],
      "sections": [
        {
          "title": "System Overview",
          "html": "<p><strong>Current profession model:</strong> This profession uses the revamped Profession UI, upgradeable tools, energy tracking, material location help, and station access from houses or Guild Islands when available.</p><ul><li>Tool progression is handled by upgrading one profession tool instead of carrying multiple separate tiers.</li><li>Daily progress is based on gaining profession experience, not only crafting one fixed item.</li><li>Higher-tier crafts may use crafting time and energy.</li><li>Missing current screenshots should use image placeholders until live media is captured.</li></ul>",
          "tableCount": 0
        },
        {
          "title": "Overview",
          "html": "<p>Woodworking turns woodcutting output into planks, siege items, traps, walls, and support craftables. Keep old recipe tables but lead with current energy/station/daily recipe flow.</p><p>Add placeholders for current woodworking station UI and upgraded recipe flow.</p><p> <p> Woodworking is used to craft siege weapons that will help you crush your enemies during <a class=\"prof-wiki-link ut-link\">Guild Sieges</a>, furnitures and decorations to decorate your house and boost your stats and finally planks, that are used in woodworking and other <a class=\"prof-wiki-link ut-link\">Crafting Professions</a>. Each crafting profession of archlight will <a class=\"prof-wiki-link ut-link\">Enhance</a> your character in a certain way when you reach higher level. Additionaly to Enhancement, you will get <a class=\"prof-wiki-link ut-link\">Stat Bonus</a> that will significantly boost your stats once maxed. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "How to start",
          "html": "<p> <p> 1. When you get your first logs from <a class=\"prof-wiki-link ut-link\">Woodcutting</a> you should head to -1 floor in DP building, to <strong>Daily Woodworking</strong> npc.<br/> To begin crafting, simply right-click the <strong>saw</strong> and select the item you need.<br/> Remember to ask the npc about the <a class=\"prof-wiki-link ut-link\">daily task</a>, as it will significantly boost your progress. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/woodworking_npc.png\"/> </p> <p> 2. When you craft an item for the first time it's marked with exclamation mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/exclamation_mark.png\"/> next to it's name and it will yield 400% experience. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Daily task",
          "html": "<p> <p> Once a day you can visit <strong>Daily Woodworking</strong> npc and ask him for a task. He will ask you to craft something for him, and depending on your level it might be anything from elder to soul planks. Every item that is currently needed for your daily task will be marked with question mark <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/help_icon.png\"/> next to it's name. You will keep this item and additionally you will get <strong>200%</strong> experience for that craft. </p> </p>",
          "tableCount": 0
        },
        {
          "title": "Enhancements",
          "html": "<p> <p> Enhancement for <strong>Woodworking</strong> is increasing your <strong>attack spell cooldown reduction</strong>. Once you reach certain thresholds new crafting option called <strong>Enhancements</strong> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_option.png\"/> will appear available. Only then you will be able to pay and obtain your precious title. This bonus is not additive, on 95 level of woodworking you will have +10% attack spell cooldown reduction. </p> <p> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_crafting_window.png\"/> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/enhancement_buying_window.png\"/> </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Title<br/>Level</th> <th>Apprentice<br/>60</th> <th>Skilled<br/>70</th> <th>Expert<br/>80</th> <th>Artisan<br/>90</th> <th>Masterclass<br/>95</th> </tr> </thead> <tbody> <tr> <td>Cooldown Reduction</td> <td>2%</td> <td>4%</td> <td>6%</td> <td>8%</td> <td>10%</td> </tr> <tr> <td>Cost</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>25 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>50 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>100 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>300 Crystal Coins</td> <td><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cc.png\"/>500 Crystal Coins</td> </tr> </tbody> </table></div> </p>",
          "tableCount": 1
        },
        {
          "title": "Stat Bonus",
          "html": "<p> <p> When you reach certain tresholds with woodworking you will get bonus <strong>Cooldown Reduction</strong> stats. <br/> Unlike Enhancements, bonuses are applied automatically once you reach required level. (Bonus levels from cosmetics count towards these bonuses) </p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Woodworking<br/>level</th> <th>Bonus</th> </tr> </thead> <tbody> <tr> <td>20</td> <td>+1</td> </tr> <tr> <td>40</td> <td>+2</td> </tr> <tr> <td>60</td> <td>+3</td> </tr> <tr> <td>70</td> <td>+4</td> </tr> <tr> <td>80</td> <td>+5</td> </tr> <tr> <td>90</td> <td>+7</td> </tr> <tr> <td>100</td> <td>+10</td> </tr> <tr> <td>110</td> <td>+15</td> </tr> <tr> <td>120</td> <td>+25</td> </tr> </tbody> </table></div> <p> This bonus isn't additive so at level 120 you will have +25 <strong>Cooldown Reduction</strong>. </p> </p>",
          "tableCount": 1
        },
        {
          "title": "Crafting Recipes",
          "html": "<p> <p> Furniture buffs <strong>do not stack</strong> and only the highest bonus is active at a time. For example if you have used ancient shrine to get +10 to all stats, you can't use bejeweled telescope to further buff your prosperity. All furnitures have 24 hours cooldown before they can be used again. <strong>Buff is active for the same period and does not disappear upon death.</strong> </p> </p> <h3 class=\"sectionedit7\">Decorations</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>woodworking</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/bejeweled_telescope.png\"/> Bejeweled Telescope </td> <td>25</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing_plank.png\"/>50 Glowing Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>50 Gold Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cloud-gem.gif\"/> 1 Cloud Gem</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> <td> +5 to Prosperity </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/hamster_in_a_wheel.png\"/> Hamster In a Wheel </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>10 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/carrot.gif\"/>100 Carrots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Token</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/stuffed_bear_display.png\"/> Stuffed Bear Display </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>50 Aged Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>50 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/bear_paw.png\"/> 10 Bear Paws</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>12 Archlight Token</span><br/> </td> <td> +5 to Vitality </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/pinata.png\"/> Pinata </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>10 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>10 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythril-leather.png\"/>10 Mythril Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>10 Aged Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Token</span><br/> </td> <td> <p> You can get 1 - 5 <a class=\"prof-wiki-link ut-link\">Lord Lootbags</a> each time<br/> that you open it. It can be opened multiple times but has<br/> 25% chance to be destroyed when you use it. </p> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/chest_of_abundance.png\"/> Chest Of Abundance </td> <td>100</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>100 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>100 Inferno Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/35oz.png\"/>10 35oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>40 Archlight Token</span><br/> </td> <td> +10 to Luck </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ancient_shrine.png\"/> Ancient Shrine </td> <td>120</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/cinnabar-leather.png\"/>15 Cinnabar Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>500 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>500 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood_soaked_plank.png\"/>500 Blood-Soaked Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>100 Dragon Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>500 Gold Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2500 Archlight Token</span><br/> </td> <td> <strong>+10 to All Stats</strong> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit8\">Furniture</h3> <p> <p> Each set has same amount of ingredients required for each item. </p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>woodworking</th> <th>Ingredients</th> <th>Effect</th> </tr> </thead> <tbody> <tr> <td colspan=\"4\"><strong>Rustic</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rustic_cabinet.png\"/> Rustic Cabinet </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/elder_plank.png\"/>50 Elder Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>40 Iron Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rustic_chair.png\"/> Rustic Chair </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/elder_plank.png\"/>25 Elder Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>20 Iron Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rustic_table.png\"/> Rustic Table </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/elder_plank.png\"/>50 Elder Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>15 Iron Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rustic_trunk.png\"/> Rustic Trunk </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/elder_plank.png\"/>60 Elder Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>20 Iron Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> None </td> </tr> <tr> <td colspan=\"4\"><strong>Ferocious</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ferocious_chair.png\"/> Ferocious Chair </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shadowlog.png\"/>10 Shadow Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>25 Copper Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ferocious_table.png\"/> Ferocious Table </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shadowlog.png\"/>10 Shadow Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>50 Copper Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td colspan=\"4\"><strong>Bamboo</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/bamboo_drawer.png\"/> Bamboo Drawer </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shadow_plank.png\"/>30 Shadow Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>30 Copper Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/bamboo_shelf.png\"/> Bamboo Shelf </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shadow_plank.png\"/>20 Shadow Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>50 Copper Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td colspan=\"4\"><strong>Verdant</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/verdant_cabinet.png\"/> Verdant Cabinet </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowinlog.png\"/>50 Glowing Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>40 Glowing Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/verdant_chair.png\"/> Verdant Chair </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowinlog.png\"/>25 Glowing Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>20 Glowing Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/verdant_table.png\"/> Verdant Table </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowinlog.png\"/>50 Glowing Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>15 Glowing Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/verdant_trunk.png\"/> Verdant Trunk </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowinlog.png\"/>60 Glowing Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing-leather.png\"/>20 Glowing Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>3 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td colspan=\"4\"><strong>Alchemy</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/alchemy_bookstand.gif\"/> Alchemy Bookstand </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood-soakedlog.png\"/>50 Blood-Soaked Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>20 Gold Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +5 to Brewmastery </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/alchemy_cabinet.png\"/> Alchemy Cabinet </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood-soakedlog.png\"/>50 Blood-Soaked Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>40 Gold Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +5 to Brewmastery </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/alchemy_chair.png\"/> Alchemy Chair </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood-soakedlog.png\"/>25 Blood-Soaked Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/goldingot.png\"/>20 Gold Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +5 to Brewmastery </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/alchemy_table.png\"/> Alchemy Table </td> <td>50</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood-soakedlog.png\"/>50 Blood-Soaked Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/25oz.png\"/>15 25oz Vials of Blood</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> +5 to Brewmastery </td> </tr> <tr> <td colspan=\"4\"><strong>Comfy</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/comfy_cabinet.png\"/> Comfy Cabinet </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>50 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>40 Mythril Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/comfy_chair.png\"/> Comfy Chair </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>25 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>20 Mythril Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/comfy_chest.png\"/> Comfy Chest </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>50 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>15 Mythril Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/comfy_table.png\"/> Comfy Table </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>60 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>20 Mythril Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>8 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td colspan=\"4\"><strong>Vengothic</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/vengothic_cabinet.png\"/> Vengothic Cabinet </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>50 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>40 Aged Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/vengothic_chair.png\"/> Vengothic Chair </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>25 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>20 Aged Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/vengothic_table.png\"/> Vengothic Table </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>50 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>15 Aged Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/vengothic_trunk.png\"/> Vengothic Trunk </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>60 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/aged-leather.png\"/>20 Aged Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td colspan=\"4\"><strong>Ornate</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ornate_cabinet.png\"/> Ornate Cabinet </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>50 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>50 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>40 Inferno Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>15 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ornate_chair.png\"/> Ornate Chair </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>25 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>25 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>20 Inferno Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>15 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ornate_chest.png\"/> Ornate Chest </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>60 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>60 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>20 Inferno Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>15 Archlight Tokens</span><br/> </td> <td> None </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ornate_table.png\"/> Ornate Table </td> <td>80</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>50 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>50 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/inferno-leather.png\"/>15 Inferno Leathers</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>15 Archlight Tokens</span><br/> </td> <td> None </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit9\">Planks</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Item</th> <th>Required<br/>woodworking</th> <th>Ingredients</th> </tr> </thead> <tbody> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/elder_plank.png\"/> 5 Elder Planks </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/elderlog.png\"/>10 Elder Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/venom_plank.png\"/> 5 Venom Planks </td> <td>0</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/venomlog.png\"/>10 Venom Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shadow_plank.png\"/> 5 Shadow Planks </td> <td>10</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shadowlog.png\"/>10 Shadow Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing_plank.png\"/> 5 Glowing Planks </td> <td>20</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowinlog.png\"/>10 Glowing Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood_soaked_plank.png\"/> 5 Blood-soaked Planks </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood-soakedlog.png\"/>10 Blood-soaked Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/> 5 Spirit Planks </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spiritlog.png\"/>10 Spirit Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/> 5 Soul Planks </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soullog.png\"/>10 Soul Logs</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> </tr> </tbody> </table></div> </p> <h3 class=\"sectionedit10\">Siege Items</h3> <p> <p>[  ]</p> <div class=\"ut-table-wrap prof-table-shell\"><table class=\"ut-table prof-source-table\"> <thead> <tr> <th>Name</th> <th>Required<br/>woodworking</th> <th>Ingredients</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td colspan=\"4\"><strong>Explosives</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/explosive_keg.png\"/> Exploding Keg </td> <td>35</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood_soaked_plank.png\"/>10 Blood-soaked Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing_plank.png\"/>5 Glowing Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>20 Coal Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> <p> When used on the ground, it will place a keg, that will explode<br/> after 5 seconds dealing large amount of damage. </p> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/explosive_keg.png\"/> Exploding Barrel </td> <td>75</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>10 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>5 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>50 Coal Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> <p> It has greater area and damage than Exploding Keg. </p> </td> </tr> <tr> <td colspan=\"4\"><strong>Traps</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/caltrops.png\"/> Caltrops </td> <td>25</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/elder_plank.png\"/>15 Elder Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/venom_plank.png\"/>10 Venom Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ironingot.png\"/>10 Iron Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> <p> Constructs caltrops that deal a moderate amount<br/> of damage when stepped on. </p> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spike_trap.png\"/> Spike Trap </td> <td>40</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shadow_plank.png\"/>25 Shadow Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/copperingot.png\"/>30 Copper Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> <p> Constructs spike trap that deal a large amount<br/> of damage when stepped on. </p> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/rooting_trap.png\"/> Rooting Trap </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>20 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>10 Dragon Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> <p> Constructs rooting trap that snares<br/> all enemies in an area. </p> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ice_trap.gif\"/> Ice Trap </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood_soaked_plank.png\"/>10 Blood-soaked Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing_plank.png\"/>20 Glowing Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>10 Mythril Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> <p> Constructs ice trap that slows all enemies<br/> in an area. </p> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/fire_trap.gif\"/> Fire Trap </td> <td>70</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood_soaked_plank.png\"/>10 Blood-soaked Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing_plank.png\"/>20 Glowing Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>20 Coal Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> <p> Constructs fire trap that burns all enemies<br/> in an area. </p> </td> </tr> <tr> <td colspan=\"4\"><strong>Walls</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/wooden_wall.png\"/> Woodden Wall </td> <td>30</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/shadow_plank.png\"/>10 Shadow Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/venom_plank.png\"/>20 Venom Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>1 Archlight Token</span><br/> </td> <td> <p> Constructs a fence with small amount of health. </p> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/sturdy_wall.png\"/> Sturdy Wall </td> <td>60</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood_soaked_plank.png\"/>10 Blood-soaked Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/glowing_plank.png\"/>20 Glowing Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> <p> Constructs a fence with moderate amount of health. </p> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/reinforced_wall.png\"/> Reinforced Wall </td> <td>90</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/soul_plank.png\"/>10 Soul Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>20 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>20 Dragon Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/mythrilingot.png\"/>10 Mythril Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>4 Archlight Tokens</span><br/> </td> <td> <p> Constructs a fence with large amount of health. </p> </td> </tr> <tr> <td colspan=\"4\"><strong>Weapons</strong></td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/ballista.png\"/> Ballista </td> <td>65</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/blood_soaked_plank.png\"/>20 Blood-soaked Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/coalingot.png\"/>30 Coal Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>2 Archlight Tokens</span><br/> </td> <td> <p> Once placed, it will attack random enemies dealing<br/> moderate amount of damage until it is destroyed. </p> </td> </tr> <tr> <td> <img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/catapult.png\"/> Catapult </td> <td>95</td> <td> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/spirit_plank.png\"/>20 Spirit Planks</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/dragoningot.png\"/>30 Dragon Ingots</span><br/> <span><img alt=\"\" class=\"prof-dump-img\" loading=\"lazy\" src=\"professions-media/at.png\"/>10 Archlight Tokens</span><br/> </td> <td> <p> Once placed, it can be used create 4x4 explosion<br/> that deals significant amount of damage. </p> </td> </tr> </tbody> </table></div> </p>",
          "tableCount": 4
        }
      ],
      "tableCount": 6
    }
  ],};
