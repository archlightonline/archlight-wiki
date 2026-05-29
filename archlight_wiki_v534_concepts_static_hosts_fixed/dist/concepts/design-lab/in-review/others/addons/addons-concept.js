/* Addons concept rebuilt from scratch.
   Scope: concepts/design-lab/in-review/others/addons only. Cosmetics are grouped by their actual type, not by update source. */
(function(){
  const MEDIA_BASE = '../../../../legacy-concepts/addons/addons-media/';
  const CATEGORIES = [
  {
    "id": "outfits",
    "name": "Outfits & Outfit Addons",
    "icon": "🧥",
    "description": "Character outfits and outfit-addon unlocks, grouped as appearance cosmetics with their unlock route shown on each card.",
    "items": [
      {
        "image": "afflicted.gif",
        "name": "Afflicted",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Cooking",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+2 Cooking"
        ],
        "bonusKind": "profession",
        "searchText": "Afflicted T2 10    +2 Cooking  Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "arcane_rambler_outfit.gif",
        "name": "Arcane Rambler",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Arcane Rambler T4 25  1.5    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "ashen_sorcerer.gif",
        "name": "Ashen Sorecerer",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Can be obtained by Completing Ashen Questline.",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Ashen Sorecerer T3 20 8     Can be obtained by Completing Ashen Questline.",
        "sourceLabel": "Quest",
        "acquisition": "Ashen questline reward.",
        "sourceChips": [
          "Quest"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "assassin.gif",
        "name": "Assassin",
        "tier": "T2",
        "power": "10",
        "attackPower": "4",
        "hpMp": "",
        "source": "Can be purchased from Cosmetic Shop NPC: | Dragon Eye (1 Cosmetic Token ).",
        "stats": [
          "Power 10",
          "+4 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Assassin T2 10 4     Can be purchased from Cosmetic Shop NPC: | Dragon Eye (1 Cosmetic Token ).",
        "sourceLabel": "Store",
        "acquisition": "Cosmetic Shop NPC.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "barbarian.gif",
        "name": "Barbarian",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Woodcutting",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from Cosmetic Shop NPC: | Dragon Eye (1 Cosmetic Token ).",
        "stats": [
          "Power 10",
          "+2 Woodcutting"
        ],
        "bonusKind": "profession",
        "searchText": "Barbarian T2 10    +2 Woodcutting  Can be purchased from Cosmetic Shop NPC: | Dragon Eye (1 Cosmetic Token ).",
        "sourceLabel": "Store",
        "acquisition": "Cosmetic Shop NPC.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "beastmaster.gif",
        "name": "Beastmaster",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Farming",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+2 Farming"
        ],
        "bonusKind": "profession",
        "searchText": "Beastmaster T2 10    +2 Farming  Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "beggar.gif",
        "name": "Beggar",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from The Seamstress: | 1st Addon (60 Minotaur Leathers, 40 Heaven Blossoms, 20 Brown Piece of Clothes, 20 Bat Wings), | 2nd Addon (60 Ape Fur, 4 Crystal Coins). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Beggar T1 5  0.2    Can be purchased from The Seamstress: | 1st Addon (60 Minotaur Leathers, 40 Heaven Blossoms, 20 Brown Piece of Clothes, 20 Bat Wings), | 2nd Addon (60 Ape Fur, 4 Crystal Coins). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "black_sheep_outfit.gif",
        "name": "Black Sheep",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Black Sheep T4 25  1.5    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "brotherhood.gif",
        "name": "Brotherhood",
        "tier": "T1",
        "power": "5",
        "attackPower": "2",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress: | 1st Addon (1200 Demonic Essences), | 2nd Addon (1200 Demonic Essences). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+2 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Brotherhood T1 5 2     Can be purchased from The Seamstress: | 1st Addon (1200 Demonic Essences), | 2nd Addon (1200 Demonic Essences). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "Can be purchased from The Seamstress: · 1st Addon (1200 Demonic Essences), · 2nd Addon (1200 Demonic Essences). · or using the Addon Doll bought from in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "bugknight.gif",
        "name": "Bug Knight",
        "tier": "T5",
        "power": "40",
        "attackPower": "18",
        "hpMp": "",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 40",
          "+18 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Bug Knight T5 40 18     Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "cakehead_warrior_outfit.gif",
        "name": "Cake Knight Outfit",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Cake Knight Outfit T4 25  1.5    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "cave_explorer.gif",
        "name": "Cave Explorer",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Mining",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+2 Mining"
        ],
        "bonusKind": "profession",
        "searchText": "Cave Explorer T2 10    +2 Mining  Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "ceremonial_garb.gif",
        "name": "Cerimonial Garb",
        "tier": "T2",
        "power": "10",
        "attackPower": "",
        "hpMp": "0.5",
        "source": "Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon).",
        "stats": [
          "Power 10",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Cerimonial Garb T2 10  0.5    Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon).",
        "sourceLabel": "Seamstress",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "outfit_champion_male.gif",
        "name": "Champion",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Can be purchased from the PvP Trader (750 PvP Points ).",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Champion T3 20 8     Can be purchased from the PvP Trader (750 PvP Points ).",
        "acquisition": "Can be purchased from the PvP Trader (750 PvP Points ).",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "chaos_acolyte.gif",
        "name": "Chaos Acolyte",
        "tier": "T2",
        "power": "10",
        "attackPower": "4",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+4 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Chaos Acolyte T2 10 4     Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "citizen.gif",
        "name": "Citizen",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from The Seamstress: | 1st Addon (50 Minotaur Leathers), | 2nd Addon (100 Chicken Feathers, 50 Honeycombs). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Citizen T1 5  0.2    Can be purchased from The Seamstress: | 1st Addon (50 Minotaur Leathers), | 2nd Addon (100 Chicken Feathers, 50 Honeycombs). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "conjurer.gif",
        "name": "Conjurer",
        "tier": "T2",
        "power": "10",
        "attackPower": "",
        "hpMp": "0.5",
        "source": "Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or from Cosmetic Shop NPC: | Dragon Eye (1 Cosmetic Token ). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Conjurer T2 10  0.5    Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or from Cosmetic Shop NPC: | Dragon Eye (1 Cosmetic Token ). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "crimson_death_hunter_outfit_33765_.gif",
        "name": "Crimson Death Hunter Outfit",
        "tier": "T6",
        "power": "50",
        "attackPower": "",
        "hpMp": "3",
        "source": "Legacy DEC 2023 Limited Doorbusters Variation.",
        "stats": [
          "Power 50",
          "+3% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Crimson Death Hunter Outfit T6 50  3    Legacy DEC 2023 Limited Doorbusters Variation.",
        "introduced": "Legacy",
        "sourceLabel": "Pack",
        "acquisition": "Doorbuster pack cosmetic.",
        "sourceChips": [
          "Doorbuster"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "crystal_warlord.gif",
        "name": "Crystal Warlord",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Crystal Warlord T3 20  1    Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "death_herald.gif",
        "name": "Death Harold",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Blacksmithing",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+2 Blacksmithing"
        ],
        "bonusKind": "profession",
        "searchText": "Death Harold T2 10    +2 Blacksmithing  Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "death_hunter_outfit_33769_.gif",
        "name": "Death Hunter Outfit",
        "tier": "T6",
        "power": "50",
        "attackPower": "",
        "hpMp": "3",
        "source": "Legacy DEC 2023 Living Archlight Tokens.",
        "stats": [
          "Power 50",
          "+3% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Death Hunter Outfit T6 50  3    Legacy DEC 2023 Living Archlight Tokens.",
        "introduced": "Legacy",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (2023 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "32138.gif",
        "name": "Death Knight Outfit",
        "tier": "T7",
        "power": "30",
        "attackPower": "15",
        "hpMp": "",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players. | Peddler stock update, 12 Living Archlight Tokens. Placeholder image needed.",
        "stats": [
          "Power 30",
          "+15 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Death Knight Outfit T7 Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players. | Peddler stock update, 12 Living Archlight Tokens. Placeholder image needed. Power 30 +15 Attack Power",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (12 tokens).",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "deepling.gif",
        "name": "Deepling",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Skinning",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+2 Skinning"
        ],
        "bonusKind": "profession",
        "searchText": "Deepling T2 10    +2 Skinning  Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "defensor.gif",
        "name": "Defensor",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Defensor T3 20  1    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "demon.gif",
        "name": "Demon",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Demon T3 20  1    Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "demonunter.gif",
        "name": "Demonhunter",
        "tier": "T2",
        "power": "10",
        "attackPower": "4",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+4 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Demonhunter T2 10 4     Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "northwarden.gif",
        "name": "Diamond Warden",
        "tier": "T2",
        "power": "10",
        "attackPower": "",
        "hpMp": "0.5",
        "source": "Can be purchased from Cosmetic Shop NPC (1 Cosmetic Token ).",
        "stats": [
          "Power 10",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Diamond Warden T2 10  0.5    Can be purchased from Cosmetic Shop NPC (1 Cosmetic Token ).",
        "sourceLabel": "Store",
        "acquisition": "Cosmetic Shop NPC.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Doom Knight Outfit",
        "tier": "Visual",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Abaldar 2025 ArchPass level 100 reward.",
        "stats": [
          "ArchPass reward"
        ],
        "bonusKind": "visual",
        "searchText": "Doom Knight Outfit Visual ArchPass reward Abaldar 2025 ArchPass level 100 reward.",
        "introduced": "Abaldar",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 100 seasonal reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Abaldar visual"
        ]
      },
      {
        "image": "dragonknight.gif",
        "name": "Dragon Knight Outfit",
        "tier": "T4",
        "power": "25",
        "attackPower": "15",
        "hpMp": "",
        "source": "Dragon Combo Pack / Living Token Exchanger, Legacy 2019 Doorbusters. Also listed by the old wiki as a past Dracona/Ildar season reward with Peddler/player-trading availability. 25 total Dragon Combo Pack pool mentioned in the archive.",
        "stats": [
          "Power 25",
          "+15 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Dragon Knight Outfit Dragon Combo Pack Living Token Exchanger Legacy 2019 Doorbusters Dracona Ildar Peddler",
        "introduced": "Legacy 2019",
        "sourceLabel": "LAT",
        "acquisition": "Dragon Combo Pack reward from the Legacy 2019 doorbuster/Living Token archive.",
        "sourceChips": [
          "Pack source",
          "LAT",
          "Doorbuster"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "dragon_slayer_outfit.gif",
        "name": "Dragon Slayer",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Dragon Slayer T4 25  1.5    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "dream_warden.gif",
        "name": "Dream Warden",
        "tier": "T2",
        "power": "10",
        "attackPower": "4",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+4 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Dream Warden T2 10 4     Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "druid.gif",
        "name": "Druid",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from The Seamstress: | 1st Addon (100 Bear Paws, 100 Wolf Paws), | 2nd Addon (100 Demon Dusts). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Druid T1 5  0.2    Can be purchased from The Seamstress: | 1st Addon (100 Bear Paws, 100 Wolf Paws), | 2nd Addon (100 Demon Dusts). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "Can be purchased from The Seamstress: · 1st Addon (100 Bear Paws, 100 Wolf Paws), · 2nd Addon (100 Demon Dusts). · or using the Addon Doll bought from in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "druidic_mage.gif",
        "name": "Druidic Mage",
        "tier": "T5",
        "power": "40",
        "attackPower": "",
        "hpMp": "1.75",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 40",
          "+1.75% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Druidic Mage T5 40  1.75    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "elementalist.gif",
        "name": "Elementalist",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Alchemy",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+2 Alchemy"
        ],
        "bonusKind": "profession",
        "searchText": "Elementalist T2 10    +2 Alchemy  Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "entrepreneur.gif",
        "name": "Entrepreneur",
        "tier": "T2",
        "power": "10",
        "attackPower": "",
        "hpMp": "0.5",
        "source": "Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Entrepreneur T2 10  0.5    Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "evoker.gif",
        "name": "Evoker",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Evoker T3 20  1    Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Fencer Outfits",
        "tier": "T4",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy Minerva’s Uprising race reward for first 40 players to slay Hades.",
        "stats": [
          "T4 Attack Power and Monster Essence",
          "+15 Attack Power",
          "+5% Monster Essence",
          "Power 30"
        ],
        "bonusKind": "attack",
        "searchText": "Fencer Outfits T4 T4 Attack Power and Monster Essence +15 Attack Power +5% Monster Essence Power 30 Legacy Minerva’s Uprising race reward for first 40 players to slay Hades.",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy Minerva’s Uprising race reward for first 40 players to slay Hades.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "festive_outfits.gif",
        "name": "Festive Outfits",
        "tier": "T5",
        "power": "25",
        "attackPower": "15",
        "hpMp": "",
        "source": "Legacy DEC 2023 - All players to obtain 500 achievement points",
        "stats": [
          "Power 25",
          "+15 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Festive Outfits T5 25 15     Legacy DEC 2023 - All players to obtain 500 achievement points",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy DEC 2023 - All players to obtain 500 achievement points.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Field Surgeon Outfit",
        "tier": "T4",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Abaldar 2025 achievement race reward for all players to obtain 500 achievement points.",
        "stats": [
          "T4 Monster Essence"
        ],
        "bonusKind": "essence",
        "searchText": "Field Surgeon Outfit T4 T4 Monster Essence Abaldar 2025 achievement race reward for all players to obtain 500 achievement points.",
        "introduced": "Abaldar",
        "sourceLabel": "Achievement",
        "acquisition": "Abaldar 2025 achievement race reward for all players to obtain 500 achievement points.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Abaldar: visual heirloom",
          "Legacy: cross-server heirloom",
          "Legacy bonus-enabled",
          "Cross-server: Abaldar ↔ Legacy"
        ]
      },
      {
        "image": "",
        "name": "Fiend Slayer Outfit",
        "tier": "T5",
        "power": "",
        "attackPower": "Tier 5",
        "hpMp": "",
        "source": "Achievement reward for obtaining 1000 achievement points. [Heirloom]. Listed as Tier 5 Attack Power. Placeholder image needed.",
        "stats": [
          "Tier 5 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Fiend Slayer Outfit 1000 achievement points Tier 5 Attack Power",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "Achievement",
        "acquisition": "Achievement reward for obtaining 1000 achievement points.",
        "imageStatus": "Placeholder",
        "sourceChips": [],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Fiend Slayer Outfits",
        "tier": "T5",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy 2025 achievement race reward for all players to obtain 1000 achievement points.",
        "stats": [
          "T5 Attack Power"
        ],
        "bonusKind": "attack",
        "searchText": "Fiend Slayer Outfits T5 T5 Attack Power Legacy 2025 achievement race reward for all players to obtain 1000 achievement points.",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy 2025 achievement race reward for all players to obtain 1000 achievement points.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "fluffy_sheep.gif",
        "name": "Fluffy Sheep",
        "tier": "T5",
        "power": "40",
        "attackPower": "18",
        "hpMp": "",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 40",
          "+18 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Fluffy Sheep T5 40 18     Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Formal Dress Outfits",
        "tier": "T4",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy Minerva’s Uprising race reward for all players to obtain 500 achievement points.",
        "stats": [
          "T4 Health/Mana",
          "1.5% HP/MP",
          "Power 30"
        ],
        "bonusKind": "hpmp",
        "searchText": "Formal Dress Outfits T4 T4 Health/Mana 1.5% HP/MP Power 30 Legacy Minerva’s Uprising race reward for all players to obtain 500 achievement points.",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy Minerva’s Uprising race reward for all players to obtain 500 achievement points.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "forsaken_hunter.gif",
        "name": "Forsaken Hunter",
        "tier": "T2",
        "power": "10",
        "attackPower": "4",
        "hpMp": "",
        "source": "Can be purchased from Cosmetic Shop NPC (1 Cosmetic Token ).",
        "stats": [
          "Power 10",
          "+4 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Forsaken Hunter T2 10 4     Can be purchased from Cosmetic Shop NPC (1 Cosmetic Token ).",
        "sourceLabel": "Store",
        "acquisition": "Cosmetic Shop NPC.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "ghost_blade_outfit.gif",
        "name": "Ghost Blade Outfit",
        "tier": "T5",
        "power": "40",
        "attackPower": "",
        "hpMp": "1.75",
        "source": "Legacy 1st Season. | First 25 Players to reach 300 Achievement Points. | Peddler stock update, 8 Living Archlight Tokens. Placeholder image needed.",
        "stats": [
          "Power 40",
          "+1.75% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Ghost Blade Outfit T5 Legacy 1st Season. | First 25 Players to reach 300 Achievement Points. | Peddler stock update, 8 Living Archlight Tokens. Placeholder image needed. Power 40 +1.75% HP/MP",
        "introduced": "Legacy",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (8 tokens).",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "gladiator.gif",
        "name": "Gladiator",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Gladiator T3 20 8     Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "glooth_engineer.gif",
        "name": "Glooth Engineer Outfits",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Legacy DEC 2023 - Archpass Level 50 Reward.",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Glooth Engineer Outfits T3 20  1    Legacy DEC 2023 - Archpass Level 50 Reward.",
        "introduced": "Legacy",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 50 seasonal reward.",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "grove_keeper_outfit.gif",
        "name": "Grove Keeper Outfit",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy 1st Season. | Reward from First Prestige. | 3% Monster Essence. | Peddler stock update, 4 Living Archlight Tokens. Placeholder image needed.",
        "stats": [
          "Power 20"
        ],
        "bonusKind": "power",
        "searchText": "Grove Keeper Outfit T3 Legacy 1st Season. | Reward from First Prestige. | 3% Monster Essence. | Peddler stock update, 4 Living Archlight Tokens. Placeholder image needed. Power 20",
        "introduced": "Legacy",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (4 tokens).",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "guidon_bearer_outfit.gif",
        "name": "Guidon Bearer",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Guidon Bearer T3 20  1    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "hades_warlord_outfit.gif",
        "name": "Hades Warlord",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Hades Warlord T3 20  1    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "hand_of_inquisition.gif",
        "name": "Hand of the Inquisition",
        "tier": "T2",
        "power": "10",
        "attackPower": "",
        "hpMp": "0.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 10",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Hand of the Inquisition T2 10  0.5    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "hell_outfit.gif",
        "name": "Heaven Outfit",
        "tier": "T7",
        "power": "30",
        "attackPower": "5",
        "hpMp": "",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players. | or can be looted from Heaven Boss. | +50% Artifact Experience earned.",
        "stats": [
          "Power 30",
          "+5 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Heaven Outfit T7 30 5     Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players. | or can be looted from Heaven Boss. | +50% Artifact Experience earned.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "heaven_outfit.gif",
        "name": "Hell Outfit",
        "tier": "T7",
        "power": "30",
        "attackPower": "5",
        "hpMp": "",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players. | or can be looted from Hell Boss. | +50% Artifact Experience earned.",
        "stats": [
          "Power 30",
          "+5 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Hell Outfit T7 30 5     Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players. | or can be looted from Hell Boss. | +50% Artifact Experience earned.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "herbalist_outfit.gif",
        "name": "Herbalist",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Herbalist T3 20  1    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Hexblade Outfit",
        "tier": "T7",
        "power": "60",
        "attackPower": "30",
        "hpMp": "3.5",
        "source": "Living Archlight Tokens NPC, 16 Living Archlight Tokens. [Heirloom]. Legacy 2025 donation patch notes: +30 Attack Power, +3.5% Base Health, +3.5% Base Mana, +60 Power. Placeholder image needed.",
        "stats": [
          "Power 60",
          "+30 Attack Power",
          "+3.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Hexblade Outfit T7 60 30 3.5 LAT heirloom Living Archlight Tokens NPC",
        "heirloomStatus": "Heirloom",
        "introduced": "Legacy",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (16 tokens).",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Legacy",
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "hunter.gif",
        "name": "Hunter",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from The Seamstress: | 1st Addon (100 Lizard Leathers, 100 Red Dragon Leathers, 10 Enchanted Chicken Wings, 2 Pieces of Royal Steel, 2 Pieces of Draconian Steel, 2 Pieces of Hell Steel), | 2nd Addon (1 Sniper Gloves). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Hunter T1 5  0.2    Can be purchased from The Seamstress: | 1st Addon (100 Lizard Leathers, 100 Red Dragon Leathers, 10 Enchanted Chicken Wings, 2 Pieces of Royal Steel, 2 Pieces of Draconian Steel, 2 Pieces of Hell Steel), | 2nd Addon (1 Sniper Gloves). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Illuminator Outfit",
        "tier": "T4",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Achievement reward for obtaining 500 achievement points. [Heirloom]. Listed as Tier 4 Monster Essence. Placeholder image needed.",
        "stats": [
          "Tier 4 Monster Essence"
        ],
        "bonusKind": "power",
        "searchText": "Illuminator Outfit 500 achievement points Tier 4 Monster Essence",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "Achievement",
        "acquisition": "Achievement reward for obtaining 500 achievement points.",
        "imageStatus": "Placeholder",
        "sourceChips": [],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Illuminator Outfits",
        "tier": "T4",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy 2025 achievement race reward for all players to obtain 500 achievement points.",
        "stats": [
          "T4 Monster Essence"
        ],
        "bonusKind": "essence",
        "searchText": "Illuminator Outfits T4 T4 Monster Essence Legacy 2025 achievement race reward for all players to obtain 500 achievement points.",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy 2025 achievement race reward for all players to obtain 500 achievement points.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "immortal_warrior.gif",
        "name": "Immortal Warrior",
        "tier": "T2",
        "power": "10",
        "attackPower": "4",
        "hpMp": "",
        "source": "Can be purchased from Cosmetic Shop NPC (1 Cosmetic Token ).",
        "stats": [
          "Power 10",
          "+4 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Immortal Warrior T2 10 4     Can be purchased from Cosmetic Shop NPC (1 Cosmetic Token ).",
        "sourceLabel": "Store",
        "acquisition": "Cosmetic Shop NPC.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "inferno_warlord_outfit.gif",
        "name": "Inferno Warlord",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Can be purchased from Cosmetic Shop NPC (3 Cosmetic Tokens ).",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Inferno Warlord T4 25  1.5    Can be purchased from Cosmetic Shop NPC (3 Cosmetic Tokens ).",
        "sourceLabel": "Store",
        "acquisition": "Cosmetic Shop NPC.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "insectoid_outfit.gif",
        "name": "Insectoid",
        "tier": "T2",
        "power": "10",
        "attackPower": "4",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+4 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Insectoid T2 10 4     Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "jersey.gif",
        "name": "Jersey",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Can be purchased from The Seamstress (24 Minor Cosmetic Tokens ). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Jersey T3 20  1    Can be purchased from The Seamstress (24 Minor Cosmetic Tokens ). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, PvP Trader, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "jester.gif",
        "name": "Jester",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from The Seamstress: | 1st Addon (1 Jester Hat), | 2nd Addon (1 Jester Staff). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Jester T1 5  0.2    Can be purchased from The Seamstress: | 1st Addon (1 Jester Hat), | 2nd Addon (1 Jester Staff). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "Can be purchased from The Seamstress: · 1st Addon (1 Jester Hat), · 2nd Addon (1 Jester Staff). · or using the Addon Doll bought from in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "jouster_outfit.gif",
        "name": "Jouster",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Jouster T3 20  1    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "knight.gif",
        "name": "Knight",
        "tier": "T1",
        "power": "5",
        "attackPower": "2",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress: | 1st Addon (100 Addon Iron Ore, 2 Huge Chunks of Crude Iron), | 2nd Addon (10 Perfect Behemoth Fangs, 2 Damaged Steel Helmets, 2 Flasks of Warrior's Sweat, 2 Pieces of Royal Steel). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+2 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Knight T1 5 2     Can be purchased from The Seamstress: | 1st Addon (100 Addon Iron Ore, 2 Huge Chunks of Crude Iron), | 2nd Addon (10 Perfect Behemoth Fangs, 2 Damaged Steel Helmets, 2 Flasks of Warrior's Sweat, 2 Pieces of Royal Steel). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "mage.gif",
        "name": "Mage",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Jewelcrafting",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from Cosmetic Shop NPC: | Dragon Eye (1 Cosmetic Token ).",
        "stats": [
          "Power 10",
          "+2 Jewelcrafting"
        ],
        "bonusKind": "profession",
        "searchText": "Mage T2 10    +2 Jewelcrafting  Can be purchased from Cosmetic Shop NPC: | Dragon Eye (1 Cosmetic Token ).",
        "sourceLabel": "Store",
        "acquisition": "Cosmetic Shop NPC.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "makeshift_warrior_outfit.gif",
        "name": "Makeshift Warrior Outfit",
        "tier": "T2",
        "power": "5",
        "attackPower": "2",
        "hpMp": "1",
        "source": "All players to obtain 150 Achievement Points: | 1st Addon (N/A), | 2nd Addon (N/A).",
        "stats": [
          "Power 5",
          "+2 Attack Power",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Makeshift Warrior Outfit T2 5 2 1    All players to obtain 150 Achievement Points: | 1st Addon (N/A), | 2nd Addon (N/A).",
        "sourceLabel": "Achievement",
        "acquisition": "All players to obtain 150 Achievement Points: · 1st Addon (N/A), · 2nd Addon (N/A).",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Martial Artist Outfit",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "Tier 3",
        "source": "ArchPass Level 50 reward. [Heirloom]. Listed in Legacy 2025 donation patch notes as Tier 3 Health/Mana. Placeholder image needed.",
        "stats": [
          "Tier 3 Health/Mana"
        ],
        "bonusKind": "power",
        "searchText": "Martial Artist Outfit ArchPass Level 50 Tier 3 Health Mana",
        "heirloomStatus": "Heirloom",
        "introduced": "Legacy",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 50 seasonal reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Legacy",
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Martial Artist Outfits",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy 2025 ArchPass level 50 reward.",
        "stats": [
          "T3 Health/Mana"
        ],
        "bonusKind": "hpmp",
        "searchText": "Martial Artist Outfits T3 T3 Health/Mana Legacy 2025 ArchPass level 50 reward.",
        "introduced": "Legacy",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 50 seasonal reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "mercenary.gif",
        "name": "Mercenary",
        "tier": "T2",
        "power": "10",
        "attackPower": "",
        "hpMp": "0.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 10",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Mercenary T2 10  0.5    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "outfit_merry_garb_male_addon_3.gif",
        "name": "Merry Garb Outfits",
        "tier": "T4",
        "power": "15",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Christmas Shop - Legacy DEC 2023. | Christmas 2023 shop / Christmas Tokens NPC route.",
        "stats": [
          "Power 15",
          "+1.5% HP/MP",
          "T4 Health/Mana"
        ],
        "bonusKind": "power",
        "searchText": "Merry Garb Outfits T4 Christmas Shop - Legacy DEC 2023. | Christmas 2023 shop / Christmas Tokens NPC route. Power 15 +1.5% HP/MP T4 Health/Mana",
        "introduced": "Legacy, Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "moth_cape_outfit.gif",
        "name": "Moth Cape",
        "tier": "T4",
        "power": "25",
        "attackPower": "15",
        "hpMp": "",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 25",
          "+15 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Moth Cape T4 25 15     Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Necromancer Outfit",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "Tier 3",
        "source": "Race reward for first 100 players to reach level 50 in one profession. [Heirloom]. Listed as Tier 3 Health/Mana. Placeholder image needed.",
        "stats": [
          "Tier 3 Health/Mana"
        ],
        "bonusKind": "power",
        "searchText": "Necromancer Outfit first 100 profession level 50 Tier 3 Health Mana",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "Achievement",
        "acquisition": "Race reward for first 100 players to reach level 50 in one profession.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Necromancer Outfits",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy 2025 race reward.",
        "stats": [
          "T3 Health/Mana"
        ],
        "bonusKind": "hpmp",
        "searchText": "Necromancer Outfits T3 T3 Health/Mana Legacy 2025 race reward.",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy 2025 race reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "nightmare.gif",
        "name": "Nightmare",
        "tier": "T1",
        "power": "5",
        "attackPower": "2",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress: | 1st Addon (1200 Demonic Essences), | 2nd Addon (1200 Demonic Essences).",
        "stats": [
          "Power 5",
          "+2 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Nightmare T1 5 2     Can be purchased from The Seamstress: | 1st Addon (1200 Demonic Essences), | 2nd Addon (1200 Demonic Essences).",
        "sourceLabel": "Seamstress",
        "acquisition": "Can be purchased from The Seamstress: · 1st Addon (1200 Demonic Essences), · 2nd Addon (1200 Demonic Essences).",
        "sourceChips": [
          "Seamstress"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "nobleman.gif",
        "name": "Nobleman",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from The Seamstress: | 1st Addon (100 Crystal Coins), | 2nd Addon (100 Crystal Coins). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Nobleman T1 5  0.2    Can be purchased from The Seamstress: | 1st Addon (100 Crystal Coins), | 2nd Addon (100 Crystal Coins). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "Can be purchased from The Seamstress: · 1st Addon (100 Crystal Coins), · 2nd Addon (100 Crystal Coins). · or using the Addon Doll bought from in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "norseman.gif",
        "name": "Norseman",
        "tier": "T1",
        "power": "5",
        "attackPower": "2",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress: | 1st Addon (10 Shards), | 2nd Addon (20 Shards). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+2 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Norseman T1 5 2     Can be purchased from The Seamstress: | 1st Addon (10 Shards), | 2nd Addon (20 Shards). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "Can be purchased from The Seamstress: · 1st Addon (10 Shards), · 2nd Addon (20 Shards). · or using the Addon Doll bought from in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "orcsoberfest.gif",
        "name": "Orcsoberfest Garb Outfits",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Legacy DEC 2023 - First 100 players to obtain 300 achievement points",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Orcsoberfest Garb Outfits T3 20  1    Legacy DEC 2023 - First 100 players to obtain 300 achievement points",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy DEC 2023 - First 100 players to obtain 300 achievement points.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "oriental.gif",
        "name": "Oriental",
        "tier": "T1",
        "power": "5",
        "attackPower": "2",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress: | 1st Addon (1 Coral Comb), | 2nd Addon (60 Ape Furs, 60 Fish Fins, 4 Enchanted Chicken Wings, 60 Blue Piece of Clothes). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+2 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Oriental T1 5 2     Can be purchased from The Seamstress: | 1st Addon (1 Coral Comb), | 2nd Addon (60 Ape Furs, 60 Fish Fins, 4 Enchanted Chicken Wings, 60 Blue Piece of Clothes). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "outfit_954.gif",
        "name": "Paladin",
        "tier": "T2",
        "power": "10",
        "attackPower": "",
        "hpMp": "0.5",
        "source": "Can be purchased from Cosmetic Shop NPC (1 Cosmetic Token ).",
        "stats": [
          "Power 10",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Paladin T2 10  0.5    Can be purchased from Cosmetic Shop NPC (1 Cosmetic Token ).",
        "sourceLabel": "Store",
        "acquisition": "Cosmetic Shop NPC.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Percht Raider Outfits",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy Minerva’s Uprising race reward for first 45 players to obtain 300 achievement points.",
        "stats": [
          "T3 Health/Mana",
          "1% HP/MP",
          "Power 20"
        ],
        "bonusKind": "hpmp",
        "searchText": "Percht Raider Outfits T3 T3 Health/Mana 1% HP/MP Power 20 Legacy Minerva’s Uprising race reward for first 45 players to obtain 300 achievement points.",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy Minerva’s Uprising race reward for first 45 players to obtain 300 achievement points.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "pharaoh_outfit.gif",
        "name": "Pharaoh",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Pharaoh T3 20  1    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "philosopher.gif",
        "name": "Philosopher",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Philosopher T3 20  1    Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "pirate.gif",
        "name": "Pirate",
        "tier": "T1",
        "power": "5",
        "attackPower": "2",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress: | 1st Addon (60 Eye Patchs, 60 Peg Legs, 60 Hooks), | 2nd Addon (1 Ron the Ripper's Sabre, 1 Deadeye Devious' Eye Patch, 1 The Lethal Lissy's Shirt, 1 Brutus Bloodbeard's Hat). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+2 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Pirate T1 5 2     Can be purchased from The Seamstress: | 1st Addon (60 Eye Patchs, 60 Peg Legs, 60 Hooks), | 2nd Addon (1 Ron the Ripper's Sabre, 1 Deadeye Devious' Eye Patch, 1 The Lethal Lissy's Shirt, 1 Brutus Bloodbeard's Hat). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "poltergeist.gif",
        "name": "Poltergeist",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Poltergeist T3 20 8     Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "pumpkin_knight_outfit.png",
        "name": "Pumpkin Knight Outfit",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players. | Pumpkinchu Halloween Shop. Listed in Halloween and 10 Years patch notes: Tier 4 base health 1.5, base mana 1.5, power 30. Placeholder image needed. | Halloween 2025 Pumpkinchu shop / Tier 2 Halloween Box source.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP",
          "Power 30"
        ],
        "bonusKind": "power",
        "searchText": "Pumpkin Knight Outfit T4 Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players. | Pumpkinchu Halloween Shop. Listed in Halloween and 10 Years patch notes: Tier 4 base health 1.5, base mana 1.5, power 30. Placeholder image needed. | Halloween 2025 Pumpkinchu shop / Tier 2 Halloween Box source. Power 25 +1.5% HP/MP Power 30",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Pack",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Event",
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "puppeteer.gif",
        "name": "Puppeteer",
        "tier": "T2",
        "power": "10",
        "attackPower": "",
        "hpMp": "0.5",
        "source": "Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon).",
        "stats": [
          "Power 10",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Puppeteer T2 10  0.5    Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon).",
        "sourceLabel": "Seamstress",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "raccoon_outfit.gif",
        "name": "Raccoon",
        "tier": "T5",
        "power": "35",
        "attackPower": "18",
        "hpMp": "",
        "source": "Legacy 1st Season. | First 25 Players to Slay Hades.",
        "stats": [
          "Power 35",
          "+18 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Raccoon T5 35 18     Legacy 1st Season. | First 25 Players to Slay Hades.",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy 1st Season. · First 25 Players to Slay Hades.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "ranger.gif",
        "name": "Ranger",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Tanning",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+2 Tanning"
        ],
        "bonusKind": "profession",
        "searchText": "Ranger T2 10    +2 Tanning  Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "recruiter.gif",
        "name": "Recruiter",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Recruiter T3 20  1    Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "retro_citizen.gif",
        "name": "Retro Citizen",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Retro Citizen T1 5  0.2    Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "acquisition": "Can be purchased from the PvP Trader (1250 PvP Points ) · or looted from the World Boss' Loot Bags.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "retro_hunter.gif",
        "name": "Retro Hunter",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Retro Hunter T1 5  0.2    Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "acquisition": "Can be purchased from the PvP Trader (1250 PvP Points ) · or looted from the World Boss' Loot Bags.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "retro_knight.gif",
        "name": "Retro Knight",
        "tier": "T1",
        "power": "5",
        "attackPower": "2",
        "hpMp": "",
        "source": "Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "stats": [
          "Power 5",
          "+2 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Retro Knight T1 5 2     Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "acquisition": "Can be purchased from the PvP Trader (1250 PvP Points ) · or looted from the World Boss' Loot Bags.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "retro_mage.gif",
        "name": "Retro Mage",
        "tier": "T1",
        "power": "5",
        "attackPower": "2",
        "hpMp": "",
        "source": "Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "stats": [
          "Power 5",
          "+2 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Retro Mage T1 5 2     Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "acquisition": "Can be purchased from the PvP Trader (1250 PvP Points ) · or looted from the World Boss' Loot Bags.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "retro_nobleman.gif",
        "name": "Retro Noble",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Retro Noble T1 5  0.2    Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "acquisition": "Can be purchased from the PvP Trader (1250 PvP Points ) · or looted from the World Boss' Loot Bags.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "retro_summoner.gif",
        "name": "Retro Summoner",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Retro Summoner T1 5  0.2    Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "acquisition": "Can be purchased from the PvP Trader (1250 PvP Points ) · or looted from the World Boss' Loot Bags.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "retro_warrior.gif",
        "name": "Retro Warrior",
        "tier": "T1",
        "power": "5",
        "attackPower": "2",
        "hpMp": "",
        "source": "Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "stats": [
          "Power 5",
          "+2 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Retro Warrior T1 5 2     Can be purchased from the PvP Trader (1250 PvP Points ) | or looted from the World Boss' Loot Bags.",
        "acquisition": "Can be purchased from the PvP Trader (1250 PvP Points ) · or looted from the World Boss' Loot Bags.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "rift_warrior.gif",
        "name": "Rift Warrior",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Can be obtained from Relic Boxes | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Rift Warrior T3 20 8     Can be obtained from Relic Boxes | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Pack",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "robot_outfit.gif",
        "name": "Robot",
        "tier": "-",
        "power": "50",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy 1st Season. | Reward for this season Editors and Testers. | 10% Monster Essence",
        "stats": [
          "Power 50"
        ],
        "bonusKind": "power",
        "searchText": "Robot - 50      Legacy 1st Season. | Reward for this season Editors and Testers. | 10% Monster Essence",
        "introduced": "Legacy",
        "acquisition": "Legacy 1st Season. · Reward for this season Editors and Testers. · 10% Monster Essence.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "royal_pumpkin.gif",
        "name": "Royal Pumpkin",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Royal Pumpkin T3 20  1    Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "santa_immortal.gif",
        "name": "Santa Immortal",
        "tier": "T2",
        "power": "10",
        "attackPower": "4",
        "hpMp": "",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 10",
          "+4 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Santa Immortal T2 10 4     Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Santa Knight Outfit",
        "tier": "T2",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Christmas 2023 Santa town questline reward.",
        "stats": [
          "T2 HP/MP Outfit"
        ],
        "bonusKind": "hpmp",
        "searchText": "Santa Knight Outfit T2 T2 HP/MP Outfit Christmas 2023 Santa town questline reward.",
        "introduced": "Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas 2023 Santa town questline reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Event",
          "Quest"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "sea_dog.gif",
        "name": "Sea dog",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Fishing",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ). | or completing a Task from Steve The Addoner NPC.",
        "stats": [
          "Power 10",
          "+2 Fishing"
        ],
        "bonusKind": "profession",
        "searchText": "Sea dog T2 10    +2 Fishing  Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ). | or completing a Task from Steve The Addoner NPC.",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "seasonal_pirate.gif",
        "name": "Seasonal Pirate",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Seasonal Pirate T3 20 8     Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "seaweaver.gif",
        "name": "Seaweaver",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Seaweaver T3 20 8     Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "shadowlotus.gif",
        "name": "Shadowlotus Disciple",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Can be obtained by Completing Premium Arch Pass (Heirloom).",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Shadowlotus Disciple T3 20 8     Can be obtained by Completing Premium Arch Pass (Heirloom).",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass seasonal reward.",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Shadowlotus Disciple Outfits",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy Minerva’s Uprising ArchPass level 50 reward.",
        "stats": [
          "T3 Attack Power",
          "+8 Attack Power",
          "Power 20"
        ],
        "bonusKind": "attack",
        "searchText": "Shadowlotus Disciple Outfits T3 T3 Attack Power +8 Attack Power Power 20 Legacy Minerva’s Uprising ArchPass level 50 reward.",
        "introduced": "Legacy",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 50 seasonal reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "shaman.gif",
        "name": "Shaman",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from The Seamstress: | 1st Addon (3 Pirate Voodoo Dolls, 3 Voodoo Dolls, 1 Mandrake), | 2nd Addon (5 Tribal Masks, 5 Banana Staves).",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Shaman T1 5  0.2    Can be purchased from The Seamstress: | 1st Addon (3 Pirate Voodoo Dolls, 3 Voodoo Dolls, 1 Mandrake), | 2nd Addon (5 Tribal Masks, 5 Banana Staves).",
        "sourceLabel": "Seamstress",
        "acquisition": "Can be purchased from The Seamstress: · 1st Addon (3 Pirate Voodoo Dolls, 3 Voodoo Dolls, 1 Mandrake), · 2nd Addon (5 Tribal Masks, 5 Banana Staves).",
        "sourceChips": [
          "Seamstress"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "sheep_outfit_.gif",
        "name": "Sheep Outfit",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Sheep Outfit T4 25  1.5    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "siege_master_outfit.gif",
        "name": "Siege Master",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Siege Master T4 25  1.5    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "skull_archer.gif",
        "name": "Skull Archer",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Skull Archer T3 20  1    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "soil_guardian.gif",
        "name": "Soil Guardian",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from the PvP Trader (500 PvP Points ).",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Soil Guardian T1 5  0.2    Can be purchased from the PvP Trader (500 PvP Points ).",
        "acquisition": "Can be purchased from the PvP Trader (500 PvP Points ).",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "spirit_caller.gif",
        "name": "Spirit Caller",
        "tier": "T2",
        "power": "10",
        "attackPower": "",
        "hpMp": "0.5",
        "source": "Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Spirit Caller T2 10  0.5    Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "summoner.gif",
        "name": "Summoner",
        "tier": "T1",
        "power": "5",
        "attackPower": "2",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress: | 1st Addon (1 Winning Lottery Ticket), | 2nd Addon (70 Bat Wings, 40 Red Piece of Clothes, 80 Ape Furs, 70 Holy Orchids, 20 Spider Silks, 60 Lizard Scales, 80 Red Dragon Scales, 6 Fire Swords, 60 Vampire Dusts). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+2 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Summoner T1 5 2     Can be purchased from The Seamstress: | 1st Addon (1 Winning Lottery Ticket), | 2nd Addon (70 Bat Wings, 40 Red Piece of Clothes, 80 Ape Furs, 70 Holy Orchids, 20 Spider Silks, 60 Lizard Scales, 80 Red Dragon Scales, 6 Fire Swords, 60 Vampire Dusts). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "temple_master_outfit.gif",
        "name": "Temple Master",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Temple Master T3 20 8     ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "gunsllinger_outfit_.png",
        "name": "The Gunslinger",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "The Gunslinger T3 20 8     Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "reaper_outfit_.png",
        "name": "The Reaper",
        "tier": "T4",
        "power": "25",
        "attackPower": "15",
        "hpMp": "",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 25",
          "+15 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "The Reaper T4 25 15     Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "sword_fire.gif",
        "name": "Torch Guardian",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Torch Guardian T4 25  1.5    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "trailblazer_outfit.gif",
        "name": "Trailblazer Outfit",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Legacy 1st Season. | Reward from 500 Achievement Points. | Peddler stock update, 6 Living Archlight Tokens. Placeholder image needed.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Trailblazer Outfit T4 Legacy 1st Season. | Reward from 500 Achievement Points. | Peddler stock update, 6 Living Archlight Tokens. Placeholder image needed. Power 25 +1.5% HP/MP",
        "introduced": "Legacy",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (6 tokens).",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "trophy_hunter_outfit.gif",
        "name": "Trophy Hunter",
        "tier": "T3",
        "power": "20",
        "attackPower": "",
        "hpMp": "1",
        "source": "",
        "stats": [
          "Power 20",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Trophy Hunter T3 20  1    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "twilight_guardian_outfit.gif",
        "name": "Twilight Guardian",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Twilight Guardian T4 25  1.5    Past Dracona/Ildar Seasons Reward. | Now only available on Peddler NPC or bought from Players.",
        "introduced": "Dracona, Ildar",
        "sourceLabel": "Peddler",
        "acquisition": "Past seasonal reward, now usually found through the Peddler NPC or player trading.",
        "sourceChips": [
          "Peddler"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "veteran_paladin_outfit.gif",
        "name": "Veteran Paladin Outfit",
        "tier": "T4",
        "power": "25",
        "attackPower": "",
        "hpMp": "1.5",
        "source": "Legacy 1st Season. | First 50 Players to reach 200 Achievement Points. | Peddler stock update, 6 Living Archlight Tokens. Placeholder image needed.",
        "stats": [
          "Power 25",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Veteran Paladin Outfit T4 Legacy 1st Season. | First 50 Players to reach 200 Achievement Points. | Peddler stock update, 6 Living Archlight Tokens. Placeholder image needed. Power 25 +1.5% HP/MP",
        "introduced": "Legacy",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (6 tokens).",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "void_outfit.gif",
        "name": "Void Outfit",
        "tier": "T5",
        "power": "40",
        "attackPower": "18",
        "hpMp": "",
        "source": "Legacy 1st Season. | Living Token Exchanger NPC (8 Living Archlight Tokens). | Peddler stock update, 10 Living Archlight Tokens. Placeholder image needed.",
        "stats": [
          "Power 40",
          "+18 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Void T5 40 18     Legacy 1st Season. | Living Token Exchanger NPC (8 Living Archlight Tokens).",
        "introduced": "Legacy",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (8 tokens).",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "warmaster.gif",
        "name": "Warmaster",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or from the PvP Trader (500 PvP Points ). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Warmaster T3 20 8     Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or from the PvP Trader (500 PvP Points ). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "warrior.gif",
        "name": "Warrior",
        "tier": "T2",
        "power": "10",
        "attackPower": "4",
        "hpMp": "",
        "source": "Can be purchased from Cosmetic Shop NPC: | Dragon Eye (1 Cosmetic Token ).",
        "stats": [
          "Power 10",
          "+4 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Warrior T2 10 4     Can be purchased from Cosmetic Shop NPC: | Dragon Eye (1 Cosmetic Token ).",
        "sourceLabel": "Store",
        "acquisition": "Cosmetic Shop NPC.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "wayfarer.gif",
        "name": "Wayfarer",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Woodworking",
        "source": "Profession cosmetic outfit/addon source. Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "stats": [
          "Power 10",
          "+2 Woodworking"
        ],
        "bonusKind": "profession",
        "searchText": "Wayfarer T2 10    +2 Woodworking  Can be purchased from The Seamstress (5 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (550 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Winged Druid Outfit",
        "tier": "T5",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Abaldar 2025 achievement race reward for all players to obtain 1000 achievement points.",
        "stats": [
          "T5 Attack Power"
        ],
        "bonusKind": "attack",
        "searchText": "Winged Druid Outfit T5 T5 Attack Power Abaldar 2025 achievement race reward for all players to obtain 1000 achievement points.",
        "introduced": "Abaldar",
        "sourceLabel": "Achievement",
        "acquisition": "Abaldar 2025 achievement race reward for all players to obtain 1000 achievement points.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Abaldar: visual heirloom",
          "Legacy: cross-server heirloom",
          "Legacy bonus-enabled",
          "Cross-server: Abaldar ↔ Legacy"
        ]
      },
      {
        "image": "winter_warden.gif",
        "name": "Winter Warden",
        "tier": "T3",
        "power": "20",
        "attackPower": "8",
        "hpMp": "",
        "source": "Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "stats": [
          "Power 20",
          "+8 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Winter Warden T3 20 8     Can be purchased from The Seamstress (12 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (40 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "wizard.gif",
        "name": "Wizard",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from The Seamstress: | 1st Addon (2 Medusa Shields, 2 Crown Armors, 2 Crown Legs, 2 Rings of the Sky), | 2nd Addon (80 Holy Orchids). | or using the Addon Doll bought from in-game Store.",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Wizard T1 5  0.2    Can be purchased from The Seamstress: | 1st Addon (2 Medusa Shields, 2 Crown Armors, 2 Crown Legs, 2 Rings of the Sky), | 2nd Addon (80 Holy Orchids). | or using the Addon Doll bought from in-game Store.",
        "sourceLabel": "Store",
        "acquisition": "The Seamstress, or the in-game Store.",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "yalaharian.gif",
        "name": "Yalarian",
        "tier": "T1",
        "power": "5",
        "attackPower": "",
        "hpMp": "0.2",
        "source": "Can be purchased from The Seamstress: | 1st Addon (2 Vampiric Crests), | 2nd Addon (2 Vampiric Crests).",
        "stats": [
          "Power 5",
          "+0.2% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Yalarian T1 5  0.2    Can be purchased from The Seamstress: | 1st Addon (2 Vampiric Crests), | 2nd Addon (2 Vampiric Crests).",
        "sourceLabel": "Seamstress",
        "acquisition": "Can be purchased from The Seamstress: · 1st Addon (2 Vampiric Crests), · 2nd Addon (2 Vampiric Crests).",
        "sourceChips": [
          "Seamstress"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      }
    ]
  },
  {
    "id": "mounts",
    "name": "Mounts",
    "icon": "🐎",
    "description": "Rideable cosmetic unlocks, with source and status tags shown only where the archive clearly supports them.",
    "items": [
      {
        "image": "aligator_.gif",
        "name": "Albino Aligator",
        "tier": "T4",
        "boost": "HP",
        "source": "50 Mentee Tokens At Mentor Token Exchanger",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Albino Aligator T4    HP   50 Mentee Tokens At Mentor Token Exchanger",
        "acquisition": "50 Mentee Tokens At Mentor Token Exchanger.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "aligator_2.gif",
        "name": "Aligator",
        "tier": "T4",
        "boost": "HP",
        "source": "50 Mentee Tokens At Mentor Token Exchanger",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Aligator T4    HP   50 Mentee Tokens At Mentor Token Exchanger",
        "acquisition": "50 Mentee Tokens At Mentor Token Exchanger.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "brass_speckled_koi.gif",
        "name": "Amber Sapphire Koi Mount",
        "tier": "T4",
        "bonus": "+12 Attack Power, Power 50.",
        "source": "Special or bonus mount source. Legacy DEC 2023 Archpass Level 100 Reward",
        "stats": [
          "+12 Attack Power, Power 50."
        ],
        "bonusKind": "attack",
        "searchText": "Amber Sapphire Koi Mount T4     +12 Attack Power, Power 50.  Legacy DEC 2023 Archpass Level 100 Reward",
        "introduced": "Legacy",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 100 seasonal reward.",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "arcaine.gif",
        "name": "Arcanine",
        "tier": "T2",
        "bonus": "+.4% HP/MP, +4 Attack Power, Power 10.",
        "source": "Special or bonus mount source. ",
        "stats": [
          "+.4% HP/MP, +4 Attack Power, Power 10."
        ],
        "bonusKind": "hpmp",
        "searchText": "Arcanine T2     +.4% HP/MP, +4 Attack Power, Power 10.  ",
        "acquisition": "Special or bonus mount source.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "armoured_war_horse.gif",
        "name": "Armoured War Horse",
        "tier": "T3",
        "boost": "HP",
        "source": "Cosmetic Trader",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Armoured War Horse T3    HP   Cosmetic Trader",
        "acquisition": "Cosmetic Trader.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "batcat.gif",
        "name": "Batcat",
        "tier": "T3",
        "boost": "HP",
        "source": "Relic Box",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Batcat T3    HP   Relic Box",
        "sourceLabel": "Pack",
        "acquisition": "Relic Box.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Battle Werewolf",
        "tier": "T5",
        "power": "",
        "attackPower": "",
        "hpMp": "Tier 5",
        "source": "Race reward for first 75 players to slay Darkness Hydra. [Heirloom]. Listed as Tier 5 Health & Mana / Monster Essence. Placeholder image needed.",
        "stats": [
          "Tier 5 Health/Mana",
          "Tier 5 Monster Essence"
        ],
        "bonusKind": "power",
        "searchText": "Battle Werewolf Darkness Hydra Tier 5 Health Mana Monster Essence",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "Achievement",
        "acquisition": "Race reward for first 75 players to slay Darkness Hydra.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "big_pumpkin_mount.gif",
        "name": "Big Pumpkin Mount",
        "tier": "T3",
        "boost": "HP",
        "source": "Halloween Event 2019 | Tier 2 Halloween Box reward pool from Halloween and 10 Years patch notes. Placeholder image needed. | Halloween 2025 boxes / Pumpkinchu seasonal sources.",
        "stats": [
          "HP",
          "+0.9% HP/MP",
          "Power 30"
        ],
        "bonusKind": "hpmp",
        "searchText": "Big Pumpkin Mount T3 Halloween Event 2019 | Tier 2 Halloween Box reward pool from Halloween and 10 Years patch notes. Placeholder image needed. | Halloween 2025 boxes / Pumpkinchu seasonal sources. HP +0.9% HP/MP Power 30",
        "introduced": "Halloween 2025",
        "sourceLabel": "Pack",
        "acquisition": "Halloween event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "dracona2021_black_rhino_-_level_50_archpass_t3_hp-mp.gif",
        "name": "Black Rhino",
        "tier": "T3",
        "boost": "Skill",
        "source": "Level 100 ArchPass Mount Cosmetic (Heirloom).",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Black Rhino T3    Skill   Level 100 ArchPass Mount Cosmetic (Heirloom).",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 100 seasonal reward.",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "reins.gif",
        "name": "Black Sheep Reins",
        "tier": "T2",
        "boost": "HP",
        "source": "Archlight Loot Crates",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Black Sheep Reins T2    HP   Archlight Loot Crates",
        "acquisition": "Archlight Loot Crates.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "bloodcurl.gif",
        "name": "Bloodcurl",
        "tier": "T3",
        "boost": "Skill",
        "source": "Legacy Shop.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Bloodcurl T3    Skill   Legacy Shop.",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "Legacy Shop.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Blue Cape Snowman Mount",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Christmas 2023 Christmas Presents rare reward.",
        "stats": [
          "T3 HP/MP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Blue Cape Snowman Mount T3 T3 HP/MP Christmas 2023 Christmas Presents rare reward.",
        "introduced": "Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "bluescale_dragonling.gif",
        "name": "Bluescale Dragonling Mount",
        "tier": "T4",
        "boost": "HP",
        "source": "Dragon Combo Pack / Living Token Exchanger, Legacy 2019 Doorbusters. Listed separately as Bluescale Dragonling Mount for 8 Living Tokens and as part of Dragon Combo for 20 Living Tokens.",
        "stats": [
          "+2.5% HP/MP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Bluescale Dragonling Mount Dragon Combo Pack Living Token Exchanger 8 Living Tokens +2.5% HP MP",
        "hpMp": "2.5",
        "introduced": "Legacy 2019",
        "sourceLabel": "LAT",
        "acquisition": "Dragon Combo Pack reward from the Legacy 2019 doorbuster/Living Token archive.",
        "sourceChips": [
          "Pack source",
          "LAT",
          "Doorbuster"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Bog Tyrant",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Abaldar 2025 race reward for first 100 players to prestige.",
        "stats": [
          "T3 Attack Power"
        ],
        "bonusKind": "attack",
        "searchText": "Bog Tyrant T3 T3 Attack Power Abaldar 2025 race reward for first 100 players to prestige.",
        "introduced": "Abaldar",
        "sourceLabel": "Achievement",
        "acquisition": "Abaldar 2025 race reward for first 100 players to prestige.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Abaldar: visual heirloom",
          "Legacy: cross-server heirloom",
          "Legacy bonus-enabled",
          "Cross-server: Abaldar ↔ Legacy"
        ]
      },
      {
        "image": "",
        "name": "Boreal Owl Mount",
        "tier": "LAT",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Peddler stock update, 4 Living Archlight Tokens. Placeholder image needed.",
        "stats": [],
        "bonusKind": "visual",
        "searchText": "Boreal Owl Mount 4 Living Archlight Tokens",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (4 tokens).",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "brown_skunk.gif",
        "name": "Brown Skunk",
        "tier": "T4",
        "boost": "Skill",
        "source": "Cosmetic Crate.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Brown Skunk T4    Skill   Cosmetic Crate.",
        "acquisition": "Cosmetic Crate.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "blue_sled_mount.gif",
        "name": "Brown Sled Mount",
        "tier": "T2",
        "boost": "Skill",
        "source": "Obtained on 2020 Christmas Event. | Christmas 2023 activity reward: contribute to 3 World Bosses.",
        "stats": [
          "Skill",
          "T2 Attack Power"
        ],
        "bonusKind": "special",
        "searchText": "Brown Sled Mount T2 Obtained on 2020 Christmas Event. | Christmas 2023 activity reward: contribute to 3 World Bosses. Skill T2 Attack Power",
        "introduced": "Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "cake_mount.gif",
        "name": "Cake Mount",
        "tier": "T4",
        "boost": "Skill",
        "source": "During 4th and 5th Archlight Anniversary Event (Heirloom).",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Cake Mount T4    Skill   During 4th and 5th Archlight Anniversary Event (Heirloom).",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "Event",
        "acquisition": "During 4th and 5th Archlight Anniversary Event.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "carrot_spaceship.gif",
        "name": "Carrot Spaceship Mount",
        "tier": "T5",
        "bonus": "+2% HP/MP, Power 40.",
        "source": "Special or bonus mount source. Obtained through the 2023 Easter Event.",
        "stats": [
          "+2% HP/MP, Power 40."
        ],
        "bonusKind": "hpmp",
        "searchText": "Carrot Spaceship Mount T5     +2% HP/MP, Power 40.  Obtained through the 2023 Easter Event.",
        "sourceLabel": "Event",
        "acquisition": "Easter event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "cerberus_mount.gif",
        "name": "Cerberus Mount",
        "tier": "T3",
        "boost": "HP",
        "source": "Living Token Exchanger during NA era 3 (cross-server)",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Cerberus Mount T3    HP   Living Token Exchanger during NA era 3 (cross-server)",
        "serverStatus": "Cross-server",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC.",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Cross-server: Abaldar ↔ Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "charizard.gif",
        "name": "Charizard",
        "tier": "T6",
        "bonus": "+2.50% HP/MP, +25 Attack Power, Power 50.",
        "source": "Special or bonus mount source. Dracona Living Token Exchanger and Wheel of Archlight.",
        "stats": [
          "+2.50% HP/MP, +25 Attack Power, Power 50."
        ],
        "bonusKind": "hpmp",
        "searchText": "Charizard T6     +2.50% HP/MP, +25 Attack Power, Power 50.  Dracona Living Token Exchanger and Wheel of Archlight.",
        "introduced": "Dracona",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC.",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Chicken Mount",
        "tier": "LAT",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Peddler stock update, 10 Living Archlight Tokens. Placeholder image needed.",
        "stats": [],
        "bonusKind": "visual",
        "searchText": "Chicken Mount 10 Living Archlight Tokens Peddler",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (10 tokens).",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "christmasyeti.gif",
        "name": "Christmas Yeti Mount",
        "tier": "T4",
        "boost": "Skill",
        "source": "Obtained on 2020 Christmas Event. | Christmas 2023 Christmas Presents ultra rare reward.",
        "stats": [
          "Skill",
          "T4 Attack Power"
        ],
        "bonusKind": "special",
        "searchText": "Christmas Yeti Mount T4 Obtained on 2020 Christmas Event. | Christmas 2023 Christmas Presents ultra rare reward. Skill T4 Attack Power",
        "introduced": "Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "cinnamon_ibex.gif",
        "name": "Cinnamon_Ibex",
        "tier": "T4",
        "boost": "Monster Essence",
        "source": "Legacy DEC 2023 - First 45 players to complete Zaqor’s Tower",
        "stats": [
          "Monster Essence"
        ],
        "bonusKind": "special",
        "searchText": "Cinnamon_Ibex T4    Monster Essence   Legacy DEC 2023 - First 45 players to complete Zaqor’s Tower",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy DEC 2023 - First 45 players to complete Zaqor’s Tower.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "coralripper.gif",
        "name": "Coralripper",
        "tier": "T2",
        "boost": "HP",
        "source": "Legacy Shop.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Coralripper T2    HP   Legacy Shop.",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "Legacy Shop.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Corpsefire Skull",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Abaldar 2025 race reward for first 100 players to reach level 50 in one profession.",
        "stats": [
          "T3 Health/Mana"
        ],
        "bonusKind": "hpmp",
        "searchText": "Corpsefire Skull T3 T3 Health/Mana Abaldar 2025 race reward for first 100 players to reach level 50 in one profession.",
        "introduced": "Abaldar",
        "sourceLabel": "Achievement",
        "acquisition": "Abaldar 2025 race reward for first 100 players to reach level 50 in one profession.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Abaldar: visual heirloom",
          "Legacy: cross-server heirloom",
          "Legacy bonus-enabled",
          "Cross-server: Abaldar ↔ Legacy"
        ]
      },
      {
        "image": "crimson_death_hunter_skull_mount_33770_.gif",
        "name": "Crimson Death Hunter Skull Mount",
        "tier": "T6",
        "bonus": "+2.50% HP/MP, +25 Attack Power, Power 50.",
        "source": "Special or bonus mount source. Legacy DEC 2023 Limited Doorbusters Variation",
        "stats": [
          "+2.50% HP/MP, +25 Attack Power, Power 50."
        ],
        "bonusKind": "hpmp",
        "searchText": "Crimson Death Hunter Skull Mount T6     +2.50% HP/MP, +25 Attack Power, Power 50.  Legacy DEC 2023 Limited Doorbusters Variation",
        "introduced": "Legacy",
        "sourceLabel": "Pack",
        "acquisition": "Doorbuster pack cosmetic.",
        "sourceChips": [
          "Doorbuster"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "crystal_skunk.gif",
        "name": "Crystal Skunk",
        "tier": "T4",
        "boost": "Skill",
        "source": "Cosmetic Crate.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Crystal Skunk T4    Skill   Cosmetic Crate.",
        "acquisition": "Cosmetic Crate.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "crystal_wolf_mount_.gif",
        "name": "Crystal Wolf",
        "tier": "T3",
        "boost": "HP",
        "source": "Legacy Shop",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Crystal Wolf T3    HP   Legacy Shop",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "Legacy Shop.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "red_sled_mount.gif",
        "name": "Dark Red Sled Mount",
        "tier": "T2",
        "boost": "Skill",
        "source": "Obtained on 2020 Christmas Event. | Christmas 2023 activity reward: complete 15 Dungeons.",
        "stats": [
          "Skill",
          "T2 Attack Power"
        ],
        "bonusKind": "special",
        "searchText": "Dark Red Sled Mount T2 Obtained on 2020 Christmas Event. | Christmas 2023 activity reward: complete 15 Dungeons. Skill T2 Attack Power",
        "introduced": "Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "dawn_strayer_mount.gif",
        "name": "Dawn Stryer Mount",
        "tier": "T3",
        "boost": "Skill",
        "source": "Level 50 Archpass Reward.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Dawn Stryer Mount T3    Skill   Level 50 Archpass Reward.",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 50 seasonal reward.",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "death_crawler.gif",
        "name": "Death Crawler",
        "tier": "T2",
        "boost": "Skill",
        "source": "In Game Shop, Mentor Tokens or Lord of Light drop.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Death Crawler T2    Skill   In Game Shop, Mentor Tokens or Lord of Light drop.",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "death_hunter_skull_mount_33771_.gif",
        "name": "Death Hunter Skull Mount",
        "tier": "T6",
        "bonus": "+2.50% HP/MP, +25 Attack Power, Power 50.",
        "source": "Special or bonus mount source. Legacy DEC 2023 Living Archlight Tokens",
        "stats": [
          "+2.50% HP/MP, +25 Attack Power, Power 50."
        ],
        "bonusKind": "hpmp",
        "searchText": "Death Hunter Skull Mount T6     +2.50% HP/MP, +25 Attack Power, Power 50.  Legacy DEC 2023 Living Archlight Tokens",
        "introduced": "Legacy",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (2023 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Death Phoenix",
        "tier": "T4",
        "power": "",
        "attackPower": "Tier 4",
        "hpMp": "",
        "source": "ArchPass Level 100 reward. [Heirloom]. Listed in Legacy 2025 donation patch notes as Tier 4 Attack Power & Monster Essence. Placeholder image needed.",
        "stats": [
          "Tier 4 Attack Power",
          "Tier 4 Monster Essence"
        ],
        "bonusKind": "power",
        "searchText": "Death Phoenix ArchPass Level 100 Tier 4 Attack Power Monster Essence",
        "heirloomStatus": "Heirloom",
        "introduced": "Legacy",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 100 seasonal reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Legacy",
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "desert_king.gif",
        "name": "Desert King",
        "tier": "T3",
        "boost": "HP",
        "source": "Mentor Tokens or In-game Shop",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Desert King T3    HP   Mentor Tokens or In-game Shop",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "diamond.gif",
        "name": "Diamond",
        "tier": "T3",
        "boost": "HP",
        "source": "Cosmetic Trader",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Diamond T3    HP   Cosmetic Trader",
        "acquisition": "Cosmetic Trader.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "donkey.gif",
        "name": "Donkey",
        "tier": "T1",
        "boost": "HP",
        "source": "Dungeon Box Drop",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Donkey T1    HP   Dungeon Box Drop",
        "sourceLabel": "Pack",
        "acquisition": "Dungeon Box Drop.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "doombringer.gif",
        "name": "Doombringer",
        "tier": "T3",
        "boost": "Skill",
        "source": "In Game Shop or Mentor Tokens.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Doombringer T3    Skill   In Game Shop or Mentor Tokens.",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "dragonling.gif",
        "name": "Dragonling",
        "tier": "T2",
        "boost": "Skill",
        "source": "In Game Shop or Mentor Tokens.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Dragonling T2    Skill   In Game Shop or Mentor Tokens.",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "draptor.gif",
        "name": "Draptor",
        "tier": "T2",
        "boost": "HP",
        "source": "Draptor Wild Boss",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Draptor T2    HP   Draptor Wild Boss",
        "acquisition": "Draptor Wild Boss.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "dromedary_mount.gif",
        "name": "Dromedary",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Tanning",
        "source": "Profession cosmetic mount source. Obtained by completing a task from Steve The Addoner NPC.",
        "stats": [
          "Power 10",
          "+2 Tanning"
        ],
        "bonusKind": "profession",
        "searchText": "Dromedary T2 10    +2 Tanning  Obtained by completing a task from Steve The Addoner NPC.",
        "acquisition": "Profession cosmetic mount source. Obtained by completing a task from Steve The Addoner NPC.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "ebony_tiger.gif",
        "name": "Ebony Tiger",
        "tier": "T2",
        "boost": "Skill",
        "source": "ArchPass Level 50 Reward.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Ebony Tiger T2    Skill   ArchPass Level 50 Reward.",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 50 seasonal reward.",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "emerald_waccoon.gif",
        "name": "Emerald Waccoon",
        "tier": "T1",
        "boost": "Skill",
        "source": "Wild Boxes.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Emerald Waccoon T1    Skill   Wild Boxes.",
        "sourceLabel": "Pack",
        "acquisition": "Wild Boxes.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "flamesteed.gif",
        "name": "Flamesteed",
        "tier": "T3",
        "boost": "Skill",
        "source": "In Game Shop or Mentor Tokens.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Flamesteed T3    Skill   In Game Shop or Mentor Tokens.",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "floating_augur.gif",
        "name": "Floating Augur",
        "tier": "T3",
        "bonus": "+8 Attack Power Power 20.",
        "source": "Special or bonus mount source. Legacy DEC 2023 - All players that reach Awakening Level.",
        "stats": [
          "+8 Attack Power Power 20."
        ],
        "bonusKind": "attack",
        "searchText": "Floating Augur T3     +8 Attack Power Power 20.  Legacy DEC 2023 - All players that reach Awakening Level.",
        "introduced": "Legacy",
        "acquisition": "Special or bonus mount source. Legacy DEC 2023 - All players that reach Awakening Level.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "flying_carpet.gif",
        "name": "Flying Divan",
        "tier": "T3",
        "boost": "HP",
        "source": "In Game Shop or Mentor Tokens",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Flying Divan T3    HP   In Game Shop or Mentor Tokens",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Freezing Fang Mount",
        "tier": "T5",
        "power": "40",
        "attackPower": "15",
        "hpMp": "",
        "source": "Anniversary/Autumn Event 2024, Shannon the Trader. 5 LATs, Exclusive/Heirloom. Tier 5, 7% Monster Essence, +15 Attack Power, +40 Power. Placeholder image needed.",
        "stats": [
          "Power 40",
          "+15 Attack Power",
          "+7% Monster Essence"
        ],
        "bonusKind": "power",
        "searchText": "Freezing Fang Mount 5 LAT Tier 5 monster essence attack power",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (5 tokens).",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "frozen_horse.gif",
        "name": "Frozen Horse",
        "tier": "T3",
        "boost": "HP",
        "source": "Legacy Shop",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Frozen Horse T3    HP   Legacy Shop",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "Legacy Shop.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "snow_pelt.gif",
        "name": "Frozen Pelt Mount",
        "tier": "T3",
        "boost": "HP&MANA",
        "source": "Obtained via frozen charm token (Permafrost mini-raid) Legacy DEC 2023",
        "stats": [
          "HP&MANA"
        ],
        "bonusKind": "hpmp",
        "searchText": "Frozen Pelt Mount T3    HP&MANA   Obtained via frozen charm token (Permafrost mini-raid) Legacy DEC 2023",
        "introduced": "Legacy",
        "acquisition": "Obtained via frozen charm token (Permafrost mini-raid) Legacy DEC 2023.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Gastly Mount Token",
        "tier": "Event",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Tier 2 Halloween Box reward pool from Halloween and 10 Years patch notes. Placeholder image needed. | Halloween 2025 Demon Oak / Tier 3 Halloween Box reward.",
        "stats": [
          "+1.75% HP/MP",
          "Power 30"
        ],
        "bonusKind": "hpmp",
        "searchText": "Gastly Mount Token Halloween Box",
        "introduced": "Halloween 2025",
        "sourceLabel": "Pack",
        "acquisition": "Halloween event reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "ghastly_mount.gif",
        "name": "Ghastly Mount",
        "tier": "T4",
        "boost": "HP",
        "source": "Living Token Exchanger During Halloween Event",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Ghastly Mount T4    HP   Living Token Exchanger During Halloween Event",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC.",
        "sourceChips": [
          "LAT",
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "glooth_glider_mount.gif",
        "name": "Glooth Glider",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Cooking",
        "source": "Profession cosmetic mount source. Obtained by using a Bamboo Leaves | or purchased in the in-game Store (650 Archlight Points ).",
        "stats": [
          "Power 10",
          "+2 Cooking"
        ],
        "bonusKind": "profession",
        "searchText": "Glooth Glider T2 10    +2 Cooking  Obtained by using a Bamboo Leaves | or purchased in the in-game Store (650 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "gnarlhound_mount_.gif",
        "name": "Gnardlhound",
        "tier": "T2",
        "boost": "Skill",
        "source": "Drops from Ovrem The Ancient.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Gnardlhound T2    Skill   Drops from Ovrem The Ancient.",
        "acquisition": "Drops from Ovrem The Ancient.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "gorongra.gif",
        "name": "Gorongra",
        "tier": "T3",
        "boost": "HP",
        "source": "Relic Box",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Gorongra T3    HP   Relic Box",
        "sourceLabel": "Pack",
        "acquisition": "Relic Box.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "aligator_3.gif",
        "name": "Grey Aligator",
        "tier": "T4",
        "boost": "HP",
        "source": "50 Mentee Tokens At Mentor Token Exchanger",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Grey Aligator T4    HP   50 Mentee Tokens At Mentor Token Exchanger",
        "acquisition": "50 Mentee Tokens At Mentor Token Exchanger.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Haze Mount",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Abaldar 2025 race reward for reaching Awakening level. Legacy bonus listed as Tier 3 Attack Power.",
        "stats": [
          "T3 Attack Power"
        ],
        "bonusKind": "attack",
        "searchText": "Haze Mount T3 T3 Attack Power Abaldar 2025 race reward for reaching Awakening level. Legacy bonus listed as Tier 3 Attack Power.",
        "introduced": "Abaldar, Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Abaldar 2025 race reward for reaching Awakening level. Legacy bonus.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Legacy",
          "Abaldar: visual heirloom",
          "Legacy: cross-server heirloom",
          "Legacy bonus-enabled"
        ]
      },
      {
        "image": "",
        "name": "Hell Demonosaur",
        "tier": "T3",
        "power": "",
        "attackPower": "Tier 3",
        "hpMp": "",
        "source": "Race reward for players reaching Awakening Level. [Heirloom]. Listed as Tier 3 Attack Power. Placeholder image needed.",
        "stats": [
          "Tier 3 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Hell Demonosaur Awakening Level race reward Tier 3 Attack Power",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "Achievement",
        "acquisition": "Race reward for players reaching Awakening Level.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Holiday Mammoth Mount",
        "tier": "T4",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Christmas 2023 shop / Christmas Tokens NPC route.",
        "stats": [
          "T4 Attack Power"
        ],
        "bonusKind": "attack",
        "searchText": "Holiday Mammoth Mount T4 T4 Attack Power Christmas 2023 shop / Christmas Tokens NPC route.",
        "introduced": "Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "inferno.gif",
        "name": "Inferno",
        "tier": "T4",
        "boost": "Skill",
        "source": "Cosmetic Trader.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Inferno T4    Skill   Cosmetic Trader.",
        "acquisition": "Cosmetic Trader.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "ironblight_mount.gif",
        "name": "Ironblight",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Mining",
        "source": "Profession cosmetic mount source. Obtained by completing a task from Steve The Addoner NPC.",
        "stats": [
          "Power 10",
          "+2 Mining"
        ],
        "bonusKind": "profession",
        "searchText": "Ironblight T2 10    +2 Mining  Obtained by completing a task from Steve The Addoner NPC.",
        "acquisition": "Profession cosmetic mount source. Obtained by completing a task from Steve The Addoner NPC.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Jousting Horse",
        "tier": "T5",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy Minerva’s Uprising race reward for first 40 players to defeat or help Minerva.",
        "stats": [
          "T5 Health/Mana",
          "2% HP/MP",
          "Power 40"
        ],
        "bonusKind": "hpmp",
        "searchText": "Jousting Horse T5 T5 Health/Mana 2% HP/MP Power 40 Legacy Minerva’s Uprising race reward for first 40 players to defeat or help Minerva.",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy Minerva’s Uprising race reward for first 40 players to defeat or help Minerva.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "king_scorpion.gif",
        "name": "King Scorpion",
        "tier": "T2",
        "boost": "HP",
        "source": "Archlight Loot Crates",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "King Scorpion T2    HP   Archlight Loot Crates",
        "acquisition": "Archlight Loot Crates.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "kingly_deer.gif",
        "name": "Kingly Deer",
        "tier": "T3",
        "boost": "HP",
        "source": "Relic Box",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Kingly Deer T3    HP   Relic Box",
        "sourceLabel": "Pack",
        "acquisition": "Relic Box.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "ladybug_mount.gif",
        "name": "Lady Bug",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Woodworking",
        "source": "Profession cosmetic mount source. Avuria (World Boss) Loot Bag.",
        "stats": [
          "Power 10",
          "+2 Woodworking"
        ],
        "bonusKind": "profession",
        "searchText": "Lady Bug T2 10    +2 Woodworking  Avuria (World Boss) Loot Bag.",
        "acquisition": "Profession cosmetic mount source. Avuria (World Boss) Loot Bag.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Leaf Locust",
        "tier": "Visual",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Abaldar 2025 ArchPass level 50 reward. Patch note spelling appears as Leaf Cocust, likely Leaf Locust.",
        "stats": [
          "ArchPass reward"
        ],
        "bonusKind": "visual",
        "searchText": "Leaf Locust Visual ArchPass reward Abaldar 2025 ArchPass level 50 reward. Patch note spelling appears as Leaf Cocust, likely Leaf Locust.",
        "introduced": "Abaldar",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 50 seasonal reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Abaldar visual"
        ]
      },
      {
        "image": "leafscuttler_mount.gif",
        "name": "Leafscuttler",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Farming",
        "source": "Profession cosmetic mount source. Can be purchased from The Seamstress (25 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (50 Heirloom Points ).",
        "stats": [
          "Power 10",
          "+2 Farming"
        ],
        "bonusKind": "profession",
        "searchText": "Leafscuttler T2 10    +2 Farming  Can be purchased from The Seamstress (25 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (50 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "Profession cosmetic mount source. Can be purchased from The Seamstress (25 Minor Cosmetic Tokens per Addon). · or purchased in the in-game Store (50 Heirloom Points ).",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Magic Carpet",
        "tier": "T2",
        "boost": "Skill",
        "source": "Archlight Loot Crates.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Magic Carpet T2    Skill   Archlight Loot Crates.",
        "acquisition": "Archlight Loot Crates.",
        "imageStatus": "Placeholder",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "magma_crawler_mount.gif",
        "name": "Magma Clawler",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Blacksmithing",
        "source": "Profession cosmetic mount source. Dracona (World Boss) Loot Bag.",
        "stats": [
          "Power 10",
          "+2 Blacksmithing"
        ],
        "bonusKind": "profession",
        "searchText": "Magma Clawler T2 10    +2 Blacksmithing  Dracona (World Boss) Loot Bag.",
        "introduced": "Dracona",
        "acquisition": "Profession cosmetic mount source. Dracona (World Boss) Loot Bag.",
        "sourceChips": [],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "manta_ray_mount_.gif",
        "name": "Manta Ray (Mount)",
        "tier": "T2",
        "boost": "HP",
        "source": "Relic Boxes",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Manta Ray (Mount) T2    HP   Relic Boxes",
        "sourceLabel": "Pack",
        "acquisition": "Relic Boxes.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "marsh_toad.gif",
        "name": "Marsh Toad",
        "tier": "T3",
        "boost": "Skill",
        "source": "Steve the Addoner Task.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Marsh Toad T3    Skill   Steve the Addoner Task.",
        "acquisition": "Steve the Addoner Task.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "mazemount.gif",
        "name": "Maze Mount",
        "tier": "T3",
        "boost": "Skill",
        "source": "First 70 players to obtain 200 Achievement Points(Heirloom).",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Maze Mount T3    Skill   First 70 players to obtain 200 Achievement Points(Heirloom).",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "Achievement",
        "acquisition": "First 70 players to obtain 200 Achievement Points.",
        "sourceChips": [],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Monster Cupcake Mounts",
        "tier": "Heirloom",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Anniversary Cupcakes Shop, 750 Anniversary Cupcakes. Heirloom token with 8 mount versions. No listed bonuses. Placeholder image needed.",
        "stats": [],
        "bonusKind": "visual",
        "searchText": "Monster Cupcake Mounts Anniversary Cupcakes 8 versions heirloom",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "Event",
        "acquisition": "Anniversary Cupcakes Shop, 750 Anniversary Cupcakes. token with 8 mount versions. No listed bonuses.",
        "imageStatus": "Placeholder",
        "sourceChips": [],
        "worldBehavior": [
          "Heirloom / carry-over"
        ]
      },
      {
        "image": "mouldpincer.gif",
        "name": "Mouldpincer",
        "tier": "T3",
        "boost": "Skill",
        "source": "Legacy Shop.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Mouldpincer T3    Skill   Legacy Shop.",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "Legacy Shop.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "mutatedabom.gif",
        "name": "Mutated Abomination",
        "tier": "T4",
        "boost": "HP",
        "source": "Can be obtained by Completing Premium Arch Pass (Heirloom).",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Mutated Abomination T4    HP   Can be obtained by Completing Premium Arch Pass (Heirloom).",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass seasonal reward.",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Mystic Raven",
        "tier": "T4",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy Minerva’s Uprising race reward for all players to Prestige.",
        "stats": [
          "T4 Monster Essence",
          "+5% Monster Essence",
          "Power 30"
        ],
        "bonusKind": "essence",
        "searchText": "Mystic Raven T4 T4 Monster Essence +5% Monster Essence Power 30 Legacy Minerva’s Uprising race reward for all players to Prestige.",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy Minerva’s Uprising race reward for all players to Prestige.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "neon_sparkid.gif",
        "name": "Neon Sparkid",
        "tier": "T3",
        "boost": "Skill",
        "source": "Relic Box.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Neon Sparkid T3    Skill   Relic Box.",
        "sourceLabel": "Pack",
        "acquisition": "Relic Box.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "nethersteed.gif",
        "name": "Nethersteed",
        "tier": "T3",
        "boost": "Skill",
        "source": "In Game Shop or Mentor Tokens.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Nethersteed T3    Skill   In Game Shop or Mentor Tokens.",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Night Locust",
        "tier": "T3",
        "power": "",
        "attackPower": "Tier 3",
        "hpMp": "",
        "source": "Race reward for first 100 players to Prestige. [Heirloom]. Listed as Tier 3 Attack Power. Placeholder image needed.",
        "stats": [
          "Tier 3 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Night Locust first 100 Prestige Tier 3 Attack Power",
        "heirloomStatus": "Heirloom",
        "sourceLabel": "Achievement",
        "acquisition": "Race reward for first 100 players to Prestige.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "night_waccoon.gif",
        "name": "Night Waccoon",
        "tier": "T1",
        "boost": "HP",
        "source": "Wild Boxes.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Night Waccoon T1    HP   Wild Boxes.",
        "sourceLabel": "Pack",
        "acquisition": "Wild Boxes.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "noble_lion_mount_.gif",
        "name": "Noble Lion",
        "tier": "T2",
        "boost": "Skill",
        "source": "Steve The Addoner Task.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Noble Lion T2    Skill   Steve The Addoner Task.",
        "acquisition": "Steve The Addoner Task.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "noctungra.gif",
        "name": "Noctungra",
        "tier": "T3",
        "boost": "HP",
        "source": "Relic Box",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Noctungra T3    HP   Relic Box",
        "sourceLabel": "Pack",
        "acquisition": "Relic Box.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Pallbearer Mount",
        "tier": "T4",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy 2025 Golden Dungeon reward chance from Solo/Greater Dungeon rare instance.",
        "stats": [
          "T4 Attack Power"
        ],
        "bonusKind": "attack",
        "searchText": "Pallbearer Mount T4 T4 Attack Power Legacy 2025 Golden Dungeon reward chance from Solo/Greater Dungeon rare instance.",
        "introduced": "Legacy",
        "acquisition": "Legacy 2025 Golden Dungeon reward chance from Solo/Greater Dungeon rare instance.",
        "imageStatus": "Placeholder",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "party_bear_mount.gif",
        "name": "Party Bear",
        "tier": "T3",
        "boost": "Skill",
        "source": "During 4th and 5th Archlight Anniversary Event.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Party Bear T3    Skill   During 4th and 5th Archlight Anniversary Event.",
        "sourceLabel": "Event",
        "acquisition": "During 4th and 5th Archlight Anniversary Event.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "phantasmal_jade_mount.gif",
        "name": "Phantasmal Jade Mount",
        "tier": "T4",
        "boost": "Skill",
        "source": "First 25 Players to slay Hades on Ildar (Heirloom).",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Phantasmal Jade Mount T4    Skill   First 25 Players to slay Hades on Ildar (Heirloom).",
        "heirloomStatus": "Heirloom",
        "introduced": "Ildar",
        "sourceLabel": "Achievement",
        "acquisition": "First 25 Players to slay Hades on Ildar.",
        "sourceChips": [],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "pink_carrot_spaceship.gif",
        "name": "Pink Carrot Spaceship Mount",
        "tier": "T5",
        "bonus": "+15 Attack Power, Power 40.",
        "source": "Special or bonus mount source. Obtained through the 2023 Easter Event.",
        "stats": [
          "+15 Attack Power, Power 40."
        ],
        "bonusKind": "attack",
        "searchText": "Pink Carrot Spaceship Mount T5     +15 Attack Power, Power 40.  Obtained through the 2023 Easter Event.",
        "sourceLabel": "Event",
        "acquisition": "Easter event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "pink_moth_mount.gif",
        "name": "Pink Moth",
        "tier": "T4",
        "boost": "Skill",
        "source": "Ildar Awakening Race and Dracona Level 1500 Race (Heirloom).",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Pink Moth T4    Skill   Ildar Awakening Race and Dracona Level 1500 Race (Heirloom).",
        "heirloomStatus": "Heirloom",
        "introduced": "Dracona, Ildar",
        "acquisition": "Ildar Awakening Race and Dracona Level 1500 Race.",
        "sourceChips": [],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "platesaurian.gif",
        "name": "Platesaurian",
        "tier": "T2",
        "boost": "HP",
        "source": "Mentor Token, In Game Store or Dragonling Wild Boss",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Platesaurian T2    HP   Mentor Token, In Game Store or Dragonling Wild Boss",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "plumfish.gif",
        "name": "Plumfish",
        "tier": "T3",
        "boost": "HP",
        "source": "Legacy Shop",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Plumfish T3    HP   Legacy Shop",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "Legacy Shop.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "racing_bird.gif",
        "name": "Racing Bird",
        "tier": "T1",
        "boost": "Skill",
        "source": "Forest Fury Task (Monster TP).",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Racing Bird T1    Skill   Forest Fury Task (Monster TP).",
        "acquisition": "Forest Fury Task (Monster TP).",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Radiant Raven Mount",
        "tier": "LAT",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Peddler stock update, 6 Living Archlight Tokens. Placeholder image needed.",
        "stats": [],
        "bonusKind": "visual",
        "searchText": "Radiant Raven Mount 6 Living Archlight Tokens",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (6 tokens).",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "rainbow_horse.gif",
        "name": "Rainbow Horse",
        "tier": "T3",
        "boost": "HP",
        "source": "Legacy Shop",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Rainbow Horse T3    HP   Legacy Shop",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "Legacy Shop.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "rapid_boar_mount.gif",
        "name": "Rapid boar",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Skinning",
        "source": "Profession cosmetic mount source. Obtained by completing a task from Steve The Addoner NPC.",
        "stats": [
          "Power 10",
          "+2 Skinning"
        ],
        "bonusKind": "profession",
        "searchText": "Rapid boar T2 10    +2 Skinning  Obtained by completing a task from Steve The Addoner NPC.",
        "acquisition": "Profession cosmetic mount source. Obtained by completing a task from Steve The Addoner NPC.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "rapiddash.gif",
        "name": "Rapidash",
        "tier": "T4",
        "bonus": "+.4% HP/MP, +4 Attack Power, Power 10.",
        "source": "Special or bonus mount source. ",
        "stats": [
          "+.4% HP/MP, +4 Attack Power, Power 10."
        ],
        "bonusKind": "hpmp",
        "searchText": "Rapidash T4     +.4% HP/MP, +4 Attack Power, Power 10.  ",
        "acquisition": "Special or bonus mount source.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Red Scarf Snowman Mount",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Christmas 2023 Christmas Presents rare reward.",
        "stats": [
          "T3 HP/MP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Red Scarf Snowman Mount T3 T3 HP/MP Christmas 2023 Christmas Presents rare reward.",
        "introduced": "Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "rhyhorn.gif",
        "name": "Rhyhorn",
        "tier": "T2",
        "bonus": "+.4% HP/MP, +4 Attack Power, Power 10.",
        "source": "Special or bonus mount source. ",
        "stats": [
          "+.4% HP/MP, +4 Attack Power, Power 10."
        ],
        "bonusKind": "hpmp",
        "searchText": "Rhyhorn T2     +.4% HP/MP, +4 Attack Power, Power 10.  ",
        "acquisition": "Special or bonus mount source.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "rift_runner.gif",
        "name": "Rift Runner",
        "tier": "T3",
        "boost": "Skill",
        "source": "Legacy Shop.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Rift Runner T3    Skill   Legacy Shop.",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "Legacy Shop.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "ringtail_waccoon.gif",
        "name": "Ringtail Waccoon",
        "tier": "T1",
        "boost": "Skill",
        "source": "Wild Boxes.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Ringtail Waccoon T1    Skill   Wild Boxes.",
        "sourceLabel": "Pack",
        "acquisition": "Wild Boxes.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "sanguine_frog.gif",
        "name": "Saguine Frog",
        "tier": "T3",
        "boost": "Skill",
        "source": "Steve the Addoner Task.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Saguine Frog T3    Skill   Steve the Addoner Task.",
        "acquisition": "Steve the Addoner Task.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Santa Snowman Mount",
        "tier": "T3",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Christmas 2023 Christmas Presents very rare reward.",
        "stats": [
          "T3 HP/MP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Santa Snowman Mount T3 T3 HP/MP Christmas 2023 Christmas Presents very rare reward.",
        "introduced": "Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "scorched_horse.gif",
        "name": "Scorched Horse",
        "tier": "T3",
        "boost": "HP",
        "source": "Legacy Shop",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Scorched Horse T3    HP   Legacy Shop",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "Legacy Shop.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "sea_devil_mount.gif",
        "name": "Sea Devil",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Fishing",
        "source": "Profession cosmetic mount source. Can be purchased from The Seamstress (25 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (50 Heirloom Points ).",
        "stats": [
          "Power 10",
          "+2 Fishing"
        ],
        "bonusKind": "profession",
        "searchText": "Sea Devil T2 10    +2 Fishing  Can be purchased from The Seamstress (25 Minor Cosmetic Tokens per Addon). | or purchased in the in-game Store (50 Heirloom Points ).",
        "sourceLabel": "Store",
        "acquisition": "Profession cosmetic mount source. Can be purchased from The Seamstress (25 Minor Cosmetic Tokens per Addon). · or purchased in the in-game Store (50 Heirloom Points ).",
        "sourceChips": [
          "Seamstress",
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "shadow_draptor.gif",
        "name": "Shadow Draptor",
        "tier": "T2",
        "boost": "HP",
        "source": "Donation bonus from 15Eur/18Usd or more.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Shadow Draptor T2    HP   Donation bonus from 15Eur/18Usd or more.",
        "acquisition": "Donation bonus from 15Eur/18Usd or more.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "shadow_hart.gif",
        "name": "Shadow Hart",
        "tier": "T3",
        "boost": "Skill",
        "source": "In Game Shop or Mentor Tokens.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Shadow Hart T3    Skill   In Game Shop or Mentor Tokens.",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "shadowtalon.gif",
        "name": "Shadow talon",
        "tier": "T3",
        "bonus": "+.9% HP/MP, +8 Attack Power, +2% Monster Essence Find, Power 50.",
        "source": "Special or bonus mount source. ",
        "stats": [
          "+.9% HP/MP, +8 Attack Power, +2% Monster Essence Find, Power 50."
        ],
        "bonusKind": "hpmp",
        "searchText": "Shadow talon T3     +.9% HP/MP, +8 Attack Power, +2% Monster Essence Find, Power 50.  ",
        "acquisition": "Special or bonus mount source.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "shock_head_mount_.gif",
        "name": "Shockhead",
        "tier": "T2",
        "boost": "Skill",
        "source": "2nd Warlord Boss Drop.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Shockhead T2    Skill   2nd Warlord Boss Drop.",
        "acquisition": "2nd Warlord Boss Drop.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "siegebreaker.gif",
        "name": "Siege Breaker",
        "tier": "T3",
        "boost": "Skill",
        "source": "In Game Shop or Mentor Tokens.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Siege Breaker T3    Skill   In Game Shop or Mentor Tokens.",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "silver_neck.gif",
        "name": "Siler Neck",
        "tier": "T3",
        "boost": "Skill",
        "source": "Relic Box.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Siler Neck T3    Skill   Relic Box.",
        "sourceLabel": "Pack",
        "acquisition": "Relic Box.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "small_pumpkin_mount.gif",
        "name": "Small Pumpkin Mount",
        "tier": "T2",
        "boost": "Skill",
        "source": "Halloween Event 2019 and 2020. | Tier 2 Halloween Box reward pool from Halloween and 10 Years patch notes. Placeholder image needed. | Halloween 2025 boxes / Pumpkinchu seasonal sources.",
        "stats": [
          "Skill",
          "+4 Attack Power",
          "Power 10"
        ],
        "bonusKind": "special",
        "searchText": "Small Pumpkin Mount T2 Halloween Event 2019 and 2020. | Tier 2 Halloween Box reward pool from Halloween and 10 Years patch notes. Placeholder image needed. | Halloween 2025 boxes / Pumpkinchu seasonal sources. Skill +4 Attack Power Power 10",
        "introduced": "Halloween 2025",
        "sourceLabel": "Pack",
        "acquisition": "Halloween event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "snow_strider_mount.gif",
        "name": "Snow Strider Mount",
        "tier": "T3",
        "boost": "Skill",
        "source": "Level 50 Archpass Reward.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Snow Strider Mount T3    Skill   Level 50 Archpass Reward.",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 50 seasonal reward.",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "sparkion_mount_.gif",
        "name": "Sparkion",
        "tier": "T3",
        "boost": "HP",
        "source": "Relic Box",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Sparkion T3    HP   Relic Box",
        "sourceLabel": "Pack",
        "acquisition": "Relic Box.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "spirit_of_purity.gif",
        "name": "Spirit of Purity",
        "tier": "T5",
        "boost": "Attack Power/Monster Essence",
        "source": "Legacy DEC 2023 - First 75 players to slay Darkness Hydra",
        "stats": [
          "Attack Power/Monster Essence"
        ],
        "bonusKind": "attack",
        "searchText": "Spirit of Purity T5    Attack Power/Monster Essence   Legacy DEC 2023 - First 75 players to slay Darkness Hydra",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Legacy DEC 2023 - First 75 players to slay Darkness Hydra.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "steel_bee.gif",
        "name": "Steel Bee",
        "tier": "T3",
        "boost": "Skill",
        "source": "In Game Shop or Mentor Tokens.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Steel Bee T3    Skill   In Game Shop or Mentor Tokens.",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "tamed_panda.gif",
        "name": "Tamed Panda",
        "tier": "T2",
        "boost": "Skill",
        "source": "Dungeon Boxes or Gusko Spellweaver drop.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Tamed Panda T2    Skill   Dungeon Boxes or Gusko Spellweaver drop.",
        "sourceLabel": "Pack",
        "acquisition": "Dungeon Boxes or Gusko Spellweaver drop.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "hellgrip.gif",
        "name": "The Hellgrip",
        "tier": "T3",
        "boost": "Skill",
        "source": "Relic Box.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "The Hellgrip T3    Skill   Relic Box.",
        "sourceLabel": "Pack",
        "acquisition": "Relic Box.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "tiger_slug.gif",
        "name": "Tiger Slug",
        "tier": "T1",
        "boost": "HP",
        "source": "East Heroes Quest Boss",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Tiger Slug T1    HP   East Heroes Quest Boss",
        "sourceLabel": "Quest",
        "acquisition": "East Heroes Quest Boss.",
        "sourceChips": [
          "Quest"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "tin_lizzard_mount.gif",
        "name": "Tin Lizzard",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Jewelcrafting",
        "source": "Profession cosmetic mount source. Obtained by completing a task from Steve The Addoner NPC.",
        "stats": [
          "Power 10",
          "+2 Jewelcrafting"
        ],
        "bonusKind": "profession",
        "searchText": "Tin Lizzard T2 10    +2 Jewelcrafting  Obtained by completing a task from Steve The Addoner NPC.",
        "acquisition": "Profession cosmetic mount source. Obtained by completing a task from Steve The Addoner NPC.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "titanica.gif",
        "name": "Titanica",
        "tier": "T1",
        "boost": "Skill",
        "source": "Steve The Addoner Task.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Titanica T1    Skill   Steve The Addoner Task.",
        "acquisition": "Steve The Addoner Task.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "tourney_horse.gif",
        "name": "Tourney Horse",
        "tier": "T4",
        "bonus": "+12 Attack Power Power 30.",
        "source": "Special or bonus mount source. Legacy DEC 2023 - All players to obtain 1000 achievement points.",
        "stats": [
          "+12 Attack Power Power 30."
        ],
        "bonusKind": "attack",
        "searchText": "Tourney Horse T4     +12 Attack Power Power 30.  Legacy DEC 2023 - All players to obtain 1000 achievement points.",
        "introduced": "Legacy",
        "sourceLabel": "Achievement",
        "acquisition": "Special or bonus mount source. Legacy DEC 2023 - All players to obtain 1000 achievement points.",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "toxic_toad.gif",
        "name": "Toxic Toad",
        "tier": "T3",
        "boost": "HP",
        "source": "Steve The Addoner Task",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Toxic Toad T3    HP   Steve The Addoner Task",
        "acquisition": "Steve The Addoner Task.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "tundra_rambler_mount.gif",
        "name": "Tundra Rambler",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Woodcutting",
        "source": "Profession cosmetic mount source. Kavdros (World Boss) Loot Bag.",
        "stats": [
          "Power 10",
          "+2 Woodcutting"
        ],
        "bonusKind": "profession",
        "searchText": "Tundra Rambler T2 10    +2 Woodcutting  Kavdros (World Boss) Loot Bag.",
        "acquisition": "Profession cosmetic mount source. Kavdros (World Boss) Loot Bag.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "twilight_guardian_mount.gif",
        "name": "Twilight Guardian Mount",
        "tier": "T4",
        "boost": "Skill",
        "source": "Living Token Exchanger on Ildar (Cross-Server Heirloom).",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Twilight Guardian Mount T4    Skill   Living Token Exchanger on Ildar (Cross-Server Heirloom).",
        "heirloomStatus": "Heirloom",
        "serverStatus": "Cross-server",
        "introduced": "Ildar",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC.",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Cross-server: Abaldar ↔ Legacy",
          "Heirloom / carry-over"
        ]
      },
      {
        "image": "undead_cavebear_28mount_29.gif",
        "name": "Undead Cavebear",
        "tier": "T3",
        "boost": "Skill",
        "source": "Relic Box.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Undead Cavebear T3    Skill   Relic Box.",
        "sourceLabel": "Pack",
        "acquisition": "Relic Box.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "uniwheel.gif",
        "name": "Uniwheel",
        "tier": "T1",
        "boost": "HP",
        "source": "War Golem Task (monster tp)",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Uniwheel T1    HP   War Golem Task (monster tp)",
        "acquisition": "War Golem Task (monster tp).",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "vortexion.gif",
        "name": "Vortexion",
        "tier": "T3",
        "boost": "HP",
        "source": "Relic Box",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Vortexion T3    HP   Relic Box",
        "sourceLabel": "Pack",
        "acquisition": "Relic Box.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "walker_mount.gif",
        "name": "Walker",
        "tier": "T2",
        "power": "10",
        "bonus": "+2 Alchemy",
        "source": "Profession cosmetic mount source. Obtained by using a Bamboo Leaves | or purchased in the in-game Store (650 Archlight Points ).",
        "stats": [
          "Power 10",
          "+2 Alchemy"
        ],
        "bonusKind": "profession",
        "searchText": "Walker T2 10    +2 Alchemy  Obtained by using a Bamboo Leaves | or purchased in the in-game Store (650 Archlight Points ).",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "war_bear.gif",
        "name": "War Bear",
        "tier": "T1",
        "boost": "HP",
        "source": "Dungeon Box Drop",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "War Bear T1    HP   Dungeon Box Drop",
        "sourceLabel": "Pack",
        "acquisition": "Dungeon Box Drop.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "water_buffalo.gif",
        "name": "Water Buffalo",
        "tier": "T2",
        "boost": "Skill",
        "source": "Steve The Addoner Task.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Water Buffalo T2    Skill   Steve The Addoner Task.",
        "acquisition": "Steve The Addoner Task.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "dracona2021_white_griffin_-_first_25_players_200_ap_-_t3_skills.gif",
        "name": "White Griffin",
        "tier": "T3",
        "boost": "Skill",
        "source": "Dracona 200 Achievement Points Race(Heirloom).",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "White Griffin T3    Skill   Dracona 200 Achievement Points Race(Heirloom).",
        "heirloomStatus": "Heirloom",
        "introduced": "Dracona",
        "sourceLabel": "Achievement",
        "acquisition": "Dracona 200 Achievement Points Race.",
        "sourceChips": [],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "white_lion_mount_.gif",
        "name": "White Lion",
        "tier": "T5",
        "boost": "Attack Power",
        "source": "Living Archlight Token - Christmas Event- Legacy DEC 2023",
        "stats": [
          "Attack Power"
        ],
        "bonusKind": "attack",
        "searchText": "White Lion T5    Attack Power   Living Archlight Token - Christmas Event- Legacy DEC 2023",
        "introduced": "Legacy",
        "sourceLabel": "LAT",
        "acquisition": "Christmas event reward.",
        "sourceChips": [
          "LAT",
          "Event"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "white_owl_mount.gif",
        "name": "White Owl",
        "tier": "T3",
        "boost": "Skill",
        "source": "Avuria and Ildar ArchPass Level 100 Reward (Heirloom).",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "White Owl T3    Skill   Avuria and Ildar ArchPass Level 100 Reward (Heirloom).",
        "heirloomStatus": "Heirloom",
        "introduced": "Ildar",
        "sourceLabel": "ArchPass",
        "acquisition": "ArchPass Level 100 seasonal reward.",
        "sourceChips": [
          "ArchPass"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "white_skunk.gif",
        "name": "White Skunk",
        "tier": "T4",
        "boost": "Skill",
        "source": "Cosmetic Crate.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "White Skunk T4    Skill   Cosmetic Crate.",
        "acquisition": "Cosmetic Crate.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "widow_queen.gif",
        "name": "Widow Queen",
        "tier": "T1",
        "boost": "Skill",
        "source": "Steve The Addoner Task",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Widow Queen T1    Skill   Steve The Addoner Task",
        "acquisition": "Steve The Addoner Task.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "winter_king.gif",
        "name": "Winter King",
        "tier": "T3",
        "boost": "Skill",
        "source": "Cosmetic Trader.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Winter King T3    Skill   Cosmetic Trader.",
        "acquisition": "Cosmetic Trader.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "woodland_prince.gif",
        "name": "Woodland Prince",
        "tier": "T3",
        "boost": "Skill",
        "source": "In Game Shop or Mentor Tokens.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Woodland Prince T3    Skill   In Game Shop or Mentor Tokens.",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Wrathfire Pegasus",
        "tier": "T5",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Abaldar 2025 race reward for first 75 players to slay Darkness Hydra.",
        "stats": [
          "T5 Attack Power / Monster Essence"
        ],
        "bonusKind": "attack",
        "searchText": "Wrathfire Pegasus T5 T5 Attack Power / Monster Essence Abaldar 2025 race reward for first 75 players to slay Darkness Hydra.",
        "introduced": "Abaldar",
        "sourceLabel": "Achievement",
        "acquisition": "Abaldar 2025 race reward for first 75 players to slay Darkness Hydra.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Race reward"
        ],
        "worldBehavior": [
          "Abaldar: visual heirloom",
          "Legacy: cross-server heirloom",
          "Legacy bonus-enabled",
          "Cross-server: Abaldar ↔ Legacy"
        ]
      }
    ]
  },
  {
    "id": "wings",
    "name": "Wings",
    "icon": "🪽",
    "description": "Wing cosmetics and wing-style character visuals, kept separate from outfits, mounts, and aura effects.",
    "items": [
      {
        "image": "american_wings.gif",
        "name": "American Wings",
        "tier": "3.5",
        "source": "Special or bonus wing source. Living Token Exchanger For 8 Living Tokens",
        "bonus": "3% essence 25 power.",
        "stats": [
          "3% essence 25 power."
        ],
        "bonusKind": "special",
        "searchText": "American Wings 3.5     3% essence 25 power.  Living Token Exchanger For 8 Living Tokens",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (8 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "balloons.gif",
        "name": "Balloons",
        "tier": "T2",
        "bonus": "HP",
        "source": "Cosmetic Trader or the Legacy Store.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Balloons T2     HP  Cosmetic Trader or the Legacy Store.",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "blackdevil.gif",
        "name": "Black Devil Wings",
        "tier": "T1",
        "bonus": "HP",
        "source": "PvP trader.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Black Devil Wings T1     HP  PvP trader.",
        "acquisition": "PvP trader.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "bluedevil.gif",
        "name": "Blue Devil Wings",
        "tier": "T1",
        "bonus": "HP",
        "source": "PvP trader.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Blue Devil Wings T1     HP  PvP trader.",
        "acquisition": "PvP trader.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "blue_royal_wings.gif",
        "name": "Blue Royal Wings",
        "tier": "T3",
        "bonus": "HP",
        "source": "Obtainable through the Sarandiel Event.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Blue Royal Wings T3     HP  Obtainable through the Sarandiel Event.",
        "sourceLabel": "Event",
        "acquisition": "Obtainable through the Sarandiel Event.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "blue_wings.gif",
        "name": "Blue Wings",
        "tier": "T2",
        "bonus": "HP",
        "source": "Cosmetic Trader or the Legacy Store.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Blue Wings T2     HP  Cosmetic Trader or the Legacy Store.",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "brazil.gif",
        "name": "Brazilian Wings",
        "tier": "3.5",
        "source": "Special or bonus wing source. Living Token Exchanger For 8 Living Tokens",
        "bonus": "3% essence 25 power.",
        "stats": [
          "3% essence 25 power."
        ],
        "bonusKind": "special",
        "searchText": "Brazilian Wings 3.5     3% essence 25 power.  Living Token Exchanger For 8 Living Tokens",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (8 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "british.gif",
        "name": "British Wings",
        "tier": "3.5",
        "source": "Special or bonus wing source. Living Token Exchanger For 8 Living Tokens",
        "bonus": "3% essence 25 power.",
        "stats": [
          "3% essence 25 power."
        ],
        "bonusKind": "special",
        "searchText": "British Wings 3.5     3% essence 25 power.  Living Token Exchanger For 8 Living Tokens",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (8 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "canadian_wings.gif",
        "name": "Canadian Wings",
        "tier": "3.5",
        "source": "Special or bonus wing source. Living Token Exchanger For 8 Living Tokens",
        "bonus": "3% essence 25 power.",
        "stats": [
          "3% essence 25 power."
        ],
        "bonusKind": "special",
        "searchText": "Canadian Wings 3.5     3% essence 25 power.  Living Token Exchanger For 8 Living Tokens",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (8 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "christmas_wings.gif",
        "name": "Christmas Wings",
        "tier": "T2",
        "bonus": "HP",
        "source": "Santa/Christmas Event.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Christmas Wings T2     HP  Santa/Christmas Event.",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "crimson_death_hunter_imp_wings_33772_.gif",
        "name": "Crimson Death Hunter Imp Wings",
        "tier": "T6",
        "bonus": "Attack power",
        "source": "Legacy DEC 2023 Limited Doorbusters Variation.",
        "stats": [
          "Attack power"
        ],
        "bonusKind": "attack",
        "searchText": "Crimson Death Hunter Imp Wings T6     Attack power  Legacy DEC 2023 Limited Doorbusters Variation.",
        "introduced": "Legacy",
        "sourceLabel": "Pack",
        "acquisition": "Doorbuster pack cosmetic.",
        "sourceChips": [
          "Doorbuster"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "death_hunter_imp_wings_33773_.gif",
        "name": "Death Hunter Imp Wings",
        "tier": "T6",
        "bonus": "Attack power",
        "source": "Legacy DEC 2023 Living Archlight Tokens.",
        "stats": [
          "Attack power"
        ],
        "bonusKind": "attack",
        "searchText": "Death Hunter Imp Wings T6     Attack power  Legacy DEC 2023 Living Archlight Tokens.",
        "introduced": "Legacy",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (2023 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Flying Dragon Wings",
        "tier": "T4",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Dragon Combo Pack / Living Token Exchanger, Legacy 2019 Doorbusters. Listed as Flying Dragon Wings for 8 Living Tokens and included in Dragon Combo for 20 Living Tokens. Placeholder image needed.",
        "stats": [
          "Dragon Combo Pack",
          "8 Living Tokens / 20 Living Tokens combo"
        ],
        "bonusKind": "visual",
        "introduced": "Legacy 2019",
        "searchText": "Flying Dragon Wings Dragon Combo Pack Living Token Exchanger Legacy 2019 Doorbusters",
        "sourceLabel": "LAT",
        "acquisition": "Dragon Combo Pack reward from the Legacy 2019 doorbuster/Living Token archive.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Pack source",
          "LAT",
          "Doorbuster"
        ],
        "worldBehavior": [
          "Legacy"
        ]
      },
      {
        "image": "gold_blue_siege_wings_t1.gif",
        "name": "Gold Blue Siege Wings T1",
        "tier": "N/A",
        "source": "Special or bonus wing source. All members From The Winning Guild in Siege (reset weekly)",
        "bonus": "",
        "stats": [],
        "bonusKind": "special",
        "searchText": "Gold Blue Siege Wings T1 N/A       All members From The Winning Guild in Siege (reset weekly)",
        "acquisition": "Special or bonus wing source. All members From The Winning Guild in Siege (reset weekly).",
        "sourceChips": [],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "gold_blue_siege_wings_t2.gif",
        "name": "Gold Blue Siege Wings T2",
        "tier": "N/A",
        "source": "Special or bonus wing source. All members From The 2nd Guild in Siege (reset weekly)",
        "bonus": "",
        "stats": [],
        "bonusKind": "special",
        "searchText": "Gold Blue Siege Wings T2 N/A       All members From The 2nd Guild in Siege (reset weekly)",
        "acquisition": "Special or bonus wing source. All members From The 2nd Guild in Siege (reset weekly).",
        "sourceChips": [],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "gold_blue_siege_wings_t3.gif",
        "name": "Gold Blue Siege Wings T3",
        "tier": "N/A",
        "source": "Special or bonus wing source. All members From The 3nd Guild in Siege (reset weekly)",
        "bonus": "",
        "stats": [],
        "bonusKind": "special",
        "searchText": "Gold Blue Siege Wings T3 N/A       All members From The 3nd Guild in Siege (reset weekly)",
        "acquisition": "Special or bonus wing source. All members From The 3nd Guild in Siege (reset weekly).",
        "sourceChips": [],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "yellow_royal_wings.gif",
        "name": "Golden Royal Wings",
        "tier": "T3",
        "bonus": "HP",
        "source": "Obtainable through the Sarandiel Event.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Golden Royal Wings T3     HP  Obtainable through the Sarandiel Event.",
        "sourceLabel": "Event",
        "acquisition": "Obtainable through the Sarandiel Event.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "golden_wings.gif",
        "name": "Golden Wings",
        "tier": "T2",
        "bonus": "HP",
        "source": "Cosmetic Trader or the Legacy Store.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Golden Wings T2     HP  Cosmetic Trader or the Legacy Store.",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "green_wings.gif",
        "name": "Green Wings",
        "tier": "T2",
        "bonus": "HP",
        "source": "Cosmetic Trader or the Legacy Store.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Green Wings T2     HP  Cosmetic Trader or the Legacy Store.",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "halloween_wings.gif",
        "name": "Halloween Wings",
        "tier": "T3",
        "bonus": "Skill",
        "source": "2020 Halloween Event.",
        "stats": [
          "Skill"
        ],
        "bonusKind": "special",
        "searchText": "Halloween Wings T3     Skill  2020 Halloween Event.",
        "sourceLabel": "Event",
        "acquisition": "Halloween event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "orange_wings.gif",
        "name": "Orange Wings",
        "tier": "T2",
        "bonus": "HP",
        "source": "Cosmetic Trader or the Legacy Store.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Orange Wings T2     HP  Cosmetic Trader or the Legacy Store.",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "polish_wings.gif",
        "name": "Polish Wings",
        "tier": "3.5",
        "source": "Special or bonus wing source. Living Token Exchanger For 8 Living Tokens",
        "bonus": "3% essence 25 power.",
        "stats": [
          "3% essence 25 power."
        ],
        "bonusKind": "special",
        "searchText": "Polish Wings 3.5     3% essence 25 power.  Living Token Exchanger For 8 Living Tokens",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (8 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Present Wings",
        "tier": "T3.5",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Christmas 2023 Christmas Presents ultra rare reward. Multiples do not stack.",
        "stats": [
          "+3% Monster Essence"
        ],
        "bonusKind": "essence",
        "searchText": "Present Wings T3.5 +3% Monster Essence Christmas 2023 Christmas Presents ultra rare reward. Multiples do not stack.",
        "introduced": "Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "pumpkin_wings.gif",
        "name": "Pumpkin Wings",
        "tier": "4",
        "source": "Special or bonus wing source. Living Token Exchanger During Halloween Event",
        "bonus": "3% essence +1% HP/MP.",
        "stats": [
          "3% essence +1% HP/MP."
        ],
        "bonusKind": "hpmp",
        "searchText": "Pumpkin Wings 4     3% essence +1% HP/MP.  Living Token Exchanger During Halloween Event",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC.",
        "sourceChips": [
          "LAT",
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "purple_wings.gif",
        "name": "Purple Wings",
        "tier": "T2",
        "bonus": "HP",
        "source": "Cosmetic Trader or the Legacy Store.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Purple Wings T2     HP  Cosmetic Trader or the Legacy Store.",
        "introduced": "Legacy",
        "sourceLabel": "Store",
        "acquisition": "In-game Store cosmetic.",
        "sourceChips": [
          "Store"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      },
      {
        "image": "reddevil.gif",
        "name": "Red Devil Wings",
        "tier": "T1",
        "bonus": "HP",
        "source": "PvP trader.",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Red Devil Wings T1     HP  PvP trader.",
        "acquisition": "PvP trader.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "royal_fairy_wings.gif",
        "name": "Royal Fairy Wings",
        "tier": "4",
        "source": "Special or bonus wing source. Dracona Hades Quest Race(Heirloom)",
        "bonus": "T4 Skills & HP/MP",
        "stats": [
          "T4 Skills & HP/MP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Royal Fairy Wings 4     T4 Skills & HP/MP  Dracona Hades Quest Race(Heirloom)",
        "heirloomStatus": "Heirloom",
        "introduced": "Dracona",
        "sourceLabel": "Quest",
        "acquisition": "Special or bonus wing source. Dracona Hades Quest Race.",
        "sourceChips": [
          "Quest"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Heirloom / carry-over",
          "Bonus where active"
        ]
      },
      {
        "image": "royal_violet_wingsv2.gif",
        "name": "Royal Violet Wings",
        "tier": "4",
        "source": "Special or bonus wing source. Living Token Exchanger For 8 Living Tokens (Ildar)",
        "bonus": "T4 Skills & HP/MP",
        "stats": [
          "T4 Skills & HP/MP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Royal Violet Wings 4     T4 Skills & HP/MP  Living Token Exchanger For 8 Living Tokens (Ildar)",
        "introduced": "Ildar",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (8 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Historical Ildar/Dracona source",
          "Legacy via merge",
          "Bonus where active"
        ]
      },
      {
        "image": "royal_wings.gif",
        "name": "Royal Wings",
        "tier": "T3",
        "bonus": "HP",
        "source": "",
        "stats": [
          "HP"
        ],
        "bonusKind": "hpmp",
        "searchText": "Royal Wings T3     HP  ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "sweden.gif",
        "name": "Sweden Wings",
        "tier": "3.5",
        "source": "Special or bonus wing source. Living Token Exchanger For 8 Living Tokens",
        "bonus": "3% essence 25 power.",
        "stats": [
          "3% essence 25 power."
        ],
        "bonusKind": "special",
        "searchText": "Sweden Wings 3.5     3% essence 25 power.  Living Token Exchanger For 8 Living Tokens",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (8 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Void Wings",
        "tier": "LAT",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Peddler stock update, 10 Living Archlight Tokens. Placeholder image needed.",
        "stats": [],
        "bonusKind": "visual",
        "searchText": "Void Wings 10 Living Archlight Tokens",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (10 tokens).",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "white_arena_wings_t1.gif",
        "name": "White Red Arena Wings T1",
        "tier": "N/A",
        "source": "Special or bonus wing source. First Arena Team (reset weekly)",
        "bonus": "",
        "stats": [],
        "bonusKind": "special",
        "searchText": "White Red Arena Wings T1 N/A       First Arena Team (reset weekly)",
        "sourceLabel": "Achievement",
        "acquisition": "Special or bonus wing source. First Arena Team (reset weekly).",
        "sourceChips": [],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "white_arena_wings_t2.gif",
        "name": "White Red Arena Wings T2",
        "tier": "N/A",
        "source": "Special or bonus wing source. Second Arena Team (reset weekly)",
        "bonus": "",
        "stats": [],
        "bonusKind": "special",
        "searchText": "White Red Arena Wings T2 N/A       Second Arena Team (reset weekly)",
        "acquisition": "Special or bonus wing source. Second Arena Team (reset weekly).",
        "sourceChips": [],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "white_arena_wings_t3.gif",
        "name": "White Red Arena Wings T3",
        "tier": "N/A",
        "source": "Special or bonus wing source. Third Arena Team (reset weekly)",
        "bonus": "",
        "stats": [],
        "bonusKind": "special",
        "searchText": "White Red Arena Wings T3 N/A       Third Arena Team (reset weekly)",
        "acquisition": "Special or bonus wing source. Third Arena Team (reset weekly).",
        "sourceChips": [],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      }
    ]
  },
  {
    "id": "auras",
    "name": "Auras",
    "icon": "✨",
    "description": "Aura, outline, and character effect cosmetics. Gameplay items and companions are kept out of this list.",
    "items": [
      {
        "image": "anniversary_aura.gif",
        "name": "Anniversary Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "12",
        "hpMp": "",
        "stats": [
          "Power 30",
          "+12 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Anniversary Aura T4 30 12     ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "arcane_shield.gif",
        "name": "Arcane Shield Aura",
        "tier": "T6",
        "power": "",
        "attackPower": "",
        "hpMp": "3%",
        "stats": [
          "+3%% HP/MP"
        ],
        "bonusKind": "special",
        "searchText": "Arcane Shield Aura T6   3%    ",
        "source": "Minerva’s Uprising new cosmetic, 10 LAT. Listed with Health/Mana 3% and Power 50.",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (10 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "black_sword_aura.gif",
        "name": "Black Sword Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "12",
        "hpMp": "",
        "stats": [
          "Power 30",
          "+12 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Black Sword Aura T4 30 12     ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "blue_orb_aura.gif",
        "name": "Blue Orb Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "",
        "hpMp": "1.5",
        "stats": [
          "Power 30",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Blue Orb Aura T4 30  1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "crimson_death_hunter_aura_33774_.gif",
        "name": "Crimson Death Hunter Aura",
        "tier": "T6",
        "power": "50",
        "attackPower": "",
        "hpMp": "2.5",
        "stats": [
          "Power 50",
          "+2.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Crimson Death Hunter Aura T6 50  2.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "death_hunter_aura_33775_.gif",
        "name": "Death Hunter Aura",
        "tier": "T6",
        "power": "50",
        "attackPower": "",
        "hpMp": "2.5",
        "stats": [
          "Power 50",
          "+2.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Death Hunter Aura T6 50  2.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "faith_guard_aura.gif",
        "name": "Faith Guard Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "",
        "hpMp": "1.5",
        "stats": [
          "Power 30",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Faith Guard Aura T4 30  1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "fire_imp_aura.gif",
        "name": "Fire Imp Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "",
        "hpMp": "1.5",
        "stats": [
          "Power 30",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Fire Imp Aura T4 30  1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "flying_skull_aura_bluewhite-.gif",
        "name": "Flying Skulls Aura | (Blue White)",
        "tier": "T4",
        "power": "40",
        "attackPower": "10",
        "hpMp": "1",
        "stats": [
          "Power 40",
          "+10 Attack Power",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Flying Skulls Aura | (Blue White) T4 40 10 1    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "flying_skull_aura_redblack.gif",
        "name": "Flying Skulls Aura | (Red Black)",
        "tier": "T4",
        "power": "40",
        "attackPower": "10",
        "hpMp": "1",
        "stats": [
          "Power 40",
          "+10 Attack Power",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Flying Skulls Aura | (Red Black) T4 40 10 1    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "flying_skull_aura_whiteblack.gif",
        "name": "Flying Skulls Aura | (White Black)",
        "tier": "T4",
        "power": "40",
        "attackPower": "10",
        "hpMp": "1",
        "stats": [
          "Power 40",
          "+10 Attack Power",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Flying Skulls Aura | (White Black) T4 40 10 1    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "ghostly_illumination_aura.gif",
        "name": "Ghostly Illumination Aura",
        "tier": "T5",
        "power": "50",
        "attackPower": "15",
        "hpMp": "1",
        "stats": [
          "Power 50",
          "+15 Attack Power",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Ghostly Illumination Aura T5 50 15 1    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "green_orb_aura.gif",
        "name": "Green Orb Aura",
        "tier": "T5",
        "power": "40",
        "attackPower": "",
        "hpMp": "1.75",
        "stats": [
          "Power 40",
          "+1.75% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Green Orb Aura T5 40  1.75    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "heaven_aura.gif",
        "name": "Heaven Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "12",
        "hpMp": "",
        "stats": [
          "Power 30",
          "+12 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Heaven Aura T4 30 12     ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "hell_aura.gif",
        "name": "Hell Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "12",
        "hpMp": "",
        "stats": [
          "Power 30",
          "+12 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Hell Aura T4 30 12     ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "illumination_aura.gif",
        "name": "Illumination Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "",
        "hpMp": "1.5",
        "stats": [
          "Power 30",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Illumination Aura T4 30  1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "magma_illumination_aura.gif",
        "name": "Magma Illumination Aura",
        "tier": "T3",
        "power": "30",
        "attackPower": "5",
        "hpMp": "0.5",
        "stats": [
          "Power 30",
          "+5 Attack Power",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Magma Illumination Aura T3 30 5 0.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "mystic_aura.gif",
        "name": "Mystic Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "",
        "hpMp": "1.5",
        "stats": [
          "Power 30",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Mystic Aura T4 30  1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "pink_orb_aura.gif",
        "name": "Pink Orb Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "",
        "hpMp": "1.5",
        "stats": [
          "Power 30",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Pink Orb Aura T4 30  1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "purple_swords_aura.gif",
        "name": "Purple Swords Aura",
        "tier": "-",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "stats": [],
        "bonusKind": "special",
        "searchText": "Purple Swords Aura -       ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "red_orb_aura.gif",
        "name": "Red Orb Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "",
        "hpMp": "1.5",
        "stats": [
          "Power 30",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Red Orb Aura T4 30  1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "red_sword_aura.gif",
        "name": "Red Sword Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "",
        "hpMp": "1.5",
        "stats": [
          "Power 30",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Red Sword Aura T4 30  1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "sin_aura.gif",
        "name": "Sin Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "",
        "hpMp": "1.5",
        "stats": [
          "Power 30",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Sin Aura T4 30  1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "static_aura.gif",
        "name": "Static Aura",
        "tier": "T4",
        "power": "30",
        "attackPower": "",
        "hpMp": "1.5",
        "stats": [
          "Power 30",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Static Aura T4 30  1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "tainted_aura.gif",
        "name": "Tainted Aura",
        "tier": "T6",
        "power": "50",
        "attackPower": "30",
        "hpMp": "",
        "stats": [
          "Power 50",
          "+30 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Tainted Aura T6 50 30     ",
        "source": "Minerva’s Uprising new cosmetic, 10 LAT. Listed with Attack Power 30 and Power 50.",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (10 tokens).",
        "sourceChips": [
          "LAT"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "void_aura.gif",
        "name": "Void Aura",
        "tier": "T6",
        "power": "50",
        "attackPower": "25",
        "hpMp": "2.5",
        "stats": [
          "Power 50",
          "+25 Attack Power",
          "+2.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Void Aura T6 50 25 2.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "worldboss_aura_draconas_flame.gif",
        "name": "World Boss Aura | (Dracona's Flame)",
        "tier": "T4",
        "power": "40",
        "attackPower": "10",
        "hpMp": "1",
        "stats": [
          "Power 40",
          "+10 Attack Power",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "World Boss Aura | (Dracona's Flame) T4 40 10 1    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "worldboss_aura_ildars_stormshield.gif",
        "name": "World Boss Aura | (Ildar's Stormshield)",
        "tier": "T4",
        "power": "40",
        "attackPower": "10",
        "hpMp": "1",
        "stats": [
          "Power 40",
          "+10 Attack Power",
          "+1% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "World Boss Aura | (Ildar's Stormshield) T4 40 10 1    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      }
    ]
  },
  {
    "id": "shaders",
    "name": "Shaders",
    "icon": "🌈",
    "description": "Shader-style visual cosmetics, including supported box, LAT, and event sources where known.",
    "items": [
      {
        "image": "lightning_shader.gif",
        "name": "Lightning Shader",
        "tier": "-",
        "power": "50",
        "attackPower": "",
        "hpMp": "2.5",
        "additionalBonus": "",
        "stats": [
          "Power 50",
          "+2.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Lightning Shader - 50  2.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "30e3cd11f4375d59aa90877c548144b1.gif",
        "name": "Magma Outline",
        "tier": "T4",
        "power": "Monster Essence",
        "attackPower": "",
        "hpMp": "0.5",
        "additionalBonus": "",
        "stats": [
          "Power Monster Essence",
          "+0.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Magma Outline T4 Monster Essence  0.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Magma Shader",
        "tier": "Visual",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Magma Box choice from Abaldar launch doorbuster / Living Archlight Tokens NPC. User/team note: treated as cross-server when obtained from doorbuster or LAT NPC. Placeholder image needed.",
        "stats": [
          "Visual shader",
          "Magma Box choice"
        ],
        "bonusKind": "visual",
        "introduced": "Abaldar launch",
        "serverStatus": "Cross-server: Legacy + Abaldar",
        "searchText": "Magma Shader Magma Box Doorbuster LAT NPC Cross-server Legacy Abaldar",
        "sourceLabel": "LAT",
        "acquisition": "Choose from Magma Box, or purchase through the Living Archlight Tokens NPC when available.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Magma Box",
          "LAT",
          "Doorbuster"
        ],
        "worldBehavior": [
          "Abaldar visual",
          "Cross-server: Abaldar ↔ Legacy"
        ]
      },
      {
        "image": "outline_shader_blazing.gif",
        "name": "Outline Shader | (Blazing)",
        "tier": "T4",
        "power": "30",
        "attackPower": "12",
        "hpMp": "",
        "additionalBonus": "4% Monster Essence",
        "stats": [
          "Power 30",
          "+12 Attack Power",
          "4% Monster Essence"
        ],
        "bonusKind": "power",
        "searchText": "Outline Shader | (Blazing) T4 30 12    4% Monster Essence ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "outline_shader_desert.gif",
        "name": "Outline Shader | (Desert)",
        "tier": "T4",
        "power": "30",
        "attackPower": "12",
        "hpMp": "",
        "additionalBonus": "4% Monster Essence",
        "stats": [
          "Power 30",
          "+12 Attack Power",
          "4% Monster Essence"
        ],
        "bonusKind": "power",
        "searchText": "Outline Shader | (Desert) T4 30 12    4% Monster Essence ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "outline_shader_flourish.gif",
        "name": "Outline Shader | (Flourish)",
        "tier": "T4",
        "power": "30",
        "attackPower": "12",
        "hpMp": "",
        "additionalBonus": "4% Monster Essence",
        "stats": [
          "Power 30",
          "+12 Attack Power",
          "4% Monster Essence"
        ],
        "bonusKind": "power",
        "searchText": "Outline Shader | (Flourish) T4 30 12    4% Monster Essence ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "outline_shader_forest.gif",
        "name": "Outline Shader | (Forest)",
        "tier": "T4",
        "power": "30",
        "attackPower": "12",
        "hpMp": "",
        "additionalBonus": "4% Monster Essence",
        "stats": [
          "Power 30",
          "+12 Attack Power",
          "4% Monster Essence"
        ],
        "bonusKind": "power",
        "searchText": "Outline Shader | (Forest) T4 30 12    4% Monster Essence ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "outline_shader_ocean.gif",
        "name": "Outline Shader | (Ocean)",
        "tier": "T4",
        "power": "30",
        "attackPower": "12",
        "hpMp": "",
        "additionalBonus": "4% Monster Essence",
        "stats": [
          "Power 30",
          "+12 Attack Power",
          "4% Monster Essence"
        ],
        "bonusKind": "power",
        "searchText": "Outline Shader | (Ocean) T4 30 12    4% Monster Essence ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Outline Shaders",
        "tier": "LAT",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Peddler stock update, 8 Living Archlight Tokens. Placeholder image needed.",
        "stats": [],
        "bonusKind": "visual",
        "searchText": "Outline Shaders 8 Living Archlight Tokens",
        "sourceLabel": "LAT",
        "acquisition": "Living Archlight Tokens NPC (8 tokens).",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "LAT",
          "Peddler"
        ],
        "worldBehavior": [
          "Visual cosmetic"
        ]
      },
      {
        "image": "shimmering_shader.gif",
        "name": "Shimmering Shader",
        "tier": "T4",
        "power": "30",
        "attackPower": "12",
        "hpMp": "1.5",
        "additionalBonus": "",
        "stats": [
          "Power 30",
          "+12 Attack Power",
          "+1.5% HP/MP"
        ],
        "bonusKind": "power",
        "searchText": "Shimmering Shader T4 30 12 1.5    ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "shine_shader.gif",
        "name": "Shine Shader",
        "tier": "T4",
        "power": "40",
        "attackPower": "12",
        "hpMp": "",
        "additionalBonus": "",
        "stats": [
          "Power 40",
          "+12 Attack Power"
        ],
        "bonusKind": "power",
        "searchText": "Shine Shader T4 40 12     ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "snow_outline.gif",
        "name": "Snow Outline",
        "tier": "T3",
        "power": "HP/MP",
        "attackPower": "",
        "hpMp": "0.5",
        "additionalBonus": "",
        "stats": [
          "Power HP/MP",
          "+0.5% HP/MP",
          "T3 Health/Mana"
        ],
        "bonusKind": "hpmp",
        "searchText": "Snow Outline T3 HP/MP  0.5    ",
        "source": "Christmas 2023 special login gift on December 24-25, non-heirloom.",
        "introduced": "Christmas 2023",
        "sourceLabel": "Event",
        "acquisition": "Christmas event reward.",
        "sourceChips": [
          "Event"
        ],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "snow_shader.gif",
        "name": "Snow Shader",
        "tier": "T5",
        "power": "Attack Power",
        "attackPower": "15",
        "hpMp": "",
        "additionalBonus": "",
        "stats": [
          "Power Attack Power",
          "+15 Attack Power"
        ],
        "bonusKind": "attack",
        "searchText": "Snow Shader T5 Attack Power 15     ",
        "acquisition": "Archive source not listed.",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Swipe Lines Shader",
        "tier": "Heirloom Shader",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Legacy 2025 donation doorbuster Hexblade Box choice.",
        "stats": [
          "+20 Attack Power",
          "+2% Monster Essence"
        ],
        "bonusKind": "attack",
        "searchText": "Swipe Lines Shader Heirloom Shader +20 Attack Power +2% Monster Essence Legacy 2025 donation doorbuster Hexblade Box choice.",
        "introduced": "Legacy",
        "sourceLabel": "Pack",
        "acquisition": "Doorbuster pack cosmetic.",
        "imageStatus": "Placeholder",
        "sourceChips": [
          "Doorbuster"
        ],
        "worldBehavior": [
          "Legacy",
          "Bonus where active"
        ]
      }
    ]
  },
  {
    "id": "titles",
    "name": "Titles",
    "icon": "🏷️",
    "description": "Static and animated title cosmetics shown through the character/title interface.",
    "items": [
      {
        "image": "",
        "name": "Beast Chronicler",
        "tier": "Bestiary Title",
        "power": "",
        "attackPower": "15",
        "hpMp": "",
        "source": "Unlockable golden title from Bestiary achievements. Requires 10,000 kills on any monster category.",
        "stats": [
          "+15 Attack Power",
          "10,000 kills in any monster category"
        ],
        "bonusKind": "attack",
        "searchText": "Beast Chronicler Bestiary Title 10000 kills any monster category +15 Attack Power golden title",
        "sourceLabel": "Achievement",
        "acquisition": "Unlockable golden title from Bestiary achievements. Requires 10,000 kills on any monster category.",
        "imageStatus": "Placeholder",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Eternal Paragon Animated RGB Title",
        "tier": "Account Title",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Available to big donation pack holders in Legacy 2025 and Abaldar 2025 donation notes. One token per account.",
        "stats": [
          "Animated account title"
        ],
        "bonusKind": "visual",
        "searchText": "Eternal Paragon Animated RGB Title Account Title Animated account title Available to big donation pack holders in Legacy 2025 and Abaldar 2025 donation notes. One token per account.",
        "introduced": "Abaldar, Legacy",
        "acquisition": "Available to big donation pack holders in Legacy 2025 and Abaldar 2025 donation notes. One token per account.",
        "imageStatus": "Placeholder",
        "sourceChips": [],
        "worldBehavior": [
          "Legacy",
          "Abaldar visual"
        ]
      },
      {
        "image": "",
        "name": "Harbinger of Darkness",
        "tier": "Bestiary Title",
        "power": "",
        "attackPower": "",
        "hpMp": "2",
        "source": "Unlockable golden title from Bestiary achievements. Requires 10,000 kills on Darkness monsters.",
        "stats": [
          "+2% Health/Mana",
          "10,000 Darkness monster kills"
        ],
        "bonusKind": "hpmp",
        "searchText": "Harbinger of Darkness Bestiary Title 10000 Darkness monsters +2% Health Mana golden title",
        "sourceLabel": "Achievement",
        "acquisition": "Unlockable golden title from Bestiary achievements. Requires 10,000 kills on Darkness monsters.",
        "imageStatus": "Placeholder",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Lore Keeper",
        "tier": "Bestiary Title",
        "power": "",
        "attackPower": "10",
        "hpMp": "",
        "source": "Unlockable golden title from Bestiary achievements. Requires 2,500 kills on any monster type.",
        "stats": [
          "+10 Attack Power",
          "2,500 kills on any monster type"
        ],
        "bonusKind": "attack",
        "searchText": "Lore Keeper Bestiary Title 2500 kills any monster +10 Attack Power golden title",
        "sourceLabel": "Achievement",
        "acquisition": "Unlockable golden title from Bestiary achievements. Requires 2,500 kills on any monster type.",
        "imageStatus": "Placeholder",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      },
      {
        "image": "",
        "name": "Master of Beasts",
        "tier": "Bestiary Title",
        "power": "",
        "attackPower": "",
        "hpMp": "",
        "source": "Unlockable golden title from Bestiary achievements. Requires completing all Step 5 milestones across Regular, Dimensional, and Darkness monsters.",
        "stats": [
          "+5 All Stats",
          "All Step 5 Bestiary milestones"
        ],
        "bonusKind": "skill",
        "searchText": "Master of Beasts Bestiary Title Step 5 Regular Dimensional Darkness monsters +5 All Stats golden title",
        "sourceLabel": "Achievement",
        "acquisition": "Unlockable golden title from Bestiary achievements. Requires completing all Step 5 milestones across Regular, Dimensional, and Darkness monsters.",
        "imageStatus": "Placeholder",
        "sourceChips": [],
        "worldBehavior": [
          "Bonus where active"
        ]
      }
    ]
  }
];

  const SOURCE_CARDS = [
    { icon:'🧳', title:'Peddler', text:'Seasonal and rotating cosmetics can appear through the Peddler depending on the current setup.' },
    { icon:'🪙', title:'Living Archlight Token NPC', text:'Some cosmetics can be bought through the Living Archlight Token NPC when available.' },
    { icon:'🎁', title:'Crates and Boxes', text:'Crates, boxes, and special packs may contain cosmetics or cosmetic tokens.' },
    { icon:'⚔️', title:'Bosses, Quests, and Events', text:'Some entries can come from world bosses, event rewards, loot bags, quests, or seasonal routes.' },
    { icon:'🏛️', title:'Archlight Points Store', text:'Certain unlocks or cosmetic tools can be available through the Archlight Points store.' },
    { icon:'🤝', title:'Player Trading', text:'Tradeable cosmetics can also move between players through normal player trading.' }
  ];
  const ACCENTS = ['cyan','gold','green','violet','ember','blue'];
  const state = { active: CATEGORIES[0]?.id || '', query:'', filter:'all' };
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const clean = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const allItems = () => CATEGORIES.flatMap((cat, catIndex) => cat.items.map(item => ({...item, catId:cat.id, catName:cat.name, catIcon:cat.icon, catAccent:accentFor(cat, catIndex)})));
  const categoryIndex = () => Math.max(0, CATEGORIES.findIndex(cat => cat.id === state.active));
  const category = () => CATEGORIES[categoryIndex()] || CATEGORIES[0];
  const accentFor = (cat, idx = CATEGORIES.findIndex(c => c.id === cat.id)) => ACCENTS[((idx < 0 ? 0 : idx) % ACCENTS.length)];
  const hasBonus = item => Array.isArray(item.stats) && item.stats.length > 0 && item.bonusKind !== 'visual';
  const tierOf = item => String(item.tier || item.type || item.bonus || '').trim() || 'Visual';
  const tierKey = item => {
    const tier = tierOf(item).toLowerCase().replace(/tier/g,'t').replace(/[^a-z0-9.]/g,'');
    if(tier.includes('1')) return 't1';
    if(tier.includes('2')) return 't2';
    if(tier.includes('3')) return 't3';
    if(tier.includes('4')) return 't4';
    if(tier.includes('5')) return 't5';
    return 'visual';
  };
  function sourceKind(item){
    const source = String(item.source || '').toLowerCase();
    if(source.includes('boss') || source.includes('quest')) return 'boss';
    if(source.includes('event') || source.includes('season') || source.includes('halloween') || source.includes('christmas')) return 'event';
    if(source.includes('store') || source.includes('donation') || source.includes('archlight points') || source.includes('game shop')) return 'store';
    if(source.includes('token') || source.includes('lat') || source.includes('living')) return 'token';
    if(source.includes('peddler')) return 'peddler';
    if(source.includes('trade')) return 'trade';
    return 'other';
  }
  function sourceLabel(kind){
    return ({boss:'Boss / Quest', event:'Event', store:'Store', token:'Token NPC', peddler:'Peddler', trade:'Trading', other:'Other'})[kind] || 'Other';
  }
  function compactSource(item){
    const source = String(item.acquisition || item.source || '').replace(/\s*\|\s*/g, ' · ').replace(/\s+/g,' ').trim();
    if(!source || /source not listed/i.test(source)) return 'Archive source not listed.';
    return source.replace(/\s+\./g,'.');
  }
  function sourceTone(label){
    const l = String(label || '').toLowerCase();
    if(l.includes('abaldar')) return 'abaldar';
    if(l.includes('legacy')) return 'legacy';
    if(l.includes('cross')) return 'cross';
    if(l.includes('historical') || l.includes('merge')) return 'history';
    if(l.includes('heirloom')) return 'heirloom';
    if(l.includes('bonus')) return 'bonus';
    if(l.includes('event') || l.includes('archpass') || l.includes('lat') || l.includes('doorbuster') || l.includes('race') || l.includes('store') || l.includes('peddler')) return 'system';
    return 'neutral';
  }
  function compactChips(labels, className){
    const seen = new Set();
    return (labels || []).filter(label => {
      if(!label || /confirm|unknown|tbd|needs/i.test(label)) return false;
      const key = String(label).toLowerCase();
      if(seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0,4).map(label => `<span class="${className}" data-meta-tone="${clean(sourceTone(label))}">${clean(label)}</span>`).join('');
  }
  function worldBehavior(item){
    if(Array.isArray(item.worldBehavior) && item.worldBehavior.length) return item.worldBehavior;
    const src = `${item.source || ''} ${item.acquisition || ''} ${item.introduced || ''}`.toLowerCase();
    const out = [];
    if(src.includes('dracona') || src.includes('ildar')) out.push('Legacy via historical merge');
    if(src.includes('abaldar') && src.includes('race')) out.push('Abaldar: visual heirloom', 'Legacy: cross-server heirloom');
    else if(src.includes('abaldar')) out.push('Abaldar visual');
    if(src.includes('cross-server') || src.includes('cross server')) out.push('Cross-server: Abaldar ↔ Legacy');
    if(src.includes('legacy') && !out.some(x=>x.includes('Legacy'))) out.push('Legacy');
    if(hasBonus(item) && !out.some(x=>/bonus/i.test(x))) out.push('Bonus where active');
    if(!out.length) out.push(hasBonus(item) ? 'Bonus where active' : 'Visual cosmetic');
    return out;
  }
  function sourceChips(item){
    if(Array.isArray(item.sourceChips) && item.sourceChips.length) return item.sourceChips;
    const src = `${item.source || ''} ${item.acquisition || ''}`.toLowerCase();
    const out = [];
    if(src.includes('archpass') || src.includes('arch pass')) out.push('ArchPass');
    if(src.includes('living archlight') || src.includes(' lat') || src.includes('living token')) out.push('LAT');
    if(src.includes('doorbuster')) out.push('Doorbuster');
    if(src.includes('peddler')) out.push('Peddler');
    if(src.includes('race reward')) out.push('Race reward');
    if(src.includes('event') || src.includes('halloween') || src.includes('christmas') || src.includes('easter')) out.push('Event');
    if(src.includes('store') || src.includes('cosmetic shop')) out.push('Store');
    return out;
  }
  function renderStats(){
    $('[data-addon-total]').textContent = allItems().length;
    $('[data-addon-category-count]').textContent = CATEGORIES.length;
    $('[data-addon-bonus-count]').textContent = allItems().filter(hasBonus).length;
  }
  function renderSources(){
    const host = $('[data-addon-sources]');
    host.innerHTML = SOURCE_CARDS.map((card, index) => `
      <article class="addon-source-card" data-addon-accent="${ACCENTS[index % ACCENTS.length]}">
        <div class="addon-source-icon" aria-hidden="true">${card.icon}</div>
        <div><h4>${clean(card.title)}</h4><p>${clean(card.text)}</p></div>
      </article>`).join('');
  }
  function tierOptions(){
    const seen = new Map();
    allItems().forEach(item => {
      const key = tierKey(item);
      const label = tierOf(item);
      if(!seen.has(key)) seen.set(key, label);
    });
    return Array.from(seen.entries()).sort((a,b)=>String(a[1]).localeCompare(String(b[1]), undefined, {numeric:true}));
  }
  function renderFilters(){
    const coreFilters = [
      ['all','All'], ['bonus','With Bonus'], ['visual','Visual Only']
    ];
    const sourceFilters = [
      ['store','Store'], ['token','Token NPC'], ['boss','Boss / Quest'], ['event','Event'], ['peddler','Peddler'], ['trade','Trading']
    ];
    const tierFilters = tierOptions().map(([key,label]) => [`tier:${key}`, label, key]);
    const buttons = (items, group) => items.map(([id,label,key]) =>
      `<button class="addon-filter ${state.filter===id?'is-active':''}" data-addon-filter="${clean(id)}" data-filter-group="${clean(group)}" ${key ? `data-tier-key="${clean(key)}"` : ''} type="button">${clean(label)}</button>`
    ).join('');
    $('[data-addon-filters]').innerHTML = `
      <div class="addon-filter-group"><span class="addon-filter-group-label">✦ Display</span><div class="addon-filter-buttons">${buttons(coreFilters,'bonus')}</div></div>
      <div class="addon-filter-group"><span class="addon-filter-group-label">◆ Tier</span><div class="addon-filter-buttons">${buttons(tierFilters,'tier')}</div></div>
      <div class="addon-filter-group"><span class="addon-filter-group-label">⌁ Source</span><div class="addon-filter-buttons">${buttons(sourceFilters,'source')}</div></div>`;
  }
  function categoryMeta(cat){
    const bonusCount = cat.items.filter(hasBonus).length;
    const tiers = new Set(cat.items.map(tierOf).filter(Boolean));
    return `<i>${cat.items.length} entries</i><i>${bonusCount} bonuses</i><i>${tiers.size} tiers</i>`;
  }
  function renderMenu(){
    const host = $('[data-addon-menu]');
    host.innerHTML = CATEGORIES.map((cat, index) => `
      <button class="${cat.id===state.active?'is-active':''}" data-addon-cat="${clean(cat.id)}" data-addon-accent="${accentFor(cat,index)}" type="button">
        <span class="addon-menu-icon">${cat.icon || '✦'}</span>
        <span><span class="addon-menu-name">${clean(cat.name)}</span><span class="addon-menu-meta">${categoryMeta(cat)}</span></span>
        <span class="addon-menu-count">${cat.items.length}</span>
      </button>`).join('');
  }
  function itemMatches(item){
    const hay = `${item.name||''} ${tierOf(item)} ${item.power||''} ${item.attackPower||''} ${item.hpMp||''} ${(item.stats||[]).join(' ')} ${item.source||''} ${item.catName||''}`.toLowerCase();
    if(state.query && !hay.includes(state.query.toLowerCase())) return false;
    if(state.filter === 'bonus') return hasBonus(item);
    if(state.filter === 'visual') return !hasBonus(item);
    if(state.filter.startsWith('tier:')) return tierKey(item) === state.filter.slice(5);
    if(['store','boss','event','token','peddler','trade'].includes(state.filter)) return sourceKind(item) === state.filter;
    return true;
  }
  function statLabel(raw){
    const text = String(raw || '').trim();
    if(!text) return {icon:'✦', label:'Bonus', value:'Unlisted', tone:'neutral'};
    if(/^power\s+/i.test(text)) return {icon:'◆', label:'Power', value:text.replace(/^power\s+/i,''), tone:'power'};
    if(/attack power/i.test(text)) return {icon:'⚔', label:'Attack', value:text.replace(/\s*attack power/i,''), tone:'attack'};
    if(/hp\/mp/i.test(text)) return {icon:'♥', label:'HP / MP', value:text.replace(/\s*hp\/mp/i,''), tone:'hpmp'};
    if(/skill/i.test(text)) return {icon:'✣', label:'Skills', value:text, tone:'skill'};
    if(/monster essence|essence/i.test(text)) return {icon:'✧', label:'Essence', value:text.replace(/\s*monster essence/i,''), tone:'essence'};
    return {icon:'✦', label:'Bonus', value:text, tone:'special'};
  }
  function renderStatPill(stat){
    const s = statLabel(stat);
    return `<span class="addon-bonus-chip" data-bonus-tone="${clean(s.tone)}"><i>${clean(s.icon)}</i><b>${clean(s.label)}</b><strong>${clean(s.value)}</strong></span>`;
  }
  function sourceIcon(kind){
    return ({boss:'⚔', event:'✦', store:'🏛', token:'🪙', peddler:'🧳', trade:'🤝', other:'◆'})[kind] || '◆';
  }
  function renderCard(item){
    const kind = sourceKind(item);
    const image = item.image ? `<img src="${MEDIA_BASE}${clean(item.image)}" alt="${clean(item.name)}" loading="lazy" data-lightbox-image>` : '<span class="addon-no-media">✦</span>';
    const bonusLine = hasBonus(item)
      ? `<div class="addon-bonus-row">${item.stats.map(renderStatPill).join('')}</div>`
      : '<div class="addon-bonus-row"><span class="addon-bonus-chip" data-bonus-tone="visual"><i>◇</i><b>Visual</b><strong>No listed power bonus</strong></span></div>';
    return `<article class="addon-entry-card" data-source-kind="${kind}" data-addon-accent="${clean(item.catAccent || 'cyan')}" data-tier-key="${tierKey(item)}">
      <div class="addon-media">${image}</div>
      <div class="addon-card-body">
        <div class="addon-card-main">
          <div class="addon-title-zone">
            <div class="addon-title-line">
              <h4>${clean(item.name || 'Unnamed Cosmetic')}</h4>
              <span class="addon-tier-seal">${clean(tierOf(item))}</span>
            </div>
            <div class="addon-card-sub">
              <span class="addon-role-chip ${hasBonus(item)?'power':'visual'}">${hasBonus(item)?'Power cosmetic':'Visual cosmetic'}</span>
              <span class="addon-route-chip" data-source-kind="${kind}">${sourceIcon(kind)} ${clean(sourceLabel(kind))}</span>
            </div>
          </div>
        </div>
        ${bonusLine}
        <div class="addon-source-box addon-world-box">
          <span class="addon-source-kicker">Acquisition</span>
          <span class="addon-source-copy">${clean(compactSource(item))}</span>
          ${compactChips(sourceChips(item),'addon-source-mini-tag') ? `<span class="addon-source-kicker addon-source-kicker-sub">Source</span><span class="addon-meta-tags addon-source-tags">${compactChips(sourceChips(item),'addon-source-mini-tag')}</span>` : ''}
          <span class="addon-source-kicker addon-source-kicker-sub">World Behavior</span>
          <span class="addon-meta-tags addon-world-tags">${compactChips(worldBehavior(item),'addon-meta-tag')}</span>
        </div>
      </div>
    </article>`;
  }
  function renderEntries(){
    const cat = category();
    const accent = accentFor(cat, categoryIndex());
    let items = cat.items.map(item => ({...item, catId:cat.id, catName:cat.name, catIcon:cat.icon, catAccent:accent}));
    items = items.filter(itemMatches);
    const header = $('[data-addon-selected-summary]');
    header.setAttribute('data-addon-accent', accent);
    header.innerHTML = `<div><h3>${cat.icon || '✦'} ${clean(cat.name)}</h3><p>${clean(cat.description || 'Cosmetic collection entries with tier, bonus, and source notes.')}</p></div><span class="addon-count-pill">${items.length} shown</span>`;
    $('[data-addon-entries]').innerHTML = items.length ? items.map(renderCard).join('') : '<div class="addon-empty">No entries match the current search and filters.</div>';
  }
  function renderAll(){ renderFilters(); renderMenu(); renderEntries(); wireLightbox(); }
  function wire(){
    $('[data-addon-search]')?.addEventListener('input', e => { state.query = e.target.value.trim(); renderEntries(); wireLightbox(); });
    document.addEventListener('click', e => {
      const cat = e.target.closest('[data-addon-cat]');
      if(cat){ state.active = cat.getAttribute('data-addon-cat'); renderAll(); return; }
      const filter = e.target.closest('[data-addon-filter]');
      if(filter){ state.filter = filter.getAttribute('data-addon-filter'); renderAll(); return; }
      const nav = e.target.closest('[data-section-target]');
      if(nav){
        $$('.ut-section-nav button').forEach(b=>b.classList.remove('active'));
        nav.classList.add('active');
        const target = document.getElementById(nav.getAttribute('data-section-target'));
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  }
  function wireLightbox(){
    const box = $('.aw-lightbox'); if(!box) return;
    const img = box.querySelector('img'); const caption = box.querySelector('.aw-lightbox-caption');
    $$('[data-lightbox-image]').forEach(media => {
      media.onclick = () => {
        img.src = media.src; img.alt = media.alt || '';
        caption.textContent = media.alt || '';
        box.classList.add('is-open'); box.setAttribute('aria-hidden','false');
      };
    });
    box.querySelector('.aw-lightbox-close')?.addEventListener('click',()=>{box.classList.remove('is-open');box.setAttribute('aria-hidden','true');});
    box.addEventListener('click',e=>{if(e.target===box){box.classList.remove('is-open');box.setAttribute('aria-hidden','true');}});
  }
  function init(){ renderStats(); renderSources(); renderAll(); wire(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
