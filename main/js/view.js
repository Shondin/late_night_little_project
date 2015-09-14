function renderTimeline(pep_width) {
    var $matrix = document.getElementById("matrix");
    $matrix.style.width = pep_width + 'px';
    var now = new Date();
    var minutes_img_width = 10; // ширина минутной риски
    var all_minutes = (pep_width / minutes_img_width);
    var all_hours = all_minutes / 60;
    var hours = Math.floor(all_hours);
    var minutes = Math.floor(getDecimal(all_hours) * 60);

    var start_time = parseInt((now.getHours() - hours / 2));

    var id;
    var clas;
    var span;
    var min;
    var hour;
    var div = document.createElement("div");
    var m = all_minutes - minutes;
    for (var i = minutes; i <= m; i++) {
        id = "";
        clas = "";
        span = null;
        var e = document.createElement("div");

        if (i > 59) {
            min = i % 60;
        } else {
            min = i;
        }

        hour = parseInt(start_time + i / 60);
        if (hour > 23) {
            hour = hour % 24;
        }

        if (i % 30 == 0) {
            id = hour + "_" + min;
            if (min < 10) min = "0" + min;
            span = document.createElement("span");
            span.className = "time";
            span.innerHTML = hour + ":" + min;
            clas = clas + " l";
        }

        e.id = id;
        e.className = "col " + clas;
        e.style.width = minutes_img_width;
        $matrix.appendChild(e);
        if (span != null) $matrix.appendChild(span);
    }
}

var getCard = function (data) {
    return "<div data-id='" + data.id + "' class='card'>" +
        "<div class='img'><img width='200px' height='100px' src='./" + data.image + "'></div>" +
        "<div class='info'>" + data.name + "</div>" +
        "</div>";
}

var renderCard = function (timestamp, card) {
    var time = new Date(parseInt(timestamp));
    var minutes = time.getMinutes();
    $('#' + time.getHours() + "_" + minutes).addClass('has-card').append(card);
}

function renderCards(data) {
    var card = "";
    data.forEach(function (item) {
        card = getCard(item);
        renderCard(item.time, card);
    });
}

function renderSlides(data) {
    //var container = $('.slider-content');
    var container = document.getElementById('slider-content');
    var theTemplateScript = $("#slide-template").html();
    //Compile the template​
    var theTemplate = Handlebars.compile(theTemplateScript);
    container.insertAdjacentHTML('beforeend', theTemplate(data));
}

function renderSchedule(data) {
    //var container = $('.slider-content');
    var container = document.getElementById('slider-content');
    var theTemplateScript = $("#slide-template").html();
    //Compile the template​
    var theTemplate = Handlebars.compile(theTemplateScript);
    container.insertAdjacentHTML('beforeend', theTemplate(data));
}