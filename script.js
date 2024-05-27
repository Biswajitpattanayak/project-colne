(function($) {
    "use strict";

    // Spinner
    var spinner = function() {
        setTimeout(function() {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 16
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Header fixed top on scroll
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        let headerOffset = selectHeader.offsetTop
        let nextElement = selectHeader.nextElementSibling
        const headerFixed = () => {
            if ((headerOffset - window.scrollY) <= 0) {
                selectHeader.classList.add('fixed-top')
                nextElement.classList.add('scrolled-offset')
            } else {
                selectHeader.classList.remove('fixed-top')
                nextElement.classList.remove('scrolled-offset')
            }
        }
        window.addEventListener('load', headerFixed)
        onscroll(document, headerFixed)
    }



    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            if (!this.nextElementSibling.classList.contains('dropdown-active')) {
                e.preventDefault();
            }
            this.nextElementSibling.classList.toggle('dropdown-active');
        }
    }, true);

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    // Initiate the wowjs
    new WOW().init();

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });



    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });




    $(document).ready(function() {
        $('.vendor-carousel').owlCarousel({
            loop: true,
            margin: 45,
            dots: false, // Enable navigation dots
            autoplay: true,
            autoplayTimeout: 1000,
            responsive: {
                0: {
                    items: 2
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 6
                }
            }
        });
    });



    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({
            filter: $(this).data('filter')
        });
    });

    // Project carousel
    $('.project-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: false,
        nav: false,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ]
    });

})(jQuery);





//   lightbox for get started

function OpenLightbox() {
    document.getElementById('lightboxx').style.display = 'block';
}

function CloseLightbox() {
    document.getElementById('lightboxx').style.display = 'none';
}



function OopenLightbox() {
    document.getElementById('lightboxxx').style.display = 'block';
}

function CcloseLightbox() {
    document.getElementById('lightboxxx').style.display = 'none';
}





// Show the pop-up section when the pricing section is reached
var pricingSection = document.querySelector('.container-fluid.py-5');
var popupSection = document.getElementById('popupSection');

window.addEventListener('scroll', function() {
    var sectionTop = pricingSection.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (sectionTop < windowHeight) {
        popupSection.style.display = 'block';
    }
});

// Close the pop-up section
function ClosePopup() {
    popupSection.style.display = 'none';
};



/*Tag for blogs popup*/
const person = document.querySelector('.person');
const popup = person.querySelector('.popup');

person.addEventListener('mouseleave', () => {
    popup.style.display = 'none';
});


// 


<script>
      let number1 = document.getElementById("number1");
      let number2 = document.getElementById("number2");
      let number3 = document.getElementById("number3");
  
      number1.style.display = "block";
      number2.addEventListener("click", function () {
        if (number1.style.display === "block") {
          number1.style.display = "none";
          number2.style.display = "none";
          number3.style.display = "block";
        }
  
        else {
          number1.style.display = "block";
          number2.style.display = "block";
          number3.style.display = "none";
  
        }
      })
  
      number3.addEventListener("click", function () {
        number1.style.display = "block";
        number2.style.display = "block";
        number3.style.display = "none";
      })
  
  
      var contactForm = document.getElementById("contactForm");
      var formContainer = document.getElementById("formContainer");
      var closeIconn = formContainer.querySelector(".close-iconn");
  
      contactForm.addEventListener("click", function () {
        formContainer.classList.add("open");
      });
  
  
  
      closeIconn.addEventListener("click", function () {
        formContainer.classList.remove("open");
      });
  
    </script>
  