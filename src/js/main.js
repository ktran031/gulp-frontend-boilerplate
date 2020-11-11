$(document).ready(function(){


    // Slick Slider settings for News Module Start
    $slickNewsModule = false;
    function newsModuleSlider(){    
        if($(window).width() < 991){
            if(!$slickNewsModule){
                $(".news-module__slider").slick({
                    dots: true,
                    arrows: true,
                    draggable: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
                $slickNewsModule = true;
            }
        } else if($(window).width() > 992){
            if($slickNewsModule){
                $('.news-module__slider').slick('unslick');
                $slickNewsModule = false;
            }
        }
    };

    newsModuleSlider();

    $(window).on('resize', function(){
         newsModuleSlider();
    });
    // Slick Slider settings for News Module End

    // Selectize JS init for dropdown
    $('#select-cancer-and-treatment, #select-specialty, #select-location, #news-search-categories').selectize({
        sortField: 'text'
    });
    
}); 


