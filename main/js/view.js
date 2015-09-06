var getCard = function (data) {
    return "<div class='card'>" +
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

function generateSlidesHTML(data) {
    var container = $('.slider-content');
    var theTemplateScript = $("#slide-template").html();
    //Compile the template​
    var theTemplate = Handlebars.compile(theTemplateScript);
    container.append(theTemplate(data));
}
