define(function(require, exports, module) {
	var Class = require('arale/class/1.1.0/class');

	var FixEle = Class.create({
		initialize: function(name) {
            this.nameID    = name.nameID; 
            this.latitude  = name.latitude;
            this.longitude = name.longitude;
            this.infoTitle = name.infoTitle;
            this.infoDesc  = name.infoDesc;
            this.clickClass= name.clickClass;   

            $('.container').after('<div id="map-container-wrap" style=" height:100%;"><div id="map-container" style=" height:100%;"></div></div>');
        }
        
	});


});