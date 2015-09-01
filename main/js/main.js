 $(function(){
        var pep_el = document.getElementById('pep');
        var matrix_el =document.getElementById("matrix");

        var now = new Date();

        var pep_width = window.innerWidth*2; // ширина таймлайна - 6 экранов
            pep_el.style.width = pep_width+'px';
        var minutes_img_width = 10;
        var minutes = (pep_width/minutes_img_width)/2;
        var start_time = parseInt((now.getHours() - minutes/60));

        //cur time
        var id; var clas;
        var span; var min; var hour ;
            minutes *= 2;
        var div = document.createElement("div");
        for (var i =0; i<=minutes; i++){
            id ="";
            clas ="";
            span = null;
            var e = document.createElement("div");
            if(i>59){
                min = i%60;
            }else{
                min = i;
            }

            hour = parseInt(start_time+i/60);
            if(i%5==0){
                id=hour+"_"+min;
                if(min<10) min = "0"+min;
                span = document.createElement("span");
                span.className = "time"
                span.innerHTML = hour+":"+min
                clas = clas+" l"
            }
            e.id = id;
            e.className="col "+clas;
            e.style.width =minutes_img_width;
            matrix_el.appendChild(e);
            if(span!=null) matrix_el.appendChild(span);

        }


        $(pep_el).pep({
              axis: 'x',
              //constrainTo: [0, 6000, 0, -3000],

              initiate: function(ev, obj) {},
              start: function(ev, obj)    {},
              drag: function(ev, obj)     {},
              stop: function(ev, obj)     {},
              rest: function(ev, obj)     {}
        });

        var check_left_position = function(left){
                if(left>window.innerWidth*3){

                }
        }

        var getCard = function(data){
            return "<div class='card'>" +
                        "<div class='img'><img width='200px' height='100px' src="+data.image+"></div>"+
                        "<div class='info'>"+data.name+"</div>"+
                        "</div>";
        }

        var renderCard = function(timestamp, card) {
            var time = new Date(parseInt(timestamp));
            var minutes = time.getMinutes();
            $('#'+time.getHours()+"_"+ minutes).addClass('has-card').append(card);
        }

        function renderCards(data){
              var card = "";
              data.forEach(function (item) {
                   card = getCard(item);
                   renderCard(item.time, card);
              });
        }
        //renderCard("998902800000");
        $.getJSON( "cards.json", function( data ) {
            renderCards(data);
            generateSlidesHTML(data);
        });
        function generateSlidesHTML(data) {

            var container = $('.slider-content');

            var theTemplateScript = $("#slide-template").html();
            //Compile the template​
            var theTemplate = Handlebars.compile(theTemplateScript);
            container.append(theTemplate(data));
        }

      });