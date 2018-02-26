//dmECC == demobbed.mgrDrawECC() !!!
//gmED  == demobbed.mgrGeomED()  !!!
//---------------------------------------

dmECC.initGraphics = function() {

  dmECC.initCameras();

  dmECC.scene(new THREE.Scene());
  dmECC.sceneInset(new THREE.Scene());

  dmECC.initRenderers();

  //dmECC.initControls();

  dmECC.groupOfVertexPoints(new THREE.Group());

  dmECC.groupOfTrackLines(new THREE.Group());

  dmECC.initVertexProperties();

  dmECC.initTrackLineProperties();

  dmECC.initGroupOfAxesAndTrackTitles();

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
                                                  primVertDrawPos.x,
                                                  primVertDrawPos.x + 10000) );
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

  dmECC.renderer().setClearColor(0xFAFAFA, 1);
  dmECC.rendererInset().setClearColor(0xFAFAFA, 0);

  dmECC.renderer().gammaInput  = true;
  dmECC.renderer().gammaOutput = true;

  dmECC.rendererInset().gammaInput  = true;
  dmECC.rendererInset().gammaOutput = true;

};
//------------------------------------------------------------------------------

dmECC.initControls = function() {

  dmECC.controls( new THREE.TrackballControls(dmECC.camera(), dmECC.renderer().domElement) );

  dmECC.controls().rotateSpeed = 5.0;
  dmECC.controls().zoomSpeed = 0.5;

  //dmECC.controls().addEventListener('change', dmECC.render);
};
//------------------------------------------------------------------------------

dmECC.initVertexProperties = function() {

  dmECC.vertexGeometryCloseView( new THREE.SphereGeometry(30, 32, 32) );
  dmECC.vertexGeometryFarView( new THREE.SphereGeometry(70, 32, 32) );

  dmECC.vertexMaterial( new THREE.MeshBasicMaterial({ color: Vertex.color() }) );

};
//------------------------------------------------------------------------------

