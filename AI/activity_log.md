# AI Activity Log

## Summary of actions taken (2026-03-30)

1.  **Repository Setup & Cleanup:**
    -   Ran `git status` to identify the current state of the repository.
    -   Concluded a pending merge that included `LICENSE` and `README.md`.
    -   Verified that all project files (`index.html`, `script.js`, `style.css`, etc.) were tracked.
    -   Committed the changes with the message: "Conclude merge with LICENSE and README.md".

2.  **Deployment to GitHub:**
    -   Verified the remote configuration (`https://github.com/delidelideli/characterselect.git`).
    -   Pushed the `main` branch to the remote repository.
    -   Created and pushed a `gh-pages` branch (`main:gh-pages`) to enable GitHub Pages deployment.
    -   Confirmed the project URL: [https://delidelideli.github.io/characterselect/](https://delidelideli.github.io/characterselect/)

3.  **AI Directory Creation:**
    -   Created a new folder named `AI`.
    -   Initialized `AI/activity_log.md` to track user inputs and provide summaries of all future actions.

---
**Current Status:** The website has been updated to ensure class names are always upright and hidden when collapsed.

## Summary of actions taken (2026-03-30) - Update 8

1.  **Typography & Layout Refinements:**
    -   **Upright Class Names:** Removed all sideways/rotated text logic for class names. They now remain upright and centered at the top of their slots at all times.
    -   **Clean Collapsed View:** When a class is selected and others collapse to 5% width, their names and quick-info stats are now completely hidden (`opacity: 0`). This ensures that no partial or cut-off text is visible in the narrow side slots.
    -   **Centered Title:** Confirmed the main "SELECT CLASS" title remains centered.

2.  **Version Control:**
    -   Committed orientation fixes.
    -   Pushed updates to `main` and `gh-pages` branches.
