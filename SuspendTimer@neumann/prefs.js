/**
	AUTHOR: Daniel Neumann
**/

const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

const Gettext = imports.gettext.domain('SuspendTimer');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

let settings;

function init() {
    Convenience.initTranslations();
    settings = Convenience.getSettings();
}

const SuspendTimerPrefsWidget = new GObject.Class({
    Name: 'SuspendTimer.Prefs.Widget',
    GTypeName: 'SuspendTimerPrefsWidget',
    Extends: Gtk.Grid,

    _init: function(params) {
	    this.parent(params);
        this.margin = 12;
        this.row_spacing = this.column_spacing = 6;
        this.set_orientation(Gtk.Orientation.VERTICAL);

	    this.add(new Gtk.Label({ label: '<b>' + _("Maximum timer value (in minutes)") + '</b>',
                                 use_markup: true,
                                 halign: Gtk.Align.START }));

        let entry = new Gtk.SpinButton({halign:Gtk.Align.START});
        let maxTimerValueDefault = settings.get_int('max-timer-value');
        entry.set_increments(1, 1);
        entry.set_range(1, 500);
        entry.connect('value-changed', Lang.bind(this, function(button){
            let s = button.get_value_as_int();
            settings.set_int('max-timer-value', s);
        }));
        entry.set_value(maxTimerValueDefault);
        this.add(entry);

	    this.add(new Gtk.Label({ label: '', halign: Gtk.Align.START }));

	    this.add(new Gtk.Label({ label: '<b>' + _("Slider position (in % from 0 to 100)") + '</b>',
                         use_markup: true,
                         halign: Gtk.Align.START }));

        let sliderEntry = new Gtk.SpinButton({halign:Gtk.Align.START});
        let sliderDefault = settings.get_int('slider-value');
        sliderEntry.set_increments(1, 1);
        sliderEntry.set_range(0, 100);
        sliderEntry.connect('value-changed', Lang.bind(this, function(button){
            //this._onValueChanged(button); //TODO direkt angeben?
            let s = button.get_value_as_int();
            settings.set_int('slider-value', s);
        }));
        sliderEntry.set_value(sliderDefault);
        this.add(sliderEntry);

    }

});

function buildPrefsWidget() {
    let widget = new SuspendTimerPrefsWidget();
    widget.show_all();

    return widget;
}
