/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */
const { Clutter, Gio, GLib, GObject, Meta, Shell, St } = imports.gi;

this._sysiSettings = new Gio.Settings({ schema_id: 'org.gnome.desktop.interface', });

function _setScheme() {
        if(this._sysiSettings.get_string('color-scheme') === 'default')
        this._sysiSettings.set_string('color-scheme', 'prefer-light');
}
    
function _signalsetScheme() { 
        this._cssig = this._sysiSettings.connect('changed::color-scheme', () => {
        this._setScheme();
        });
}

function _quitupdateScheme() {
    this._sysiSettings.disconnect(this._cssig);
    if(this._sysiSettings.get_string('color-scheme') === 'prefer-light')
        this._sysiSettings.set_string('color-scheme', 'default');
    
    }
    
class Extension {
    constructor() {
    }
       
    enable() {
    _setScheme();
    _signalsetScheme();    
    }

    disable() {
    _quitupdateScheme();
    }
}

function init() {
    return new Extension();
}