dmECC.initGroupOfAxesAndTrackTitles = function() {

  dmECC.groupOfAxes(new THREE.Group());

  const colorX = "seagreen";
  const colorY = "magenta";
  const colorZ = "maroon";

  const primVertDrawPos = dmECC.primVertDrawPos();

  const rx = new three3DExtras.tubeLine([primVertDrawPos.x, primVertDrawPos.y, primVertDrawPos.z],
                                        [primVertDrawPos.x + 1000, primVertDrawPos.y, primVertDrawPos.z], 8, colorX);

  const gy = new three3DExtras.tubeLine([primVertDrawPos.x, primVertDrawPos.y, primVertDrawPos.z],
                                        [primVertDrawPos.x, primVertDrawPos.y + 1000, primVertDrawPos.z], 8, colorY);

  const bz = new three3DExtras.tubeLine([primVertDrawPos.x, primVertDrawPos.y, primVertDrawPos.z],
                                        [primVertDrawPos.x, primVertDrawPos.y, primVertDrawPos.z + 1000], 8, colorZ);

  dmECC.groupOfAxes().add(rx.getObject3D());
  dmECC.groupOfAxes().add(gy.getObject3D());
  dmECC.groupOfAxes().add(bz.getObject3D());

  const font_loader = new THREE.FontLoader();
  font_loader.load('./fonts/helvetiker_regular.typeface.json', function(font) {

    // init axes titles

    const tps = { size:110, height:10, font:font };

    const x_geo = new THREE.TextGeometry('X', tps);
    const y_geo = new THREE.TextGeometry('Y', tps);
    const z_geo = new THREE.TextGeometry('Z', tps);

    const un_geo = new THREE.TextGeometry('1mm', tps);

    const x_material = new THREE.MeshBasicMaterial({ color: colorX });
    const x_text = new THREE.Mesh(x_geo, x_material);
    x_text.position.x = primVertDrawPos.x + 980;
    x_text.position.y = primVertDrawPos.y +  50;
    x_text.position.z = primVertDrawPos.z +  50;
    x_text.rotation.y = -1.57;

    const y_material = new THREE.MeshBasicMaterial({ color: colorY });
    const y_text = new THREE.Mesh(y_geo, y_material);
    y_text.position.y = primVertDrawPos.y + 900;
    y_text.position.z = primVertDrawPos.z +  50;
    y_text.rotation.y = -1.57;

    const z_material = new THREE.MeshBasicMaterial({ color: colorZ });
    const z_text = new THREE.Mesh(z_geo, z_material);
    z_text.position.y = primVertDrawPos.y +  50;
    z_text.position.z = primVertDrawPos.z + 920;
    z_text.rotation.y = -1.57;

    const un_material = new THREE.MeshBasicMaterial({ color: colorY });
    const un_text = new THREE.Mesh(un_geo, un_material);
    un_text.position.y = primVertDrawPos.y + 450;
    un_text.position.z = primVertDrawPos.z +  50;
    un_text.rotation.y = -1.57;

    dmECC.groupOfAxes().add(x_text);
    dmECC.groupOfAxes().add(y_text);
    dmECC.groupOfAxes().add(z_text);
    dmECC.groupOfAxes().add(un_text);

    // init track titles

    const trMu_geo = new THREE.TextGeometry('mu', tps);
    const trMu_material = new THREE.MeshBasicMaterial({ color: TrackECC.colors(1) });

    dmECC.trackTitles()[1] = new THREE.Mesh(trMu_geo, trMu_material);
    dmECC.trackTitles()[1].rotation.y = -1.57;

    const trEl_geo = new THREE.TextGeometry('e', tps);
    const trEl_material = new THREE.MeshBasicMaterial({ color: TrackECC.colors(3) });

    dmECC.trackTitles()[3] = new THREE.Mesh(trEl_geo, trEl_material);
    dmECC.trackTitles()[3].rotation.y = -1.57;

    dmECC.trackTitles()[2] = dmECC.trackTitles()[4] = dmECC.trackTitles()[5]
                           = dmECC.trackTitles()[6] = dmECC.trackTitles()[7]
                           = dmECC.trackTitles()[8] = null; //!!!

  });

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

  dmECC.trackLinePars()[13] = { // for e+/e- tracks in tau-candidate events

    color:  TrackECC.colors(13),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[14] = { // for e+/e- tracks in tau-candidate events

    color:  TrackECC.colors(14),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

  dmECC.trackLinePars()[15] = { // for an hadron track in tau-candidate events

    color:  TrackECC.colors(15),
    length: 10*DetCfg.plateToPlateDistECC(),
    width:  12

  };

};
//------------------------------------------------------------------------------

dmECC.drawEvent = function(resetCameraPos) {

  if (resetCameraPos === undefined) resetCameraPos = 1; //!!!

  dmECC.drawVertices();

  dmECC.drawTracks();

  dmECC.drawTrackLegend();

  dmECC.sceneInset().add(dmECC.groupOfAxes())

  const primVertDrawPos = dmECC.primVertDrawPos();

  //console.log("000: primVertDrawPos.x = " + primVertDrawPos.x);
  //console.log("000: primVertDrawPos.y = " + primVertDrawPos.y);
  //console.log("000: primVertDrawPos.z = " + primVertDrawPos.z);

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
  //console.log("111: cameraDirection.y = " + cameraDirection.y);
  //console.log("111: cameraDirection.z = " + cameraDirection.z);

  //console.log("222: dmECC.camera().position.x = " + dmECC.camera().position.x);
  //console.log("222: dmECC.camera().position.y = " + dmECC.camera().position.y);
  //console.log("222: dmECC.camera().position.z = " + dmECC.camera().position.z);

  //setTimeout( function() {
                           //requestAnimationFrame(dmECC.drawEvent);
                         //}, 1000 / 10 );

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

  dmECC.groupOfVertexPoints().rotation.y += 0.004;
  dmECC.groupOfTrackLines().rotation.y   += 0.004;

  dmECC.groupOfAxes().rotation.y += 0.004;

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

  dmECC.updateCanvas(0);

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

  if (ip == 2)
    dmECC.camera().position.set(primVertDrawPos.x - 2000,
                                dmECC.camera().position.y,
                                dmECC.camera().position.z + dirLRUD*z1*1000);
  else
    dmECC.camera().position.set(primVertDrawPos.x - 2000,
                                dmECC.camera().position.y + dirLRUD*z1*1000,
                                dmECC.camera().position.z);

  dmECC.updateCanvas(0);

};
//-----------------------------------------------------------------------------

dmECC.drawVertices = function() {

  const evVertices = demobbed.event().verticesECC();

  const primVertRealPos = evVertices[0].pos();

  const primVertDrawPos = dmECC.primVertDrawPos();

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
      vertexPoint.position.y = primVertDrawPos.y + vertRealPos[1] - primVertRealPos[1];
      vertexPoint.position.z = primVertDrawPos.z + vertRealPos[2] - primVertRealPos[2];

    }
    else {

      vertexPoint.position.x = primVertDrawPos.x;
      vertexPoint.position.y = primVertDrawPos.y;
      vertexPoint.position.z = primVertDrawPos.z;

    }

    dmECC.groupOfVertexPoints().add(vertexPoint);

  }

  dmECC.scene().add(dmECC.groupOfVertexPoints());

};
//------------------------------------------------------------------------------

