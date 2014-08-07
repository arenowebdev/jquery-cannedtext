/*
 * jQuery Plugin - Canned Text
 * Allows you to add custom tags to an input so you can quickly enter data.
 *
 * Version 0.0.2, July 25th, 2014
 *      by David Mosher
 *
 * Copyright (c) 2013-2014 David Mosher. All Rights Reserved.
 * Canned Text is open-source software licensed under the Create
 * Commons Attribution Non Commercial Share Alike 3.0 license
 * http://spdx.org/licenses/CC-BY-NC-SA-3.0
 */

 ;(function ( $ ) {

    var pluginName = "cannedtext",

    defaults = {
        tabstop_start: '{{',
        tabstop_end: '}}',
        phrases: []
    };

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

            if (typeof options.phrases === 'function') {
                options.phrases = options.phrases(this);
            }

            $('body').on('keydown keyup', $(el), function(e) {
                val = $(el).val();
                // on tab
                if (e.which == 9 || e.keyCode == 9) {
                    pattern = '/[-[\]{}()*+?.,\\^$|#\s]/g';
                    start = options.tabstop_start.replace(pattern, "\\$&");
                    end = options.tabstop_end.replace(pattern, "\\$&");
                    match = start + "[-\\S\\sD]*?" + end;
                    regex = new RegExp(match);
                    match = val.match(regex);
                    if (match) {
                        e.preventDefault();
                        $(el).selectRange(match.index, match.index + match[0].length);
                        // scroll textarea to location of highlighted text (if applicable)
                        var sh = $(el).prop('scrollHeight');
                        var line_ht = $(el).css('line-height').replace('px', '');
                        var n_lines = sh / line_ht;
                        var char_in_line = $(el).val().length / n_lines;
                        var height = Math.floor(match.index / char_in_line);
                        $(el).scrollTop(height * line_ht);
                    }
                // any other keypress
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

    // selectRange allows text to be selected by start and end positions
    $.fn.selectRange = function(start, end) {
        var e = document.getElementById($(this).attr('id'));
        if (!e) return;
        else if (e.setSelectionRange) { e.focus(); e.setSelectionRange(start, end); } /* WebKit */
        else if (e.createTextRange) { var range = e.createTextRange(); range.collapse(true); range.moveEnd('character', end); range.moveStart('character', start); range.select(); } /* IE */
        else if (e.selectionStart) { e.selectionStart = start; e.selectionEnd = end; }
    };

})( jQuery );
