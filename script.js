document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const currentYear = document.getElementById("currentYear");
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    const setMenuOpen = (isOpen) => {
        if (!menuButton || !navMenu) return;

        navMenu.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        const icon = menuButton.querySelector("i");
        icon?.classList.toggle("fa-xmark", isOpen);
        icon?.classList.toggle("fa-bars", !isOpen);
    };

    menuButton?.addEventListener("click", () => {
        setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navMenu?.classList.contains("open")) {
            setMenuOpen(false);
            menuButton?.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (navbar && !navbar.contains(event.target)) setMenuOpen(false);
    });

    const mobileMenuQuery = window.matchMedia("(max-width: 1100px)");
    mobileMenuQuery.addEventListener?.("change", (event) => {
        if (!event.matches) setMenuOpen(false);
    });

    const navSections = navLinks
        .map((link) => {
            const href = link.getAttribute("href");
            if (!href?.startsWith("#")) return null;
            return document.getElementById(href.slice(1));
        })
        .filter(Boolean);

    const updateNavigation = () => {
        navbar?.classList.toggle("scrolled", window.scrollY > 30);
        if (!navSections.length) return;

        const scrollMarker = window.scrollY + (navbar?.offsetHeight ?? 0) + 120;
        let currentSection = navSections[0];

        navSections.forEach((section) => {
            if (section.offsetTop <= scrollMarker) currentSection = section;
        });

        navLinks.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${currentSection.id}`;
            link.classList.toggle("active", isCurrent);
            if (isCurrent) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    };

    let scrollFrame = 0;
    window.addEventListener(
        "scroll",
        () => {
            if (scrollFrame) return;
            scrollFrame = window.requestAnimationFrame(() => {
                updateNavigation();
                scrollFrame = 0;
            });
        },
        { passive: true }
    );
    updateNavigation();

    contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const fields = new FormData(contactForm);
        const name = String(fields.get("name") ?? "").trim();
        const email = String(fields.get("email") ?? "").trim();
        const phone = String(fields.get("phone") ?? "").trim();
        const subject = String(fields.get("subject") ?? "").trim();
        const message = String(fields.get("message") ?? "").trim();

        if (!name || !email || !subject || !message) {
            if (formStatus) {
                formStatus.classList.add("is-error");
                formStatus.textContent = "Please complete your name, email, topic and message.";
            }
            return;
        }

        const contactEmail = document.body.dataset.contactEmail || "healthhome2003@gmail.com";
        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            phone ? `Phone: ${phone}` : "",
            `Topic: ${subject}`,
            "",
            message
        ].filter((line) => line !== "").join("\n");

        if (formStatus) {
            formStatus.classList.remove("is-error");
            formStatus.textContent = "Your email app will open so you can review and send your message.";
        }

        const mailtoSubject = encodeURIComponent(`HealthHome enquiry: ${subject}`);
        const mailtoBody = encodeURIComponent(body);
        window.location.href = `mailto:${contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    });

    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
});
