var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 5000, // Delay in milliseconds
    disableOnInteraction: false, // Continue autoplay even when user interacts with slider
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Pause autoplay when mouse enters the carousel container
swiper.el.addEventListener("mouseenter", function () {
  swiper.autoplay.stop();
});

// Resume autoplay when mouse leaves the carousel container
swiper.el.addEventListener("mouseleave", function () {
  swiper.autoplay.start();
});