/*
 * jQuery Plugin - Canned Text Input
 * Allows you to add custom tags to an input so you can quickly enter data.
 * Version 0.0.1, June 28th, 2013
 *      by David Mosher
 * 
 * Copyright (c) 2013 David Mosher (http://dmwc.biz)
 * Canned Text is open-source software licensed under the
 * Create Commons Attribution Non Commercial Share Alike 3.0 license
 * http://spdx.org/licenses/CC-BY-NC-SA-3.0
 *
 */

 ;(function ( $ ) {

    var pluginName = "cannedtext",
    defaults = {};

    // The actual plugin constructor
    function Cannedtext( el, options ) {
        this.el = el;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Cannedtext.prototype = {

        init: function() {
            options = this.options;
            el = this.el;
            $('body').on('keyup keydown', $(el), function(e) {
            	val = $(el).val();
                if (e.which == 9 || e.keyCode == 9) {
                   index = val.match(/{{[-\S\sD]*?}}/);
                   if (index) {
                      e.preventDefault();
                      $(el).selectRange(index.index, index.index + index[0].length);
                        // scroll textarea to location of highlighted text (if applicable)
                        var sh = $(el).prop('scrollHeight');
                        var line_ht = $(el).css('line-height').replace('px', '');
                        var n_lines = sh / line_ht;
                        var char_in_line = $(el).val().length / n_lines;
                        var height = Math.floor(index.index / char_in_line);
                        $(el).scrollTop(height * line_ht);
                    }
                } else {
                   $.each(options.phrases, function(i, v) {
                      if (val.indexOf(v.key) != -1) {
                         val = val.replace(v.key, v.txt);
                         $(el).val(val);
                         var e = $.Event("keyup");
                         e.keyCode = 9;
                         e.which = 9;
                         setTimeout(function() {
                            $(el).trigger(e);
                        }, 1);
                     }
                 });
               }
           });
       },
   };

   $.fn[pluginName] = function ( options ) {
    return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data(this, "plugin_" + pluginName, new Cannedtext( this, options ));
        }
    });
};

})( jQuery );
