//dmECC == demobbed.mgrDrawECC() !!!
//gmED  == demobbed.mgrGeomED()  !!!
//---------------------------------------

dmECC.initGraphics = function() {

  dmECC.initCameras();

  dmECC.scene(new THREE.Scene());
  dmECC.sceneInset(new THREE.Scene());

  dmECC.initRenderers();

  //dmECC.initControls();

  dmECC.groupOfVertices(new THREE.Group());

  dmECC.groupOfTracks(new THREE.Group());

  dmECC.groupOfAxes( new THREE.Group() );

  dmECC.initVertexProperties();

  dmECC.initTrackLineProperties();

  dmECC.initTitlesOfTracksAndAxes();

  dmECC.initTrackLegend();

};
//------------------------------------------------------------------------------

dmECC.initCameras = function() {

  const primVertDrawPos = dmECC.primVertDrawPos();

  //dmECC.camera( new THREE.PerspectiveCamera(70, canvWidth/canvHeight, 0.1, 20000) );

  dmECC.camera( new THREE.OrthographicCamera(primVertDrawPos.z - 1800,
                                             primVertDrawPos.z + 4200,
                                             primVertDrawPos.y + 1854,
                                             primVertDrawPos.y - 1854,
                                             primVertDrawPos.x - 50000,
                                             primVertDrawPos.x + 150000) );

  dmECC.cameraInset( new THREE.OrthographicCamera(primVertDrawPos.z - 1200,
                                                  primVertDrawPos.z + 1800,
                                                  primVertDrawPos.y + 1554,
                                                  primVertDrawPos.y - 300,
                                                  primVertDrawPos.x - 20000,
                                                  primVertDrawPos.x + 100000) );

};
//------------------------------------------------------------------------------

dmECC.initRenderers = function() {

  const canvWidth  = dmED.canvMainWidth();
  const canvHeight = 0.618*canvWidth; //!!!

  const canvasECC = document.getElementById("canvas-ECC");
  const canvasAxesECC = document.getElementById("canvas-axes-ECC");

  dmECC.renderer( new THREE.WebGLRenderer( { canvas: canvasECC,
                                             antialias: true,
                                             alpha: true } ) );

  dmECC.rendererInset( new THREE.WebGLRenderer( { canvas: canvasAxesECC,
                                                  antialias: true,
                                                  alpha: true } ) );

  dmECC.renderer().setPixelRatio(window.devicePixelRatio);
  dmECC.rendererInset().setPixelRatio(window.devicePixelRatio);

  dmECC.renderer().setSize(canvWidth, canvHeight);
  dmECC.rendererInset().setSize(canvWidth/2, canvHeight/2);

  dmECC.renderer().setClearColor(0x000000, 1);
  dmECC.rendererInset().setClearColor(0x000000, 0);

  dmECC.renderer().gammaInput  = true;
  dmECC.renderer().gammaOutput = true;

  dmECC.rendererInset().gammaInput  = true;
  dmECC.rendererInset().gammaOutput = true;

};
//------------------------------------------------------------------------------

//dmECC.initControls = function() {

//  dmECC.controls( new THREE.TrackballControls(dmECC.camera(), dmECC.renderer().domElement) );

//  dmECC.controls().rotateSpeed = 5.0;
//  dmECC.controls().zoomSpeed = 0.5;

//  //dmECC.controls().addEventListener('change', dmECC.render);
//};
//------------------------------------------------------------------------------

dmECC.initVertexProperties = function() {

  dmECC.vertexGeometryCloseView( new THREE.SphereGeometry(20, 32, 32) );
  dmECC.vertexGeometryFarView( new THREE.SphereGeometry(60, 32, 32) );

  dmECC.vertexMaterial( new THREE.MeshBasicMaterial({ color: Vertex.color() }) );

};
//------------------------------------------------------------------------------

dmECC.initTitlesOfTracksAndAxes = function() {

  dmECC.axisXtitleMaterial( new THREE.MeshBasicMaterial({ color: dmECC.colorAxisX() }) );
  dmECC.axisYtitleMaterial( new THREE.MeshBasicMaterial({ color: dmECC.colorAxisY() }) );
  dmECC.axisZtitleMaterial( new THREE.MeshBasicMaterial({ color: dmECC.colorAxisZ() }) );

  dmECC.trMuTitleMaterial( new THREE.MeshBasicMaterial({ color: TrackECC.colors(1) }) );
  dmECC.trElTitleMaterial( new THREE.MeshBasicMaterial({ color: TrackECC.colors(3) }) );

  for (let itr = 0; itr < 18; itr++)
    dmECC.trackTitles()[itr] = null; //!!!

  for (let iax = 0; iax < 4; iax++)
    dmECC.axesTitles()[iax] = null; //!!!

  dmECC.titleFontLoader( new THREE.FontLoader() );

};
//------------------------------------------------------------------------------

