$(function () {
    var $pep = document.getElementById('pep');
    var $line = document.getElementById('line');
    var $slider = document.getElementById('slider-content');
    var pep_width = window.screen.width * 4; // ширина таймлайна - 4 экранов
    $pep.style.width = pep_width + 'px';
    $pep.style.marginLeft = -pep_width / 2;

    // отрисовка таймлайна
    renderTimeline(pep_width);

    // загружаем список фильмов и отображаем их на таймлайне и в слайдере
    var data_len;
    $.getJSON("./json/cards.json", function (data) {
        data_len = data.length + 1;
        $slider.style.width = data_len * window.innerWidth;
        renderCards(data);
        renderSlides(data);
    });

    $.getJSON("./json/main-schedule.json", function (data) {
        renderSchedule(data);
    });


    // Обработчики кнопок "влево", "вправо" у слайдера
    var left_btn  = document.getElementById('left-arrow');
    var right_btn = document.getElementById('right-arrow');
    right_btn.addEventListener('click', function () {
        var active = document.getElementsByClassName('active')[0];
        try {
            var right = getLeft($slider) - window.innerWidth;
            var next = active.nextElementSibling;
        } catch (e) {
            return false;
        }

        if (next) {
            removeClass(active, 'active');
            addClass(next, 'active');
            moveSlider(right);
        }
    });

    left_btn.addEventListener('click', function () {
        var active = document.getElementsByClassName('active')[0];
        try {
            var prev = active.previousElementSibling;
            var left = getLeft($slider) + window.innerWidth;
        } catch (e) {
            return false;
        }

        if (prev) {
            removeClass(active, 'active');
            addClass(prev, 'active');
            moveSlider(left);
        }
    });

    // "движок" слайдера
    var moveSlider = function (value) {
        var value = "translateX(" + value + "px)";
        var css = {
            'transform': value,
            '-webkit-transform': value,
            '-moz-transform': value,
            '-ms-transform': value,
            '-o-transform': value
        }

        jQuery.extend($slider.style, css);
    };

    var line_margin = getLeft($line);

    // "джижок" таймлайна
    $($pep).pep({
        axis: 'x',
        cssEaseDuration: 750,
        cssEaseString: 'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
        elementsWithInteraction: '.card',
        constrainTo: [0, 0, 0, -(pep_width - screen.availWidth)],
        initiate: function (ev, obj) {},
        start: function (ev, obj) {},
        drag: function (ev, obj) { console.log('dx'+this.dx+' left '+obj.$el.position().left) },
        stop: function (ev, obj) {},
        rest: function (ev, obj) {}
    });

    var pep = $.pep.peps[0];

    //renderCard("998902800000");

    // при клике на карточку - сдвигаем ее к центру таймлайна
    // слайдер прокручиваем до информации о фильме из карточки
    $('body').on('click', '.card', function () {
        var left = getLeft(this);
        var dx = line_margin - left;
        var id = $(this).data('id');
        var $slide = document.getElementById(id);
        var left = getLeft($slide);
        moveSlider(-left);
        pep.moveToUsingTransforms(dx, 0);
    });

    window.onresize = function (event) {
        $slider.style.width = data_len * window.innerWidth;
    }

});

