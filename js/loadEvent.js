function loadEvent(obj, event, value) { // A separate function is used because it is associated
                                        // with the onkeypress event in the index.html

  if (event.which != 13 && event.keyCode != 13) return;

  let evID = +value;

  let evIndex = demobbed.evList(demobbed.evSampleId()).indexOf(evID);

  if (evIndex == -1) {
    alert("loadEvent.js::Error: Event " + evID + " is not present in the event list!");
    return; //!!!
  }

  demobbed.evIndex(evIndex);

  changeScrLoadEvent(evID);

};
//------------------------------------------------------------------------------

function changeScrLoadEvent(evID) { // It is assumed here that the evID has been already checked!

  let scrLoadEvent = document.createElement("script");

  var host = window.location.origin;
  scrLoadEvent.src = host + "/static/node_modules/demobbed-viewer/js/nuEventsData/";

  // scrLoadEvent.src = "js/nuEventsData/";

  switch (demobbed.evSampleId()) {
  case 1:
    scrLoadEvent.src += "nuTau/loadEvent";
    break;
  case 2:
    scrLoadEvent.src += "nuE/loadEvent";
    break;
  default: scrLoadEvent.src += "nuMu/loadEvent";
  }

  scrLoadEvent.src += evID + ".js";

  scrLoadEvent.innerHTML = null;
  scrLoadEvent.id = "script-LoadEvent";

  let divScrLoadEvent = document.getElementById("div-ScrLoadEvent");

  divScrLoadEvent.innerHTML = "";
  divScrLoadEvent.appendChild(scrLoadEvent);

};
//------------------------------------------------------------------------------