dmECC.initTrackLineProperties = function() {

  dmECC.trackLinePars()[1] = { // for a muon track

    color:  TrackECC.colors(1),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[2] = { // for an hadron track

    color:  TrackECC.colors(2),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[3] = { // for an electron track

    color:  TrackECC.colors(3),
    length: 3*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[4] = { // for a black track

    color:  TrackECC.colors(4),
    length: 1*DetCfg.plateToPlateDistECC(),
    width:  17

  };

  dmECC.trackLinePars()[5] = { // for a back black track

    color:  TrackECC.colors(5),
    length: 1*DetCfg.plateToPlateDistECC(),
    width:  17

  };

  dmECC.trackLinePars()[6] = { // for a gray track

    color:  TrackECC.colors(6),
    length: 1.5*DetCfg.plateToPlateDistECC(),
    width:  17

  };

  dmECC.trackLinePars()[7] = { // for a back gray track

    color:  TrackECC.colors(7),
    length: 1.5*DetCfg.plateToPlateDistECC(),
    width:  17

  };

  dmECC.trackLinePars()[8] = { // for a tau-lepton track

    color:  TrackECC.colors(8),
    length: 0.7*DetCfg.plateToPlateDistECC(),
    width:  17

  };

  dmECC.trackLinePars()[9] = { // for an hadron track in tau-candidate events

    color:  TrackECC.colors(9),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[10] = { // for an hadron track in tau-candidate events

    color:  TrackECC.colors(10),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[11] = { // for an hadron track in tau-candidate events

    color:  TrackECC.colors(11),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[12] = { // for an hadron track in tau-candidate events

    color:  TrackECC.colors(12),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[13] = { // for an hadron track in tau-candidate events

    color:  TrackECC.colors(13),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[14] = { // for an hadron track in tau-candidate events

    color:  TrackECC.colors(14),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[15] = { // for an hadron track in tau-candidate events

    color:  TrackECC.colors(15),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[16] = { // for e+/e- tracks in tau-candidate events

    color:  TrackECC.colors(16),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[17] = { // for e+/e- tracks in tau-candidate events

    color:  TrackECC.colors(17),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

};
//------------------------------------------------------------------------------

dmECC.prepareAndDrawEvent = function(resetCameraPos) {

  if (resetCameraPos === undefined) resetCameraPos = 1; //!!!

  dmECC.prepareTitlesOfTracksAndAxes();

  setTimeout( function() {
                           dmECC.drawEvent(resetCameraPos);
                         }, 1000 / 10 );

};
//------------------------------------------------------------------------------

dmECC.drawEvent = function(resetCameraPos) {

  dmECC.drawVertices();

  dmECC.drawTracks();

  dmECC.drawAxes();

  dmECC.drawTrackLegend();

  const primVertDrawPos = dmECC.primVertDrawPos();

  //console.log("000: primVertDrawPos.x = " + primVertDrawPos.x);

  if (resetCameraPos) {

    dmECC.camera().position.set(primVertDrawPos.x - 2000,
                                primVertDrawPos.y + 200,
                                primVertDrawPos.z + 200);

    dmECC.camera().lookAt(primVertDrawPos);

  }

  dmECC.cameraInset().position.set(primVertDrawPos.x - 2000,
                                   primVertDrawPos.y + 200,
                                   primVertDrawPos.z + 200);

  dmECC.cameraInset().lookAt(primVertDrawPos);

  //let cameraDirection = dmECC.camera().getWorldDirection();

  //console.log("111: cameraDirection.x = " + cameraDirection.x);
  //console.log("222: dmECC.camera().position.x = " + dmECC.camera().position.x);

  //dmECC.controls().update();

  dmECC.render();

};
//------------------------------------------------------------------------------

dmECC.render = function() {

  dmECC.renderer().render(dmECC.scene(), dmECC.camera());
  dmECC.rendererInset().render(dmECC.sceneInset(), dmECC.cameraInset());

};
//------------------------------------------------------------------------------

dmECC.accelerateAnimation = function() {

  dmECC.animationFrameID(requestAnimationFrame(dmECC.accelerateAnimation));

  dmECC.groupOfVertices().rotation.y += 0.004;
  dmECC.groupOfTracks().rotation.y   += 0.004;
  dmECC.groupOfAxes().rotation.y     += 0.004;

  dmECC.render();

};
//------------------------------------------------------------------------------

dmECC.decelerateAnimation = function() {

  cancelAnimationFrame(dmECC.animationFrameID());

};
//------------------------------------------------------------------------------

dmECC.zoomInOut = function(makeZoomIn) {

  let zoomTest = 1;

  if (makeZoomIn > 0) zoomTest = Math.round(1000*dmECC.camera().zoom*dmECC.zoomFactor())/1000;
  else zoomTest = Math.round(1000*dmECC.camera().zoom/dmECC.zoomFactor())/1000;

  if ( (zoomTest < dmECC.zoomMin()) || (zoomTest > dmECC.zoomMax()) ) return; //!!!

  if ( Math.abs(zoomTest - 1) < 0.1 ) zoomTest = 1;

  dmECC.zoom(zoomTest);
  dmECC.camera().zoom = zoomTest
  dmECC.cameraInset().zoom = zoomTest;

  dmECC.camera().updateProjectionMatrix();
  dmECC.cameraInset().updateProjectionMatrix();

  dmECC.updateCanvases(0);

};
//------------------------------------------------------------------------------

dmECC.stretchY = function(diffrStretchYlevel) {

  let testStretchYlevel = dmECC.stretchYlevel() + diffrStretchYlevel;

  if ( (testStretchYlevel < dmECC.stretchYlevelMin()) ||
       (testStretchYlevel > dmECC.stretchYlevelMax()) ) return; //!!!

  dmECC.stretchYlevel(testStretchYlevel);

  dmECC.stretchYcoeff( dmECC.calcStretchYcoeff(testStretchYlevel) );

  dmECC.updateCanvases(0);

};
//------------------------------------------------------------------------------

dmECC.calcStretchYcoeff = function(testStretchYlevel) {

  if (testStretchYlevel > 0) return testStretchYlevel; //!!!

  switch (testStretchYlevel) {
    case  0: return 0.5;
    case -1: return 0.333;
  }

};
//------------------------------------------------------------------------------

dmECC.moveView = function(ip, dirLRUD) {

  // ip = 1 or 2 for moving along Y, and Z

  // dirLRUD - direction of moving (left, right, up, or down)
  // dirLRUD =  1 for moving to right or up
  // dirLRUD = -1 for moving to left or down

  // E.g.: Move the camera up   (detector - down)  if ip==1 and dirLRUD==1
  // E.g.: Move the camera left (detector - right) if ip==2 and dirLRUD==-1

  if (!Utils.checkIP(ip, 3)) {
    alert("MgrDrawECC-funcAdd.js::dmECC.moveView()::Error: ip is strange!!!: ip = " + ip + "!!!");
    return;
  }

  if (!ip) return; //!!!

  const z1 = (dmECC.zoom() > 0.9) ?
             0.265 - 0.05*dmECC.zoom() :
             2.02 - 2*dmECC.zoom();

  const primVertDrawPos = dmECC.primVertDrawPos();

  if (ip == 2) {
    dmECC.camera().position.set(primVertDrawPos.x - 2000,
                                dmECC.camera().position.y,
                                dmECC.camera().position.z + dirLRUD*z1*1000);
  }
  else {
    dmECC.camera().position.set(primVertDrawPos.x - 2000,
                                dmECC.camera().position.y + dirLRUD*z1*1000,
                                dmECC.camera().position.z);
  }

  dmECC.updateCanvases(0);

};
//-----------------------------------------------------------------------------

dmECC.drawVertices = function() {

  const evVertices = demobbed.event().verticesECC();

  const primVertRealPos = evVertices[0].pos();

  const primVertDrawPos = dmECC.primVertDrawPos();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const nbOfVertices = evVertices.length;

  for (let iv = 0; iv < nbOfVertices; iv++) {

    const vertexPoint = (dmECC.zoom() > 0.4) ?
                        new THREE.Mesh( dmECC.vertexGeometryCloseView(),
                                        dmECC.vertexMaterial() ) :
                        new THREE.Mesh( dmECC.vertexGeometryFarView(),
                                        dmECC.vertexMaterial() );

    if (iv) {

      const vertRealPos = evVertices[iv].pos();

      vertexPoint.position.x = primVertDrawPos.x + vertRealPos[0] - primVertRealPos[0];
      vertexPoint.position.y = primVertDrawPos.y + stretchYcoeff*(vertRealPos[1] - primVertRealPos[1]);
      vertexPoint.position.z = primVertDrawPos.z + vertRealPos[2] - primVertRealPos[2];

    }
    else {

      vertexPoint.position.x = primVertDrawPos.x;
      vertexPoint.position.y = primVertDrawPos.y;
      vertexPoint.position.z = primVertDrawPos.z;

    }

    dmECC.groupOfVertices().add(vertexPoint);

  }

  dmECC.scene().add(dmECC.groupOfVertices());

};
//------------------------------------------------------------------------------

dmECC.drawTracks = function() {

  //if ( demobbed.evSampleId() ) dmECC.drawTracksWithPosAndSlopes();

  if ( demobbed.evSampleId() ) dmECC.drawTracksWithPos1AndPos2();
  else dmECC.drawTracksFromVertex();

  dmECC.scene().add(dmECC.groupOfTracks());

};
//------------------------------------------------------------------------------

dmECC.drawTracksFromVertex = function() {

  const primVertDrawPos = dmECC.primVertDrawPos();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const evTracks = demobbed.event().tracksECC();

  const nbOfTracks = evTracks.length;

  for (let it = 0; it < nbOfTracks; it++) {

    const trPartId = evTracks[it].partId();

    const trAxy = evTracks[it].Axy();

    const trackPartTitle = dmECC.trackTitles()[trPartId];

    const trPars = dmECC.trackLinePars()[trPartId];

    const trBeg = [0, 0, 0];
    const trEnd = [0, 0, 0];

    const trTitlePos = [0, 0, 0];

    if ( (trPartId == 5) || (trPartId == 7) ) { // back track

      trEnd[2] = -30;
      trBeg[2] = trEnd[2] - trPars.length;

    }
    else {

      trBeg[2] = (trPartId === 3) ? 900 : 30; // an electron comes not from the primary vertex
      trEnd[2] = trBeg[2] + trPars.length;

      if (trackPartTitle) trTitlePos[2] = trBeg[2] + 1500;

    }

    const trAyCoeffY = trAxy[1]*stretchYcoeff;

    trBeg[0] = trBeg[2]*trAxy[0];
    trEnd[0] = trEnd[2]*trAxy[0];

    trBeg[1] = trBeg[2]*trAyCoeffY;
    trEnd[1] = trEnd[2]*trAyCoeffY;

    if (trackPartTitle) {

      trTitlePos[0] = trTitlePos[2]*trAxy[0];
      trTitlePos[1] = trTitlePos[2]*trAyCoeffY;

    }

    // This cycle must be uncommented (and tested) in case the primary vertex draw position is not (0, 0, 0)!!!
    //for (let ip = 0; ip < 3; ip++) {
    //  const xyz = primVertDrawPos.getComponent(ip);
    //  trBeg[ip] += xyz;
    //  trEnd[ip] += xyz;
    //  if (trackPartTitle) trTitlePos[ip] += xyz;
    //}

    const trLineWidth = trPars.width/dmECC.zoom();

    const trackLine = new three3DExtras.tubeLine(trBeg, trEnd,
                                                 trLineWidth,
                                                 trPars.color);

    dmECC.groupOfTracks().add(trackLine.getObject3D());

    if (trackPartTitle) {

      const trackTitle = trackPartTitle.clone(); //!!!

      trackTitle.position.x = trTitlePos[0];
      trackTitle.position.y = trTitlePos[1] + 100;
      trackTitle.position.z = trTitlePos[2];

      dmECC.groupOfTracks().add(trackTitle);

    }

  }

};
//------------------------------------------------------------------------------

dmECC.drawTracksWithPosAndSlopes = function() {

  const primVertRealPos = demobbed.event().verticesECC()[0].pos();

  const primVertDrawPos = dmECC.primVertDrawPos();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const evTracks = demobbed.event().tracksECC();

  const nbOfTracks = evTracks.length;

  const trZlength = 1380;

  for (let it = 0; it < nbOfTracks; it++) {

    const iTrack = evTracks[it];

    const trBeg = [0, 0, 0];

    for (let ip = 0; ip < 3; ip++) {

      if (ip == 1)
        trBeg[ip] = primVertDrawPos.getComponent(ip) + stretchYcoeff*(iTrack.pos1()[ip] - primVertRealPos[ip]);
      else
        trBeg[ip] = primVertDrawPos.getComponent(ip) + iTrack.pos1()[ip] - primVertRealPos[ip];

    }

    const trEnd = [0, 0, trBeg[2] + trZlength];

    for (let ip = 0; ip < 2; ip++) {

      if (ip == 1)
        trEnd[ip] = trBeg[ip] + stretchYcoeff*trZlength*iTrack.Axy()[ip];
      else
        trEnd[ip] = trBeg[ip] + trZlength*iTrack.Axy()[ip];

    }

    const trPars = dmECC.trackLinePars()[iTrack.partId()];

    const trLineWidth = trPars.width/dmECC.zoom();

    const trackLine = new three3DExtras.tubeLine(trBeg, trEnd,
                                                 trLineWidth,
                                                 trPars.color); 

    dmECC.groupOfTracks().add(trackLine.getObject3D());

  }

};
//------------------------------------------------------------------------------

dmECC.drawTracksWithPos1AndPos2 = function() {

  const primVertRealPos = demobbed.event().verticesECC()[0].pos();

  const primVertDrawPos = dmECC.primVertDrawPos();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const evTracks = demobbed.event().tracksECC();

  const nbOfTracks = evTracks.length;

  for (let it = 0; it < nbOfTracks; it++) {

    const iTrack = evTracks[it];

    const trPos1 = [0, 0, 0];
    const trPos2 = [0, 0, 0];

    for (let ip = 0; ip < 3; ip++) {

      const xyz = primVertDrawPos.getComponent(ip);

      if (ip == 1) {
        trPos1[ip] = xyz + stretchYcoeff*(iTrack.pos1()[ip] - primVertRealPos[ip]);
        trPos2[ip] = xyz + stretchYcoeff*(iTrack.pos2()[ip] - primVertRealPos[ip]);
      }
      else {
        trPos1[ip] = xyz + iTrack.pos1()[ip] - primVertRealPos[ip];
        trPos2[ip] = xyz + iTrack.pos2()[ip] - primVertRealPos[ip];
      }

    }

    const trPars = dmECC.trackLinePars()[iTrack.partId()];

    const trLineWidth = trPars.width/dmECC.zoom();

    const trackLine = new three3DExtras.tubeLine(trPos1, trPos2, trLineWidth, trPars.color); 

    dmECC.groupOfTracks().add(trackLine.getObject3D());

  }

};
//------------------------------------------------------------------------------

dmECC.onEventChange = function() {

  const divECC = document.getElementById("div-col-display-ECC");

  if (!demobbed.showECC()) {

    if (dmECC.camera() !== null) {

      cancelAnimationFrame(dmECC.animationFrameID());

      dmECC.clearCanvases();

      dmECC.eraseEventInfo();

    }

    divECC.style.display = "none";

    return; //!!!

  }

  divECC.style.display = "block";

  dmECC.updateCanvases();

  dmECC.displayEventInfo();

};
//------------------------------------------------------------------------------

dmECC.displayEventInfo = function() {
};
//------------------------------------------------------------------------------

dmECC.eraseEventInfo = function() {
};
//------------------------------------------------------------------------------

dmECC.updateCanvases = function(resetCameraPos) {

  //if (dmECC.camera() === null) dmECC.initGraphics(); // the initialisation is called in MgrDrawED-addMethods.js!

  dmECC.clearCanvases();

  if (resetCameraPos === undefined) {

    resetCameraPos = 1; //!!!

    const rotY = dmECC.groupOfTracks().rotation.y;

    if (rotY >= 0) {

      dmECC.groupOfVertices().rotation.y = 0;
      dmECC.groupOfTracks().rotation.y   = 0;
      dmECC.groupOfAxes().rotation.y     = 0;
    }

  }

  dmECC.prepareAndDrawEvent(resetCameraPos);

};
//------------------------------------------------------------------------------

dmECC.clearCanvases = function() {

  dmECC.clearGroupOfVertices();

  dmECC.clearGroupOfTracks();

  dmECC.clearGroupOfAxes();

};
//------------------------------------------------------------------------------

dmECC.drawECC = function(showECC) {

  demobbed.showECC(showECC);

  dmECC.onEventChange();

};
//------------------------------------------------------------------------------

dmECC.initTrackLegend = function() {

  const canvasLegendECC = document.getElementById("canvas-legend-ECC");

  dmECC.trackLegendWidth(canvasLegendECC.width);
  dmECC.trackLegendHeight(canvasLegendECC.height);

  dmECC.trackLegendContext(canvasLegendECC.getContext("2d"));

  dmECC.trackLegendLineBeg(canvasLegendECC.width - 45);
  dmECC.trackLegendLineEnd(canvasLegendECC.width - 10);

  dmECC.trackLegendContext().font = "16px serif";

  dmECC.trackLegendContext().fillStyle = "white";
  dmECC.trackLegendContext().fillText("Track types", 50, 15);

  dmECC.trackLegendContext().beginPath();
  dmECC.trackLegendContext().moveTo(0, 20);
  dmECC.trackLegendContext().lineTo(canvasLegendECC.width, 20);
  dmECC.trackLegendContext().strokeStyle = "white";
  dmECC.trackLegendContext().stroke();

};
//------------------------------------------------------------------------------

dmECC.drawTrackLegend = function() {

  dmECC.trackLegendContext().clearRect( 0, 20,
                                        dmECC.trackLegendWidth(),
                                        dmECC.trackLegendHeight() );

  if ( demobbed.evSampleId() ) {

    switch (demobbed.event().id()) {

    case 9190097972:

      dmECC.addLegendEntry("tau lepton:",         38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron (daughter):",  56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron:",             74, TrackECC.colors(14));
      dmECC.addLegendEntry("hadron:",             92, TrackECC.colors(16));
      dmECC.addLegendEntry("hadron:",            110, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",            128, TrackECC.colors(12));

      break;

    case 9234119599:

      dmECC.addLegendEntry("tau lepton:",       38, TrackECC.colors(8));
      dmECC.addLegendEntry("pion (daughter):",  56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron:",           74, TrackECC.colors(10));
      dmECC.addLegendEntry("proton:",           92, TrackECC.colors(14));
      dmECC.addLegendEntry("hadron:",          110, TrackECC.colors(11));
      dmECC.addLegendEntry("hadron:",          128, TrackECC.colors(12));
      dmECC.addLegendEntry("pion:",            146, TrackECC.colors(15));
      dmECC.addLegendEntry("hadron:",          164, TrackECC.colors(13));
      dmECC.addLegendEntry("e+/e- (gamma1):",  182, TrackECC.colors(17));
      dmECC.addLegendEntry("e+/e- (gamma2):",  200, TrackECC.colors(16));

      break;

    case 10123059807:

      dmECC.addLegendEntry("tau lepton:",          38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron (daughter1):",  56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron (daughter2):",  74, TrackECC.colors(15));
      dmECC.addLegendEntry("hadron (daughter3):",  92, TrackECC.colors(14));
      dmECC.addLegendEntry("hadron:",             110, TrackECC.colors(17));
      dmECC.addLegendEntry("hadron:",             128, TrackECC.colors(11));
      dmECC.addLegendEntry("hadron:",             146, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",             164, TrackECC.colors(12));
      dmECC.addLegendEntry("hadron:",             182, TrackECC.colors(16));
      dmECC.addLegendEntry("proton:",             200, TrackECC.colors(13));

      break;

    case 11113019758:

      dmECC.addLegendEntry("tau lepton:",          38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron (daughter1):",  56, TrackECC.colors(14));
      dmECC.addLegendEntry("hadron (daughter2):",  74, TrackECC.colors(16));
      dmECC.addLegendEntry("hadron (daughter3):",  92, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",             110, TrackECC.colors(11));
      dmECC.addLegendEntry("hadron:",             128, TrackECC.colors(12));
      dmECC.addLegendEntry("hadron:",             146, TrackECC.colors(9));

      break;

    case 11143018505:

      dmECC.addLegendEntry("tau lepton:",         38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron (daughter):",  56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron:",             74, TrackECC.colors(13));
      dmECC.addLegendEntry("hadron:",             92, TrackECC.colors(12));
      dmECC.addLegendEntry("hadron:",            110, TrackECC.colors(14));
      dmECC.addLegendEntry("hadron:",            128, TrackECC.colors(11));
      dmECC.addLegendEntry("e+/e- (gamma):",     146, TrackECC.colors(17));

      break;

    case 11172035775:

      dmECC.addLegendEntry("tau lepton:",         38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron (daughter):",  56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron:",             74, TrackECC.colors(16));
      dmECC.addLegendEntry("hadron:",             92, TrackECC.colors(12));
      dmECC.addLegendEntry("hadron:",            110, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",            128, TrackECC.colors(14));

      break;

    case 11213015702:

      dmECC.addLegendEntry("tau lepton:",          38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron (daughter1):",  56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron (daughter2):",  74, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron (daughter3):",  92, TrackECC.colors(17));
      dmECC.addLegendEntry("hadron:",             110, TrackECC.colors(14));
      dmECC.addLegendEntry("hadron:",             128, TrackECC.colors(15));
      dmECC.addLegendEntry("proton:",             146, TrackECC.colors(12));
      dmECC.addLegendEntry("hadron:",             164, TrackECC.colors(13));
      dmECC.addLegendEntry("hadron:",             182, TrackECC.colors(11));
      dmECC.addLegendEntry("hadron:",             200, TrackECC.colors(16));

      break;

    case 12123032048:

      dmECC.addLegendEntry("tau lepton:",      38, TrackECC.colors(8));
      dmECC.addLegendEntry("muon (daughter):", 56, TrackECC.colors(1));
      dmECC.addLegendEntry("hadron:",          74, TrackECC.colors(10));
      dmECC.addLegendEntry("e+/e- (gamma):",   92, TrackECC.colors(17));

      break;

    case 12227007334:

      dmECC.addLegendEntry("tau lepton:",         38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron (daughter):",  56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron:",             74, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",             92, TrackECC.colors(12));
      dmECC.addLegendEntry("hadron:",            110, TrackECC.colors(13));
      dmECC.addLegendEntry("hadron:",            128, TrackECC.colors(16));
      dmECC.addLegendEntry("hadron:",            146, TrackECC.colors(14));
      dmECC.addLegendEntry("e+/e- (gamma):",     164, TrackECC.colors(17));

      break;

    case 12254000036:

      dmECC.addLegendEntry("tau lepton:",         38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron (daughter):",  56, TrackECC.colors(9));
      dmECC.addLegendEntry("proton:",             74, TrackECC.colors(14));
      dmECC.addLegendEntry("hadron:",             92, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",            110, TrackECC.colors(12));
      dmECC.addLegendEntry("e+/e- (gamma1):",    128, TrackECC.colors(17));
      dmECC.addLegendEntry("e+/e- (gamma2):",    146, TrackECC.colors(16));

      break;

    }

  }
  else {

    dmECC.addLegendEntry("muon:",             38, TrackECC.colors(1));
    dmECC.addLegendEntry("hadron:",           56, TrackECC.colors(2));
    dmECC.addLegendEntry("e+/e-:",            74, TrackECC.colors(3));
    dmECC.addLegendEntry("highly ionizing:",  92, TrackECC.colors(4));
    dmECC.addLegendEntry("ionizing:",        110, TrackECC.colors(6));

  }

};
//-----------------------------------------------------------------------------

dmECC.addLegendEntry = function(trTypeName, topDist, trColor) {

  dmECC.trackLegendContext().fillStyle = trColor;
  dmECC.trackLegendContext().fillText(trTypeName, 8, topDist + 3);

  dmECC.trackLegendContext().beginPath();
  dmECC.trackLegendContext().moveTo(dmECC.trackLegendLineBeg(), topDist);
  dmECC.trackLegendContext().lineTo(dmECC.trackLegendLineEnd(), topDist);
  dmECC.trackLegendContext().lineWidth = 3;
  dmECC.trackLegendContext().strokeStyle = trColor;
  dmECC.trackLegendContext().stroke();

};
//-----------------------------------------------------------------------------

dmECC.prepareTitlesOfTracksAndAxes = function() {

  dmECC.calcAxesLengthesAndNbOfUnits();

  const primVertDrawPos = dmECC.primVertDrawPos();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const axesNbOfUnits = dmECC.axesNbOfUnits();

  const axesLengthes = dmECC.axesLengthes();

  let fontSize = axesLengthes[1]/8;
  if (stretchYcoeff < 1) fontSize /= stretchYcoeff;

  dmECC.titleFontLoader().load('./fonts/helvetiker_regular.typeface.json', function(font) {

    // prepare axes titles

    const tps = { size:fontSize, height:10, font:font };

    const x_geo = new THREE.TextGeometry('X', tps);
    const y_geo = new THREE.TextGeometry('Y', tps);
    const z_geo = new THREE.TextGeometry('Z', tps);

    const un_geo = new THREE.TextGeometry(axesNbOfUnits + 'mm', tps);

    const x_text = new THREE.Mesh( x_geo, dmECC.axisXtitleMaterial() );

    x_text.position.x = primVertDrawPos.x;
    if (axesLengthes[0] > 100) x_text.position.x += 980*axesLengthes[0]/1000;
    else x_text.position.x += 100;

    x_text.position.y = primVertDrawPos.y + 50;
    x_text.position.z = primVertDrawPos.z + 50;
    x_text.rotation.y = -1.57;

    dmECC.axesTitles()[0] = x_text;

    const y_text = new THREE.Mesh( y_geo, dmECC.axisYtitleMaterial() );

    y_text.position.y = primVertDrawPos.y;
    if (axesLengthes[1] > 200) y_text.position.y += 900*axesLengthes[1]/1000;
    else y_text.position.y += 200;

    y_text.position.x = primVertDrawPos.x;
    y_text.position.z = primVertDrawPos.z + 50;
    y_text.rotation.y = -1.57;

    dmECC.axesTitles()[1] = y_text;

    const z_text = new THREE.Mesh( z_geo, dmECC.axisZtitleMaterial() );

    z_text.position.z = primVertDrawPos.z;
    if (axesLengthes[2] > 100) z_text.position.z += 920*axesLengthes[2]/1000;
    else z_text.position.z += 100;

    z_text.position.x = primVertDrawPos.x;
    z_text.position.y = primVertDrawPos.y + 50;
    z_text.rotation.y = -1.57;

    dmECC.axesTitles()[2] = z_text;

    const un_text = new THREE.Mesh( un_geo, dmECC.axisYtitleMaterial() );

    un_text.position.y = primVertDrawPos.y;
    if (axesLengthes[1] > 200) un_text.position.y += 450*axesLengthes[1]/1000;
    else un_text.position.y += 100;

    un_text.position.x = primVertDrawPos.x;
    un_text.position.z = primVertDrawPos.z + 50;
    un_text.rotation.y = -1.57;

    dmECC.axesTitles()[3] = un_text;

    // prepare track titles

    const trMu_geo = new THREE.TextGeometry('mu', tps);

    dmECC.trackTitles()[1] = new THREE.Mesh(trMu_geo, dmECC.trMuTitleMaterial());
    dmECC.trackTitles()[1].rotation.y = -1.57;

    const trEl_geo = new THREE.TextGeometry('e', tps);

    dmECC.trackTitles()[3] = new THREE.Mesh(trEl_geo, dmECC.trElTitleMaterial());
    dmECC.trackTitles()[3].rotation.y = -1.57;

  });

};
//------------------------------------------------------------------------------

dmECC.calcAxesLengthesAndNbOfUnits = function() {

  const zoom = dmECC.zoom();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const axesLengthes = [1000, 1000, 1000];

  if (stretchYcoeff > 1) axesLengthes[0] = axesLengthes[2] = axesLengthes[1]/stretchYcoeff;
  else if (stretchYcoeff < 1) axesLengthes[1] = axesLengthes[0]*stretchYcoeff;

  if (zoom > 3.8) {
    axesLengthes[0] *= 0.22*zoom;
    axesLengthes[1] *= 0.22*zoom;
    axesLengthes[2] *= 0.22*zoom;
  }
  else if (zoom > 3.0) {
    axesLengthes[0] *= 0.28*zoom;
    axesLengthes[1] *= 0.28*zoom;
    axesLengthes[2] *= 0.28*zoom;
  }
  else if (zoom > 2.4) {
    axesLengthes[0] *= 0.38*zoom;
    axesLengthes[1] *= 0.38*zoom;
    axesLengthes[2] *= 0.38*zoom;
  }
  else if (zoom > 1.9) {
    axesLengthes[0] *= 0.5*zoom;
    axesLengthes[1] *= 0.5*zoom;
    axesLengthes[2] *= 0.5*zoom;
  }
  else if (zoom > 1.5) {
    axesLengthes[0] *= 0.7*zoom;
    axesLengthes[1] *= 0.7*zoom;
    axesLengthes[2] *= 0.7*zoom;
  }
  else if (zoom > 1.1) {
    axesLengthes[0] *= 0.8*zoom;
    axesLengthes[1] *= 0.8*zoom;
    axesLengthes[2] *= 0.8*zoom;
  }
  else if (zoom > 0.40) {
    axesLengthes[0] *= 1.2/(zoom + 0.2);
    axesLengthes[1] *= 1.2/(zoom + 0.2);
    axesLengthes[2] *= 1.2/(zoom + 0.2);
  }
  else if (zoom > 0.25) {
    axesLengthes[0] *= 1.1/(zoom + 0.1);
    axesLengthes[1] *= 1.1/(zoom + 0.1);
    axesLengthes[2] *= 1.1/(zoom + 0.1);
  }
  else if (zoom > 0.15) {
    axesLengthes[0] *= 1.06/(zoom + 0.06);
    axesLengthes[1] *= 1.06/(zoom + 0.06);
    axesLengthes[2] *= 1.06/(zoom + 0.06);
  }
  else if (zoom > 0) {
    axesLengthes[0] *= 1.02/(zoom + 0.02);
    axesLengthes[1] *= 1.02/(zoom + 0.02);
    axesLengthes[2] *= 1.02/(zoom + 0.02);
  }

  let axesNbOfUnits = axesLengthes[1]/(1000*stretchYcoeff);

  if ( axesNbOfUnits <= 0.9 ) axesNbOfUnits = Math.floor(axesNbOfUnits*10)/10;
  else {

    const temp_ceil = Math.ceil(axesNbOfUnits);

    if (temp_ceil - axesNbOfUnits < 0.1) axesNbOfUnits = temp_ceil;
    else axesNbOfUnits = Math.floor(axesNbOfUnits);

  }

  axesLengthes[0] = axesLengthes[2] = 1000*axesNbOfUnits;
  axesLengthes[1] = axesLengthes[0]*stretchYcoeff;

  dmECC.axesLengthes(axesLengthes);

  dmECC.axesNbOfUnits(axesNbOfUnits);

};
//------------------------------------------------------------------------------

dmECC.drawAxes = function() {

  const primVertDrawPos = dmECC.primVertDrawPos();

  const zoom = dmECC.zoom();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const axesLengthes = dmECC.axesLengthes();

  const axisWidth = 8/zoom;

  const rx = new three3DExtras.tubeLine([primVertDrawPos.x,
                                         primVertDrawPos.y,
                                         primVertDrawPos.z],
                                        [primVertDrawPos.x + axesLengthes[0],
                                         primVertDrawPos.y,
                                         primVertDrawPos.z],
                                         axisWidth, dmECC.colorAxisX());

  const gy = new three3DExtras.tubeLine([primVertDrawPos.x,
                                         primVertDrawPos.y,
                                         primVertDrawPos.z],
                                        [primVertDrawPos.x,
                                         primVertDrawPos.y + axesLengthes[1],
                                         primVertDrawPos.z],
                                         axisWidth, dmECC.colorAxisY());

  const bz = new three3DExtras.tubeLine([primVertDrawPos.x,
                                         primVertDrawPos.y,
                                         primVertDrawPos.z],
                                        [primVertDrawPos.x,
                                         primVertDrawPos.y,
                                         primVertDrawPos.z + axesLengthes[2]],
                                         axisWidth, dmECC.colorAxisZ());

  dmECC.groupOfAxes().add(rx.getObject3D());
  dmECC.groupOfAxes().add(gy.getObject3D());
  dmECC.groupOfAxes().add(bz.getObject3D());

  for (let iax = 0; iax < 4; iax++) {

    const axisTitle = dmECC.axesTitles()[iax];

    if (axisTitle) {

      const newAxisTitle = axisTitle.clone(); //!!!

      dmECC.groupOfAxes().add(newAxisTitle);

    }

  }

  dmECC.sceneInset().add(dmECC.groupOfAxes());

};
//------------------------------------------------------------------------------
