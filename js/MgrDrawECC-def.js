class MgrDrawECC { // Manager intended for drawing of (3D) tracks found in emulsion

  constructor() {

    this._camera      = null;
    this._cameraInset = null;   // Inset objects are needed for axes

    this._scene      = null;
    this._sceneInset = null;

    this._renderer      = null;
    this._rendererInset = null;

    this._controls = null;

    this._zoom = 1;

    this._zoomCoeffY = 1; // Additional scale factor for Y axis (to make the events more beutiful, if possible).
                          // The code of drawing functions (e.g., for axes drawing) must be properly
                          // modified in case change of this coefficient is needed!!!

    this._zoomFactor = 1.25;

    this._zoomMin = 0.02;
    this._zoomMax = 4;

    //---

    this._vertexGeometryCloseView = {};
    this._vertexGeometryFarView = {};

    this._vertexMaterial = {};

    this._groupOfVertexPoints = {}; // three.js group of vertex points

    this._trackLinePars = [];       // Array of line parameters used for drawing of the ECC tracks

    this._trackTitles = [];         // Array of THREE.Mesh objects with titles of tracks

    this._groupOfTrackLines = {};   // three.js group of track lines

    this._groupOfAxes = {};         // three.js group of 3 arrows with titles: "X", "Y", and "Z"

    this._animationFrameID = 0;

    this._primVertDrawPos = new THREE.Vector3(0, 0, 0); // Position of the primary vertex.
                                                        // The code of drawing functions should be properly
                                                        // modified in case change of this position is needed!!!

    this._trackLegendContext = {}; // Context of a track legend canvas

    this._trackLegendWidth  = 0;
    this._trackLegendHeight = 0;

    this._trackLegendLineBeg = 0;
    this._trackLegendLineEnd = 0;

  };

  camera(cam) {

    if (cam === undefined) return this._camera;

    if (typeof(cam) !== "object") {
      alert("MgrDrawECC-def::camera()::Error: cam is not an object!!!: typeof(cam) = " + typeof(cam) + "!!!");
      return;
    }

    this._camera = cam;

  };

  cameraInset(cam) {

    if (cam === undefined) return this._cameraInset;

    if (typeof(cam) !== "object") {
      alert("MgrDrawECC-def::cameraInset()::Error: cam is not an object!!!: typeof(cam) = " + typeof(cam) + "!!!");
      return;
    }

    this._cameraInset = cam;

  };

  scene(sc) {

    if (sc === undefined) return this._scene;

    if (typeof(sc) !== "object") {
      alert("MgrDrawECC-def::scene()::Error: sc is not an object!!!: typeof(sc) = " + typeof(sc) + "!!!");
      return;
    }

    this._scene = sc;

  };

  sceneInset(sc) {

    if (sc === undefined) return this._sceneInset;

    if (typeof(sc) !== "object") {
      alert("MgrDrawECC-def::sceneInset()::Error: sc is not an object!!!: typeof(sc) = " + typeof(sc) + "!!!");
      return;
    }

    this._sceneInset = sc;

  };

  renderer(rend) {

    if (rend === undefined) return this._renderer;

    if (typeof(rend) !== "object") {
      alert("MgrDrawECC-def::renderer()::Error: rend is not an object!!!: typeof(rend) = " + typeof(rend) + "!!!");
      return;
    }

    this._renderer = rend;

  };

  rendererInset(rend) {

    if (rend === undefined) return this._rendererInset;

    if (typeof(rend) !== "object") {
      alert("MgrDrawECC-def::rendererInset()::Error: rend is not an object!!!: typeof(rend) = " + typeof(rend) + "!!!");
      return;
    }

    this._rendererInset = rend;

  };

  controls(cont) {

    if (cont === undefined) return this._controls;

    if (typeof(cont) !== "object") {
      alert("MgrDrawECC-def::controls()::Error: cont is not an object!!!: typeof(cont) = " + typeof(cont) + "!!!");
      return;
    }

    this._controls = cont;

  };

  zoom(zz) {

    if (zz === undefined) return this._zoom;

    if (!Utils.checkNumber(zz)) {
      alert("MgrDrawECC-def::zoom()::Error: zz is not a number!!!: zz = " + zz + "!!!");
      return;
    }

    if ( (zz < this._zoomMin) || (zz > this._zoomMax) ) {
      alert("MgrDrawECC-def::zoom()::Error: zz is strange!!!: zz = " + zz + "!!!");
      return;
    }

    this._zoom = zz;

  };

  zoomCoeffY(zcy) {

    if (zcy === undefined) return this._zoomCoeffY;

    if (!Utils.checkNumber(zcy)) {
      alert("MgrDrawECC-def::zoomCoeffY()::Error: zcy is not a number!!!: zcy = " + zcy + "!!!");
      return;
    }

    //if ( (zcy < this._zoomCoeffYMin) || (zcy > this._zoomCoeffYMax) ) {
      //alert("MgrDrawECC-def::zoomCoeffY()::Error: zcy is strange!!!: zcy = " + zcy + "!!!");
      //return;
    //}

    this._zoomCoeffY = zcy;

  };

  zoomFactor() { return this._zoomFactor; };

  zoomMin() { return this._zoomMin; };

  zoomMax() { return this._zoomMax; };

  vertexGeometryCloseView(vg) {

    if (vg === undefined) return this._vertexGeometryCloseView;

    if (typeof(vg) !== "object") {
      alert("MgrDrawECC-def::vertexGeometryCloseView()::Error: vg is not an object!!!: typeof(vg) = " + typeof(vg) + "!!!");
      return;
    }

    this._vertexGeometryCloseView = vg;

  };

  vertexGeometryFarView(vg) {

    if (vg === undefined) return this._vertexGeometryFarView;

    if (typeof(vg) !== "object") {
      alert("MgrDrawECC-def::vertexGeometryFarView()::Error: vg is not an object!!!: typeof(vg) = " + typeof(vg) + "!!!");
      return;
    }

    this._vertexGeometryFarView = vg;

  };

  vertexMaterial(vm) {

    if (vm === undefined) return this._vertexMaterial;

    if (typeof(vm) !== "object") {
      alert("MgrDrawECC-def::vertexMaterial()::Error: vm is not an object!!!: typeof(vm) = " + typeof(vm) + "!!!");
      return;
    }

    this._vertexMaterial = vm;

  };

  groupOfVertexPoints(group) {

    if (group === undefined) return this._groupOfVertexPoints;

    if (typeof(group) !== "object") {
      alert("MgrDrawECC-def::groupOfVertexPoints()::Error: group is not an object!!!: typeof(group) = " + typeof(group) + "!!!");
      return;
    }

    this._groupOfVertexPoints = group;

  };

  trackLinePars() { return this._trackLinePars; };

  trackTitles() { return this._trackTitles; };

  groupOfTrackLines(group) {

    if (group === undefined) return this._groupOfTrackLines;

    if (typeof(group) !== "object") {
      alert("MgrDrawECC-def::groupOfTrackLines()::Error: group is not an object!!!: typeof(group) = " + typeof(group) + "!!!");
      return;
    }

    this._groupOfTrackLines = group;

  };

  groupOfAxes(group) {

    if (group === undefined) return this._groupOfAxes;

    if (typeof(group) !== "object") {
      alert("MgrDrawECC-def::groupOfAxes()::Error: group is not an object!!!: typeof(group) = " + typeof(group) + "!!!");
      return;
    }

    this._groupOfAxes = group;

  };

  clearGroupOfVertexPoints() {

    if (!this._groupOfVertexPoints) return;

    let children = this._groupOfVertexPoints.children;

    for (let ic = children.length - 1; ic >= 0; ic--) {
      this._groupOfVertexPoints.remove(children[ic]);
    }

  };

  clearGroupOfTrackLines() {

    if (!this._groupOfTrackLines) return;

    let children = this._groupOfTrackLines.children;

    for (let ic = children.length - 1; ic >= 0; ic--) {
      this._groupOfTrackLines.remove(children[ic]);
    }

  };

  animationFrameID(jd) {

    if (jd === undefined) return this._animationFrameID;

    this._animationFrameID = jd;

  };

  primVertDrawPos() { return this._primVertDrawPos; };

  trackLegendContext(ctx) {

    if (ctx === undefined) return this._trackLegendContext;

    if (typeof(ctx) !== "object") {
      alert("MgrDrawECC-def::trackLegendContext()::Error: ctx is not an object!!!: typeof(ctx) = " + typeof(ctx) + "!!!");
      return;
    }

    this._trackLegendContext = ctx;

  };

  trackLegendWidth(legWidth) {

    if (legWidth === undefined) return this._trackLegendWidth;

    if (!Utils.checkNumber(legWidth)) {
      alert("MgrDrawECC-def::trackLegendWidth()::Error: legWidth is not a number: " + legWidth + "!!!");
      return;
    }

    this._trackLegendWidth = legWidth;

  };

  trackLegendHeight(legHeight) {

    if (legHeight === undefined) return this._trackLegendHeight;

    if (!Utils.checkNumber(legHeight)) {
      alert("MgrDrawECC-def::trackLegendHeight()::Error: legHeight is not a number: " + legHeight + "!!!");
      return;
    }

    this._trackLegendHeight = legHeight;

  };

  trackLegendLineBeg(lineBeg) {

    if (lineBeg === undefined) return this._trackLegendLineBeg;

    if (!Utils.checkNumber(lineBeg)) {
      alert("MgrDrawECC-def::trackLegendLineBeg()::Error: lineBeg is not a number: " + lineBeg + "!!!");
      return;
    }

    this._trackLegendLineBeg = lineBeg;

  };

  trackLegendLineEnd(lineEnd) {

    if (lineEnd === undefined) return this._trackLegendLineEnd;

    if (!Utils.checkNumber(lineEnd)) {
      alert("MgrDrawECC-def::trackLegendLineEnd()::Error: lineEnd is not a number: " + lineEnd + "!!!");
      return;
    }

    this._trackLegendLineEnd = lineEnd;

  };

};
