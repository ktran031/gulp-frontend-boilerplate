$(document).ready(function () {
    // Slick Slider settings for News Module Start
    $slickNewsModule = false;

    function newsModuleSlider() {
        if ($(window).width() < 991) {
            if (!$slickNewsModule) {
                $(".news-module__slider").slick({
                    dots: true,
                    arrows: true,
                    draggable: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
                $slickNewsModule = true;
            }
        } else if ($(window).width() > 992) {
            if ($slickNewsModule) {
                $('.news-module__slider').slick('unslick');
                $slickNewsModule = false;
            }
        }
    };

    newsModuleSlider();

    $(window).on('resize', function () {
        newsModuleSlider();
    });
    // Slick Slider settings for News Module End

    // Selectize JS init for dropdown
    $('#select-cancer-and-treatment, #select-specialty, #select-location, #news-search-categories').selectize({
        sortField: 'text'
    });

});

// Change tab content based on click
var tabChange = function (navID) {
    // Iterate over buttons
    $(".c-tabs__container li").each(function () {
        if ($(this).attr('id') !== navID) {
            $(this).removeClass("c-tabs__tab-item--active");
        }
    });

    // Iterate over content containers
    $(".c-tabs__content").each(function () {
        $(this).removeClass("active");
    });

    // Toggle nav active class
    $("#tab-item-" + navID).addClass("c-tabs__tab-item--active");
    // Toggle content active class
    $('#tab-content-' + navID).toggleClass('active');
}