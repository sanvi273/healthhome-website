/* =========================================================
   HEALTHHOME WEBSITE
   MAIN JAVASCRIPT FILE
   ========================================================= */


/* =========================================================
   PART 1 — WAIT FOR WEBSITE TO LOAD
   ========================================================= */

/*
    Everything inside this function runs after
    the HTML document has completely loaded.
*/

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       PART 2 — GET IMPORTANT HTML ELEMENTS
       ===================================================== */

    const navbar = document.getElementById("navbar");

    const mobileMenuBtn =
        document.getElementById("mobileMenuBtn");

    const navMenu =
        document.getElementById("navMenu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");

    const currentYear =
        document.getElementById("currentYear");



    /* =====================================================
       PART 3 — MOBILE MENU
       ===================================================== */

    /*
        On mobile devices the navigation menu is hidden.

        When the user clicks the hamburger button,
        the "open" class is added to the menu.

        The CSS file already contains the styling
        for .nav-menu.open
    */

    if (mobileMenuBtn && navMenu) {

        mobileMenuBtn.addEventListener("click", function () {

            /* Open / close menu */

            navMenu.classList.toggle("open");


            /* Change hamburger icon */

            const icon =
                mobileMenuBtn.querySelector("i");


            if (navMenu.classList.contains("open")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    }



    /* =====================================================
       PART 4 — CLOSE MOBILE MENU AFTER CLICKING LINK
       ===================================================== */

    /*
        When a user clicks:

        Home
        Services
        About
        How It Works
        Contact

        the mobile menu will automatically close.
    */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navMenu) {

                navMenu.classList.remove("open");

            }


            if (mobileMenuBtn) {

                const icon =
                    mobileMenuBtn.querySelector("i");


                if (icon) {

                    icon.classList.remove("fa-xmark");

                    icon.classList.add("fa-bars");

                }

            }

        });

    });



    /* =====================================================
       PART 5 — NAVBAR SCROLL EFFECT
       ===================================================== */

    /*
        When the user scrolls down,
        the navbar gets the "scrolled" class.

        Our CSS uses this class to add:
        - border
        - shadow
        - slightly stronger background
    */

    function handleNavbarScroll() {

        if (!navbar) return;


        if (window.scrollY > 30) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }


    /* Run once when page loads */

    handleNavbarScroll();


    /* Run whenever user scrolls */

    window.addEventListener(
        "scroll",
        handleNavbarScroll
    );



    /* =====================================================
       PART 6 — ACTIVE NAVIGATION LINK
       ===================================================== */

    /*
        This automatically changes the active navbar
        link depending on which section the user is viewing.
    */

    const sections =
        document.querySelectorAll("section[id]");


    function updateActiveNav() {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;

            const scrollPosition =
                window.scrollY;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");


            const linkTarget =
                link.getAttribute("href");


            if (
                linkTarget === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    /* Run once */

    updateActiveNav();



    /* =====================================================
       PART 7 — SMOOTH SCROLL
       ===================================================== */

    /*
        HTML already supports smooth scrolling because
        style.css contains:

        html {
            scroll-behavior: smooth;
        }

        This JavaScript additionally handles the fixed
        navbar height so sections don't hide underneath it.
    */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");


            /* Ignore empty # links */

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            const navbarHeight =
                navbar ? navbar.offsetHeight : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                10;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });



    /* =====================================================
       PART 8 — SCROLL REVEAL ANIMATIONS
       ===================================================== */

    /*
        Some elements start hidden in CSS:

        opacity: 0;
        transform: translateY(25px);

        When they become visible on screen,
        JavaScript adds:

        .visible

        and CSS makes them appear.
    */


    const animatedElements =
        document.querySelectorAll(
            ".service-card, " +
            ".why-card, " +
            ".step-card, " +
            ".building-card, " +
            ".approach-card, " +
            ".contact-item, " +
            ".family-content, " +
            ".family-image-container"
        );


    /*
        IntersectionObserver detects when an element
        enters the user's screen.
    */

    const animationObserver =
        new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");


                        /*
                            Once visible, we don't need
                            to observe it anymore.
                        */

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    /* Start observing each element */

    animatedElements.forEach(function (element) {

        animationObserver.observe(element);

    });



    /* =====================================================
       PART 9 — STAGGERED CARD ANIMATION
       ===================================================== */

    /*
        Cards appear one after another instead of
        all appearing at exactly the same time.
    */


    const cardGroups = [

        ".service-card",

        ".why-card",

        ".step-card",

        ".building-card",

        ".approach-card"

    ];


    cardGroups.forEach(function (selector) {

        const cards =
            document.querySelectorAll(selector);


        cards.forEach(function (card, index) {

            card.style.transitionDelay =
                `${index * 0.08}s`;

        });

    });



   /* =====================================================
   PART 10 — EMAILJS CONTACT FORM
   ===================================================== */

