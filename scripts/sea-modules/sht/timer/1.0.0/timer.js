define("sht/timer/1.0.0/timer",["sht/klass/1.0.0/klass"],function(a,b,c){var d=a("sht/klass/1.0.0/klass"),e=d(null,{__construct:function(a,b){this.delay=a,this.fn=b,this.currentCount=0,this.running=!1,this._run()},_run:function(){var a=this;this.running=!0,this.time=setInterval(function(){a.currentCount++,a.fn(a.currentCount)},a.delay)},stop:function(){clearInterval(this.time),this.currentCount=0,this.running=!1},pause:function(){this.running&&clearInterval(this.time)},start:function(){this._run()},reset:function(){this.stop(),this.start()}});c.exports=e});