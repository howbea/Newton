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
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Main = Me.imports.main;

class Extension {
    constructor() {
    }
    
    enable() {
    this._sysSettings = new Gio.Settings({ schema_id: 'org.gnome.desktop.interface', });
        
    Main._sessionUpdated();
    
    this._cssig = this._sysSettings.connect('changed::color-scheme', () => {
        Main._sessionUpdated();
        });
    
    }

    disable() {
    Main._sysSettings.disconnect(this._cssig);
    
    }
}

function init() {
    return new Extension();
}
