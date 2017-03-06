// jQuery plugin boilerplate used: jquery.basic.plugin-boilerplate.js
// @see https://github.com/jquery-boilerplate/jquery-patterns
;( function( $, window, document, undefined ) {

    'use strict';

    // Create the defaults once
    var pluginName = 'velumMinionPoller',
        defaults = {
            timeoutInterval: 5000,
            nodesUrl: '/nodes'
        };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend( Plugin.prototype, {
        init: function() {
            this.pollingInterval = null;
            this.pollNodes();
        },

        pollNodes: function () {

            var self = this;

            self.pollingInterval = setInterval(
                function () {
                    var jqxhr = $.ajax({
                        url: self.settings.nodesUrl,
                        cache: false,
                        context: self,
                        dataType: 'json'
                    }).then(
                        //On success
                        self.processNodes,
                        // On failure
                        self.handleError
                    );
                },
                self.settings.timeoutInterval
            );
        },

        stopPolling: function () {
            clearInterval(this.pollingInterval);
        },

        processNodes: function (nodesResponse) {
            var self = this;
            $.each(nodesResponse, function (index, value) {
                 self.renderNode(value);
            });
        },

        renderNode: function (node) {

            if ( $(this.element).has('#node-' + node.id).length ) {

                return;

            } else {
                var nodeRow = [
                    '<div id="node-' + node.id + '">',
                        '<a href="/nodes/' + node.id + '">' + node.hostname + '</a>',
                        '<dl>',
                            '<dt>Created at</dt>',
                            '<dd>' + node.created_at + '</dd>',
                            '<dt>Updated at</dt>',
                            '<dd>' + node.updated_at + '</dd>',
                        '</dl>',
                    '</div>'
                ].join('');

                $( this.element ).append( nodeRow );
            }
        },

        handleError: function () {
            // To be defined
        }
    } );

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, 'plugin_' + pluginName ) ) {
                $.data( this, 'plugin_' +
                    pluginName, new Plugin( this, options ) );
            }
        } );
    };

} )( jQuery, window, document );
