/*
    Copyright (c) 2017-2019, Sergey Dmitrievsky, Joint Institute for Nuclear Research, Dubna, Russia

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

class Demobbed { // Demonstrative browser-based event display

  constructor() {

    this._version = "3.0";

    this._evSampleId = 0;     // 0 - nu_mu sample (817 events),
                              // 1 - nu_tau sample (10 events),
                              // 2 - nu_e sample (19 EU events),
                              // 3 - neutrino-induced charm sample (50 events)

    this._evListNuMu  = [];   // Array of OPERA nu_mu    event IDs available for open data access
    this._evListNuTau = [];   // Array of OPERA nu_tau   event IDs available for open data access
    this._evListNuE   = [];   // Array of OPERA nu_e     event IDs available for open data access
    this._evListCharm = [];   // Array of OPERA nu_charm event IDs available for open data access

    this._evIndex    = -1;    // Index of the loaded event in the array (from 0 to evList.length - 1)
    this._evIndexMax = -1;    // Max index of the loaded event in the array (=== evList.length - 1)
    this._event      = {};    // Loaded (displayed) event

    this._mgrGeomED  = {};    // Contains parameters of the OPERA ED geometry

    this._mgrDrawED  = {};    // Manager hired for drawing of Electronic detector (2D) events

    this._mgrDrawECC = {};    // Manager hired for drawing of (3D) tracks found in emulsion

  };

  version() { return this._version; };

  evList(evsample, evlist) {

    if (evsample === undefined) evsample = 0;
    else {

      if (!Utils.checkNumber(evsample)) {
        alert("Demobbed-def::evList()::Error: evsample is not a number!!!: evsample = " + evsample + "!!!");
        return;
      }

      if ( (evsample < 0) || (evsample > 3) ) {
        alert("Demobbed-def::evList()::Error: evsample is wrong: evsample = " + evsample + "!!!");
        return;
      }

    }

    if (evlist === undefined) {
      switch (evsample) {
        case 1:  return this._evListNuTau;
        case 2:  return this._evListNuE;
        case 3:  return this._evListCharm;
        default: return this._evListNuMu;
      }
    }

    if (!Array.isArray(evlist)) {
      alert("Demobbed-def::evList()::Error: evlist is not an Array!!!");
      return;
    }

    if (evlist.length > 1000) {
      alert("Demobbed-def::evList()::Error: evlist.length > 1000: " + evlist.length + "!!!");
      return;
    }

    switch (evsample) {
    case 1:
      this._evListNuTau = evlist;
      break;
    case 2:
      this._evListNuE = evlist;
      break;
    case 3:
      this._evListCharm = evlist;
      break;
    default: this._evListNuMu = evlist;
    }

    this._evIndex = 0;
    this._evIndexMax = evlist.length - 1;

  };

  evSampleId(evsampleid) {

    if (evsampleid === undefined) return this._evSampleId;

    if (!Utils.checkNumber(evsampleid)) {
      alert("Demobbed-def::evSampleId()::Error: evsampleid is not a number!!!: evsampleid = " + evsampleid + "!!!");
      return;
    }

    if ( (evsampleid < 0) || (evsampleid > 3) ) {
      alert("Demobbed-def::evSampleId()::Error: evsampleid is wrong: evsampleid = " + evsampleid + "!!!");
      return;
    }

    this._evSampleId = evsampleid;

  };

  evIndex(evindex) {

    if (evindex === undefined) return this._evIndex;

    if (!this.checkEvIndex(evindex)) return;

    this._evIndex = evindex;

  };

  evIndexMax(evindexmax) {

    if (evindexmax === undefined) return this._evIndexMax;

    if (!Utils.checkNumber(evindexmax)) {
      alert("Demobbed-def::evIndexMax()::Error: evindexmax is not a number!!!: evindexmax = " + evindexmax + "!!!");
      return;
    }

    if ( (evindexmax < 0) || (evindexmax > 817) ) {
      alert("Demobbed-def::evIndexMax()::Error: evindexmax is wrong: evindexmax = " + evindexmax + "!!!");
      return;
    }

    this._evIndexMax = evindexmax;

  };

  event(ev) {

    if (ev === undefined) return this._event;

    if (typeof(ev) !== "object") {
      alert("Demobbed-def::event()::Error: ev is not an object!!!: typeof(ev) = " + typeof(ev) + "!!!");
      return;
    }

    this._event = ev;

  };

  resetEvent() { this._event = new Event(); };

  loadPrevOrNextEvent(dIndex) {

    if (dIndex === undefined) dIndex = 1; // by default load next event in the event list
    else if (!Utils.checkNumber(dIndex)) {
      alert("Demobbed-def::loadPrevOrNextEvent()::Error: dIndex is not a number!!!: dIndex = " + dIndex + "!!!");
      return;
    }

    let newIndex = this._evIndex + dIndex;

    if (!this.checkEvIndex(newIndex, false)) return;

    this._evIndex = newIndex;

    let evID = this.evList(this.evSampleId())[newIndex];

    changeScrLoadEvent(evID); // External function defined in the loadEvent.js file

  };

  checkEvIndex(evindex, showAlerts) {

    if (showAlerts === undefined) showAlerts = true;

    if (!Utils.checkNumber(evindex)) {
      if (showAlerts) alert("Demobbed-def::checkEvIndex()::Error: evindex is not a number!!!: evindex = " + evindex + "!!!");
      return false;
    }

    if ( (evindex < 0) || (evindex > this._evIndexMax) ) {
      if (showAlerts)  alert("Demobbed-def::checkIndex()::Error: index is out of range: evindex = " + evindex + "!!!");
      return false;
    }

    return true;

  };

  mgrGeomED(mgrgeom) {

    if (mgrgeom === undefined) return this._mgrGeomED;

    if (typeof(mgrgeom) !== "object") {
      alert("Demobbed-def::mgrGeomED()::Error: mgrgeom is not an object: mgrgeom = " + mgrgeom + "!!!");
      return;
    }

    this._mgrGeomED = mgrgeom;

  };

  mgrDrawED(mgrdraw) {

    if (mgrdraw === undefined) return this._mgrDrawED;

    if (typeof(mgrdraw) !== "object") {
      alert("Demobbed-def::mgrDrawED()::Error: mgrdraw is not an object: mgrdraw = " + mgrdraw + "!!!");
      return;
    }

    this._mgrDrawED = mgrdraw;

  };

  mgrDrawECC(mgrdraw) {

    if (mgrdraw === undefined) return this._mgrDrawECC;

    if (typeof(mgrdraw) !== "object") {
      alert("Demobbed-def::mgrDrawECC()::Error: mgrdraw is not an object: mgrdraw = " + mgrdraw + "!!!");
      return;
    }

    this._mgrDrawECC = mgrdraw;

  };

};
