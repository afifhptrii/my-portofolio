/* =========================================================
   AFIFAH PERSONAL SPACE
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;

    const preloader =
        document.getElementById("preloader");

    const loaderPercentage =
        document.getElementById("loaderPercentage");

    const progressBar =
        document.querySelector(
            ".preloader-progress-bar"
        );

    const navbar =
        document.getElementById("navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileNav =
        document.getElementById("mobileNav");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-nav-inner a"
        );

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    /* =====================================================
       PRELOADER
    ====================================================== */

    body.classList.add("is-loading");

    let progress = 0;

    const loaderInterval =
        setInterval(() => {

            progress += Math.floor(
                Math.random() * 7
            ) + 1;

            if (progress >= 100) {
                progress = 100;

                clearInterval(loaderInterval);

                if (loaderPercentage) {
                    loaderPercentage.textContent =
                        "100%";
                }

                if (progressBar) {
                    progressBar.style.width =
                        "100%";
                }

                setTimeout(() => {

                    if (preloader) {
                        preloader.classList.add(
                            "loaded"
                        );
                    }

                    body.classList.remove(
                        "is-loading"
                    );

                }, 500);

            } else {

                if (loaderPercentage) {
                    loaderPercentage.textContent =
                        `${progress}%`;
                }

                if (progressBar) {
                    progressBar.style.width =
                        `${progress}%`;
                }

            }

        }, 65);


    /* =====================================================
       NAVBAR SCROLL
    ====================================================== */

    const handleNavbarScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );

    handleNavbarScroll();


    /* =====================================================
       MOBILE MENU
    ====================================================== */

    const toggleMobileMenu = () => {

        if (!menuToggle || !mobileNav) {
            return;
        }

        const isOpen =
            menuToggle.classList.toggle(
                "active"
            );

        mobileNav.classList.toggle(
            "open"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        if (isOpen) {
            body.style.overflow = "hidden";
        } else {
            body.style.overflow = "";
        }

    };

    if (menuToggle) {
        menuToggle.addEventListener(
            "click",
            toggleMobileMenu
        );
    }


    /* =====================================================
       CLOSE MOBILE MENU
    ====================================================== */

    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (!menuToggle || !mobileNav) {
                return;
            }

            menuToggle.classList.remove(
                "active"
            );

            mobileNav.classList.remove(
                "open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            body.style.overflow = "";

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const updateActiveNavigation = () => {

        const scrollPosition =
            window.scrollY + 180;

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    const allAnchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    allAnchorLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const offset =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key !== "Escape"
            ) {
                return;
            }

            if (
                mobileNav &&
                mobileNav.classList.contains(
                    "open"
                )
            ) {

                menuToggle.classList.remove(
                    "active"
                );

                mobileNav.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                body.style.overflow = "";

            }

        }
    );


    /* =====================================================
       PROJECT HOVER INTERACTION
    ====================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );

    projectCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.style.setProperty(
                    "--card-scale",
                    "1"
                );
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.style.setProperty(
                    "--card-scale",
                    "0"
                );
            }
        );

    });


    /* =====================================================
       IMAGE FALLBACK
       Jika nanti menggunakan gambar profile/project,
       gambar yang gagal dimuat tidak akan merusak layout.
    ====================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

            }
        );

    });


    /* =====================================================
       YEAR
    ====================================================== */

    const currentYear =
        new Date().getFullYear();

    const footerYear =
        document.querySelector(
            ".footer-right span"
        );

    if (footerYear) {
        footerYear.textContent =
            `© ${currentYear}`;
    }

});