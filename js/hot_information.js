window.onload = function(){
	this.getData_hot(0,"all");
  document.querySelector('#typeShow').innerHTML = "全部";
};
function toType(type){
	var self = this;
  self.type = type;
  if(self.type=="all"){
    self.typeShow = "全部";
    document.querySelector('.showAll').style.color = "#e1ac21";
    document.querySelector('.showRdgz').style.color = "#333";
    document.querySelector('.showZcjd').style.color = "#333";
    document.querySelector('.showGsch').style.color = "#333";
    document.querySelector('#typeShow').innerHTML = "全部";
  }else if(self.type=="rdgz"){
    self.typeShow = "热点关注";
    document.querySelector('.showAll').style.color = "#333";
    document.querySelector('.showRdgz').style.color = "#e1ac21";
    document.querySelector('.showZcjd').style.color = "#333";
    document.querySelector('.showGsch').style.color = "#333";
    document.querySelector('#typeShow').innerHTML = "热点关注";
  }else if(self.type=="zcjd"){
    self.typeShow = "政策解读";
    document.querySelector('.showAll').style.color = "#333";
    document.querySelector('.showRdgz').style.color = "#333";
    document.querySelector('.showZcjd').style.color = "#e1ac21";
    document.querySelector('.showGsch').style.color = "#333";
    document.querySelector('#typeShow').innerHTML = "政策解读";
  }else if(self.type=="gsch"){
    self.typeShow = "个税筹划";
    document.querySelector('.showAll').style.color = "#333";
    document.querySelector('.showRdgz').style.color = "#333";
    document.querySelector('.showZcjd').style.color = "#333";
    document.querySelector('.showGsch').style.color = "#e1ac21";
    document.querySelector('#typeShow').innerHTML = "个税筹划";
  }

    //调用ajax
    self.getData_hot(0,self.type);
    
}
//分页
function change_page(type,totalPage){
  $("#pagination_8").whjPaging({
      totalPage: totalPage,
      showPageNum: 5,
      isShowFL: false,
      isShowPageSizeOpt: false,
      isShowSkip: false,
      isShowRefresh: false,
      isShowTotalPage: false,
      isResetPage: true,
      callBack: function (currPage, pageSize) {
          console.log('currPage:' + currPage + '     pageSize:' + pageSize);
          getData_hot(currPage,type);
      }
  });
}

// 热门资讯获取
function getData_hot(pageval,type){
	var ul_box = document.getElementById("hot_ul");
  //  清除li
  while (ul_box.hasChildNodes()) {
    ul_box.removeChild(ul_box.firstChild);
  }
	var hot_informationImg = "";
	var hot_mid_1 = "";
	var hot_mid_2 = "";
	var hot_mid_3 = "";
	var hot_total = "";
	var hot_url = "";
	var hot_id = "";
	// 发ajax
  var requestParams = {
	  "pageIndex": pageval,
        "pageSize": 4,
        "type": type
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
          	for(var i=0;i<4;i++){
              hot_informationImg = data.infos.list[i].imageUrl;
          		hot_mid_1 = data.infos.list[i].title;
          		hot_mid_2 = data.infos.list[i].summary;
			        hot_mid_3 = data.infos.list[i].time;
			        hot_url = data.infos.list[i].url;
			        hot_id = data.infos.list[i].id;
			        var box_con = document.createElement("li"); 
			        box_con.innerHTML =
		        	'<div class="information_box">'+
              			'<div class="box_lef left">'+
              				'<img :src="'+hot_informationImg+'" alt="">'+
              			'</div>'+
              			'<div class="box_mid left">'+
                				'<p class="mid1">'+hot_mid_1+'</p>'+
                				'<p class="mid2">'+hot_mid_2+'</p>'+
                				'<p class="mid3">'+hot_mid_3+'</p>'+
              			'</div>'+
              			'<div class="box_rig right">'+
                				'<a href="javascript:;" onclick="toInformation_detail(\''+hot_id+'\')">了解更多</a>'+
              			'</div>'+
            			'</div>';
            hot_total = data.infos.totalPage;
		        ul_box.appendChild(box_con);
            //生成分页器
            change_page(type,hot_total);
	      }

          },
          error: function (error) {
            console.log(error);
          }
      })
  };
  Ajax(requestParams);
}

// 跳到资讯详情页
function toInformation_detail(thisId){
	localStorage.removeItem("id");
	localStorage.setItem("id",thisId);
	window.location.href='./information_detail.html';
}