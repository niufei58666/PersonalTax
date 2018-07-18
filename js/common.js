// 控制footer的两个input的placeholder
function aboutPlaceholder(className){
	document.querySelector(className).setAttribute("class", "consult_name input_change");
};
function aboutPlaceholder2(className){
	document.querySelector(className).setAttribute("class","consult_name");
};
function aboutPlaceholderAgain(className){
	document.querySelector(className).setAttribute("class", "consult_phone input_change");
};
function aboutPlaceholderAgain2(className){
	document.querySelector(className).setAttribute("class","consult_phone");
};

// 控制固定底部的引导footer的两个input的placeholder
function aboutPlaceholder_fixed(className){
  document.querySelector(className).setAttribute("class", "consult_name_fixed input_change");
};
function aboutPlaceholder2_fixed(className){
  document.querySelector(className).setAttribute("class","consult_name_fixed");
};
function aboutPlaceholderAgain_fixed(className){
  document.querySelector(className).setAttribute("class", "consult_phone_fixed input_change");
};
function aboutPlaceholderAgain2_fixed(className){
  document.querySelector(className).setAttribute("class","consult_phone_fixed");
};

//固定底部的关闭
function close_footer(){
  document.querySelector('.fixed_foot').setAttribute("class","fixed_foot fixed_foot_none");
}

//右侧节税计算器出现隐藏（点击节税计算器
function showCalculator(){
  if(document.querySelector('.calculator_con_show')){
    document.querySelector('.calculator_con_show').setAttribute("class","calculator_con");
  }else if(document.querySelector('.calculator_con')){
    document.querySelector('.please_cal').value = ""; //计算器出现时候清空input值
    document.querySelector('.calculator_con').setAttribute("class","calculator_con calculator_con_show");
  }
  if(document.querySelector('.calculator_con_res_show')){
    document.querySelector('.calculator_con_res_show').setAttribute("class","calculator_con_res");
    document.querySelector('.calculator_con_show').setAttribute("class","calculator_con");
  }
}

