window.addEventListener('scroll', this.handleScroll);
function handleScroll () {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var nav = document.querySelector('.nav');
            var con = document.querySelector('.thisContent');
            // var offsetTop = document.querySelector('.nav').offsetTop;
            // console.log(scrollTop);
            if (scrollTop >= 1090) {
              nav.setAttribute("class","nav nav_fixed");
            } else{
              nav.setAttribute("class","nav");
            }
            var active_nav = document.querySelectorAll('.nav_con');
            if (scrollTop >= 1166 && scrollTop <1472) {
              active_nav[0].setAttribute("class","nav_con nav_con1 nav_con1_select");
              active_nav[1].setAttribute("class","nav_con nav_con2");
              active_nav[2].setAttribute("class","nav_con nav_con3");
              active_nav[3].setAttribute("class","nav_con nav_con4");
              active_nav[4].setAttribute("class","nav_con nav_con5");
            } else if(scrollTop >= 1472 && scrollTop <2413){
              active_nav[0].setAttribute("class","nav_con nav_con1");
              active_nav[1].setAttribute("class","nav_con nav_con2 nav_con2_select");
              active_nav[2].setAttribute("class","nav_con nav_con3");
              active_nav[3].setAttribute("class","nav_con nav_con4");
              active_nav[4].setAttribute("class","nav_con nav_con5");
            }else if(scrollTop >= 2413 && scrollTop <3546){
              active_nav[0].setAttribute("class","nav_con nav_con1");
              active_nav[1].setAttribute("class","nav_con nav_con2");
              active_nav[2].setAttribute("class","nav_con nav_con3 nav_con3_select");
              active_nav[3].setAttribute("class","nav_con nav_con4");
              active_nav[4].setAttribute("class","nav_con nav_con5");
            }else if(scrollTop >= 3546 && scrollTop <4195){
              active_nav[0].setAttribute("class","nav_con nav_con1");
              active_nav[1].setAttribute("class","nav_con nav_con2");
              active_nav[2].setAttribute("class","nav_con nav_con3");
              active_nav[3].setAttribute("class","nav_con nav_con4 nav_con4_select");
              active_nav[4].setAttribute("class","nav_con nav_con5");
            }else if(scrollTop >= 4195){
              active_nav[0].setAttribute("class","nav_con nav_con1");
              active_nav[1].setAttribute("class","nav_con nav_con2");
              active_nav[2].setAttribute("class","nav_con nav_con3");
              active_nav[3].setAttribute("class","nav_con nav_con4");
              active_nav[4].setAttribute("class","nav_con nav_con5 nav_con5_select");
            }else{
              active_nav[0].setAttribute("class","nav_con nav_con1 nav_con1_select");
              active_nav[1].setAttribute("class","nav_con nav_con2");
              active_nav[2].setAttribute("class","nav_con nav_con3");
              active_nav[3].setAttribute("class","nav_con nav_con4");
              active_nav[4].setAttribute("class","nav_con nav_con5");
            }
      }