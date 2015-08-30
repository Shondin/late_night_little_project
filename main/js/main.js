 $(function(){
        var $pep = $('.pep');
        var $matrix = $('#matrix');

        var now = new Date();

        var pep_width = window.innerWidth*6; // ширина таймлайна - 6 экранов
            $pep.css('width',pep_width+'px');
        var minutes_img_width = 10;
        var minutes = (pep_width/minutes_img_width)/2;
        var start_time = parseInt((now.getHours() - minutes/60));

        //cur time
        var id; var clas;
        var time_html; var min; var hour ;
            minutes *= 2;
        for (var i =0; i<=minutes; i++){
            id ="";
            clas ="";
            time_html = ""
            if(i>60){
                min = i%60;
            }else{
                min = i;
            }

            hour = parseInt(start_time+i/60);
            if(i%5==0){
                id="id='"+parseInt(hour+i/60)+"_"+min+"'";
                if(min<10) min = "0"+min;
                time_html = "<span class='time'>" + hour+":"+min+"</span>";
                clas = clas+" l"
            }

            $matrix.append("<div "+id+" class='col"+clas+"' style='width:"+minutes_img_width+"px'></div>"+time_html);
        }


        $('.pep').pep({
              axis: 'x',
              //constrainTo: [0, 6000, 0, -3000],

              initiate: function(ev, obj) {},
              start: function(ev, obj)    {
              },
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
                        "<div class='img'><img width='300px' height='100px' src="+data.image+"></div>"+
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
            renderCards(data)
        });
      });