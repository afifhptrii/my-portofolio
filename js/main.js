/* =====================================================
   PAGE LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader =
        document.querySelector(".page-loader");

    setTimeout(() => {

        loader.classList.add("loaded");

    }, 500);

});



/* =====================================================
   NAVBAR SCROLL
===================================================== */

const header =
    document.querySelector(".site-header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* =====================================================
   MOBILE MENU
===================================================== */

const menuButton =
    document.querySelector(
        ".mobile-menu-button"
    );

const navigation =
    document.querySelector(".main-nav");


menuButton.addEventListener("click", () => {

    navigation.classList.toggle("open");

});



/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

    });

});



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});



/* =====================================================
   IMAGE FALLBACK
===================================================== */

const images =
    document.querySelectorAll("img");


images.forEach((image) => {

    image.addEventListener(
        "error",
        () => {

            image.style.display = "none";

            image.parentElement.classList.add(
                "image-missing"
            );

        }
    );

});