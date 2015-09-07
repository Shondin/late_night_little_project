 $(function(){
        var pep_el = document.getElementById('pep');
        var matrix_el = document.getElementById("matrix");
        var line_el = document.getElementById('line');
        var now = new Date();

        var pep_width = window.screen.width*6; // ширина таймлайна - 6 экранов
            pep_el.style.width = pep_width+'px';
            matrix_el.style.width = pep_width+'px';
        var minutes_img_width = 10; // ширина минутной риски
        var all_minutes = (pep_width/minutes_img_width);
        var all_hours = all_minutes/60;
        var hours = Math.floor(all_hours);
        var minutes = Math.floor(getDecimal(all_hours)*60);

        var start_time = parseInt((now.getHours() - hours/2));

        //cur time
        var id; var clas;
        var span; var min; var hour ;
        var div = document.createElement("div");
        var m = all_minutes-minutes;
        for (var i =minutes; i<=m; i++) {
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
            if(hour>23){
                hour = hour%24;

            }
            if(i%5==0){
                id=hour+"_"+min;
                if(min<10) min = "0"+min;
                span = document.createElement("span");
                span.className = "time";
                span.innerHTML = hour+":"+min;
                clas = clas+" l";
            }
            e.id = id;
            e.className="col "+clas;
            e.style.width = minutes_img_width;
            matrix_el.appendChild(e);
            if(span!=null) matrix_el.appendChild(span);
        }

        var line_margin = getLeft(line_el);
        $(pep_el).pep({
              axis: 'x',
              startThreshold: [5, 5],
              elementsWithInteraction:'.card',
              //constrainTo: [0, 6000, 0, -3000],
              initiate: function(ev, obj) {},
              start: function(ev, obj)    {},
              drag: function(ev, obj)     {},
              stop: function(ev, obj)     {},
              rest: function(ev, obj)     {}
        });

        var check_left_position = function(left){
                if(left>window.innerWidth*3){}
        }

        var pep = $.pep.peps[0];

        //renderCard("998902800000");

        var slider_el = document.getElementById('slider-content');
        var data_len;
        $.getJSON( "cards.json", function( data ){
            data_len = data.length;
            slider_el.style.width = data_len*window.innerWidth;
            renderCards(data);
            generateSlidesHTML(data);
        });


        $('body').on('click','.card',function(){
            var left = getLeft(this);
            var dx = line_margin-left;

            pep.doMoveTo( dx, 0 );
        });

        window.onresize = function(event) {
            slider_el.style.width = data_len*window.innerWidth;
        };

     var slide_el  = document.getElementsByClassName('slide');
     var left_btn  = document.getElementById('left-arrow');
     var right_btn = document.getElementById('right-arrow');

     right_btn.addEventListener('click',function(){
         var active = document.getElementsByClassName('active');
         var next = active.nextElementSibling
         removeClass(active,'active');
         addClass(next,'active');
         move('100%',200);
     });

     left_btn.addEventListener('click',function(){
         var active = document.getElementsByClassName('active');
         var prev = active.previousElementSibling;
         removeClass(active,'active');
         addClass(prev,'active');
         move('-100%',200);
     });

     function addClass(el,className){
        if (el.classList)
          el.classList.add(className);
        else
          el.className += ' ' + className;
     }

     function removeClass(el, className){
        if (el.classList){
            el.classList.remove(className);
        }
        else{
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
     }

     function isHidden(el) {
        return (el.offsetParent === null)
     }
     var move = function(value, dur) {
        var value = "translateX("+ value+"px)";
        slide_el.css({
             '-webkit-transform': value ,
             '-moz-transform': value,
             '-ms-transform': value,
             '-o-transform': value,
             'transform': value ,
             'transition-duration': dur+'ms',
             '-webkit-transition-duration': dur+'ms',
             '-moz-transition-duration': dur+'ms',
             '-o-transition-duration': dur+'ms',
             '-ms-transition-duration': dur+'ms'
        });
 };
 });




 //$(window).on('resize',function(){
 //    $('.slide').css({
 //        'width':window.innerWidth+"px"
 //    })
 //})