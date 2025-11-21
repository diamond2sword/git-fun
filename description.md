
# Cod3-G: The Digital Gym for Coders

**Company Identity:**
- **Name:** Cod3-G (Code-G).
- **Tagline:** "The Digital Gym for Coders."
- **Mission:** Gamified, interactive learning for visual learners.

**Technical Architecture:**
- **Type:** Progressive Web App (PWA).
- **Stack:** React 18, TypeScript, Tailwind CSS, Vite.
- **Storage:** LocalStorage for persistence (Offline-first capability).
- **Execution:** Hybrid (Live Python via Codapi API / Mock Mode for offline).

**Core Features:**

1.  **Gamification Engine:**
    - **XP & Leveling:** Infinite leveling system with visual feedback.
    - **Economy:** Coins currency to unlock chapters.
    - **Streak System:** Multiplier (up to 1.5x) for consecutive successes.
    - **Badges:** Achievement system (e.g., "API Master", "Loop Lord").
    - **One-Time Rewards:** Strict anti-farming mechanic for quizzes and challenges; XP is only awarded once per quest.

2.  **Chapter System:**
    - **Progression:** Linear unlocking (Basic -> Advanced).
    - **Requirements:** Unlock costs (Coins) and Level gates.
    - **Chapter 1 (Python Basics):**
        - **Zones:** 6 distinct zones (Printing, Vars, Math, Logic, Loops, Lists).
        - **Quest System:** 18 Interactive Quests with unique visualizations (Chat bubbles, Puzzles, Logic Gates).
        - **Editing:** Full code editor with fill-in-the-blank support.
    - **Chapter 2 (The OOP Awakening):**
        - **Flip Cards:** APIE Concepts (Abstraction, Polymorphism, Inheritance, Encapsulation).
        - **Interactive Labs:** Drag & Drop Encapsulation, Inheritance Code Lab.
        - **Class Workshop:** Build up to 3 custom Python classes.
        - **Gallery:** Collectible card system.

3.  **Interactive Tools:**
    - **Code Editor:**
        - **Live Mode:** Executes Python 3.10 via Codapi.
        - **Mock Mode:** RegEx-based validation for offline/fast practice.
        - **Visualizers:** Dynamic mini-games inside quest cards.
    - **AI Tutor:** Integrated Chatbot using Gemini 3 Pro.
    - **Asset Lab:** AI Image generator/editor using Gemini 2.5 Flash Image.

4.  **PWA & Offline:**
    - **Installable:** Standalone app experience.
    - **Offline Support:** Full functionality in Mock Mode when disconnected.
    - **Caching:** Robust Service Worker for asset caching (CDNs, Fonts, React).
    - **State Persistence:** Auto-saves progress, avatar, and theme.

5.  **Accessibility & UI:**
    - **Themes:** Dark/Light mode (default Light).
    - **Avatar System:** Random generation + Selector.
    - **Lore:** Narrative-driven content ("The Digital Dojo").
    - **Scroll Sections:** Unlocked narrative blocks for context.
