define("sht/ui/1.0.0/ui",["sht/timer/1.0.0/timer","arale/popup/1.1.6/popup","$","arale/overlay/1.1.4/overlay","arale/position/1.0.1/position","arale/iframe-shim/1.0.2/iframe-shim","arale/widget/1.1.1/widget","arale/base/1.1.1/base","arale/class/1.1.0/class","arale/events/1.1.0/events"],function(a,b,c){var d=a("sht/timer/1.0.0/timer"),e=a("arale/popup/1.1.6/popup"),f={countDown:function(a,b,c){var e=b/1e3,f=$(a).eq(0);if(!f.size())return!1;var g=new d(1e3,function(){e?(e--,f.text(e)):c&&(g.stop(),c())});return g},myPopUp:function(a,b,c){if(!$(a).size()||!$(b).size())return!1;if($(a).data("popUpRended"))return!1;$(a).data("popUpRended",!0).addClass("haspopup");var d,f,g=$.extend({trigger:a,element:b},c),h=new e(g);return d=h.activeTrigger,f=d.find("i").filter(function(){return/ui-arrow/.test(this.className)}),h.after("show",function(){d.addClass("active"),f.addClass("reverse")}),h.after("hide",function(){d.removeClass("active"),f.removeClass("reverse")}),h},setDefaultImg:function(a){var b=a?$(a).find("img"):$("img");b.each(function(){this.onerror=function(){this.setAttribute("src","http://s.shtimage.com/images/common/d1.jpg")},this.src=this.src})}};c.exports=f});