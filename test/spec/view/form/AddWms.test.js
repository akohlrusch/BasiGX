Ext.Loader.syncRequire([
    'BasiGX.view.form.AddWms',
    'Ext.app.ViewModel',
    'Ext.button.Button',
    'Ext.form.CheckboxGroup',
    'Ext.form.FieldContainer',
    'Ext.form.FieldSet',
    'Ext.form.field.Text',
    'Ext.form.field.Hidden',
    'Ext.form.field.Checkbox',
    'Ext.form.field.Radio',
    'Ext.form.field.ComboBox',
    'Ext.layout.container.Anchor',
    'Ext.layout.container.HBox',
    'Ext.toolbar.Toolbar',

    'BasiGX.util.Map',
    'BasiGX.util.MsgBox'
]);

describe('BasiGX.view.form.AddWms', function() {
    describe('Basics', function() {
        var panel;
        beforeEach(function() {
            panel = Ext.create('Ext.form.Panel');
        });
        afterEach(function() {
            panel.destroy();
        });
        it('is defined', function() {
            expect(BasiGX.view.form.AddWms).to.not.be(undefined);
        });
        it('is textfield defined - function is empty', function() {
            // expect(BasiGX.view.form.AddWms.items[]).to.not.be(undefined);
        });
    });
});

/*
describe('GeoExt.component.FeatureRenderer', function() {

    describe('#constructor', function() {
        var renderer;
        beforeEach(function() {
            renderer = Ext.create('GeoExt.component.FeatureRenderer');
        });
        afterEach(function() {
            renderer.destroy();
        });
        it('should be a component', function() {
            expect(renderer).to.be.a(Ext.Component);
        });
        it('should have a feature set', function() {
            expect(renderer.getFeature()).not.to.be(undefined);
            expect(renderer.getFeature().getGeometry()).to.be.a(
                ol.geom.Polygon
            );
        });
    });

*/