dmECC.drawTracks = function() {

  //if (demobbed.evSampleId()) dmECC.drawTracksWithPosAndSlopes();
  if (demobbed.evSampleId()) dmECC.drawTracksWithPos1AndPos2();
  else dmECC.drawTracksFromVertex();

  dmECC.scene().add(dmECC.groupOfTrackLines());

};
//------------------------------------------------------------------------------

dmECC.drawTracksFromVertex = function() {

  const primVertDrawPos = dmECC.primVertDrawPos();

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

    for (let ip = 0; ip < 2; ip++) {

      trBeg[ip] = trBeg[2]*trAxy[ip];
      trEnd[ip] = trEnd[2]*trAxy[ip];

      if (trackPartTitle) trTitlePos[ip] = trTitlePos[2]*trAxy[ip];

    }

    for (let ip = 0; ip < 3; ip++) {

      const xyz = primVertDrawPos.getComponent(ip);

      trBeg[ip] += xyz;
      trEnd[ip] += xyz;

      if (trackPartTitle) trTitlePos[ip] += xyz;

    }

    const trLineWidth = (dmECC.zoom() > 0.7) ?
                        trPars.width :
                        trPars.width/dmECC.zoom();

    const trackLine = new three3DExtras.tubeLine(trBeg, trEnd,
                                                 trLineWidth,
                                                 trPars.color);

    dmECC.groupOfTrackLines().add(trackLine.getObject3D());

    if (trackPartTitle) {

      const trackTitle = trackPartTitle.clone(); //!!!

      trackTitle.position.x = trTitlePos[0];
      trackTitle.position.y = trTitlePos[1] + 100;
      trackTitle.position.z = trTitlePos[2];

      dmECC.groupOfTrackLines().add(trackTitle);

    }

  }

};
//------------------------------------------------------------------------------

dmECC.drawTracksWithPosAndSlopes = function() {

  const vertRealPos = demobbed.event().verticesECC()[0].pos();

  const primVertDrawPos = dmECC.primVertDrawPos();

  const evTracks = demobbed.event().tracksECC();

  const nbOfTracks = evTracks.length;

  //const trZlength = 700;
  const trZlength = 1380;

  for (let it = 0; it < nbOfTracks; it++) {

    const iTrack = evTracks[it];

    const trBeg = [0, 0, 0];

    for (let ip = 0; ip < 3; ip++)
      trBeg[ip] = primVertDrawPos.getComponent(ip) + iTrack.pos1()[ip] - vertRealPos[ip];

    const trEnd = [0, 0, trBeg[2] + trZlength];

    for (let ip = 0; ip < 2; ip++)
      trEnd[ip] = trBeg[ip] + trZlength*iTrack.Axy()[ip];

    const trPars = dmECC.trackLinePars()[iTrack.partId()];

    const trLineWidth = (dmECC.zoom() > 0.7) ?
                        trPars.width :
                        trPars.width/dmECC.zoom();

    const trackLine = new three3DExtras.tubeLine(trBeg, trEnd,
                                                 trLineWidth,
                                                 trPars.color); 

    dmECC.groupOfTrackLines().add(trackLine.getObject3D());

  }

};
//------------------------------------------------------------------------------