/*
    Contact form flow:

    Website
        ↓
    EmailJS
        ↓
    Gmail Service
        ↓
    sanvichaudhary311@gmail.com
*/


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            /* -----------------------------------------
               STOP NORMAL FORM SUBMISSION
               ----------------------------------------- */

            event.preventDefault();


            /* -----------------------------------------
               GET FORM VALUES
               ----------------------------------------- */

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const message =
                document.getElementById("message").value.trim();


            /* -----------------------------------------
               BASIC VALIDATION
               ----------------------------------------- */

            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please fill in all required fields.";

                    formMessage.style.color =
                        "#DC2626";

                }

                return;
            }


            /* -----------------------------------------
               EMAIL VALIDATION
               ----------------------------------------- */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                if (formMessage) {

                    formMessage.textContent =
                        "Please enter a valid email address.";

                    formMessage.style.color =
                        "#DC2626";

                }

                return;
            }


            /* -----------------------------------------
               SHOW SENDING MESSAGE
               ----------------------------------------- */

            if (formMessage) {

                formMessage.textContent =
                    "Sending your message...";

                formMessage.style.color =
                    "#0879D9";

            }


            /* -----------------------------------------
               DISABLE BUTTON WHILE SENDING
               ----------------------------------------- */

            const submitButton =
                contactForm.querySelector(
                    ".submit-btn"
                );


            const originalButtonText =
                submitButton
                    ? submitButton.innerHTML
                    : "";


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.style.opacity = "0.7";

                submitButton.innerHTML =
                    `
                    <span>Sending...</span>
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    `;
            }


            /* -----------------------------------------
               SEND EMAIL THROUGH EMAILJS
               ----------------------------------------- */

            emailjs.sendForm(
                "service_ebaclvk",
                "template_r8t32dj",
                contactForm
            )

            .then(
                function (response) {

                    console.log(
                        "EMAILJS SUCCESS:",
                        response.status,
                        response.text
                    );


                    /* ---------------------------------
                       SUCCESS MESSAGE
                       --------------------------------- */

                    if (formMessage) {

                        formMessage.textContent =
                            "Thank you! Your message has been sent successfully.";

                        formMessage.style.color =
                            "#24B47E";

                    }


                    /* ---------------------------------
                       RESET FORM
                       --------------------------------- */

                    contactForm.reset();


                    /* ---------------------------------
                       RESTORE BUTTON
                       --------------------------------- */

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.style.opacity = "1";

                        submitButton.innerHTML =
                            originalButtonText;

                    }


                    /* ---------------------------------
                       REMOVE MESSAGE AFTER 5 SECONDS
                       --------------------------------- */

                    setTimeout(function () {

                        if (formMessage) {

                            formMessage.textContent = "";

                        }

                    }, 5000);

                }
            )

            .catch(
                function (error) {

                    console.error(
                        "EMAILJS ERROR:",
                        error
                    );


                    /* ---------------------------------
                       ERROR MESSAGE
                       --------------------------------- */

                    if (formMessage) {

                        formMessage.textContent =
                            "Sorry, your message could not be sent. Please try again.";

                        formMessage.style.color =
                            "#DC2626";

                    }


                    /* ---------------------------------
                       RESTORE BUTTON
                       --------------------------------- */

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.style.opacity = "1";

                        submitButton.innerHTML =
                            originalButtonText;

                    }

                }
            );

        }
    );

}


    /* =====================================================
       PART 11 — CURRENT YEAR IN FOOTER
       ===================================================== */

    /*
        Instead of manually writing:

        © 2026 HealthHome

        JavaScript automatically gets the current year.
    */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }



    /* =====================================================
       PART 12 — GOOGLE PLAY BUTTON
       ===================================================== */

    /*
        IMPORTANT:

        Replace the URL below with your REAL
        HealthHome Google Play Store URL.

        Example:

        https://play.google.com/store/apps/details?id=com.healthhome.app
    */


    const googlePlayURL =
        "YOUR_GOOGLE_PLAY_STORE_LINK";


    const googlePlayButton =
        document.getElementById("googlePlayButton");


    const footerGooglePlay =
        document.getElementById("footerGooglePlay");


    /*
        Function to set Google Play URL
    */

    function setupGooglePlayButton(button) {

        if (!button) return;


        /*
            Don't set the link if you haven't
            added your real Play Store URL yet.
        */

        if (
            googlePlayURL &&
            googlePlayURL !== "YOUR_GOOGLE_PLAY_STORE_LINK"
        ) {

            button.href = googlePlayURL;

        }

    }


    setupGooglePlayButton(
        googlePlayButton
    );


    setupGooglePlayButton(
        footerGooglePlay
    );



    /* =====================================================
       PART 13 — DOWNLOAD BUTTON CLICK TRACKING
       ===================================================== */

    /*
        This currently logs a message in the console.

        Later this can be connected to Google Analytics
        to track how many people click "Download".
    */


    const downloadButtons =
        document.querySelectorAll(
            ".primary-btn, " +
            ".google-play-btn, " +
            ".footer-play-btn, " +
            ".nav-download-btn"
        );


    downloadButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                console.log(
                    "HealthHome App Download button clicked."
                );

            }
        );

    });



    /* =====================================================
       PART 14 — ESC KEY CLOSES MOBILE MENU
       ===================================================== */

    /*
        If the mobile menu is open and the user
        presses the ESC key, close the menu.
    */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navMenu &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove("open");


                if (mobileMenuBtn) {

                    const icon =
                        mobileMenuBtn.querySelector("i");


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );



    /* =====================================================
       PART 15 — PREVENT IMAGE DRAGGING
       ===================================================== */

    /*
        Makes the website feel more like a polished
        marketing website.

        This is optional.
    */

    const images =
        document.querySelectorAll("img");


    images.forEach(function (image) {

        image.setAttribute(
            "draggable",
            "false"
        );

    });



    /* =====================================================
       PART 16 — PAGE LOADED
       ===================================================== */

    /*
        Helpful message while developing.
    */

    console.log(
        "HealthHome website loaded successfully."
    );


});
