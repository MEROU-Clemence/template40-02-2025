$(document).ready(function () {
    // ****** Effet bubulles footer
    const bubblesContainer = document.querySelector('.bubbles-container');
    const footer = document.querySelector('.section-footer');
    let bubbleInterval;

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${5 + Math.random() * 6}s`; // Durée de 5 à 11 secondes
        bubble.style.animationDelay = `${Math.random() * 2}s`; // Délai aléatoire démarrage bulle
        bubble.style.width = `${2 + Math.random() * 8}px`; // Taille entre 2px et 10px
        bubble.style.height = bubble.style.width;

        bubblesContainer.appendChild(bubble);

        // Supprime la bulle après l'animation
        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }

    function startBubbles() {
        if (!bubbleInterval) {
            bubbleInterval = setInterval(createBubble, 500); // Une bulle est créée toutes les 500ms
        }
    }

    function stopBubbles() {
        if (bubbleInterval) {
            clearInterval(bubbleInterval);
            bubbleInterval = null;
        }
    }

    // Détecter quand le footer devient visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startBubbles();
            } else {
                stopBubbles();
            }
        });
    }, {
        threshold: 0.1, // Déclenchement lorsque 10% du footer est visible
    });

    observer.observe(footer);

    // ****** Mobile Nav
    var MobNav = $('.navbar-toggler');
    MobNav.on('click', function () {
        $('.menu-mobile').toggleClass('menu-mobile-active');
        $('.first-nav').toggleClass('first-nav-fixed');
    });

    // ****** Mobile Nav Other Pages
    var MobNav = $('.navbar-toggler-other-pages');
    MobNav.on('click', function () {
        $('main').toggleClass('main-top');
    });

    // Sous-menu mobile
    $('.clic-sub-menu').on('click', function () {
        if ($(this).children('.sub-menu').hasClass('sub-menu-active')) {
            $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
        } else {
            $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
            $(this).children('.sub-menu').addClass('sub-menu-active');
        }

        if ($(this).children('a').hasClass('a-active')) {
            $('.clic-sub-menu a').removeClass('a-active');
        } else {
            $('.clic-sub-menu a').removeClass('a-active');
            $(this).children('a').addClass('a-active');
        }
    });

    // ****** Texte presentation page Home
    if ($(".description").length > 0) {
        var $description = $(".description");
        var $seeMore2 = $("#seeMore2");
        var $seeLess2 = $("#seeLess2");

        // Check si le texte est limité, on affiche pas les boutons
        if ($description[0].scrollHeight <= $description.height()) {
            $seeMore2.hide();
            $seeLess2.hide();
        } else {
            $seeMore2.show();
            $seeLess2.hide();
        }

        // Voir plus presentation
        $seeMore2.on('click', function (e) {
            e.preventDefault();
            $description.css('height', 'auto').addClass("expanded");
            $seeMore2.hide();
            $seeLess2.show();
        });

        // Voir moins presentation
        $seeLess2.on('click', function (e) {
            e.preventDefault();
            $description.css('height', 'auto').removeClass("expanded");
            $seeMore2.show();
            $seeLess2.hide();
        });
    };

    // ****** Gérer le changement d'onglet dans Détails
    const onglets = document.querySelectorAll('.onglet');
    const ongletDisplays = document.querySelectorAll('.onglet-display');

    onglets.forEach(onglet => {
        onglet.addEventListener('click', function () {
            // class is-active-onglet
            onglets.forEach(o => o.classList.remove('is-active-onglet'));
            this.classList.add('is-active-onglet');

            // class is-active-onglet-display
            ongletDisplays.forEach(display => display.classList.remove('is-active-onglet-display'));
            // Récupérer l'ID de l'onglet cliqué et activer la section de contenu correspondante
            const displayId = this.getAttribute('id').substring(1);
            document.getElementById(displayId).classList.add('is-active-onglet-display');
        });
    });

    // Module météo ajoute temps qu'il fait
    $('.weather-trad').each(function () {
        var weatherTrad = $(this).attr('data');

        // Traduction de l'icône météo pour afficher dans le weather
        var weatherTranslation;
        switch (weatherTrad) {
            case 'clear-day':
                weatherTranslation = 'Clair';
                break;
            case 'Cloudy':
                weatherTranslation = 'Nuageux';
                break;
            case 'fog':
                weatherTranslation = 'Brouillard';
                break;
            case 'partly-cloudy-day':
                weatherTranslation = 'Mi-couvert';
                break;
            case 'rain':
                weatherTranslation = 'Pluie';
                break;
            case 'sleet':
                weatherTranslation = 'Verglas';
                break;
            case 'snow':
                weatherTranslation = 'Neige';
                break;
            case 'wind':
                weatherTranslation = 'Vent';
                break;
            default:
                weatherTranslation = 'Undefined';
                break;
        }

        // Affiche la traduction dans le div .weather-trad
        $(this).text(weatherTranslation);
    });

    // ****** Prestas effet déclenche quand visible sur écran
    // Fonction pour gérer les animations dans la section presta
    const handlePrestaAnimation = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`Animation déclenchée pour :`, entry.target);
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    // Configuration de l'observateur pour la section presta
    const prestaObserver = new IntersectionObserver(handlePrestaAnimation, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });

    // Sélectionner les éléments de la section presta à observer
    const prestaElements = document.querySelectorAll('.section-title-prestas, .presta-contain-1, .presta-contain-2, .presta-contain-3, .slider-special-offers, .slider-options, .gifts-big-contain, .slider-news');

    prestaElements.forEach(el => prestaObserver.observe(el));


    // ****** SCEA : Fonction pour gérer le nombre d'éléments à afficher selon la largeur de l'écran
    function getVisibleItemsCount() {
        if (window.matchMedia("(min-width: 1024px)").matches) {
            return 14;
        } else {
            return 7;
        }
    }

    // Initialisation
    function initializeSCEA() {
        const visibleItemsCount = getVisibleItemsCount();

        $(".options-scea.options-scea-principal span").hide();
        $(".options-scea.options-scea-principal span").slice(0, visibleItemsCount).show();
    }
    
    initializeSCEA();

    // Voir plus SCEA
    $("#seeMore1").on('click', function (e) {
        e.preventDefault();

        $(".options-scea.options-scea-principal").addClass('options-scea-all');
        $(".options-scea.options-scea-principal span:hidden").show();

        $("#seeMore1").hide();
        $("#seeLess1").show();
    });

    // Voir moins SCEA
    $("#seeLess1").on('click', function (e) {
        e.preventDefault();

        $(".options-scea.options-scea-principal").removeClass('options-scea-all');
        initializeSCEA();

        $("#seeMore1").show();
        $("#seeLess1").hide();
    });

    // Réagir aux changements de taille d'écran
    window.addEventListener("resize", initializeSCEA);

    // ****** SCEA DETAIL
    // Initialisation
    $(".options-scea.options-scea-details span").hide();
    $(".options-scea.options-scea-details span").slice(0, 7).show();

    // Voir plus SCEA
    $("#seeMore3").on('click', function (e) {
        e.preventDefault();

        $(".options-scea.options-scea-details").addClass('options-scea-all');
        $(".options-scea.options-scea-details span:hidden").show();

        $("#seeMore3").hide();
        $("#seeLess3").show();
    });

    // Voir moins SCEA
    $("#seeLess3").on('click', function (e) {
        e.preventDefault();

        $(".options-scea.options-scea-details").removeClass('options-scea-all');
        $(".options-scea.options-scea-details span").not(":lt(12)").hide();

        $("#seeMore3").show();
        $("#seeLess3").hide();
    });

    // Clics sur les liens des prix chèques cadeaux
    $('.all-prices-vouchers a').on('click', function (event) {
        event.preventDefault();

        var targetId = $(this).attr('id');

        // Trouver l'élément correspondant dans le slider
        var targetElement = $(targetId);
        if (targetElement.length) {
            var index = $('.slider-vouchers').find('.owl-item').filter(function () {
                return $(this).find(targetId).length > 0;
            }).index();

            // Si un index valide est trouvé, déplacer le slider
            if (index !== -1) {
                $('.slider-vouchers').trigger('to.owl.carousel', [index, 600]);
            } else {
                console.error("Impossible de trouver l'index dans Owl Carousel pour :", targetId);
            }
        } else {
            console.error("Cible non trouvée pour :", targetId);
        }
    });

    // Détecter le changement dans Owl Carousel pour le .active
    $('.slider-vouchers').on('changed.owl.carousel', function (event) {
        var currentIndex = event.item.index;

        // Sélectionner l'élément actif dans le slider
        var activeSlide = $(event.target).find('.owl-item').eq(currentIndex).find('.presta-contain-vouchers');

        if (activeSlide.length) {
            var activeId = activeSlide.attr('id');
            console.log("Élément actif dans le slider :", activeId);

            $('.all-prices-vouchers a').removeClass('active');

            $('.all-prices-vouchers a[href="#' + activeId + '"]').addClass('active');

        }
    });
});

$(document).ready(function () {
    $('.slider-gallery').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: true,
        nav: false,
        items: 1,
        margin: 20,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-special-offers').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        items: 1,
        margin: 20,
        dots: false,
        nav: false,
        autoplayHoverPause: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-options').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        margin: 5,
        dots: false,
        nav: false,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 3,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-news').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        items: 1,
        margin: 20,
        dots: false,
        nav: false,
        animateIn: 'owl-fadeIn',
        animateOut: 'owl-fadeOut',
        autoplayHoverPause: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-page-page').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        items: 1,
        margin: 20,
        dots: true,
        nav: false,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-other-offers').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        margin: 5,
        dots: false,
        nav: false,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 2,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-gallery-offer').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: true,
        nav: false,
        items: 1,
        margin: 20,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-other-pages').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"],
        margin: 50,
        responsiveClass: true,
        dots: false,
        nav: true,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 3,
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                items: 4,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 4,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-vouchers').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"],
        margin: 10,
        autoHeight: true,
        responsiveClass: true,
        dots: false,
        nav: false,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 2,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
});