dmECC.drawTracksWithPos1AndPos2 = function() {

  const vertRealPos = demobbed.event().verticesECC()[0].pos();

  const primVertDrawPos = dmECC.primVertDrawPos();

  const evTracks = demobbed.event().tracksECC();

  const nbOfTracks = evTracks.length;

  for (let it = 0; it < nbOfTracks; it++) {

    const iTrack = evTracks[it];

    const trPos1 = [0, 0, 0];
    const trPos2 = [0, 0, 0];

    for (let ip = 0; ip < 3; ip++) {

      const xyz = primVertDrawPos.getComponent(ip);

      trPos1[ip] = xyz + iTrack.pos1()[ip] - vertRealPos[ip];
      trPos2[ip] = xyz + iTrack.pos2()[ip] - vertRealPos[ip];

    }

    const trPars = dmECC.trackLinePars()[iTrack.partId()];

    const trLineWidth = (dmECC.zoom() > 0.7) ?
                        trPars.width :
                        trPars.width/dmECC.zoom();

    const trackLine = new three3DExtras.tubeLine(trPos1, trPos2, trLineWidth, trPars.color); 

    dmECC.groupOfTrackLines().add(trackLine.getObject3D());

  }

};
//------------------------------------------------------------------------------

dmECC.onEventChange = function() {

  const divECC = document.getElementById("div-col-display-ECC");

  if (!demobbed.showECC()) {

    if (dmECC.camera() !== null) {

      cancelAnimationFrame(dmECC.animationFrameID());

      dmECC.clearCanvas();

      dmECC.eraseEventInfo();

    }

    divECC.style.display = "none";

    return; //!!!

  }

  divECC.style.display = "block";

  dmECC.updateCanvas();

  dmECC.displayEventInfo();

};
//------------------------------------------------------------------------------

dmECC.displayEventInfo = function() {
};
//------------------------------------------------------------------------------

dmECC.eraseEventInfo = function() {
};
//------------------------------------------------------------------------------

dmECC.updateCanvas = function(resetCameraPos) {

  //if (dmECC.camera() === null) dmECC.initGraphics(); // the initialisation is called in MgrDrawED-addMethods.js!

  dmECC.clearCanvas();

  if (resetCameraPos === undefined) {

    resetCameraPos = 1; //!!!

    const rotY = dmECC.groupOfTrackLines().rotation.y;

    if (rotY >= 0) {

      dmECC.groupOfVertexPoints().rotation.y = 0;
      dmECC.groupOfTrackLines().rotation.y   = 0;
      dmECC.groupOfAxes().rotation.y = 0;
    }

  }

  dmECC.drawEvent(resetCameraPos);

};
//------------------------------------------------------------------------------

dmECC.clearCanvas = function() {

  dmECC.clearGroupOfVertexPoints();

  dmECC.clearGroupOfTrackLines();

  dmECC.sceneInset().remove(dmECC.groupOfAxes());

  dmECC.render();

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

  dmECC.trackLegendLineBeg(155);
  dmECC.trackLegendLineEnd(canvasLegendECC.width - 10);

  dmECC.trackLegendContext().font = "16px serif";

  dmECC.trackLegendContext().fillText("Track types", 50, 15);

  dmECC.trackLegendContext().beginPath();
  dmECC.trackLegendContext().moveTo(0, 20);
  dmECC.trackLegendContext().lineTo(canvasLegendECC.width, 20);
  dmECC.trackLegendContext().stroke();

};
//------------------------------------------------------------------------------

