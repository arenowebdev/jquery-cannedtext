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
        defaults = {
            //propertyName: "value"
        };

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
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
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

        //yourOtherFunction: function(el, options) {
            // some logic
        //}
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Formletter( this, options ));
            }
        });
    };

})( jQuery );

/*
;(function($) {

    $.formletter = function(el, options) {

        var defaults = {

            //propertyName: 'value',

            // if your plugin is event-driven, you may provide callback capabilities 
            // for its events. call these functions before or after events of your 
            // plugin, so that users may "hook" custom functions to those particular 
            // events without altering the plugin's code
            //onSomeEvent: function() {}

        }

        var plugin = this;

        plugin.settings = {}

        var init = function() {

            plugin.settings = $.extend({}, defaults, options);

            plugin.el = el;

            // code goes here
            $('body').on('keydown', el, function(e) {
            	val = $(this).val();
				if (e.which == 9 || e.keyCode == 9) {
					index = val.match(/{{[-\S\s]*?}}/);
					if (index) {
						e.preventDefault();
						el.selectRange(index.index, index.index + index[0].length);
					}
				} else {
					$.each(plugin.settings.phrases, function(i, v) {
						if (val.indexOf(v.key) != -1) {
							val = val.replace(v.key, v.txt);
							el.val(val);
							var e = $.Event("keydown");
	                		e.keyCode = 9;
							e.which = 9;
							setTimeout(function() {
	                			el.trigger(e);
							}, 10);
						}
					});
				}
            });
        }

        // public methods
        // these methods can be called like:
        // plugin.methodName(arg1, arg2, ... argn) from inside the plugin or
        // myplugin.publicMethod(arg1, arg2, ... argn) from outside the plugin
        // where "myplugin" is an instance of the plugin

        // a public method. for demonstration purposes only - remove it!
        //plugin.foo_public_method = function() {

            // code goes here

        //}

        // private methods
        // these methods can be called only from inside the plugin like:
        // methodName(arg1, arg2, ... argn)

        // a private method. for demonstration purposes only - remove it!
        //var foo_private_method = function() {

            // code goes here

        //}

        // call the "constructor" method
        init();

    }

})(jQuery);
*/