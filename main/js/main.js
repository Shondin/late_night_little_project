 $(function(){
        var $pep = document.getElementById('pep');
        var $line = document.getElementById('line');
        var $slider = document.getElementById('slider-content');
        var pep_width = window.screen.width*6; // ширина таймлайна - 6 экранов
            $pep.style.width = pep_width+'px';

        renderTimeline(pep_width);


        var data_len;
        $.getJSON( "cards.json", function( data ){
            data_len = data.length;
            $slider.style.width = data_len*window.innerWidth;
            renderCards(data);
            renderSlides(data);
        });


         var left_btn  = document.getElementById('left-arrow');
         var right_btn = document.getElementById('right-arrow');

         right_btn.addEventListener('click',function(){
             var active = document.getElementsByClassName('active')[0];
             var next = active.nextElementSibling
             removeClass(active,'active');
             addClass(next,'active');
             moveSlider('100%',200);
         });

         left_btn.addEventListener('click',function(){
             var active = document.getElementsByClassName('active')[0];
             var prev = active.previousElementSibling;
             removeClass(active,'active');
             addClass(prev,'active');
             moveSlider('-100%',200);
         });

         var moveSlider = function(value, dur) {
            var value = "translateX("+ value+"px)";
            var css = {
                 'transform': value ,
                 '-webkit-transform': value ,
                 '-moz-transform': value,
                 '-ms-transform': value,
                 '-o-transform': value,
                 'transition-duration': dur+'ms',
                 '-webkit-transition-duration': dur+'ms',
                 '-moz-transition-duration': dur+'ms',
                 '-o-transition-duration': dur+'ms',
                 '-ms-transition-duration': dur+'ms'
            }
            jQuery.extend($slider.style, css);
        };

        var line_margin = getLeft($line);
        $($pep).pep({
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




        $('body').on('click','.card',function(){
            var left = getLeft(this);
            var dx = line_margin-left;
            var xOp;
            if(dx>0){
                xOp = "+="+dx;
            }else if(dx<0){
                xOp = "-="+Math.abs(dx)
            }
            var id = $(this).data('id');
            var $slide = document.getElementById(id);
            var left = getLeft($slide);
            moveSlider(left);
          pep.moveToUsingTransforms( dx,  0);
            //pep.options.moveTo( xOp, 0, true );
        });

        window.onresize = function(event) {
            $slider.style.width = data_len*window.innerWidth;
        };

 });

