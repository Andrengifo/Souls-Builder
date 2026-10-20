# Souls Builder

A web-based build simulator for the Souls series. Pick stats, weapons, armor, rings and spells, and instantly see how the build changes your damage, HP, stamina, equip load and more.

**Live demo:** https://andrengifo.github.io/Souls-Builder/

![Souls Builder screenshot](images/Screenshot%20first%20upload%20to%20Github.png)

> The project currently supports **Dark Souls III**. Dark Souls 1, 2, Bloodborne and Elden Ring are planned.

## Features

- **Character stats:** all 9 Dark Souls III stats in a two-column form.
- **Weapons:** right-hand and left-hand slots with independent damage, including the penalty for not meeting stat requirements.
- **Armor:** Elite Knight set (helm, armor, gauntlets, leggings) with total weight and physical defense.
- **Rings:** 4 ring slots (the Dark Souls III limit). Ring of Favor applies percentage bonuses to HP, stamina and max equip load; Flynn's Ring adds a damage bonus that depends on how light your equipment is.
- **Derived results:** HP (Vigor), stamina (Endurance), attunement slots (Attunement), equip load, weight ratio and roll type (fast / medium / fat).
- **Spells:** sorceries, miracles and pyromancies, with slots used vs. available and warnings for unmet requirements.

## Tech stack

HTML, CSS and vanilla JavaScript. No frameworks or build step.

## Project structure

- `index.html` – page layout
- `style.css` – dark/gold theme and three-column layout
- `script.js` – game data (grouped per game, e.g. `datos.ds3`) and calculation functions
- `scriptjunior.js` – UI logic that reads the form and displays results

## Run locally

Open `index.html` in your browser, or use the Live Server extension in VS Code for automatic reloading.

## Data and accuracy

Game data (weapon stats at +10, armor, rings, spells, HP / stamina / attunement / equip load tables) was collected from community wikis such as Fextralife. Some values are approximations and are marked as such in the code.

## Known limitations

- **Damage formula is simplified.** Scaling grades add a flat bonus, while the real game uses per-weapon coefficients and stat saturation curves.
- Weapons are modeled only at their regular +10 level; upgrade levels and infusions are not selectable yet.
- Hornet Ring is in the catalog but has no effect, since critical damage is not modeled.
- Spell catalysts (staffs, chimes, flames) are not modeled yet.
- Unmet spell requirements show a warning instead of blocking the selection.

## Roadmap

- Weapon upgrade levels (+0 to +10) and infusions
- Real scaling formula for damage
- Clickable equipment slots inspired by the Destiny 2 Companion app
- Block spells that don't meet requirements or slot limits
- More weapons, armor sets, rings and spells
- Support for Dark Souls 1, 2, Bloodborne and Elden Ring

## Disclaimer

This is a fan-made project and is not affiliated with FromSoftware or Bandai Namco. All game names and related content belong to their respective owners.