// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", () => {

    // ===================== LUCIDE ICONS =====================
    if (window.lucide) {
        lucide.createIcons();
    }

    // ===================== ELEMENTS =====================
    const loader = document.getElementById("loader");
    const navbar = document.getElementById("navbar");
    const backTop = document.getElementById("back-top");
    const burgerBtn = document.getElementById("burger-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    const tabBtns = document.querySelectorAll(".tab-btn");
    const timelines = document.querySelectorAll(".timeline");

    const revealEls = document.querySelectorAll(".reveal");

    // ===================== LOADER =====================
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("hidden");
            }, 1800);
        });
    }

    // ===================== NAVBAR SCROLL =====================
    window.addEventListener("scroll", () => {

        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 40);
        }

        if (backTop) {
            backTop.classList.toggle("show", window.scrollY > 400);
        }

    }, { passive: true });

    // ===================== ACTIVE NAV =====================
    if (sections.length && navLinks.length) {

        const observerNav = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    navLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });

                }
            });
        }, { threshold: 0.4 });

        sections.forEach(sec => observerNav.observe(sec));
    }

    // ===================== BURGER MENU =====================
    if (burgerBtn && mobileMenu) {

        burgerBtn.addEventListener("click", () => {
            burgerBtn.classList.toggle("open");
            mobileMenu.classList.toggle("open");
        });

        document.querySelectorAll(".mobile-link").forEach(link => {
            link.addEventListener("click", () => {
                burgerBtn.classList.remove("open");
                mobileMenu.classList.remove("open");
            });
        });
    }

    // ===================== REVEAL ANIMATION =====================
    if (revealEls.length) {

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    entry.target.querySelectorAll(".skill-bar-fill").forEach(bar => {
                        bar.style.width = bar.dataset.width + "%";
                    });

                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => revealObserver.observe(el));
    }

    // Bars déjà visibles
    document.querySelectorAll(".skill-bar-fill").forEach(bar => {
        const parent = bar.closest(".reveal");

        if (parent && parent.classList.contains("visible")) {
            bar.style.width = bar.dataset.width + "%";
        }
    });

    // ===================== FILTER PROJECTS =====================
    if (filterBtns.length && projectCards.length) {

        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {

                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filter = btn.dataset.filter;

                projectCards.forEach(card => {
                    const cats = card.dataset.categories || "";
                    const show = filter === "all" || cats.includes(filter);
                    card.style.display = show ? "flex" : "none";
                });

            });
        });
    }

    // ===================== TABS PARCOURS =====================
    if (tabBtns.length && timelines.length) {

        tabBtns.forEach(btn => {
            btn.addEventListener("click", () => {

                tabBtns.forEach(b => b.classList.remove("active"));
                timelines.forEach(t => t.classList.remove("active"));

                btn.classList.add("active");

                const target = document.getElementById("tab-" + btn.dataset.tab);
                if (target) target.classList.add("active");

            });
        });
    }

});