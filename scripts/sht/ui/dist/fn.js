define("sht/ui/1.0.0/fn",["arale/popup/1.1.6/popup","$","arale/overlay/1.1.4/overlay","arale/position/1.0.1/position","arale/iframe-shim/1.0.2/iframe-shim","arale/widget/1.1.1/widget","arale/base/1.1.1/base","arale/class/1.1.0/class","arale/events/1.1.0/events","arale/select/0.9.9/select","arale/templatable/0.9.2/templatable","gallery/handlebars/1.0.2/handlebars","gallery/handlebars/1.0.2/runtime"],function(a,b,c){var d=a("arale/popup/1.1.6/popup"),e=a("arale/overlay/1.1.4/overlay"),f=(a("arale/widget/1.1.1/widget"),a("arale/select/0.9.9/select")),g={};c.exports=$,$.fn.disable=function(){return this.each(function(){if(console.log($.isIE,$.isIE6),$(this).is(":visible")&&!this.bDisable){this.hasOwnProperty("disable")&&$(this).attr("disable");var a=new e({width:$(this).outerWidth(),height:$(this).outerHeight(),zIndex:9001,className:"ui-disable-mask",align:{baseElement:"body",selfXY:[0,0],baseXY:[$(this).offset().left,$(this).offset().top]},style:{background:"#fff",opacity:.1}}).show();$(this).addClass("disable"),g[a.cid]=a,this.cid_disable_Point=a.cid,this.bDisable=!0}})},$.fn.enable=function(){return this.each(function(){this.hasOwnProperty("disable")&&$(this).removeAttr("disable"),g&&g[this.cid_disable_Point]&&(g[this.cid_disable_Point].element.remove(),delete g[this.cid_disable_Point]),$(this).removeClass("disable"),this.bDisable&&(this.bDisable=!1)})};var h=e.extend({attrs:{template:'<img class="ui-loading" src="../../images/common/loading.gif">',zIndex:9009,width:16,height:16,position:"absolute",align:{selfXY:["50%","50%"],baseXY:["50%","50%"]}},_onRenderZIndex:function(a){this.element.css("zIndex",a)},_onRenderPosition:function(a){this.element.css("position",a)},setup:function(){h.superclass.setup.apply(this,arguments),this.render(),this.show()}});$.fn.loading=function(){return this.each(function(){var a=this;if(!this.bLoadding){var b=new h({align:{baseElement:a}});$(this).disable(),g[b.cid]=b,this.cid_loading_Point=b.cid,this.bLoadding=!0}})},$.fn.removeLoading=function(){return this.each(function(){g&&g[this.cid_loading_Point]&&(g[this.cid_loading_Point].element.remove(),delete g[this.cid_loading_Point]),$(this).enable(),this.bLoadding&&(this.bLoadding=!1)})},$.fn.uploader=function(a){return this.each(function(){$(this).attr("im",!0);{var b,c,d,e=this;$(this).height()}$(this).css({position:"absolute",opacity:"0",height:"30px"}).attr("size","1").wrap(a||'<a class="ui-btn btn-upload ">上传</a>'),b=$(this).parents("a").css({position:"relative"}),d=$(this).parents(".uploader"),d.prepend('<input type="text" class="inp_txt w200">'),c=d.find(".inp_txt").css({marginRight:"10px"}),b.bind("mousemove",function(a){$(e).css({left:parseInt(a.pageX-$(this).offset().left)-$(e).width()+10+"px",top:parseInt(a.pageY-$(this).offset().top)-5+"px"})}),$(this).bind("change",function(){c.val($(this).val())})})},$.fn.myPopUp=function(a,b){if(!$(a).size())return!1;if($(this).data("popUpRended"))return!1;$(this).data("popUpRended",!0).addClass("haspopup");var c,e,f=$.extend({trigger:this,element:a},b),g=new d(f);return c=g.activeTrigger,e=c.find("i").filter(function(){return/ui-arrow/.test(this.className)}),g.after("show",function(){c.addClass("active"),e.addClass("reverse")}),g.after("hide",function(){c.removeClass("active"),e.removeClass("reverse")}),$(this).data("popUp",g),this},$.fn.myCheckbox=function(){return this.each(function(){if($(this).is("[type= checkbox]")&&!$(this).data("rended")){var a=this;$(this).wrap('<i class="aui-chechbox-wrap"></i>'),this.con=$(this).parent("i"),$(this).prop("checked")&&this.con.addClass("aui-chechbox-ckd"),$(this).on("change",function(){$(this).prop("checked")?a.con.addClass("aui-chechbox-ckd"):a.con.removeClass("aui-chechbox-ckd")}),$(this).data("rended",!0)}})},$.fn.mySelect=function(){return this.each(function(){if($(this).is("select")&&!$(this).data("rended")){var a=this,b=new f({trigger:this,classPrefix:"aui-select"}).render(),c=$(this).next(".aui-select-trigger");c.wrap('<span class="aui-select-wrap"></span>'),this.con=c.parent(".aui-select-wrap"),c.after('<span><i class="ui-arrow-down"></i></span>'),this.btn=this.con.find("span"),this.btn.on("click",function(){return $(".aui-select").hide(),b.show(),!1}),b.after("show",function(){a.con.addClass("aui-select-wrap-active"),b._relativeElements[1].addClass("aui-select-active")}),b.after("hide",function(){a.con.removeClass("aui-select-wrap-active"),b._relativeElements[1].removeClass("aui-select-active")}),$(this).data("select",b),$(this).data("rended",!0)}})},$.fn.myPlaceholder=function(){return this.each(function(){function a(){e.css("float","left"),e.parent(".formText_con").css({position:"relative",display:"inline-block",verticalAlign:"middle",width:e.outerWidth()+"px",height:e.outerHeight()+"px"}).end().prev("label").css({position:"absolute",height:e.outerHeight()+"px",lineHeight:b+"px",left:"8px",top:0})}$(this).wrap('<span class="formText_con"></span>').before("<label>"+$(this).attr("txt")+"</label>");var b,c=$(this).parent(".formText_con"),d=c.find("label"),e=c.find("input,textarea");$(this).is("input")?b=e.outerHeight():$(this).is("textarea")&&(b=30),a(this),e.val()&&d.hide(),d.bind("click",function(){e.focus()}),e.bind("kewdown",function(){e.val().length?d.hide():d.show()}),e.bind("focus",function(){d.css({color:"#ccc"})}),e.bind("blur",function(){0==e.val().length&&(d.show(),d.css({color:""}))})})},$.fn.resizeImage=function(a,b){return this.each(function(){var c=$(this)[0],d=c.width,e=c.height;a>=d&&b>=e||(a>=d&&e>b?(c.width=d*b/e,c.height=b):d>a&&b>=e?(c.width=a,c.height=e*a/d):(c.width=a,c.height=e*a/d,e*a/d>b&&(c.width=d*b/e,c.height=b)))})},$.fn.textareaAutoHeight=function(){var a=this,b=a.outerHeight();a.bind("keyup input propertychange focus",function(){0>b&&(b=a.outerHeight()),($.browser.mozilla||$.browser.safari)&&a.height(b);var c=a[0].scrollHeight,d=b>c?b:c,d=1.5*b>d?b:c;a.height(d)})},$.fn.insertAtCursor=function(a){var b=$(this)[0];if(document.selection)this.focus(),sel=document.selection.createRange(),sel.text=a,this.focus();else if(b.selectionStart||"0"==b.selectionStart){var c=b.selectionStart,d=b.selectionEnd,e=b.scrollTop;b.value=b.value.substring(0,c)+a+b.value.substring(d,b.value.length),this.focus(),b.selectionStart=c+a.length,b.selectionEnd=c+a.length,b.scrollTop=e}else this.value+=a,this.focus()}});
