$(document).ready(function() {
    const track = $('.contents')
    const items = $('.content')
    const totalItems = items.length
    let currentIndex = 0;

    function updateCarousel() {
        items.removeClass('active')
        const activeSlide = items.eq(currentIndex)
        activeSlide.addClass('active')
    }

    function autoslide() {
        currentIndex = (currentIndex + 1) % totalItems
        updateCarousel()
    }

    setInterval(autoslide, 2000)
    updateCarousel()
});
