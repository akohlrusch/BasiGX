/* Copyright (c) 2015-present terrestris GmbH & Co. KG
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * The `ZoomToExtent` Button
 *
 * Button used to zoom to an extent (currently defined by a `center` and either
 * a `zoom` or a `resolution`).
 *
 * TODO This class should probably also accept an extent to configure it, that
 *      most likely be what most users will expect.
 *
 * TODO This class will need some updates when we upgrade to OpenLayers >= 4.
 *
 * @class BasiGX.view.button.ZoomToExtent
 */
Ext.define('BasiGX.view.button.ZoomToExtent', {
    extend: 'BasiGX.view.button.Base',
    xtype: 'basigx-button-zoomtoextent',

    requires: [
        'BasiGX.util.Application',
        'BasiGX.util.Map',
        'Ext.app.ViewModel'
    ],

    /**
     *
     */
    viewModel: {
        data: {
            tooltip: 'Auf Gesamtansicht zoomen',
            text: null
        }
    },

    /**
     *
     */
    bind: {
        text: '{text}'
    },

    /**
     * The OpenLayers map this button is bound to. If not passed when
     * instantiating, a map will be guessed.
     */
    olMap: null,

    /**
     * The config option `center` is required on instantiation. Also required is
     * either `zoom` or `resolution`, when both are passed, `zoom` will win.
     *
     * TODO Why can't we pass an extent? This is quite unexpected
     */
    config: {
        center: null,
        zoom: null,
        resolution: null,
        rotation: null,
        handler: function() {
            var me = this;
            me.setConfigValues();

            var olMap = me.olMap;

            // fallback
            if (Ext.isEmpty(olMap)) {
                olMap = BasiGX.util.Map.getMapComponent().getMap();
            }

            var olView = olMap.getView();

            var targetCenter = me.getCenter();
            var targetResolution = me.getResolution();
            var targetRotation = me.getRotation();
            var targetZoom = me.getZoom();

            // Create the animation with their respective start values:
            var pan = ol.animation.pan({
                source: olView.getCenter()
            });
            var zoom = ol.animation.zoom({
                resolution: olView.getResolution()
            });
            var rotate = ol.animation.rotate({
                rotation: olView.getRotation()
            });
            // before we actually render, animate to the new values using the
            // methods defined above
            olMap.beforeRender(pan, zoom, rotate);

            // Next: trigger a view change by setting `center`, `rotation` and
            // either `zoom` (tried first) or `resolution`. The animation
            // methods will transition smoothly.
            olView.setCenter(targetCenter);
            olView.setRotation(targetRotation);
            if (targetZoom) {
                olView.setZoom(targetZoom);
            } else {
                olView.setResolution(targetResolution);
            }
        }
    },

    /**
     * The icons the button should use.
     * Classic Toolkit uses glyphs, modern toolkit uses html
     */
    glyph: 'xf0b2@FontAwesome',
    html: '<i class="fa fa-arrows-alt fa-2x"></i>',

    /**
     *
     */
    constructor: function() {
        var me = this;
        me.callParent(arguments);

        if (me.getZoom() !== null && me.getResolution() !== null) {
            Ext.raise(
                'Both zoom and resolution set for ZoomToExtent button. ' +
                'Please choose one.'
            );
        }

        me.setConfigValues();
    },

    /**
     * This method will be called on initialisation and whenever a click/tap
     * on the button happens. If we were not configured with explicit values
     * for `center`, `rotation` and either `zoom` or `resolution`, we will try
     * read out matching values from the application context.
     */
    setConfigValues: function() {
        var me = this;
        var appContext = BasiGX.util.Application.getAppContext();

        if (appContext) {
            if (!me.getCenter()) {
                me.setCenter(appContext.startCenter);
            }
            if (me.getRotation() === null) { // 0 is a valid rotation…
                me.setRotation(appContext.startRotation || 0);
            }
            if (!me.getZoom() && !me.getResolution()) {
                me.setZoom(appContext.startZoom);
            }
        }
    }
});