//点击节税
function showCalculatorRes(){
  // 计算节税结果
  var please_cal_value = document.querySelector('.please_cal').value;
  var number_partern = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/;
  console.log(number_partern.test(please_cal_value));
  if (!(number_partern.test(please_cal_value))){
    document.querySelector('.please_right').innerHTML = "请输入正确的年收入金额";
    document.querySelector('.error_warn').setAttribute("class","error_warn");
  }else{// 开始计算
    // console.log(document.querySelector('.choose_span_active').innerHTML);
    if(document.querySelector('.choose_span_active').innerHTML == "劳务合同"){
      if(please_cal_value<=9600){
        document.querySelector('.please_right').innerHTML = "年收入需大于9600元";
        document.querySelector('.error_warn').setAttribute("class","error_warn");
      }else{
        document.querySelector('.error_warn').setAttribute("class","error_warn please_none");

        var x = please_cal_value; // 实际年输入额

        var value = x/1.03/12;

        var condition;

        var expectResult; //预计应交税金

        if (value <= 4000) {
          condition = (value-800)>=0 ? value-800 : 0;
        } else {
          condition = value * 0.8
        }

        if (condition<=20000) {
          expectResult = condition * 0.2;
        } else if(condition<=50000) {
          expectResult = condition * 0.3 - 2000;
        } else {
          expectResult = condition * 0.4 - 7000;
        }

        expectResult = Math.round(expectResult*100)/100;

        expectResult = expectResult*12 + Math.round(value*0.033*100)/100*12;

        expectResult = Math.round(expectResult*100)/100;

        /* 节税后应交税金 */

        var actualResult; //节税后应交税金

        condition = Math.round(x/1.03*100)/100*0.1;

        if (condition<=15000) {
          actualResult = condition * 0.05;
        } else if (condition<=30000) {
          actualResult = condition * 0.1 - 750;
        }else if (condition<=60000) {
          actualResult = condition * 0.2 - 3750;
        }else if (condition<=100000) {
          actualResult = condition * 0.3 - 9750;
        }else{
          actualResult = condition * 0.35 - 14750;
        }

        if (x>360000) {
          actualResult = actualResult + Math.round(x/1.03*0.033*100)/100;
        }

        actualResult = Math.round(actualResult*100)/100;

        //节税金额 = expectResult - actualResult;
        var save_amount = expectResult - actualResult;
        save_amount = Math.round(save_amount*100)/100;

        //节税比例
        var save_percentage;

        if (expectResult == 0) {
          // 节税比例 = 0; 
          save_percentage = 0;
        }
        // 节税比例 = 节税金额 / expectResult > 0 ? 节税金额 / expectResult : 0
        save_percentage = save_amount / expectResult > 0 ? save_amount / expectResult : 0
        save_percentage = Math.round(save_percentage*100)/100;
        save_percentage = save_percentage*100;//乘了100的百分数

        console.log("劳务合同");
        console.log("预计应缴纳税金"+ expectResult);
        console.log("节税后应交税金"+ actualResult);
        console.log("节税金额"+ save_amount);
        console.log("节税比例"+ save_percentage);

        // 显示右侧节税计算器结果页
        if(document.querySelector('.calculator_con_res')){
          document.querySelector('.calculator_con_res').setAttribute("class","calculator_con_res calculator_con_res_show");
          document.querySelector('.calculator_con').setAttribute("class","calculator_con");
        }
        // 结果页显示饼图
        localStorage.removeItem("expectResult");
        localStorage.removeItem("actualResult");
        localStorage.setItem("expectResult",expectResult);
        localStorage.setItem("actualResult",actualResult);
        document.querySelector('.save_amount').innerHTML = save_amount;
        document.querySelector('.save_percentage').innerHTML = save_percentage;
        document.querySelector('.amount_before').innerHTML = expectResult;
        document.querySelector('.amount_after').innerHTML = actualResult;
        pie();
      }
    }else if(document.querySelector('.choose_span_active').innerHTML == "劳动合同"){
      if(please_cal_value<=60000){
        document.querySelector('.please_right').innerHTML = "年收入需大于60000元";
        document.querySelector('.error_warn').setAttribute("class","error_warn");
      }else{
        document.querySelector('.error_warn').setAttribute("class","error_warn please_none");
        function sortNum(a, b) {
          return a - b; //升序，如降序，把“a - b”该成“b - a”
        }

        var x = please_cal_value;  // 实际年收入额

        var proportion = [0.03, 0.1, 0.2, .25, 0.3, 0.35, 0.45];//比例

        var amount = [0, 105, 555, 1005, 2755, 5505, 13505];//金额

        var arr = [];

        var income = Math.round(x/12*100)/100-3500;

        var expectResult; // 预计个人所得税

        for (var i=0;i<proportion.length; i++) {
          var val = income * proportion[i] - amount[i];
          arr.push(val);
        }
        arr.push(0);

        arr = arr.sort(sortNum);

        expectResult = Math.round(arr[arr.length-1]*100)/100*12;

        /* 节税后应交税金 */

        var actualResult; //节税后应交税金

        condition = Math.round(x/1.03*100)/100*0.1;

        if (condition<=15000) {
          actualResult = condition * 0.05;
        } else if (condition<=30000) {
          actualResult = condition * 0.1 - 750;
        }else if (condition<=60000) {
          actualResult = condition * 0.2 - 3750;
        }else if (condition<=100000) {
          actualResult = condition * 0.3 - 9750;
        }else{
          actualResult = condition * 0.35 - 14750;
        }

        if (x>360000) {
          actualResult = actualResult + Math.round(x/1.03*0.033*100)/100;
        }

        actualResult = Math.round(actualResult*100)/100;

        //节税金额 = expectResult - actualResult;
        var save_amount = expectResult - actualResult;
        save_amount = Math.round(save_amount*100)/100;

        //节税比例
        var save_percentage;
        if (expectResult == 0) {
          //节税比例 = 0; 
          save_percentage = 0;
        }
        // 节税比例 = 节税金额 / expectResult > 0 ? 节税金额 / expectResult : 0
        save_percentage = save_amount / expectResult > 0 ? save_amount / expectResult : 0
        save_percentage = Math.round(save_percentage*100)/100;
        save_percentage = save_percentage*100;//乘了100的百分数

        console.log("劳动合同");
        console.log("预计应缴纳税金"+ expectResult);
        console.log("节税后应交税金"+ actualResult);
        console.log("节税金额"+ save_amount);
        console.log("节税比例"+ save_percentage);

        // 显示右侧节税计算器结果页
        if(document.querySelector('.calculator_con_res')){
          document.querySelector('.calculator_con_res').setAttribute("class","calculator_con_res calculator_con_res_show");
          document.querySelector('.calculator_con').setAttribute("class","calculator_con");
        }
        // 结果页显示饼图
        localStorage.removeItem("expectResult");
        localStorage.removeItem("actualResult");
        localStorage.setItem("expectResult",expectResult);
        localStorage.setItem("actualResult",actualResult);
        document.querySelector('.save_amount').innerHTML = save_amount;
        document.querySelector('.save_percentage').innerHTML = save_percentage;
        document.querySelector('.amount_before').innerHTML = expectResult;
        document.querySelector('.amount_after').innerHTML = actualResult;
        pie();
      }
      
    }
  }
}

