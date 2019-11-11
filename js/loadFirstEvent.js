let value = document.querySelector('#body-demobbed-viewer').dataset.eventId;

let evID = +value;

let evIndex = -1;
let evSampleId = -1;

for (let iEvS = 0; iEvS < 4; iEvS++) {

  evIndex = demobbed.evList(iEvS).indexOf(evID);

  if (evIndex !== -1) {

    evSampleId = iEvS;

    break; //!!!

  }

}

if (evSampleId !== -1) {

  demobbed.evIndex(evIndex);

}
else {

  evSampleId = 1;

  demobbed.evIndex(1);

  evID = demobbed.evList(evSampleId)[1];
}

demobbed.evSampleId(evSampleId);

demobbed.evIndexMax(demobbed.evList(evSampleId).length - 1);

changeScrLoadEvent(evID);
