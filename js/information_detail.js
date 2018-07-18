window.onload = function(){
  this.getInformation_1();
}
function toPrevInformation(){
  localStorage.removeItem("id");
  localStorage.setItem("id",localStorage.getItem("prev_id"));
  window.location.href='./information_detail.html';
}
function toNextInformation(){
  localStorage.removeItem("id");
  localStorage.setItem("id",localStorage.getItem("next_id"));
  window.location.href='./information_detail.html';
}

function getInformation_1(){
  var information_title = '';
  var information_content = '';
  var information_prev = '';
  var information_next = '';
  var information_prev_id = '';
  var information_next_id = '';
  $.ajax({
      url:'https://api.igeshui.com/api/v1/articleInfo/pageDetail/'+localStorage.getItem("id"),
      headers:{
        "Accept": "*/*",
        "Gs-Authorization-ID": "test"
      },
      type:'get',
      contentType:'application/json',
      success: function (data) {
        // console.log(data);
        information_title = data.detail.title;
        information_content = data.detail.contentText;
        information_prev = data.prevDetail.title;
        information_next = data.nextDetail.title;
        information_prev_id = data.prevDetail.id;
        information_next_id = data.nextDetail.id;
        var span_title = '<span>'+information_title+'</span>';
        document.querySelector('#span_title1').innerHTML = span_title;
        document.querySelector('#span_title2').innerHTML = span_title;
        document.querySelector('#p_content').innerHTML = information_content;
        document.querySelector('#prev_title').innerHTML = information_prev;
        document.querySelector('#next_title').innerHTML = information_next;
        localStorage.removeItem("prev_id");
        localStorage.setItem("prev_id",information_prev_id);
        localStorage.removeItem("next_id");
        localStorage.setItem("next_id",information_next_id);
      },
      error: function (error) {
        console.log(error);
      }
  })
}