function pie(){
   echarts.init(document.getElementById('pie_box')).setOption({
        series: {
            type: 'pie',
            labelLine: {
                lineStyle: {
                    color: 'red'
                }
            },
            label:{
              color: '#333',
              position: 'top'
            },
            radius : '55%',
            center: ['53%', '38%'],
            // 设置扇形的颜色
            color: ['#1e5474','#e1ac21'],
            data: [
                {name: '使用个税宝', value: localStorage.getItem("actualResult")},
                {name: '未使用个税宝', value: localStorage.getItem("expectResult")}
                
            ] 
        }
    }); 
}


//关闭计算器-计算页（点×
function close_cal(){
  document.querySelector('.calculator_con').setAttribute("class","calculator_con");
}
//关闭计算器-结果页（点×
function close_res(){
  document.querySelector('.calculator_con_res').setAttribute("class","calculator_con_res");
}

// 选择合同类型,变化CSS
function getactive(){
  document.querySelector('.choose_span_active').setAttribute("class","choose_span");
  $(event.target).addClass("choose_span_active");
}


// footer立即咨询button提交
function toSubmit(){
  console.log("submit");
  var consult_name = document.querySelector('.consult_name').value;
  var consult_phone = document.querySelector('.consult_phone').value;
  if(consult_name==""||consult_phone==""){
    alert("请输入您的信息。")
  }else{
    var Ajax_get = function () {
      $.ajax({
        url:'https://api.igeshui.com/api/v1/information/submitInformation/'+consult_phone+'/'+consult_name+'?_=1517040654974&jsonpCallback=Zepto1517040630251',
          headers:{
            "Accept": "*/*",
            "Gs-Authorization-ID": "test"
          },
          type:'get',
          contentType:'application/json',
          success: function (data) {
            console.log(data);
            if(data.indexOf("true")!= -1){
              alert('提交成功！请保持电话通畅，我们会及时与您取得联系。')
            }else{
              alert('该手机号码已提交！')
            }
          },
          error: function (error) {
            console.log(error);
          }
        })
    };
    Ajax_get();
  }
	
}


// fixed_footer立即咨询button提交
function toSubmit_fixed(){
  console.log("submit_fixed");
  var consult_name_fixed = document.querySelector('.consult_name_fixed').value;
  var consult_phone_fixed = document.querySelector('.consult_phone_fixed').value;
  if(consult_name_fixed==""||consult_phone_fixed==""){
    alert("请输入您的信息。")
  }else{
    var Ajax_get = function () {
      $.ajax({
        url:'https://api.igeshui.com/api/v1/information/submitInformation/'+consult_phone_fixed+'/'+consult_name_fixed+'?_=1517040654974&jsonpCallback=Zepto1517040630251',
          headers:{
            "Accept": "*/*",
            "Gs-Authorization-ID": "test"
          },
          type:'get',
          contentType:'application/json',
          success: function (data) {
            console.log(data);
            if(data.indexOf("true")!= -1){
              alert('提交成功！请保持电话通畅，我们会及时与您取得联系。')
            }else{
              alert('该手机号码已提交！')
            }
          },
          error: function (error) {
            console.log(error);
          }
      })
    };
    Ajax_get();
  }
  
}


// right_footer立即咨询button提交
function toSubmit_right(){
  console.log("submit_right");
  var consult_name_right = document.querySelector('.consult_name_right').value;
  var consult_phone_right = document.querySelector('.consult_phone_right').value;
  if(consult_name_right==""||consult_phone_right==""){
    alert("请输入您的信息。")
  }else{
    var Ajax_get = function () {
      $.ajax({
        url:'https://api.igeshui.com/api/v1/information/submitInformation/'+consult_phone_right+'/'+consult_name_right+'?_=1517040654974&jsonpCallback=Zepto1517040630251',
          headers:{
            "Accept": "*/*",
            "Gs-Authorization-ID": "test"
          },
          type:'get',
          contentType:'application/json',
          success: function (data) {
            console.log(data);
            if(data.indexOf("true")!= -1){
              alert('提交成功！请保持电话通畅，我们会及时与您取得联系。')
            }else{
              alert('该手机号码已提交！')
            }
          },
          error: function (error) {
            console.log(error);
          }
      })
    };
    Ajax_get();
  }
  
}