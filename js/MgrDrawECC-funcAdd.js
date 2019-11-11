//dmECC == demobbed.mgrDrawECC() !!!
//gmED  == demobbed.mgrGeomED()  !!!
//---------------------------------------

dmECC.initGraphics = function() {

  dmECC.initCameras();

  dmECC.scene( new THREE.Scene() );
  dmECC.sceneInset( new THREE.Scene() );

  dmECC.initRenderers();

  dmECC.initControls();

  dmECC.groupOfVertices( new THREE.Group() );

  dmECC.groupOfTracks( new THREE.Group() );

  dmECC.groupOfAxes( new THREE.Group() );

  dmECC.initVertexProperties();

  dmECC.initTrackLineProperties();

  dmECC.initTitlesOfTracksAndAxes();

  dmECC.initTrackLegend();

};
//------------------------------------------------------------------------------

dmECC.initCameras = function() {

  const primVertDrawPos = dmECC.primVertDrawPos();

  dmECC.cameraInitPositions([
    new THREE.Vector3(primVertDrawPos.x - 200,
                      primVertDrawPos.y + 2000,
                      primVertDrawPos.z + 200),

    new THREE.Vector3(primVertDrawPos.x - 2000,
                      primVertDrawPos.y + 200,
                      primVertDrawPos.z + 200),

    new THREE.Vector3(primVertDrawPos.x - 200,
                      primVertDrawPos.y + 200,
                      primVertDrawPos.z + 7000)
  ]);

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

dmECC.resetCameras = function() {

  const ip = dmECC.view();

  dmECC.camera().position.copy(dmECC.cameraInitPositions()[ip]);
  dmECC.cameraInset().position.copy(dmECC.cameraInitPositions()[ip]);

  dmECC.camera().up.copy( dmECC.cameraInitUpDirs(ip) );
  dmECC.cameraInset().up.copy( dmECC.cameraInitUpDirs(ip) )

  const primVertDrawPos = dmECC.primVertDrawPos();

  dmECC.camera().lookAt(primVertDrawPos);
  dmECC.cameraInset().lookAt(primVertDrawPos);

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

dmECC.initControls = function() {

  dmECC.tbControls( new THREE.TrackballControls(dmECC.camera(), dmECC.renderer().domElement) );

  dmECC.tbControls().noZoom = true; //!!!

  dmECC.tbControls().zoomSpeed = 1.5;
  dmECC.tbControls().rotateSpeed = 1.0;
  dmECC.tbControls().panSpeed = 0.2;

  dmECC.tbControls().staticMoving = true;
  dmECC.tbControls().dynamicDampingFactor = 0.3;

  //dmECC.tbControls().addEventListener('change', dmECC.render);

};
//------------------------------------------------------------------------------

dmECC.initVertexProperties = function() {

  dmECC.vertexGeometryCloseView( new THREE.SphereGeometry(20, 32, 32) );
  dmECC.vertexGeometryFarView( new THREE.SphereGeometry(60, 32, 32) );

  dmECC.vertexMaterial( new THREE.MeshBasicMaterial({ color: Vertex.colorForECC() }) );

};
//------------------------------------------------------------------------------

dmECC.initTitlesOfTracksAndAxes = function() {

  dmECC.axisXtitleMaterial( new THREE.MeshBasicMaterial({ color: dmECC.colorAxisX()  }) );
  dmECC.axisYtitleMaterial( new THREE.MeshBasicMaterial({ color: dmECC.colorAxisY()  }) );
  dmECC.axisZtitleMaterial( new THREE.MeshBasicMaterial({ color: dmECC.colorAxisZ()  }) );
  dmECC.axisUnitsMaterial(  new THREE.MeshBasicMaterial({ color: dmECC.colorAxisUn() }) );

  dmECC.trMuTitleMaterial( new THREE.MeshBasicMaterial({ color: TrackECC.colors(1) }) );
  dmECC.trElTitleMaterial( new THREE.MeshBasicMaterial({ color: TrackECC.colors(3) }) );

  for (let itr = 0; itr < 21; itr++)
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

  dmECC.trackLinePars()[9] = { // for tracks of hadrons

    color:  TrackECC.colors(9),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[10] = { // for tracks of hadrons

    color:  TrackECC.colors(10),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[11] = { // for tracks of hadrons

    color:  TrackECC.colors(11),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[12] = { // for tracks of hadrons

    color:  TrackECC.colors(12),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[13] = { // for tracks of hadrons

    color:  TrackECC.colors(13),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[14] = { // for tracks of hadrons

    color:  TrackECC.colors(14),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[15] = { // for tracks of hadrons

    color:  TrackECC.colors(15),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[16] = { // for e+/e- tracks

    color:  TrackECC.colors(16),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[17] = { // for e+/e- tracks

    color:  TrackECC.colors(17),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[18] = { // for e+/e- tracks

    color:  TrackECC.colors(18),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[19] = { // for e+/e- tracks

    color:  TrackECC.colors(19),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[20] = { // for tracks of hadrons

    color:  TrackECC.colors(20),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

};
//------------------------------------------------------------------------------

dmECC.prepareAndDrawEvent = function(resetCameras) {

  dmECC.prepareTitlesOfTracksAndAxes();

  setTimeout( function() { dmECC.drawEvent(resetCameras); }, 100 );

};
//------------------------------------------------------------------------------

dmECC.drawEvent = function(resetCameras) {

  dmECC.drawVertices();

  dmECC.drawTracks();

  dmECC.drawAxes();

  dmECC.drawTrackLegend();

  if (resetCameras) {

    dmECC.tbControls().reset();

    dmECC.resetCameras();

    dmECC.camera().zoom = dmECC.zoom();
    dmECC.cameraInset().zoom = dmECC.zoom();

    dmECC.camera().updateProjectionMatrix();
    dmECC.cameraInset().updateProjectionMatrix();

  }

  //console.log("camera().position.x = " + dmECC.camera().position.x);

  //let cameraDirection = dmECC.camera().getWorldDirection();
  //console.log("cameraDirection.x = " + cameraDirection.x);

  dmECC.setupZoomingButtons();

  dmECC.render();

};
//------------------------------------------------------------------------------

dmECC.setupZoomingButtons = function() {

  const zoom = dmECC.zoom();

  $('#btn-ecc-zoom-in').toggleClass( 'active', (zoom > 1) );
  $('#btn-ecc-zoom-out').toggleClass( 'active', (zoom < 1) );

};
//------------------------------------------------------------------------------

dmECC.setupDefaultViewButtons = function() {

  const ip = dmECC.view();

  $('#btn-ecc-def-view-xz').toggleClass( 'active', (ip === 0) );
  $('#btn-ecc-def-view-yz').toggleClass( 'active', (ip === 1) );
  $('#btn-ecc-def-view-xy').toggleClass( 'active', (ip === 2) );

};
//------------------------------------------------------------------------------

dmECC.setupStretchAndCompressButtons = function() {

  const stretchYcoeff = dmECC.stretchYcoeff();

  $('#btn-ecc-stretch-y').toggleClass( 'active', (stretchYcoeff > 1) );
  $('#btn-ecc-compress-y').toggleClass( 'active', (stretchYcoeff < 1) );

};
//------------------------------------------------------------------------------

dmECC.render = function() {

  dmECC.renderer().render( dmECC.scene(), dmECC.camera() );
  dmECC.rendererInset().render( dmECC.sceneInset(), dmECC.cameraInset() );

};
//------------------------------------------------------------------------------

dmECC.runInteractiveMode = function() {

  //setTimeout( function() {
  dmECC.animationFrameID( requestAnimationFrame(dmECC.runInteractiveMode) );
  //}, 1000/30. ); // deceleration doesn't work with fps=30!!!

  dmECC.tbControls().update();

  dmECC.cameraInset().position.subVectors(dmECC.camera().position, dmECC.tbControls().target);
  dmECC.cameraInset().up.copy(dmECC.camera().up);
  dmECC.cameraInset().quaternion.copy(dmECC.camera().quaternion);

  dmECC.zoom(dmECC.camera().zoom);
  dmECC.cameraInset().zoom = dmECC.zoom();

  dmECC.cameraInset().lookAt( dmECC.primVertDrawPos() );

  dmECC.cameraInset().updateProjectionMatrix();

  //dmECC.updateCanvases(0); With this function call uncommented the application works slowly (and with delays)

  dmECC.setupZoomingButtons();

  dmECC.render();

};
//------------------------------------------------------------------------------

dmECC.accelerateRotation = function() {

  dmECC.accelerationLevel( dmECC.accelerationLevel() + 1 );

  dmECC.increaseRotationY();

};
//------------------------------------------------------------------------------

dmECC.increaseRotationY = function() {

  dmECC.animationFrameID( requestAnimationFrame(dmECC.increaseRotationY) );

  dmECC.groupOfVertices().rotation.y += 0.004;
  dmECC.groupOfTracks().rotation.y   += 0.004;
  dmECC.groupOfAxes().rotation.y     += 0.004;

  dmECC.render();

};
//------------------------------------------------------------------------------

dmECC.decelerateRotation = function() {

  if (dmECC.accelerationLevel() > 0) {

    dmECC.accelerationLevel( dmECC.accelerationLevel() - 1 );

    cancelAnimationFrame( dmECC.animationFrameID() );

  }

};
//------------------------------------------------------------------------------

dmECC.zoomInOut = function(makeZoomIn) {

  let zoomTest = 1;

  if (makeZoomIn > 0) zoomTest = Math.round(1000*dmECC.camera().zoom*dmECC.zoomFactor())/1000;
  else zoomTest = Math.round(1000*dmECC.camera().zoom/dmECC.zoomFactor())/1000;

  if ( (makeZoomIn > 0) && ( zoomTest > dmECC.zoomMax() ) ) return; //!!!
  if ( (makeZoomIn < 0) && ( zoomTest < dmECC.zoomMin() ) ) return; //!!!

  if ( Math.abs(zoomTest - 1) < 0.1 ) zoomTest = 1;

  dmECC.setZooms(zoomTest);

  dmECC.camera().updateProjectionMatrix();
  dmECC.cameraInset().updateProjectionMatrix();

  dmECC.updateCanvases(0);

};
//------------------------------------------------------------------------------

dmECC.setZooms = function(zoom) {

  dmECC.zoom(zoom);
  dmECC.camera().zoom = zoom;
  dmECC.cameraInset().zoom = zoom;

};
//------------------------------------------------------------------------------

dmECC.stretchY = function(diffrStretchYlevel) {

  let testStretchYlevel = dmECC.stretchYlevel() + diffrStretchYlevel;

  if ( (testStretchYlevel < dmECC.stretchYlevelMin()) ||
       (testStretchYlevel > dmECC.stretchYlevelMax()) ) return; //!!!

  dmECC.stretchYlevel(testStretchYlevel);

  dmECC.stretchYcoeff( dmECC.calcStretchYcoeff(testStretchYlevel) );

  dmECC.setupStretchAndCompressButtons();

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

/*
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
*/

dmECC.setDefaultView = function(ip) {

  // ip = 0, 1, or 2 for changing the display view to XZ, YZ (default), or XY, correspondingly

  if (!Utils.checkIP(ip, 3)) {
    alert("MgrDrawECC-def::setDefaultView()::Error: ip is strange!!!: ip = " + ip + "!!!");
    return;
  }

  dmECC.view(ip);

  dmECC.setZooms(1);

  dmECC.camera().updateProjectionMatrix();
  dmECC.cameraInset().updateProjectionMatrix();

  dmECC.stretchYlevel(1);
  dmECC.stretchYcoeff(1);

  dmECC.resetRotationY();

  dmECC.setupDefaultViewButtons();
  dmECC.setupStretchAndCompressButtons();

  dmECC.updateCanvases(1);

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

  switch ( demobbed.evSampleId() )
  {
  case 0:
    dmECC.drawTracksFromVertex();
    break;

  case 1:
  case 3:
    dmECC.drawTracksWithPos1AndPos2();
    break;

  case 2:
    dmECC.drawTracksWithPos1AndPos2(999);   // for hadron tracks with track Id < 1000
    dmECC.drawTracksWithPosAndSlopes(1000); // for e+/e- tracks with track Id >= 1000
    break;

  default:
    dmECC.drawTracksWithPosAndSlopes();
  }

  dmECC.scene().add(dmECC.groupOfTracks());

};
//------------------------------------------------------------------------------

dmECC.drawTracksFromVertex = function() {

  const primVertDrawPos = dmECC.primVertDrawPos();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const evTracks = demobbed.event().tracksECC();

  const nbOfTracks = evTracks.length;

  for (let it = 0; it < nbOfTracks; it++) {

    const iTrack = evTracks[it];

    const trPartId = iTrack.partId();

    const trAxy = iTrack.Axy();

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

    // This cycle must be uncommented (and tested) in case the primary vertex draw position is not at (0, 0, 0)!!!
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

dmECC.drawTracksWithPosAndSlopes = function(minTrackIdForDrawing) {

  if (minTrackIdForDrawing === undefined) minTrackIdForDrawing = 0;

  const primVertRealPos = demobbed.event().verticesECC()[0].pos();

  const primVertDrawPos = dmECC.primVertDrawPos();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const evTracks = demobbed.event().tracksECC();

  const nbOfTracks = evTracks.length;

  const trZlength = 1380;

  for (let it = 0; it < nbOfTracks; it++) {

    const iTrack = evTracks[it];

    if (iTrack.id() < minTrackIdForDrawing) continue; //!!!

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

dmECC.drawTracksWithPos1AndPos2 = function(maxTrackIdForDrawing) {

  if (maxTrackIdForDrawing === undefined) maxTrackIdForDrawing = 1000000;

  const primVertRealPos = demobbed.event().verticesECC()[0].pos();

  const primVertDrawPos = dmECC.primVertDrawPos();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const evTracks = demobbed.event().tracksECC();

  const nbOfTracks = evTracks.length;

  for (let it = 0; it < nbOfTracks; it++) {

    const iTrack = evTracks[it];

    if (iTrack.id() > maxTrackIdForDrawing) break; //!!!

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

  dmECC.updateCanvases(1);

  //dmECC.displayEventInfo();

  if ( dmECC.interactiveMode() ) cancelAnimationFrame( dmECC.animationFrameID() );

  dmECC.interactiveMode(1);

  dmECC.runInteractiveMode();

};
//------------------------------------------------------------------------------

dmECC.updateCanvases = function(resetCameras) {

  //if (dmECC.camera() === null) dmECC.initGraphics(); // the initialisation is called in MgrDrawED-funcAdd.js!

  dmECC.clearCanvases();

  if (resetCameras) dmECC.resetRotationY();

  dmECC.prepareAndDrawEvent(resetCameras);

};
//------------------------------------------------------------------------------

dmECC.clearCanvases = function() {

  dmECC.clearGroupOfVertices();

  dmECC.clearGroupOfTracks();

  dmECC.clearGroupOfAxes();

};
//------------------------------------------------------------------------------

dmECC.resetRotationY = function() {

  if ( (dmECC.groupOfTracks().rotation) && (dmECC.groupOfTracks().rotation.y >= 0) ) {

    dmECC.groupOfVertices().rotation.y = 0;
    dmECC.groupOfTracks().rotation.y   = 0;
    dmECC.groupOfAxes().rotation.y     = 0;

  }

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

  if ( demobbed.evSampleId() == 0 ) {

    dmECC.addLegendEntry("muon:",             38, TrackECC.colors(1));
    dmECC.addLegendEntry("hadron:",           56, TrackECC.colors(2));
    dmECC.addLegendEntry("e+/e-:",            74, TrackECC.colors(3));
    dmECC.addLegendEntry("highly ionizing:",  92, TrackECC.colors(4));
    dmECC.addLegendEntry("ionizing:",        110, TrackECC.colors(6));

    return; //!!!

  }

  if ( demobbed.evSampleId() == 1 ) {

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
      dmECC.addLegendEntry("proton:",             74, TrackECC.colors(10));
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

    return; //!!!
  }

  if ( demobbed.evSampleId() == 2 ) {

    dmECC.addLegendEntry("e- with e.m. shower:", 38, TrackECC.colors(17));

    if (demobbed.event().id() != 226395185) {

      dmECC.addLegendEntry("hadron(s):",  56, TrackECC.colors(20));
      dmECC.addLegendEntry("",            74, TrackECC.colors(14));
      dmECC.addLegendEntry("",            92, TrackECC.colors( 9));
      dmECC.addLegendEntry("",           110, TrackECC.colors(13));
      dmECC.addLegendEntry("",           128, TrackECC.colors(12));
      dmECC.addLegendEntry("",           146, TrackECC.colors(11));
      dmECC.addLegendEntry("",           164, TrackECC.colors(10));
      dmECC.addLegendEntry("",           182, TrackECC.colors(15));

    }

    switch (demobbed.event().id()) {

    case 9301040593:

      dmECC.addLegendEntry("e+/e- (gamma1):", 200, TrackECC.colors(16));
      dmECC.addLegendEntry("e+/e- (gamma2):", 218, TrackECC.colors(19));

      break;

    case 10257032729:
    case 10299040193:
    case 10312027541:
    case 11220031747:
    case 12082052269:

      dmECC.addLegendEntry("e+/e- (gamma1):", 200, TrackECC.colors(16));

      break;

    }

    return; //!!!

  }

  if ( demobbed.evSampleId() == 3 ) {

    dmECC.addLegendEntry("muon:", 38, TrackECC.colors(11));

    switch (demobbed.event().id()) {

    case 222007691:
    case 224984190:
    case 228197639:
    case 228563573:
    case 231012915:
    case 233235784:
    case 233478285:
    case 234341013:
    case 234654975:
    case 237403844:
    case 237491736:
    case 9150262114:
    case 9163097136:
    case 9180028411:
    case 9184112367:
    case 9185049172:
    case 9189079481:
    case 9273029609:
    case 9291027303:
    case 9302097642:
    case 9306092701:
    case 1014600323:
    case 10207022839:
    case 10248000869:
    case 10269013559:

      dmECC.addLegendEntry("D0:",             56, TrackECC.colors(8), 1);

      break;

    default:

      dmECC.addLegendEntry("charmed hadron:", 56, TrackECC.colors(8));

    }

    dmECC.addLegendEntry("daughter(s):",      74, TrackECC.colors(14));


    switch (demobbed.event().id()) {

    case 180718369:
    case 222007691:
    case 222274169:
    case 228197639:
    case 228563573:
    case 233225467:
    case 234341013:
    case 234654975:
    case 236177101:
    case 9152034063:
    case 9153055713:
    case 9180028411:
    case 9214106181:
    case 9231046733:
    case 9248074251:
    case 9253108902:
    case 9262083703:
    case 9273029609:
    case 9291027303:
    case 9306092701:
    case 9315114545:
    case 9317000655:
    case 10122012330:
    case 10146003231:
    case 10158041014:
    case 10207022839:
    case 10248000869:
    case 10254046659:
    case 10269013559:
    case 10270021561:

      dmECC.addLegendEntry("other hadron(s):",  92, TrackECC.colors(12));
      dmECC.addLegendEntry("",                 110, TrackECC.colors(13));
      dmECC.addLegendEntry("",                 128, TrackECC.colors(16));
      dmECC.addLegendEntry("",                 146, TrackECC.colors(15));
      dmECC.addLegendEntry("",                 164, TrackECC.colors(10));

      break;
    }

    if (demobbed.event().id() == 9306092701) {

      dmECC.addLegendEntry("",                 182, TrackECC.colors(17));
      dmECC.addLegendEntry("",                 200, TrackECC.colors(9));

    }

    return; //!!!

  }

};
//-----------------------------------------------------------------------------

dmECC.addLegendEntry = function(trTypeName, topDist, trColor, drawDashedLine) {

  dmECC.trackLegendContext().fillStyle = trColor;
  dmECC.trackLegendContext().fillText(trTypeName, 8, topDist + 3);

  dmECC.trackLegendContext().lineWidth = 3;
  dmECC.trackLegendContext().strokeStyle = trColor;

  if (drawDashedLine === undefined) {

    dmECC.trackLegendContext().beginPath();
    dmECC.trackLegendContext().moveTo(dmECC.trackLegendLineBeg(), topDist);
    dmECC.trackLegendContext().lineTo(dmECC.trackLegendLineEnd(), topDist);
    dmECC.trackLegendContext().stroke();

  }
  else {

    let LineBeg = dmECC.trackLegendLineBeg();

    const DashedLineLength = (dmECC.trackLegendLineEnd() - LineBeg)/3.;

    let LineEnd = LineBeg + DashedLineLength;

    for (let j = 0; j < 2; j++) {

      dmECC.trackLegendContext().beginPath();
      dmECC.trackLegendContext().moveTo(LineBeg, topDist);
      dmECC.trackLegendContext().lineTo(LineEnd, topDist);
      dmECC.trackLegendContext().stroke();

      LineBeg = LineEnd + DashedLineLength;
      LineEnd = LineBeg + DashedLineLength;
    }

  }

};
//-----------------------------------------------------------------------------

dmECC.prepareTitlesOfTracksAndAxes = function() {

  dmECC.calcAxesLengthsAndNbOfUnits();

  const primVertDrawPos = dmECC.primVertDrawPos();

  const ip = dmECC.view();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const axesNbOfUnits = dmECC.axesNbOfUnits();

  const axesLengths = dmECC.axesLengths();

  let fontSize = axesLengths[1]/8;
  if (stretchYcoeff < 1) fontSize /= stretchYcoeff;

  dmECC.titleFontLoader().load('/static/node_modules/demobbed-viewer/fonts/helvetiker_regular.typeface.json', function(font) {

    // prepare axes titles

    const tps = { size:fontSize, height:10, font:font };

    const x_geo  = new THREE.TextGeometry('X', tps);
    const y_geo  = new THREE.TextGeometry('Y', tps);
    const z_geo  = new THREE.TextGeometry('Z', tps);
    const un_geo = new THREE.TextGeometry(axesNbOfUnits + 'mm', tps);

    const x_text  = new THREE.Mesh( x_geo, dmECC.axisXtitleMaterial() );
    const y_text  = new THREE.Mesh( y_geo, dmECC.axisYtitleMaterial() );
    const z_text  = new THREE.Mesh( z_geo, dmECC.axisZtitleMaterial() );
    const un_text = new THREE.Mesh( un_geo, dmECC.axisUnitsMaterial() );

    x_text.position.x  = primVertDrawPos.x;
    x_text.position.y  = primVertDrawPos.y;
    x_text.position.z  = primVertDrawPos.z;

    y_text.position.x  = primVertDrawPos.x;
    y_text.position.y  = primVertDrawPos.y;
    y_text.position.z  = primVertDrawPos.z;

    z_text.position.x  = primVertDrawPos.x;
    z_text.position.y  = primVertDrawPos.y;
    z_text.position.z  = primVertDrawPos.z;

    un_text.position.x = primVertDrawPos.x;
    un_text.position.y = primVertDrawPos.y;
    un_text.position.z = primVertDrawPos.z;

    switch (ip) {

    case 0:

      if (axesLengths[0] > 100) x_text.position.x += 90*axesLengths[0]/100;
      else x_text.position.x += 100;

      x_text.position.z += 50;
      x_text.rotation.x = -1.57;
      x_text.rotation.z = -1.57;

      if (axesLengths[1] > 200) y_text.position.y += 98*axesLengths[1]/100;
      else y_text.position.y += 200;

      y_text.position.x += 50;
      y_text.position.z -= 100;
      y_text.rotation.x = -1.57;
      y_text.rotation.z = -1.57;

      if (axesLengths[2] > 100) z_text.position.z += 92*axesLengths[2]/100;
      else z_text.position.z += 100;

      z_text.position.x += 50;
      z_text.rotation.x = -1.57;
      z_text.rotation.z = -1.57;

      if (axesLengths[0] > 200) un_text.position.x += 45*axesLengths[0]/100;
      else un_text.position.x += 100;

      un_text.position.z += 50;
      un_text.rotation.x = -1.57;
      un_text.rotation.z = -1.57;

      break;

    case 1:

      if (axesLengths[0] > 100) x_text.position.x += 98*axesLengths[0]/100;
      else x_text.position.x += 100;

      x_text.position.y += 50;
      x_text.position.z += 50;
      x_text.rotation.y = -1.57;

      if (axesLengths[1] > 200) y_text.position.y += 90*axesLengths[1]/100;
      else y_text.position.y += 200;

      y_text.position.z += 50;
      y_text.rotation.y = -1.57;

      if (axesLengths[2] > 100) z_text.position.z += 92*axesLengths[2]/100;
      else z_text.position.z += 100;

      z_text.position.y += 50;
      z_text.rotation.y = -1.57;

      if (axesLengths[1] > 200) un_text.position.y += 45*axesLengths[1]/100;
      else un_text.position.y += 100;

      un_text.position.z += 50;
      un_text.rotation.y = -1.57;

      break;

    case 2:

      if (axesLengths[0] > 100) x_text.position.x += 92*axesLengths[0]/100;
      else x_text.position.x += 100;

      x_text.position.y += 50;

      if (axesLengths[1] > 200) y_text.position.y += 90*axesLengths[1]/100;
      else y_text.position.y += 200;

      y_text.position.x += 50;

      if (axesLengths[2] > 100) z_text.position.z += 98*axesLengths[2]/100;
      else z_text.position.z += 100;

      z_text.position.x -= 150;
      z_text.position.y += 50;

      if (axesLengths[1] > 200) un_text.position.y += 45*axesLengths[1]/100;
      else un_text.position.y += 100;

      un_text.position.x += 50;

    }

    dmECC.axesTitles()[0] = x_text;
    dmECC.axesTitles()[1] = y_text;
    dmECC.axesTitles()[2] = z_text;
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

dmECC.calcAxesLengthsAndNbOfUnits = function() {

  const zoom = dmECC.zoom();

  const ip = dmECC.view();

  const stretchYcoeff = dmECC.stretchYcoeff();

  let axesLengths = [1000, 1000, 1000];

  if (stretchYcoeff > 1) axesLengths[0] = axesLengths[2] = axesLengths[1]/stretchYcoeff;
  else if (stretchYcoeff < 1) axesLengths[1] = axesLengths[0]*stretchYcoeff;

  if (zoom > 3.8) {
    axesLengths[0] *= 0.22*zoom;
    axesLengths[1] *= 0.22*zoom;
    axesLengths[2] *= 0.22*zoom;
  }
  else if (zoom > 3.0) {
    axesLengths[0] *= 0.28*zoom;
    axesLengths[1] *= 0.28*zoom;
    axesLengths[2] *= 0.28*zoom;
  }
  else if (zoom > 2.4) {
    axesLengths[0] *= 0.38*zoom;
    axesLengths[1] *= 0.38*zoom;
    axesLengths[2] *= 0.38*zoom;
  }
  else if (zoom > 1.9) {
    axesLengths[0] *= 0.5*zoom;
    axesLengths[1] *= 0.5*zoom;
    axesLengths[2] *= 0.5*zoom;
  }
  else if (zoom > 1.5) {
    axesLengths[0] *= 0.7*zoom;
    axesLengths[1] *= 0.7*zoom;
    axesLengths[2] *= 0.7*zoom;
  }
  else if (zoom > 1.1) {
    axesLengths[0] *= 0.8*zoom;
    axesLengths[1] *= 0.8*zoom;
    axesLengths[2] *= 0.8*zoom;
  }
  else if (zoom > 0.40) {
    axesLengths[0] *= 1.2/(zoom + 0.2);
    axesLengths[1] *= 1.2/(zoom + 0.2);
    axesLengths[2] *= 1.2/(zoom + 0.2);
  }
  else if (zoom > 0.25) {
    axesLengths[0] *= 1.1/(zoom + 0.1);
    axesLengths[1] *= 1.1/(zoom + 0.1);
    axesLengths[2] *= 1.1/(zoom + 0.1);
  }
  else if (zoom > 0.15) {
    axesLengths[0] *= 1.06/(zoom + 0.06);
    axesLengths[1] *= 1.06/(zoom + 0.06);
    axesLengths[2] *= 1.06/(zoom + 0.06);
  }
  else if (zoom > 0) {
    axesLengths[0] *= 1.02/(zoom + 0.02);
    axesLengths[1] *= 1.02/(zoom + 0.02);
    axesLengths[2] *= 1.02/(zoom + 0.02);
  }

  let axesNbOfUnits = axesLengths[0]/1000;

  if ( axesNbOfUnits <= 0.9 ) axesNbOfUnits = Math.floor(axesNbOfUnits*10)/10;
  else {

    const temp_ceil = Math.ceil(axesNbOfUnits);

    if (temp_ceil - axesNbOfUnits < 0.1) axesNbOfUnits = temp_ceil;
    else axesNbOfUnits = Math.floor(axesNbOfUnits);

  }

  axesLengths[0] = axesLengths[2] = 1000*axesNbOfUnits;
  axesLengths[1] = axesLengths[0]*stretchYcoeff;

  dmECC.axesLengths(axesLengths);

  dmECC.axesNbOfUnits(axesNbOfUnits);

};
//------------------------------------------------------------------------------

dmECC.drawAxes = function() {

  const primVertDrawPos = dmECC.primVertDrawPos();

  const zoom = dmECC.zoom();

  const stretchYcoeff = dmECC.stretchYcoeff();

  const axesLengths = dmECC.axesLengths();

  const axisWidth = 8/zoom;

  const rx = new three3DExtras.tubeLine([primVertDrawPos.x,
                                         primVertDrawPos.y,
                                         primVertDrawPos.z],
                                        [primVertDrawPos.x + axesLengths[0],
                                         primVertDrawPos.y,
                                         primVertDrawPos.z],
                                         axisWidth, dmECC.colorAxisX());

  const gy = new three3DExtras.tubeLine([primVertDrawPos.x,
                                         primVertDrawPos.y,
                                         primVertDrawPos.z],
                                        [primVertDrawPos.x,
                                         primVertDrawPos.y + axesLengths[1],
                                         primVertDrawPos.z],
                                         axisWidth, dmECC.colorAxisY());

  const bz = new three3DExtras.tubeLine([primVertDrawPos.x,
                                         primVertDrawPos.y,
                                         primVertDrawPos.z],
                                        [primVertDrawPos.x,
                                         primVertDrawPos.y,
                                         primVertDrawPos.z + axesLengths[2]],
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
