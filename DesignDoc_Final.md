# Design Intent: Embers of Choice (Final Revision)

**Status:** Final Desktop Master (Post-Revision)

## 1. Visual Rules & Mood
*   **The Mood:** "Desperate Majesty." A heavy, cinematic atmosphere. The UI should not feel like a menu, but like a window into a dying world.
*   **The Living Background:** The site background features a deep black to smoldering fire gradient (radial-gradient originating from `50% 120%`). 
*   **Fire Glow:** A specialized `.fire-glow` element provides a low-frequency, irregular flickering light (jittery blur and scale shifts) to simulate a real fire source at the bottom of the screen.
*   **Key Visual Elements:** High-grain stone textures, multi-colored "ash" and "ember" particles (reds, golds, oranges, and white sparks) drifting upward with a distinct rightward wind-drift.
*   **Atmospheric Depth:** To prioritize UI legibility, all embers and fire effects are positioned *behind* the interactive slots (`z-index: 1`).
*   **Character Imagery (Idle):** To maintain the "window" aesthetic without the images feeling cramped, character portraits in the idle state feature a soft **radial-gradient mask** that fades the edges, preventing them from touching the box borders.
*   **Evaluation Standard:** REJECT any "clean" or "minimalist" UI. If the background is a solid flat color, it fails the "Alive" requirement.

## 2. Color Palette
*   **Primary (Background):** `#050505` (Void Black) with a transition to `#2A1005` (Deep Ember).
*   **Secondary (UI/Cards):** `#1A1614` (Burnt Iron) with 0.8 opacity to let the background gradient peek through.
*   **Accent (Interactive):** `#F59E0B` (Estus Orange) for glowing borders, "active" embers, and primary headings.
*   **Typography:** `#C4B494` (Aged Parchment) for body text; `#F59E0B` for highlighted stats and titles.

## 3. Typographic Hierarchy
*   **Headline (H1):** *Font: "Cinzel Decorative"*. 3rem (Main Title) / 4rem (Stage Name), uppercase, 12px letter-spacing. **Style:** Estus Orange with a heavy glowing text-shadow.
*   **Subhead (H2):** *Font: "Cinzel"*. 1.2rem - 1.8rem, all-caps, bold. Used for Class Names (upright) and Stat Labels.
*   **Body Text:** *Font: "EB Garamond"*. 1.1rem, italicized. Used for the lore description.

## 4. Layout & Interaction
*   **Main Title:** Perfectly centered at the top of the screen.
*   **The 5-Column Grid:** The screen is divided into 5 vertical "Slabs" (Class boxes) with **slightly rounded edges (12px)**.
*   **The "Ember" Hover Logic:**
    1.  **Reactive Layout:** The hovered column expands its `grid-column` width (e.g., from 1fr to 1.5fr) while the others slightly shrink.
    2.  **The Glow Beam:** A slow-moving (8s), double-faded segment (soft head and tail) that travels around the perimeter. It features a slow 3s pulse in opacity (40% to 100%) for a "smoldering" feel.
    3.  **Visual Expansion:** On hover, the character image loses its fade-mask and scales up to 1.05x, while the image corners round further to **30px** to match the "active" stage aesthetic.
    4.  **Quick Info:** A summary of the top two stats fades in directly **below** the class name at the top of the box at 0.3s.
    5.  **Upright Alignment:** Class names are always upright (not rotated) and positioned at the top of the slot.
*   **The "Active Hover" Blur:** When a character is selected and the user hovers over the large stage screen, the background (living-bg, fire-glow, and embers) blurs and darkens to focus all attention on the character stats and lore.
*   **The "Weighty" Click:** On selection:
    1.  **Collapse:** The 4 unselected classes "collapse" to the far edges (5% width each).
    2.  **Hide Text:** To prevent cut-off letters, all text in the 5% width collapsed boxes is completely hidden (`opacity: 0`).
    3.  **The Stage:** The selected class takes the Stage (80% width).
    4.  **Timing:** Use a slow 0.8s `cubic-bezier(0.22, 1, 0.36, 1)` transition for a massive, powerful movement.

## 5. The Character Stage (Revealed on Click)
*   **Grid Structure:** A 12-column CSS Grid container.
*   **The Stage Content:**
    *   **Left Column (Visuals):** Large-scale character art/render placeholder showing armor and weapons with an internal Estus glow.
    *   **Center Column (Lore):** The H1 Class Name in Cinzel Decorative and the italicized EB Garamond lore description.
    *   **Right Column (The Stat Block):** A detailed list of all character stats (Vigor, Attunement, Endurance, Strength, Dexterity, Resistance, Intelligence, Faith).
        *   **Visual Rule:** Stats feature horizontal "progress bars" filled with the Estus Orange accent to show power weight.

## 6. Class Roster
*   **Warrior:** High Strength/Endurance.
*   **Sorcerer:** High Intelligence/Attunement.
*   **Lancer:** Swift master of the spear; High Dexterity/Endurance. (Replaced Pyromancer).
*   **Cleric:** High Faith/Attunement.
*   **Bandit:** High Dexterity/Luck-focus.

## 7. Constraint
*   This experience is **Desktop Only**. No mobile responsiveness is required beyond a basic stack; the layout is locked to a 16:9 or wider aspect ratio.
