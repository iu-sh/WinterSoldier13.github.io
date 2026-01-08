from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()

        # 1. Verify Landing Page
        print("Visiting Landing Page...")
        page.goto("http://localhost:8080/index.html")
        page.wait_for_selector('text=Ayush Singh')
        page.screenshot(path="landing_page.png")
        print("Screenshot saved: landing_page.png")

        # 2. Verify Terminal UI
        print("Visiting Terminal UI...")
        page.goto("http://localhost:8080/terminal.html")
        page.wait_for_selector('#terminal-title') # Wait for terminal window
        # Wait for "Ayush Singh" to appear in welcome message or about section if auto-loaded
        page.wait_for_selector('#welcome-message')
        page.screenshot(path="terminal_ui_initial.png")
        print("Screenshot saved: terminal_ui_initial.png")

        # Interact with terminal: type 'about'
        page.fill('#command', 'about')
        page.press('#command', 'Enter')
        # In terminal.js, about command rendering copies content from #about div.
        # But #about div is hidden initially. When command runs, it clones it.
        # However, the renderContentSections() in terminal.js populates #about.
        # So we should wait for #executed_commands to contain the about text.
        page.wait_for_selector('#executed_commands .output-block')
        page.screenshot(path="terminal_ui_about.png")
        print("Screenshot saved: terminal_ui_about.png")


        # 3. Verify Normal UI
        print("Visiting Normal UI...")
        page.goto("http://localhost:8080/normal.html")
        # Wait for the loading animation or main content
        page.wait_for_selector('#immersive-view')
        # Wait for "Ayush" to appear (Hero section)
        page.wait_for_selector('text=Yo, I\'m')
        # Wait a bit for animations to settle
        page.wait_for_timeout(2000)
        page.screenshot(path="normal_ui.png")
        print("Screenshot saved: normal_ui.png")

        browser.close()

if __name__ == "__main__":
    verify_frontend()
