document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("mobileMenuBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = [...document.querySelectorAll(".nav-link")];
    const currentYear = document.getElementById("currentYear");
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const contactEmail = "healthhome2003@gmail.com";

    const setMenuOpen = (isOpen) => {
        if (!menuButton || !navMenu) return;

        navMenu.classList.toggle("open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        const icon = menuButton.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-xmark", isOpen);
            icon.classList.toggle("fa-bars", !isOpen);
        }
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

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) setMenuOpen(false);
    });

    const navSections = navLinks
        .map((link) => {
            const href = link.getAttribute("href");
            return href?.startsWith("#") ? document.querySelector(href) : null;
        })
        .filter(Boolean);

    const updateNavigation = () => {
        if (!navSections.length) {
            navbar?.classList.toggle("scrolled", window.scrollY > 30);
            return;
        }

        const scrollMarker = window.scrollY + (navbar?.offsetHeight ?? 0) + 120;
        let currentSection = navSections[0];

        navSections.forEach((section) => {
            if (section.offsetTop <= scrollMarker) currentSection = section;
        });

        navLinks.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${currentSection?.id}`;
            link.classList.toggle("active", isCurrent);

            if (isCurrent) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });

        navbar?.classList.toggle("scrolled", window.scrollY > 30);
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

    const animatedElements = document.querySelectorAll(
        ".service-card, .why-card, .step-card, .building-card, .approach-card, " +
        ".contact-item, .family-content, .family-image-container"
    );

    if (
        animatedElements.length &&
        "IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        document.body.classList.add("has-reveal");

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.12 }
        );

        animatedElements.forEach((element) => revealObserver.observe(element));

        [".service-card", ".why-card", ".step-card", ".building-card", ".approach-card"].forEach(
            (selector) => {
                document.querySelectorAll(selector).forEach((card, index) => {
                    card.style.setProperty("--reveal-delay", `${index * 70}ms`);
                });
            }
        );
    }

    contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        const fields = new FormData(contactForm);
        const name = String(fields.get("name") ?? "").trim();
        const email = String(fields.get("email") ?? "").trim();
        const phone = String(fields.get("phone") ?? "").trim();
        const message = String(fields.get("message") ?? "").trim();

        if (!name || !email || !message) {
            if (formMessage) {
                formMessage.classList.add("is-error");
                formMessage.textContent = "Please complete your name, email and message.";
            }
            return;
        }

        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            phone ? `Phone: ${phone}` : "",
            "",
            message
        ].filter((line) => line !== "").join("\n");

        if (formMessage) {
            formMessage.classList.remove("is-error");
            formMessage.textContent = "Your email app will open so you can review and send your message.";
        }

        const subject = encodeURIComponent("HealthHome website enquiry");
        const encodedBody = encodeURIComponent(body);
        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${encodedBody}`;
    });

    if (currentYear) currentYear.textContent = String(new Date().getFullYear());
});
