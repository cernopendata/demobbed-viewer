"use strict";
//-----------

const demobbed = new Demobbed();

//$("#span-version").html( "v" + demobbed.version() );

demobbed.mgrGeomED( new MgrGeomED() );

const gmED = demobbed.mgrGeomED();

demobbed.mgrDrawED( new MgrDrawED() );

const dmED = demobbed.mgrDrawED();

demobbed.mgrDrawECC( new MgrDrawECC() );

const dmECC = demobbed.mgrDrawECC();
