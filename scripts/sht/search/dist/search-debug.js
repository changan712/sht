define("sht/search/1.0.0/search-debug", [ "arale/autocomplete/1.2.3/autocomplete-debug", "gallery/jsuri/1.2.2/jsuri-debug" ], function(require, exports, module) {
    var AutoComplete = require("arale/autocomplete/1.2.3/autocomplete-debug");
    var JsUri = require("gallery/jsuri/1.2.2/jsuri-debug");
    var Search = AutoComplete.extend({
        attrs: {
            searchInput: {
                value: null,
                readOnly: true
            },
            searchBtn: null,
            url: ""
        },
        setup: function(config) {
            this.input = $(this.get("searchInput"));
            if (!this.input.length) return;
            this.set("trigger", this.get("searchInput"));
            this.btn = $(this.get("searchBtn"));
            this.actionSearch();
            if ($.isArray(this.get("dataSource")) && this.get("dataSource").length == 0) return;
            Search.superclass.setup.call(this, config);
            this.render();
        },
        actionSearch: function() {
            this.input.on("keypress", $.proxy(this.sbmOnEnter, this));
            this.btn.on("click", $.proxy(this.sbmOnClick, this));
        },
        sbmOnEnter: function(e) {
            if (e.keyCode == 13) {
                var v = $.trim(this.input.val());
                if (v && v != $.trim(this.input.attr("placeholder"))) {
                    this.sbmt(v);
                }
            }
        },
        sbmOnClick: function() {
            var v = $.trim(this.input.val());
            if (v && v != this.input.attr("placeholder")) {
                this.sbmt(v);
            }
        },
        sbmt: function(value) {
            var jsUri = new JsUri(this.get("url"));
            // jsUri.addQueryParam('keyword', value);
            this.trigger("mysubmit");
            location.href = jsUri.toString() + "#keyword=" + encodeURI(value);
        }
    });
    module.exports = Search;
});
