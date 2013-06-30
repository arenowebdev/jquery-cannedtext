/*
 * jQuery Plugin jQuery Form Letter Input
 * Allows you to add custom tags to a text area to quickly enter form letter data.
 * version 0.0.1, June 28th, 2013
 * by David Mosher
 * 
 * Copyright (c) 2013 David Mosher (http://dmwc.biz)
 * Licensed jointly under the GPL and MIT licenses,
 * choose which one suits your project best!
 *
*/

;(function ( $ ) {

    var pluginName = "formletter",
        defaults = {};

    // The actual plugin constructor
    function Formletter( el, options ) {
        this.el = el;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Formletter.prototype = {

        init: function() {
            options = this.options;
            el = this.el;
            $('body').on('keydown', $(el), function(e) {
            	val = $(el).val();
				if (e.which == 9 || e.keyCode == 9) {
					index = val.match(/{{[-\S\sD]*?}}/);
					if (index) {
						e.preventDefault();
						$(el).selectRange(index.index, index.index + index[0].length);
					}
				} else {
					$.each(options.phrases, function(i, v) {
						if (val.indexOf(v.key) != -1) {
							val = val.replace(v.key, v.txt);
							$(el).val(val);
							var e = $.Event("keydown");
	                		e.keyCode = 9;
							e.which = 9;
							setTimeout(function() {
	                			$(el).trigger(e);
							}, 10);
						}
					});
				}
            });
        },
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Formletter( this, options ));
            }
        });
    };

})( jQuery );