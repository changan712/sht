define("sht/mb-recharge/1.0.0/mb-recharge",["http://yb.shenghuo.com/js/common","arale/overlay/1.1.4/overlay","arale/autocomplete/1.2.3/autocomplete","arale/tip/1.2.1/tip","arale/cookie/1.0.2/cookie"],function(a,b,c){var d=a("http://yb.shenghuo.com/js/common.js"),e=a("arale/overlay/1.1.4/overlay"),f=a("arale/autocomplete/1.2.3/autocomplete"),g=a("arale/tip/1.2.1/tip"),h=a("arale/cookie/1.0.2/cookie"),i={init:function(){this.mobile_amount_user=!1,this.input=$("#J_p-num-input"),this.con=$(".tbr-phpne").eq(0),this.select=$("#J_phone-amount-list").data("select"),this.selectHd=$(".service .aui-select-wrap"),this.sbmBtn=$("#J_mobile-btn"),this.discount=$("#J_mobile-discount-price"),this.historyIc=this.con.find(".ic-contacts").eq(0),this.noHistoryTip=this.createNoHistoryTips(),this.historyDiv=$("#J_phone-list"),this.hasHistry=!1,this.numCorrect=!1,this.errcode=!0,this.maxlength=11,this.bigNum=this.createBigNumView(),this.dc={10:"9.8 - 10",20:"19.6 - 20",30:"29.4 - 30",50:"49 - 49.8",100:"98 - 99.5",200:"196 - 199",300:"294 - 299",500:"490 - 498",1e3:"980 -990"},this.infoTip=this.createInfoView(),this.input.attr({maxlength:this.maxlength,autocomplete:"off"}),this.input.on("keyup",$.proxy(this.onkeyupInput,this)),this.select.on("change",$.proxy(this.onChangeSelect,this)),this.sbmBtn.on("click",$.proxy(this.sbm,this)),$(this).on("notover",$.proxy(this.onnotOver,this)),$(this).on("historyready",this.createHistoryListView),11==this.input.length&&this.updateView(),this.createSubmitList(),this.bigNumView()},createSubmitList:function(){var a=h.get("_HISTORYPHONENUMLIST")?$.parseJSON(decodeURI(h.get("_HISTORYPHONENUMLIST"))):[],b="",c=this;a.length&&($.each(a,function(a,c){b+="<li>"+c+"</li>"}),c.historyDiv.html(b),c.createHistoryListView())},createHistoryListView:function(){var a=this;if(this.historyDiv.size()&&this.historyDiv.find("li").size()){var b=this.createHistoryData();this.hasHistry=!0,this.oA&&this.oA.destroy();var c=this.oA=this.creatAo(b);return this.noHistoryTip.destroy(),this.historyIc.css({cursor:"pointer"}),this.historyIc.on("click",function(){return b.length?(a.historyDiv.show(),a.bigNum.hide(),!1):void 0}),$(document).on("click",function(){a.historyDiv.hide()}),this.historyDiv.delegate("li","click",function(){a.input.val($.trim($(this).text())),a.historyDiv.hide(),a.updateView()}),c}},createNoHistoryTips:function(){this.historyIc.css({cursor:"default"});var a=this;return new g({trigger:a.historyIc,content:"无最近充值记录",arrowPosition:1,theme:"blue",inViewport:!0}).hide()},bigNumView:function(){$(document).on("click",$.proxy(function(){this.bigNum.hide()},this)),this.input.on("click",$.proxy(function(){return this.input.val().length&&this.input.val().length<11?(this.bigNum.show().element.html(this.setDlForNum(this.input.val())),!1):void 0},this)),this.bigNum.on("click",function(){return!1}),$(this).on("over",$.proxy(function(){this.bigNum.hide()},this))},setDlForNum:function(a){return a.length>3&&a.length<=7?a.replace(/^(\d{3})/,"$1-"):a.length>7?a.replace(/^(\d{3})(\d{4})/,"$1-$2-"):a},createBigNumView:function(){var a=this;return new e({template:'<div id="bignum"></div>',className:"ui-bignum",style:{border:"1px solid #B9C8D3",padding:"0 10px","line-height":"26px",background:"#F8FCFF","font-weight":"bold","font-size":"14px",color:"#f60",width:a.input.outerWidth()-22},align:{selfXY:[0,0],baseElement:a.input,baseXY:[0,"100%"]}}).hide().set("zIndex",98)},creatAo:function(a){var b=this;this.oA&&this.oA.destroy();var c=new f({trigger:b.input,dataSource:a,selectFirst:!0,className:"mb-oa",width:b.input.innerWidth()}).render();return c.before("show",function(){b.bigNum.hide()}),c.on("itemSelect",function(){b.updateView()}),c},updateView:function(){var a=$.trim(this.input.val()),b=$.trim(this.select.get("value")),c=this;a.length<11||this.fetchData(a,b,function(a,b,d){c.rerenderSelect(a),c.rerenderDiscount(b),c.input.is(":visible")&&c.infoTip.show().element.html(d)})},createInfoView:function(){var a=this;return new e({template:'<div id="infoview">号码信息未知</div>',height:26,style:{border:"1px solid #ffbb76",padding:"0 10px","line-height":"26px",background:"#fffcef",color:"#de7c22"},align:{selfXY:[0,"100%+2"],baseElement:a.input,baseXY:[0,0]}}).render()},createHistoryData:function(){var a=[];return this.historyDiv.find("li").each(function(){a.push($.trim($(this).text()))}),a},disableView:function(){this.defaulteDiscount()},onnotOver:function(){this.infoTip.hide(),this.defaulteDiscount()},onkeyupInput:function(a){var b=this,c=this.input.val();return 37!=a.keyCode&&39!=a.keyCode?(c.match(/\D/)&&this.input.val(c.replace(/\D/g,"")),this.input.val().length&&this.input.val().length!=this.maxlength?(b.bigNum.show().element.html(b.setDlForNum(b.input.val())),this.numCorrect=!1):(this.bigNum.hide(),this.oA&&this.oA.hide()),8==a.keyCode?($(this).trigger("notover"),void 0):(this.input.val().length==this.maxlength?(this.updateView(),$(this).trigger("over")):(this.disableView(),$(this).trigger("notover")),void 0)):void 0},onChangeSelect:function(){this.numCorrect?this.updateView():this.defaulteDiscount()},defaulteDiscount:function(){var a=this.dc[this.select.get("value")];this.discount.text(a)},disableSelect:function(){this.selectHd.disable()},rerenderDiscount:function(a){a>0?this.discount.text((a/100).toFixed(2)):this.defaulteDiscount()},rerenderSelect:function(a){this.select.syncModel(a)},sbm:function(){if(0!=this.errcode){var a=$.trim(this.input.val()),b=$.trim(this.select.get("value"));/\d{11}/.test(a)&&b>0&&this.numCorrect?location.replace("https://pay.shenghuo.com/bill/recharge?mobile="+a+"&amount="+b):this.infoTip.show().element.html("请确认号码输入是否正确")}},fetchData:function(a,b,c){var e=[],f="号码信息未知",g=0,h=0,i=this,j={mobile:a,with_amount:1,with_amount_selected:1};b*=100,d.getMobileAttribution(j,function(a){a.data&&a.data.isp&&(f=$.trim(a.data.isp)),0==a.errcode&&a.data&&a.data.price_list&&a.data.price_list.length>0?($.each(a.data.price_list,function(a,c){g=c.show_price/100;var d={value:g,text:g+"元"};b==c.show_price&&(amount_exists=!0,h=c.price,d.selected="true"),e.push(d)}),i.numCorrect=!0,i.errcode=!0,c(e,h,f)):a.errcode>0&&a.errmsg.length<40?(i.numCorrect=!1,i.errcode=!1,i.infoTip.show().element.html(a.errmsg)):(i.numCorrect=!1,i.errcode=!1,i.infoTip.show().element.html("未知错误！请稍后重试"))})}};i.init(),c.exports=i});
