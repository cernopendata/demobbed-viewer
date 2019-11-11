function changeEventSample(obj, event, value) { // A separate function is used because it is associated
                                                // with the onchange event in the index.html

  let evSampleId = 0;

  switch (value) {
  case "nuTau":
    evSampleId = 1;
    break;
  case "nuE":
    evSampleId = 2;
    break;
  case "charm":
    evSampleId = 3;
    break;
  default: // "nuMu"
    evSampleId = 0;
  }

  demobbed.evSampleId(evSampleId);

  demobbed.evIndex(0);
  demobbed.evIndexMax(demobbed.evList(evSampleId).length - 1);

  changeScrLoadEvent(demobbed.evList(evSampleId)[0]);

};
//------------------------------------------------------------------------------
