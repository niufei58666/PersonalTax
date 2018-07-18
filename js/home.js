// 首页轮播
window.onload = function(){
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'horizontal',
	    autoplay: true,
	    loop: true,
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    }
	});
	this.getData();
};
// 首页获取动态热门资讯
function getData(){
	var ul_box = document.getElementById("home_information");
	var todo_mid_1 = "";
	var todo_mid_3 = "";
	var todo_url = "";
	var todo_type = "";
	var todo_id = "";
	// 发ajax
    var requestParams = {
		  "pageIndex": 0,
          "pageSize": 5,
          "type": "all"
    };
    var Ajax = function (requestParams) {
        $.ajax({
            // url:'http://192.168.100.66:9091/api/v1/articleInfo/dynamicPage',
      		url:'https://api.igeshui.com/api/v1/articleInfo/dynamicPage',
            headers:{
            	"Accept": "*/*",
        		"Gs-Authorization-ID": "test"
			},
            type:'post',
            dataType:'json',
            data:JSON.stringify(requestParams),
            contentType:'application/json',
            success: function (data) {
            	// console.log(data.infos.list);
            	for(var i=0;i<5;i++){
            		todo_mid_1 = data.infos.list[i].title;
			        todo_mid_3 = data.infos.list[i].time;
			        todo_url = data.infos.list[i].url;
			        todo_type = data.infos.list[i].type;
			        todo_id = data.infos.list[i].id;
			        var box_con = document.createElement("li"); 
			        box_con.innerHTML =
						'<a href="javascript:;" onclick="toInformation_detail(\''+todo_id+'\')">'+
							'<p class="information_title"><span>【'+todo_type+'】</span><span>'+todo_mid_1+'</span></p>'+
							'<p class="information_time">'+todo_mid_3+'</p>'+
						'</a>';
			        ul_box.appendChild(box_con);
		      }

            },
            error: function (error) {
              console.log(error);
            }
        })
    };
    Ajax(requestParams);
  }

// 获取资讯id
function toInformation_detail(thisId){
	// console.log(thisId);
	localStorage.removeItem("id");
	localStorage.setItem("id",thisId);
	window.location.href='./html/information_detail.html';
	// console.log(localStorage.getItem("id"));
};