dmECC.drawTrackLegend = function() {

  dmECC.trackLegendContext().clearRect( 0, 20,
                                        dmECC.trackLegendWidth(),
                                        dmECC.trackLegendHeight() );

  if (demobbed.evSampleId()) {

    switch (demobbed.event().id()) {

    case 9190097972:

      dmECC.addLegendEntry("tau lepton:",       38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron:",           56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron:",           74, TrackECC.colors(4));
      dmECC.addLegendEntry("hadron:",           92, TrackECC.colors(6));
      dmECC.addLegendEntry("hadron:",          110, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",          128, TrackECC.colors(15));

      break;

    case 9234119599:

      dmECC.addLegendEntry("tau lepton:",       38, TrackECC.colors(8));
      dmECC.addLegendEntry("pion:",             56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron:",           74, TrackECC.colors(10));
      dmECC.addLegendEntry("proton:",           92, TrackECC.colors(4));
      dmECC.addLegendEntry("hadron:",          110, TrackECC.colors(11));
      dmECC.addLegendEntry("hadron:",          128, TrackECC.colors(12));
      dmECC.addLegendEntry("pion:",            146, TrackECC.colors(6));
      dmECC.addLegendEntry("hadron:",          164, TrackECC.colors(15));
      dmECC.addLegendEntry("e+/e- (gamma1):",  182, TrackECC.colors(13));
      dmECC.addLegendEntry("e+/e- (gamma2):",  200, TrackECC.colors(14));

      break;

    case 10123059807:

      dmECC.addLegendEntry("tau lepton:",       38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron:",           56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron:",           74, TrackECC.colors(6));
      dmECC.addLegendEntry("hadron:",           92, TrackECC.colors(4));
      dmECC.addLegendEntry("hadron:",          110, TrackECC.colors(13));
      dmECC.addLegendEntry("hadron:",          128, TrackECC.colors(11));
      dmECC.addLegendEntry("hadron:",          146, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",          164, TrackECC.colors(12));
      dmECC.addLegendEntry("hadron:",          182, TrackECC.colors(14));
      dmECC.addLegendEntry("proton:",          200, TrackECC.colors(15));

      break;

    case 11113019758:

      dmECC.addLegendEntry("tau lepton:",       38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron:",           56, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",           74, TrackECC.colors(1));
      dmECC.addLegendEntry("hadron:",           92, TrackECC.colors(14));
      dmECC.addLegendEntry("hadron:",          110, TrackECC.colors(11));
      dmECC.addLegendEntry("hadron:",          128, TrackECC.colors(12));
      dmECC.addLegendEntry("hadron:",          146, TrackECC.colors(9));

      break;

    case 11143018505:

      dmECC.addLegendEntry("tau lepton:",       38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron:",           56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron:",           74, TrackECC.colors(4));
      dmECC.addLegendEntry("hadron:",           92, TrackECC.colors(12));
      dmECC.addLegendEntry("hadron:",          110, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",          128, TrackECC.colors(11));
      dmECC.addLegendEntry("e+/e- (gamma):",   146, TrackECC.colors(14));

      break;

    case 11172035775:

      dmECC.addLegendEntry("tau lepton:",       38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron:",           56, TrackECC.colors(9));
      dmECC.addLegendEntry("hadron:",           74, TrackECC.colors(11));
      dmECC.addLegendEntry("hadron:",           92, TrackECC.colors(12));
      dmECC.addLegendEntry("hadron:",          110, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",          128, TrackECC.colors(4));

      break;

    case 12123032048:

      dmECC.addLegendEntry("tau lepton:",       38, TrackECC.colors(8));
      dmECC.addLegendEntry("muon:",             56, TrackECC.colors(1));
      dmECC.addLegendEntry("hadron:",           74, TrackECC.colors(10));
      dmECC.addLegendEntry("e+/e- (gamma):",    92, TrackECC.colors(14));

      break;

    case 12254000036:

      dmECC.addLegendEntry("tau lepton:",       38, TrackECC.colors(8));
      dmECC.addLegendEntry("hadron:",           56, TrackECC.colors(9));
      dmECC.addLegendEntry("proton:",           74, TrackECC.colors(4));
      dmECC.addLegendEntry("hadron:",           92, TrackECC.colors(10));
      dmECC.addLegendEntry("hadron:",          110, TrackECC.colors(11));
      dmECC.addLegendEntry("e+/e- (gamma1):",  128, TrackECC.colors(13));
      dmECC.addLegendEntry("e+/e- (gamma2):",  146, TrackECC.colors(14));

      break;

    }

  }
  else {

    dmECC.addLegendEntry("muon:",             38, TrackECC.colors(1));
    dmECC.addLegendEntry("hadron:",           56, TrackECC.colors(2));
    dmECC.addLegendEntry("electron:",         74, TrackECC.colors(3));
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
