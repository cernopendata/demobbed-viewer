class Event { // OPERA event object will contain experimental data to be displayed in the main window

  static checkId(jd) {

    if (!Utils.checkNumber(jd)) {
      alert("Event-def::checkId()::Error: Event id is not a number: " + jd + "!!!");
      return false;
    }

    if ( (jd < 23300000) || (jd > 12400000000) ) {
      alert("Event-def::checkId()::Error: Event id is wrong: " + jd + "!!!");
      return false;
    }

    return true;

  };

  static checkTimeStamp(ts) {

    if (!Utils.checkNumber(ts)) {
      alert("Event-def::checkTimeStamp()::Error: ts is not a number: " + ts + "!!!");
      return false;
    }

    if ( (ts < 1188626400000) || (ts > 1356912000000) ) { // from 01 Sep 2007 till 31 Dec 2012
      alert("Event-def::checkTimeStamp()::Error: ts is wrong: " + ts + "!!!");
      return false;
    }

    return true;

  };

  static checkHitsArray(hits) {

    if (!Array.isArray(hits)) {
      alert("Event-def::checkHitsArray()::Error: hits is not an Array!!!");
      return false;
    }

    if (hits.length != 2) {
      alert("Event-def::checkHitsArray()::Error: Length of array of hits is != 2:" + hits.length + "!!!");
      return false;
    }

    if ( !Array.isArray(hits[0]) || !Array.isArray(hits[1]) ) {
      alert("Event-def::checkHitsArray()::Error: hits[0] or hits[1] is not an Array!!!");
      return false;
    }

    return true;

  };

  constructor() {

    this._id = 0;             // OPERA event id (11-digit integer number)

    this._date = {};          // Date object made of the OPERA event header time (millisecons since 01.01.1970)

    this._hitsTT  = [[], []]; // Array of 2 arrays (for XZ & YZ views) of the Target Tracker (TT) hits
    this._hitsRPC = [[], []]; // Array of 2 arrays (for XZ & YZ views) of the RPC hits
    this._hitsDT  = [[], []]; // Array of 2 arrays (the array for YZ view is empty!) of the drift tube (DT) hits

    this._verticesECC = [];   // Array of vertices. [0] - the primary neutrino interaction vertex!

    this._tracksECC = [];

    this._tracksECCforED = []; // several ECC tracks to be drawn schematically in the ED display (for the tau sample!)
    // WARNING! Coordinates of pos1 and pos2 for these tracks are in CENTIMETERS, but not in MICROMETERS!!!

  };

  id(jd) {

    if (jd === undefined) return this._id;

    if (!Event.checkId(jd)) return;

    this._id = jd;
  };

  date(ts) {

    if (ts === undefined) return this._date;

    if (!Event.checkTimeStamp(ts)) return;

    this._date = new Date(ts);

  };

  hitsTT(tthits) {

    if (tthits === undefined) return this._hitsTT;

    if (!checkHitsArray(tthits)) return;

    this._hitsTT = tthits;

  };

  hitsRPC(rpchits) {

    if (rpchits === undefined) return this._hitsRPC;

    if (!checkHitsArray(rpchits)) return;

    this._hitsRPC = rpchits;

  };

  hitsDT(dthits) {

    if (dthits === undefined) return this._hitsDT;

    if (!Event.checkHitsArray(dthits)) return;

    this._hitsDT = dthits;

  };

  verticesECC(vertices) {

    if (vertices === undefined) return this._verticesECC;

    if (!Array.isArray(vertices)) {
      alert("Event-def::verticesECC()::Error: vertices is not an Array!!!");
      return;
    }

    this._verticesECC = vertices;

  };

  tracksECC(tracks) {

    if (tracks === undefined) return this._tracksECC;

    if (!Array.isArray(tracks)) {
      alert("Event-def::tracksECC()::Error: tracks is not an Array!!!");
      return;
    }

    this._tracksECC = tracks;

  };

  tracksECCforED(tracks) {

    if (tracks === undefined) return this._tracksECCforED;

    if (!Array.isArray(tracks)) {
      alert("Event-def::tracksECCforED()::Error: tracks is not an Array!!!");
      return;
    }

    this._tracksECCforED = tracks;

  };

};
