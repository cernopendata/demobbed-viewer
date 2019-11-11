class TrackECC {

  static checkID(jd) {

    if (!Utils.checkNumber(jd)) {
      alert("TrackECC-def::checkID()::Error: jd is not a number: jd = " + jd + "!!!");
      return false;
    }

    if ( (jd < 0) || (jd > 1500) ) {
      alert("TrackECC-def::checkID()::Error: jd is strange: jd = " + jd + "!!!");
      return false;
    }

    return true;

  };

  static checkPartID(jd) {

    if (!Utils.checkNumber(jd)) {
      alert("TrackECC-def::checkPartID()::Error: jd is not a number: jd = " + jd + "!!!");
      return false;
    }

    if ( (jd < 1) || (jd > 20) ) {
      alert("TrackECC-def::checkPartID()::Error: jd is strange: jd = " + jd + "!!!");
      return false;
    }

    return true;

  };

  static checkSlope(slope, ip) {

    if (ip === undefined) ip = 2;
    else if (!Utils.checkIP(ip)) {
      alert("TrackECC-def::checkSlope()::Error: ip is wrong: ip = " + ip + "!!!");
      return false;
    }

    if (!Utils.checkNumber(slope)) {
      alert("TrackECC-def::checkSlope()::Error: slope[" + ip + "] is not a number: " + slope + "!!!");
      return false;
    }

    if (slope > 900000.) return true; //!!!

    if ( (slope < -0.92) || (slope > 0.92) ) {
      alert("TrackECC-def::checkSlope()::Error: slope[" + ip + "] is strange: " + slope + "!!!");
      return false;
    }

    return true;

  };

  constructor(id, partId, pos1, slopes, pos2) {

    if (!TrackECC.checkID(id)) return;
    if (!TrackECC.checkPartID(partId)) return;

    for (let ip = 0; ip < 3; ip++) {

      if (!Utils.checkPos(pos1[ip], ip)) {
        alert("TrackECC-def::constructor()::Error: pos1[" + ip + "] is not correct!");
        return;
      }

      if (ip == 2) {

        if ( (slopes[0] > 900000.) || (slopes[1] > 900000.) ) {
          if (!Utils.checkPos(pos2[ip], ip)) {
            alert("TrackECC-def::constructor()::Error: pos2[" + ip + "] is not correct!");
            return;
          }
        }

        break; //!!!

      }

      if (!TrackECC.checkSlope(slopes[ip], ip)) return;

      if (slopes[ip] > 900000.) {
        if (!Utils.checkPos(pos2[ip], ip)) {
          alert("TrackECC-def::constructor()::Error: pos2[" + ip + "] is not correct!");
          return;
        }
      }
    }

    this._id = id;           // track Id. E.M. shower tracks (e+/e-) in nu_e sample have id >= 1000.

    this._partId = partId;   // particle Id

    this._pos1 = pos1;       // [posX, posY, posZ] Position of the first track point
                             // in the OPERA brick system of reference (in micrometers)

    this._pos2 = pos2;       // [posX, posY, posZ] Position of the second track point
                             // in the OPERA brick system of reference (in micrometers)
                             // This point is used only if slopes[0]==slopes[1]==1000000

    // Equations of a track:
    // X = Z*Axy[0] + Bxy[0], Y = Z*Axy[1] + Bxy[1]

    this._Axy = slopes; // [slopeXZ, slopeYZ] --- tangents of the track angles

  };

  id() { return this._id; };

  partId() { return this._partId; };

  pos1(ps) {

    if (ps === undefined) return this._pos1;

    if (!Array.isArray(ps)) {
      alert("TrackECC-def::pos1()::Error: ps is not an Array!!!");
      return;
    }

    if (ps.length != 3) {
      alert("TrackECC-def::pos1()::Error: Length of array of ps is != 3:" + ps.length + "!!!");
      return false;
    }

    this._pos1 = ps;

  };

  pos2(ps) {

    if (ps === undefined) return this._pos2;

    if (!Array.isArray(ps)) {
      alert("TrackECC-def::pos2()::Error: ps is not an Array!!!");
      return;
    }

    if (ps.length != 3) {
      alert("TrackECC-def::pos2()::Error: Length of array of ps is != 3:" + ps.length + "!!!");
      return false;
    }

    this._pos2 = ps;

  };

  Axy(ip) {

    if (ip === undefined) return this._Axy;

    if (!Utils.checkIP(ip)) {
      alert("TrackECC-def::Axy()::Error: ip is wrong: ip = " + ip + "!!!");
      return;
    }

    return this._Axy[ip];

  };

  static colors(partId) {

    switch (partId) {

      // for the nu_mu (multiplicity) sample:

      case  1: return "dodgerblue";  // for tracks of muons
      case  2: return "#FF1111";     // for tracks of hadrons
      case  3: return "yellow";      // for tracks of e+/e-
      case  4: return "white";       // for highly ionizing tracks
      case  5: return "white";       // for back highly ionizing tracks
      case  6: return "springgreen"; // for ionizing tracks
      case  7: return "springgreen"; // for back ionizing tracks

      // for the nu_tau and the charm samples:

      case  8: return "#FF1111";    // for tracks of tau leptons or charm particles

      // for the nu_tau, nu_e, and charm samples:

      case  9: return "aqua";         // for tracks of hadrons
      case 10: return "limegreen";    // for tracks of hadrons
      case 11: return "dodgerblue";   // for tracks of hadrons
      case 12: return "magenta";      // for tracks of hadrons
      case 13: return "lawngreen";    // for tracks of hadrons
      case 14: return "white";        // for tracks of hadrons
      case 15: return "gray";         // for tracks of hadrons

      case 16: return "orange";       // for tracks of hadrons or e+/e-
      case 17: return "yellow";       // for tracks of hadrons or e+/e-
      case 18: return "deeppink";     // for tracks e+/e-
      case 19: return "antiquewhite"; // for tracks e+/e-
      case 20: return "#FF1111";      // for tracks of hadrons

      //---

      default: return "black";      // for other tracks (not used!)
    }

  };

};
//------------------------------------------------------------------------------
