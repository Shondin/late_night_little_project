 $(function(){
        var $pep = document.getElementById('pep');
        var $line = document.getElementById('line');
        var $slider = document.getElementById('slider-content');
        var pep_width = window.screen.width*4; // ширина таймлайна - 8 экранов
            $pep.style.width = pep_width+'px';

        renderTimeline(pep_width);

        var data_len;
        $.getJSON( "cards.json", function( data ){
            data_len = data.length+1;
            $slider.style.width = data_len*screen.availWidth;
            renderCards(data);
            renderSlides(data);
        });

         var left_btn  = document.getElementById('left-arrow');
         var right_btn = document.getElementById('right-arrow');

         right_btn.addEventListener('click',function(){
             var active = document.getElementsByClassName('active')[0];
             try {
                 var right = getLeft($slider) - window.innerWidth;
                 var next = active.nextElementSibling;
             }catch(e){
                 return false;
             }
             if(next){
                 removeClass(active, 'active');
                 addClass(next, 'active');
                 moveSlider(right, 200);
             }
         });

         left_btn.addEventListener('click',function(){
             var active = document.getElementsByClassName('active')[0];
             try {
                 var prev = active.previousElementSibling;
                 var left = getLeft($slider) + window.innerWidth;
             }catch(e){
                 return false;
             }
             if(prev){
                 removeClass(active, 'active');
                 addClass(prev, 'active');
                 moveSlider(left, 200);
             }

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
              //startThreshold: [5, 5],
              elementsWithInteraction:'.card',
              constrainTo: [0, 0, 0, -(pep_width-screen.availWidth)],
              initiate: function(ev, obj) {},
              start: function(ev, obj)    {},
              drag: function(ev, obj)     {},
              stop: function(ev, obj)     {},
              rest: function(ev, obj)     {}
        });

        var check_left_position = function(left) {
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
            //$slider.style.width = data_len*window.innerWidth;
        };
 });

